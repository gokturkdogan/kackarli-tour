"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  CalendarDays,
  CheckCircle2,
  Loader2,
  MapPin,
  Send,
  Users,
} from "lucide-react";
import { AnimateIn } from "@/components/public/animate-in";
import { ReservationDateCalendar } from "@/components/public/reservation-date-calendar";
import { PageContainer } from "@/components/public/page-container";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { formatScheduleLabel } from "@/lib/date-helpers";
import { formatPrice, tourTypeLabel } from "@/lib/utils-helpers";
import { reservationSchema, type ReservationFormData } from "@/lib/validations";
import { createReservation } from "@/actions/reservations";
import type { PublicTourReservationOption } from "@/lib/tour-types";

function findInitialTour(
  tours: PublicTourReservationOption[],
  slug?: string
): PublicTourReservationOption | undefined {
  const bookableTours = tours.filter((tour) => tour.schedules.length > 0);

  if (slug) {
    const urlTour = tours.find((t) => t.slug === slug);
    if (urlTour && urlTour.schedules.length > 0) return urlTour;
    return undefined;
  }

  return bookableTours[0];
}

interface ReservationFormProps {
  tours: PublicTourReservationOption[];
  initialTourSlug?: string;
  initialScheduleId?: string;
}

const fieldInputClass =
  "h-11 bg-forest-50/40 border-forest-100 placeholder:text-muted-foreground/60 focus-visible:bg-white focus-visible:border-sage-400 focus-visible:ring-sage-400/20";

const fieldLabelClass = "text-sm font-medium text-forest-800";

