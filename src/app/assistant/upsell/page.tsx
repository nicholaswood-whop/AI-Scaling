"use client";

import { useEffect, useRef, useState, useCallback } from "react";

/**
 * One-Click Upsell page — shown immediately after the $47 AI Assistant
 * Blueprint purchase.
 *
 * Offer: $2,997 Done-For-You Setup. Intentionally vague / systems-focused —
 * "we come in and build out all your systems start to finish," NOT tied to any
 * one tool. The customer's card is already saved (off_session) from the $47
 * checkout, so accepting is a single click with no card re-entry.
 *
 * Flow:
 *   - Whop redirects here as /assistant/upsell?payment_id=pay_xxx
 *   - Accept  → POST /api/upsell-charge → charges saved card → /assistant/done?dfy=1
 *   - Decline → /assistant/done  (Blueprint still delivered)
 */

const DFY_VALUE = 2997.0;
const ASSISTANT_VALUE = 47.0;
const DONE_URL = "/assistant/done";

const mono = { fontFamily: "'Courier New', Courier, monospace" } as const;
const helv = {
  fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
} as const;

type Status =
  | { kind: "idle" }
  | { kind: "loading" }
  | { kind: "error"; message: string }
  | { kind: "success" };

function resolvePaymentId(): string {
  if (typeof window === "undefined") return "";
  const fromUrl = (urlStr: string): string => {
    try {
      const u = new URL(urlStr, window.location.href);
      return u.searchParams.get("payment_id") || u.searchParams.get("receipt_id") || "";
    } catch {
      return "";
    }
  };
  const getCookie = (k: string): string => {
    const row = document.cookie
      .split("; ")
      .find((r) => r.startsWith(k + "="));
    return row ? decodeURIComponent(row.split("=")[1]) : "";
  };

  const pid =
    fromUrl(window.location.href) ||
    (document.referrer ? fromUrl(document.referrer) : "") ||
    sessionStorage.getItem("payment_id") ||
    localStorage.getItem("payment_id") ||
    getCookie("wd_pid");

  if (pid) {
    try {
      sessionStorage.setItem("payment_id", pid);
      localStorage.setItem("payment_id", pid);
      document.cookie = `wd_pid=${encodeURIComponent(pid)}; path=/; SameSite=Lax`;
    } catch {
      /* storage may be blocked */
    }
  }
  return pid;
}

