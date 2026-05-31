"use client";

import { useState } from "react";

/**
 * Whop embedded checkout button for the $27 AI Business Framework.
 *
 * Set NEXT_PUBLIC_WHOP_PLAN_ID in your environment. When missing, the
 * button links to whop.com as a fallback.
 *
 * Fires Meta Pixel "InitiateCheckout" event on click.
 */
export default function WhopCheckout() {
  const [isLoading, setIsLoading] = useState(false);
  const planId = process.env.NEXT_PUBLIC_WHOP_PLAN_ID ?? "";

  const checkoutUrl = planId
    ? `https://whop.com/checkout/${planId}/?d2c=true`
    : "https://whop.com";

  function handleClick() {
    setIsLoading(true);

    // Fire Meta Pixel InitiateCheckout event
    if (typeof window !== "undefined" && typeof window.fbq === "function") {
      window.fbq("track", "InitiateCheckout", {
        content_name: "AI Business Framework - 7 Day Launch",
        content_category: "Digital Product",
        value: 27.0,
        currency: "USD",
      });
    }

    // Fire GA4 begin_checkout event
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

    window.open(checkoutUrl, "_blank");
    setTimeout(() => setIsLoading(false), 1000);
  }

  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
      className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-accent to-purple-600 px-8 py-4 text-lg font-bold text-white shadow-lg shadow-accent/25 transition-all hover:shadow-xl hover:shadow-accent/30 hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        {isLoading ? (
          "Opening checkout…"
        ) : (
          <>
            Get Instant Access — $27
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 transition-transform group-hover:translate-x-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </>
        )}
      </span>
      <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform group-hover:translate-x-full duration-700" />
    </button>
  );
}
