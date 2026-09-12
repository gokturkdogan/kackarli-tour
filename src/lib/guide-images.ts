import { stockImage, type StockPhotoKey } from "@/lib/stock-images";

const GUIDE_COVER_MAP: Record<string, StockPhotoKey> = {
  "ayder-turu-rehberi": "waterfall",
  "rize-gunubirlik-tur-rehberi": "heroMountain",
  "huser-sis-denizi-rehberi": "naturePanorama",
  "pokut-yaylasi-turu": "plateauHouses",
  "sal-yaylasi-gezi-rehberi": "greenHills",
  "firtina-vadisi-turu": "mistyValley",
  "kackar-daglari-tur-rehberi": "mountainPeaks",
  "rize-yayla-turu-ne-zaman": "starryMountains",
  "ayderden-pokuta-rota": "forestPath",
  "gelintulu-selalesi-turu": "waterfall",
  "zil-kalesi-turu": "scenicView",
  "camlihemsin-gezi-rehberi": "alpineLake",
  "rize-turu-hazirlik-listesi": "lakeReflection",
  "gunubirlik-yayla-turu-fiyatlari": "localFood",
  "rize-kackarli-tur-rotasi": "heroMountain",
};

export function getGuideCoverImage(slug: string, width = 1200): string {
  const key = GUIDE_COVER_MAP[slug] ?? "mistyValley";
  return stockImage(key, width);
}
