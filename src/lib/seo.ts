import type { Metadata } from "next";

const DEFAULT_SITE_NAME = "Kaçkarlı Tur";
const DEFAULT_DESCRIPTION =
  "Rize ve Kaçkar Dağları'nda günübirlik yayla turu. Fırtına Vadisi, Ayder, Pokut ve Sal rotası.";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://kackarlitur.com";

export function absoluteUrl(path = "/"): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalized}`;
}

interface BuildPageMetadataOptions {
  title: string;
  description?: string;
  path?: string;
  image?: string | null;
  type?: "website" | "article";
  noIndex?: boolean;
}

export function buildPageMetadata({
  title,
  description = DEFAULT_DESCRIPTION,
  path = "/",
  image,
  type = "website",
  noIndex = false,
}: BuildPageMetadataOptions): Metadata {
  const url = absoluteUrl(path);
  const ogImage = image ? (image.startsWith("http") ? image : absoluteUrl(image)) : absoluteUrl("/images/rize-hero-poster.jpg");

  return {
    title,
    description,
    alternates: { canonical: url },
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      type,
      locale: "tr_TR",
      url,
      siteName: DEFAULT_SITE_NAME,
      title: `${title} | ${DEFAULT_SITE_NAME}`,
      description,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${DEFAULT_SITE_NAME}`,
      description,
      images: [ogImage],
    },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: DEFAULT_SITE_NAME,
    url: SITE_URL,
    description: DEFAULT_DESCRIPTION,
    areaServed: { "@type": "Place", name: "Rize, Türkiye" },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Rize",
      addressCountry: "TR",
    },
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function articleJsonLd(params: {
  title: string;
  description: string;
  path: string;
  image?: string | null;
  publishedAt?: string | null;
  modifiedAt?: string | null;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: params.title,
    description: params.description,
    image: params.image ? [params.image] : [absoluteUrl("/images/rize-hero-poster.jpg")],
    datePublished: params.publishedAt ?? undefined,
    dateModified: params.modifiedAt ?? params.publishedAt ?? undefined,
    author: { "@type": "Organization", name: DEFAULT_SITE_NAME },
    publisher: {
      "@type": "Organization",
      name: DEFAULT_SITE_NAME,
      logo: { "@type": "ImageObject", url: absoluteUrl("/images/kackarli-tour-logo.png") },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": absoluteUrl(params.path) },
  };
}

export function touristTripJsonLd(params: {
  name: string;
  description: string;
  path: string;
  image?: string | null;
  price?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: params.name,
    description: params.description,
    url: absoluteUrl(params.path),
    image: params.image ?? absoluteUrl("/images/rize-hero-poster.jpg"),
    touristType: "Doğa ve yayla turu",
    provider: { "@type": "TravelAgency", name: DEFAULT_SITE_NAME, url: SITE_URL },
    offers: params.price
      ? {
          "@type": "Offer",
          price: params.price,
          priceCurrency: "TRY",
          availability: "https://schema.org/InStock",
        }
      : undefined,
  };
}
