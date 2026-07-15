import type { ItineraryStopType, Tour, TourItineraryItem, TourType } from "@/generated/prisma/client";
import type { PublicRouteStop, PublicTour, RouteStopType } from "@/lib/tour-types";

export function parseMultilineList(value?: string | null): string[] {
  if (!value) return [];
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

const stopTypeMap: Record<ItineraryStopType, RouteStopType> = {
  BOARDING: "boarding",
  STOP: "stop",
  REST: "rest",
  VIEWPOINT: "viewpoint",
  MEAL: "meal",
};

export const routeStopTypeToDb: Record<RouteStopType, ItineraryStopType> = {
  boarding: "BOARDING",
  stop: "STOP",
  rest: "REST",
  viewpoint: "VIEWPOINT",
  meal: "MEAL",
};

export function mapItineraryStopType(type: ItineraryStopType): RouteStopType {
  return stopTypeMap[type];
}

type TourWithItinerary = Tour & {
  itinerary: TourItineraryItem[];
};

export function mapTourToPublic(tour: TourWithItinerary): PublicTour {
  const stops: PublicRouteStop[] = tour.itinerary
    .slice()
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .map((item, index) => ({
      order: index + 1,
      time: item.time ?? "",
      name: item.title,
      type: mapItineraryStopType(item.stopType),
      description: item.description,
      duration: item.duration ?? undefined,
      image: item.imageUrl ?? undefined,
      featured: item.isFeatured,
    }));

  return {
    id: tour.id,
    slug: tour.slug,
    title: tour.title,
    subtitle: tour.subtitle ?? undefined,
    description: tour.description,
    shortDescription: tour.shortDescription ?? undefined,
    type: tour.type as TourType,
    duration: tour.duration ?? undefined,
    distance: tour.distance ?? undefined,
    departureTime: tour.departureTime ?? undefined,
    returnTime: tour.returnTime ?? undefined,
    maxGroupSize: tour.maxGroupSize ?? undefined,
    price: Number(tour.price),
    childPrice: tour.childPrice ? Number(tour.childPrice) : undefined,
    image: tour.coverImageUrl ?? undefined,
    highlights: parseMultilineList(tour.highlights),
    included: parseMultilineList(tour.includedServices),
    excluded: parseMultilineList(tour.excludedServices),
    boardingPoints: parseMultilineList(tour.boardingPoints),
    stops,
    href: `/turlar/${tour.slug}`,
  };
}

export function formatTourTimeRange(tour: Pick<PublicTour, "departureTime" | "returnTime">): string {
  if (tour.departureTime && tour.returnTime) {
    return `${tour.departureTime} – ${tour.returnTime}`;
  }
  return tour.departureTime ?? tour.returnTime ?? "";
}