export default function UpsellPage() {
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [paymentId, setPaymentId] = useState<string>("");
  const firedRef = useRef(false);

  // Resolve payment_id + fire funnel events once on mount.
  useEffect(() => {
    const pid = resolvePaymentId();
    setPaymentId(pid);

    if (firedRef.current) return;
    firedRef.current = true;

    // The $47 purchase is now complete — fire Purchase ($47), guarded so a
    // refresh doesn't double-count.
    try {
      const key = `purchase_fired_${pid || "noid"}`;
      if (!sessionStorage.getItem(key)) {
        sessionStorage.setItem(key, "1");
        if (typeof window.fbq === "function") {
          window.fbq("track", "Purchase", {
            content_name: "AI Assistant Blueprint",
            content_category: "Digital Product",
            value: ASSISTANT_VALUE,
            currency: "USD",
          });
        }
        if (typeof window.gtag === "function") {
          window.gtag("event", "purchase", {
            currency: "USD",
            value: ASSISTANT_VALUE,
            items: [
              { item_name: "AI Assistant Blueprint", price: ASSISTANT_VALUE, quantity: 1 },
            ],
          });
        }
      }
    } catch {
      /* ignore */
    }

    // The DFY upsell is now being viewed — InitiateCheckout ($2,997).
    if (typeof window.fbq === "function") {
      window.fbq("track", "InitiateCheckout", {
        content_name: "Done-For-You Setup",
        content_category: "Service",
        value: DFY_VALUE,
        currency: "USD",
      });
    }
    if (typeof window.gtag === "function") {
      window.gtag("event", "view_item", {
        currency: "USD",
        value: DFY_VALUE,
        items: [{ item_name: "Done-For-You Setup", price: DFY_VALUE, quantity: 1 }],
      });
    }
  }, []);

  const accept = useCallback(async () => {
    if (status.kind === "loading") return;
    if (!paymentId) {
      setStatus({
        kind: "error",
        message:
          "We couldn't find your order reference. Please check your email for your receipt or contact support.",
      });
      return;
    }
    setStatus({ kind: "loading" });
    try {
      const res = await fetch("/api/upsell-charge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ payment_id: paymentId }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setStatus({
          kind: "error",
          message: data.error || "Payment failed. Please try again.",
        });
        return;
      }
      setStatus({ kind: "success" });
      // Fire the $2,997 Purchase, then route to the confirmation page.
      if (typeof window.fbq === "function") {
        window.fbq("track", "Purchase", {
          content_name: "Done-For-You Setup",
          content_category: "Service",
          value: DFY_VALUE,
          currency: "USD",
        });
      }
      if (typeof window.gtag === "function") {
        window.gtag("event", "purchase", {
          currency: "USD",
          value: DFY_VALUE,
          items: [{ item_name: "Done-For-You Setup", price: DFY_VALUE, quantity: 1 }],
        });
      }
      setTimeout(() => {
        window.location.href = `${DONE_URL}?dfy=1`;
      }, 900);
    } catch {
      setStatus({
        kind: "error",
        message: "Connection error. Please check your internet and try again.",
      });
    }
  }, [paymentId, status.kind]);

  const decline = useCallback(() => {
    window.location.href = DONE_URL;
  }, []);

  const loading = status.kind === "loading";
  const done = status.kind === "success";

  return (
    <main className="min-h-screen bg-black text-white" style={helv}>
      <div className="mx-auto max-w-3xl px-6 py-12 sm:py-16">
        {/* Order confirmed bar */}
        <div className="mb-10 flex items-center gap-3 border border-white/15 bg-white/[0.03] px-5 py-4">
          <span className="text-lg leading-none text-emerald-400">✓</span>
          <p className="text-sm text-gray-300">
            <span className="font-semibold text-white">Order confirmed.</span>{" "}
            Your AI Assistant Blueprint is on its way to your inbox.
          </p>
        </div>

        {/* Eyebrow */}
        <p
          className="mb-5 text-[11px] uppercase tracking-[0.22em] text-emerald-400"
          style={mono}
        >
          Wait — one quick thing before you go
        </p>

        {/* Headline */}
        <h1 className="text-3xl font-bold leading-[1.1] sm:text-5xl">
          Don&apos;t want to set it all up yourself?
          <br />
          <span className="text-gray-400">Let my team do it for you.</span>
        </h1>

        <p className="mt-6 max-w-2xl text-base leading-relaxed text-gray-300 sm:text-lg">
          You just got the exact blueprint. But if you&apos;d rather skip the
          learning curve entirely — my team and I will come in and build out
          your <span className="text-white">entire system from start to finish</span>,
          custom to your business. You don&apos;t lift a finger. We hand you the
          keys to something that just runs.
        </p>

        {/* Offer card */}
        <div className="mt-10 border border-white/15 bg-white/[0.03] p-7 sm:p-9">
          <p
            className="mb-6 text-[11px] uppercase tracking-[0.22em] text-gray-500"
            style={mono}
          >
            The Done-For-You Setup
          </p>

          <ul className="space-y-4">
            {[
              "A 1-on-1 onboarding call where we map your business, your goals, and exactly what you need running.",
              "We build out your entire system end to end — every piece set up, connected, and configured for you.",
              "Your day-to-day workflows and automations, designed around how you actually work.",
              "Everything tuned to your business, your voice, and your priorities — not a generic template.",
              "Direct access to me and my team throughout the whole build.",
              "You watch it come together — then we hand you a finished system that runs without you.",
            ].map((item) => (
              <li key={item} className="flex gap-3 text-[15px] leading-relaxed text-gray-200">
                <span className="mt-1 flex-shrink-0 text-emerald-400">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex items-baseline gap-3 border-t border-white/10 pt-6">
            <span className="text-3xl font-bold text-white">$2,997</span>
            <span className="text-sm text-gray-500">one-time · done-for-you</span>
          </div>

          {/* Accept button — one click, card already on file */}
          <button
            type="button"
            onClick={accept}
            disabled={loading || done}
            className="mt-6 flex w-full flex-col items-center justify-center rounded-md bg-emerald-500 px-6 py-5 text-center font-bold text-black transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              <span className="flex items-center gap-3 text-lg">
                <span className="h-5 w-5 animate-spin rounded-full border-2 border-black/30 border-t-black" />
                Processing…
              </span>
            ) : done ? (
              <span className="text-lg">Payment successful! Redirecting…</span>
            ) : (
              <>
                <span className="text-lg sm:text-xl">
                  YES — BUILD IT ALL FOR ME
                </span>
                <span className="mt-1 text-xs font-semibold text-black/70">
                  One click — your card is already on file, no details to re-enter
                </span>
              </>
            )}
          </button>

          {status.kind === "error" && (
            <p className="mt-4 rounded-md border border-red-400/40 bg-red-500/10 px-4 py-3 text-center text-sm text-red-300">
              {status.message}
            </p>
          )}

          {/* Decline */}
          <button
            type="button"
            onClick={decline}
            disabled={loading || done}
            className="mt-5 w-full text-center text-sm text-gray-500 underline underline-offset-4 transition hover:text-gray-300 disabled:opacity-50"
          >
            No thanks — I&apos;ll set it up myself with the guide.
          </button>
        </div>

        <p className="mt-8 text-center text-xs text-gray-600" style={mono}>
          This offer is only available right now, on this page.
        </p>
      </div>
    </main>
  );
}
