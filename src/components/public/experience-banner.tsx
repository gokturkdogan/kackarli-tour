import { PageContainer } from "@/components/public/page-container";
import Image from "next/image";
import { AnimateIn } from "@/components/public/animate-in";

export function ExperienceBanner() {
  return (
    <section className="py-0 w-full overflow-hidden">
      <PageContainer className="py-12 sm:py-16">
        <AnimateIn>
          <div className="relative rounded-3xl overflow-hidden">
            <div className="grid lg:grid-cols-2">
              <div className="relative h-64 lg:h-auto min-h-[320px]">
                <Image
                  src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=900&q=80"
                  alt="Rize çay tarlaları ve vadi"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="bg-forest-800 p-10 lg:p-14 flex flex-col justify-center">
                <span className="text-sage-300 text-xs font-medium tracking-widest uppercase mb-3">
                  Rize Hakkında
                </span>
                <h3 className="text-2xl md:text-3xl font-bold text-cream mb-4">
                  Yeşilin Başkenti
                </h3>
                <p className="text-cream/70 leading-relaxed mb-4">
                  Karadeniz kıyısından 3.937 metrelik Kaçkar Zirvesi&apos;ne uzanan
                  Rize, Türkiye&apos;nin en yağışlı ve en yeşil ili. Yüzlerce yayla,
                  onlarca şelale ve eşsiz biyolojik çeşitlilik burada bir arada.
                </p>
                <p className="text-cream/60 text-sm leading-relaxed">
                  Haziran&apos;dan Eylül&apos;e kadar yaylalar açık, her hafta farklı bir
                  güzellik keşfetmenizi bekliyor. Çay hasadı mevsiminde tarlalar
                  yemyeşil, sonbaharda ise altın tonlarına bürünüyor.
                </p>
              </div>
            </div>
          </div>
        </AnimateIn>
      </PageContainer>
    </section>
  );
}
