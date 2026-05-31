"use client";

import { useEffect } from "react";
import WhopCheckout from "@/components/WhopCheckout";

/**
 * Standalone ebook landing page — anonymous, teaser-level.
 * All ad traffic should be directed here: aiscalingco.com/ebook
 */
export default function EbookPage() {
  useEffect(() => {
    if (typeof window !== "undefined" && typeof window.fbq === "function") {
      window.fbq("track", "ViewContent", {
        content_name: "AI Business Framework - 7 Day Launch",
        content_category: "Ebook Landing Page",
        value: 27.0,
        currency: "USD",
      });
    }
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
            The step-by-step system that uses an AI operator to do{" "}
            <em>everything</em> for you — build your product, deploy your site,
            create your ads, and launch your business. In one week.
          </p>
        </div>
      </section>

      {/* VSL Section */}
      <section className="mx-auto max-w-md px-6 pb-12">
        <div className="relative aspect-[9/16] overflow-hidden rounded-2xl border border-white/10 bg-black shadow-2xl shadow-indigo-500/10">
          <video
            className="h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          >
            <source src="/vsl-anon.mp4" type="video/mp4" />
          </video>
        </div>
      </section>

      {/* The Hook — Curiosity-Driven */}
      <section className="mx-auto max-w-4xl px-6 pb-16">
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 sm:p-10">
          <h2 className="mb-6 text-center text-2xl font-bold text-white">
            What if AI could do everything for you?
          </h2>
          <p className="text-center text-gray-400 leading-relaxed max-w-2xl mx-auto mb-8">
            Not just answer questions. Not just write copy. But actually{" "}
            <span className="text-white font-semibold">build your entire business</span>{" "}
            — the product, the website, the checkout, the ads, the tracking,
            the automations — all in 7 days.
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                icon: "⚡",
                text: "An AI operator that writes code, builds websites, and deploys to production",
              },
              {
                icon: "📊",
                text: "Ad campaigns created, targeted, and ready to launch — without touching Ads Manager",
              },
              {
                icon: "🔄",
                text: "Automated tracking, analytics, and reporting — set up once, runs forever",
              },
              {
                icon: "💰",
                text: "Complete checkout and delivery system — from click to purchase to fulfillment",
              },
            ].map((item) => (
              <div
                key={item.text}
                className="flex gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-4"
              >
                <span className="text-xl">{item.icon}</span>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {item.text}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-8 text-center text-sm text-gray-500">
            This isn&apos;t theory. Every part of this system was built the way
            the framework describes — in a single session.
          </p>
        </div>
      </section>

      {/* What's Inside — Vague Teaser */}
      <section className="mx-auto max-w-4xl px-6 pb-16">
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 sm:p-10">
          <h2 className="mb-8 text-center text-2xl font-bold text-white">
            Inside the Framework
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              "The exact AI operator that builds your business for you",
              "7-day action plan — what to do each day, step by step",
              "Copy-paste prompts that make the AI do the heavy lifting",
              "How to set up a $27 product and start collecting revenue",
              "The complete tech stack — every tool, connected and automated",
              "How to go from zero followers to paid ads in under a week",
            ].map((item) => (
              <div
                key={item}
                className="flex items-start gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-4"
              >
                <span className="mt-0.5 text-cyan-400 text-sm">✓</span>
                <span className="text-sm text-gray-300">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="mx-auto max-w-4xl px-6 pb-12">
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { stat: "7 Days", label: "From zero to launched" },
            { stat: "$27", label: "One-time payment" },
            { stat: "18 Pages", label: "Complete system" },
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
            Get the 7-Day AI Launch System
          </h2>
          <p className="text-gray-400 text-sm mb-6">
            One-time payment · Instant download · The complete system revealed
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
              a: "An 18-page PDF with the complete system — the AI operator, the step-by-step process, the prompts, checklists, and the full tech stack. Everything you need to launch in 7 days.",
            },
            {
              q: "Do I need technical skills?",
              a: "No. The system is designed for non-technical people. If you can send a message, you can use this framework.",
            },
            {
              q: "What kind of business can I launch with this?",
              a: "Any digital product — ebooks, courses, template packs, coaching programs, or membership communities.",
            },
            {
              q: "What's the AI operator?",
              a: "That's what you'll find out inside. It's the core of the entire system — and it does the work for you.",
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
