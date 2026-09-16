"use client";

import { useState, type FormEvent } from "react";
import { ArrowLeft, ArrowRight, Check, CheckCircle2, AlertCircle } from "lucide-react";

const eventTypes = [
  "Wedding",
  "Birthday",
  "Graduation",
  "Corporate",
  "Baby Shower",
  "Traditional",
  "Other",
];

const needsOptions = [
  "Backdrop",
  "Chairs",
  "Tables",
  "Centerpieces",
  "Flowers",
  "Lighting",
  "Tent",
  "Sound",
];

const budgetOptions = ["Under KSh 30,000", "KSh 30,000 – 60,000", "KSh 60,000 – 100,000", "KSh 100,000+"];

type FormData = {
  eventType: string;
  date: string;
  guests: string;
  venue: string;
  needs: string[];
  budget: string;
  name: string;
  phone: string;
  email: string;
};

const initialData: FormData = {
  eventType: "",
  date: "",
  guests: "",
  venue: "",
  needs: [],
  budget: "",
  name: "",
  phone: "",
  email: "",
};

const totalSteps = 5;

export function QuoteBuilder() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<FormData>(initialData);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function toggleNeed(item: string) {
    setData((prev) => ({
      ...prev,
      needs: prev.needs.includes(item)
        ? prev.needs.filter((n) => n !== item)
        : [...prev.needs, item],
    }));
  }

  function canContinue() {
    if (step === 1) return !!data.eventType;
    if (step === 2) return !!data.date && !!data.guests && !!data.venue;
    if (step === 3) return data.needs.length > 0;
    if (step === 4) return !!data.budget;
    return true;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          guests: Number(data.guests),
        }),
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
      <div className="mx-auto max-w-lg rounded-2xl border border-[#e8e0d2] bg-white p-10 text-center">
        <CheckCircle2 className="mx-auto text-[#a77a2d]" size={36} />
        <h2 className="serif mt-5 text-3xl">Quote request received</h2>
        <p className="mt-3 text-sm leading-6 text-black/55">
          Thanks, {data.name || "there"} — our team will review your {data.eventType.toLowerCase()}{" "}
          details and get back to you within 24 hours with a tailored quote.
        </p>
        <a
          href="https://wa.me/254700000000"
          className="mt-7 inline-flex items-center rounded-full bg-[#d8ad62] px-6 py-4 text-sm font-bold text-black"
        >
          Message us on WhatsApp for a faster reply
        </a>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      {/* progress */}
      <div className="mb-10 flex items-center gap-2">
        {Array.from({ length: totalSteps }).map((_, i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full ${
              i + 1 <= step ? "bg-[#d8ad62]" : "bg-black/10"
            }`}
          />
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <fieldset>
            <legend className="serif text-3xl">What type of event?</legend>
            <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {eventTypes.map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setData((prev) => ({ ...prev, eventType: type }))}
                  className={`rounded-xl border px-4 py-5 text-sm font-semibold transition ${
                    data.eventType === type
                      ? "border-black bg-black text-white"
                      : "border-black/15 text-black/70 hover:border-black/40"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </fieldset>
        )}

        {step === 2 && (
          <fieldset>
            <legend className="serif text-3xl">Tell us the details</legend>
            <div className="mt-7 space-y-5">
              <label className="block text-xs font-semibold text-black/60">
                Event date
                <input
                  required
                  type="date"
                  value={data.date}
                  onChange={(e) => setData((prev) => ({ ...prev, date: e.target.value }))}
                  className="mt-2 w-full rounded-lg border border-black/15 px-4 py-3 text-sm outline-none focus:border-[#a77a2d]"
                />
              </label>
              <label className="block text-xs font-semibold text-black/60">
                Number of guests
                <input
                  required
                  type="number"
                  min={1}
                  placeholder="e.g. 150"
                  value={data.guests}
                  onChange={(e) => setData((prev) => ({ ...prev, guests: e.target.value }))}
                  className="mt-2 w-full rounded-lg border border-black/15 px-4 py-3 text-sm outline-none focus:border-[#a77a2d]"
                />
              </label>
              <label className="block text-xs font-semibold text-black/60">
                Venue
                <input
                  required
                  type="text"
                  placeholder="Venue name or area"
                  value={data.venue}
                  onChange={(e) => setData((prev) => ({ ...prev, venue: e.target.value }))}
                  className="mt-2 w-full rounded-lg border border-black/15 px-4 py-3 text-sm outline-none focus:border-[#a77a2d]"
                />
              </label>
            </div>
          </fieldset>
        )}

        {step === 3 && (
          <fieldset>
            <legend className="serif text-3xl">What do you need?</legend>
            <p className="mt-2 text-sm text-black/50">Select everything that applies.</p>
            <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {needsOptions.map((item) => {
                const isSelected = data.needs.includes(item);
                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => toggleNeed(item)}
                    className={`flex items-center justify-between rounded-xl border px-4 py-4 text-sm font-medium transition ${
                      isSelected
                        ? "border-black bg-black text-white"
                        : "border-black/15 text-black/70 hover:border-black/40"
                    }`}
                  >
                    {item}
                    {isSelected && <Check size={15} />}
                  </button>
                );
              })}
            </div>
          </fieldset>
        )}

        {step === 4 && (
          <fieldset>
            <legend className="serif text-3xl">Estimated budget</legend>
            <div className="mt-7 space-y-3">
              {budgetOptions.map((b) => (
                <button
                  key={b}
                  type="button"
                  onClick={() => setData((prev) => ({ ...prev, budget: b }))}
                  className={`block w-full rounded-xl border px-5 py-4 text-left text-sm font-semibold transition ${
                    data.budget === b
                      ? "border-black bg-black text-white"
                      : "border-black/15 text-black/70 hover:border-black/40"
                  }`}
                >
                  {b}
                </button>
              ))}
            </div>
          </fieldset>
        )}

        {step === 5 && (
          <fieldset>
            <legend className="serif text-3xl">Almost done</legend>
            <div className="mt-7 space-y-5">
              {error && (
                <div className="flex items-start gap-2 rounded-lg bg-red-50 p-4 text-sm text-red-700">
                  <AlertCircle className="mt-0.5 shrink-0" size={16} />
                  {error}
                </div>
              )}

              <label className="block text-xs font-semibold text-black/60">
                Your name
                <input
                  required
                  type="text"
                  value={data.name}
                  onChange={(e) => setData((prev) => ({ ...prev, name: e.target.value }))}
                  className="mt-2 w-full rounded-lg border border-black/15 px-4 py-3 text-sm outline-none focus:border-[#a77a2d]"
                />
              </label>
              <label className="block text-xs font-semibold text-black/60">
                Phone number
                <input
                  required
                  type="tel"
                  value={data.phone}
                  onChange={(e) => setData((prev) => ({ ...prev, phone: e.target.value }))}
                  className="mt-2 w-full rounded-lg border border-black/15 px-4 py-3 text-sm outline-none focus:border-[#a77a2d]"
                />
              </label>
              <label className="block text-xs font-semibold text-black/60">
                Email <span className="font-normal text-black/35">(optional — for a copy of your quote)</span>
                <input
                  type="email"
                  value={data.email}
                  onChange={(e) => setData((prev) => ({ ...prev, email: e.target.value }))}
                  className="mt-2 w-full rounded-lg border border-black/15 px-4 py-3 text-sm outline-none focus:border-[#a77a2d]"
                />
              </label>

              <div className="rounded-xl bg-[#f7f3eb] p-5 text-sm text-black/60">
                <p>
                  <span className="font-semibold text-black">{data.eventType}</span> ·{" "}
                  {data.guests} guests · {data.date || "date not set"}
                </p>
                <p className="mt-1">{data.venue}</p>
                <p className="mt-1">Needs: {data.needs.join(", ")}</p>
                <p className="mt-1">Budget: {data.budget}</p>
              </div>
            </div>
          </fieldset>
        )}

        <div className="mt-10 flex items-center justify-between">
          {step > 1 ? (
            <button
              type="button"
              onClick={() => setStep((s) => s - 1)}
              className="inline-flex items-center text-sm font-semibold text-black/60"
            >
              <ArrowLeft className="mr-2" size={15} />
              Back
            </button>
          ) : (
            <span />
          )}

          {step < totalSteps ? (
            <button
              type="button"
              disabled={!canContinue()}
              onClick={() => setStep((s) => s + 1)}
              className="inline-flex items-center rounded-full bg-black px-6 py-4 text-sm font-bold text-white disabled:opacity-30"
            >
              Continue
              <ArrowRight className="ml-2" size={15} />
            </button>
          ) : (
            <button
              type="submit"
              disabled={!data.name || !data.phone || submitting}
              className="inline-flex items-center rounded-full bg-[#d8ad62] px-6 py-4 text-sm font-bold text-black disabled:opacity-30"
            >
              {submitting ? "Sending..." : "Get My Quote"}
              {!submitting && <ArrowRight className="ml-2" size={15} />}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
