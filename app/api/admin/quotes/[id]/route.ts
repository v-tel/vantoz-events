import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { quoteRequests } from "@/lib/db/schema";

const schema = z.object({
  status: z.enum(["new", "contacted", "won", "lost"]),
});

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const quoteId = Number(id);
  if (!Number.isInteger(quoteId)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }

  const json = await req.json().catch(() => null);
  const parsed = schema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }

  await db
    .update(quoteRequests)
    .set({ status: parsed.data.status })
    .where(eq(quoteRequests.id, quoteId));

  return NextResponse.json({ ok: true });
}
