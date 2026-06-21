"use client";

import { useEffect, useRef, useState } from "react";
import MiniCheckout from "@/components/MiniCheckout";
import MiniSalesBody from "@/components/MiniSalesBody";
import { useVideoTracking, trackCTAClick } from "@/components/TrackingEnhanced";

/**
 * Replica of https://www.sellersyncacademy.com/ssacademymini
 * (SellerSync Academy "Mini-Mentorship" — Amazon Convenience Store offer).
 *
 * Faithful clone of copy + design, rebuilt on the AI-Scaling Next.js stack
 * with Whop EMBEDDED CHECKOUT instead of the original ClickFunnels order form.
 *
 * KEY MECHANIC (the "be wary of that"): the offer/checkout is GATED behind the
 * VSL. A "Next Step Unlocks In:" countdown runs while the video plays. Once the
 * viewer reaches REVEAL_AT_SECONDS of playback, the full sales letter + Whop
 * checkout fade in. Controlled by `revealed` state below.
 *
 * Swap in your own video at /public/vsl-mini.mp4 (and a poster at
 * /public/vsl-mini-poster.jpg). Set REVEAL_AT_SECONDS to the moment in YOUR
 * VSL where the pitch/CTA begins.
 */

const OFFER_NAME = "SellerSync Academy Mini-Mentorship";
const OFFER_VALUE = 17.99;

// Reveal the offer after this many seconds of VSL playback.
// (Set to the CTA moment in your own video.)
const REVEAL_AT_SECONDS = 1801; // ~30 min — tune to your VSL

const GREEN = "#8BC63F";
const PURPLE = "#7C5CFC";

const headFont = {
  fontFamily:
    "'Arial Black', 'Helvetica Neue', Helvetica, Arial, sans-serif",
} as const;
const bodyFont = {
  fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
} as const;

