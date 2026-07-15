import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Ad en az 2 karakter olmalıdır"),
  email: z.string().email("Geçerli bir e-posta adresi giriniz"),
  phone: z.string().optional(),
  subject: z.string().optional(),
  message: z.string().min(10, "Mesaj en az 10 karakter olmalıdır"),
});

export type ContactFormData = z.infer<typeof contactSchema>;

export const reservationSchema = z.object({
  tourId: z.string().min(1, "Tur seçimi gereklidir"),
  scheduleId: z.string().min(1, "Tur tarihi seçimi gereklidir"),
  firstName: z.string().min(2, "Ad en az 2 karakter olmalıdır"),
  lastName: z.string().min(2, "Soyad en az 2 karakter olmalıdır"),
  phone: z
    .string()
    .min(10, "Geçerli bir telefon numarası giriniz")
    .regex(/^[\d\s+()-]+$/, "Geçerli bir telefon numarası giriniz"),
  email: z.string().email("Geçerli bir e-posta adresi giriniz"),
  adultCount: z.number().int().min(1, "En az 1 yetişkin olmalıdır"),
  childCount: z.number().int().min(0),
  boardingPoint: z.string().optional(),
  note: z.string().max(1000).optional(),
});

export type ReservationFormData = z.infer<typeof reservationSchema>;
