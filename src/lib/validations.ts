import { z } from "zod";

export const tourTypeEnum = z.enum(["DAY_TRIP", "ACCOMMODATION"]);

export const categorySchema = z.object({
  name: z.string().min(2, "Kategori adı en az 2 karakter olmalıdır"),
  slug: z
    .string()
    .min(2, "Slug en az 2 karakter olmalıdır")
    .regex(/^[a-z0-9-]+$/, "Slug yalnızca küçük harf, rakam ve tire içerebilir"),
  description: z.string().optional(),
  type: tourTypeEnum,
  isActive: z.boolean(),
  sortOrder: z.number().int().min(0),
});

export type CategoryFormData = z.infer<typeof categorySchema>;

export const itineraryItemSchema = z.object({
  dayNumber: z.number().int().min(1),
  title: z.string().min(1, "Başlık gereklidir"),
  description: z.string().min(1, "Açıklama gereklidir"),
  sortOrder: z.number().int().min(0),
});

export const tourSchema = z.object({
  title: z.string().min(3, "Tur başlığı en az 3 karakter olmalıdır"),
  slug: z
    .string()
    .min(2, "Slug en az 2 karakter olmalıdır")
    .regex(/^[a-z0-9-]+$/, "Slug yalnızca küçük harf, rakam ve tire içerebilir"),
  description: z.string().min(10, "Açıklama en az 10 karakter olmalıdır"),
  shortDescription: z.string().optional(),
  type: tourTypeEnum,
  categoryId: z.string().min(1, "Kategori seçiniz"),
  price: z.number().positive("Fiyat pozitif olmalıdır"),
  childPrice: z.number().positive().optional(),
  duration: z.string().optional(),
  coverImageUrl: z.string().url().optional(),
  includedServices: z.string().optional(),
  excludedServices: z.string().optional(),
  boardingPoints: z.string().optional(),
  isActive: z.boolean(),
  sortOrder: z.number().int().min(0),
  itinerary: z.array(itineraryItemSchema).optional(),
});

export type TourFormData = z.infer<typeof tourSchema>;

export const loginSchema = z.object({
  email: z.string().email("Geçerli bir e-posta adresi giriniz"),
  password: z.string().min(6, "Şifre en az 6 karakter olmalıdır"),
});

export type LoginFormData = z.infer<typeof loginSchema>;
