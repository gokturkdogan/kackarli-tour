import { notFound } from "next/navigation";
import { getActiveTourSlugs, getPublicTourBySlug } from "@/actions/public";
import { PublicHeaderShell } from "@/components/public/public-header-shell";
import { PublicFooter } from "@/components/public/public-footer";
import { PageHero } from "@/components/public/page-hero";
import { TourDetailView } from "@/components/public/tour-detail-view";
import { JsonLd } from "@/components/public/json-ld";
import { tourTypeLabel } from "@/lib/utils-helpers";
import { buildPageMetadata, breadcrumbJsonLd, touristTripJsonLd } from "@/lib/seo";

export const revalidate = 300;

export async function generateStaticParams() {
  const slugs = await getActiveTourSlugs();
  return slugs.map((slug) => ({ slug }));
}

interface TourDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: TourDetailPageProps) {
  const { slug } = await params;
  const tour = await getPublicTourBySlug(slug);
  if (!tour) return { title: "Tur Bulunamadı" };

  return buildPageMetadata({
    title: tour.title,
    description: tour.shortDescription ?? tour.description,
    path: `/turlar/${slug}`,
    image: tour.image,
  });
}

export default async function TourDetailPage({ params }: TourDetailPageProps) {
  const { slug } = await params;
  const tour = await getPublicTourBySlug(slug);

  if (!tour) notFound();

  const breadcrumb = breadcrumbJsonLd([
    { name: "Ana Sayfa", path: "/" },
    { name: "Turlar", path: "/turlar" },
    { name: tour.title, path: `/turlar/${slug}` },
  ]);

  const trip = touristTripJsonLd({
    name: tour.title,
    description: tour.shortDescription ?? tour.description,
    path: `/turlar/${slug}`,
    image: tour.image,
    price: String(tour.price),
  });

  return (
    <>
      <JsonLd data={[breadcrumb, trip]} />
      <PublicHeaderShell variant="solid" />
      <main className="bg-cream min-h-screen overflow-x-hidden w-full max-w-full">
        <PageHero
          title={tour.title}
          subtitle={tourTypeLabel(tour.type)}
          description={tour.shortDescription ?? tour.description}
          image={tour.image}
        />
        <TourDetailView tour={tour} />
      </main>
      <PublicFooter />
    </>
  );
}
