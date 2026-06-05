import { NextResponse } from "next/server";
import crypto from "crypto";

export const runtime = "nodejs";

/**
 * Whop Webhook → Beehiiv Subscriber
 *
 * Receives any Whop webhook event, extracts the buyer email + plan,
 * and creates a tagged subscriber in Beehiiv so the correct automation fires.
 *
 * Whop plan mapping:
 *   plan_180oGdyKRzeXg  → $27 framework only  → "framework_only"
 *   plan_dN0O49KdKgFrR  → $37 bundle           → "bundle"
 *   plan_CrWhYNtzhxpf1  → AI Marketing standalone → "marketing_only"
 *   plan_5o9mIASo2qceZ  → $47 AI Assistant Blueprint → "assistant_blueprint"
 *   WHOP_DFY_PLAN_ID    → $2,997 Done-For-You setup → "dfy_setup"
 *
 * The DFY plan id is read from env (set WHOP_DFY_PLAN_ID) so buyers of the
 * one-click upsell are tagged "dfy_setup" and dropped into the dedicated
 * Done-For-You email sequence in Beehiiv.
 */

const BEEHIIV_API_KEY = process.env.BEEHIIV_API_KEY ?? "";
const BEEHIIV_PUB_ID =
  process.env.BEEHIIV_PUBLICATION_ID ??
  "pub_5f264154-9cc1-43cc-b172-d16b4f73b38b";
const WHOP_WEBHOOK_SECRET = process.env.WHOP_WEBHOOK_SECRET ?? "";

const DFY_PLAN_ID = process.env.WHOP_DFY_PLAN_ID ?? "";

const PLAN_MAP: Record<string, string> = {
  plan_180oGdyKRzeXg: "framework_only",
  plan_dN0O49KdKgFrR: "bundle",
  plan_CrWhYNtzhxpf1: "marketing_only",
  plan_5o9mIASo2qceZ: "assistant_blueprint",
  // $2,997 Done-For-You setup (one-click upsell) — id supplied via env.
  ...(DFY_PLAN_ID ? { [DFY_PLAN_ID]: "dfy_setup" } : {}),
};

function verifySignature(
  payload: string,
  signature: string,
  secret: string
): boolean {
  if (!secret) return true;
  try {
    const hmac = crypto.createHmac("sha256", secret);
    hmac.update(payload);
    const expected = hmac.digest("hex");
    // Use timing-safe comparison only if lengths match
    if (signature.length !== expected.length) return false;
    return crypto.timingSafeEqual(
      Buffer.from(signature),
      Buffer.from(expected)
    );
  } catch {
    return false;
  }
}