export default function MiniPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  useVideoTracking(videoRef);

  const [revealed, setRevealed] = useState(false);
  const [remaining, setRemaining] = useState(REVEAL_AT_SECONDS);

  // Preview override: ?preview=1 reveals the full page without watching the VSL
  // (handy for reviewing copy/design — not used by real visitors).
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (new URLSearchParams(window.location.search).get("preview") === "1") {
      setRevealed(true);
    }
  }, []);

  // ViewContent / view_item on load
  useEffect(() => {
    if (typeof window !== "undefined" && typeof window.fbq === "function") {
      window.fbq("track", "ViewContent", {
        content_name: OFFER_NAME,
        content_category: "Mini-Mentorship Landing Page",
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
    if (params.get("status") === "success") {
      if (typeof window.fbq === "function") {
        window.fbq("track", "Purchase", {
          content_name: OFFER_NAME,
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
    }
  }, []);

  // Gate the offer behind VSL playback progress.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onTime = () => {
      const left = Math.max(0, Math.ceil(REVEAL_AT_SECONDS - v.currentTime));
      setRemaining(left);
      if (v.currentTime >= REVEAL_AT_SECONDS && !revealed) {
        setRevealed(true);
        trackCTAClick("offer_unlocked", { value: OFFER_VALUE });
      }
    };
    v.addEventListener("timeupdate", onTime);
    return () => v.removeEventListener("timeupdate", onTime);
  }, [revealed]);

  const scrollToCheckout = (loc: string) => {
    trackCTAClick(loc, { value: OFFER_VALUE });
    document.getElementById("order")?.scrollIntoView({ behavior: "smooth" });
  };

  const mmss = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${String(sec).padStart(2, "0")}`;
  };

  return (
    <main
      className="min-h-screen text-gray-200"
      style={{
        ...bodyFont,
        background:
          "radial-gradient(900px 500px at 50% 8%, rgba(124,92,252,0.22), rgba(0,0,0,0) 60%), #070707",
      }}
    >
      {/* ── Top bar ── */}
      <header className="border-b border-white/10">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-3 text-xs text-gray-400">
          <Logo />
          <span>
            Need Help?{" "}
            <a href="#" className="font-semibold" style={{ color: GREEN }}>
              Email Me HERE
            </a>
          </span>
        </div>
      </header>

      {/* ── Hero headline ── */}
      <section className="mx-auto max-w-3xl px-6 pt-10 text-center">
        <h1
          className="text-3xl leading-tight md:text-[40px] md:leading-[1.1]"
          style={{ ...headFont, color: "#cfcfcf" }}
        >
          📢 BREAKING: Steal My Amazon{" "}
          <span style={{ color: GREEN }}>&apos;Convenience Store&apos;</span>{" "}
          Model And Build A Profitable Side Income By{" "}
          <span style={{ color: GREEN }}>July 10th</span>
        </h1>
        <p className="mt-4 text-sm text-gray-400 md:text-base">
          (Zero Experience, Zero Tech Skills &amp; Zero Reason To Quit Your Job)
        </p>
        <p className="mt-6 text-base font-semibold text-white md:text-lg">
          Watch This Presentation Below To Discover How To Sell More Online!
        </p>
      </section>

      {/* ── VSL ── */}
      <section data-track-section="vsl" className="mx-auto max-w-3xl px-6 pt-6">
        <div className="relative aspect-video w-full overflow-hidden rounded-xl ring-1 ring-white/10">
          <video
            ref={videoRef}
            className="h-full w-full bg-black"
            controls
            playsInline
            preload="metadata"
            poster="/vsl-mini-poster.jpg"
          >
            <source src="/vsl-mini.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Countdown → unlock */}
        {!revealed && (
          <div className="mx-auto mt-6 max-w-md rounded-xl border border-white/10 bg-white/5 px-6 py-4 text-center">
            <p className="text-xs uppercase tracking-[0.2em] text-gray-400">
              Next Step Unlocks In:
            </p>
            <p
              className="mt-1 text-3xl font-bold tabular-nums"
              style={{ color: GREEN }}
            >
              {mmss(remaining)}
            </p>
            <p className="mt-1 text-xs text-gray-500">
              Keep watching — your access unlocks automatically.
            </p>
          </div>
        )}
      </section>

      {/* ── Gated offer CTA (first reveal, right under the video) ── */}
      {revealed && (
        <section className="mx-auto max-w-3xl px-6 pt-8 text-center animate-[fadeIn_0.6s_ease]">
          <div
            className="rounded-2xl border p-6"
            style={{ borderColor: `${GREEN}55`, background: `${GREEN}0d` }}
          >
            <p className="text-lg font-semibold text-white">
              Join The Mini-Mentorship Today
            </p>
            <p className="mt-1 text-sm text-gray-300">
              For A One-Time Discounted Payment Of
            </p>
            <p className="mt-2 text-4xl font-bold" style={{ color: GREEN }}>
              Only $17.99
            </p>
            <button
              onClick={() => scrollToCheckout("hero_cta")}
              className="mt-5 w-full rounded-xl px-6 py-4 text-base font-bold text-black transition hover:brightness-110"
              style={{ background: GREEN, ...headFont }}
            >
              GET THE 8-FIGURE BLUEPRINT TODAY →
            </button>
            <p className="mt-3 text-xs text-gray-400">
              Instant Digital Access To Your Email · Backed By My Unconditional
              &quot;Get Clients Or Money Back&quot; Guarantee
            </p>
          </div>
        </section>
      )}

      {/* ── Testimonials (always visible) ── */}
      <section data-track-section="testimonials" className="mx-auto max-w-5xl px-6 pt-14">
        <div className="grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <TestimonialCard key={t.name} {...t} />
          ))}
        </div>
        <p className="mt-6 text-center text-[11px] leading-relaxed text-gray-500">
          Disclaimer: All testimonials provided are individual experiences only
          and may not be typical. Your own results &amp; experience will vary.
        </p>
      </section>

      {/* ── Everything below also reveals with the offer ── */}
      {revealed && (
        <div className="animate-[fadeIn_0.6s_ease]">
          <MiniSalesBody scrollToCheckout={scrollToCheckout} />

          {/* ── Order form / Whop checkout ── */}
          <section id="order" data-track-section="checkout" className="mx-auto max-w-xl px-6 py-16">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <p className="text-center text-sm font-semibold" style={{ color: GREEN }}>
                🔒 Secure Order Form
              </p>
              <h3 className="mt-2 text-center text-xl font-bold text-white" style={headFont}>
                YES! Enroll In The SellerSync Academy Mini-Mentorship!
              </h3>
              <p className="mt-2 text-center text-gray-400">
                Price Today:{" "}
                <span className="text-gray-500 line-through">$99.99</span>{" "}
                <span className="text-2xl font-bold" style={{ color: GREEN }}>
                  $17.99
                </span>
              </p>
              <div className="mt-6">
                <MiniCheckout />
              </div>
              <p className="mt-4 text-center text-xs text-gray-500">
                We never share your information with anyone.
              </p>
            </div>
          </section>

          <FAQ />
        </div>
      )}

      {/* ── Footer (always visible) ── */}
      <footer className="border-t border-white/10 px-6 py-12">
        <div className="mx-auto max-w-3xl text-center">
          <Logo center />
          <p className="mt-4 text-xs text-gray-500">
            Copyright 2026 | sellersyncacademy.com |{" "}
            <a href="#" className="underline">Terms Of Service</a> ·{" "}
            <a href="#" className="underline">Privacy Policy</a>
          </p>
          <p className="mt-4 text-[11px] leading-relaxed text-gray-600">
            This site is NOT endorsed by Facebook in any way. FACEBOOK is a
            trademark of FACEBOOK, Inc.
          </p>
          <p className="mt-3 text-[11px] leading-relaxed text-gray-600">
            Earnings and income representations made by sellersyncacademy.com and
            their advertisers/sponsors (collectively, &quot;SellerSync
            Academy&quot;) are aspirational statements only of your earnings
            potential. These results are not typical and results will vary. The
            results on this page are OUR results and from years of testing. We
            can in NO way guarantee you will get similar results.
          </p>
        </div>
      </footer>

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </main>
  );
}

/* ─────────────────────────  Sub-components  ───────────────────────── */

function Logo({ center }: { center?: boolean }) {
  return (
    <div className={`flex items-center gap-2 ${center ? "justify-center" : ""}`}>
      <span
        className="grid h-7 w-7 place-items-center rounded-md text-sm font-black text-black"
        style={{ background: GREEN }}
      >
        S
      </span>
      <span className="text-sm font-bold tracking-wide text-white">
        SELLER<span style={{ color: GREEN }}>SYNC</span> ACADEMY
      </span>
    </div>
  );
}

function Stars() {
  return (
    <div className="flex gap-0.5" style={{ color: PURPLE }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i}>★</span>
      ))}
    </div>
  );
}

type Testimonial = {
  name: string;
  meta: string;
  initial: string;
  body: React.ReactNode;
};

const TESTIMONIALS: Testimonial[] = [
  {
    name: "Mike Santora",
    meta: "31 | Charlotte",
    initial: "M",
    body: (
      <>
        I kept jumping from one thing to the next and nothing stuck.
        <br />
        <br />
        With two kids and a wife counting on me… the pressure was real. I spent
        months on dropshipping with nothing to show.
        <br />
        <br />
        Then I found Jeffrey&apos;s system. Six months later…{" "}
        <strong className="text-white">$7,851 profit</strong> last month.
        <br />
        <br />
        Now we&apos;re actually building something that can{" "}
        <strong className="text-white">support our family long-term</strong>.
      </>
    ),
  },
  {
    name: "Natalie Keene",
    meta: "35 | Chicago",
    initial: "N",
    body: (
      <>
        I had a lot of doubt going into this. I didn&apos;t think I was the
        &quot;business type&quot; and wasn&apos;t even sure what I was looking
        for.
        <br />
        <br />
        But Jeffrey&apos;s system made it simple enough to execute. Now
        we&apos;re picking the right products faster and seeing{" "}
        <strong className="text-white">consistent growth every month</strong>.
        <br />
        <br />
        Really thankful our paths crossed.
      </>
    ),
  },
  {
    name: "Bryan Wei",
    meta: "36 | Vancouver",
    initial: "B",
    body: (
      <>
        I hit <strong className="text-white">six figures</strong> in under nine
        months and still have time for my family.
        <br />
        <br />
        Jeffrey showed me the <strong className="text-white">RIGHT way</strong>{" "}
        to build from the start.
        <br />
        <br />
        There was no guessing and no wasted time. Just the right foundations
        that actually work. You won&apos;t find this piecing together random
        YouTube videos.
      </>
    ),
  },
];

function TestimonialCard({ name, meta, initial, body }: Testimonial) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
      <div
        className="grid h-9 w-9 place-items-center rounded-full text-lg font-bold text-white"
        style={{ background: PURPLE }}
      >
        &ldquo;
      </div>
      <p className="mt-4 text-sm leading-relaxed text-gray-300">{body}</p>
      <div className="mt-5 flex items-center gap-3">
        <div
          className="grid h-10 w-10 place-items-center rounded-full text-sm font-bold text-white"
          style={{ background: "#2a2a2a" }}
        >
          {initial}
        </div>
        <div>
          <p className="text-sm font-semibold text-white">{name},</p>
          <p className="text-xs text-gray-400">{meta}</p>
          <div className="mt-1 text-xs">
            <Stars />
          </div>
        </div>
      </div>
    </div>
  );
}

function FAQ() {
  return (
    <section data-track-section="faq" className="mx-auto max-w-2xl px-6 pb-16">
      <h2 className="mb-6 text-center text-2xl font-bold text-white" style={headFont}>
        Frequently Asked Questions
      </h2>
      <div className="space-y-3">
        {FAQS.map((f) => (
          <details
            key={f.q}
            className="group rounded-xl border border-white/10 bg-white/[0.03] p-5"
          >
            <summary className="cursor-pointer list-none text-sm font-semibold text-white">
              {f.q}
            </summary>
            <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-gray-300">
              {f.a}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}

const FAQS = [
  {
    q: "Do I need a lot of money to get started?",
    a: `No, not at all. When most people hear "Amazon business," they think you need tens of thousands of dollars just sitting around. But that's not how this works.

We're not doing private label where you're ordering 500 units from China and praying it sells. We start small. 10 to 15 units at a time. You test products. See what works. Then scale from there.

Think of it like this... You're not building a mansion on day one. You're building a convenience store. One shelf at a time.

Once you start making sales? You reinvest those profits into MORE inventory. That's how you grow.`,
  },
  {
    q: "I have a full-time job. How much time does this actually take?",
    a: `Honestly? Once you know what you're doing... 1 to 2 hours a day. Maybe less.

I built this whole thing while working a full-time banking job. I wasn't pulling all-nighters or sacrificing weekends. I just carved out a little time each day to find products, send them to Amazon, and let the system work.

Here's the thing... We're not running ads. We're not building websites. We're not filming TikToks. Amazon does the heavy lifting. They handle the storage. The shipping. The customer service.

You can absolutely do this while working full-time. Most of our students do.`,
  },
  {
    q: "This sounds too good to be true. What's the catch?",
    a: `I knew you were going to ask that. And I don't blame you. There's a lot of BS out there.

So let me be straight with you... There's no catch. But this ISN'T a "get rich quick" scheme. You're not going to make $10,000 tomorrow.

This is a REAL business. The same business model Walmart and Target use to make billions. We're just doing it online... through Amazon. It works because it's boring. We sell stuff people already buy every single day.

So the "catch" is... You still have to put in the work. You still have to show up. But if you do? This thing can change your life.`,
  },
  {
    q: "I've never sold anything online before. Can I still do this?",
    a: `Absolutely. Most of our students had ZERO experience when they started.

We've got government workers, nurses, teachers, retirees... People in their 20s. People in their 60s. None of them were "business experts." They just followed the system.

You don't need to be some tech genius. If you can use a laptop and browse the internet, you're good. We walk you through everything step-by-step.`,
  },
  {
    q: "What if I try this and it doesn't work for me?",
    a: `Then you don't pay a thing. Seriously.

You get 30 full days to test-drive everything. Go through the training. Try the system. See if it's a fit.

If it's not what you expected... Send us one email and we'll refund your $17.99 immediately. No questions asked. You even keep all the bonus materials. That's how confident I am you'll love this.`,
  },
];