export function ReservationForm({
  tours,
  initialTourSlug,
  initialScheduleId,
}: ReservationFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const initialTour = findInitialTour(tours, initialTourSlug);
  const initialSchedule =
    initialTour?.schedules.find((s) => s.id === initialScheduleId) ??
    initialTour?.schedules[0];

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ReservationFormData>({
    resolver: zodResolver(reservationSchema),
    defaultValues: {
      tourId: initialTour?.id ?? "",
      scheduleId: initialSchedule?.id ?? "",
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      adultCount: 1,
      childCount: 0,
      boardingPoint: initialTour?.boardingPoints[0] ?? "",
      note: "",
    },
  });

  const tourId = watch("tourId");
  const scheduleId = watch("scheduleId");
  const adultCount = watch("adultCount");
  const childCount = watch("childCount");

  const bookableTours = useMemo(
    () => tours.filter((tour) => tour.schedules.length > 0),
    [tours]
  );

  const selectedTour = useMemo(() => {
    if (tourId) {
      return tours.find((t) => t.id === tourId) ?? bookableTours[0];
    }
    return bookableTours[0];
  }, [tours, tourId, bookableTours]);

  const selectedSchedule = useMemo(
    () => selectedTour?.schedules.find((s) => s.id === scheduleId),
    [selectedTour, scheduleId]
  );

  useEffect(() => {
    if (!selectedTour) return;
    const validSchedule = selectedTour.schedules.find((s) => s.id === scheduleId);
    if (!validSchedule) {
      setValue("scheduleId", selectedTour.schedules[0]?.id ?? "");
    }
  }, [selectedTour, scheduleId, setValue]);

  useEffect(() => {
    if (!tourId && bookableTours[0]) {
      setValue("tourId", bookableTours[0].id);
      setValue("scheduleId", bookableTours[0].schedules[0]?.id ?? "");
      setValue("boardingPoint", bookableTours[0].boardingPoints[0] ?? "");
    }
  }, [tourId, bookableTours, setValue]);

  useEffect(() => {
    const tour = findInitialTour(tours, initialTourSlug);
    if (!tour) return;

    setValue("tourId", tour.id);
    const schedule =
      tour.schedules.find((s) => s.id === initialScheduleId) ?? tour.schedules[0];
    if (schedule) setValue("scheduleId", schedule.id);
    setValue("boardingPoint", tour.boardingPoints[0] ?? "");
  }, [initialTourSlug, initialScheduleId, tours, setValue]);

  const pricing = useMemo(() => {
    if (!selectedSchedule) {
      return { adultPrice: 0, childPrice: 0, total: 0 };
    }
    const adultPrice = selectedSchedule.adultPrice;
    const childPrice = selectedSchedule.childPrice;
    return {
      adultPrice,
      childPrice,
      total: adultCount * adultPrice + childCount * childPrice,
    };
  }, [selectedSchedule, adultCount, childCount]);

  const maxGuests = selectedSchedule?.spotsLeft ?? 1;

  function adjustCount(field: "adultCount" | "childCount", delta: number) {
    const current = field === "adultCount" ? adultCount : childCount;
    const other = field === "adultCount" ? childCount : adultCount;
    const next = current + delta;

    if (field === "adultCount" && next < 1) return;
    if (field === "childCount" && next < 0) return;
    if (next + other > maxGuests) {
      toast.error(`Bu tarihte en fazla ${maxGuests} kişi rezervasyon yapılabilir`);
      return;
    }

    setValue(field, next);
  }

  async function onSubmit(data: ReservationFormData) {
    const result = await createReservation(data);
    if (result.success) {
      setSubmitted(true);
      toast.success("Rezervasyon talebiniz alındı!");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      toast.error(result.error);
    }
  }

  if (tours.length === 0 || bookableTours.length === 0) {
    return null;
  }

  if (submitted) {
    return (
      <section className="py-16 sm:py-20 bg-mist">
        <PageContainer>
          <AnimateIn className="max-w-lg mx-auto text-center rounded-3xl bg-white border border-forest-100 p-10 shadow-xl">
            <div className="w-16 h-16 rounded-full bg-sage-100 flex items-center justify-center mx-auto mb-5">
              <CheckCircle2 className="h-8 w-8 text-forest-600" />
            </div>
            <h2 className="text-2xl font-bold text-forest-900 mb-2">Talebiniz Alındı!</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Rezervasyon talebiniz ekibimize iletildi. En kısa sürede telefon veya e-posta
              ile dönüş yapacağız.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/"
                className={cn(buttonVariants({ variant: "outline" }), "border-forest-300")}
              >
                Ana Sayfa
              </Link>
              <Link
                href="/turlar"
                className={cn(buttonVariants(), "bg-forest-600 hover:bg-forest-700")}
              >
                Turları İncele
              </Link>
            </div>
          </AnimateIn>
        </PageContainer>
      </section>
    );
  }

  return (
    <section className="py-12 sm:py-16 bg-mist relative overflow-hidden">
      <div className="absolute top-0 right-0 w-72 h-72 bg-sage-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-forest-100/40 rounded-full blur-3xl pointer-events-none" />

      <PageContainer className="relative">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-10 items-start">
            <div className="lg:col-span-2 space-y-6">
              {selectedTour && (
                <AnimateIn delay={40}>
                  <div className="rounded-2xl bg-white border border-forest-100 overflow-hidden shadow-sm">
                    <div className="p-5 sm:p-6 border-b border-forest-100">
                      <div className="flex flex-col sm:flex-row">
                        {selectedTour.image && (
                          <div className="relative h-36 sm:h-auto sm:w-44 shrink-0 rounded-xl overflow-hidden sm:mr-5">
                            <Image
                              src={selectedTour.image}
                              alt={selectedTour.title}
                              fill
                              className="object-cover"
                              sizes="(max-width: 640px) 100vw, 176px"
                            />
                          </div>
                        )}
                        <div className="flex-1 sm:pt-0 pt-4">
                          <p className="text-[10px] uppercase tracking-widest text-forest-500 font-semibold mb-1">
                            Seçilen Tur
                          </p>
                          <h2 className="text-lg font-bold text-forest-900">{selectedTour.title}</h2>
                          {selectedTour.subtitle && (
                            <p className="text-sm text-muted-foreground mt-1">
                              {selectedTour.subtitle}
                            </p>
                          )}
                          <div className="flex flex-wrap gap-2 mt-3 text-xs text-forest-600">
                            <span className="inline-flex items-center gap-1 rounded-full bg-forest-50 border border-forest-100 px-2.5 py-1">
                              {tourTypeLabel(selectedTour.type)}
                            </span>
                            {selectedTour.duration && (
                              <span className="inline-flex items-center gap-1 rounded-full bg-forest-50 border border-forest-100 px-2.5 py-1">
                                <CalendarDays className="h-3 w-3" />
                                {selectedTour.duration}
                              </span>
                            )}
                            <span className="inline-flex items-center gap-1 rounded-full bg-sage-50 border border-sage-200 px-2.5 py-1 text-forest-700 font-medium">
                              {selectedTour.schedules.length} açık tarih
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </AnimateIn>
              )}

              {/* Date & guests */}
              <AnimateIn delay={80}>
                <div className="rounded-2xl bg-white border border-forest-100 p-4 sm:p-5 shadow-sm">
                  <h2 className="text-lg font-bold text-forest-900 mb-3">Tarih & Kişi Sayısı</h2>

                  {selectedTour && selectedTour.schedules.length > 0 ? (
                    <ReservationDateCalendar
                      key={selectedTour.id}
                      schedules={selectedTour.schedules}
                      selectedScheduleId={scheduleId}
                      onSelectSchedule={(id) => setValue("scheduleId", id, { shouldValidate: true })}
                      adultCount={adultCount}
                      childCount={childCount}
                      maxGuests={maxGuests}
                      adultUnitPrice={pricing.adultPrice}
                      childUnitPrice={pricing.childPrice}
                      onAdjustCount={adjustCount}
                    />
                  ) : (
                    <p className="text-sm text-muted-foreground">Bu tur için açık tarih yok.</p>
                  )}
                  {errors.scheduleId && (
                    <p className="text-sm text-destructive mt-2">{errors.scheduleId.message}</p>
                  )}
                </div>
              </AnimateIn>

              {/* Boarding + contact */}
              <AnimateIn delay={120}>
                <div className="rounded-2xl bg-white border border-forest-100 p-4 sm:p-5 shadow-sm space-y-4">
                  <h2 className="text-lg font-bold text-forest-900">İletişim & Detaylar</h2>

                  {selectedTour && selectedTour.boardingPoints.length > 0 && (
                    <div className="space-y-1.5">
                      <Label className={fieldLabelClass}>Biniş Noktası</Label>
                      <Select
                        value={watch("boardingPoint") ?? ""}
                        onValueChange={(v) => v && setValue("boardingPoint", v)}
                      >
                        <SelectTrigger className={cn(fieldInputClass, "w-full")}>
                          <SelectValue placeholder="Biniş noktası seçin" />
                        </SelectTrigger>
                        <SelectContent>
                          {selectedTour.boardingPoints.map((point) => (
                            <SelectItem key={point} value={point}>
                              {point}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="firstName" className={fieldLabelClass}>
                        Ad *
                      </Label>
                      <Input
                        id="firstName"
                        className={fieldInputClass}
                        placeholder="Adınız"
                        {...register("firstName")}
                        disabled={isSubmitting}
                      />
                      {errors.firstName && (
                        <p className="text-xs text-destructive">{errors.firstName.message}</p>
                      )}
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="lastName" className={fieldLabelClass}>
                        Soyad *
                      </Label>
                      <Input
                        id="lastName"
                        className={fieldInputClass}
                        placeholder="Soyadınız"
                        {...register("lastName")}
                        disabled={isSubmitting}
                      />
                      {errors.lastName && (
                        <p className="text-xs text-destructive">{errors.lastName.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="phone" className={fieldLabelClass}>
                        Telefon *
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        className={fieldInputClass}
                        placeholder="05XX XXX XX XX"
                        {...register("phone")}
                        disabled={isSubmitting}
                      />
                      {errors.phone && (
                        <p className="text-xs text-destructive">{errors.phone.message}</p>
                      )}
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="email" className={fieldLabelClass}>
                        E-posta *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        className={fieldInputClass}
                        placeholder="ornek@email.com"
                        {...register("email")}
                        disabled={isSubmitting}
                      />
                      {errors.email && (
                        <p className="text-xs text-destructive">{errors.email.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="note" className={fieldLabelClass}>
                      Not <span className="font-normal text-muted-foreground">(opsiyonel)</span>
                    </Label>
                    <Textarea
                      id="note"
                      rows={3}
                      className={cn(
                        fieldInputClass,
                        "min-h-[96px] h-auto py-2.5 resize-none"
                      )}
                      placeholder="Özel istekleriniz varsa yazabilirsiniz..."
                      {...register("note")}
                      disabled={isSubmitting}
                    />
                  </div>
                </div>
              </AnimateIn>
            </div>

            {/* Summary sidebar */}
            <div className="lg:col-span-1">
              <AnimateIn delay={200}>
                <div className="sticky top-24 rounded-2xl bg-white border border-forest-100 shadow-xl overflow-hidden">
                  {selectedTour?.image && (
                    <div className="relative h-36">
                      <Image
                        src={selectedTour.image}
                        alt={selectedTour.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 360px"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-forest-900/80 to-transparent" />
                      <div className="absolute bottom-3 left-4 right-4">
                        <p className="text-cream font-bold text-sm leading-snug">
                          {selectedTour.title}
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="p-5 sm:p-6 space-y-5">
                    {!selectedTour?.image && selectedTour && (
                      <div>
                        <p className="font-bold text-forest-900">{selectedTour.title}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {tourTypeLabel(selectedTour.type)}
                        </p>
                      </div>
                    )}

                    {selectedSchedule && (
                      <div className="rounded-xl bg-forest-50 border border-forest-100 p-4 space-y-2">
                        <div className="flex items-start gap-2">
                          <CalendarDays className="h-4 w-4 text-forest-600 mt-0.5 shrink-0" />
                          <div>
                            <p className="text-xs text-muted-foreground uppercase tracking-wider">
                              Seçilen Tarih
                            </p>
                            <p className="text-sm font-medium text-forest-900 leading-snug">
                              {formatScheduleLabel(
                                new Date(selectedSchedule.startDate),
                                selectedSchedule.endDate
                                  ? new Date(selectedSchedule.endDate)
                                  : null
                              )}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Users className="h-3.5 w-3.5" />
                          {adultCount} yetişkin
                          {childCount > 0 ? ` · ${childCount} çocuk` : ""}
                        </div>
                        {watch("boardingPoint") && (
                          <div className="flex items-start gap-2 text-xs text-muted-foreground">
                            <MapPin className="h-3.5 w-3.5 mt-0.5 shrink-0" />
                            {watch("boardingPoint")}
                          </div>
                        )}
                      </div>
                    )}

                    <div className="space-y-2 border-t border-forest-100 pt-4">
                      {adultCount > 0 && (
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">
                            Yetişkin × {adultCount}
                          </span>
                          <span className="font-medium text-forest-900">
                            {formatPrice(pricing.adultPrice * adultCount)}
                          </span>
                        </div>
                      )}
                      {childCount > 0 && (
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Çocuk × {childCount}</span>
                          <span className="font-medium text-forest-900">
                            {formatPrice(pricing.childPrice * childCount)}
                          </span>
                        </div>
                      )}
                      <div className="flex justify-between items-end pt-2">
                        <span className="font-semibold text-forest-900">Toplam</span>
                        <span className="text-2xl font-bold text-forest-900">
                          {formatPrice(pricing.total)}
                        </span>
                      </div>
                      <p className="text-[10px] text-muted-foreground leading-snug">
                        Onay sonrası ödeme detayları sizinle paylaşılacaktır.
                      </p>
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting || !selectedSchedule}
                      className="w-full h-12 bg-sage-500 hover:bg-sage-400 text-white font-bold"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Gönderiliyor...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          Rezervasyon Talebi Gönder
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </AnimateIn>
            </div>
          </div>
        </form>
      </PageContainer>
    </section>
  );
}
