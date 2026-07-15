import type { Metadata } from "next";
import { stockImage } from "@/lib/stock-images";
import { PublicHeader } from "@/components/public/public-header";
import { PublicFooter } from "@/components/public/public-footer";
import { PageHero } from "@/components/public/page-hero";
import { ReservationForm } from "@/components/public/reservation-form";
import { getToursForReservation } from "@/actions/public";

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
  const tours = await getToursForReservation();

  const heroImage =
    tours.find((t) => t.slug === tur)?.image ??
    tours[0]?.image ??
    stockImage("heroMountain", 1920);

  return (
    <>
      <PublicHeader variant="solid" />
      <main className="bg-cream min-h-screen overflow-x-hidden w-full max-w-full">
        <PageHero
          title="Rezervasyon"
          subtitle="Kaçkarlı Tur"
          description="Tur tarihini seçin, kişi sayısını belirleyin ve talebinizi birkaç adımda iletin."
          image={heroImage}
        />
        <ReservationForm
          tours={tours}
          initialTourSlug={tur}
          initialScheduleId={tarih}
        />
      </main>
      <PublicFooter />
    </>
  );
}
