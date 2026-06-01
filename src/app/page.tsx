import LeadForm from "@/components/LeadForm";
import WhopCheckout from "@/components/WhopCheckout";

const calendarLink =
  process.env.NEXT_PUBLIC_CALENDAR_LINK ?? "https://calendar.google.com";

export default function Home() {
  return (
    <main
      className="relative min-h-screen overflow-hidden text-white"
      style={{ backgroundColor: "#0a0a0a" }}
    >
      {/* ── Nav ── */}
      <header
        className="sticky top-0 z-20 backdrop-blur"
        style={{
          backgroundColor: "rgba(10,10,10,0.85)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <nav className="mx-auto flex max-w-5xl items-center justify-between px-8 py-5">
          <a
            href="#top"
            className="text-lg font-extrabold tracking-tight"
            style={{
              fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
              letterSpacing: "-0.03em",
            }}
          >
            AI Scaling
          </a>
          <div className="hidden items-center gap-8 sm:flex">
            {["Services", "Framework", "Process", "About"].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-sm transition hover:text-white"
                style={{ color: "rgba(255,255,255,0.40)" }}
              >
                {link}
              </a>
            ))}
          </div>
          <a
            href={calendarLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold transition hover:text-white"
            style={{
              fontFamily: "'Courier New', Courier, monospace",
              color: "rgba(255,255,255,0.50)",
              letterSpacing: "0.05em",
            }}
          >
            BOOK A CALL →
          </a>
        </nav>
      </header>

      {/* ── Hero ── */}
      <section id="top" className="mx-auto max-w-4xl px-8 pt-24 pb-20 sm:pt-32">
        <p
          className="mb-6 text-xs uppercase tracking-[0.25em]"
          style={{
            fontFamily: "'Courier New', Courier, monospace",
            color: "rgba(255,255,255,0.28)",
          }}
        >
          AI-DRIVEN GROWTH OPERATIONS
        </p>
        <h1
          className="text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl"
          style={{
            fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
            letterSpacing: "-0.03em",
          }}
        >
          Scale your revenue
          <br />
          with AI that
          <br />
          actually ships.
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
          className="max-w-xl text-lg leading-relaxed"
          style={{ color: "rgba(255,255,255,0.50)" }}
        >
          I&apos;m Nicholas Wood. I help founders and operators turn AI from a
          buzzword into a growth engine — building the systems, automations,
          and playbooks that compound month after month.
        </p>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <a
            href={calendarLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-7 py-3.5 text-sm font-semibold text-black transition hover:opacity-90"
            style={{ backgroundColor: "white", borderRadius: 8 }}
          >
            Book a strategy call
          </a>
          <a
            href="#framework"
            className="inline-flex items-center justify-center px-7 py-3.5 text-sm font-semibold transition hover:text-white"
            style={{
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: 8,
              color: "rgba(255,255,255,0.70)",
            }}
          >
            Get the 7-Day Framework →
          </a>
        </div>

        {/* Stats */}
        <div
          className="mt-20 grid grid-cols-3 gap-8 pt-10"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          {[
            { value: "3.2x", label: "AVG. PIPELINE LIFT" },
            { value: "40+", label: "GROWTH SYSTEMS SHIPPED" },
            { value: "10K+", label: "HOURS AUTOMATED" },
          ].map((s) => (
            <div key={s.label}>
              <p
                className="text-3xl font-extrabold sm:text-4xl"
                style={{
                  fontFamily:
                    "'Helvetica Neue', Helvetica, Arial, sans-serif",
                  letterSpacing: "-0.04em",
                }}
              >
                {s.value}
              </p>
              <p
                className="mt-2 text-[10px] uppercase tracking-[0.2em]"
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

      {/* ── Services ── */}
      <section id="services" className="mx-auto max-w-4xl px-8 pb-24">
        <p
          className="mb-4 text-xs uppercase tracking-[0.25em]"
          style={{
            fontFamily: "'Courier New', Courier, monospace",
            color: "rgba(255,255,255,0.28)",
          }}
        >
          SERVICES
        </p>
        <h2
          className="text-3xl font-extrabold tracking-tight sm:text-4xl"
          style={{
            fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
            letterSpacing: "-0.03em",
          }}
        >
          What I help you build
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
          className="mb-14 text-lg"
          style={{ color: "rgba(255,255,255,0.50)" }}
        >
          Three ways to put AI to work on your growth.
        </p>

        <div className="space-y-0">
          {[
            {
              title: "AI Growth Strategy",
              body: "A clear, prioritized roadmap for where AI moves the needle on revenue — not hype, just the highest-leverage plays for your business.",
            },
            {
              title: "Automation & Systems",
              body: "Done-for-you workflows that turn manual growth ops into compounding machines: outreach, content, lead routing, and reporting.",
            },
            {
              title: "Fractional Operator",
              body: "Embedded execution. I plug into your team to build, ship, and iterate on AI-driven growth experiments week over week.",
            },
          ].map((s) => (
            <div
              key={s.title}
              className="py-8"
              style={{
                borderBottom: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <h3
                className="text-xl font-extrabold mb-3"
                style={{
                  fontFamily:
                    "'Helvetica Neue', Helvetica, Arial, sans-serif",
                }}
              >
                {s.title}
              </h3>
              <p
                className="text-base leading-relaxed max-w-2xl"
                style={{ color: "rgba(255,255,255,0.50)" }}
              >
                {s.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 7-Day Framework ── */}
      <section id="framework" className="mx-auto max-w-4xl px-8 pb-24">
        <p
          className="mb-4 text-xs uppercase tracking-[0.25em]"
          style={{
            fontFamily: "'Courier New', Courier, monospace",
            color: "rgba(255,255,255,0.28)",
          }}
        >
          DIGITAL DOWNLOAD — $27
        </p>
        <h2
          className="text-3xl font-extrabold tracking-tight sm:text-5xl"
          style={{
            fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
            letterSpacing: "-0.03em",
          }}
        >
          Launch a Business with AI
          <br />
          in 7 Days
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
          className="mb-16 max-w-xl text-lg leading-relaxed"
          style={{ color: "rgba(255,255,255,0.50)" }}
        >
          The complete step-by-step framework for using an AI operator to go
          from zero to a launched digital product. No fluff, no theory. Just
          the exact playbook.
        </p>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 mb-16">
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

        {/* What's Inside */}
        <div className="space-y-4 mb-12">
          {[
            "The AI operator that builds your entire business for you",
            "Complete 7-day action plan — what to do each day",
            "The exact system used to launch in a single session",
            "How to go from zero to live checkout in days, not months",
            "Ad campaigns, creatives, and targeting — done for you",
            "The full tech stack — every tool, connected and automated",
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

        <div className="mx-auto max-w-sm text-center">
          <WhopCheckout />
          <p
            className="mt-4 text-xs"
            style={{
              fontFamily: "'Courier New', Courier, monospace",
              color: "rgba(255,255,255,0.20)",
            }}
          >
            Instant digital delivery · One-time payment
          </p>
        </div>
      </section>

      {/* ── Process ── */}
      <section id="process" className="mx-auto max-w-4xl px-8 pb-24">
        <p
          className="mb-4 text-xs uppercase tracking-[0.25em]"
          style={{
            fontFamily: "'Courier New', Courier, monospace",
            color: "rgba(255,255,255,0.28)",
          }}
        >
          PROCESS
        </p>
        <h2
          className="text-3xl font-extrabold tracking-tight sm:text-4xl mb-14"
          style={{
            fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
            letterSpacing: "-0.03em",
          }}
        >
          How we work together
        </h2>

        <div className="grid gap-12 md:grid-cols-3">
          {[
            {
              n: "01",
              title: "Audit",
              body: "We map your funnel and find where AI removes friction and unlocks scale.",
            },
            {
              n: "02",
              title: "Build",
              body: "I design and ship the systems — automations, agents, and workflows — fast.",
            },
            {
              n: "03",
              title: "Scale",
              body: "We measure, double down on what works, and compound the wins.",
            },
          ].map((step) => (
            <div key={step.n}>
              <p
                className="text-5xl font-extrabold mb-4"
                style={{
                  fontFamily:
                    "'Helvetica Neue', Helvetica, Arial, sans-serif",
                  letterSpacing: "-0.04em",
                  color: "rgba(255,255,255,0.10)",
                }}
              >
                {step.n}
              </p>
              <h3
                className="text-xl font-extrabold mb-2"
                style={{
                  fontFamily:
                    "'Helvetica Neue', Helvetica, Arial, sans-serif",
                }}
              >
                {step.title}
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "rgba(255,255,255,0.50)" }}
              >
                {step.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── About ── */}
      <section id="about" className="mx-auto max-w-4xl px-8 pb-24">
        <p
          className="mb-4 text-xs uppercase tracking-[0.25em]"
          style={{
            fontFamily: "'Courier New', Courier, monospace",
            color: "rgba(255,255,255,0.28)",
          }}
        >
          ABOUT
        </p>
        <h2
          className="text-3xl font-extrabold tracking-tight sm:text-4xl"
          style={{
            fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
            letterSpacing: "-0.03em",
          }}
        >
          About Nicholas
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
          className="text-lg leading-relaxed mb-4 max-w-2xl"
          style={{ color: "rgba(255,255,255,0.50)" }}
        >
          I&apos;ve spent my career at the intersection of growth and technology
          — and AI is the biggest unlock I&apos;ve seen for both.
        </p>
        <p
          className="text-base leading-relaxed mb-10 max-w-2xl"
          style={{ color: "rgba(255,255,255,0.40)" }}
        >
          My work is simple: cut the noise, find the leverage, and ship systems
          that move real numbers. No 50-slide decks. No theory that never
          leaves the whiteboard. Just growth operations built on AI that you
          can actually run.
        </p>

        <div className="space-y-3">
          {[
            "AI growth strategy & roadmapping",
            "Automation of repetitive growth ops",
            "Custom AI agents & workflows",
            "Funnel and lifecycle optimization",
            "Hands-on execution, not just advice",
          ].map((item) => (
            <div key={item} className="flex items-start gap-4">
              <span
                className="text-sm"
                style={{
                  fontFamily: "'Courier New', Courier, monospace",
                  color: "rgba(255,255,255,0.28)",
                }}
              >
                →
              </span>
              <span
                className="text-base"
                style={{ color: "rgba(255,255,255,0.60)" }}
              >
                {item}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Contact ── */}
      <section id="contact" className="mx-auto max-w-4xl px-8 pb-24">
        <div className="grid gap-16 md:grid-cols-2 md:items-start">
          <div>
            <p
              className="mb-4 text-xs uppercase tracking-[0.25em]"
              style={{
                fontFamily: "'Courier New', Courier, monospace",
                color: "rgba(255,255,255,0.28)",
              }}
            >
              GET IN TOUCH
            </p>
            <h2
              className="text-3xl font-extrabold tracking-tight sm:text-4xl"
              style={{
                fontFamily:
                  "'Helvetica Neue', Helvetica, Arial, sans-serif",
                letterSpacing: "-0.03em",
              }}
            >
              Let&apos;s scale your growth
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
              className="text-lg leading-relaxed mb-4"
              style={{ color: "rgba(255,255,255,0.50)" }}
            >
              Tell me what you&apos;re working on and I&apos;ll come back with
              a short, honest take on where AI can move the needle for you.
            </p>
            <p
              className="text-base leading-relaxed mb-8"
              style={{ color: "rgba(255,255,255,0.40)" }}
            >
              Every inquiry comes straight to me. Expect a personal reply — not
              an autoresponder.
            </p>
            <a
              href={calendarLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold transition hover:text-white"
              style={{
                fontFamily: "'Courier New', Courier, monospace",
                color: "rgba(255,255,255,0.50)",
                letterSpacing: "0.05em",
              }}
            >
              OR BOOK A CALL DIRECTLY →
            </a>
          </div>
          <div
            className="p-8"
            style={{
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 12,
              backgroundColor: "rgba(255,255,255,0.02)",
            }}
          >
            <LeadForm />
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer
        className="py-10 text-center"
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
      >
        <p
          className="text-xs uppercase tracking-[0.2em]"
          style={{
            fontFamily: "'Courier New', Courier, monospace",
            color: "rgba(255,255,255,0.15)",
          }}
        >
          © {new Date().getFullYear()} NICHOLAS WOOD · AI SCALING
        </p>
      </footer>
    </main>
  );
}
