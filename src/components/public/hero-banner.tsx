import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin, Phone, Star } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AnimateIn } from "@/components/public/animate-in";

export function HeroBanner() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=85"
          alt="Rize Kaçkar Dağları yayla manzarası"
          fill
          priority
          className="object-cover scale-105 animate-hero-zoom"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-forest-900/70 via-forest-900/50 to-forest-900/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-forest-900/60 to-transparent" />
      </div>

      {/* Animated mist layers */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-20 left-0 w-full h-64 bg-gradient-to-b from-white/10 to-transparent animate-mist-1" />
        <div className="absolute top-1/3 -left-20 w-2/3 h-48 bg-white/5 rounded-full blur-3xl animate-mist-2" />
        <div className="absolute bottom-1/4 right-0 w-1/2 h-40 bg-sage-300/10 rounded-full blur-3xl animate-mist-3" />
      </div>

      <div className="relative container mx-auto px-4 pt-24 pb-32">
        <div className="max-w-3xl">
          <AnimateIn delay={100}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cream/10 border border-cream/20 backdrop-blur-sm mb-6">
              <Star className="h-3.5 w-3.5 text-sage-300 fill-sage-300" />
              <span className="text-cream/90 text-xs font-medium tracking-wide uppercase">
                Rize · Kaçkar Dağları · Yayla Turizmi
              </span>
            </div>
          </AnimateIn>

          <AnimateIn delay={200}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-cream leading-[1.1] mb-6">
              Sisli Yaylaların
              <span className="block text-sage-300 mt-1">Büyülü Dünyası</span>
            </h1>
          </AnimateIn>

          <AnimateIn delay={350}>
            <p className="text-lg md:text-xl text-cream/75 mb-8 max-w-xl leading-relaxed">
              Ayder&apos;den Pokut&apos;a, Elevit&apos;ten Kaçkar zirvesine — Karadeniz&apos;in
              en etkileyici rotalarında profesyonel rehberlikle keşfe çıkın.
            </p>
          </AnimateIn>

          <AnimateIn delay={500}>
            <div className="flex flex-wrap gap-4 mb-12">
              <Link
                href="/turlar"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "bg-sage-500 hover:bg-sage-400 text-forest-900 shadow-lg shadow-sage-500/20 hover:shadow-sage-400/30 transition-all hover:-translate-y-0.5"
                )}
              >
                Turları İncele
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link
                href="/iletisim"
                className={cn(
                  buttonVariants({ size: "lg", variant: "outline" }),
                  "border-cream/30 text-cream hover:bg-cream/10 backdrop-blur-sm"
                )}
              >
                <Phone className="mr-2 h-4 w-4" />
                Bize Ulaşın
              </Link>
            </div>
          </AnimateIn>

          <AnimateIn delay={650} direction="up">
            <div className="flex flex-wrap gap-6">
              {[
                { icon: MapPin, label: "Rize Merkez Çıkışlı" },
                { icon: Star, label: "Profesyonel Rehberlik" },
                { icon: Phone, label: "WhatsApp Destek" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2 text-cream/70 text-sm">
                  <item.icon className="h-4 w-4 text-sage-400" />
                  {item.label}
                </div>
              ))}
            </div>
          </AnimateIn>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce-slow">
        <span className="text-cream/50 text-xs tracking-widest uppercase">Keşfet</span>
        <div className="w-px h-8 bg-gradient-to-b from-cream/50 to-transparent" />
      </div>
    </section>
  );
}
