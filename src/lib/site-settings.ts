import { prisma } from "@/lib/prisma";
import {
  defaultSiteSettings,
  mapSiteSettingsFromRecords,
  type SiteSettings,
} from "@/lib/site-settings.shared";

export * from "@/lib/site-settings.shared";

export async function getSiteSettings(): Promise<SiteSettings> {
  const records = await prisma.siteSetting.findMany();
  if (records.length === 0) {
    return defaultSiteSettings;
  }

  return mapSiteSettingsFromRecords(records);
}
