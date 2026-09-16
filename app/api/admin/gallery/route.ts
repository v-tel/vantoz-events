import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { galleryImages } from "@/lib/db/schema";

const schema = z.object({
  url: z.string().url(),
  publicId: z.string().min(1),
  category: z.string().optional(),
});

export async function POST(req: Request) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const json = await req.json().catch(() => null);
  const parsed = schema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const [row] = await db
    .insert(galleryImages)
    .values({
      url: parsed.data.url,
      publicId: parsed.data.publicId,
      category: parsed.data.category ?? null,
    })
    .returning();

  return NextResponse.json(row);
}
