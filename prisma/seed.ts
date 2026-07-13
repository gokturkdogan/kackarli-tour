import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";
import { PrismaClient } from "../src/generated/prisma/client";
import bcrypt from "bcryptjs";

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const email = process.env.ADMIN_EMAIL ?? "admin@kackarlitur.com";
  const password = process.env.ADMIN_PASSWORD ?? "admin123456";
  const name = process.env.ADMIN_NAME ?? "Admin";

  const hashedPassword = await bcrypt.hash(password, 12);

  const admin = await prisma.user.upsert({
    where: { email },
    update: { password: hashedPassword, role: "ADMIN", name },
    create: {
      email,
      password: hashedPassword,
      role: "ADMIN",
      name,
    },
  });

  console.log(`Admin user: ${admin.email}`);

  const categories = [
    {
      name: "Yayla Turları",
      slug: "yayla-turlari",
      description: "Rize'nin eşsiz yaylalarını keşfedin",
      type: "DAY_TRIP" as const,
      sortOrder: 1,
    },
    {
      name: "Şelale Turları",
      slug: "selale-turlari",
      description: "Doğanın muhteşem şelalelerini görün",
      type: "DAY_TRIP" as const,
      sortOrder: 2,
    },
    {
      name: "Konaklamalı Yayla",
      slug: "konaklamali-yayla",
      description: "Yaylada konaklama imkanı sunan turlar",
      type: "ACCOMMODATION" as const,
      sortOrder: 3,
    },
  ];

  for (const category of categories) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      update: category,
      create: category,
    });
  }

  console.log("Seed categories created");

  const settings = [
    { key: "site_name", value: "Kaçkarlı Tur" },
    { key: "site_description", value: "Rize yayla turları ve doğa gezileri" },
    { key: "whatsapp_number", value: "905551234567" },
    { key: "contact_email", value: "info@kackarlitur.com" },
    { key: "contact_phone", value: "+90 555 123 45 67" },
    { key: "contact_address", value: "Rize, Türkiye" },
  ];

  for (const setting of settings) {
    await prisma.siteSetting.upsert({
      where: { key: setting.key },
      update: { value: setting.value },
      create: setting,
    });
  }

  console.log("Site settings created");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
