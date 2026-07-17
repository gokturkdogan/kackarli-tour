"use client";

import { useSyncExternalStore, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Phone, Star } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AnimateIn } from "@/components/public/animate-in";
import { PageContainer } from "@/components/public/page-container";
import { PublicHeader } from "@/components/public/public-header";
import { HeroLazyVideo } from "@/components/public/hero-lazy-video";
import { useHeroVideoTransition } from "@/hooks/use-hero-video-transition";
import {
  getHeroVideoSources,
  HERO_POSTER_SRC,
  shouldLoadHeroVideo,
} from "@/lib/hero-video";

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

let cachedWebgl: boolean | null = null;
function webglSupported() {
  if (cachedWebgl !== null) return cachedWebgl;
  try {
    const canvas = document.createElement("canvas");
    cachedWebgl = !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch {
    cachedWebgl = false;
  }
  return cachedWebgl;
}

/** Client-only capability detection, hydration-safe via useSyncExternalStore. */
function subscribeMotion(callback: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}
function getAnimatedSnapshot() {
  return !prefersReducedMotion() && webglSupported() && shouldLoadHeroVideo();
}
function getAnimatedServerSnapshot() {
  return false;
}

const heroGlassPrimary =
  "group inline-flex h-10 sm:h-11 flex-1 sm:flex-none min-w-0 items-center justify-center gap-1.5 rounded-full px-4 sm:px-6 text-[13px] sm:text-sm font-medium tracking-wide text-cream/95 border border-white/22 bg-sage-300/12 backdrop-blur-md shadow-[inset_0_1px_0_0_rgba(255,255,255,0.28)] transition-[background-color,border-color,box-shadow,transform] duration-200 hover:bg-sage-300/20 hover:border-white/32 active:scale-[0.99]";

const heroGlassSecondary =
  "group inline-flex h-10 sm:h-11 flex-1 sm:flex-none min-w-0 items-center justify-center gap-1.5 rounded-full px-4 sm:px-6 text-[13px] sm:text-sm font-medium tracking-wide text-cream/88 border border-white/16 bg-white/[0.07] backdrop-blur-md shadow-[inset_0_1px_0_0_rgba(255,255,255,0.22)] transition-[background-color,border-color,box-shadow,transform] duration-200 hover:bg-white/11 hover:border-white/26 active:scale-[0.99]";

/** Existing hero copy — preserved verbatim from the original hero. */
function HeroCopy() {
  return (
    <div className="max-w-3xl lg:max-w-4xl min-w-0">
      <AnimateIn delay={100}>
        <div className="inline-flex flex-wrap items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-cream/10 border border-cream/20 backdrop-blur-sm mb-6 lg:mb-8 max-w-full">
          <Star className="h-3.5 w-3.5 text-sage-300 fill-sage-300 shrink-0" />
          <span className="text-cream/90 text-[10px] sm:text-xs font-medium tracking-wide uppercase">
            Yayla Turu Rize
          </span>
        </div>
      </AnimateIn>

      <AnimateIn delay={200}>
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-cream leading-[1.1] mb-6 lg:mb-8 break-words">
          Sisli Yaylaların
          <span className="block text-sage-300 mt-1 lg:mt-2">Büyülü Dünyası</span>
        </h1>
      </AnimateIn>

      <AnimateIn delay={350}>
        <p className="text-lg md:text-xl lg:text-2xl text-cream/75 mb-8 lg:mb-10 max-w-xl lg:max-w-2xl leading-relaxed">
          Fırtına Vadisi&apos;nden Ayder&apos;e, Pokut ve Sal yaylalarına Rize&apos;nin en
          güzel güzergâhını tek günde, profesyonel rehberlikle keşfedin.
        </p>
      </AnimateIn>

      <AnimateIn delay={500}>
        <div className="flex w-full gap-2 sm:w-auto sm:gap-3">
          <Link href="/turlar" className={cn(heroGlassPrimary)}>
            <span className="truncate">Turu İncele</span>
            <ArrowRight className="h-3 w-3 sm:h-3.5 sm:w-3.5 shrink-0 opacity-80 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link href="/iletisim" className={cn(heroGlassSecondary)}>
            <Phone className="h-3 w-3 sm:h-3.5 sm:w-3.5 shrink-0 opacity-80" />
            <span className="truncate">Bize Ulaşın</span>
          </Link>
        </div>
      </AnimateIn>
    </div>
  );
}

/** Right-column editorial copy. Children are direct siblings for scroll stagger. */
function EditorialCopy() {
  return (
    <>
      <span className="inline-flex items-center gap-2 text-sage-600 text-xs sm:text-sm font-medium tracking-[0.2em] uppercase">
        <span className="h-px w-8 bg-sage-500/50" />
        Rize&apos;yi Yakından Keşfedin
      </span>
      <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-forest-900 leading-[1.15]">
        Doğanın ritmine uyum sağlayan unutulmaz bir Karadeniz yolculuğu.
      </h2>
      <p className="text-base sm:text-lg text-forest-700 leading-relaxed max-w-xl">
        Sisli dağlardan yemyeşil yaylalara, Fırtına Vadisi&apos;nden saklı rotalara kadar
        Rize&apos;nin en özel noktalarını yerel deneyimlerle keşfedin.
      </p>
      <p className="text-sm sm:text-base text-forest-600 leading-relaxed max-w-xl">
        Her tur, doğayı yakından hissetmeniz ve bölgenin gerçek atmosferini yaşamanız için
        özenle hazırlanır.
      </p>
      <div className="pt-2">
        <Link
          href="/turlar"
          className={cn(
            buttonVariants({ size: "lg" }),
            "justify-center bg-sage-500 hover:bg-sage-400 text-forest-900 shadow-lg shadow-sage-500/20 hover:shadow-sage-400/30 transition-all hover:-translate-y-0.5"
          )}
        >
          Rotaları Keşfet
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </div>
    </>
  );
}

function ScrollHint() {
  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce-slow pointer-events-none z-20">
      <span className="text-cream/50 text-xs tracking-widest uppercase">Keşfet</span>
      <div className="w-px h-8 bg-gradient-to-b from-cream/50 to-transparent" />
    </div>
  );
}

