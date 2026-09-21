import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { quoteRequests } from "@/lib/db/schema";
import { sendQuoteEmails } from "@/lib/email";
import { createRouteLogger } from "@/lib/api-handler";

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
  const { logger } = createRouteLogger("quote");

  let json: unknown;
  try {
    json = await req.json();
  } catch (err) {
    logger.warn("parse-json: failed", { err });
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = quoteSchema.safeParse(json);
  if (!parsed.success) {
    logger.warn("validate: failed", { issues: parsed.error.flatten() });
    return NextResponse.json(
      { error: "Please check the form and try again.", issues: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const d = parsed.data;
  logger.info("validate: ok", { name: d.name, eventType: d.eventType });

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
    logger.info("db-insert: ok", { id: insertedId });
  } catch (err) {
    // DIAGNOSTIC: Drizzle wraps the real driver/Postgres error, hiding it
    // behind a generic "Failed query" message. Log every possible layer
    // (message, name, cause, and all own properties) so the actual
    // underlying error is visible instead of just Drizzle's wrapper text.
    const anyErr = err as any;
    logger.error("db-insert: failed", {
      input: d,
      errMessage: anyErr?.message,
      errName: anyErr?.name,
      errCause: anyErr?.cause,
      errCauseMessage: anyErr?.cause?.message,
      errCauseCode: anyErr?.cause?.code,
      errCauseDetail: anyErr?.cause?.detail,
      errFull: (() => {
        try {
          return JSON.stringify(err, Object.getOwnPropertyNames(err), 2);
        } catch {
          return String(err);
        }
      })(),
    });
    return NextResponse.json(
      { error: "Something went wrong saving your request. Please try again." },
      { status: 500 }
    );
  }

  // The request is already saved — don't fail the response if only the email send fails.
  try {
    await sendQuoteEmails(d);
    logger.info("send-email: ok", { id: insertedId });
  } catch (err) {
    logger.error("send-email: failed (request still saved)", { err, id: insertedId });
  }

  return NextResponse.json({ ok: true, id: insertedId });
}
