import { PageContainer } from "@/components/public/page-container";
import Image from "next/image";
import { Cloud, Droplets, Leaf, Mountain } from "lucide-react";
import { rizeHighlights } from "@/lib/home-data";
import { AnimateIn } from "@/components/public/animate-in";

const iconMap = {
  mountain: Mountain,
  cloud: Cloud,
  droplets: Droplets,
  leaf: Leaf,
};

export function RizeHighlights() {
  return (
    <section className="py-24 bg-cream relative overflow-hidden w-full">
      <div className="absolute top-0 right-0 w-48 sm:w-96 h-48 sm:h-96 bg-forest-100/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 sm:translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-40 sm:w-72 h-40 sm:h-72 bg-sage-100/50 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4 sm:-translate-x-1/2 pointer-events-none" />

      <PageContainer className="relative">
        <AnimateIn className="text-center mb-16 max-w-2xl mx-auto">
          <span className="text-forest-500 text-sm font-medium tracking-widest uppercase">
            Neden Rize?
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-forest-900 mt-3 mb-4">
            Karadeniz&apos;in Saklı Cenneti
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Yeşilin her tonunu barındıran Rize, sisli yaylaları, coşkulu dereleri ve
            sıcakkanlı insanıyla Türkiye&apos;nin en özel doğa destinasyonlarından biri.
          </p>
        </AnimateIn>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {rizeHighlights.map((item, i) => {
            const Icon = iconMap[item.icon as keyof typeof iconMap];

            if ("image" in item && item.image) {
              return (
                <AnimateIn key={item.title} delay={i * 100}>
                  <div className="group relative overflow-hidden rounded-2xl border border-forest-100 hover:border-forest-300 hover:shadow-xl hover:shadow-forest-900/20 transition-all duration-500 hover:-translate-y-1 h-full min-h-[220px]">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover object-[center_10%] transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-forest-900/95 via-forest-900/70 to-forest-900/35" />
                    <div className="relative flex h-full flex-col justify-end p-6">
                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-cream/15 backdrop-blur-sm border border-cream/20">
                        <Icon className="h-6 w-6 text-cream" />
                      </div>
                      <h3 className="text-lg font-semibold text-cream mb-2">{item.title}</h3>
                      <p className="text-sm text-cream/80 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </AnimateIn>
              );
            }

            return (
              <AnimateIn key={item.title} delay={i * 100}>
                <div className="group p-6 rounded-2xl bg-white border border-forest-100 hover:border-forest-300 hover:shadow-xl hover:shadow-forest-100/50 transition-all duration-300 hover:-translate-y-1 h-full">
                  <div className="w-12 h-12 rounded-xl bg-forest-50 flex items-center justify-center mb-4 group-hover:bg-forest-100 transition-colors">
                    <Icon className="h-6 w-6 text-forest-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-forest-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </AnimateIn>
            );
          })}
        </div>
      </PageContainer>
    </section>
  );
}
