"use client";

import { useEffect } from "react";
import { WhopCheckoutEmbed } from "@whop/checkout/react";

/**
 * Whop embedded checkout for the $27 AI Business Framework.
 * Uses the official @whop/checkout package to embed the checkout
 * iframe directly on the page — no redirect needed.
 *
 * Set NEXT_PUBLIC_WHOP_PLAN_ID in your environment.
 */
export default function WhopCheckout() {
  const planId = process.env.NEXT_PUBLIC_WHOP_PLAN_ID ?? "";
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://aiscalingco.com";

  useEffect(() => {
    // Fire Meta Pixel InitiateCheckout when the embed loads
    if (typeof window !== "undefined" && typeof window.fbq === "function") {
      window.fbq("track", "InitiateCheckout", {
        content_name: "AI Business Framework - 7 Day Launch",
        content_category: "Digital Product",
        value: 27.0,
        currency: "USD",
      });
    }

    // Fire GA4 begin_checkout
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("event", "begin_checkout", {
        currency: "USD",
        value: 27.0,
        items: [
          {
            item_name: "AI Business Framework - 7 Day Launch",
            price: 27.0,
            quantity: 1,
          },
        ],
      });
    }
  }, []);

  if (!planId) {
    return (
      <div className="rounded-xl border border-white/10 bg-white/5 p-6 text-center text-gray-400 text-sm">
        Checkout unavailable — plan not configured.
      </div>
    );
  }

  return (
    <div className="w-full">
      <WhopCheckoutEmbed
        planId={planId}
        theme="dark"
        returnUrl={`${siteUrl}/ebook?status=success`}
      />
    </div>
  );
}
