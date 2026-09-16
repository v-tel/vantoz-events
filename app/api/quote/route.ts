import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { quoteRequests } from "@/lib/db/schema";
import { sendQuoteEmails } from "@/lib/email";

const quoteSchema = z.object({
  eventType: z.string().min(1),
  date: z.string().min(1),
  guests: z.coerce.number().int().positive(),
  venue: z.string().min(1),
  needs: z.array(z.string()).min(1),
  budget: z.string().min(1),
  name: z.string().min(1),
  phone: z.string().min(6),
  email: z.union([z.string().email(), z.literal("")]).optional(),
});

export async function POST(req: Request) {
  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = quoteSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Please check the form and try again.", issues: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const d = parsed.data;

  let insertedId: number;
  try {
    const [row] = await db
      .insert(quoteRequests)
      .values({
        eventType: d.eventType,
        eventDate: d.date,
        guests: d.guests,
        venue: d.venue,
        needs: d.needs,
        budget: d.budget,
        name: d.name,
        phone: d.phone,
        email: d.email || null,
      })
      .returning({ id: quoteRequests.id });

    insertedId = row.id;
  } catch (err) {
    console.error("Failed to save quote request:", err);
    return NextResponse.json(
      { error: "Something went wrong saving your request. Please try again." },
      { status: 500 }
    );
  }

  // The request is already saved — don't fail the response if only the email send fails.
  try {
    await sendQuoteEmails(d);
  } catch (err) {
    console.error("Quote saved, but sending email failed:", err);
  }

  return NextResponse.json({ ok: true, id: insertedId });
}
