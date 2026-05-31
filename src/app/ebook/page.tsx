"use client";

import { useEffect } from "react";
import WhopCheckout from "@/components/WhopCheckout";

/**
 * Standalone ebook landing page with embedded checkout and VSL placeholder.
 * All ad traffic should be directed here: aiscalingco.com/ebook
 */
export default function EbookPage() {
  useEffect(() => {
    // Fire Meta Pixel ViewContent event for this specific page
    if (typeof window !== "undefined" && typeof window.fbq === "function") {
      window.fbq("track", "ViewContent", {
        content_name: "AI Business Framework - 7 Day Launch",
        content_category: "Ebook Landing Page",
        value: 27.0,
        currency: "USD",
      });
    }
    // GA4 view_item event
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("event", "view_item", {
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
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="glow absolute inset-0 pointer-events-none" />
        <div className="relative mx-auto max-w-4xl px-6 pt-16 pb-12 text-center">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-cyan-400">
            Instant Digital Download
          </p>
          <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            Launch a Business with AI in{" "}
            <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
              7 Days
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-400 leading-relaxed">
            The complete step-by-step framework for using an AI operator to go
            from zero to a launched digital product — validated idea, built
            product, live sales system, and marketing engine.
          </p>
        </div>
      </section>

      {/* VSL Section */}
      <section className="mx-auto max-w-3xl px-6 pb-12">
        <div className="relative aspect-video overflow-hidden rounded-2xl border border-white/10 bg-black/40 shadow-2xl shadow-indigo-500/10">
          {/* VSL placeholder — replace src with your actual video URL */}
          <div className="flex h-full w-full items-center justify-center">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-500/20 ring-1 ring-indigo-500/40">
                <svg
                  className="h-8 w-8 text-indigo-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                </svg>
              </div>
              <p className="text-sm text-gray-500 font-mono uppercase tracking-wider">
                VSL Coming Soon
              </p>
              <p className="mt-1 text-xs text-gray-600">
                Replace this with your video embed
              </p>
            </div>
          </div>
        </div>
        <p className="mt-3 text-center text-xs text-gray-600">
          Watch the 3-minute breakdown of the framework
        </p>
      </section>

      {/* What You Get */}
      <section className="mx-auto max-w-4xl px-6 pb-16">
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 sm:p-10">
          <h2 className="mb-8 text-center text-2xl font-bold text-white">
            What&apos;s Inside the Framework
          </h2>

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                day: "01",
                title: "Find & Validate Your Niche",
                desc: "AI-powered market research, competitive analysis, and idea validation in hours — not weeks.",
              },
              {
                day: "02",
                title: "Build Your Product",
                desc: "Generate a complete digital product (ebook, course, templates) using AI operator prompts.",
              },
              {
                day: "03",
                title: "Set Up Your Sales System",
                desc: "Live checkout page, automatic delivery, email capture, and 3-email welcome sequence.",
              },
              {
                day: "04",
                title: "Create Your Marketing Engine",
                desc: "Ad creatives, copy variations, content calendar, and visual assets — all AI-generated.",
              },
              {
                day: "05",
                title: "Launch & Capture Leads",
                desc: "Pre-launch checklist, tracking pixels, launch sequence, and your first customers.",
              },
              {
                day: "06",
                title: "Optimize & Iterate",
                desc: "Data analysis, kill underperformers, fix funnel leaks, test new variations.",
              },
              {
                day: "07",
                title: "Systemize & Scale",
                desc: "Post-purchase automations, content repurposing, reporting dashboards, and scale plan.",
              },
            ].map((item) => (
              <div
                key={item.day}
                className="flex gap-4 rounded-xl border border-white/5 bg-white/[0.02] p-4"
              >
                <span className="font-mono text-2xl font-bold text-indigo-400/60">
                  {item.day}
                </span>
                <div>
                  <h3 className="font-semibold text-white text-sm">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-xs text-gray-500 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Bonus */}
          <div className="mt-6 rounded-xl border border-cyan-500/20 bg-cyan-500/5 p-4 text-center">
            <p className="text-xs font-mono uppercase tracking-wider text-cyan-400 mb-1">
              Bonus Included
            </p>
            <p className="text-sm text-gray-300">
              The Complete AI Tools Stack — every tool used to run 10+ revenue
              streams
            </p>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="mx-auto max-w-4xl px-6 pb-12">
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { stat: "7 Days", label: "From zero to launched" },
            { stat: "$27", label: "One-time payment" },
            { stat: "11 Pages", label: "Of actionable frameworks" },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-xl border border-white/5 bg-white/[0.02] p-6 text-center"
            >
              <p className="text-3xl font-extrabold text-white">{item.stat}</p>
              <p className="mt-1 text-sm text-gray-500">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA + Checkout */}
      <section className="mx-auto max-w-xl px-6 pb-8">
        <div className="rounded-2xl border border-indigo-500/20 bg-gradient-to-b from-indigo-500/5 to-transparent p-8 text-center">
          <p className="text-xs font-mono uppercase tracking-wider text-indigo-400 mb-2">
            Instant Access
          </p>
          <h2 className="text-2xl font-bold text-white mb-2">
            Get the 7-Day AI Launch Framework
          </h2>
          <p className="text-gray-400 text-sm mb-6">
            One-time payment · Instant download · No upsells to get the
            &quot;real&quot; content
          </p>
          <WhopCheckout />
          <p className="mt-4 text-xs text-gray-600">
            Delivered instantly as a PDF after checkout
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-2xl px-6 pb-20">
        <h2 className="mb-8 text-center text-xl font-bold text-white">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {[
            {
              q: "What exactly do I get?",
              a: "An 11-page PDF framework with day-by-day instructions, AI operator prompts you can copy-paste, checklists, and a complete tools stack. Everything you need to launch a digital product in 7 days.",
            },
            {
              q: "Do I need technical skills?",
              a: "No. The framework is designed for non-technical people. If you can use ChatGPT or Claude, you can follow this system.",
            },
            {
              q: "What kind of business can I launch with this?",
              a: "Any digital product — online courses, ebooks, template packs, coaching programs, SaaS tools, or membership communities. You pick your path on Day 1.",
            },
            {
              q: "Is this just AI-generated fluff?",
              a: "No. This is a real framework used to launch real businesses. The AI prompts are tools within a proven system — not a replacement for strategy.",
            },
            {
              q: "Can I get a refund?",
              a: "Due to the digital nature of this product, all sales are final. But if you follow the framework and don't see value, reach out and we'll make it right.",
            },
          ].map((item) => (
            <details
              key={item.q}
              className="group rounded-xl border border-white/5 bg-white/[0.02] p-4"
            >
              <summary className="flex cursor-pointer items-center justify-between font-medium text-white text-sm">
                {item.q}
                <svg
                  className="h-4 w-4 text-gray-500 transition-transform group-open:rotate-180"
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
              <p className="mt-3 text-sm text-gray-400 leading-relaxed">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8 text-center text-xs text-gray-600">
        <p>© {new Date().getFullYear()} AI Scaling. All rights reserved.</p>
      </footer>
    </main>
  );
}
