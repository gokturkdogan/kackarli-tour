"use client";

import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { formatDateLabel, toDateInputValue } from "@/lib/date-helpers";
import { formatPrice } from "@/lib/utils-helpers";
import type { PublicScheduleOption } from "@/lib/tour-types";

const WEEKDAY_LABELS = ["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"];

interface ReservationDateCalendarProps {
  schedules: PublicScheduleOption[];
  selectedScheduleId: string;
  onSelectSchedule: (scheduleId: string) => void;
  adultCount: number;
  maxGuests: number;
  adultUnitPrice: number;
  onAdjustAdultCount: (delta: number) => void;
}

function getMonthGrid(month: Date): { date: Date; inMonth: boolean }[] {
  const year = month.getFullYear();
  const monthIndex = month.getMonth();
  const firstDay = new Date(year, monthIndex, 1);
  const lastDay = new Date(year, monthIndex + 1, 0);
  const startOffset = (firstDay.getDay() + 6) % 7;
  const cells: { date: Date; inMonth: boolean }[] = [];

  for (let i = startOffset; i > 0; i--) {
    cells.push({ date: new Date(year, monthIndex, 1 - i), inMonth: false });
  }

  for (let day = 1; day <= lastDay.getDate(); day++) {
    cells.push({ date: new Date(year, monthIndex, day), inMonth: true });
  }

  while (cells.length % 7 !== 0) {
    const next = cells.length - startOffset - lastDay.getDate() + 1;
    cells.push({ date: new Date(year, monthIndex + 1, next), inMonth: false });
  }

  return cells;
}

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function formatCompactPrice(price: number): string {
  return `${new Intl.NumberFormat("tr-TR", { maximumFractionDigits: 0 }).format(price)}₺`;
}

