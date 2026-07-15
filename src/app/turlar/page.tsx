import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowRight, BedDouble, Clock, Sun } from "lucide-react";
import { getActivePublicTours } from "@/actions/public";
import { PublicHeader } from "@/components/public/public-header";
import { PublicFooter } from "@/components/public/public-footer";
import { PageHero } from "@/components/public/page-hero";
import { PageContainer } from "@/components/public/page-container";
import { AnimateIn } from "@/components/public/animate-in";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { tourTypeLabel } from "@/lib/utils-helpers";

export const metadata: Metadata = {
  title: "Turlar",
  description: "Kaçkarlı Tur günübirlik ve konaklamalı yayla turları.",
};

export const dynamic = "force-dynamic";

export default async function ToursPage() {
  const tours = await getActivePublicTours();

  if (tours.length === 0) {
    return (
      <>
        <PublicHeader variant="solid" />
        <main className="bg-cream min-h-screen">
          <PageContainer className="py-24 text-center">
            <h1 className="text-2xl font-bold text-forest-900 mb-2">Henüz tur yok</h1>
            <p className="text-muted-foreground">Yakında yeni turlar eklenecek.</p>
          </PageContainer>
        </main>
        <PublicFooter />
      </>
    );
  }

  if (tours.length === 1) {
    redirect(tours[0].href);
  }

  return (
    <>
      <PublicHeader variant="solid" />
      <main className="bg-cream min-h-screen overflow-x-hidden w-full max-w-full">
        <PageHero
          title="Turlarımız"
          subtitle="Kaçkarlı Tur"
          description="Günübirlik ve konaklamalı yayla turlarımıza göz atın."
        />
        <section className="py-12 sm:py-16">
          <PageContainer>
            <div className="grid md:grid-cols-2 gap-6">
              {tours.map((tour, i) => {
                const isDayTrip = tour.type === "DAY_TRIP";
                return (
                  <AnimateIn key={tour.id} delay={i * 80}>
                    <Link
                      href={tour.href}
                      className="group block rounded-2xl overflow-hidden bg-white border border-forest-100 hover:border-forest-300 hover:shadow-xl transition-all"
                    >
                      <div className="relative h-52 overflow-hidden">
                        {tour.image ? (
                          <Image
                            src={tour.image}
                            alt={tour.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                            sizes="(max-width: 768px) 100vw, 50vw"
                          />
                        ) : (
                          <div className="absolute inset-0 bg-forest-100" />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-forest-900/70 to-transparent" />
                        <div className="absolute top-3 left-3">
                          <Badge
                            className={cn(
                              isDayTrip ? "bg-sage-500 text-forest-900" : "bg-earth-400 text-white"
                            )}
                          >
                            {isDayTrip ? (
                              <Sun className="h-3 w-3 mr-1" />
                            ) : (
                              <BedDouble className="h-3 w-3 mr-1" />
                            )}
                            {tourTypeLabel(tour.type)}
                          </Badge>
                        </div>
                        <div className="absolute bottom-3 left-3 right-3">
                          <h2 className="text-xl font-bold text-cream">{tour.title}</h2>
                          {tour.subtitle && (
                            <p className="text-cream/70 text-sm mt-1">{tour.subtitle}</p>
                          )}
                        </div>
                      </div>
                      <div className="p-5">
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                          {tour.shortDescription ?? tour.description}
                        </p>
                        <div className="flex items-center justify-between text-xs text-forest-600">
                          {tour.duration && (
                            <span className="flex items-center gap-1">
                              <Clock className="h-3.5 w-3.5" />
                              {tour.duration}
                            </span>
                          )}
                          <span className="inline-flex items-center text-forest-600 font-medium group-hover:text-forest-800">
                            İncele
                            <ArrowRight className="ml-1 h-3.5 w-3.5" />
                          </span>
                        </div>
                      </div>
                    </Link>
                  </AnimateIn>
                );
              })}
            </div>
          </PageContainer>
        </section>
      </main>
      <PublicFooter />
    </>
  );
}
