import LeadForm from "@/components/LeadForm";
import WhopCheckout from "@/components/WhopCheckout";

const calendarLink =
  process.env.NEXT_PUBLIC_CALENDAR_LINK ?? "https://calendar.google.com";

const services = [
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
];

const stats = [
  { value: "3.2x", label: "avg. pipeline lift" },
  { value: "40+", label: "growth systems shipped" },
  { value: "10k+", label: "hours of manual work automated" },
];

const steps = [
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
];

const frameworkStats = [
  { value: "7", label: "Days to Launch" },
  { value: "15+", label: "Integrations" },
  { value: "1", label: "AI Operator" },
  { value: "$0", label: "Team Needed" },
];

export default function Home() {
  return (
    <main className="relative overflow-hidden">
      {/* Nav */}
      <header className="sticky top-0 z-20 border-b border-white/5 bg-ink/70 backdrop-blur">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a href="#top" className="text-lg font-bold tracking-tight text-white">
            AI<span className="text-accent">Scaling</span>
          </a>
          <div className="hidden items-center gap-8 text-sm text-gray-300 sm:flex">
            <a href="#services" className="transition hover:text-white">
              Services
            </a>
            <a href="#framework" className="transition hover:text-white">
              Framework
            </a>
            <a href="#process" className="transition hover:text-white">
              Process
            </a>
            <a href="#about" className="transition hover:text-white">
              About
            </a>
          </div>
          <a
            href={calendarLink}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-500"
          >
            Book a call
          </a>
        </nav>
      </header>

      {/* Hero */}
      <section id="top" className="glow relative">
        <div className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
          <div className="max-w-3xl">
            <span className="inline-block rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-sm font-medium text-accent2">
              AI-driven growth operations
            </span>
            <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight text-white sm:text-6xl">
              Scale your revenue with{" "}
              <span className="bg-gradient-to-r from-accent to-accent2 bg-clip-text text-transparent">
                AI that actually ships
              </span>
              .
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-gray-300 sm:text-xl">
              I&apos;m Nicholas Wood. I help founders and operators turn AI from
              a buzzword into a growth engine — building the systems,
              automations, and playbooks that compound month after month.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a
                href={calendarLink}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl bg-accent px-7 py-3.5 text-center font-semibold text-white transition hover:bg-indigo-500"
              >
                Book a strategy call
              </a>
              <a
                href="#framework"
                className="rounded-xl border border-white/15 px-7 py-3.5 text-center font-semibold text-white transition hover:bg-white/5"
              >
                Get the 7-Day Framework →
              </a>
            </div>
          </div>

          <div className="mt-20 grid gap-8 border-t border-white/5 pt-10 sm:grid-cols-3">
            {stats.map((s) => (
              <div key={s.label}>
                <div className="text-3xl font-bold text-white sm:text-4xl">
                  {s.value}
                </div>
                <div className="mt-1 text-sm text-gray-400">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="border-t border-white/5">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              What I help you build
            </h2>
            <p className="mt-4 text-lg text-gray-400">
              Three ways to put AI to work on your growth — pick the depth that
              fits where you are.
            </p>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {services.map((s) => (
              <div
                key={s.title}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 transition hover:border-accent/40 hover:bg-white/[0.06]"
              >
                <h3 className="text-xl font-semibold text-white">{s.title}</h3>
                <p className="mt-3 leading-relaxed text-gray-400">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7-Day Framework / Paid Download */}
      <section
        id="framework"
        className="relative border-t border-white/5 bg-gradient-to-b from-accent/[0.08] to-transparent"
      >
        <div className="mx-auto max-w-6xl px-6 py-24">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-block rounded-full border border-accent2/30 bg-accent2/10 px-4 py-1.5 text-sm font-medium text-accent2">
              Digital Download — $27
            </span>
            <h2 className="mt-6 text-3xl font-bold tracking-tight text-white sm:text-5xl">
              Launch a Business with AI
              <br />
              <span className="bg-gradient-to-r from-accent to-accent2 bg-clip-text text-transparent">
                in 7 Days
              </span>
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-gray-300">
              The complete step-by-step framework for using an AI operator to
              go from zero to a launched digital product — validated idea,
              built product, live sales system, and marketing engine. No
              fluff, no theory. Just the exact playbook.
            </p>
          </div>

          {/* Stats Row */}
          <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {frameworkStats.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center"
              >
                <div className="text-3xl font-extrabold text-white sm:text-4xl">
                  {s.value}
                </div>
                <div className="mt-1 text-sm text-gray-400">{s.label}</div>
              </div>
            ))}
          </div>

          {/* What's Inside */}
          <div className="mx-auto mt-16 max-w-2xl rounded-2xl border border-accent/30 bg-gradient-to-br from-white/[0.05] to-accent/[0.05] p-8 sm:p-10">
            <h3 className="text-center text-xl font-bold text-white">
              What&apos;s inside the framework
            </h3>
            <ul className="mt-6 space-y-3">
              {[
                "The AI operator that builds your entire business for you",
                "Complete 7-day action plan — what to do each day",
                "The exact system used to launch in a single session",
                "How to go from zero to live checkout in days, not months",
                "Ad campaigns, creatives, and targeting — done for you",
                "The full tech stack — every tool, connected and automated",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-gray-200">
                  <span className="mt-0.5 text-accent2">✓</span>
                  <span className="text-sm">{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <WhopCheckout />
            </div>
            <p className="mt-4 text-center text-xs text-gray-500">
              Instant digital delivery · One-time payment · No subscription
            </p>
          </div>
        </div>
      </section>

      {/* Process */}
      <section id="process" className="border-t border-white/5 bg-white/[0.02]">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            How we work together
          </h2>
          <div className="mt-14 grid gap-10 md:grid-cols-3">
            {steps.map((step) => (
              <div key={step.n}>
                <div className="text-5xl font-bold text-accent/30">
                  {step.n}
                </div>
                <h3 className="mt-4 text-xl font-semibold text-white">
                  {step.title}
                </h3>
                <p className="mt-2 leading-relaxed text-gray-400">
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="border-t border-white/5">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-24 md:grid-cols-2 md:items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              About Nicholas
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-gray-300">
              I&apos;ve spent my career at the intersection of growth and
              technology — and AI is the biggest unlock I&apos;ve seen for both.
            </p>
            <p className="mt-4 leading-relaxed text-gray-400">
              My work is simple: cut the noise, find the leverage, and ship
              systems that move real numbers. No 50-slide decks. No theory that
              never leaves the whiteboard. Just growth operations built on AI
              that you can actually run.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-accent/10 to-accent2/5 p-8">
            <ul className="space-y-4">
              {[
                "AI growth strategy & roadmapping",
                "Automation of repetitive growth ops",
                "Custom AI agents & workflows",
                "Funnel and lifecycle optimization",
                "Hands-on execution, not just advice",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-gray-200">
                  <span className="mt-1 text-accent2">→</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="border-t border-white/5 bg-white/[0.02]">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-24 md:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Let&apos;s scale your growth
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-gray-300">
              Tell me what you&apos;re working on and I&apos;ll come back with a
              short, honest take on where AI can move the needle for you.
            </p>
            <p className="mt-4 leading-relaxed text-gray-400">
              Every inquiry comes straight to me. Expect a personal reply — not
              an autoresponder.
            </p>
            <a
              href={calendarLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-xl border border-accent/40 bg-accent/10 px-6 py-3 font-semibold text-accent transition hover:bg-accent/20"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                  clipRule="evenodd"
                />
              </svg>
              Or book a call directly
            </a>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8">
            <LeadForm />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-10 text-sm text-gray-500 sm:flex-row">
          <span>
            © {new Date().getFullYear()} Nicholas Wood · AI Scaling
          </span>
          <span>Built for growth.</span>
        </div>
      </footer>
    </main>
  );
}
