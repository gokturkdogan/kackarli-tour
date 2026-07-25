export interface ContactPhone {
  label: string;
  number: string;
}

export interface SiteSettings {
  siteName: string;
  siteDescription: string;
  whatsappNumber: string;
  contactEmail: string;
  contactAddress: string;
  contactPhones: ContactPhone[];
  workingHours: string;
}

export const SITE_SETTING_KEYS = {
  siteName: "site_name",
  siteDescription: "site_description",
  whatsappNumber: "whatsapp_number",
  contactEmail: "contact_email",
  contactAddress: "contact_address",
  contactPhones: "contact_phones",
  workingHours: "working_hours",
  contactPhone: "contact_phone",
} as const;

export const defaultSiteSettings: SiteSettings = {
  siteName: "Kaçkarlı Tur",
  siteDescription: "Rize yayla turları ve doğa gezileri",
  whatsappNumber: "905551234567",
  contactEmail: "info@kackarlitur.com",
  contactAddress: "Rize, Türkiye",
  contactPhones: [{ label: "Rezervasyon", number: "+90 555 123 45 67" }],
  workingHours: "Pazartesi – Cumartesi: 09:00 – 19:00",
};

const keyToField: Record<string, keyof SiteSettings> = {
  [SITE_SETTING_KEYS.siteName]: "siteName",
  [SITE_SETTING_KEYS.siteDescription]: "siteDescription",
  [SITE_SETTING_KEYS.whatsappNumber]: "whatsappNumber",
  [SITE_SETTING_KEYS.contactEmail]: "contactEmail",
  [SITE_SETTING_KEYS.contactAddress]: "contactAddress",
  [SITE_SETTING_KEYS.workingHours]: "workingHours",
};

export function parseContactPhones(raw: string | undefined): ContactPhone[] {
  if (!raw?.trim()) return [];

  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];

    return parsed
      .map((item) => {
        if (!item || typeof item !== "object") return null;
        const record = item as Record<string, unknown>;
        const label = typeof record.label === "string" ? record.label.trim() : "";
        const number = typeof record.number === "string" ? record.number.trim() : "";
        if (!number) return null;
        return { label: label || "Telefon", number };
      })
      .filter((item): item is ContactPhone => item !== null);
  } catch {
    return [];
  }
}

export function mapSiteSettingsFromRecords(
  records: { key: string; value: string }[]
): SiteSettings {
  const result: SiteSettings = {
    ...defaultSiteSettings,
    contactPhones: [...defaultSiteSettings.contactPhones],
  };

  let legacyPhone = "";

  for (const record of records) {
    if (record.key === SITE_SETTING_KEYS.contactPhones) {
      const phones = parseContactPhones(record.value);
      if (phones.length > 0) {
        result.contactPhones = phones;
      }
      continue;
    }

    if (record.key === SITE_SETTING_KEYS.contactPhone) {
      legacyPhone = record.value;
      continue;
    }

    const field = keyToField[record.key];
    if (field && field !== "contactPhones") {
      result[field] = record.value;
    }
  }

  if (result.contactPhones.length === 0 && legacyPhone.trim()) {
    result.contactPhones = [{ label: "Telefon", number: legacyPhone.trim() }];
  }

  return result;
}

export function getWhatsAppUrl(number: string, message?: string): string {
  const cleanNumber = number.replace(/\D/g, "");
  const base = `https://wa.me/${cleanNumber}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}

export function formatTelHref(number: string): string {
  return `tel:${number.replace(/\s/g, "")}`;
}

/** @deprecated Use contactPhones instead */
export function getPrimaryContactPhone(settings: SiteSettings): string {
  return settings.contactPhones[0]?.number ?? "";
}
