import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  Clock,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Sparkles,
} from "lucide-react";
import { PageContainer } from "@/components/public/page-container";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getWhatsAppUrl, type SiteSettings } from "@/lib/site-settings";
import { AnimateIn } from "@/components/public/animate-in";
import { stockImage } from "@/lib/stock-images";

interface ContactHubProps {
  settings: SiteSettings;
}

export function ContactHub({ settings }: ContactHubProps) {
  const whatsappUrl = getWhatsAppUrl(
    settings.whatsappNumber,
    "Merhaba, tur hakkında bilgi almak istiyorum."
  );

  const contactCards = [
    {
      icon: Phone,
      label: "Telefon",
      value: settings.contactPhone,
      href: `tel:${settings.contactPhone.replace(/\s/g, "")}`,
      accent: "from-sage-50 to-forest-50 border-sage-200/80",
      iconBg: "bg-sage-100 text-sage-700",
      action: "Ara",
    },
    {
      icon: Mail,
      label: "E-posta",
      value: settings.contactEmail,
      href: `mailto:${settings.contactEmail}`,
      accent: "from-forest-50 to-mist border-forest-200/80",
      iconBg: "bg-forest-100 text-forest-700",
      action: "Yaz",
    },
    {
      icon: MapPin,
      label: "Adres",
      value: settings.contactAddress,
      href: null,
      accent: "from-earth-50 to-cream border-earth-200/80",
      iconBg: "bg-earth-100 text-earth-700",
      action: null,
    },
    {
      icon: Clock,
      label: "Çalışma Saatleri",
      value: "Pzt – Cmt · 09:00 – 19:00",
      href: null,
      accent: "from-mist to-white border-forest-100",
      iconBg: "bg-forest-50 text-forest-600",
      action: null,
    },
  ];

  const highlights = [
    { title: "Hızlı Dönüş", text: "Aynı gün içinde yanıt" },
    { title: "7/24 WhatsApp", text: "Anlık mesajlaşma" },
    { title: "Yerel Ekip", text: "Rize merkezli destek" },
  ];

  return (
    <section className="py-10 sm:py-16 md:py-20 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-72 h-72 bg-sage-200/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-forest-100/40 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4 pointer-events-none" />

      <PageContainer className="relative">
        <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
          {/* WhatsApp hero card */}
          <AnimateIn>
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-forest-800 via-forest-900 to-forest-950 shadow-2xl shadow-forest-900/25">
              <div className="absolute inset-0 opacity-20">
                <Image
                  src={stockImage("heroMountain", 900)}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 896px"
                />
              </div>
              <div className="absolute top-0 right-0 w-40 h-40 bg-[#25D366]/20 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-sage-400/10 rounded-full blur-2xl" />

              <div className="relative p-6 sm:p-8 md:p-10">
                <div className="flex items-start gap-4 mb-5">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#25D366] flex items-center justify-center shadow-lg shadow-[#25D366]/30 shrink-0">
                    <MessageCircle className="h-7 w-7 sm:h-8 sm:w-8 text-white" />
                  </div>
                  <div className="min-w-0 pt-1">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-cream/10 border border-cream/15 text-sage-300 text-[10px] sm:text-xs font-medium uppercase tracking-wider mb-2">
                      <Sparkles className="h-3 w-3" />
                      En Hızlı Yol
                    </div>
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-cream leading-tight">
                      WhatsApp&apos;tan Yazın
                    </h2>
                    <p className="text-cream/65 text-sm sm:text-base mt-2 leading-relaxed max-w-md">
                      Tur tarihi, fiyat ve rezervasyon için doğrudan yazın — genellikle
                      dakikalar içinde dönüş yapıyoruz.
                    </p>
                  </div>
                </div>

                <Link
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    buttonVariants({ size: "lg" }),
                    "w-full sm:w-auto justify-center bg-[#25D366] hover:bg-[#1fb855] text-white text-base sm:text-lg h-14 sm:h-12 px-8 shadow-xl shadow-[#25D366]/25 hover:shadow-[#25D366]/40 transition-all hover:-translate-y-0.5 active:translate-y-0"
                  )}
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  WhatsApp ile İletişime Geç
                  <ArrowUpRight className="ml-2 h-4 w-4 opacity-80" />
                </Link>
              </div>
            </div>
          </AnimateIn>

          {/* Contact cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {contactCards.map((card, i) => {
              const content = (
                <div
                  className={cn(
                    "group relative flex items-center gap-4 p-4 sm:p-5 rounded-2xl border bg-gradient-to-br transition-all duration-300",
                    card.accent,
                    card.href && "hover:shadow-lg hover:shadow-forest-100/50 hover:-translate-y-0.5 active:scale-[0.99]"
                  )}
                >
                  <div
                    className={cn(
                      "w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-105",
                      card.iconBg
                    )}
                  >
                    <card.icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] sm:text-xs font-medium text-forest-500 uppercase tracking-wider mb-0.5">
                      {card.label}
                    </p>
                    <p className="text-forest-900 font-semibold text-sm sm:text-base truncate">
                      {card.value}
                    </p>
                  </div>
                  {card.action && (
                    <span className="shrink-0 text-xs font-semibold text-forest-600 bg-white/80 px-3 py-1.5 rounded-full border border-forest-100 group-hover:bg-forest-600 group-hover:text-cream group-hover:border-forest-600 transition-colors">
                      {card.action}
                    </span>
                  )}
                </div>
              );

              return (
                <AnimateIn key={card.label} delay={i * 60}>
                  {card.href ? (
                    <Link href={card.href} className="block">
                      {content}
                    </Link>
                  ) : (
                    content
                  )}
                </AnimateIn>
              );
            })}
          </div>

          {/* Highlights strip */}
          <AnimateIn delay={200}>
            <div className="flex gap-3 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-none sm:grid sm:grid-cols-3 sm:overflow-visible">
              {highlights.map((item) => (
                <div
                  key={item.title}
                  className="shrink-0 sm:shrink flex-1 min-w-[140px] text-center px-4 py-4 rounded-2xl bg-white border border-forest-100 shadow-sm"
                >
                  <p className="text-sm font-semibold text-forest-900">{item.title}</p>
                  <p className="text-xs text-muted-foreground mt-1">{item.text}</p>
                </div>
              ))}
            </div>
          </AnimateIn>

          <AnimateIn delay={280}>
            <p className="text-center text-xs sm:text-sm text-muted-foreground px-4">
              {settings.siteName} · {settings.siteDescription}
            </p>
          </AnimateIn>
        </div>
      </PageContainer>

      {/* Mobile sticky WhatsApp bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] bg-cream/90 backdrop-blur-md border-t border-forest-100 sm:hidden">
        <Link
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            buttonVariants({ size: "lg" }),
            "w-full justify-center bg-[#25D366] hover:bg-[#1fb855] text-white h-12 shadow-lg"
          )}
        >
          <MessageCircle className="mr-2 h-5 w-5" />
          WhatsApp ile Yaz
        </Link>
      </div>

      {/* Spacer for sticky bar on mobile */}
      <div className="h-20 sm:hidden" aria-hidden />
    </section>
  );
}
