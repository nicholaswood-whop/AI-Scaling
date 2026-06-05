import { NextResponse } from "next/server";

export const runtime = "nodejs";

/**
 * One-Click Upsell — server-side charge
 *
 * Charges a customer's saved card for the $2,997 Done-For-You setup, with no
 * card re-entry, immediately after they buy the $47 AI Assistant Blueprint.
 *
 * Flow (per Whop's one-click upsell pattern):
 *   1. The $47 checkout embed saves the card via setupFutureUsage="off_session"
 *      and redirects to /assistant/upsell?payment_id=pay_xxx
 *   2. The upsell page POSTs that payment_id here when the customer accepts.
 *   3. We retrieve the original payment to get member_id + payment_method_id,
 *      then create a new payment on the DFY plan against that saved card.
 *
 * This replaces the Cloudflare Worker from Whop's generic guide — we already
 * run a Next.js backend, so the same logic lives here. The API key never
 * reaches the browser.
 *
 * Required env (server-only — never NEXT_PUBLIC):
 *   WHOP_API_KEY       Owner-level Whop API key with payment:charge permission.
 *   WHOP_COMPANY_ID    biz_xxx (defaults to AI Scaling Co).
 *   WHOP_DFY_PLAN_ID   plan_xxx for the $2,997 Done-For-You setup.
 */

const BASE = "https://api.whop.com/api/v1";
const API_KEY = process.env.WHOP_API_KEY ?? "";
const COMPANY_ID = process.env.WHOP_COMPANY_ID ?? "biz_FfA6Ya2QrJqzLa";
const DFY_PLAN_ID = process.env.WHOP_DFY_PLAN_ID ?? "";

type WhopPayment = {
  member?: { id?: string };
  user?: { id?: string };
  payment_method?: { id?: string };
  payment_method_id?: string;
};

function json(data: Record<string, unknown>, status = 200) {
  return NextResponse.json(data, {
    status,
    headers: { "Access-Control-Allow-Origin": "*" },
  });
}

export async function OPTIONS() {
  return new NextResponse(null, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}

export async function GET() {
  // Health check — confirms config without exposing secrets.
  return json({
    ok: true,
    service: "upsell-charge",
    api_key_configured: !!API_KEY,
    company_id_configured: !!COMPANY_ID,
    dfy_plan_configured: !!DFY_PLAN_ID,
  });
}

export async function POST(request: Request) {
  if (!API_KEY) {
    return json(
      { error: "Upsell is not configured yet. Please contact support." },
      500
    );
  }
  if (!DFY_PLAN_ID) {
    return json(
      { error: "Upsell plan is not configured yet. Please contact support." },
      500
    );
  }

  let body: { payment_id?: string };
  try {
    body = await request.json();
  } catch {
    return json({ error: "Invalid request body." }, 400);
  }

  const paymentId = body?.payment_id;
  if (!paymentId) {
    return json({ error: "Missing payment reference." }, 400);
  }

  const headers = {
    Authorization: `Bearer ${API_KEY}`,
    "Content-Type": "application/json",
  };

  // Step 1 — retrieve the original payment to get member + saved card.
  let payment: WhopPayment;
  try {
    const res1 = await fetch(`${BASE}/payments/${paymentId}`, { headers });
    const raw = await res1.text();
    console.log("[upsell-charge][retrieve]", res1.status, raw.slice(0, 500));
    if (!res1.ok) {
      return json({ error: "Could not verify your purchase. Please try again." }, 502);
    }
    payment = JSON.parse(raw) as WhopPayment;
  } catch (e) {
    console.error("[upsell-charge][retrieve] error", e);
    return json({ error: "Connection error. Please try again." }, 502);
  }

  const memberId = payment.member?.id ?? payment.user?.id ?? null;
  const paymentMethodId =
    payment.payment_method?.id ?? payment.payment_method_id ?? null;

  if (!memberId) {
    return json({ error: "We couldn't match this to your account. Please contact support." }, 502);
  }
  if (!paymentMethodId) {
    // off_session was missing, or the first checkout was a free/100%-off test.
    return json(
      {
        error:
          "No saved card found for this purchase. Please contact support and we'll get you set up.",
      },
      502
    );
  }

  // Step 2 — charge the saved card on the DFY plan.
  try {
    const res2 = await fetch(`${BASE}/payments`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        company_id: COMPANY_ID,
        member_id: memberId,
        payment_method_id: paymentMethodId,
        plan_id: DFY_PLAN_ID,
      }),
    });
    const data = (await res2.json()) as Record<string, unknown>;
    console.log("[upsell-charge][charge]", res2.status, JSON.stringify(data).slice(0, 500));

    if (!res2.ok) {
      const rawErr = String(data?.error ?? data?.message ?? "").toLowerCase();
      let msg = "Your payment could not be processed. Please try again.";
      if (rawErr.includes("insufficient")) msg = "Card declined: insufficient funds.";
      else if (rawErr.includes("declined")) msg = "Card declined. Please contact your bank or try a different card.";
      else if (rawErr.includes("3ds")) msg = "Your bank requires additional verification for this charge.";
      else if (rawErr.includes("expired")) msg = "Your card appears expired. Please contact support.";
      else if (rawErr.includes("fraud")) msg = "Transaction flagged. Please contact your bank.";
      else if (rawErr.includes("limit")) msg = "Card limit reached. Please use a different card.";
      return json({ error: msg }, 502);
    }

    return json({ success: true, id: data.id, status: data.status });
  } catch (e) {
    console.error("[upsell-charge][charge] error", e);
    return json({ error: "Connection error. Please try again." }, 502);
  }
}
