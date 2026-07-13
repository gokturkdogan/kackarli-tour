import Link from "next/link";
import { Plus } from "lucide-react";
import { AdminHeader } from "@/components/admin/admin-header";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getCategories } from "@/actions/categories";
import { tourTypeLabel } from "@/lib/utils-helpers";
import { CategoryActions } from "@/components/admin/category-actions";

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <>
      <AdminHeader
        title="Kategoriler"
        description="Tur kategorilerini yönetin"
      />
      <div className="p-6 space-y-4">
        <div className="flex justify-end">
          <Link
            href="/admin/categories/new"
            className={cn(buttonVariants(), "bg-forest-600 hover:bg-forest-700")}
          >
            <Plus className="h-4 w-4 mr-2" />
            Yeni Kategori
          </Link>
        </div>

        <div className="rounded-lg border border-forest-100 bg-white overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ad</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Tip</TableHead>
                <TableHead>Tur Sayısı</TableHead>
                <TableHead>Durum</TableHead>
                <TableHead className="text-right">İşlemler</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    Henüz kategori eklenmemiş
                  </TableCell>
                </TableRow>
              ) : (
                categories.map((category) => (
                  <TableRow key={category.id}>
                    <TableCell className="font-medium">{category.name}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {category.slug}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {tourTypeLabel(category.type)}
                      </Badge>
                    </TableCell>
                    <TableCell>{category._count.tours}</TableCell>
                    <TableCell>
                      <Badge
                        variant={category.isActive ? "default" : "secondary"}
                        className={
                          category.isActive ? "bg-forest-600" : undefined
                        }
                      >
                        {category.isActive ? "Aktif" : "Pasif"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <CategoryActions category={category} />
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
}
