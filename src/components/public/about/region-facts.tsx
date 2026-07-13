import { PageContainer } from "@/components/public/page-container";
import { regionFacts } from "@/lib/about-data";
import { AnimateIn } from "@/components/public/animate-in";

export function RegionFacts() {
  return (
    <section className="py-16 bg-forest-800 border-y border-forest-700/50 w-full overflow-hidden">
      <PageContainer>
        <AnimateIn className="text-center mb-10">
          <p className="text-sage-300 text-sm tracking-widest uppercase">
            Rize & Kaçkarlar
          </p>
        </AnimateIn>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {regionFacts.map((fact, i) => (
            <AnimateIn key={fact.label} delay={i * 80}>
              <div className="text-center p-6 rounded-2xl bg-forest-900/50 border border-forest-700/50 hover:border-sage-500/30 transition-colors group">
                <p className="text-3xl md:text-4xl font-bold text-cream group-hover:text-sage-300 transition-colors">
                  {fact.value}
                </p>
                <p className="text-sage-400 text-xs md:text-sm mt-2 font-medium">
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
