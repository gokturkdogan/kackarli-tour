import { notFound } from "next/navigation";
import { AdminHeader } from "@/components/admin/admin-header";
import { CategoryForm } from "@/components/admin/category-form";
import { getCategoryById } from "@/actions/categories";

interface EditCategoryPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditCategoryPage({ params }: EditCategoryPageProps) {
  const { id } = await params;
  const category = await getCategoryById(id);

  if (!category) notFound();

  const formData = {
    id: category.id,
    name: category.name,
    slug: category.slug,
    description: category.description ?? "",
    type: category.type,
    isActive: category.isActive,
    sortOrder: category.sortOrder,
  };

  return (
    <>
      <AdminHeader
        title="Kategori Düzenle"
        description={category.name}
      />
      <div className="p-6">
        <CategoryForm initialData={formData} />
      </div>
    </>
  );
}
