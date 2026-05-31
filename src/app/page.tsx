import LeadForm from "@/components/LeadForm";

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
            <a href="#process" className="transition hover:text-white">
              Process
            </a>
            <a href="#about" className="transition hover:text-white">
              About
            </a>
          </div>
          <a
            href="#contact"
            className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-500"
          >
            Work with me
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
                href="#contact"
                className="rounded-xl bg-accent px-7 py-3.5 text-center font-semibold text-white transition hover:bg-indigo-500"
              >
                Book a strategy call
              </a>
              <a
                href="#services"
                className="rounded-xl border border-white/15 px-7 py-3.5 text-center font-semibold text-white transition hover:bg-white/5"
              >
                See what I do
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
