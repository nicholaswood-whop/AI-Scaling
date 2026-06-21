"use client";

import { useEffect, useRef } from "react";
import { WhopCheckoutEmbed } from "@whop/checkout/react";
import { trackCTAClick } from "@/components/TrackingEnhanced";

/**
 * Whop embedded checkout for the SellerSync Academy Mini-Mentorship replica.
 *
 * Plan: one-time Mini-Mentorship (NEXT_PUBLIC_WHOP_MINI_PLAN_ID).
 * Replaces the original ClickFunnels order form with Whop's embedded checkout.
 *
 * Fires InitiateCheckout / begin_checkout the first time the embed scrolls
 * into view so Meta + GA4 see the funnel step.
 */
const OFFER_NAME = "SellerSync Academy Mini-Mentorship";
const OFFER_VALUE = 17.99;

export default function MiniCheckout() {
  // One-time Mini-Mentorship plan. Hardcoded default so checkout works without
  // a Vercel env var; NEXT_PUBLIC_WHOP_MINI_PLAN_ID still overrides it.
  const planId =
    process.env.NEXT_PUBLIC_WHOP_MINI_PLAN_ID ?? "plan_GOdiSL0I2UeYo";
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://aiscalingco.com";

  const checkoutRef = useRef<HTMLDivElement>(null);
  const firedRef = useRef(false);

  // Fire checkout-funnel events the first time the embed is visible.
  useEffect(() => {
    const el = checkoutRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !firedRef.current) {
            firedRef.current = true;
            trackCTAClick("checkout_visible", { value: OFFER_VALUE });

            if (typeof window !== "undefined" && typeof window.fbq === "function") {
              window.fbq("track", "InitiateCheckout", {
                content_name: OFFER_NAME,
                content_category: "Digital Product",
                value: OFFER_VALUE,
                currency: "USD",
              });
            }
            if (typeof window !== "undefined" && typeof window.gtag === "function") {
              window.gtag("event", "begin_checkout", {
                currency: "USD",
                value: OFFER_VALUE,
                items: [{ item_name: OFFER_NAME, price: OFFER_VALUE, quantity: 1 }],
              });
            }
          }
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  if (!planId) {
    return (
      <div className="rounded-xl border border-white/10 bg-white/5 p-6 text-center text-gray-400 text-sm">
        Checkout unavailable — set <code>NEXT_PUBLIC_WHOP_MINI_PLAN_ID</code> to
        the Whop Mini-Mentorship plan.
      </div>
    );
  }

  return (
    <div ref={checkoutRef} className="w-full">
      <WhopCheckoutEmbed
        key={planId}
        planId={planId}
        theme="light"
        themeOptions={{ accentColor: "green" }}
        returnUrl={`${siteUrl}/thank-you`}
      />
    </div>
  );
}
