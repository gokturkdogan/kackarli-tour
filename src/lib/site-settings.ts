import { cache } from "react";
import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/prisma";
import {
  defaultSiteSettings,
  mapSiteSettingsFromRecords,
  type SiteSettings,
} from "@/lib/site-settings.shared";

export * from "@/lib/site-settings.shared";

async function loadSiteSettings(): Promise<SiteSettings> {
  const records = await prisma.siteSetting.findMany();
  if (records.length === 0) {
    return defaultSiteSettings;
  }

  return mapSiteSettingsFromRecords(records);
}

const getCachedSiteSettings = unstable_cache(loadSiteSettings, ["site-settings"], {
  revalidate: 600,
});

export const getSiteSettings = cache(() => getCachedSiteSettings());
