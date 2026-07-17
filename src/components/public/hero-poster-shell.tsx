import Image from "next/image";
import { HERO_POSTER_SRC } from "@/lib/hero-video";

/** Lightweight hero shell shown while the heavy HeroBanner chunk loads. */
export function HeroPosterShell() {
  return (
    <section className="relative h-hero-vh w-full bg-background overflow-hidden">
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
    </section>
  );
}