function GuestStepper({
  label,
  hint,
  value,
  min,
  canIncrease,
  onDecrease,
  onIncrease,
}: {
  label: string;
  hint?: string;
  value: number;
  min: number;
  canIncrease: boolean;
  onDecrease: () => void;
  onIncrease: () => void;
}) {
  return (
    <div className="flex items-center justify-between gap-2 rounded-lg border border-forest-100 bg-white px-2.5 py-2 min-w-0">
      <div className="min-w-0">
        <p className="text-xs font-semibold text-forest-900 leading-none">{label}</p>
        {hint && <p className="text-[10px] text-muted-foreground mt-0.5 truncate">{hint}</p>}
      </div>
      <div className="flex items-center gap-1.5 shrink-0">
        <button
          type="button"
          onClick={onDecrease}
          disabled={value <= min}
          className="w-7 h-7 rounded-md border border-forest-200 flex items-center justify-center text-forest-700 hover:bg-forest-50 disabled:opacity-40"
          aria-label={`${label} azalt`}
        >
          <Minus className="h-3.5 w-3.5" />
        </button>
        <span className="w-5 text-center text-sm font-bold text-forest-900 tabular-nums">{value}</span>
        <button
          type="button"
          onClick={onIncrease}
          disabled={!canIncrease}
          className="w-7 h-7 rounded-md border border-forest-200 flex items-center justify-center text-forest-700 hover:bg-forest-50 disabled:opacity-40"
          aria-label={`${label} artır`}
        >
          <Plus className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}

export function ReservationDateCalendar({
  schedules,
  selectedScheduleId,
  onSelectSchedule,
  adultCount,
  maxGuests,
  adultUnitPrice,
  onAdjustAdultCount,
}: ReservationDateCalendarProps) {
  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const scheduleByDate = useMemo(() => {
    const map = new Map<string, PublicScheduleOption>();
    for (const schedule of schedules) {
      const dateKey = toDateInputValue(new Date(schedule.startDate));
      const existing = map.get(dateKey);
      if (!existing || schedule.spotsLeft > existing.spotsLeft) {
        map.set(dateKey, schedule);
      }
    }
    return map;
  }, [schedules]);

  const selectedSchedule = schedules.find((s) => s.id === selectedScheduleId);
  const canAddGuest = adultCount < maxGuests;

  const [month, setMonth] = useState(() => {
    const ref = selectedSchedule ?? schedules[0];
    if (!ref) return new Date(today.getFullYear(), today.getMonth(), 1);
    const d = new Date(ref.startDate);
    return new Date(d.getFullYear(), d.getMonth(), 1);
  });

  useEffect(() => {
    if (!selectedSchedule) return;
    const d = new Date(selectedSchedule.startDate);
    const nextMonth = new Date(d.getFullYear(), d.getMonth(), 1);
    setMonth((prev) => {
      if (
        prev.getFullYear() === nextMonth.getFullYear() &&
        prev.getMonth() === nextMonth.getMonth()
      ) {
        return prev;
      }
      return nextMonth;
    });
  }, [selectedSchedule]);

  const monthLabel = month.toLocaleDateString("tr-TR", { month: "long", year: "numeric" });
  const cells = getMonthGrid(month);

  const canGoPrev =
    month.getFullYear() > today.getFullYear() ||
    (month.getFullYear() === today.getFullYear() && month.getMonth() > today.getMonth());

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-2">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => canGoPrev && setMonth(new Date(month.getFullYear(), month.getMonth() - 1, 1))}
          disabled={!canGoPrev}
          className="h-8 w-8 rounded-lg shrink-0"
          aria-label="Önceki ay"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <p className="text-sm font-bold text-forest-900 capitalize">{monthLabel}</p>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() + 1, 1))}
          className="h-8 w-8 rounded-lg shrink-0"
          aria-label="Sonraki ay"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      <div className="rounded-xl border border-forest-100 bg-white p-1.5 sm:p-2">
        <div className="grid grid-cols-7 gap-0.5 sm:gap-1 mb-1">
          {WEEKDAY_LABELS.map((day) => (
            <div
              key={day}
              className="py-1 text-center text-[10px] font-semibold text-muted-foreground"
            >
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-0.5 sm:gap-1">
          {cells.map(({ date, inMonth }) => {
            const dateKey = toDateInputValue(date);
            const schedule = scheduleByDate.get(dateKey);
            const isPast = date < today;
            const isToday = isSameDay(date, today);
            const isSelected = schedule?.id === selectedScheduleId;
            const isAvailable = !!schedule && !isPast && schedule.spotsLeft > 0;
            const isFull = !!schedule && schedule.spotsLeft <= 0;
            const lowSpots = isAvailable && schedule.spotsLeft <= 3;

            return (
              <button
                key={dateKey + (inMonth ? "" : "-pad")}
                type="button"
                disabled={!isAvailable}
                onClick={() => schedule && onSelectSchedule(schedule.id)}
                className={cn(
                  "relative flex flex-col items-center justify-center min-h-[48px] sm:min-h-[52px] rounded-lg border text-center transition-all px-0.5 py-1",
                  !inMonth && "opacity-25 border-transparent cursor-default",
                  inMonth && !schedule && "border-transparent bg-mist/30 cursor-not-allowed",
                  inMonth && isPast && schedule && "border-transparent bg-stone-50 text-stone-400 cursor-not-allowed",
                  inMonth && isFull && "border-rose-100 bg-rose-50/60 text-rose-400 cursor-not-allowed",
                  isAvailable &&
                    !isSelected &&
                    "border-forest-100/80 bg-forest-50/20 hover:border-sage-400 hover:bg-sage-50/50 cursor-pointer",
                  isSelected && "border-forest-600 bg-forest-600 text-white shadow-md ring-1 ring-sage-400/50",
                  isToday && !isSelected && isAvailable && "ring-1 ring-sage-400/70"
                )}
              >
                <span
                  className={cn(
                    "text-xs font-bold tabular-nums leading-none",
                    isSelected ? "text-white" : "text-forest-900"
                  )}
                >
                  {date.getDate()}
                </span>

                {isAvailable && (
                  <span
                    className={cn(
                      "text-[9px] font-semibold mt-0.5 tabular-nums leading-none",
                      isSelected ? "text-sage-100" : "text-forest-600"
                    )}
                  >
                    {formatCompactPrice(schedule.adultPrice)}
                  </span>
                )}

                {isAvailable && (isSelected || lowSpots) && (
                  <span
                    className={cn(
                      "text-[8px] mt-0.5 leading-none",
                      isSelected ? "text-white/75" : "text-destructive font-medium"
                    )}
                  >
                    {lowSpots ? `${schedule.spotsLeft} yer` : isSelected ? `${schedule.spotsLeft} yer` : null}
                  </span>
                )}

                {isFull && inMonth && (
                  <span className="text-[8px] font-medium text-rose-500 mt-0.5">Dolu</span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="rounded-xl border border-forest-100 bg-gradient-to-br from-forest-50/80 to-white p-3 space-y-3">
        {selectedSchedule ? (
          <div className="flex flex-wrap items-start justify-between gap-2 border-b border-forest-100/80 pb-2">
            <div className="min-w-0">
              <p className="text-[10px] uppercase tracking-wider font-semibold text-forest-600">
                Seçilen tarih
              </p>
              <p className="text-xs font-semibold text-forest-900 capitalize leading-snug">
                {formatDateLabel(toDateInputValue(new Date(selectedSchedule.startDate)))}
              </p>
            </div>
            <p className="text-[10px] text-muted-foreground shrink-0">
              En fazla {maxGuests} kişi
            </p>
          </div>
        ) : (
          <p className="text-xs text-muted-foreground text-center py-1">Önce müsait bir gün seçin</p>
        )}

        <GuestStepper
          label="Kişi Sayısı"
          hint={formatPrice(adultUnitPrice)}
          value={adultCount}
          min={1}
          canIncrease={canAddGuest}
          onDecrease={() => onAdjustAdultCount(-1)}
          onIncrease={() => onAdjustAdultCount(1)}
        />
      </div>

      <div className="flex flex-wrap gap-x-3 gap-y-1 text-[10px] text-muted-foreground">
        <span className="inline-flex items-center gap-1">
          <span className="w-2.5 h-2.5 rounded bg-forest-600" />
          Seçili
        </span>
        <span className="inline-flex items-center gap-1">
          <span className="w-2.5 h-2.5 rounded border border-forest-200 bg-white" />
          Müsait
        </span>
        <span className="inline-flex items-center gap-1">
          <span className="w-2.5 h-2.5 rounded bg-rose-50 border border-rose-100" />
          Dolu
        </span>
      </div>
    </div>
  );
}
