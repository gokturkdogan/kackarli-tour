"use server";

import { revalidatePath } from "next/cache";
import { Prisma } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import { startOfToday } from "@/lib/date-helpers";
import { resolveAdultPrice, resolveChildPrice } from "@/lib/pricing";
import { reservationSchema, type ReservationFormData } from "@/lib/validations";
import type { ActionResult } from "@/actions/types";

export async function createReservation(
  data: ReservationFormData
): Promise<ActionResult<{ id: string }>> {
  try {
    const parsed = reservationSchema.safeParse(data);
    if (!parsed.success) {
      return { success: false, error: parsed.error.issues[0]?.message ?? "Geçersiz veri" };
    }

    const { tourId, scheduleId, adultCount, childCount } = parsed.data;
    const guestCount = adultCount + childCount;
    const today = startOfToday();

    const result = await prisma.$transaction(async (tx) => {
      const schedule = await tx.tourSchedule.findFirst({
        where: {
          id: scheduleId,
          tourId,
          isActive: true,
          startDate: { gte: today },
        },
        include: { tour: true },
      });

      if (!schedule) {
        throw new Error("Seçilen tur tarihi bulunamadı veya artık geçerli değil");
      }

      const spotsLeft = schedule.capacity - schedule.reservedCount;
      if (guestCount > spotsLeft) {
        throw new Error(`Bu tarihte yalnızca ${spotsLeft} kişilik kontenjan kaldı`);
      }

      const adultPrice = resolveAdultPrice(schedule.price, schedule.tour.price);
      const childPrice = resolveChildPrice(
        schedule.childPrice,
        schedule.tour.childPrice,
        adultPrice
      );

      const totalPrice = adultCount * adultPrice + childCount * childPrice;

      const reservation = await tx.reservation.create({
        data: {
          firstName: parsed.data.firstName.trim(),
          lastName: parsed.data.lastName.trim(),
          phone: parsed.data.phone.trim(),
          email: parsed.data.email.trim().toLowerCase(),
          tourId,
          scheduleId,
          adultCount,
          childCount,
          boardingPoint: parsed.data.boardingPoint?.trim() || null,
          note: parsed.data.note?.trim() || null,
          totalPrice: new Prisma.Decimal(totalPrice),
          status: "PENDING",
        },
      });

      await tx.tourSchedule.update({
        where: { id: scheduleId },
        data: { reservedCount: { increment: guestCount } },
      });

      return reservation;
    });

    revalidatePath("/rezervasyon");
    revalidatePath("/admin/schedules");
    revalidatePath("/admin");

    return { success: true, data: { id: result.id } };
  } catch (error) {
    if (error instanceof Error && error.message) {
      return { success: false, error: error.message };
    }
    return { success: false, error: "Rezervasyon oluşturulurken bir hata oluştu" };
  }
}
