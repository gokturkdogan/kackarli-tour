import { cache } from "react";
import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/prisma";
import { mapGuideToPublic, mapGuideToPublicListItem } from "@/lib/guide-mapper";
import type { PublicGuide, PublicGuideListItem } from "@/lib/guide-types";

const guideInclude = {
  sections: { orderBy: { sortOrder: "asc" as const } },
};

const loadPublishedGuides = unstable_cache(
  async () => {
    const guides = await prisma.guidePost.findMany({
      where: { status: "PUBLISHED" },
      orderBy: [{ sortOrder: "asc" }, { publishedAt: "desc" }],
    });

    return guides.map(mapGuideToPublicListItem);
  },
  ["published-guides"],
  { revalidate: 3600 }
);

export const getPublishedGuides = cache(() => loadPublishedGuides());

const loadPublishedGuideSlugs = unstable_cache(
  async () => {
    const guides = await prisma.guidePost.findMany({
      where: { status: "PUBLISHED" },
      select: { slug: true },
      orderBy: [{ sortOrder: "asc" }, { publishedAt: "desc" }],
    });

    return guides.map((g) => g.slug);
  },
  ["published-guide-slugs"],
  { revalidate: 3600 }
);

export const getPublishedGuideSlugs = cache(() => loadPublishedGuideSlugs());

export const getGuideBySlug = cache(async (slug: string): Promise<PublicGuide | null> => {
  return unstable_cache(
    async () => {
      const guide = await prisma.guidePost.findFirst({
        where: { slug, status: "PUBLISHED" },
        include: guideInclude,
      });

      return guide ? mapGuideToPublic(guide) : null;
    },
    ["published-guide", slug],
    { revalidate: 3600 }
  )();
});

export const getRelatedGuides = cache(
  async (currentSlug: string, limit = 3): Promise<PublicGuideListItem[]> => {
    const guides = await getPublishedGuides();
    return guides.filter((guide) => guide.slug !== currentSlug).slice(0, limit);
  }
);
