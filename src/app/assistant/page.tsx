"use client";

import { useEffect, useRef } from "react";
import AssistantCheckout from "@/components/AssistantCheckout";
import { useVideoTracking } from "@/components/TrackingEnhanced";

/**
 * AI Assistant offer landing page — same PDF-style aesthetic as /ebook.
 * Pure black background, white typography, monospaced labels, editorial whitespace.
 *
 * Offer: $47 "AI Assistant Blueprint" — how a solo founder replaces a
 * $500/mo VA with one AI operator that runs the busywork for ~$100/mo.
 * The operator's identity stays a mystery — the purchase is what reveals it.
 *
 * New campaign links here: aiscalingco.com/assistant
 *
 * Tracking (mirrors /ebook):
 * - ViewContent / view_item on load ($47)
 * - Purchase / purchase on ?status=success ($47)
 * - InitiateCheckout / begin_checkout via AssistantCheckout
 * - Scroll depth, time-on-page, section visibility, CTA clicks, video — via TrackingEnhanced
 */

const OFFER_NAME = "AI Assistant Blueprint";
const OFFER_VALUE = 47.0;

const labelMono = {
  fontFamily: "'Courier New', Courier, monospace",
} as const;
const helv = {
  fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
} as const;

export default function AssistantPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  useVideoTracking(videoRef);

  // ViewContent on load
  useEffect(() => {
    if (typeof window !== "undefined" && typeof window.fbq === "function") {
      window.fbq("track", "ViewContent", {
        content_name: OFFER_NAME,
        content_category: "Assistant Landing Page",
        value: OFFER_VALUE,
        currency: "USD",
      });
    }
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("event", "view_item", {
        currency: "USD",
        value: OFFER_VALUE,
        items: [{ item_name: OFFER_NAME, price: OFFER_VALUE, quantity: 1 }],
      });
    }
  }, []);

  // Purchase fire when Whop redirects back with ?status=success
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    if (params.get("status") !== "success") return;
    if (typeof window.fbq === "function") {
      window.fbq("track", "Purchase", {
        content_name: OFFER_NAME,
        content_category: "Digital Product",
        value: OFFER_VALUE,
        currency: "USD",
      });
    }
    if (typeof window.gtag === "function") {
      window.gtag("event", "purchase", {
        currency: "USD",
        value: OFFER_VALUE,
        items: [{ item_name: OFFER_NAME, price: OFFER_VALUE, quantity: 1 }],
      });
    }
  }, []);

  const scrollToCheckout = (location: string) => {
    const el = document.getElementById("checkout");
    if (el) el.scrollIntoView({ behavior: "smooth" });
    if (typeof window !== "undefined" && typeof window.fbq === "function") {
      window.fbq("trackCustom", "cta_click", { location });
    }
  };

  return (
    <main className="min-h-screen text-white" style={{ backgroundColor: "#0a0a0a" }}>
      {/* ── Hero ── */}
      <section data-track-section="hero" className="mx-auto max-w-3xl px-8 pt-20 pb-16">
        <p
          className="mb-6 text-xs uppercase tracking-[0.25em]"
          style={{ ...labelMono, color: "rgba(255,255,255,0.35)" }}
        >
          THE AI ASSISTANT BLUEPRINT
        </p>
        <h1
          className="text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl"
          style={{ ...helv, letterSpacing: "-0.03em" }}
        >
          Stop doing $10 work
          <br />
          when your time
          <br />
          is worth $1,000.
        </h1>
        <div className="my-8" style={{ width: 120, height: 1, backgroundColor: "rgba(255,255,255,0.15)" }} />
        <p className="text-lg leading-relaxed" style={{ color: "rgba(255,255,255,0.50)" }}>
          You can&apos;t afford to hire yet. So you do everything — the inbox, the
          scheduling, the follow-ups, the busywork — at 1 a.m., instead of the work
          that actually grows the business. There&apos;s a way out, and it costs less
          than a dinner.
        </p>

        {/* Hero CTA — above the fold */}
        <button
          onClick={() => scrollToCheckout("hero")}
          className="mt-10 w-full sm:w-auto px-8 py-4 text-base font-bold uppercase tracking-[0.15em] rounded-md transition-all duration-200 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(255,255,255,0.08)]"
          style={{ backgroundColor: "white", color: "#0a0a0a", ...helv, letterSpacing: "0.05em" }}
        >
          Get the Blueprint — $47
        </button>
      </section>

      {/* ── VSL ── */}
      <section data-track-section="vsl" className="mx-auto max-w-3xl px-8 pb-16">
        <div
          className="relative aspect-video w-full overflow-hidden rounded-lg"
          style={{ border: "1px solid rgba(255,255,255,0.08)", backgroundColor: "#0a0a0a" }}
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
            <source src="/vsl-assistant.mp4" type="video/mp4" />
          </video>
        </div>
      </section>

      {/* ── Stats Row ── */}
      <section data-track-section="stats" className="mx-auto max-w-3xl px-8 pb-20">
        <div className="grid grid-cols-4 gap-6">
          {[
            { val: "24/7", label: "ON THE\nCLOCK" },
            { val: "~$100", label: "PER MONTH" },
            { val: "0", label: "INTERVIEWS\nTO RUN" },
            { val: "1", label: "OPERATOR" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <p
                className="text-3xl font-extrabold sm:text-5xl"
                style={{ ...helv, letterSpacing: "-0.04em" }}
              >
                {s.val}
              </p>
              <p
                className="mt-2 text-[10px] uppercase tracking-[0.2em] whitespace-pre-line"
                style={{ ...labelMono, color: "rgba(255,255,255,0.28)" }}
              >
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── The Problem ── */}
      <section data-track-section="problem" className="mx-auto max-w-3xl px-8 pb-20">
        <p className="mb-4 text-xs uppercase tracking-[0.25em]" style={{ ...labelMono, color: "rgba(255,255,255,0.28)" }}>
          THE PROBLEM
        </p>
        <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl" style={{ ...helv, letterSpacing: "-0.03em" }}>
          You became your own assistant.
        </h2>
        <div className="my-6" style={{ width: 120, height: 1, backgroundColor: "rgba(255,255,255,0.15)" }} />
        <div className="space-y-2">
          {[
            "Answering emails you should never have opened.",
            "Rescheduling calls and chasing follow-ups.",
            "Formatting docs, posting content, copying data between tools.",
            "Researching, drafting, organizing — all of it. Alone.",
          ].map((line) => (
            <p key={line} className="text-lg" style={{ color: "rgba(255,255,255,0.50)" }}>
              {line}
            </p>
          ))}
        </div>
        <p className="mt-8 text-2xl font-extrabold" style={{ ...helv, color: "rgba(255,255,255,0.65)" }}>
          None of it moves the needle. All of it eats your day.
        </p>
      </section>

      {/* ── The Cost ── */}
      <section data-track-section="cost" className="mx-auto max-w-3xl px-8 pb-20">
        <p className="mb-4 text-xs uppercase tracking-[0.25em]" style={{ ...labelMono, color: "rgba(255,255,255,0.28)" }}>
          THE REAL COST
        </p>
        <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl" style={{ ...helv, letterSpacing: "-0.03em" }}>
          Your time is the only asset you can&apos;t buy back.
        </h2>
        <div className="my-6" style={{ width: 120, height: 1, backgroundColor: "rgba(255,255,255,0.15)" }} />
        <p className="text-lg leading-relaxed" style={{ color: "rgba(255,255,255,0.50)" }}>
          Spend 3 hours a day on tasks a $15/hr assistant could do, and you&apos;re not
          saving money — you&apos;re paying for it with the one thing that builds the
          business. Every hour on busywork is an hour not spent on the offer, the
          customers, the growth. That&apos;s the most expensive way to &quot;save money&quot; there is.
        </p>
      </section>

      {/* ── The Comparison (winning angle) ── */}
      <section data-track-section="comparison" className="mx-auto max-w-3xl px-8 pb-20">
        <p className="mb-4 text-xs uppercase tracking-[0.25em]" style={{ ...labelMono, color: "rgba(255,255,255,0.28)" }}>
          DO THE MATH
        </p>
        <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl mb-8" style={{ ...helv, letterSpacing: "-0.03em" }}>
          A $500 VA vs. the alternative.
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* VA column */}
          <div className="rounded-xl p-6" style={{ border: "1px solid rgba(255,255,255,0.08)", backgroundColor: "rgba(255,255,255,0.02)" }}>
            <p className="text-xs uppercase tracking-[0.2em] mb-4" style={{ ...labelMono, color: "rgba(255,255,255,0.30)" }}>
              THE $500/MO VA
            </p>
            <p className="text-4xl font-extrabold mb-4" style={{ ...helv }}>$500+<span className="text-base font-normal" style={{ color: "rgba(255,255,255,0.4)" }}>/mo</span></p>
            {[
              "Works one timezone, ~8 hours a day",
              "Needs hiring, training, and managing",
              "Sick days, turnover, ramp-up time",
              "One person, one skill set",
            ].map((line) => (
              <p key={line} className="text-sm py-1.5" style={{ color: "rgba(255,255,255,0.45)" }}>
                — {line}
              </p>
            ))}
          </div>
          {/* AI column */}
          <div className="rounded-xl p-6" style={{ border: "1px solid rgba(255,255,255,0.18)", backgroundColor: "rgba(255,255,255,0.04)" }}>
            <p className="text-xs uppercase tracking-[0.2em] mb-4" style={{ ...labelMono, color: "rgba(255,255,255,0.55)" }}>
              THE OPERATOR
            </p>
            <p className="text-4xl font-extrabold mb-4" style={{ ...helv }}>~$100<span className="text-base font-normal" style={{ color: "rgba(255,255,255,0.4)" }}>/mo</span></p>
            {[
              "On the clock 24/7, never sleeps",
              "No hiring, no training, no managing",
              "Never quits, never burns out",
              "Does the work of an entire team",
            ].map((line) => (
              <p key={line} className="text-sm py-1.5" style={{ color: "rgba(255,255,255,0.75)" }}>
                ✓ {line}
              </p>
            ))}
          </div>
        </div>
        <p className="mt-8 text-2xl font-extrabold" style={{ ...helv }}>
          Same job. A fifth of the cost. None of the headache.
        </p>
      </section>

      {/* ── The System ── */}
      <section data-track-section="system" className="mx-auto max-w-3xl px-8 pb-20">
        <p className="mb-4 text-xs uppercase tracking-[0.25em]" style={{ ...labelMono, color: "rgba(255,255,255,0.28)" }}>
          THE SHIFT
        </p>
        <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl" style={{ ...helv, letterSpacing: "-0.03em" }}>
          What if one operator just… did all of it?
        </h2>
        <div className="my-6" style={{ width: 120, height: 1, backgroundColor: "rgba(255,255,255,0.15)" }} />
        <div className="space-y-3">
          {[
            "→ Triaged your inbox and drafted the replies",
            "→ Managed your calendar and chased every follow-up",
            "→ Researched, wrote, and formatted on command",
            "→ Moved data between your tools while you slept",
            "→ Handled the 100 small things that eat the day",
          ].map((line) => (
            <p key={line} className="text-lg" style={{ ...labelMono, color: "rgba(255,255,255,0.50)" }}>
              {line}
            </p>
          ))}
        </div>
        <p className="mt-10 text-2xl font-extrabold" style={{ ...helv }}>
          So you only touch the work that grows the business.
        </p>
      </section>

      {/* ── Inside the Blueprint ── */}
      <section data-track-section="framework" className="mx-auto max-w-3xl px-8 pb-12">
        <p className="mb-4 text-xs uppercase tracking-[0.25em]" style={{ ...labelMono, color: "rgba(255,255,255,0.28)" }}>
          WHAT YOU GET
        </p>
        <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl mb-8" style={{ ...helv, letterSpacing: "-0.03em" }}>
          Inside the Blueprint
        </h2>
        <div className="space-y-4">
          {[
            "Exactly what the operator is — and how to get set up with it today",
            "The 30-minute setup: from zero to a working assistant by tonight",
            "The task playbook — the busywork to hand off first for the biggest time-back",
            "Copy-paste instructions that get the operator doing real work immediately",
            "How to keep your monthly cost near $100 instead of a $500+ salary",
            "The delegation system so nothing slips and you stay out of the weeds",
          ].map((item) => (
            <div key={item} className="flex items-start gap-4 py-3" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              <span className="mt-1 text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>✓</span>
              <span className="text-base" style={{ color: "rgba(255,255,255,0.70)" }}>{item}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Mid-page CTA ── */}
      <section className="mx-auto max-w-3xl px-8 pb-20 text-center">
        <button
          onClick={() => scrollToCheckout("mid_page")}
          className="w-full sm:w-auto px-10 py-4 text-base font-bold uppercase tracking-[0.15em] rounded-md transition-all duration-200 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(255,255,255,0.08)]"
          style={{ backgroundColor: "white", color: "#0a0a0a", ...helv, letterSpacing: "0.05em" }}
        >
          Get It Now — $47
        </button>
      </section>

      {/* ── Not Theory ── */}
      <section data-track-section="proof" className="mx-auto max-w-3xl px-8 pb-20">
        <p className="mb-4 text-xs uppercase tracking-[0.25em]" style={{ ...labelMono, color: "rgba(255,255,255,0.28)" }}>
          NOT THEORY
        </p>
        <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl" style={{ ...helv, letterSpacing: "-0.03em" }}>
          This page was built by the operator.
        </h2>
        <div className="my-6" style={{ width: 120, height: 1, backgroundColor: "rgba(255,255,255,0.15)" }} />
        <p className="text-lg leading-relaxed" style={{ color: "rgba(255,255,255,0.50)" }}>
          The copy, the checkout, the tracking, the ads pointing you here — handled by
          the same operator the Blueprint sets you up with. You&apos;re looking at what it
          does on autopilot. Imagine it pointed at your to-do list.
        </p>
      </section>

      {/* ── CTA + Checkout ── */}
      <section id="checkout" data-track-section="checkout" className="mx-auto max-w-xl px-8 pb-12">
        <div className="text-center">
          <p className="mb-4 text-xs uppercase tracking-[0.25em]" style={{ ...labelMono, color: "rgba(255,255,255,0.28)" }}>
            INSTANT DIGITAL DOWNLOAD
          </p>
          <p className="text-7xl font-extrabold mb-2" style={{ ...helv, letterSpacing: "-0.04em" }}>$47</p>
          <div className="mx-auto my-6" style={{ width: 120, height: 1, backgroundColor: "rgba(255,255,255,0.15)" }} />
          <p className="text-lg mb-1" style={{ color: "rgba(255,255,255,0.50)" }}>
            The operator. The setup. The task playbook.
          </p>
          <p className="text-lg mb-8" style={{ color: "rgba(255,255,255,0.50)" }}>
            Get your time back starting tonight.
          </p>
          <AssistantCheckout />
          <p className="mt-4 text-xs" style={{ ...labelMono, color: "rgba(255,255,255,0.20)" }}>
            Delivered instantly as a PDF after checkout
          </p>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section data-track-section="faq" className="mx-auto max-w-2xl px-8 pb-20 pt-8">
        <h2 className="mb-10 text-2xl font-extrabold" style={{ ...helv, letterSpacing: "-0.03em" }}>
          Questions
        </h2>
        <div className="space-y-0">
          {[
            {
              q: "What exactly do I get?",
              a: "A step-by-step PDF Blueprint that reveals the AI operator, shows you how to get set up in about 30 minutes, and hands you the exact task playbook to start offloading busywork tonight.",
            },
            {
              q: "Is this just another chatbot?",
              a: "No. This is about setting up an operator that actually does the work — your inbox, scheduling, follow-ups, research, and the hundred small tasks — not a toy you have to babysit.",
            },
            {
              q: "Do I need to be technical?",
              a: "Not at all. If you can send a message, you can run this. The Blueprint walks you through every step.",
            },
            {
              q: "How is this only ~$100/mo?",
              a: "The Blueprint shows you the exact setup and how to keep your monthly cost near $100 — a fraction of a $500+/mo virtual assistant, with none of the hiring or managing.",
            },
            {
              q: "Can I get a refund?",
              a: "Because it's an instant digital download, all sales are final. But if you follow the Blueprint and don't get your time back, reach out — we want this to work for you.",
            },
          ].map((item) => (
            <details key={item.q} className="group py-5" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              <summary className="flex cursor-pointer items-center justify-between text-sm font-semibold">
                <span>{item.q}</span>
                <svg className="h-4 w-4 transition-transform group-open:rotate-180" style={{ color: "rgba(255,255,255,0.3)" }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <p className="mt-3 text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="py-10 text-center">
        <p className="text-xs uppercase tracking-[0.2em]" style={{ ...labelMono, color: "rgba(255,255,255,0.15)" }}>
          AI SCALING · AISCALINGCO.COM
        </p>
      </footer>
    </main>
  );
}
