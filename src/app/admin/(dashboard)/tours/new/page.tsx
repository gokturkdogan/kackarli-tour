import { AdminHeader } from "@/components/admin/admin-header";
import { TourForm } from "@/components/admin/tour-form";
import { getActiveCategories } from "@/actions/categories";

export default async function NewTourPage() {
  const categories = await getActiveCategories();

  return (
    <>
      <AdminHeader title="Yeni Tur" description="Yeni tur oluşturun" />
      <div className="p-6">
        <TourForm categories={categories} />
      </div>
    </>
  );
}
