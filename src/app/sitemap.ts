import type { MetadataRoute } from "next";
import { getPublishedGuideSlugs } from "@/actions/guides";
import { getActivePublicTours } from "@/actions/public";
import { SITE_URL } from "@/lib/seo";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const tours = await getActivePublicTours();

  let guideSlugs: string[] = [];
  try {
    guideSlugs = await getPublishedGuideSlugs();
  } catch {
    // GuidePost table may not exist until migration is applied
  }

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/turlar`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/rehberlerimiz`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/hakkimizda`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/iletisim`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/rezervasyon`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
  ];

  const tourRoutes: MetadataRoute.Sitemap = tours.map((tour) => ({
    url: `${SITE_URL}/turlar/${tour.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  const guideRoutes: MetadataRoute.Sitemap = guideSlugs.map((slug) => ({
    url: `${SITE_URL}/rehberlerimiz/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...tourRoutes, ...guideRoutes];
}
