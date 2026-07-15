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

export async function getActivePublicTours(): Promise<PublicTour[]> {
  const tours = await prisma.tour.findMany({
    where: { isActive: true },
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    include: tourInclude,
  });

  return tours.map(mapTourToPublic);
}

export async function getPublicTourBySlug(slug: string): Promise<PublicTour | null> {
  const tour = await prisma.tour.findFirst({
    where: { slug, isActive: true },
    include: tourInclude,
  });

  return tour ? mapTourToPublic(tour) : null;
}

export async function getPrimaryPublicTour(): Promise<PublicTour | null> {
  const tour = await prisma.tour.findFirst({
    where: { isActive: true },
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    include: tourInclude,
  });

  return tour ? mapTourToPublic(tour) : null;
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
    }))
    .filter((tour) => tour.schedules.length > 0);
}
