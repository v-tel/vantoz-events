import { desc } from "drizzle-orm";
import { db } from "@/lib/db";
import { quoteRequests } from "@/lib/db/schema";
import { QuoteStatusSelect } from "@/components/admin/quote-status-select";

export const dynamic = "force-dynamic";

export default async function AdminQuotesPage() {
  const quotes = await db.select().from(quoteRequests).orderBy(desc(quoteRequests.createdAt));

  return (
    <div>
      <h1 className="serif text-3xl">Quote Requests</h1>
      <p className="mt-2 text-sm text-black/50">{quotes.length} total</p>

      <div className="mt-8 space-y-4">
        {quotes.length === 0 && (
          <p className="rounded-2xl border border-[#e8e0d2] bg-white p-8 text-center text-sm text-black/40">
            No quote requests yet.
          </p>
        )}

        {quotes.map((q) => (
          <div key={q.id} className="rounded-2xl border border-[#e8e0d2] bg-white p-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-lg font-semibold">
                  {q.name} <span className="font-normal text-black/40">· {q.eventType}</span>
                </p>
                <p className="mt-1 text-sm text-black/55">
                  {q.phone}
                  {q.email ? ` · ${q.email}` : ""}
                </p>
              </div>
              <QuoteStatusSelect id={q.id} status={q.status} />
            </div>

            <div className="mt-4 grid gap-2 text-sm text-black/60 sm:grid-cols-2">
              <p>
                <span className="font-semibold text-black">Date:</span> {q.eventDate}
              </p>
              <p>
                <span className="font-semibold text-black">Guests:</span> {q.guests}
              </p>
              <p>
                <span className="font-semibold text-black">Venue:</span> {q.venue}
              </p>
              <p>
                <span className="font-semibold text-black">Budget:</span> {q.budget}
              </p>
              <p className="sm:col-span-2">
                <span className="font-semibold text-black">Needs:</span> {q.needs.join(", ")}
              </p>
            </div>

            <p className="mt-4 text-xs text-black/35">
              Submitted {new Date(q.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
