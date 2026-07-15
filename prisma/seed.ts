import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";
import { PrismaClient } from "../src/generated/prisma/client";

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const itineraryStops = [
  {
    stopType: "BOARDING" as const,
    time: "08:00",
    title: "Rize Merkez — Hareket",
    description:
      "Belirlenen biniş noktalarından misafirlerimizi alıyor, günlük rotamıza başlıyoruz. Rehberimiz günün programını kısaca tanıtır.",
    duration: "15 dk",
    imageUrl: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&q=80",
    isFeatured: false,
    sortOrder: 1,
  },
  {
    stopType: "VIEWPOINT" as const,
    time: "09:00",
    title: "Fırtına Vadisi",
    description:
      "Karadeniz'in en etkileyici vadilerinden biri olan Fırtına Vadisi'nde kısa bir fotoğraf molası. Coşkulu dere ve yeşil yamaçlar eşliğinde manzara keyfi.",
    duration: "20 dk",
    imageUrl: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80",
    isFeatured: true,
    sortOrder: 2,
  },
  {
    stopType: "VIEWPOINT" as const,
    time: "09:45",
    title: "Zil Kalesi Seyir Noktası",
    description:
      "Fırtına Deresi üzerindeki tarihi Zil Kalesi manzara noktasında durak. Vadi ve kale silüetini bir arada görebileceğiniz özel bir fotoğraf durağı.",
    duration: "25 dk",
    imageUrl: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80",
    isFeatured: false,
    sortOrder: 3,
  },
  {
    stopType: "STOP" as const,
    time: "11:00",
    title: "Ayder Yaylası",
    description:
      "Karadeniz'in en ünlü yaylalarından Ayder'de serbest zaman. Gelintulu Şelalesi çevresi, köprüler ve yayla atmosferini keşfedin.",
    duration: "1,5 saat",
    imageUrl: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=800&q=80",
    isFeatured: true,
    sortOrder: 4,
  },
  {
    stopType: "MEAL" as const,
    time: "12:30",
    title: "Öğle Molası — Yerel Lezzetler",
    description:
      "Yayla restoranında öğle yemeği molası. Muhlama, hamsi veya bölgeye özgü menülerle Karadeniz mutfağını tadın. (Yemek tur ücretine dahil değildir.)",
    duration: "1 saat",
    imageUrl: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80",
    isFeatured: false,
    sortOrder: 5,
  },
  {
    stopType: "VIEWPOINT" as const,
    time: "14:00",
    title: "Pokut Yaylası",
    description:
      "Sis denizinin üzerinde yükselen çayırlık yayla. Ahşap evler, panoramik Kaçkar manzarası ve bulutların arasından süzülen ışık — rotanın en etkileyici durağı.",
    duration: "45 dk",
    imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    isFeatured: true,
    sortOrder: 6,
  },
  {
    stopType: "REST" as const,
    time: "15:15",
    title: "Sal Yaylası",
    description:
      "Pokut'un komşu yaylası Sal'da çay molası ve kısa yürüyüş. Yayla havasını soluyup dinlenme imkânı.",
    duration: "30 dk",
    imageUrl: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&q=80",
    isFeatured: false,
    sortOrder: 7,
  },
  {
    stopType: "STOP" as const,
    time: "16:30",
    title: "Dönüş Yolculuğu",
    description:
      "Gün boyunca biriktirdiğimiz anılarla Rize merkeze doğru dönüş. Yol üzerinde ek molalar hava ve grup temposuna göre düzenlenir.",
    duration: "—",
    imageUrl: "https://images.unsplash.com/photo-1454496526348-df8e440a6e24?w=800&q=80",
    isFeatured: false,
    sortOrder: 8,
  },
  {
    stopType: "BOARDING" as const,
    time: "20:00",
    title: "Rize Merkez — Varış",
    description:
      "Biniş noktalarına güvenli şekilde ulaştırıyoruz. Günübirlik yayla turumuzun sonu — bir sonraki macerada görüşmek üzere!",
    duration: "—",
    imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    isFeatured: false,
    sortOrder: 9,
  },
];

