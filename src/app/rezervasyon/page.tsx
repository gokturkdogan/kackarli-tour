import type { Metadata } from "next";
import { stockImage } from "@/lib/stock-images";
import { tourTypeLabel } from "@/lib/utils-helpers";
import { PublicHeader } from "@/components/public/public-header";
import { PublicFooter } from "@/components/public/public-footer";
import { PageHero } from "@/components/public/page-hero";
import { ReservationForm } from "@/components/public/reservation-form";
import { ReservationTourUnavailable } from "@/components/public/reservation-tour-unavailable";
import { ReservationGenericUnavailable } from "@/components/public/reservation-generic-unavailable";
import { getPublicTourBySlug, getToursForReservation } from "@/actions/public";

export const metadata: Metadata = {
  title: "Rezervasyon",
  description: "Kaçkarlı Tur yayla turları için online rezervasyon talebi oluşturun.",
};

export const dynamic = "force-dynamic";

interface ReservationPageProps {
  searchParams: Promise<{ tur?: string; tarih?: string }>;
}

export default async function ReservationPage({ searchParams }: ReservationPageProps) {
  const { tur, tarih } = await searchParams;
  const [tours, tourDetail] = await Promise.all([
    getToursForReservation(),
    tur ? getPublicTourBySlug(tur) : Promise.resolve(null),
  ]);

  const bookableTours = tours.filter((t) => t.schedules.length > 0);
  const reservationTour = tur ? tours.find((t) => t.slug === tur) : undefined;
  const urlTourHasNoDates = Boolean(
    tur && (!reservationTour || reservationTour.schedules.length === 0)
  );
  const canBook = !urlTourHasNoDates && bookableTours.length > 0;

  const heroTour = tourDetail ?? reservationTour ?? bookableTours[0];

  const heroImage = heroTour?.image ?? stockImage("heroMountain", 1920);
  const heroTitle = heroTour?.title ?? "Rezervasyon";
  const heroSubtitle = heroTour ? "Rezervasyon" : "Kaçkarlı Tur";
  const heroDescription =
    urlTourHasNoDates && tourDetail
      ? [
          tourDetail.subtitle,
          tourTypeLabel(tourDetail.type),
          tourDetail.duration,
        ]
          .filter(Boolean)
          .join(" · ") + " — Tur programını inceleyin."
      : heroTour
        ? [
            "subtitle" in heroTour ? heroTour.subtitle : undefined,
            tourTypeLabel(heroTour.type),
            heroTour.duration,
          ]
            .filter(Boolean)
            .join(" · ") +
          " — Tarih seçin, kişi sayısını belirleyin ve talebinizi iletin."
        : "Tur tarihini seçin, kişi sayısını belirleyin ve talebinizi birkaç adımda iletin.";

  return (
    <>
      <PublicHeader variant="solid" />
      <main className="bg-cream min-h-screen overflow-x-hidden w-full max-w-full">
        <PageHero
          title={heroTitle}
          subtitle={heroSubtitle}
          description={heroDescription}
          image={heroImage}
        />
        {canBook ? (
          <ReservationForm
            tours={tours}
            initialTourSlug={tur}
            initialScheduleId={tarih}
          />
        ) : urlTourHasNoDates && tourDetail ? (
          <ReservationTourUnavailable tour={tourDetail} />
        ) : (
          <ReservationGenericUnavailable tourTitle={tourDetail?.title ?? reservationTour?.title} />
        )}
      </main>
      <PublicFooter />
    </>
  );
}
