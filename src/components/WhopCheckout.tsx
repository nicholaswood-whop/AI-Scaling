"use client";

import { useEffect, useRef } from "react";
import { WhopCheckoutEmbed } from "@whop/checkout/react";
import { trackCTAClick } from "@/components/TrackingEnhanced";

/**
 * Whop embedded checkout — single clean $27 offer.
 *
 * Base plan: $27 AI Business Framework (NEXT_PUBLIC_WHOP_PLAN_ID)
 *
 * The $10 Marketing Playbook order bump was removed from checkout to reduce
 * decision friction at the modal (visitors were reaching InitiateCheckout and
 * stalling). That upsell now lives in the post-purchase email sequence (Day 3).
 */
export default function WhopCheckout() {
  const basePlanId = process.env.NEXT_PUBLIC_WHOP_PLAN_ID ?? "";
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://aiscalingco.com";

  const checkoutRef = useRef<HTMLDivElement>(null);
  const checkoutViewedRef = useRef(false);

  const checkoutValue = 27.0;

  // Track when checkout section scrolls into view
  useEffect(() => {
    const el = checkoutRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !checkoutViewedRef.current) {
            checkoutViewedRef.current = true;
            trackCTAClick("checkout_visible", { value: checkoutValue });
          }
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // Fire Meta Pixel InitiateCheckout when the embed loads
    if (typeof window !== "undefined" && typeof window.fbq === "function") {
      window.fbq("track", "InitiateCheckout", {
        content_name: "AI Business Framework - 7 Day Launch",
        content_category: "Digital Product",
        value: checkoutValue,
        currency: "USD",
      });
    }

    // Fire GA4 begin_checkout
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("event", "begin_checkout", {
        currency: "USD",
        value: checkoutValue,
        items: [
          {
            item_name: "AI Business Framework - 7 Day Launch",
            price: checkoutValue,
            quantity: 1,
          },
        ],
      });
    }
  }, []);

  if (!basePlanId) {
    return (
      <div className="rounded-xl border border-white/10 bg-white/5 p-6 text-center text-gray-400 text-sm">
        Checkout unavailable — plan not configured.
      </div>
    );
  }

  return (
    <div ref={checkoutRef} className="w-full">
      {/* Checkout Embed — single $27 plan, no order bump */}
      <WhopCheckoutEmbed
        planId={basePlanId}
        theme="dark"
        returnUrl={`${siteUrl}/ebook?status=success`}
      />
    </div>
  );
}
