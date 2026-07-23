/**
 * Verified Unsplash stock images (HTTP 200).
 * Use stockImage() so width/quality stay consistent across the site.
 */
const STOCK_PHOTOS = {
  heroMountain: "photo-1506905925346-21bda4d32df4",
  mistyValley: "photo-1470071459604-3b5ec3a7fe05",
  mountainPeaks: "photo-1464822759023-fed622ff2c3b",
  lakeReflection: "photo-1501785888041-af3ef285b470",
  forestPath: "photo-1441974231531-c6227db76b6e",
  alpineLake: "photo-1439066615861-d1af74d74000",
  localFood: "photo-1504674900247-0877df9cc836",
  starryMountains: "photo-1519681393784-d120267933ba",
  naturePanorama: "photo-1469474968028-56623f02e42e",
} as const;

/** Muhlama / yerel kültür — Cloudinary */
export const LOCAL_CULTURE_IMAGE =
  "https://res.cloudinary.com/housrfzh/image/upload/v1784814501/image_tdpnpo.png";

/** Şelale & vadi — Cloudinary */
export const WATERFALL_VALLEY_IMAGE =
  "https://res.cloudinary.com/housrfzh/image/upload/v1784815269/image_srqqa5.png";

/** Kaçkar manzarası — Cloudinary */
export const KACKAR_VIEW_IMAGE =
  "https://res.cloudinary.com/housrfzh/image/upload/v1784815328/image_wqsiss.png";

/** Yayla atmosferi — Cloudinary */
export const YAYLA_ATMOSPHERE_IMAGE =
  "https://res.cloudinary.com/housrfzh/image/upload/v1784815365/image_tc0rhu.png";

export type StockPhotoKey = keyof typeof STOCK_PHOTOS;

export function stockImage(
  key: StockPhotoKey,
  width = 800,
  quality = 80
): string {
  return `https://images.unsplash.com/${STOCK_PHOTOS[key]}?w=${width}&q=${quality}`;
}

export const tourCardFallbacks = [
  stockImage("mistyValley", 800),
  stockImage("mountainPeaks", 800),
  stockImage("forestPath", 800),
] as const;

const LEGACY_BROKEN_PHOTOS: Record<string, StockPhotoKey> = {
  "photo-1454496526348-df8e440a6e24": "forestPath",
};

/** Maps removed Unsplash IDs to verified replacements (e.g. old DB rows). */
export function resolveStockImageUrl(
  url: string | null | undefined,
  width = 800
): string | undefined {
  if (!url) return undefined;

  for (const [brokenId, replacementKey] of Object.entries(LEGACY_BROKEN_PHOTOS)) {
    if (url.includes(brokenId)) {
      return stockImage(replacementKey, width);
    }
  }

  return url;
}
