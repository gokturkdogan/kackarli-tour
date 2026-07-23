export const HOME_HERO_HEADER_ID = "home-hero-header";

/** Sticky header appears after this fraction of viewport height scrolled. */
export const HOME_STICKY_HEADER_REVEAL_VH = 0.88;

export const HOME_STICKY_HEADER_MIN_SCROLL_PX = 620;

export function getHomeStickyHeaderRevealOffset() {
  if (typeof window === "undefined") return HOME_STICKY_HEADER_MIN_SCROLL_PX;
  return Math.max(
    HOME_STICKY_HEADER_MIN_SCROLL_PX,
    window.innerHeight * HOME_STICKY_HEADER_REVEAL_VH
  );
}
