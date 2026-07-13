import { destinations } from "@/lib/home-data";

export function DestinationMarquee() {
  const items = [...destinations, ...destinations];

  return (
    <div className="w-full max-w-full overflow-hidden bg-forest-800 border-y border-forest-700/50 py-4">
      <div className="flex w-max animate-marquee whitespace-nowrap will-change-transform">
        {items.map((dest, i) => (
          <span
            key={`${dest}-${i}`}
            className="inline-flex items-center mx-4 sm:mx-6 text-cream/60 text-xs sm:text-sm font-medium tracking-wide shrink-0"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-sage-400 mr-2 sm:mr-3 shrink-0" />
            {dest}
          </span>
        ))}
      </div>
    </div>
  );
}
