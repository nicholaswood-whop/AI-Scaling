"use client";

import { useEffect } from "react";

/**
 * Thank-you / post-purchase confirmation page.
 * Whop redirects here after successful checkout.
 * URL: aiscalingco.com/thank-you
 */
export default function ThankYouPage() {
  useEffect(() => {
    // Fire Meta Pixel Purchase event
    if (typeof window !== "undefined" && typeof window.fbq === "function") {
      window.fbq("track", "Purchase", {
        content_name: "AI Business Framework",
        content_category: "Digital Product",
        value: 27.0,
        currency: "USD",
      });
    }
    // Fire GA4 purchase event
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("event", "purchase", {
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

  return (
    <main className="min-h-screen bg-[#0a0a0f] text-gray-200">
      <div className="mx-auto max-w-3xl px-6 py-20 text-center">
        {/* Success icon */}
        <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-green-500/10 ring-2 ring-green-500/30">
          <svg
            className="h-10 w-10 text-green-400"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 12.75l6 6 9-13.5"
            />
          </svg>
        </div>

        <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-green-400">
          Purchase Confirmed
        </p>

        <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl">
          You&apos;re In.
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-lg text-gray-400 leading-relaxed">
          Your 7-Day AI Launch Framework is ready. Follow the steps below to
          access your course and start building.
        </p>

        {/* Steps */}
        <div className="mt-12 space-y-6 text-left">
          {/* Step 1 */}
          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-6">
            <div className="flex items-start gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-500/20 text-sm font-bold text-indigo-400">
                1
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">
                  Set Up Your Whop Account
                </h3>
                <p className="mt-2 text-gray-400">
                  If you don&apos;t have a Whop account yet, create one to access
                  your purchase. If you already have one, skip to Step 2.
                </p>
                <a
                  href="https://whop.com/network/?a=nicholas"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-white/10"
                >
                  Create Whop Account
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-6">
            <div className="flex items-start gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cyan-500/20 text-sm font-bold text-cyan-400">
                2
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">
                  Access Your Course
                </h3>
                <p className="mt-2 text-gray-400">
                  Click below to go directly to your 7-Day Blueprint. Download
                  the framework PDF and start with Day 1.
                </p>
                <a
                  href="https://whop.com/joined/ai-scaling-co/7-day-blueprint-G7AyHVUk7jinXA/app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-indigo-500 to-cyan-500 px-6 py-3 text-sm font-bold text-white transition hover:opacity-90"
                >
                  Open My Course →
                </a>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-6">
            <div className="flex items-start gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-500/20 text-sm font-bold text-green-400">
                3
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">
                  Follow the System
                </h3>
                <p className="mt-2 text-gray-400">
                  Each day has specific tasks and AI prompts. Follow them in
                  order — Day 1 sets the foundation that everything else builds
                  on. In 7 days, you&apos;ll have a live, revenue-generating
                  business.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* What's next box */}
        <div className="mt-12 rounded-xl border border-white/5 bg-white/[0.02] p-8">
          <h3 className="text-lg font-semibold text-white">
            📬 Check Your Inbox
          </h3>
          <p className="mt-3 text-gray-400">
            Over the next 7 days, you&apos;ll receive daily emails with tips,
            shortcuts, and advanced strategies that go beyond the framework.
            These are designed to accelerate your progress at each stage.
          </p>
        </div>

        {/* Footer */}
        <p className="mt-16 text-sm text-gray-600">
          Questions? Reply to any of our emails — we read everything.
        </p>
      </div>
    </main>
  );
}
