import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { contactMessages } from "@/lib/db/schema";
import { sendContactEmail } from "@/lib/email";
import { createRouteLogger } from "@/lib/api-handler";

const contactSchema = z.object({
  name: z.string().min(1),
  phone: z.string().min(6),
  email: z.string().email(),
  message: z.string().min(1),
});

export async function POST(req: Request) {
  const { logger } = createRouteLogger("contact");

  let json: unknown;
  try {
    json = await req.json();
  } catch (err) {
    logger.warn("parse-json: failed", { err });
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(json);
  if (!parsed.success) {
    logger.warn("validate: failed", { issues: parsed.error.flatten() });
    return NextResponse.json(
      { error: "Please check the form and try again.", issues: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const d = parsed.data;
  logger.info("validate: ok", { name: d.name });

  try {
    await db.insert(contactMessages).values(d);
    logger.info("db-insert: ok");
  } catch (err) {
    logger.error("db-insert: failed", { err, input: d });
    return NextResponse.json(
      { error: "Something went wrong sending your message. Please try again." },
      { status: 500 }
    );
  }

  try {
    await sendContactEmail(d);
    logger.info("send-email: ok");
  } catch (err) {
    logger.error("send-email: failed (message still saved)", { err });
  }

  return NextResponse.json({ ok: true });
}