"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-auth";
import { categorySchema, type CategoryFormData } from "@/lib/validations";

export type ActionResult<T = void> =
  | { success: true; data?: T }
  | { success: false; error: string };

export async function getCategories() {
  return prisma.category.findMany({
    orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
    include: { _count: { select: { tours: true } } },
  });
}

export async function getActiveCategories() {
  return prisma.category.findMany({
    where: { isActive: true },
    orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
  });
}

export async function getCategoryById(id: string) {
  return prisma.category.findUnique({ where: { id } });
}

export async function createCategory(
  data: CategoryFormData
): Promise<ActionResult<{ id: string }>> {
  try {
    await requireAdmin();
    const parsed = categorySchema.safeParse(data);
    if (!parsed.success) {
      return { success: false, error: parsed.error.issues[0]?.message ?? "Geçersiz veri" };
    }

    const existing = await prisma.category.findUnique({
      where: { slug: parsed.data.slug },
    });
    if (existing) {
      return { success: false, error: "Bu slug zaten kullanılıyor" };
    }

    const category = await prisma.category.create({ data: parsed.data });
    revalidatePath("/admin/categories");
    return { success: true, data: { id: category.id } };
  } catch {
    return { success: false, error: "Kategori oluşturulurken bir hata oluştu" };
  }
}

export async function updateCategory(
  id: string,
  data: CategoryFormData
): Promise<ActionResult> {
  try {
    await requireAdmin();
    const parsed = categorySchema.safeParse(data);
    if (!parsed.success) {
      return { success: false, error: parsed.error.issues[0]?.message ?? "Geçersiz veri" };
    }

    const existing = await prisma.category.findFirst({
      where: { slug: parsed.data.slug, NOT: { id } },
    });
    if (existing) {
      return { success: false, error: "Bu slug zaten kullanılıyor" };
    }

    await prisma.category.update({ where: { id }, data: parsed.data });
    revalidatePath("/admin/categories");
    revalidatePath(`/admin/categories/${id}/edit`);
    return { success: true };
  } catch {
    return { success: false, error: "Kategori güncellenirken bir hata oluştu" };
  }
}

export async function deleteCategory(id: string): Promise<ActionResult> {
  try {
    await requireAdmin();
    const tourCount = await prisma.tour.count({ where: { categoryId: id } });
    if (tourCount > 0) {
      return {
        success: false,
        error: "Bu kategoriye bağlı turlar var. Önce turları silin veya taşıyın.",
      };
    }
    await prisma.category.delete({ where: { id } });
    revalidatePath("/admin/categories");
    return { success: true };
  } catch {
    return { success: false, error: "Kategori silinirken bir hata oluştu" };
  }
}

export async function toggleCategoryActive(id: string): Promise<ActionResult> {
  try {
    await requireAdmin();
    const category = await prisma.category.findUnique({ where: { id } });
    if (!category) {
      return { success: false, error: "Kategori bulunamadı" };
    }
    await prisma.category.update({
      where: { id },
      data: { isActive: !category.isActive },
    });
    revalidatePath("/admin/categories");
    return { success: true };
  } catch {
    return { success: false, error: "Durum güncellenirken bir hata oluştu" };
  }
}
