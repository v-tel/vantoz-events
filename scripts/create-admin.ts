/**
 * Usage:
 *   npx tsx scripts/create-admin.ts you@vantozevents.com "a-strong-password" "Your Name"
 */
import { config } from "dotenv";
config({ path: ".env.local" });

async function main() {
  const [, , email, password, name] = process.argv;

  if (!email || !password) {
    console.error('Usage: npx tsx scripts/create-admin.ts <email> <password> ["Name"]');
    process.exit(1);
  }

  const bcrypt = (await import("bcryptjs")).default;
  const { db } = await import("../lib/db");
  const { adminUsers } = await import("../lib/db/schema");

  const passwordHash = await bcrypt.hash(password, 10);

  await db.insert(adminUsers).values({
    email: email.toLowerCase(),
    passwordHash,
    name: name ?? null,
  });

  console.log(`Admin user created: ${email}`);
  process.exit(0);
}

main().catch((err) => {
  console.error("Failed to create admin user:", err);
  process.exit(1);
});
