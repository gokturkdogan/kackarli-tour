"use server";

import { prisma } from "@/lib/prisma";
import { contactSchema, type ContactFormData } from "@/lib/validations";

export type ContactActionResult =
  | { success: true }
  | { success: false; error: string };

export async function submitContactMessage(
  data: ContactFormData
): Promise<ContactActionResult> {
  try {
    const parsed = contactSchema.safeParse(data);
    if (!parsed.success) {
      return {
        success: false,
        error: parsed.error.issues[0]?.message ?? "Geçersiz form verisi",
      };
    }

    await prisma.contactMessage.create({
      data: {
        name: parsed.data.name,
        email: parsed.data.email,
        phone: parsed.data.phone || null,
        subject: parsed.data.subject || null,
        message: parsed.data.message,
      },
    });

    return { success: true };
  } catch {
    return {
      success: false,
      error: "Mesajınız gönderilirken bir hata oluştu. Lütfen tekrar deneyin.",
    };
  }
}
