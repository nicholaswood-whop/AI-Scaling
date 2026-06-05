"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

/**
 * Post-purchase delivery / confirmation page for the AI Assistant funnel.
 *
 * Lands here from the upsell page:
 *   - /assistant/done?dfy=1  → DFY setup accepted (also confirms the Blueprint)
 *   - /assistant/done        → Blueprint only (upsell declined)
 *
 * Purchase pixels for both products already fire on the upsell page, so this
 * page is purely confirmation + next steps (no duplicate purchase events).
 */

const mono = { fontFamily: "'Courier New', Courier, monospace" } as const;
const helv = {
  fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
} as const;

function DoneContent() {
  const params = useSearchParams();
  const dfy = params.get("dfy") === "1";

  return (
    <main className="min-h-screen bg-black text-white" style={helv}>
      <div className="mx-auto max-w-2xl px-6 py-20 text-center">
        <div className="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-full border border-emerald-400/40 bg-emerald-500/10 text-3xl text-emerald-400">
          ✓
        </div>

        <p
          className="mb-4 text-[11px] uppercase tracking-[0.22em] text-gray-500"
          style={mono}
        >
          {dfy ? "You're all set" : "Order confirmed"}
        </p>

        <h1 className="text-3xl font-bold leading-[1.15] sm:text-4xl">
          {dfy ? "Your Done-For-You setup is confirmed." : "Your Blueprint is on its way."}
        </h1>

        <div className="mx-auto mt-8 max-w-lg space-y-4 text-left">
          <div className="border border-white/15 bg-white/[0.03] p-5">
            <p className="text-sm leading-relaxed text-gray-300">
              <span className="font-semibold text-white">📘 The AI Assistant Blueprint</span>
              <br />
              Check your inbox — your guide and access details are arriving in the
              next few minutes. If you don&apos;t see it, check spam or promotions.
            </p>
          </div>

          {dfy && (
            <div className="border border-emerald-400/30 bg-emerald-500/[0.06] p-5">
              <p className="text-sm leading-relaxed text-gray-200">
                <span className="font-semibold text-emerald-300">
                  🚀 Done-For-You Setup — confirmed
                </span>
                <br />
                My team will reach out within{" "}
                <span className="font-semibold text-white">one business day</span>{" "}
                to book your onboarding call and kick off the build. Keep an eye
                on your inbox for the scheduling link.
              </p>
            </div>
          )}
        </div>

        <p className="mt-10 text-xs text-gray-600" style={mono}>
          Questions? Reply to any of our emails — we read every one.
        </p>
      </div>
    </main>
  );
}

export default function DonePage() {
  return (
    <Suspense fallback={<main className="min-h-screen bg-black" />}>
      <DoneContent />
    </Suspense>
  );
}
