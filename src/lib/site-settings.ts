import { prisma } from "@/lib/prisma";

export interface SiteSettings {
  siteName: string;
  siteDescription: string;
  whatsappNumber: string;
  contactEmail: string;
  contactPhone: string;
  contactAddress: string;
}

const defaults: SiteSettings = {
  siteName: "Kaçkarlı Tur",
  siteDescription: "Rize yayla turları ve doğa gezileri",
  whatsappNumber: "905551234567",
  contactEmail: "info@kackarlitur.com",
  contactPhone: "+90 555 123 45 67",
  contactAddress: "Rize, Türkiye",
};

const keyMap: Record<string, keyof SiteSettings> = {
  site_name: "siteName",
  site_description: "siteDescription",
  whatsapp_number: "whatsappNumber",
  contact_email: "contactEmail",
  contact_phone: "contactPhone",
  contact_address: "contactAddress",
};

export async function getSiteSettings(): Promise<SiteSettings> {
  const settings = await prisma.siteSetting.findMany({
    where: {
      key: {
        in: Object.keys(keyMap),
      },
    },
  });

  const result = { ...defaults };

  for (const setting of settings) {
    const mappedKey = keyMap[setting.key];
    if (mappedKey) {
      result[mappedKey] = setting.value;
    }
  }

  return result;
}

export function getWhatsAppUrl(number: string, message?: string): string {
  const cleanNumber = number.replace(/\D/g, "");
  const base = `https://wa.me/${cleanNumber}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}
