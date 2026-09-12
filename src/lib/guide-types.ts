export interface PublicGuideSection {
  id: string;
  heading: string;
  content: string;
  sortOrder: number;
}

export interface PublicGuideListItem {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  coverImage: string | null;
  focusKeyword: string | null;
  readingMinutes: number | null;
  publishedAt: string | null;
}

export interface PublicGuide extends PublicGuideListItem {
  seoTitle: string | null;
  seoDescription: string | null;
  sections: PublicGuideSection[];
}
