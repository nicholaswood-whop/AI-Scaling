"use client";

import { useState } from "react";

type Status = "idle" | "submitting" | "success" | "error";

export default function LeadForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string>("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setError("");

    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const payload = await res.json().catch(() => ({}));
        throw new Error(payload.error ?? "Submission failed.");
      }

      // Fire a Meta Pixel "Lead" conversion event if the pixel is loaded.
      if (typeof window !== "undefined" && typeof window.fbq === "function") {
        window.fbq("track", "Lead");
      }

      form.reset();
      setStatus("success");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-accent/40 bg-accent/10 p-8 text-center">
        <h3 className="text-xl font-semibold text-white">You&apos;re in. 🚀</h3>
        <p className="mt-2 text-gray-300">
          Thanks for reaching out — I&apos;ll be in touch shortly to map out
          your AI scaling plan.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          name="name"
          label="Name"
          placeholder="Jane Founder"
          required
        />
        <Field
          name="email"
          label="Email"
          type="email"
          placeholder="jane@company.com"
          required
        />
      </div>
      <Field
        name="company"
        label="Company"
        placeholder="Acme Inc. (optional)"
      />
      <div>
        <label
          htmlFor="message"
          className="mb-1.5 block text-sm font-medium text-gray-300"
        >
          What are you trying to scale?
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          placeholder="Tell me about your growth goals…"
          className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-gray-500 outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/40"
        />
      </div>

      {status === "error" && (
        <p className="text-sm text-red-400" role="alert">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full rounded-xl bg-accent px-6 py-3.5 font-semibold text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "submitting" ? "Sending…" : "Book a strategy call"}
      </button>
      <p className="text-center text-xs text-gray-500">
        No spam. Your details are only used to follow up about working
        together.
      </p>
    </form>
  );
}

function Field({
  name,
  label,
  type = "text",
  placeholder,
  required,
}: {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-1.5 block text-sm font-medium text-gray-300"
      >
        {label}
        {required && <span className="text-accent"> *</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-gray-500 outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/40"
      />
    </div>
  );
}
