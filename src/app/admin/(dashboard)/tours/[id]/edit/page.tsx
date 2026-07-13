import { notFound } from "next/navigation";
import { AdminHeader } from "@/components/admin/admin-header";
import { TourForm } from "@/components/admin/tour-form";
import { TourImageManager } from "@/components/admin/tour-image-manager";
import { getTourById } from "@/actions/tours";
import { getActiveCategories } from "@/actions/categories";

interface EditTourPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditTourPage({ params }: EditTourPageProps) {
  const { id } = await params;
  const [tour, categories] = await Promise.all([
    getTourById(id),
    getActiveCategories(),
  ]);

  if (!tour) notFound();

  const formData = {
    id: tour.id,
    title: tour.title,
    slug: tour.slug,
    description: tour.description,
    shortDescription: tour.shortDescription ?? "",
    type: tour.type,
    categoryId: tour.categoryId,
    price: Number(tour.price),
    childPrice: tour.childPrice ? Number(tour.childPrice) : undefined,
    duration: tour.duration ?? "",
    coverImageUrl: tour.coverImageUrl ?? undefined,
    includedServices: tour.includedServices ?? "",
    excludedServices: tour.excludedServices ?? "",
    boardingPoints: tour.boardingPoints ?? "",
    isActive: tour.isActive,
    sortOrder: tour.sortOrder,
    itinerary: tour.itinerary.map((item) => ({
      dayNumber: item.dayNumber,
      title: item.title,
      description: item.description,
      sortOrder: item.sortOrder,
    })),
  };

  return (
    <>
      <AdminHeader title="Tur Düzenle" description={tour.title} />
      <div className="p-6">
        <TourForm categories={categories} initialData={formData} />
        <TourImageManager tourId={tour.id} images={tour.images} />
      </div>
    </>
  );
}
