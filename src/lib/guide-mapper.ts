import type { GuidePost, GuideSection } from "@/generated/prisma/client";
import type { PublicGuide, PublicGuideListItem, PublicGuideSection } from "@/lib/guide-types";
import { getGuideCoverImage } from "@/lib/guide-images";

type GuideWithSections = GuidePost & { sections: GuideSection[] };

function mapSection(section: GuideSection): PublicGuideSection {
  return {
    id: section.id,
    heading: section.heading,
    content: section.content,
    sortOrder: section.sortOrder,
  };
}

function mapGuideBase(guide: GuidePost): PublicGuideListItem {
  return {
    id: guide.id,
    title: guide.title,
    slug: guide.slug,
    excerpt: guide.excerpt,
    coverImage: getGuideCoverImage(guide.slug, 1200),
    focusKeyword: guide.focusKeyword,
    readingMinutes: guide.readingMinutes,
    publishedAt: guide.publishedAt?.toISOString() ?? null,
  };
}

export function mapGuideToPublicListItem(guide: GuidePost): PublicGuideListItem {
  return mapGuideBase(guide);
}

export function mapGuideToPublic(guide: GuideWithSections): PublicGuide {
  return {
    ...mapGuideBase(guide),
    seoTitle: guide.seoTitle,
    seoDescription: guide.seoDescription,
    sections: guide.sections
      .slice()
      .sort((a, b) => a.sortOrder - b.sortOrder)
      .map(mapSection),
  };
}
