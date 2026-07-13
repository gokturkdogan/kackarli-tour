import { PageContainer } from "@/components/public/page-container";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";
import { formatPrice, tourTypeLabel } from "@/lib/utils-helpers";
import { AnimateIn } from "@/components/public/animate-in";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Tour {
  id: string;
  title: string;
  slug: string;
  shortDescription: string | null;
  description: string;
  type: "DAY_TRIP" | "ACCOMMODATION";
  price: { toString(): string };
  duration: string | null;
  coverImageUrl: string | null;
  schedules: { startDate: Date }[];
}

interface FeaturedToursProps {
  tours: Tour[];
}

const fallbackImages = [
  "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80",
  "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80",
  "https://images.unsplash.com/photo-1454496526348-df8e440a6e24?w=800&q=80",
];

export function FeaturedTours({ tours }: FeaturedToursProps) {
  if (tours.length === 0) return null;

  return (
    <section className="py-24 bg-cream w-full overflow-hidden">
      <PageContainer>
        <AnimateIn className="text-center mb-12 max-w-2xl mx-auto">
          <span className="text-forest-500 text-sm font-medium tracking-widest uppercase">
            Güncel Turlar
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-forest-900 mt-3 mb-3">
            Yaklaşan Turlarımız
          </h2>
          <p className="text-muted-foreground">
            Hemen rezervasyon yapabileceğiniz aktif turlarımıza göz atın.
          </p>
        </AnimateIn>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tours.map((tour, i) => (
            <AnimateIn key={tour.id} delay={i * 100}>
              <Link
                href={`/turlar/${tour.slug}`}
                className="group flex flex-col rounded-2xl overflow-hidden bg-white border border-forest-100 hover:border-forest-300 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={tour.coverImageUrl || fallbackImages[i % fallbackImages.length]}
                    alt={tour.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-900/50 to-transparent" />
                  <Badge className="absolute top-3 left-3 bg-forest-600 text-cream">
                    {tourTypeLabel(tour.type)}
                  </Badge>
                  <div className="absolute bottom-3 right-3 bg-cream/95 backdrop-blur-sm px-3 py-1 rounded-lg">
                    <span className="text-forest-900 font-bold text-sm">
                      {formatPrice(tour.price.toString())}
                    </span>
                  </div>
                </div>

                <div className="p-5 flex flex-col flex-1">
                  <h3 className="text-lg font-semibold text-forest-900 mb-2 group-hover:text-forest-600 transition-colors">
                    {tour.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-4 flex-1">
                    {tour.shortDescription || tour.description}
                  </p>

                  <div className="flex items-center justify-between text-xs text-forest-600">
                    {tour.duration && (
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        {tour.duration}
                      </span>
                    )}
                    {tour.schedules[0] && (
                      <span>
                        {new Date(tour.schedules[0].startDate).toLocaleDateString("tr-TR", {
                          day: "numeric",
                          month: "long",
                        })}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            </AnimateIn>
          ))}
        </div>

        <AnimateIn className="text-center mt-10">
          <Link
            href="/turlar"
            className={cn(
              buttonVariants({ size: "lg" }),
              "bg-forest-600 hover:bg-forest-700 text-cream"
            )}
          >
            Tüm Turları Gör
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </AnimateIn>
      </PageContainer>
    </section>
  );
}
