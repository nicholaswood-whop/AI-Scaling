"use client";

import { useEffect, useRef } from "react";
import WhopCheckout from "@/components/WhopCheckout";
import { useVideoTracking } from "@/components/TrackingEnhanced";

/**
 * PDF-style ebook landing page — matches the framework PDF aesthetic.
 * Pure black background, white typography, monospaced labels, editorial whitespace.
 * PDF-style ad campaigns link here: aiscalingco.com/ebook
 *
 * Enhanced tracking (June 2026):
 * - Scroll depth (25/50/75/100%)
 * - Time on page (10s/30s/60s/120s/300s)
 * - Section visibility via data-track-section attributes
 * - Video engagement (play, progress milestones)
 * - CTA clicks
 * - Exit intent
 */
export default function EbookPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  useVideoTracking(videoRef);

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
    <main
      className="min-h-screen text-white"
      style={{ backgroundColor: "#0a0a0a" }}
    >
      {/* ── Hero ── */}
      <section data-track-section="hero" className="mx-auto max-w-3xl px-8 pt-20 pb-16">
        <p
          className="mb-6 text-xs uppercase tracking-[0.25em]"
          style={{
            fontFamily: "'Courier New', Courier, monospace",
            color: "rgba(255,255,255,0.35)",
          }}
        >
          THE 7-DAY AI LAUNCH FRAMEWORK
        </p>
        <h1
          className="text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl"
          style={{
            fontFamily:
              "'Helvetica Neue', Helvetica, Arial, sans-serif",
            letterSpacing: "-0.03em",
          }}
        >
          Launch a Business
          <br />
          with AI in 7 Days
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
          The exact system for going from zero to a live, revenue-ready
          digital business. One AI operator. One week.
        </p>
      </section>

      {/* ── VSL Section ── */}
      <section data-track-section="vsl" className="mx-auto max-w-3xl px-8 pb-16">
        <div
          className="relative aspect-video w-full overflow-hidden rounded-lg"
          style={{
            border: "1px solid rgba(255,255,255,0.08)",
            backgroundColor: "#0a0a0a",
          }}
        >
          <video
            ref={videoRef}
            className="h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          >
            <source src="/vsl-pdf-style.mp4" type="video/mp4" />
          </video>
        </div>
      </section>

      {/* ── Stats Row ── */}
      <section data-track-section="stats" className="mx-auto max-w-3xl px-8 pb-20">
        <div className="grid grid-cols-4 gap-6">
          {[
            { val: "7", label: "DAYS TO\nLAUNCH" },
            { val: "15+", label: "INTEGRATIONS" },
            { val: "1", label: "AI OPERATOR" },
            { val: "$0", label: "TEAM NEEDED" },
          ].map((s) => (
            <div key={s.val} className="text-center">
              <p
                className="text-4xl font-extrabold sm:text-5xl"
                style={{
                  fontFamily:
                    "'Helvetica Neue', Helvetica, Arial, sans-serif",
                  letterSpacing: "-0.04em",
                }}
              >
                {s.val}
              </p>
              <p
                className="mt-2 text-[10px] uppercase tracking-[0.2em] whitespace-pre-line"
                style={{
                  fontFamily: "'Courier New', Courier, monospace",
                  color: "rgba(255,255,255,0.28)",
                }}
              >
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── The Problem ── */}
      <section data-track-section="problem" className="mx-auto max-w-3xl px-8 pb-20">
        <p
          className="mb-4 text-xs uppercase tracking-[0.25em]"
          style={{
            fontFamily: "'Courier New', Courier, monospace",
            color: "rgba(255,255,255,0.28)",
          }}
        >
          THE PROBLEM
        </p>
        <h2
          className="text-3xl font-extrabold tracking-tight sm:text-4xl"
          style={{
            fontFamily:
              "'Helvetica Neue', Helvetica, Arial, sans-serif",
            letterSpacing: "-0.03em",
          }}
        >
          Most people spend months.
        </h2>
        <div
          className="my-6"
          style={{
            width: 120,
            height: 1,
            backgroundColor: "rgba(255,255,255,0.15)",
          }}
        />
        <div className="space-y-2">
          {[
            "Building sites they never finish.",
            "Running ads they don't understand.",
            "Connecting tools that don't talk.",
          ].map((line) => (
            <p
              key={line}
              className="text-lg"
              style={{ color: "rgba(255,255,255,0.50)" }}
            >
              {line}
            </p>
          ))}
        </div>
        <p
          className="mt-8 text-2xl font-extrabold"
          style={{
            color: "rgba(255,255,255,0.65)",
            fontFamily:
              "'Helvetica Neue', Helvetica, Arial, sans-serif",
          }}
        >
          Most quit before making $1.
        </p>
      </section>

      {/* ── The System ── */}
      <section data-track-section="system" className="mx-auto max-w-3xl px-8 pb-20">
        <p
          className="mb-4 text-xs uppercase tracking-[0.25em]"
          style={{
            fontFamily: "'Courier New', Courier, monospace",
            color: "rgba(255,255,255,0.28)",
          }}
        >
          THE SYSTEM
        </p>
        <h2
          className="text-3xl font-extrabold tracking-tight sm:text-4xl"
          style={{
            fontFamily:
              "'Helvetica Neue', Helvetica, Arial, sans-serif",
            letterSpacing: "-0.03em",
          }}
        >
          What if an AI operator did everything for you?
        </h2>
        <div
          className="my-6"
          style={{
            width: 120,
            height: 1,
            backgroundColor: "rgba(255,255,255,0.15)",
          }}
        />
        <div className="space-y-3">
          {[
            "→ Built your website",
            "→ Created your ad campaigns",
            "→ Set up checkout and tracking",
            "→ Launched your product",
            "→ Managed your calendar and follow-ups",
          ].map((line) => (
            <p
              key={line}
              className="text-lg"
              style={{
                color: "rgba(255,255,255,0.50)",
                fontFamily: "'Courier New', Courier, monospace",
              }}
            >
              {line}
            </p>
          ))}
        </div>
        <p
          className="mt-10 text-2xl font-extrabold"
          style={{
            fontFamily:
              "'Helvetica Neue', Helvetica, Arial, sans-serif",
          }}
        >
          While you sleep.
        </p>
      </section>

      {/* ── Inside the Framework ── */}
      <section data-track-section="framework" className="mx-auto max-w-3xl px-8 pb-20">
        <p
          className="mb-4 text-xs uppercase tracking-[0.25em]"
          style={{
            fontFamily: "'Courier New', Courier, monospace",
            color: "rgba(255,255,255,0.28)",
          }}
        >
          WHAT YOU GET
        </p>
        <h2
          className="text-3xl font-extrabold tracking-tight sm:text-4xl mb-8"
          style={{
            fontFamily:
              "'Helvetica Neue', Helvetica, Arial, sans-serif",
            letterSpacing: "-0.03em",
          }}
        >
          Inside the Framework
        </h2>
        <div className="space-y-4">
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
              className="flex items-start gap-4 py-3"
              style={{
                borderBottom: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <span
                className="mt-1 text-xs"
                style={{ color: "rgba(255,255,255,0.35)" }}
              >
                ✓
              </span>
              <span
                className="text-base"
                style={{ color: "rgba(255,255,255,0.70)" }}
              >
                {item}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Not Theory ── */}
      <section data-track-section="proof" className="mx-auto max-w-3xl px-8 pb-20">
        <p
          className="mb-4 text-xs uppercase tracking-[0.25em]"
          style={{
            fontFamily: "'Courier New', Courier, monospace",
            color: "rgba(255,255,255,0.28)",
          }}
        >
          NOT THEORY
        </p>
        <h2
          className="text-3xl font-extrabold tracking-tight sm:text-4xl"
          style={{
            fontFamily:
              "'Helvetica Neue', Helvetica, Arial, sans-serif",
            letterSpacing: "-0.03em",
          }}
        >
          This isn&apos;t a course. It&apos;s a system.
        </h2>
        <div
          className="my-6"
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
          The website, the ads, the checkout, the tracking — all built by the
          system in one session. You&apos;re looking at the proof.
        </p>
      </section>

      {/* ── CTA + Checkout ── */}
      <section data-track-section="checkout" className="mx-auto max-w-xl px-8 pb-12">
        <div className="text-center">
          <p
            className="mb-4 text-xs uppercase tracking-[0.25em]"
            style={{
              fontFamily: "'Courier New', Courier, monospace",
              color: "rgba(255,255,255,0.28)",
            }}
          >
            INSTANT DIGITAL DOWNLOAD
          </p>
          <p
            className="text-7xl font-extrabold mb-2"
            style={{
              fontFamily:
                "'Helvetica Neue', Helvetica, Arial, sans-serif",
              letterSpacing: "-0.04em",
            }}
          >
            $27
          </p>
          <div
            className="mx-auto my-6"
            style={{
              width: 120,
              height: 1,
              backgroundColor: "rgba(255,255,255,0.15)",
            }}
          />
          <p
            className="text-lg mb-1"
            style={{ color: "rgba(255,255,255,0.50)" }}
          >
            18 pages. The full system revealed.
          </p>
          <p
            className="text-lg mb-8"
            style={{ color: "rgba(255,255,255,0.50)" }}
          >
            The AI operator. The prompts. The stack.
          </p>
          <WhopCheckout />
          <p
            className="mt-4 text-xs"
            style={{
              fontFamily: "'Courier New', Courier, monospace",
              color: "rgba(255,255,255,0.20)",
            }}
          >
            Delivered instantly as a PDF after checkout
          </p>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section data-track-section="faq" className="mx-auto max-w-2xl px-8 pb-20 pt-8">
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
              q: "What exactly do I get?",
              a: "An 18-page PDF with the complete system — the AI operator, the step-by-step process, the prompts, checklists, and the full tech stack.",
            },
            {
              q: "Do I need technical skills?",
              a: "No. If you can send a message, you can use this framework.",
            },
            {
              q: "What kind of business can I launch?",
              a: "Any digital product — ebooks, courses, template packs, coaching programs, or membership communities.",
            },
            {
              q: "What's the AI operator?",
              a: "That's what you'll find out inside. It's the core of the entire system.",
            },
            {
              q: "Can I get a refund?",
              a: "Due to the digital nature, all sales are final. But if you follow the framework and don't see value, reach out.",
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
          AI SCALING · AISCALINGCO.COM
        </p>
      </footer>
    </main>
  );
}
