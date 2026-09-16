import { desc } from "drizzle-orm";
import { db } from "@/lib/db";
import { contactMessages } from "@/lib/db/schema";

export const dynamic = "force-dynamic";

export default async function AdminContactsPage() {
  const messages = await db
    .select()
    .from(contactMessages)
    .orderBy(desc(contactMessages.createdAt));

  return (
    <div>
      <h1 className="serif text-3xl">Messages</h1>
      <p className="mt-2 text-sm text-black/50">{messages.length} total</p>

      <div className="mt-8 space-y-4">
        {messages.length === 0 && (
          <p className="rounded-2xl border border-[#e8e0d2] bg-white p-8 text-center text-sm text-black/40">
            No messages yet.
          </p>
        )}

        {messages.map((m) => (
          <div key={m.id} className="rounded-2xl border border-[#e8e0d2] bg-white p-6">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <p className="text-lg font-semibold">{m.name}</p>
              <p className="text-xs text-black/35">{new Date(m.createdAt).toLocaleString()}</p>
            </div>
            <p className="mt-1 text-sm text-black/55">
              {m.phone} · {m.email}
            </p>
            <p className="mt-4 text-sm leading-6 text-black/70">{m.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
