"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: String(formData.get("name") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      email: String(formData.get("email") ?? ""),
      message: String(formData.get("message") ?? ""),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.error ?? "Something went wrong. Please try again.");
      }

      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border border-[#e8e0d2] bg-white p-10 text-center">
        <CheckCircle2 className="mx-auto text-[#a77a2d]" size={32} />
        <h3 className="serif mt-4 text-2xl">Message sent</h3>
        <p className="mt-2 text-sm leading-6 text-black/55">
          Thanks for reaching out — our team will get back to you within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-[#e8e0d2] bg-white p-7">
      {error && (
        <div className="mb-5 flex items-start gap-2 rounded-lg bg-red-50 p-4 text-sm text-red-700">
          <AlertCircle className="mt-0.5 shrink-0" size={16} />
          {error}
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-xs font-semibold text-black/60">
          Full name
          <input
            required
            name="name"
            type="text"
            className="mt-2 w-full rounded-lg border border-black/15 px-4 py-3 text-sm outline-none focus:border-[#a77a2d]"
          />
        </label>
        <label className="text-xs font-semibold text-black/60">
          Phone number
          <input
            required
            name="phone"
            type="tel"
            className="mt-2 w-full rounded-lg border border-black/15 px-4 py-3 text-sm outline-none focus:border-[#a77a2d]"
          />
        </label>
      </div>
      <label className="mt-4 block text-xs font-semibold text-black/60">
        Email
        <input
          required
          name="email"
          type="email"
          className="mt-2 w-full rounded-lg border border-black/15 px-4 py-3 text-sm outline-none focus:border-[#a77a2d]"
        />
      </label>
      <label className="mt-4 block text-xs font-semibold text-black/60">
        Message
        <textarea
          required
          name="message"
          rows={5}
          className="mt-2 w-full rounded-lg border border-black/15 px-4 py-3 text-sm outline-none focus:border-[#a77a2d]"
          placeholder="Tell us about your event..."
        />
      </label>
      <button
        type="submit"
        disabled={submitting}
        className="mt-6 inline-flex items-center rounded-full bg-black px-6 py-4 text-sm font-bold text-white disabled:opacity-60"
      >
        {submitting ? "Sending..." : "Send Message"}
        {!submitting && <ArrowRight className="ml-2" size={15} />}
      </button>
    </form>
  );
}
