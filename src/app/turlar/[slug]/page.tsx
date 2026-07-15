import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPublicTourBySlug } from "@/actions/public";
import { PublicHeader } from "@/components/public/public-header";
import { PublicFooter } from "@/components/public/public-footer";
import { PageHero } from "@/components/public/page-hero";
import { TourDetailView } from "@/components/public/tour-detail-view";
import { tourTypeLabel } from "@/lib/utils-helpers";

export const dynamic = "force-dynamic";

interface TourDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: TourDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tour = await getPublicTourBySlug(slug);
  if (!tour) return { title: "Tur Bulunamadı" };

  return {
    title: tour.title,
    description: tour.shortDescription ?? tour.description,
  };
}

export default async function TourDetailPage({ params }: TourDetailPageProps) {
  const { slug } = await params;
  const tour = await getPublicTourBySlug(slug);

  if (!tour) notFound();

  return (
    <>
      <PublicHeader variant="solid" />
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
