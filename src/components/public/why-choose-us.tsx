import { PageContainer } from "@/components/public/page-container";
import { CheckCircle2 } from "lucide-react";
import { whyChooseUs } from "@/lib/home-data";
import { AnimateIn } from "@/components/public/animate-in";

export function WhyChooseUs() {
  return (
    <section className="py-24 bg-white w-full overflow-hidden">
      <PageContainer>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <AnimateIn direction="left">
            <span className="text-forest-500 text-sm font-medium tracking-widest uppercase">
              Neden Biz?
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-forest-900 mt-3 mb-6">
              Güvenle Yola Çıkın
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Yılların deneyimiyle Rize ve Kaçkar Dağları&apos;nı en iyi bilen ekibimiz,
              her mevsim güvenli ve keyifli bir tur deneyimi sunar. Küçük gruplar,
              kişisel ilgi ve doğaya saygılı rotalar bizim önceliğimiz.
            </p>

            <div className="space-y-4">
              {[
                "Lisanslı ve deneyimli yerel rehberler",
                "Klimalı, bakımlı tur araçları",
                "Küçük grup garantisi (max 15 kişi)",
                "Esnek iptal ve tarih değişikliği",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-sage-500 shrink-0" />
                  <span className="text-forest-800 text-sm">{item}</span>
                </div>
              ))}
            </div>
          </AnimateIn>

          <div className="grid sm:grid-cols-2 gap-4">
            {whyChooseUs.map((item, i) => (
              <AnimateIn key={item.title} delay={i * 100} direction="right">
                <div className="p-5 rounded-xl bg-mist border border-forest-100 hover:border-forest-200 transition-colors h-full">
                  <h3 className="font-semibold text-forest-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
