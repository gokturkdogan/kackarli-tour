import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";
import { PrismaClient } from "../src/generated/prisma/client";
import { seedGuides } from "./seed-guides";

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const settings = [
    { key: "site_name", value: "Kaçkarlı Tur" },
    {
      key: "site_description",
      value: "Rize günübirlik yayla turu — Fırtına Vadisi, Ayder, Pokut ve Sal rotası",
    },
    { key: "whatsapp_number", value: "905551234567" },
    { key: "contact_email", value: "info@kackarlitur.com" },
    { key: "contact_phone", value: "+90 555 123 45 67" },
    {
      key: "contact_phones",
      value: JSON.stringify([{ label: "Rezervasyon", number: "+90 555 123 45 67" }]),
    },
    { key: "contact_address", value: "Rize, Türkiye" },
    { key: "working_hours", value: "Pazartesi – Cumartesi: 09:00 – 19:00" },
  ];

  for (const setting of settings) {
    await prisma.siteSetting.upsert({
      where: { key: setting.key },
      update: { value: setting.value },
      create: setting,
    });
  }

  console.log("Site settings created");

  await seedGuides(prisma);
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
