"use client";

import dynamic from "next/dynamic";
import type { ReservationFormProps } from "@/components/public/reservation-form";

const ReservationForm = dynamic(
  () =>
    import("@/components/public/reservation-form").then((mod) => mod.ReservationForm),
  {
    ssr: false,
    loading: () => (
      <div className="py-16 text-center text-muted-foreground">Form yükleniyor...</div>
    ),
  }
);

export function ReservationFormLoader(props: ReservationFormProps) {
  return <ReservationForm {...props} />;
}
