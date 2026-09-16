import Link from "next/link";
import { desc, sql, eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { quoteRequests, contactMessages, galleryImages } from "@/lib/db/schema";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const [[quoteCount], [newQuoteCount], [contactCount], [imageCount], recentQuotes] =
    await Promise.all([
      db.select({ count: sql<number>`count(*)` }).from(quoteRequests),
      db
        .select({ count: sql<number>`count(*)` })
        .from(quoteRequests)
        .where(eq(quoteRequests.status, "new")),
      db.select({ count: sql<number>`count(*)` }).from(contactMessages),
      db.select({ count: sql<number>`count(*)` }).from(galleryImages),
      db.select().from(quoteRequests).orderBy(desc(quoteRequests.createdAt)).limit(5),
    ]);

  const stats = [
    { label: "Total Quote Requests", value: quoteCount.count },
    { label: "New (unactioned)", value: newQuoteCount.count },
    { label: "Contact Messages", value: contactCount.count },
    { label: "Gallery Images", value: imageCount.count },
  ];

  return (
    <div>
      <h1 className="serif text-3xl">Dashboard</h1>

      <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-2xl border border-[#e8e0d2] bg-white p-6">
            <div className="serif text-3xl text-[#a77a2d]">{s.value}</div>
            <p className="mt-1 text-xs text-black/50">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 rounded-2xl border border-[#e8e0d2] bg-white p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Recent quote requests</h2>
          <Link href="/admin/quotes" className="text-sm font-semibold text-[#a77a2d]">
            View all
          </Link>
        </div>

        <div className="mt-5 divide-y divide-[#e8e0d2]">
          {recentQuotes.length === 0 && (
            <p className="py-6 text-sm text-black/40">No quote requests yet.</p>
          )}
          {recentQuotes.map((q) => (
            <div key={q.id} className="flex items-center justify-between py-4 text-sm">
              <div>
                <p className="font-semibold">
                  {q.name} · {q.eventType}
                </p>
                <p className="text-black/45">
                  {q.guests} guests · {q.eventDate} · {q.venue}
                </p>
              </div>
              <span className="rounded-full bg-[#f7f3eb] px-3 py-1 text-xs font-semibold capitalize text-black/60">
                {q.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
