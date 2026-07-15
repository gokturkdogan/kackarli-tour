import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CalendarCheck,
  CheckCircle2,
  Clock,
  MessageCircle,
  Mountain,
  Phone,
  Route,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import { PageContainer } from "@/components/public/page-container";
import { AnimateIn } from "@/components/public/animate-in";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/utils-helpers";
import { hasDistinctChildPrice, resolveChildPrice } from "@/lib/pricing";
import { TOUR_BOOKING_CTA_ID } from "@/lib/tour-anchors";
import { getSiteSettings, getWhatsAppUrl } from "@/lib/site-settings";
import type { PublicTour } from "@/lib/tour-types";

interface TourDetailCtaSectionProps {
  tour: PublicTour;
}

const trustPoints = [
  {
    icon: ShieldCheck,
    title: "Güvenli Rezervasyon",
    text: "Onaylı tur organizasyonu",
  },
  {
    icon: Users,
    title: "Küçük Gruplar",
    text: "Samimi ve konforlu yolculuk",
  },
  {
    icon: Mountain,
    title: "Yerel Rehberlik",
    text: "Bölgeyi bilen deneyimli ekip",
  },
];

export async function TourDetailCtaSection({ tour }: TourDetailCtaSectionProps) {
  const settings = await getSiteSettings();
  const whatsappUrl = getWhatsAppUrl(
    settings.whatsappNumber,
    `Merhaba, "${tour.title}" turu hakkında bilgi almak ve rezervasyon yapmak istiyorum.`
  );

  const marqueeItems =
    tour.highlights.length > 0
      ? tour.highlights
      : ["Yayla Manzaraları", "Fotoğraf Molaları", "Yerel Lezzetler", "Doğa Yürüyüşü"];

  const loopedMarquee = [...marqueeItems, ...marqueeItems];

  return (
    <section className="relative bg-mist overflow-hidden w-full">
      {/* Curved transition from dark itinerary above */}
      <div
        className="absolute top-0 left-0 right-0 -translate-y-[calc(100%-1px)] pointer-events-none text-mist"
        aria-hidden
      >
        <svg
          viewBox="0 0 1440 72"
          preserveAspectRatio="none"
          className="block w-full h-10 sm:h-14 lg:h-[4.5rem]"
        >
          <path
            fill="currentColor"
            d="M0,48 C240,72 480,24 720,48 C960,72 1200,24 1440,48 L1440,72 L0,72 Z"
          />
        </svg>
      </div>

      {/* Ambient blobs */}
      <div className="absolute top-16 right-0 w-72 h-72 bg-sage-200/40 rounded-full blur-3xl animate-mist-1 pointer-events-none" />
      <div className="absolute bottom-20 left-0 w-80 h-80 bg-forest-100/50 rounded-full blur-3xl animate-mist-2 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cream/60 rounded-full blur-3xl animate-mist-3 pointer-events-none" />

      <PageContainer className="relative py-20 sm:py-24 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          {/* Left — story & trust */}
          <div className="space-y-8">
            <AnimateIn>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-forest-100 text-forest-600 text-xs font-medium uppercase tracking-wider shadow-sm">
                <Sparkles className="h-3.5 w-3.5 text-sage-500" />
                Yerinizi Ayırtın
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-forest-900 mt-5 mb-4 leading-tight">
                Bu Rotaya Katılmaya
                <span className="block text-forest-600">Hazır mısınız?</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed max-w-lg">
                <strong className="text-forest-800 font-semibold">{tour.title}</strong> için
                kontenjan sınırlıdır. Rezervasyon yapın veya WhatsApp üzerinden anında bilgi
                alın — ekibimiz size yardımcı olmaktan mutlu olur.
              </p>
            </AnimateIn>

            <div className="grid sm:grid-cols-3 gap-3">
              {trustPoints.map((item, i) => (
                <AnimateIn key={item.title} delay={100 + i * 80}>
                  <div className="group rounded-2xl bg-white/80 backdrop-blur-sm border border-forest-100 p-4 hover:border-sage-300 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
                    <div className="w-10 h-10 rounded-xl bg-forest-50 flex items-center justify-center mb-3 group-hover:bg-sage-100 transition-colors">
                      <item.icon className="h-5 w-5 text-forest-600" />
                    </div>
                    <p className="text-sm font-semibold text-forest-900">{item.title}</p>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                      {item.text}
                    </p>
                  </div>
                </AnimateIn>
              ))}
            </div>

            {tour.image && (
              <AnimateIn delay={280} direction="left" className="hidden lg:block">
                <div className="relative h-44 rounded-2xl overflow-hidden border border-forest-100 shadow-lg">
                  <Image
                    src={tour.image}
                    alt={tour.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 0vw, 40vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-forest-900/50 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-cream text-sm font-medium">
                      {tour.stops.length > 0
                        ? `${tour.stops.length} duraklı özenle planlanmış rota`
                        : "Özenle planlanmış rota"}
                    </p>
                  </div>
                </div>
              </AnimateIn>
            )}
          </div>

          {/* Right — booking card */}
          <AnimateIn delay={150} direction="right">
            <div
              id={TOUR_BOOKING_CTA_ID}
              className="relative max-w-md lg:max-w-none lg:ml-auto scroll-mt-28"
            >
              <div className="absolute -inset-2 bg-gradient-to-br from-sage-400/30 via-forest-300/20 to-earth-300/30 rounded-[2rem] blur-md animate-float pointer-events-none" />

              <div className="booking-card relative rounded-[1.75rem] bg-white border border-forest-100/80 shadow-2xl shadow-forest-900/10 overflow-hidden transition-all duration-700">
                {/* Price hero */}
                <div className="relative overflow-hidden">
                  <div className="absolute inset-0">
                    {tour.image && (
                      <Image
                        src={tour.image}
                        alt=""
                        fill
                        className="object-cover opacity-30"
                        sizes="(max-width: 1024px) 100vw, 420px"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-br from-forest-900 via-forest-800 to-forest-950" />
                    <div className="absolute top-0 right-0 w-40 h-40 bg-sage-400/20 rounded-full blur-3xl" />
                  </div>

                  <div className="relative px-6 sm:px-7 pt-6 pb-7">
                    <div className="flex items-center justify-between gap-3 mb-5">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sage-500/90 text-forest-900 text-[11px] font-bold uppercase tracking-wider">
                        <Sparkles className="h-3 w-3" />
                        Rezervasyon
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-cream/70 text-xs">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sage-400 opacity-60" />
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-sage-400" />
                        </span>
                        Müsait
                      </span>
                    </div>

                    <p className="text-sage-300/90 text-xs font-medium uppercase tracking-widest mb-1">
                      Kişi başı başlangıç
                    </p>
                    <div className="flex items-baseline gap-2 flex-wrap">
                      <span className="text-4xl sm:text-[2.75rem] font-bold text-cream tracking-tight leading-none">
                        {formatPrice(tour.price)}
                      </span>
                      <span className="text-sm text-cream/50">/ yetişkin</span>
                    </div>
                    {hasDistinctChildPrice(tour.childPrice, tour.price) && (
                      <p className="text-sm text-cream/60 mt-2">
                        Çocuk{" "}
                        <span className="text-cream font-semibold">
                          {formatPrice(resolveChildPrice(null, tour.childPrice, tour.price))}
                        </span>
                      </p>
                    )}
                    <p className="text-[11px] text-cream/45 mt-2.5 leading-snug">
                      Seçilen tur tarihine göre değişebilir.
                    </p>
                  </div>
                </div>

                <div className="px-6 sm:px-7 py-6 space-y-6">
                  {/* Stats */}
                  <div className="flex flex-wrap gap-2">
                    {[
                      { icon: Clock, label: "Süre", value: tour.duration ?? "—" },
                      { icon: Route, label: "Mesafe", value: tour.distance ?? "—" },
                      {
                        icon: Users,
                        label: "Grup",
                        value: tour.maxGroupSize ? `Max ${tour.maxGroupSize}` : "—",
                      },
                    ].map((stat) => (
                      <div
                        key={stat.label}
                        className="inline-flex items-center gap-2 rounded-xl bg-forest-50 border border-forest-100 px-3 py-2.5 min-w-0"
                      >
                        <div className="w-8 h-8 rounded-lg bg-white border border-forest-100 flex items-center justify-center shrink-0">
                          <stat.icon className="h-4 w-4 text-forest-600" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[10px] uppercase tracking-wider text-muted-foreground leading-none">
                            {stat.label}
                          </p>
                          <p className="text-sm font-bold text-forest-900 mt-0.5 truncate">
                            {stat.value}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {tour.included.length > 0 && (
                    <div className="rounded-xl bg-mist/80 border border-forest-100/80 p-4 space-y-2.5">
                      <p className="text-[10px] uppercase tracking-widest text-forest-500 font-semibold">
                        Dahil Olanlar
                      </p>
                      <ul className="space-y-2">
                        {tour.included.slice(0, 3).map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-2.5 text-sm text-forest-700"
                          >
                            <CheckCircle2 className="h-4 w-4 text-sage-500 shrink-0 mt-0.5" />
                            <span className="leading-snug">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="space-y-3 pt-1">
                    <Link
                      href={`/rezervasyon?tur=${tour.slug}`}
                      className={cn(
                        "group flex items-center justify-center gap-2.5 w-full",
                        "h-14 rounded-2xl px-5",
                        "bg-sage-500 hover:bg-sage-400 text-white",
                        "text-base font-bold shadow-lg shadow-sage-500/25",
                        "transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-sage-500/30"
                      )}
                    >
                      <CalendarCheck className="h-5 w-5" />
                      Rezervasyon Yap
                      <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
                    </Link>

                    <div className="grid grid-cols-2 gap-3">
                      <Link
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                          "flex items-center justify-center gap-2",
                          "h-12 rounded-xl px-3",
                          "bg-[#25D366] hover:bg-[#1fb855] text-white",
                          "text-sm font-semibold shadow-md shadow-[#25D366]/20",
                          "transition-all duration-300 hover:-translate-y-0.5"
                        )}
                      >
                        <MessageCircle className="h-4 w-4 shrink-0" />
                        <span className="truncate">WhatsApp</span>
                      </Link>

                      <Link
                        href="/iletisim"
                        className={cn(
                          "flex items-center justify-center gap-2",
                          "h-12 rounded-xl px-3",
                          "bg-white border-2 border-forest-200 text-forest-800",
                          "hover:border-forest-400 hover:bg-forest-50",
                          "text-sm font-semibold",
                          "transition-all duration-300 hover:-translate-y-0.5"
                        )}
                      >
                        <Phone className="h-4 w-4 shrink-0" />
                        <span className="truncate">İletişim</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AnimateIn>
        </div>

        {/* Highlights marquee */}
        <AnimateIn delay={350} className="mt-14 sm:mt-16">
          <div className="rounded-2xl border border-forest-100 bg-white/60 backdrop-blur-sm overflow-hidden">
            <div className="flex w-max animate-marquee whitespace-nowrap will-change-transform py-4">
              {loopedMarquee.map((item, i) => (
                <span
                  key={`${item}-${i}`}
                  className="inline-flex items-center mx-5 sm:mx-8 text-forest-600 text-sm font-medium shrink-0"
                >
                  <span className="w-2 h-2 rounded-full bg-sage-400 mr-3 shrink-0" />
                  {item}
                </span>
              ))}
            </div>
          </div>
        </AnimateIn>
      </PageContainer>
    </section>
  );
}
