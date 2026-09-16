import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { galleryImages } from "@/lib/db/schema";
import cloudinary from "@/lib/cloudinary";

const patchSchema = z.object({
  featured: z.boolean(),
});

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const imageId = Number(id);
  if (!Number.isInteger(imageId)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }

  const json = await req.json().catch(() => null);
  const parsed = patchSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const [row] = await db
    .update(galleryImages)
    .set({ featured: parsed.data.featured })
    .where(eq(galleryImages.id, imageId))
    .returning();

  if (!row) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(row);
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const imageId = Number(id);
  if (!Number.isInteger(imageId)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }

  const [image] = await db.select().from(galleryImages).where(eq(galleryImages.id, imageId)).limit(1);
  if (!image) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  try {
    await cloudinary.uploader.destroy(image.publicId);
  } catch (err) {
    console.error("Failed to delete Cloudinary asset:", err);
  }

  await db.delete(galleryImages).where(eq(galleryImages.id, imageId));

  return NextResponse.json({ ok: true });
}
