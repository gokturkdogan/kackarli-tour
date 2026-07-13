import { AdminHeader } from "@/components/admin/admin-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";
import { Map, Tags, BookOpen, Calendar } from "lucide-react";
import Link from "next/link";

async function getStats() {
  const [tourCount, categoryCount, activeTours, pendingReservations] =
    await Promise.all([
      prisma.tour.count(),
      prisma.category.count(),
      prisma.tour.count({ where: { isActive: true } }),
      prisma.reservation.count({ where: { status: "PENDING" } }),
    ]);
  return { tourCount, categoryCount, activeTours, pendingReservations };
}

export default async function AdminDashboardPage() {
  const stats = await getStats();

  const cards = [
    {
      title: "Toplam Tur",
      value: stats.tourCount,
      description: `${stats.activeTours} aktif`,
      icon: Map,
      href: "/admin/tours",
    },
    {
      title: "Kategoriler",
      value: stats.categoryCount,
      description: "Tur kategorileri",
      icon: Tags,
      href: "/admin/categories",
    },
    {
      title: "Bekleyen Rezervasyon",
      value: stats.pendingReservations,
      description: "Onay bekliyor",
      icon: BookOpen,
      href: "/admin/reservations",
    },
    {
      title: "Tur Tarihleri",
      value: await prisma.tourSchedule.count({ where: { isActive: true } }),
      description: "Aktif tarihler",
      icon: Calendar,
      href: "/admin/schedules",
    },
  ];

  return (
    <>
      <AdminHeader
        title="Dashboard"
        description="Kaçkarlı Tur yönetim paneline hoş geldiniz"
      />
      <div className="p-6 space-y-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card) => (
            <Link key={card.title} href={card.href}>
              <Card className="hover:shadow-md transition-shadow border-forest-100">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {card.title}
                  </CardTitle>
                  <card.icon className="h-4 w-4 text-forest-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-forest-900">
                    {card.value}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {card.description}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <Card className="border-forest-100">
          <CardHeader>
            <CardTitle className="text-forest-900">Hızlı İşlemler</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-3">
            <Link
              href="/admin/tours/new"
              className="inline-flex items-center px-4 py-2 rounded-lg bg-forest-600 text-cream text-sm font-medium hover:bg-forest-700 transition-colors"
            >
              Yeni Tur Ekle
            </Link>
            <Link
              href="/admin/categories/new"
              className="inline-flex items-center px-4 py-2 rounded-lg border border-forest-300 text-forest-700 text-sm font-medium hover:bg-forest-50 transition-colors"
            >
              Yeni Kategori Ekle
            </Link>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