async function createBeehiivSubscriber(
  email: string,
  productTag: string,
  firstName?: string
): Promise<{ ok: boolean; error?: string }> {
  if (!BEEHIIV_API_KEY) {
    console.error("[whop-webhook] BEEHIIV_API_KEY not configured");
    return { ok: false, error: "Beehiiv API key not configured" };
  }

  const body: Record<string, unknown> = {
    email,
    reactivate_existing: true,
    send_welcome_email: false,
    utm_source: "whop",
    utm_medium: "purchase",
    custom_fields: [
      { name: "Product Purchased", value: productTag },
    ],
  };

  if (firstName) {
    (body.custom_fields as Array<{ name: string; value: string }>).push({
      name: "First Name",
      value: firstName,
    });
  }

  console.log(
    `[whop-webhook] Creating Beehiiv subscriber: email=${email} tag=${productTag}`
  );

  const res = await fetch(
    `https://api.beehiiv.com/v2/publications/${BEEHIIV_PUB_ID}/subscriptions`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${BEEHIIV_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  );

  if (!res.ok) {
    const text = await res.text();
    console.error(`[whop-webhook] Beehiiv API error: ${res.status} ${text}`);
    return { ok: false, error: `Beehiiv ${res.status}: ${text}` };
  }

  const result = await res.json();
  console.log(`[whop-webhook] Beehiiv subscriber created:`, JSON.stringify(result));
  return { ok: true };
}

/**
 * Extract email from any Whop webhook payload structure.
 * Whop sends data in different formats depending on event type and API version.
 */
function extractEmail(payload: Record<string, unknown>): string {
  const data = (payload.data ?? payload) as Record<string, unknown>;

  // Direct email fields
  if (typeof data.email === "string" && data.email) return data.email;
  if (typeof data.user_email === "string" && data.user_email) return data.user_email;

  // Nested user object
  const user = data.user as Record<string, unknown> | undefined;
  if (user && typeof user.email === "string" && user.email) return user.email;

  // Top-level (if no data wrapper)
  if (typeof payload.email === "string" && payload.email) return payload.email;
  if (typeof payload.user_email === "string" && payload.user_email)
    return payload.user_email;

  // Billing info
  const billing = data.billing_address as Record<string, unknown> | undefined;
  if (billing && typeof billing.email === "string") return billing.email;

  return "";
}

/**
 * Extract plan ID from any Whop webhook payload structure.
 */
function extractPlanId(payload: Record<string, unknown>): string {
  const data = (payload.data ?? payload) as Record<string, unknown>;

  // Whop v2 uses "plan", v5 uses "plan_id"
  if (typeof data.plan_id === "string" && data.plan_id) return data.plan_id;
  if (typeof data.plan === "string" && data.plan) return data.plan;

  // Nested plan object
  const plan = data.plan as Record<string, unknown> | undefined;
  if (plan && typeof plan.id === "string") return plan.id;

  // Top-level
  if (typeof payload.plan_id === "string" && payload.plan_id) return payload.plan_id;
  if (typeof payload.plan === "string" && payload.plan) return payload.plan;

  return "";
}

/**
 * Extract first name from payload if available.
 */
function extractFirstName(payload: Record<string, unknown>): string | undefined {
  const data = (payload.data ?? payload) as Record<string, unknown>;

  // v2 payments have billing_first_name
  if (typeof data.billing_first_name === "string") return data.billing_first_name;

  // billing_address might have name
  const billing = data.billing_address as Record<string, unknown> | undefined;
  if (billing && typeof billing.name === "string") {
    return billing.name.split(" ")[0];
  }

  return undefined;
}

/**
 * GET handler — health check endpoint
 */
export async function GET() {
  return NextResponse.json({
    ok: true,
    service: "whop-webhook",
    beehiiv_configured: !!BEEHIIV_API_KEY,
    whop_secret_configured: !!WHOP_WEBHOOK_SECRET,
    timestamp: new Date().toISOString(),
  });
}

/**
 * POST handler — receive Whop webhook events
 */
export async function POST(request: Request) {
  let rawBody: string;
  try {
    rawBody = await request.text();
  } catch {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  // Log the full payload for debugging
  console.log(`[whop-webhook] Received payload: ${rawBody.slice(0, 2000)}`);

  // Verify signature if configured
  const signature =
    request.headers.get("whop-signature") ??
    request.headers.get("x-whop-signature") ??
    request.headers.get("x-webhook-signature") ??
    "";

  if (WHOP_WEBHOOK_SECRET && signature) {
    if (!verifySignature(rawBody, signature, WHOP_WEBHOOK_SECRET)) {
      console.error("[whop-webhook] Signature verification failed");
      return NextResponse.json(
        { error: "Invalid signature" },
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

  // Whop uses "action" in v2 and possibly "event" in v5
  const eventType =
    (payload.action as string) ??
    (payload.event as string) ??
    (payload.type as string) ??
    "unknown";

  console.log(`[whop-webhook] Event type: ${eventType}`);

  // Process purchase-related events
  const purchaseEvents = [
    "membership.went_valid",
    "membership_activated",
    "membership.activated",
    "payment.succeeded",
    "payment_succeeded",
    "payment.completed",
    "membership.completed",
  ];

  if (!purchaseEvents.includes(eventType)) {
    console.log(`[whop-webhook] Skipping non-purchase event: ${eventType}`);
    return NextResponse.json({ ok: true, skipped: true, event: eventType });
  }

  const email = extractEmail(payload);
  const planId = extractPlanId(payload);
  const firstName = extractFirstName(payload);

  console.log(
    `[whop-webhook] Extracted: email=${email} plan=${planId} firstName=${firstName}`
  );

  if (!email) {
    console.error(
      `[whop-webhook] No email found in payload: ${JSON.stringify(payload).slice(0, 500)}`
    );
    return NextResponse.json(
      { error: "No email in payload", event: eventType },
      { status: 400 }
    );
  }

  // Determine product tag from plan ID
  const productTag = PLAN_MAP[planId] ?? "framework_only";

  console.log(
    `[whop-webhook] Processing: ${eventType} | ${email} | plan=${planId} | tag=${productTag}`
  );

  const result = await createBeehiivSubscriber(email, productTag, firstName);

  if (!result.ok) {
    console.error(`[whop-webhook] Failed: ${result.error}`);
    // Still return 200 so Whop doesn't retry endlessly
    return NextResponse.json({
      ok: false,
      warning: result.error,
      event: eventType,
    });
  }

  return NextResponse.json({
    ok: true,
    email,
    product: productTag,
    event: eventType,
  });
}
