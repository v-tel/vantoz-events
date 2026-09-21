import { z } from "zod";

/**
 * Validates process.env once, at import time, against everything your
 * .env.example lists. If something's missing or misnamed, you get one
 * clear error at startup instead of chasing a "fetch failed" three
 * layers down in Cloudinary/Resend/Drizzle code.
 *
 * Import `env` (not `process.env`) anywhere you currently read one of
 * these variables, e.g. `import { env } from "@/lib/env"`.
 */
const envSchema = z.object({
  DATABASE_URL: z.string().min(1, "DATABASE_URL is required"),
  DATABASE_URL_POOLED: z.string().optional(),

  RESEND_API_KEY: z.string().min(1, "RESEND_API_KEY is required"),
  RESEND_FROM_EMAIL: z.string().min(1, "RESEND_FROM_EMAIL is required"),
  VANTOZ_NOTIFY_EMAIL: z.string().email("VANTOZ_NOTIFY_EMAIL must be a valid email"),

  AUTH_SECRET: z.string().min(1, "AUTH_SECRET is required (generate with: npx auth secret)"),

  CLOUDINARY_CLOUD_NAME: z.string().min(1, "CLOUDINARY_CLOUD_NAME is required"),
  CLOUDINARY_API_KEY: z.string().min(1, "CLOUDINARY_API_KEY is required"),
  CLOUDINARY_API_SECRET: z.string().min(1, "CLOUDINARY_API_SECRET is required"),

  NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: z
    .string()
    .min(1, "NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME is required"),
  NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET: z
    .string()
    .min(1, "NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET is required"),
});

function loadEnv() {
  const parsed = envSchema.safeParse(process.env);
  if (!parsed.success) {
    const issues = parsed.error.issues
      .map((i) => `  - ${i.path.join(".")}: ${i.message}`)
      .join("\n");
    throw new Error(
      `\n\n❌ Invalid/missing environment variables:\n${issues}\n\n` +
        `Check .env.local against .env.example and restart the dev server.\n`
    );
  }
  return parsed.data;
}

export const env = loadEnv();