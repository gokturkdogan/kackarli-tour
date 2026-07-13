import { destinations } from "@/lib/home-data";

export function DestinationMarquee() {
  const items = [...destinations, ...destinations];

  return (
    <div className="bg-forest-800 border-y border-forest-700/50 py-4 overflow-hidden">
      <div className="flex animate-marquee whitespace-nowrap">
        {items.map((dest, i) => (
          <span
            key={`${dest}-${i}`}
            className="inline-flex items-center mx-6 text-cream/60 text-sm font-medium tracking-wide"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-sage-400 mr-3" />
            {dest}
          </span>
        ))}
      </div>
    </div>
  );
}
