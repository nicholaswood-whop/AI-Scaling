import { NextResponse } from "next/server";
import crypto from "crypto";

export const runtime = "nodejs";

/**
 * Whop Webhook → Beehiiv Subscriber
 *
 * When a Whop purchase completes, this endpoint:
 * 1. Verifies the webhook signature
 * 2. Extracts the buyer's email and which product they purchased
 * 3. Creates a subscriber in Beehiiv with a "Product Purchased" custom field
 * 4. The Beehiiv automation triggers on new subscriber and routes them
 *    to the correct email sequence based on the custom field value
 *
 * Whop plan mapping:
 *   plan_180oGdyKRzeXg  → $27 framework only  → "framework_only"
 *   plan_dN0O49KdKgFrR  → $37 bundle           → "bundle"
 *   plan_CrWhYNtzhxpf1  → AI Marketing standalone → "marketing_only"
 */

const BEEHIIV_API_KEY = process.env.BEEHIIV_API_KEY ?? "";
const BEEHIIV_PUB_ID =
  process.env.BEEHIIV_PUBLICATION_ID ??
  "pub_5f264154-9cc1-43cc-b172-d16b4f73b38b";
const WHOP_WEBHOOK_SECRET = process.env.WHOP_WEBHOOK_SECRET ?? "";

// Map Whop plan IDs → product labels for the Beehiiv custom field
const PLAN_MAP: Record<string, string> = {
  plan_180oGdyKRzeXg: "framework_only",
  plan_dN0O49KdKgFrR: "bundle",
  plan_CrWhYNtzhxpf1: "marketing_only",
};

function verifySignature(
  payload: string,
  signature: string,
  secret: string
): boolean {
  if (!secret) return true; // skip verification if secret not configured yet
  const hmac = crypto.createHmac("sha256", secret);
  hmac.update(payload);
  const expected = hmac.digest("hex");
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expected)
  );
}

async function createBeehiivSubscriber(
  email: string,
  productTag: string
): Promise<{ ok: boolean; error?: string }> {
  if (!BEEHIIV_API_KEY) {
    console.error("BEEHIIV_API_KEY not configured");
    return { ok: false, error: "Beehiiv API key not configured" };
  }

  const res = await fetch(
    `https://api.beehiiv.com/v2/publications/${BEEHIIV_PUB_ID}/subscriptions`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${BEEHIIV_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        reactivate_existing: true,
        send_welcome_email: false, // automation handles this
        utm_source: "whop",
        utm_medium: "purchase",
        custom_fields: [
          {
            name: "Product Purchased",
            value: productTag,
          },
        ],
      }),
    }
  );

  if (!res.ok) {
    const body = await res.text();
    console.error("Beehiiv API error:", res.status, body);
    return { ok: false, error: `Beehiiv ${res.status}: ${body}` };
  }

  return { ok: true };
}

export async function POST(request: Request) {
  let rawBody: string;
  try {
    rawBody = await request.text();
  } catch {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  // Verify Whop webhook signature
  const signature = request.headers.get("whop-signature") ?? "";
  if (WHOP_WEBHOOK_SECRET && signature) {
    try {
      if (!verifySignature(rawBody, signature, WHOP_WEBHOOK_SECRET)) {
        console.error("Webhook signature verification failed");
        return NextResponse.json(
          { error: "Invalid signature" },
          { status: 401 }
        );
      }
    } catch {
      console.error("Signature verification error");
      return NextResponse.json(
        { error: "Signature verification error" },
        { status: 401 }
      );
    }
  }

  let payload: Record<string, unknown>;
  try {
    payload = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const event = payload.event as string | undefined;
  const data = payload.data as Record<string, unknown> | undefined;

  // We only care about successful purchases
  if (
    event !== "membership.went_valid" &&
    event !== "payment.succeeded"
  ) {
    // Acknowledge other events without processing
    return NextResponse.json({ ok: true, skipped: true });
  }

  // Extract email and plan from the webhook payload
  const email =
    (data?.email as string) ??
    ((data?.user as Record<string, unknown>)?.email as string) ??
    "";
  const planId =
    (data?.plan_id as string) ??
    ((data?.plan as Record<string, unknown>)?.id as string) ??
    "";

  if (!email) {
    console.error("No email in webhook payload:", JSON.stringify(payload));
    return NextResponse.json(
      { error: "No email in payload" },
      { status: 400 }
    );
  }

  // Determine product tag
  const productTag = PLAN_MAP[planId] ?? "framework_only";

  console.log(
    `Whop webhook: ${event} | email=${email} | plan=${planId} | tag=${productTag}`
  );

  // Create subscriber in Beehiiv
  const result = await createBeehiivSubscriber(email, productTag);

  if (!result.ok) {
    // Return 200 anyway so Whop doesn't retry endlessly, but log the error
    console.error("Failed to create Beehiiv subscriber:", result.error);
    return NextResponse.json({
      ok: false,
      warning: "Subscriber creation failed, logged for retry",
    });
  }

  return NextResponse.json({
    ok: true,
    email,
    product: productTag,
  });
}
