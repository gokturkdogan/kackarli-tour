"use client";

import { useRouter } from "next/navigation";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { tourSchema, type TourFormData } from "@/lib/validations";
import { slugify } from "@/lib/utils-helpers";
import { createTour, updateTour } from "@/actions/tours";

interface Category {
  id: string;
  name: string;
  type: string;
}

interface TourFormProps {
  categories: Category[];
  initialData?: TourFormData & { id: string };
}

export function TourForm({ categories, initialData }: TourFormProps) {
  const router = useRouter();
  const isEditing = !!initialData;

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors, isSubmitting },
  } = useForm<TourFormData>({
    resolver: zodResolver(tourSchema),
    defaultValues: initialData ?? {
      title: "",
      slug: "",
      description: "",
      shortDescription: "",
      type: "DAY_TRIP",
      categoryId: "",
      price: 0,
      childPrice: undefined,
      duration: "",
      coverImageUrl: undefined,
      includedServices: "",
      excludedServices: "",
      boardingPoints: "",
      isActive: true,
      sortOrder: 0,
      itinerary: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "itinerary",
  });

  const type = watch("type");
  const categoryId = watch("categoryId");
  const isActive = watch("isActive");

  const filteredCategories = categories.filter(
    (c) => c.type === type || !type
  );

  function handleTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setValue("title", value);
    if (!isEditing) {
      setValue("slug", slugify(value));
    }
  }

  async function onSubmit(data: TourFormData) {
    const result = isEditing
      ? await updateTour(initialData.id, data)
      : await createTour(data);

    if (result.success) {
      toast.success(isEditing ? "Tur güncellendi" : "Tur oluşturuldu");
      if (!isEditing && result.data?.id) {
        router.push(`/admin/tours/${result.data.id}/edit`);
      } else {
        router.push("/admin/tours");
      }
      router.refresh();
    } else {
      toast.error(result.error);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Temel Bilgiler</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Tur Başlığı *</Label>
              <Input
                id="title"
                {...register("title")}
                onChange={handleTitleChange}
                placeholder="Örn: Ayder Yaylası Turu"
              />
              {errors.title && (
                <p className="text-sm text-destructive">{errors.title.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="slug">Slug *</Label>
              <Input id="slug" {...register("slug")} />
              {errors.slug && (
                <p className="text-sm text-destructive">{errors.slug.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="shortDescription">Kısa Açıklama</Label>
              <Input
                id="shortDescription"
                {...register("shortDescription")}
                placeholder="Liste görünümünde gösterilecek kısa açıklama"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Detaylı Açıklama *</Label>
              <Textarea
                id="description"
                {...register("description")}
                rows={5}
                placeholder="Tur hakkında detaylı bilgi..."
              />
              {errors.description && (
                <p className="text-sm text-destructive">
                  {errors.description.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration">Süre</Label>
              <Input
                id="duration"
                {...register("duration")}
                placeholder="Örn: 1 Gün, 2 Gece 3 Gün"
              />
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Kategori ve Fiyat</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Tur Tipi *</Label>
                <Select
                  value={type}
                  onValueChange={(v) => v && setValue("type", v as TourFormData["type"])}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="DAY_TRIP">Günübirlik</SelectItem>
                    <SelectItem value="ACCOMMODATION">Konaklamalı</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Kategori *</Label>
                <Select
                  value={categoryId}
                  onValueChange={(v) => v && setValue("categoryId", v)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Kategori seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    {filteredCategories.map((cat) => (
                      <SelectItem key={cat.id} value={cat.id}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.categoryId && (
                  <p className="text-sm text-destructive">
                    {errors.categoryId.message}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Yetişkin Fiyatı (₺) *</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    {...register("price", { valueAsNumber: true })}
                    min={0}
                  />
                  {errors.price && (
                    <p className="text-sm text-destructive">
                      {errors.price.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="childPrice">Çocuk Fiyatı (₺)</Label>
                  <Input
                    id="childPrice"
                    type="number"
                    step="0.01"
                    {...register("childPrice", { valueAsNumber: true })}
                    min={0}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="sortOrder">Sıralama</Label>
                <Input
                  id="sortOrder"
                  type="number"
                  {...register("sortOrder", { valueAsNumber: true })}
                  min={0}
                />
              </div>

              <div className="flex items-center gap-3">
                <Switch
                  id="isActive"
                  checked={isActive}
                  onCheckedChange={(v) => setValue("isActive", v)}
                />
                <Label htmlFor="isActive">Aktif</Label>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Hizmetler</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="includedServices">Dahil Olan Hizmetler</Label>
                <Textarea
                  id="includedServices"
                  {...register("includedServices")}
                  rows={3}
                  placeholder="Her satıra bir hizmet yazın"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="excludedServices">Dahil Olmayan Hizmetler</Label>
                <Textarea
                  id="excludedServices"
                  {...register("excludedServices")}
                  rows={3}
                  placeholder="Her satıra bir hizmet yazın"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="boardingPoints">Biniş Noktaları</Label>
                <Textarea
                  id="boardingPoints"
                  {...register("boardingPoints")}
                  rows={3}
                  placeholder="Her satıra bir biniş noktası yazın"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Tur Programı</CardTitle>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() =>
              append({
                dayNumber: fields.length + 1,
                title: "",
                description: "",
                sortOrder: fields.length,
              })
            }
          >
            <Plus className="h-4 w-4 mr-1" />
            Gün Ekle
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {fields.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">
              Henüz program eklenmemiş
            </p>
          ) : (
            fields.map((field, index) => (
              <div key={field.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-forest-700">
                    Gün {index + 1}
                  </span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => remove(index)}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Gün No</Label>
                    <Input
                      type="number"
                      {...register(`itinerary.${index}.dayNumber`, { valueAsNumber: true })}
                      min={1}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Başlık</Label>
                    <Input {...register(`itinerary.${index}.title`)} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Açıklama</Label>
                  <Textarea
                    {...register(`itinerary.${index}.description`)}
                    rows={2}
                  />
                </div>
                <Separator />
              </div>
            ))
          )}
        </CardContent>
      </Card>

      <div className="flex gap-3">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="bg-forest-600 hover:bg-forest-700"
        >
          {isSubmitting ? "Kaydediliyor..." : isEditing ? "Güncelle" : "Oluştur"}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.back()}>
          İptal
        </Button>
      </div>
    </form>
  );
}
