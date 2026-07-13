export const featuredRoutes = [
  {
    id: "ayder",
    title: "Ayder Yaylası",
    subtitle: "Termal & Şelale Rotası",
    description:
      "Gelintulu Şelalesi, tarihi köprüler ve çay bahçeleri eşliğinde Karadeniz'in en ünlü yaylasına yolculuk.",
    duration: "1 Gün",
    distance: "85 km",
    highlights: ["Gelintulu Şelalesi", "Ayder Kaplıcaları", "Fırtına Deresi"],
    type: "DAY_TRIP" as const,
    image:
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1200&q=80",
    href: "/turlar/gunubirlik",
  },
  {
    id: "pokut-sal",
    title: "Pokut & Sal Yaylaları",
    subtitle: "Bulutların Üstünde",
    description:
      "Sis denizinin üzerinde yükselen çayırlık yaylalar, ahşap evler ve Kaçkar silüetiyle unutulmaz manzaralar.",
    duration: "1 Gün",
    distance: "120 km",
    highlights: ["Pokut Yaylası", "Sal Yaylası", "Panoramik Seyir"],
    type: "DAY_TRIP" as const,
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80",
    href: "/turlar/gunubirlik",
  },
  {
    id: "elevit",
    title: "Elevit & Huser",
    subtitle: "Yayla Konaklama",
    description:
      "Taş evler, organik yaşam ve yıldızlı gökyüzü. Yaylada geceleyerek doğanın ritmine uyum sağlayın.",
    duration: "2 Gece 3 Gün",
    distance: "140 km",
    highlights: ["Elevit Yaylası", "Huser Yaylası", "Yayla Konaklaması"],
    type: "ACCOMMODATION" as const,
    image:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&q=80",
    href: "/turlar/konaklamali",
  },
  {
    id: "kackar",
    title: "Kaçkar Zirve Rotası",
    subtitle: "Dağcılık & Trekking",
    description:
      "Türkiye'nin en yüksek ikinci zirvesine giden eşsiz patika, buzul gölleri ve endemik flora.",
    duration: "3 Gece 4 Gün",
    distance: "Trekking",
    highlights: ["Deniz Gölü", "Dilberdüzü", "Zirve Manzarası"],
    type: "ACCOMMODATION" as const,
    image:
      "https://images.unsplash.com/photo-1454496526348-df8e440a6e24?w=1200&q=80",
    href: "/turlar/konaklamali",
  },
];

export const rizeHighlights = [
  {
    icon: "mountain",
    title: "Kaçkar Dağları",
    description:
      "3.937 metre zirvesiyle Doğu Karadeniz'in çatısı. Buzul gölleri, endemik bitkiler ve eşsiz trekking rotaları.",
  },
  {
    icon: "cloud",
    title: "Yayla Kültürü",
    description:
      "Yüzlerce yayla, geleneksel ahşap evler ve her mevsim farklı bir güzellik sunan yayla yaşamı.",
  },
  {
    icon: "droplets",
    title: "Şelaleler & Vadiler",
    description:
      "Fırtına Vadisi, Zil Kalesi, Palovit ve Gelintulu — Türkiye'nin en etkileyici su kaynakları burada.",
  },
  {
    icon: "leaf",
    title: "Çay & Doğa",
    description:
      "Dünyaca ünlü Rize çayı, yemyeşil çay tarlaları ve Karadeniz'in bereketli orman ekosistemi.",
  },
];

export const stats = [
  { value: "15+", label: "Tur Rotası" },
  { value: "8", label: "Yayla Noktası" },
  { value: "500+", label: "Mutlu Gezgin" },
  { value: "10+", label: "Yıllık Deneyim" },
];

export const whyChooseUs = [
  {
    title: "Yerel Rehberlik",
    description: "Rize'yi tanıyan, deneyimli ve sertifikalı rehberlerimizle güvenli yolculuk.",
  },
  {
    title: "Konforlu Ulaşım",
    description: "Klimalı, bakımlı araçlarımızla Rize merkezinden yaylalara konforlu transfer.",
  },
  {
    title: "Esnek Program",
    description: "Günübirlik veya konaklamalı turlar; grubunuza özel rota düzenleme imkânı.",
  },
  {
    title: "7/24 Destek",
    description: "Rezervasyon öncesi ve sonrası WhatsApp üzerinden hızlı iletişim ve destek.",
  },
];

export const destinations = [
  "Ayder",
  "Pokut",
  "Sal",
  "Elevit",
  "Huser",
  "Badara",
  "Trovit",
  "Kaçkar",
  "Zil Kalesi",
  "Anzer",
];
