"use client";

import { useState, useEffect, useRef } from "react";
import { WhopCheckoutEmbed } from "@whop/checkout/react";
import { trackCTAClick } from "@/components/TrackingEnhanced";

/**
 * Whop embedded checkout with optional order bump.
 *
 * Base plan: $27 AI Business Framework (NEXT_PUBLIC_WHOP_PLAN_ID)
 * Order bump: $37 AI Marketing Bundle (NEXT_PUBLIC_WHOP_BUMP_PLAN_ID)
 *
 * When the order bump is toggled on, the checkout switches to the
 * $37 bundle plan so the customer gets both PDFs for $37.
 */
export default function WhopCheckout() {
  const basePlanId = process.env.NEXT_PUBLIC_WHOP_PLAN_ID ?? "";
  const bumpPlanId = process.env.NEXT_PUBLIC_WHOP_BUMP_PLAN_ID ?? "";
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://aiscalingco.com";

  const [bumpActive, setBumpActive] = useState(false);
  const checkoutRef = useRef<HTMLDivElement>(null);
  const checkoutViewedRef = useRef(false);

  const activePlanId = bumpActive && bumpPlanId ? bumpPlanId : basePlanId;
  const activeValue = bumpActive ? 37.0 : 27.0;

  // Track when checkout section scrolls into view
  useEffect(() => {
    const el = checkoutRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !checkoutViewedRef.current) {
            checkoutViewedRef.current = true;
            trackCTAClick("checkout_visible", { value: activeValue });
          }
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [activeValue]);

  useEffect(() => {
    // Fire Meta Pixel InitiateCheckout when the embed loads
    if (typeof window !== "undefined" && typeof window.fbq === "function") {
      window.fbq("track", "InitiateCheckout", {
        content_name: bumpActive
          ? "AI Business Framework + Marketing Bundle"
          : "AI Business Framework - 7 Day Launch",
        content_category: "Digital Product",
        value: activeValue,
        currency: "USD",
      });
    }

    // Fire GA4 begin_checkout
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("event", "begin_checkout", {
        currency: "USD",
        value: activeValue,
        items: [
          {
            item_name: bumpActive
              ? "AI Business Framework + Marketing Bundle"
              : "AI Business Framework - 7 Day Launch",
            price: activeValue,
            quantity: 1,
          },
        ],
      });
    }
    // Re-fire tracking when bump toggles
  }, [bumpActive, activeValue]);

  if (!basePlanId) {
    return (
      <div className="rounded-xl border border-white/10 bg-white/5 p-6 text-center text-gray-400 text-sm">
        Checkout unavailable — plan not configured.
      </div>
    );
  }

  return (
    <div ref={checkoutRef} className="w-full space-y-4">
      {/* Order Bump */}
      {bumpPlanId && (
        <div
          className={`relative rounded-xl border-2 transition-all duration-200 cursor-pointer ${
            bumpActive
              ? "border-emerald-500/60 bg-emerald-500/[0.08]"
              : "border-white/10 bg-white/[0.03] hover:border-white/20"
          }`}
          onClick={() => {
            const newState = !bumpActive;
            setBumpActive(newState);
            trackCTAClick("order_bump_toggle", { bump_active: newState, value: newState ? 37 : 27 });
          }}
        >
          {/* "ADD-ON" badge */}
          <div
            className={`absolute -top-2.5 left-4 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
              bumpActive
                ? "bg-emerald-500 text-black"
                : "bg-white/10 text-gray-400"
            }`}
          >
            One-Time Add-On
          </div>

          <div className="flex items-start gap-3 p-4 pt-5">
            {/* Toggle */}
            <div className="mt-0.5 flex-shrink-0">
              <div
                className={`flex h-5 w-5 items-center justify-center rounded border-2 transition-all ${
                  bumpActive
                    ? "border-emerald-500 bg-emerald-500"
                    : "border-white/20 bg-transparent"
                }`}
              >
                {bumpActive && (
                  <svg
                    className="h-3 w-3 text-black"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </div>
            </div>

            {/* Copy */}
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline justify-between gap-2">
                <h3 className="text-sm font-bold text-white leading-tight">
                  Add the AI Marketing Playbook
                </h3>
                <span className="flex-shrink-0 text-sm font-bold text-emerald-400">
                  +$10
                </span>
              </div>
              <p className="mt-1 text-xs text-gray-400 leading-relaxed">
                Master ads &amp; marketing with your AI operator — Meta Pixel
                setup, campaign architecture, A/B testing, automated
                optimization, scaling rules, and the daily workflow. 11-page
                companion guide.
              </p>
              {bumpActive && (
                <p className="mt-2 text-xs font-medium text-emerald-400">
                  ✓ Bundle price: $37 for both guides (save buying separately)
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Checkout Embed — re-mounts with new key when plan changes */}
      <WhopCheckoutEmbed
        key={activePlanId}
        planId={activePlanId}
        theme="dark"
        returnUrl={`${siteUrl}/ebook?status=success`}
      />
    </div>
  );
}