async function main() {
  const tour = await prisma.tour.upsert({
    where: { slug: "rize-yayla-gunubirlik-turu" },
    update: {
      title: "Rize Yayla Günübirlik Turu",
      subtitle: "Fırtına Vadisi · Ayder · Pokut · Sal",
      shortDescription:
        "Fırtına Vadisi, Ayder, Pokut ve Sal yaylalarını kapsayan günübirlik rota.",
      description:
        "Rize merkezden sabah yola çıkıyor, Karadeniz'in en güzel yaylalarını tek günde keşfediyoruz. Fırtına Vadisi'nden Ayder'e, sis denizinin üzerindeki Pokut ve Sal yaylalarına uzanan özenle planlanmış günübirlik rotamız.",
      type: "DAY_TRIP",
      price: 1200,
      duration: "1 Gün",
      distance: "≈ 180 km",
      departureTime: "08:00",
      returnTime: "20:00",
      maxGroupSize: 15,
      highlights:
        "Fırtına Vadisi\nAyder Yaylası\nPokut & Sal\nZil Kalesi\nYerel lezzet molası",
      coverImageUrl:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80",
      boardingPoints: "Rize Otogar önü\nÇayeli merkez\nArdeşen merkez (talep üzerine)",
      includedServices:
        "Klimalı tur aracı transferi\nProfesyonel yerel rehberlik\nRota boyunca planlı molalar\nSigorta ve güvenlik desteği",
      isActive: true,
      sortOrder: 1,
    },
    create: {
      title: "Rize Yayla Günübirlik Turu",
      slug: "rize-yayla-gunubirlik-turu",
      subtitle: "Fırtına Vadisi · Ayder · Pokut · Sal",
      shortDescription:
        "Fırtına Vadisi, Ayder, Pokut ve Sal yaylalarını kapsayan günübirlik rota.",
      description:
        "Rize merkezden sabah yola çıkıyor, Karadeniz'in en güzel yaylalarını tek günde keşfediyoruz. Fırtına Vadisi'nden Ayder'e, sis denizinin üzerindeki Pokut ve Sal yaylalarına uzanan özenle planlanmış günübirlik rotamız.",
      type: "DAY_TRIP",
      price: 1200,
      duration: "1 Gün",
      distance: "≈ 180 km",
      departureTime: "08:00",
      returnTime: "20:00",
      maxGroupSize: 15,
      highlights:
        "Fırtına Vadisi\nAyder Yaylası\nPokut & Sal\nZil Kalesi\nYerel lezzet molası",
      coverImageUrl:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80",
      boardingPoints: "Rize Otogar önü\nÇayeli merkez\nArdeşen merkez (talep üzerine)",
      includedServices:
        "Klimalı tur aracı transferi\nProfesyonel yerel rehberlik\nRota boyunca planlı molalar\nSigorta ve güvenlik desteği",
      isActive: true,
      sortOrder: 1,
    },
  });

  await prisma.tourItineraryItem.deleteMany({ where: { tourId: tour.id } });

  for (const stop of itineraryStops) {
    await prisma.tourItineraryItem.create({
      data: {
        tourId: tour.id,
        dayNumber: 1,
        ...stop,
      },
    });
  }

  console.log("Tour created:", tour.title);

  // Upcoming sample schedules
  await prisma.tourSchedule.deleteMany({ where: { tourId: tour.id } });

  const today = new Date();
  today.setHours(12, 0, 0, 0);
  for (const days of [7, 14, 21, 28]) {
    const date = new Date(today);
    date.setDate(date.getDate() + days);
    await prisma.tourSchedule.create({
      data: {
        tourId: tour.id,
        startDate: date,
        capacity: 15,
        reservedCount: 0,
        isActive: true,
      },
    });
  }

  console.log("Sample tour schedules created");

  const settings = [
    { key: "site_name", value: "Kaçkarlı Tur" },
    {
      key: "site_description",
      value: "Rize günübirlik yayla turu — Fırtına Vadisi, Ayder, Pokut ve Sal rotası",
    },
    { key: "whatsapp_number", value: "905551234567" },
    { key: "contact_email", value: "info@kackarlitur.com" },
    { key: "contact_phone", value: "+90 555 123 45 67" },
    { key: "contact_address", value: "Rize, Türkiye" },
  ];

  for (const setting of settings) {
    await prisma.siteSetting.upsert({
      where: { key: setting.key },
      update: { value: setting.value },
      create: setting,
    });
  }

  console.log("Site settings created");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
