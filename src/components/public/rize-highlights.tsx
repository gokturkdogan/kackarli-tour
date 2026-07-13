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
    <section className="py-24 bg-cream relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-forest-100/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-sage-100/50 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto px-4 relative">
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
      </div>
    </section>
  );
}
