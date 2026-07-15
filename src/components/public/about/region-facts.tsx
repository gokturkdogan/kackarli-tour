import { PageContainer } from "@/components/public/page-container";
import { regionFacts } from "@/lib/about-data";
import { AnimateIn } from "@/components/public/animate-in";

export function RegionFacts() {
  return (
    <section className="py-10 sm:py-16 bg-gradient-to-b from-forest-800 to-forest-900 border-y border-forest-700/50 w-full overflow-hidden relative">
      <div className="absolute top-0 right-0 h-32 w-32 rounded-full bg-sage-400/10 blur-3xl pointer-events-none" />

      <PageContainer className="relative">
        <AnimateIn className="text-center mb-6 sm:mb-10">
          <p className="text-sage-300 text-[10px] sm:text-sm font-semibold tracking-[0.2em] uppercase">
            Rize & Kaçkarlar
          </p>
          <p className="text-cream/60 text-sm mt-2 max-w-xs mx-auto leading-relaxed">
            Rotamızın geçtiği eşsiz coğrafyanın rakamlarla özeti
          </p>
        </AnimateIn>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {regionFacts.map((fact, i) => (
            <AnimateIn key={fact.label} delay={i * 80}>
              <div className="text-center p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-forest-900/60 border border-forest-700/50 hover:border-sage-500/30 transition-colors group backdrop-blur-sm">
                <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-cream group-hover:text-sage-300 transition-colors">
                  {fact.value}
                </p>
                <p className="text-sage-400 text-[11px] sm:text-xs md:text-sm mt-1.5 sm:mt-2 font-medium leading-snug">
                  {fact.label}
                </p>
              </div>
            </AnimateIn>
          ))}
        </div>
      </PageContainer>
    </section>
  );
}
