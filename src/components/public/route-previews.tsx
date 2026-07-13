import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, MapPin, Route } from "lucide-react";
import { featuredRoutes } from "@/lib/home-data";
import { AnimateIn } from "@/components/public/animate-in";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function RoutePreviews() {
  return (
    <section className="py-24 bg-mist">
      <div className="container mx-auto px-4">
        <AnimateIn className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div className="max-w-xl">
            <span className="text-forest-500 text-sm font-medium tracking-widest uppercase">
              Popüler Rotalar
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-forest-900 mt-3 mb-3">
              Yayla Rotalarına Önizleme
            </h2>
            <p className="text-muted-foreground">
              En çok tercih edilen güzergâhlarımızdan bir seçki. Her rota, deneyimli
              rehberlerimiz eşliğinde güvenle keşfedilir.
            </p>
          </div>
          <Link
            href="/turlar"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "border-forest-300 text-forest-700 hover:bg-forest-50 shrink-0"
            )}
          >
            Tüm Rotalar
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </AnimateIn>

        <div className="grid md:grid-cols-2 gap-6">
          {featuredRoutes.map((route, i) => (
            <AnimateIn key={route.id} delay={i * 120}>
              <Link
                href={route.href}
                className="group block rounded-2xl overflow-hidden bg-white border border-forest-100 hover:border-forest-300 hover:shadow-2xl hover:shadow-forest-100/60 transition-all duration-500"
              >
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={route.image}
                    alt={route.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-900/80 via-forest-900/20 to-transparent" />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <Badge
                      className={cn(
                        route.type === "DAY_TRIP"
                          ? "bg-sage-500 text-forest-900"
                          : "bg-earth-400 text-white"
                      )}
                    >
                      {route.type === "DAY_TRIP" ? "Günübirlik" : "Konaklamalı"}
                    </Badge>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-sage-300 text-xs font-medium uppercase tracking-wider mb-1">
                      {route.subtitle}
                    </p>
                    <h3 className="text-2xl font-bold text-cream">{route.title}</h3>
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    {route.description}
                  </p>

                  <div className="flex flex-wrap gap-4 text-xs text-forest-600 mb-4">
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5" />
                      {route.duration}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Route className="h-3.5 w-3.5" />
                      {route.distance}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5" />
                      Rize
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {route.highlights.map((h) => (
                      <span
                        key={h}
                        className="px-2.5 py-1 rounded-full bg-forest-50 text-forest-700 text-xs"
                      >
                        {h}
                      </span>
                    ))}
                  </div>

                  <div className="mt-5 flex items-center text-forest-600 text-sm font-medium group-hover:text-forest-800 transition-colors">
                    Rotayı İncele
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
}
