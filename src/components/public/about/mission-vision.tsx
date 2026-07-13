import { PageContainer } from "@/components/public/page-container";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Eye, Target } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AnimateIn } from "@/components/public/animate-in";

export function MissionVision() {
  return (
    <section className="py-20 bg-white w-full overflow-hidden">
      <PageContainer>
        <div className="grid lg:grid-cols-2 gap-6">
          <AnimateIn direction="left">
            <div className="h-full p-8 md:p-10 rounded-3xl bg-gradient-to-br from-forest-800 to-forest-900 text-cream relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-sage-500/10 rounded-full blur-3xl" />
              <div className="relative">
                <div className="w-12 h-12 rounded-xl bg-sage-500/20 flex items-center justify-center mb-6">
                  <Target className="h-6 w-6 text-sage-300" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Misyonumuz</h3>
                <p className="text-cream/75 leading-relaxed">
                  Rize ve Kaçkar Dağları&apos;nın eşsiz doğasını, yayla kültürünü ve
                  misafirperverliğini Türkiye&apos;nin ve dünyanın her köşesinden gelen
                  gezginlerle paylaşmak. Güvenli, sürdürülebilir ve unutulmaz tur
                  deneyimleri sunmak.
                </p>
              </div>
            </div>
          </AnimateIn>

          <AnimateIn direction="right" delay={150}>
            <div className="h-full p-8 md:p-10 rounded-3xl bg-gradient-to-br from-sage-100 to-forest-50 border border-forest-100 relative overflow-hidden">
              <div className="w-12 h-12 rounded-xl bg-forest-100 flex items-center justify-center mb-6">
                <Eye className="h-6 w-6 text-forest-600" />
              </div>
              <h3 className="text-2xl font-bold text-forest-900 mb-4">Vizyonumuz</h3>
              <p className="text-muted-foreground leading-relaxed">
                Karadeniz yayla turizminin öncü markası olmak. Doğa dostu turizm
                anlayışıyla bölgenin tanıtımına katkı sağlarken, yerel ekonomiye ve
                sürdürülebilir kalkınmaya destek vermek.
              </p>
            </div>
          </AnimateIn>
        </div>

        <AnimateIn delay={200} className="mt-6">
          <div className="relative rounded-3xl overflow-hidden h-64 md:h-80">
            <Image
              src="https://images.unsplash.com/photo-1454496526348-df8e440a6e24?w=1400&q=80"
              alt="Kaçkar Dağları panorama"
              fill
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-forest-900/80 to-forest-900/30 flex items-center">
              <PageContainer>
                <p className="text-sage-300 text-sm uppercase tracking-widest mb-2">
                  Birlikte keşfedelim
                </p>
                <h3 className="text-2xl md:text-3xl font-bold text-cream mb-4 max-w-lg">
                  Yaylaların büyüsüne hazır mısınız?
                </h3>
                <Link
                  href="/iletisim"
                  className={cn(
                    buttonVariants({ size: "lg" }),
                    "w-full sm:w-auto justify-center bg-sage-500 hover:bg-sage-400 text-forest-900"
                  )}
                >
                  Bize Ulaşın
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </PageContainer>
            </div>
          </div>
        </AnimateIn>
      </PageContainer>
    </section>
  );
}
