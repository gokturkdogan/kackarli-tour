"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
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
import {
  categorySchema,
  type CategoryFormData,
} from "@/lib/validations";
import { slugify } from "@/lib/utils-helpers";
import { createCategory, updateCategory } from "@/actions/categories";

interface CategoryFormProps {
  initialData?: CategoryFormData & { id: string };
}

export function CategoryForm({ initialData }: CategoryFormProps) {
  const router = useRouter();
  const isEditing = !!initialData;

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
    defaultValues: initialData ?? {
      name: "",
      slug: "",
      description: "",
      type: "DAY_TRIP",
      isActive: true,
      sortOrder: 0,
    },
  });

  const type = watch("type");
  const isActive = watch("isActive");

  function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setValue("name", value);
    if (!isEditing) {
      setValue("slug", slugify(value));
    }
  }

  async function onSubmit(data: CategoryFormData) {
    const result = isEditing
      ? await updateCategory(initialData.id, data)
      : await createCategory(data);

    if (result.success) {
      toast.success(isEditing ? "Kategori güncellendi" : "Kategori oluşturuldu");
      router.push("/admin/categories");
      router.refresh();
    } else {
      toast.error(result.error);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>Kategori Bilgileri</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Kategori Adı *</Label>
            <Input
              id="name"
              {...register("name")}
              onChange={handleNameChange}
              placeholder="Örn: Yayla Turları"
            />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="slug">Slug *</Label>
            <Input id="slug" {...register("slug")} placeholder="yayla-turlari" />
            {errors.slug && (
              <p className="text-sm text-destructive">{errors.slug.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="type">Tur Tipi *</Label>
            <Select
              value={type}
              onValueChange={(v) => v && setValue("type", v as CategoryFormData["type"])}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="DAY_TRIP">Günübirlik</SelectItem>
                <SelectItem value="ACCOMMODATION">Konaklamalı</SelectItem>
              </SelectContent>
            </Select>
            {errors.type && (
              <p className="text-sm text-destructive">{errors.type.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Açıklama</Label>
            <Textarea
              id="description"
              {...register("description")}
              rows={3}
              placeholder="Kategori açıklaması..."
            />
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

      <div className="flex gap-3">
        <Button type="submit" disabled={isSubmitting} className="bg-forest-600 hover:bg-forest-700">
          {isSubmitting ? "Kaydediliyor..." : isEditing ? "Güncelle" : "Oluştur"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
        >
          İptal
        </Button>
      </div>
    </form>
  );
}
