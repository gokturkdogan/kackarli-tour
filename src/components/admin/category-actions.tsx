"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Pencil, Power, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { deleteCategory, toggleCategoryActive } from "@/actions/categories";
import { toast } from "sonner";

interface Category {
  id: string;
  name: string;
  isActive: boolean;
  _count: { tours: number };
}

export function CategoryActions({ category }: { category: Category }) {
  const router = useRouter();
  const [deleteOpen, setDeleteOpen] = useState(false);

  async function handleToggle() {
    const result = await toggleCategoryActive(category.id);
    if (result.success) {
      toast.success(category.isActive ? "Kategori pasife alındı" : "Kategori aktifleştirildi");
      router.refresh();
    } else {
      toast.error(result.error);
    }
  }

  async function handleDelete() {
    const result = await deleteCategory(category.id);
    if (result.success) {
      toast.success("Kategori silindi");
      router.refresh();
    } else {
      toast.error(result.error);
    }
    setDeleteOpen(false);
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger render={<Button variant="ghost" size="sm" />}>
          İşlemler
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem render={<Link href={`/admin/categories/${category.id}/edit`} />}>
            <Pencil className="h-4 w-4 mr-2" />
            Düzenle
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleToggle}>
            <Power className="h-4 w-4 mr-2" />
            {category.isActive ? "Pasife Al" : "Aktifleştir"}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            variant="destructive"
            onClick={() => setDeleteOpen(true)}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Sil
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Kategoriyi sil</AlertDialogTitle>
            <AlertDialogDescription>
              &quot;{category.name}&quot; kategorisini silmek istediğinize emin misiniz?
              {category._count.tours > 0 &&
                " Bu kategoriye bağlı turlar var, silme işlemi başarısız olacaktır."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>İptal</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive hover:bg-destructive/90"
            >
              Sil
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
