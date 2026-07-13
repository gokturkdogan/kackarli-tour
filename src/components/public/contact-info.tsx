import Link from "next/link";
import {
  Clock,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getWhatsAppUrl, type SiteSettings } from "@/lib/site-settings";
import { AnimateIn } from "@/components/public/animate-in";

interface ContactInfoPanelProps {
  settings: SiteSettings;
}

export function ContactInfoPanel({ settings }: ContactInfoPanelProps) {
  const whatsappUrl = getWhatsAppUrl(
    settings.whatsappNumber,
    "Merhaba, tur hakkında bilgi almak istiyorum."
  );

  const items = [
    {
      icon: MapPin,
      title: "Adres",
      value: settings.contactAddress,
      href: null,
    },
    {
      icon: Phone,
      title: "Telefon",
      value: settings.contactPhone,
      href: `tel:${settings.contactPhone.replace(/\s/g, "")}`,
    },
    {
      icon: Mail,
      title: "E-posta",
      value: settings.contactEmail,
      href: `mailto:${settings.contactEmail}`,
    },
    {
      icon: Clock,
      title: "Çalışma Saatleri",
      value: "Pazartesi – Cumartesi: 09:00 – 19:00",
      href: null,
    },
  ];

  return (
    <div className="space-y-6">
      <AnimateIn>
        <div>
          <h2 className="text-2xl font-bold text-forest-900 mb-2">
            Bize Ulaşın
          </h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            {settings.siteDescription}. Sorularınız için formu doldurun veya
            doğrudan WhatsApp üzerinden yazın — en kısa sürede dönüş yapıyoruz.
          </p>
        </div>
      </AnimateIn>

      <div className="space-y-4">
        {items.map((item, i) => (
          <AnimateIn key={item.title} delay={i * 80}>
            <Card className="border-forest-100 hover:border-forest-200 transition-colors">
              <CardContent className="flex items-start gap-4 p-5">
                <div className="w-10 h-10 rounded-xl bg-forest-50 flex items-center justify-center shrink-0">
                  <item.icon className="h-5 w-5 text-forest-600" />
                </div>
                <div>
                  <p className="text-xs font-medium text-forest-500 uppercase tracking-wider mb-1">
                    {item.title}
                  </p>
                  {item.href ? (
                    <Link
                      href={item.href}
                      className="text-forest-900 font-medium hover:text-forest-600 transition-colors"
                    >
                      {item.value}
                    </Link>
                  ) : (
                    <p className="text-forest-900 font-medium">{item.value}</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </AnimateIn>
        ))}
      </div>

      <AnimateIn delay={350}>
        <Link
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            buttonVariants({ size: "lg" }),
            "w-full bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-lg shadow-[#25D366]/20"
          )}
        >
          <MessageCircle className="mr-2 h-5 w-5" />
          WhatsApp ile Yazın
        </Link>
      </AnimateIn>
    </div>
  );
}
