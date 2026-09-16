import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { contactMessages } from "@/lib/db/schema";
import { sendContactEmail } from "@/lib/email";

const contactSchema = z.object({
  name: z.string().min(1),
  phone: z.string().min(6),
  email: z.string().email(),
  message: z.string().min(1),
});

export async function POST(req: Request) {
  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Please check the form and try again.", issues: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const d = parsed.data;

  try {
    await db.insert(contactMessages).values(d);
  } catch (err) {
    console.error("Failed to save contact message:", err);
    return NextResponse.json(
      { error: "Something went wrong sending your message. Please try again." },
      { status: 500 }
    );
  }

  try {
    await sendContactEmail(d);
  } catch (err) {
    console.error("Message saved, but sending email failed:", err);
  }

  return NextResponse.json({ ok: true });
}
