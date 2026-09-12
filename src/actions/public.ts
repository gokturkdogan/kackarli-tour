import { cache } from "react";
import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/prisma";
import { parseMultilineList } from "@/lib/tour-mapper";
import { resolveAdultPrice, resolveChildPrice } from "@/lib/pricing";
import { resolveStockImageUrl } from "@/lib/stock-images";
import { mapTourToPublic } from "@/lib/tour-mapper";
import { startOfToday } from "@/lib/date-helpers";
import type { PublicTour, PublicTourReservationOption } from "@/lib/tour-types";

const tourInclude = {
  itinerary: { orderBy: [{ sortOrder: "asc" as const }, { dayNumber: "asc" as const }] },
};

const loadActivePublicTours = unstable_cache(
  async () => {
    const tours = await prisma.tour.findMany({
      where: { isActive: true },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
      include: tourInclude,
    });

    return tours.map(mapTourToPublic);
  },
  ["active-public-tours"],
  { revalidate: 300 }
);

export const getActivePublicTours = cache(() => loadActivePublicTours());

export async function getActiveDayTripTourCount(): Promise<number> {
  const tours = await getActivePublicTours();
  return tours.filter((tour) => tour.type === "DAY_TRIP").length;
}

export async function getFeaturedTours(limit = 3) {
  return prisma.tour.findMany({
    where: { isActive: true },
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    take: limit,
    include: {
      schedules: {
        where: { isActive: true, startDate: { gte: new Date() } },
        orderBy: { startDate: "asc" },
        take: 1,
      },
    },
  });
}

export const getPublicTourBySlug = cache(async (slug: string): Promise<PublicTour | null> => {
  return unstable_cache(
    async () => {
      const tour = await prisma.tour.findFirst({
        where: { slug, isActive: true },
        include: tourInclude,
      });

      return tour ? mapTourToPublic(tour) : null;
    },
    ["public-tour", slug],
    { revalidate: 300 }
  )();
});

export async function getPrimaryPublicTour(): Promise<PublicTour | null> {
  const tours = await getActivePublicTours();
  return tours[0] ?? null;
}

export async function getActiveTourSlugs(): Promise<string[]> {
  const tours = await getActivePublicTours();
  return tours.map((tour) => tour.slug);
}

export async function getToursForReservation(): Promise<PublicTourReservationOption[]> {
  const today = startOfToday();

  const tours = await prisma.tour.findMany({
    where: { isActive: true },
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    include: {
      schedules: {
        where: { isActive: true, startDate: { gte: today } },
        orderBy: { startDate: "asc" },
      },
    },
  });

  return tours
    .map((tour) => ({
      id: tour.id,
      slug: tour.slug,
      title: tour.title,
      subtitle: tour.subtitle ?? undefined,
      type: tour.type,
      duration: tour.duration ?? undefined,
      image: resolveStockImageUrl(tour.coverImageUrl, 1200),
      boardingPoints: parseMultilineList(tour.boardingPoints),
      defaultAdultPrice: Number(tour.price),
      defaultChildPrice: resolveChildPrice(null, tour.childPrice, Number(tour.price)),
      schedules: tour.schedules
        .filter((s) => s.capacity - s.reservedCount > 0)
        .map((schedule) => {
          const adultPrice = resolveAdultPrice(schedule.price, tour.price);
          const childPrice = resolveChildPrice(
            schedule.childPrice,
            tour.childPrice,
            adultPrice
          );

          return {
            id: schedule.id,
            startDate: schedule.startDate.toISOString(),
            endDate: schedule.endDate?.toISOString(),
            capacity: schedule.capacity,
            reservedCount: schedule.reservedCount,
            spotsLeft: schedule.capacity - schedule.reservedCount,
            adultPrice,
            childPrice,
            hasCustomPrice: schedule.price != null || schedule.childPrice != null,
          };
        }),
    }));
}
