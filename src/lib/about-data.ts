import { LOCAL_CULTURE_IMAGE, stockImage } from "@/lib/stock-images";

export const milestones = [
  {
    year: "2014",
    title: "Kuruluş",
    description: "Rize merkezli olarak ilk günübirlik yayla turlarımıza başladık.",
  },
  {
    year: "2017",
    title: "Rota Geliştirme",
    description:
      "Ayder, Pokut ve Sal duraklarını kapsayan günübirlik yayla rotamızı mükemmelleştirdik.",
  },
  {
    year: "2020",
    title: "Genişleyen Filo",
    description: "Araç filomuzu yenileyerek daha konforlu ve güvenli ulaşım sağladık.",
  },
  {
    year: "2024",
    title: "500+ Mutlu Gezgin",
    description: "Türkiye'nin dört bir yanından binlerce misafirimizi yaylalarla buluşturduk.",
  },
];

export const coreValues = [
  {
    icon: "heart",
    title: "Doğaya Saygı",
    description:
      "Tüm rotalarımızı çevreye duyarlı şekilde planlıyor, doğal yaşamı koruyoruz.",
    color: "forest",
  },
  {
    icon: "users",
    title: "Misafirperverlik",
    description:
      "Karadeniz'in sıcakkanlılığını her tura taşıyor, her misafirimizi özel hissettiriyoruz.",
    color: "sage",
  },
  {
    icon: "shield",
    title: "Güvenlik Önceliği",
    description:
      "Lisanslı rehberler, bakımlı araçlar ve detaylı rota planlamasıyla güvenli yolculuk.",
    color: "earth",
  },
  {
    icon: "compass",
    title: "Yerel Uzmanlık",
    description:
      "Rize'yi tanıyan, yayla yollarını bilen yerel ekibimizle otantik deneyimler sunuyoruz.",
    color: "forest",
  },
];

export const teamMembers = [
  {
    name: "Mehmet Kaya",
    role: "Kurucu & Baş Rehber",
    bio: "15 yıllık dağcılık ve yayla turizmi deneyimi. Kaçkar rotalarının her patikasını bilir.",
    initials: "MK",
  },
  {
    name: "Ayşe Demir",
    role: "Operasyon Müdürü",
    bio: "Tur planlaması ve misafir ilişkilerinden sorumlu. Her detayı özenle organize eder.",
    initials: "AD",
  },
  {
    name: "Can Yıldız",
    role: "Dağ Rehberi",
    bio: "UIAA sertifikalı rehber. Günübirlik yayla rotamızın vazgeçilmez ismi, her patikayı bilir.",
    initials: "CY",
  },
  {
    name: "Elif Arslan",
    role: "Tur Koordinatörü",
    bio: "Rezervasyon, biniş noktaları ve grup organizasyonu konusunda uzman.",
    initials: "EA",
  },
];

export const bentoFeatures = [
  {
    title: "Küçük Gruplar",
    description: "Maksimum 15 kişilik gruplarla samimi ve kişisel bir tur deneyimi.",
    stat: "Max 15",
    statLabel: "kişi/grup",
    size: "sm",
    image: null,
  },
  {
    title: "Yerel Lezzetler",
    description: "Tur rotalarında muhlama, hamsi ve yayla çaylarıyla Karadeniz mutfağını tanıyın.",
    stat: null,
    statLabel: null,
    size: "lg",
    image: LOCAL_CULTURE_IMAGE,
  },
  {
    title: "Profesyonel Rehberlik",
    description: "Deneyimli, sertifikalı ve bölgeyi avucunun içi gibi bilen rehber kadrosu.",
    stat: "10+",
    statLabel: "yıl deneyim",
    size: "sm",
    image: null,
  },
  {
    title: "Fotoğraf Molaları",
    description: "En güzel manzara noktalarında bol bol fotoğraf molası — anılarınızı ölümsüzleştirin.",
    stat: null,
    statLabel: null,
    size: "md",
    image: stockImage("mountainPeaks", 800),
  },
  {
    title: "Esnek Program",
    description: "Hava koşullarına ve grubun temposuna göre uyarlanabilir rota planlaması.",
    stat: "365",
    statLabel: "gün destek",
    size: "sm",
    image: null,
  },
];

export const regionFacts = [
  { value: "3.937m", label: "Kaçkar Zirve Yüksekliği" },
  { value: "200+", label: "Yayla Sayısı" },
  { value: "4.700mm", label: "Yıllık Yağış" },
  { value: "%72", label: "Orman Örtüsü" },
];