/** Static / reduced-motion / no-WebGL variant: hero + normal-flow editorial section. */
function StaticHero() {
  return (
    <>
      <section className="relative min-h-hero-vh bg-background">
        <div className="relative flex min-h-hero-vh items-start lg:items-center">
          <div className="absolute top-3 sm:top-4 left-3 sm:left-4 right-3 sm:right-4 z-20">
            <PublicHeader variant="transparent" position="hero" />
          </div>

          <div className="absolute inset-0 overflow-hidden">
            <Image
              src={HERO_POSTER_SRC}
              alt="Rize yayla manzarası"
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
            <HeroLazyVideo className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-forest-900/38 via-forest-900/15 to-forest-900/55 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-r from-forest-900/45 via-forest-900/12 to-transparent pointer-events-none" />
          </div>

          <PageContainer className="relative pt-28 pb-20 sm:pt-32 lg:py-24">
            <HeroCopy />
          </PageContainer>

          <ScrollHint />
        </div>
      </section>

      <section className="relative bg-background py-16 sm:py-20 lg:py-28 overflow-hidden">
        <PageContainer>
          <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-8 lg:gap-14 items-center">
            <div className="relative w-full h-[40vh] lg:h-[62vh] rounded-[20px] lg:rounded-[28px] overflow-hidden bg-forest-800">
              <Image
                src={HERO_POSTER_SRC}
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <HeroLazyVideo className="absolute inset-0 h-full w-full object-cover" />
            </div>
            <div className="flex flex-col gap-5 lg:gap-6">
              <EditorialCopy />
            </div>
          </div>
        </PageContainer>
      </section>
    </>
  );
}

/** Animated variant: pinned WebGL video transition (hero → left editorial card). */
function AnimatedHero() {
  const sources = useMemo(() => getHeroVideoSources(), []);
  const {
    sectionRef,
    canvasRef,
    posterRef,
    headerRef,
    heroContentRef,
    targetRef,
    editorialRef,
    rightItemsRef,
  } = useHeroVideoTransition({
    sources,
    enabled: true,
  });

  return (
    <section
      ref={sectionRef}
      className="relative h-hero-vh w-full max-w-full bg-background"
    >
      <div className="relative h-full w-full">
        {/* Layer 0: editorial copy scrolls up behind the video */}
        <div
          className="absolute inset-0 flex items-center pointer-events-none"
          style={{ zIndex: 0 }}
        >
          <PageContainer className="w-full">
            <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-8 lg:gap-14 items-center">
              <div
                ref={targetRef}
                aria-hidden
                className="w-full h-[40vh] lg:h-[62vh] rounded-[20px] lg:rounded-[28px]"
              />
              <div ref={editorialRef} className="pointer-events-auto">
                <div
                  ref={rightItemsRef}
                  className="flex flex-col gap-5 lg:gap-6"
                >
                  <EditorialCopy />
                </div>
              </div>
            </div>
          </PageContainer>
        </div>

        {/* Layer 0.5: poster — visible until video plays */}
        <div
          ref={posterRef}
          className="absolute inset-0 pointer-events-none"
          style={{ zIndex: 0 }}
        >
          <Image
            src={HERO_POSTER_SRC}
            alt="Rize yayla manzarası"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-forest-900/38 via-forest-900/15 to-forest-900/55" />
          <div className="absolute inset-0 bg-gradient-to-r from-forest-900/45 via-forest-900/12 to-transparent" />
        </div>

        {/* Layer 1: WebGL canvas — video sits above rising editorial text */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full pointer-events-none"
          style={{ zIndex: 1 }}
        />

        {/* Layer 2: hero content over the video */}
        <div
          ref={heroContentRef}
          className="absolute inset-0"
          style={{ zIndex: 2 }}
        >
          <div ref={headerRef} className="absolute top-0 left-0 right-0 z-20">
            <PublicHeader variant="transparent" position="hero" />
          </div>
          <div className="absolute inset-0 flex items-start pt-28 sm:pt-32 lg:items-center lg:pt-0">
            <PageContainer className="relative pb-20 lg:py-24">
              <HeroCopy />
            </PageContainer>
            <ScrollHint />
          </div>
        </div>
      </div>
    </section>
  );
}

export function HeroBanner() {
  const animated = useSyncExternalStore(
    subscribeMotion,
    getAnimatedSnapshot,
    getAnimatedServerSnapshot
  );

  return animated ? <AnimatedHero /> : <StaticHero />;
}
