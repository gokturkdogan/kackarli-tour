import { stockImage, type StockPhotoKey } from "@/lib/stock-images";

const TOUR_COVER_MAP: Record<string, StockPhotoKey> = {
  "ayder-huser-yayla-turu": "mistyValley",
  "pokut-sal-yayla-turu": "plateauHouses",
  "elevit-gito-yayla-turu": "mountainPeaks",
  "batum-sehir-kultur-turu": "coastalCity",
};

export function getTourCoverImage(slug: string, width = 1200): string {
  const key = TOUR_COVER_MAP[slug] ?? "heroMountain";
  return stockImage(key, width);
}

export function getItineraryStopImage(title: string, width = 800): string {
  const t = title.toLocaleLowerCase("tr-TR");

  if (t.includes("zil") || t.includes("kale")) return stockImage("scenicView", width);
  if (t.includes("fırtına") || t.includes("firtina") || t.includes("vadi")) {
    return stockImage("mistyValley", width);
  }
  if (t.includes("ayder") || t.includes("şelale") || t.includes("selale")) {
    return stockImage("waterfall", width);
  }
  if (t.includes("pokut") || t.includes("hüser") || t.includes("huser") || t.includes("sis")) {
    return stockImage("naturePanorama", width);
  }
  if (t.includes("sal") || t.includes("elevit") || t.includes("gito")) {
    return stockImage("plateauHouses", width);
  }
  if (t.includes("batum") || t.includes("şehir") || t.includes("sehir")) {
    return stockImage("coastalCity", width);
  }
  if (t.includes("öğle") || t.includes("ogle") || t.includes("yemek") || t.includes("lezzet")) {
    return stockImage("localFood", width);
  }
  if (t.includes("hareket") || t.includes("biniş") || t.includes("binis") || t.includes("rize")) {
    return stockImage("lakeReflection", width);
  }
  if (t.includes("dönüş") || t.includes("donus") || t.includes("varış") || t.includes("varis")) {
    return stockImage("greenHills", width);
  }
  if (t.includes("çay") || t.includes("cay") || t.includes("mola")) {
    return stockImage("forestPath", width);
  }

  return stockImage("alpineLake", width);
}
