"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { AlertCircle } from "lucide-react";

export function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const result = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });

    setSubmitting(false);

    if (result?.error) {
      setError("Incorrect email or password.");
      return;
    }

    router.push("/admin/dashboard");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="flex items-start gap-2 rounded-lg bg-red-500/10 p-3 text-sm text-red-300">
          <AlertCircle className="mt-0.5 shrink-0" size={16} />
          {error}
        </div>
      )}
      <label className="block text-xs font-semibold text-white/60">
        Email
        <input
          required
          name="email"
          type="email"
          className="mt-2 w-full rounded-lg border border-white/15 bg-transparent px-4 py-3 text-sm outline-none focus:border-[#d8ad62]"
        />
      </label>
      <label className="block text-xs font-semibold text-white/60">
        Password
        <input
          required
          name="password"
          type="password"
          className="mt-2 w-full rounded-lg border border-white/15 bg-transparent px-4 py-3 text-sm outline-none focus:border-[#d8ad62]"
        />
      </label>
      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-full bg-[#d8ad62] px-6 py-3.5 text-sm font-bold text-black disabled:opacity-60"
      >
        {submitting ? "Signing in..." : "Sign In"}
      </button>
    </form>
  );
}
