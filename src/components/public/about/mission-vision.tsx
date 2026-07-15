import { PageContainer } from "@/components/public/page-container";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Eye, Target } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AnimateIn } from "@/components/public/animate-in";
import { stockImage } from "@/lib/stock-images";

export function MissionVision() {
  return (
    <section className="py-12 sm:py-20 bg-white w-full overflow-hidden">
      <PageContainer>
        <div className="grid lg:grid-cols-2 gap-4 sm:gap-6">
          <AnimateIn direction="left">
            <div className="h-full p-5 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-forest-800 to-forest-900 text-cream relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 sm:w-48 h-32 sm:h-48 bg-sage-500/10 rounded-full blur-3xl" />
              <div className="relative">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-sage-500/20 flex items-center justify-center mb-4 sm:mb-6">
                  <Target className="h-5 w-5 sm:h-6 sm:w-6 text-sage-300" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Misyonumuz</h3>
                <p className="text-sm sm:text-base text-cream/75 leading-relaxed">
                  Rize ve Kaçkar Dağları&apos;nın eşsiz doğasını, yayla kültürünü ve
                  misafirperverliğini Türkiye&apos;nin ve dünyanın her köşesinden gelen
                  gezginlerle paylaşmak. Güvenli, sürdürülebilir ve unutulmaz tur
                  deneyimleri sunmak.
                </p>
              </div>
            </div>
          </AnimateIn>

          <AnimateIn direction="right" delay={150}>
            <div className="h-full p-5 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-sage-100 to-forest-50 border border-forest-100 relative overflow-hidden">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-forest-100 flex items-center justify-center mb-4 sm:mb-6">
                <Eye className="h-5 w-5 sm:h-6 sm:w-6 text-forest-600" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-forest-900 mb-3 sm:mb-4">
                Vizyonumuz
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                Karadeniz yayla turizminin öncü markası olmak. Doğa dostu turizm
                anlayışıyla bölgenin tanıtımına katkı sağlarken, yerel ekonomiye ve
                sürdürülebilir kalkınmaya destek vermek.
              </p>
            </div>
          </AnimateIn>
        </div>

        <AnimateIn delay={200} className="mt-4 sm:mt-6">
          <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden min-h-[280px] sm:min-h-0 sm:h-64 md:h-80">
            <Image
              src={stockImage("naturePanorama", 1400)}
              alt="Kaçkar Dağları panorama"
              fill
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-forest-900/90 via-forest-900/75 to-forest-900/40 sm:to-forest-900/30 flex items-end sm:items-center">
              <div className="w-full p-5 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                  <div className="rounded-xl sm:rounded-none bg-forest-900/40 sm:bg-transparent backdrop-blur-sm sm:backdrop-blur-none border border-cream/10 sm:border-0 p-4 sm:p-0">
                    <p className="text-sage-300 text-[10px] sm:text-sm font-semibold uppercase tracking-widest mb-2">
                      Birlikte keşfedelim
                    </p>
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-cream mb-4 max-w-lg leading-tight">
                      Yaylaların büyüsüne hazır mısınız?
                    </h3>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Link
                        href="/turlar"
                        className={cn(
                          buttonVariants({ size: "lg" }),
                          "w-full sm:w-auto justify-center group bg-gradient-to-r from-sage-500 to-sage-400 hover:from-sage-400 hover:to-sage-300 text-forest-900 font-bold shadow-lg shadow-sage-500/25"
                        )}
                      >
                        Tura Katıl
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                      </Link>
                      <Link
                        href="/iletisim"
                        className={cn(
                          buttonVariants({ size: "lg", variant: "outline" }),
                          "w-full sm:w-auto justify-center border-cream/30 bg-cream/10 text-cream hover:bg-cream/20 hover:text-cream"
                        )}
                      >
                        Bize Ulaşın
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AnimateIn>
      </PageContainer>
    </section>
  );
}
