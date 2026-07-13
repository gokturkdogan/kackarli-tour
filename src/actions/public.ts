import { prisma } from "@/lib/prisma";

export async function getFeaturedTours(limit = 3) {
  return prisma.tour.findMany({
    where: { isActive: true },
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    take: limit,
    include: {
      category: true,
      schedules: {
        where: { isActive: true, startDate: { gte: new Date() } },
        orderBy: { startDate: "asc" },
        take: 1,
      },
    },
  });
}
