import Image from "next/image";
import { cn } from "@/lib/utils";

/** Optimized logo — display ~44–48px tall; source resized for fast decode. */
export const SITE_LOGO_SRC = "/images/kackarli-tour-logo.png";

const LOGO_WIDTH = 400;
const LOGO_HEIGHT = 133;

interface SiteLogoProps {
  className?: string;
  priority?: boolean;
  /** Slightly lifts visibility on dark hero/video backgrounds. */
  onDark?: boolean;
}

export function SiteLogo({ className, priority = false, onDark = false }: SiteLogoProps) {
  return (
    <Image
      src={SITE_LOGO_SRC}
      alt="Kaçkarlı Tour"
      width={LOGO_WIDTH}
      height={LOGO_HEIGHT}
      priority={priority}
      className={cn(
        "h-11 sm:h-12 w-auto shrink-0 bg-transparent object-contain object-left",
        onDark && "drop-shadow-[0_2px_10px_rgba(0,0,0,0.35)]",
        className
      )}
    />
  );
}
