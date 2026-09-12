"use client";

import { useState } from "react";
import Image, { type ImageProps } from "next/image";
import { stockImage, type StockPhotoKey } from "@/lib/stock-images";

interface SafeImageProps extends Omit<ImageProps, "src" | "onError"> {
  src: string;
  fallbackKey?: StockPhotoKey;
}

export function SafeImage({
  src,
  fallbackKey = "mistyValley",
  alt,
  ...props
}: SafeImageProps) {
  const [currentSrc, setCurrentSrc] = useState(src);

  return (
    <Image
      {...props}
      src={currentSrc}
      alt={alt}
      onError={() => {
        const fallback = stockImage(fallbackKey, 1200);
        if (currentSrc !== fallback) {
          setCurrentSrc(fallback);
        }
      }}
    />
  );
}
