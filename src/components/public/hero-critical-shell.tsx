import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Phone, Star } from "lucide-react";
import { PageContainer } from "@/components/public/page-container";
import { SiteLogo } from "@/components/public/site-logo";
import { HERO_COPY, HERO_SHELL_ID } from "@/lib/hero-copy";
import { HOME_HERO_HEADER_ID } from "@/lib/home-hero";
import { HERO_POSTER_SRC } from "@/lib/hero-video";
import { cn } from "@/lib/utils";

const shellNavLinks = [
  { href: "/turlar", label: "Tur Rotası" },
  { href: "/rehberlerimiz", label: "Rehberlerimiz" },
  { href: "/hakkimizda", label: "Hakkımızda" },
  { href: "/iletisim", label: "İletişim" },
] as const;

const heroGlassPrimary =
  "group inline-flex h-10 sm:h-11 flex-1 sm:flex-none min-w-0 items-center justify-center gap-1.5 rounded-full px-4 sm:px-6 text-[13px] sm:text-sm font-medium tracking-wide text-cream/95 border border-white/22 bg-sage-300/20 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.28)]";

const heroGlassSecondary =
  "group inline-flex h-10 sm:h-11 flex-1 sm:flex-none min-w-0 items-center justify-center gap-1.5 rounded-full px-4 sm:px-6 text-[13px] sm:text-sm font-medium tracking-wide text-cream/88 border border-white/16 bg-white/10 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.22)]";

/** SSR-visible hero shell — paints H1, nav and CTA before the heavy client chunk loads. */
export function HeroCriticalShell() {
  return (
    <section
      id={HERO_SHELL_ID}
      className="relative h-hero-vh w-full bg-background overflow-hidden"
      aria-label="Ana sayfa hero"
    >
      <Image
        src={HERO_POSTER_SRC}
        alt="Rize yayla manzarası"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-forest-900/38 via-forest-900/15 to-forest-900/55 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-forest-900/45 via-forest-900/12 to-transparent pointer-events-none" />

      <div className="relative z-10 flex h-full flex-col">
        <div
          id={HOME_HERO_HEADER_ID}
          className="absolute top-3 sm:top-4 left-3 sm:left-4 right-3 sm:right-4"
        >
          <header className="w-full max-w-full">
            <PageContainer className="h-16 flex items-center justify-between gap-2 min-w-0">
              <Link href="/" className="flex min-w-0 shrink items-center">
                <SiteLogo onDark />
              </Link>
              <nav className="hidden lg:flex items-center gap-1" aria-label="Ana menü">
                {shellNavLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="px-3 py-2 rounded-lg text-sm text-cream/80 hover:text-cream"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
              <Link
                href="/turlar"
                className={cn(
                  heroGlassPrimary,
                  "hidden sm:inline-flex flex-none bg-sage-500/90 border-sage-400/30"
                )}
              >
                Tura Katıl
              </Link>
            </PageContainer>
          </header>
        </div>

        <PageContainer className="flex flex-1 items-start lg:items-center pt-28 pb-20 sm:pt-32 lg:py-24">
          <div className="max-w-3xl lg:max-w-4xl min-w-0">
            <div className="inline-flex flex-wrap items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-cream/10 border border-cream/20 mb-6 lg:mb-8 max-w-full">
              <Star className="h-3.5 w-3.5 text-sage-300 fill-sage-300 shrink-0" />
              <span className="text-cream/90 text-[10px] sm:text-xs font-medium tracking-wide uppercase">
                {HERO_COPY.badge}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-cream leading-[1.1] mb-6 lg:mb-8 break-words">
              {HERO_COPY.title}
              <span className="block text-sage-300 mt-1 lg:mt-2">{HERO_COPY.titleAccent}</span>
            </h1>

            <p className="text-lg md:text-xl lg:text-2xl text-cream/75 mb-8 lg:mb-10 max-w-xl lg:max-w-2xl leading-relaxed">
              {HERO_COPY.description}
            </p>

            <div className="flex w-full gap-2 sm:w-auto sm:gap-3">
              <Link href="/turlar" className={heroGlassPrimary}>
                <span className="truncate">{HERO_COPY.ctaPrimary}</span>
                <ArrowRight className="h-3 w-3 sm:h-3.5 sm:w-3.5 shrink-0 opacity-80" />
              </Link>
              <Link href="/iletisim" className={heroGlassSecondary}>
                <Phone className="h-3 w-3 sm:h-3.5 sm:w-3.5 shrink-0 opacity-80" />
                <span className="truncate">{HERO_COPY.ctaSecondary}</span>
              </Link>
            </div>
          </div>
        </PageContainer>
      </div>
    </section>
  );
}
