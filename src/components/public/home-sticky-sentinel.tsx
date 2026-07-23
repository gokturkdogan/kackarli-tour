import {
  HOME_STICKY_SENTINEL_ID,
  HOME_STICKY_SENTINEL_OFFSET_VH,
} from "@/lib/home-hero";

/** Marks where the homepage sticky header should appear (IntersectionObserver target). */
export function HomeStickySentinel() {
  return (
    <div aria-hidden className="pointer-events-none w-full">
      <div style={{ height: `${HOME_STICKY_SENTINEL_OFFSET_VH}vh` }} />
      <div id={HOME_STICKY_SENTINEL_ID} className="h-px w-full" />
    </div>
  );
}
