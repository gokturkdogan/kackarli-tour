import { AdminHeader } from "@/components/admin/admin-header";
import { CategoryForm } from "@/components/admin/category-form";

export default function NewCategoryPage() {
  return (
    <>
      <AdminHeader title="Yeni Kategori" description="Yeni tur kategorisi oluşturun" />
      <div className="p-6">
        <CategoryForm />
      </div>
    </>
  );
}
