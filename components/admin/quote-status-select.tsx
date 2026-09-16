"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const statuses = ["new", "contacted", "won", "lost"] as const;

export function QuoteStatusSelect({ id, status }: { id: number; status: string }) {
  const router = useRouter();
  const [updating, setUpdating] = useState(false);

  async function handleChange(newStatus: string) {
    setUpdating(true);
    try {
      await fetch(`/api/admin/quotes/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      router.refresh();
    } finally {
      setUpdating(false);
    }
  }

  return (
    <select
      value={status}
      disabled={updating}
      onChange={(e) => handleChange(e.target.value)}
      className="rounded-full border border-black/15 bg-white px-3 py-1.5 text-xs font-semibold capitalize outline-none disabled:opacity-50"
    >
      {statuses.map((s) => (
        <option key={s} value={s}>
          {s}
        </option>
      ))}
    </select>
  );
}
