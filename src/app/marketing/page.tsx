"use client";

import { useEffect } from "react";

/**
 * AI Marketing Bundle — standalone upgrade page for $27 framework-only buyers.
 * Links directly to the Whop checkout for the marketing product.
 * Matches the PDF-style aesthetic used across the site.
 */
export default function MarketingPage() {
  const marketingPlanId = "plan_CrWhYNtzhxpf1";

  useEffect(() => {
    if (typeof window !== "undefined" && typeof window.fbq === "function") {
      window.fbq("track", "ViewContent", {
        content_name: "AI Marketing Bundle - Upgrade",
        content_category: "Marketing Upsell Page",
        value: 10.0,
        currency: "USD",
      });
    }
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("event", "view_item", {
        currency: "USD",
        value: 10.0,
        items: [
          {
            item_name: "AI Marketing Bundle",
            price: 10.0,
            quantity: 1,
          },
        ],
      });
    }
  }, []);

  return (
    <main
      className="min-h-screen text-white"
      style={{ backgroundColor: "#0a0a0a" }}
    >
      {/* ── Hero ── */}
      <section className="mx-auto max-w-3xl px-8 pt-20 pb-16">
        <p
          className="mb-6 text-xs uppercase tracking-[0.25em]"
          style={{
            fontFamily: "'Courier New', Courier, monospace",
            color: "rgba(255,255,255,0.35)",
          }}
        >
          AI SCALING CO · FOR FRAMEWORK OWNERS
        </p>
        <h1
          className="text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl"
          style={{
            fontFamily:
              "'Helvetica Neue', Helvetica, Arial, sans-serif",
            letterSpacing: "-0.03em",
          }}
        >
          You Built It.
          <br />
          Now Scale It.
        </h1>
        <div
          className="my-8"
          style={{
            width: 120,
            height: 1,
            backgroundColor: "rgba(255,255,255,0.15)",
          }}
        />
        <p
          className="text-lg leading-relaxed"
          style={{ color: "rgba(255,255,255,0.50)" }}
        >
          The AI Marketing Playbook picks up where the 7-Day Framework
          left off. Ads, content, traffic, conversions — all powered by
          AI.
        </p>
      </section>

      {/* ── The Problem ── */}
      <section className="mx-auto max-w-3xl px-8 pb-16">
        <p
          className="mb-6 text-xs uppercase tracking-[0.25em]"
          style={{
            fontFamily: "'Courier New', Courier, monospace",
            color: "rgba(255,255,255,0.25)",
          }}
        >
          THE REALITY
        </p>
        <h2
          className="text-3xl font-extrabold leading-tight sm:text-4xl"
          style={{
            fontFamily:
              "'Helvetica Neue', Helvetica, Arial, sans-serif",
            letterSpacing: "-0.03em",
          }}
        >
          A live business with zero traffic is just a page on the
          internet.
        </h2>
        <div
          className="my-8"
          style={{
            width: 80,
            height: 1,
            backgroundColor: "rgba(255,255,255,0.10)",
          }}
        />
        <p
          className="text-base leading-relaxed"
          style={{ color: "rgba(255,255,255,0.45)" }}
        >
          You followed the framework. Your product is live. Your checkout
          works. But customers don&apos;t magically appear. You need a
          system to get eyeballs on your offer — and this is it.
        </p>
      </section>

      {/* ── What's Inside ── */}
      <section className="mx-auto max-w-3xl px-8 pb-16">
        <p
          className="mb-6 text-xs uppercase tracking-[0.25em]"
          style={{
            fontFamily: "'Courier New', Courier, monospace",
            color: "rgba(255,255,255,0.25)",
          }}
        >
          WHAT&apos;S INSIDE
        </p>

        <div className="space-y-6">
          {[
            {
              title: "Meta Ads from Scratch",
              desc: "Set up your first campaign step by step. Pixel, audiences, creatives, budget — the full playbook.",
            },
            {
              title: "AI-Generated Ad Creatives",
              desc: "Use your AI operator to generate scroll-stopping ads. Hooks, copy, images — all templated.",
            },
            {
              title: "Targeting That Converts",
              desc: "Interest stacking, lookalikes, broad targeting — when to use each and why.",
            },
            {
              title: "The Content Engine",
              desc: "Organic growth across LinkedIn, X, and Instagram. AI writes it, you approve it.",
            },
            {
              title: "Landing Page Optimization",
              desc: "What to test, what to change, and how to turn clicks into customers.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="flex gap-4"
              style={{
                borderLeft: "1px solid rgba(255,255,255,0.08)",
                paddingLeft: 20,
              }}
            >
              <div>
                <h3
                  className="text-base font-bold"
                  style={{ color: "rgba(255,255,255,0.85)" }}
                >
                  {item.title}
                </h3>
                <p
                  className="mt-1 text-sm leading-relaxed"
                  style={{ color: "rgba(255,255,255,0.40)" }}
                >
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="mx-auto max-w-3xl px-8 pb-16">
        <div
          className="grid grid-cols-3 gap-8 py-10"
          style={{
            borderTop: "1px solid rgba(255,255,255,0.06)",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          {[
            { stat: "11", label: "pages" },
            { stat: "$10", label: "one-time" },
            { stat: "∞", label: "access" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <p
                className="text-3xl font-extrabold"
                style={{
                  fontFamily:
                    "'Helvetica Neue', Helvetica, Arial, sans-serif",
                  letterSpacing: "-0.03em",
                }}
              >
                {s.stat}
              </p>
              <p
                className="mt-1 text-xs uppercase tracking-[0.2em]"
                style={{
                  fontFamily: "'Courier New', Courier, monospace",
                  color: "rgba(255,255,255,0.30)",
                }}
              >
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="mx-auto max-w-xl px-8 pb-20 text-center">
        <h2
          className="mb-4 text-3xl font-extrabold"
          style={{
            fontFamily:
              "'Helvetica Neue', Helvetica, Arial, sans-serif",
            letterSpacing: "-0.03em",
          }}
        >
          Add the Marketing Playbook
        </h2>
        <p
          className="mb-8 text-base leading-relaxed"
          style={{ color: "rgba(255,255,255,0.45)" }}
        >
          You already have the launch system. This is how you get
          customers.
        </p>
        <a
          href={`https://whop.com/checkout/${marketingPlanId}/`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block rounded-lg px-10 py-4 text-base font-bold transition-opacity hover:opacity-90"
          style={{
            backgroundColor: "#ffffff",
            color: "#0a0a0a",
          }}
        >
          Get the Marketing Playbook — $10
        </a>
        <p
          className="mt-4 text-xs"
          style={{
            fontFamily: "'Courier New', Courier, monospace",
            color: "rgba(255,255,255,0.20)",
          }}
        >
          One-time payment · Instant access via Whop
        </p>
      </section>

      {/* ── FAQ ── */}
      <section className="mx-auto max-w-2xl px-8 pb-20 pt-8">
        <h2
          className="mb-10 text-2xl font-extrabold"
          style={{
            fontFamily:
              "'Helvetica Neue', Helvetica, Arial, sans-serif",
            letterSpacing: "-0.03em",
          }}
        >
          Questions
        </h2>
        <div className="space-y-0">
          {[
            {
              q: "Do I need the 7-Day Framework first?",
              a: "Yes — this playbook assumes you've already built your product using the framework. It picks up where Day 7 ends.",
            },
            {
              q: "What if I already got the bundle?",
              a: "If you purchased the $37 bundle at checkout, you already have this. Check your Whop account under My Products.",
            },
            {
              q: "How is this different from the framework?",
              a: "The framework builds your business. This playbook gets it customers — ads, content, and traffic strategies.",
            },
            {
              q: "Do I need an ad budget?",
              a: "The playbook works with as little as $20/day. Organic strategies are also covered if you want to start free.",
            },
          ].map((item) => (
            <details
              key={item.q}
              className="group py-5"
              style={{
                borderBottom: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <summary className="flex cursor-pointer items-center justify-between text-sm font-semibold">
                <span>{item.q}</span>
                <svg
                  className="h-4 w-4 transition-transform group-open:rotate-180"
                  style={{ color: "rgba(255,255,255,0.3)" }}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </summary>
              <p
                className="mt-3 text-sm leading-relaxed"
                style={{ color: "rgba(255,255,255,0.45)" }}
              >
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="py-10 text-center">
        <p
          className="text-xs uppercase tracking-[0.2em]"
          style={{
            fontFamily: "'Courier New', Courier, monospace",
            color: "rgba(255,255,255,0.15)",
          }}
        >
          AI SCALING CO · AISCALINGCO.COM
        </p>
      </footer>
    </main>
  );
}
