"use client";

import React from "react";

const GREEN = "#8BC63F";

const headFont = {
  fontFamily: "'Arial Black', 'Helvetica Neue', Helvetica, Arial, sans-serif",
} as const;

function H({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="mb-4 text-center text-2xl leading-tight text-white md:text-3xl"
      style={headFont}
    >
      {children}
    </h2>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-4 text-[15px] leading-relaxed text-gray-300">{children}</p>
  );
}

function CTA({
  onClick,
  label = "GET THE MINI-MENTORSHIP TODAY →",
}: {
  onClick: () => void;
  label?: string;
}) {
  return (
    <div className="my-10 text-center">
      <button
        onClick={onClick}
        className="w-full max-w-md rounded-xl px-6 py-4 text-base font-bold text-black transition hover:brightness-110"
        style={{ background: GREEN, ...headFont }}
      >
        {label}
      </button>
      <p className="mt-3 text-xs text-gray-400">
        ** Backed By My Unconditional &quot;Get Clients Or Money Back&quot;
        Guarantee **
      </p>
    </div>
  );
}

/**
 * Long-form sales letter body for the Mini-Mentorship replica.
 * Faithful to the original copy. Revealed together with the offer.
 */
export default function MiniSalesBody({
  scrollToCheckout,
}: {
  scrollToCheckout: (loc: string) => void;
}) {
  return (
    <div className="mx-auto max-w-2xl px-6 pt-14">
      {/* Big idea */}
      <H>
        There&apos;s <span style={{ color: GREEN }}>ONE Difference</span> Between
        The Side Hustles That <span style={{ color: GREEN }}>Work</span> In 2026,
        And Those That <span className="text-red-400">DON&apos;T</span>…
      </H>
      <P>
        That one difference? Having an automated profit system where you do
        not… beg for customers… start from scratch… and where premium buyers
        are ready to buy everything you sell — 24/7, 365 days a year, on
        autopilot.
      </P>
      <P>
        So how do you generate thousands of dollars from customers with credit
        cards in hand, ready to pay you premium prices — without shouting into
        the void or begging for attention online?
      </P>

      {/* Letter */}
      <div className="my-8 rounded-xl border border-white/10 bg-white/[0.03] p-6 text-sm text-gray-400">
        <p>
          <span className="text-gray-500">From:</span> Jeffrey Fung
        </p>
        <p>
          <span className="text-gray-500">Location:</span> Toronto, Canada
        </p>
      </div>
      <P>Hey, Jeffrey Fung here…</P>
      <P>
        By now, you probably know that relying on one paycheck just isn&apos;t
        enough — especially with how things are going right now. Some people
        spend their time hoping things will change. But thousands of others are
        using this as a <strong className="text-white">wake-up call</strong> —
        looking for a reliable way to add income without sacrificing their career
        or personal life.
      </P>
      <P>
        One of the smartest ways to do that is by positioning yourself where
        demand already exists. Most people get this wrong — they try to build
        brands, create demand, or gamble on the next trending product. And it
        doesn&apos;t work for someone with a full-time job and limited time.
      </P>
      <P>
        Here&apos;s what most people miss: the most reliable, predictable
        businesses <strong className="text-white">don&apos;t create demand. They
        meet it.</strong> Think about your local grocery store. It doesn&apos;t
        convince you to buy milk. It just has it there when you need it. That&apos;s
        the system we&apos;re talking about.
      </P>

      <H>
        The &quot;New&quot; Approach In 2026…
      </H>
      <P>
        What if you could start making sales in your first month — without
        spending thousands, building a website, or chasing customers? A business
        you can run from your laptop, with just 1–2 hours of work a day.
      </P>
      <P>
        It works by becoming an online retailer, like Walmart or Target — but
        instead of selling your own products, you sell name-brand items people
        already trust. Think Tide Pods, Clorox, and Dawn Soap. Everyday
        essentials people are already buying.
      </P>
      <P>
        These brands have already done the hard work. They&apos;ve spent millions
        building trust and loyal customers. Your job? Supply these products by
        tapping into Amazon&apos;s built-in demand, trust, and systems.
      </P>

      {/* Intro the offer */}
      <H>
        The SellerSync Academy <span style={{ color: GREEN }}>Mini-Mentorship</span>
      </H>
      <P>
        Inside this system, you&apos;ll discover the exact{" "}
        <strong className="text-white">$13.1 Million Framework</strong> that lets
        you build a profitable Amazon Convenience Store — without learning complex
        tech skills, chasing customers, or adding another full-time job to your
        plate.
      </P>
      <ul className="mb-6 space-y-3 text-[15px] text-gray-300">
        {[
          "The exact product-selection formula that helped me identify winning items in under 10 minutes (so you're not wasting weeks guessing)",
          "The beginner-friendly system that teaches you the fundamentals the RIGHT way… so you're not learning through expensive trial and error",
          "Real-life case studies showing how complete beginners went from zero to their first $10K month — in months, not years — without running ads or chasing customers",
        ].map((t) => (
          <li key={t} className="flex gap-3">
            <span style={{ color: GREEN }}>→</span>
            <span>{t}</span>
          </li>
        ))}
      </ul>

      {/* Deliverables */}
      <H>Here&apos;s Everything You Get Inside…</H>
      <div className="space-y-4">
        {DELIVERABLES.map((d, i) => (
          <div
            key={d.title}
            className="rounded-xl border border-white/10 bg-white/[0.03] p-6"
          >
            <p
              className="text-xs font-bold uppercase tracking-[0.2em]"
              style={{ color: GREEN }}
            >
              Deliverable {["One", "Two", "Three"][i]}
            </p>
            <h3 className="mt-1 text-lg font-bold text-white">{d.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-gray-300">{d.body}</p>
          </div>
        ))}
      </div>

      {/* Bonuses */}
      <h2 className="mb-2 mt-12 text-center text-xl font-bold text-white" style={headFont}>
        When You Join Today, You&apos;ll Also Get…
      </h2>
      <p className="mb-6 text-center text-sm" style={{ color: GREEN }}>
        3 special bonuses just for taking action
      </p>
      <div className="space-y-4">
        {BONUSES.map((b) => (
          <div
            key={b.title}
            className="rounded-xl border p-6"
            style={{ borderColor: `${GREEN}33`, background: `${GREEN}0a` }}
          >
            <h3 className="text-base font-bold text-white">
              {b.title}{" "}
              <span style={{ color: GREEN }}>({b.value} Value)</span>
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-gray-300">{b.body}</p>
          </div>
        ))}
      </div>

      <CTA onClick={() => scrollToCheckout("post_bonuses")} />

      {/* Before / After */}
      <H>
        Here&apos;s What You Can Expect From The Mini-Mentorship
      </H>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-red-500/20 bg-red-500/[0.04] p-6">
          <p className="mb-3 text-sm font-bold uppercase tracking-wide text-red-300">
            Before
          </p>
          <ul className="space-y-3 text-sm text-gray-300">
            {BEFORE.map((x) => (
              <li key={x} className="flex gap-2">
                <span className="text-red-400">✗</span>
                <span>{x}</span>
              </li>
            ))}
          </ul>
        </div>
        <div
          className="rounded-xl border p-6"
          style={{ borderColor: `${GREEN}33`, background: `${GREEN}0a` }}
        >
          <p className="mb-3 text-sm font-bold uppercase tracking-wide" style={{ color: GREEN }}>
            After
          </p>
          <ul className="space-y-3 text-sm text-gray-300">
            {AFTER.map((x) => (
              <li key={x} className="flex gap-2">
                <span style={{ color: GREEN }}>✓</span>
                <span>{x}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Guarantee */}
      <div className="my-12 rounded-2xl border border-white/10 bg-white/[0.03] p-8 text-center">
        <h3 className="text-xl font-bold text-white" style={headFont}>
          Backed By My Unconditional 30-Day Money-Back Guarantee
        </h3>
        <p className="mt-4 text-sm leading-relaxed text-gray-300">
          I&apos;m so confident in this system that I&apos;m willing to let you
          test it for 30 days at NO RISK. During that window, you can ask for a
          refund at any time and get all your money back — no questions asked.
          And in the rare event you decide it&apos;s not for you, I&apos;ll even
          let you keep your access to all the materials as my way of saying
          &quot;thanks for giving it a try.&quot;
        </p>
      </div>

      {/* Mid testimonials */}
      <div className="space-y-4">
        {MID_QUOTES.map((q) => (
          <div
            key={q.name}
            className="rounded-xl border border-white/10 bg-white/[0.03] p-6"
          >
            <p className="text-sm leading-relaxed text-gray-300">{q.body}</p>
            <p className="mt-3 text-sm font-semibold text-white">{q.name}</p>
          </div>
        ))}
      </div>

      <CTA
        onClick={() => scrollToCheckout("pre_order")}
        label="JOIN THE MINI-MENTORSHIP — JUST $17.99 →"
      />
    </div>
  );
}

const DELIVERABLES = [
  {
    title: "The 8-Figure Product Selection System",
    body: "Get lifetime access to the exact framework I use to identify winning products in under 10 minutes… so you're never stuck guessing what to sell.",
  },
  {
    title: "The Complete Plug-and-Play Blueprint",
    body: "You'll learn how to analyze products, connect with suppliers, set up your Amazon storefront, and scale your sales. The system is so straightforward that some students have their first products live and ready to sell in as little as 24 hours.",
  },
  {
    title: "Support & Guidance To Start Seeing Results",
    body: "Copy my proprietary framework that turns complete beginners into profitable sellers in as little as 48 hours — so you know exactly how to stand out, even in the most saturated categories.",
  },
];

const BONUSES = [
  {
    title: "Bonus #1: Your Personal Onboarding & Clarity Phone Call",
    value: "$497",
    body: "Join a LIVE onboarding call with our success coach where we'll walk you through your first steps and make sure you're set up for success from day one.",
  },
  {
    title: "Bonus #2: Our Private Database Of Profitable Name-Brand Products",
    value: "$997",
    body: "A curated list of 50 active seven-figure Amazon sellers along with their actual storefronts — you'll see the exact products they're selling right now, which categories are working, and what real, profitable Amazon Convenience Stores look like in practice.",
  },
  {
    title: "Bonus #3: The Name-Brand Product Selling Masterclass",
    value: "$297",
    body: "Learn how to start selling trusted name brands… even if you've never sold anything online before or have any tech skills.",
  },
];

const BEFORE = [
  'Jumping from one "opportunity" to another… hoping THIS will be the one that finally clicks (spoiler: it never does)',
  "Spending hours grinding every day… yet still feeling like you're spinning your wheels and getting nowhere",
  "Inconsistent revenue that has you celebrating one month… then panicking the next",
  "Wondering if you picked the wrong business model… because sales barely cover costs",
];

const AFTER = [
  "Build a business that runs on autopilot without ever dealing with customers",
  "Get sales every day, 24/7, possibly even when you're sleeping",
  "Never worry about competition because your products have built-in demand",
  "No marketing or paid ads required — which means higher profit margins",
  "Sleep soundly knowing you're following a PROVEN system that actually scales",
];

const MID_QUOTES = [
  {
    name: "Luca Moretti, 28 | Toronto",
    body: "In the first 45 days of working with Jeffrey, we went from $150/day in sales to over $680/day. That's not an exaggeration… once we nailed the foundations he taught us, the floodgates opened and sales came pouring in.",
  },
  {
    name: "Samantha Ballard, 42 | Virginia",
    body: "I had $5,700 in my checking account and about $12,000 of available credit. And now, thanks to Jeffrey, I have an Amazon business that did $52,721 in sales in November 2025 alone.",
  },
  {
    name: "Anton Di Carlo, 33 | New York City",
    body: "I took my business from zero to six figures in under ten months. One thing that really helped me break through was when Jeffrey taught me how to minimize risk and dial in my product research. That was absolutely game changing.",
  },
];
