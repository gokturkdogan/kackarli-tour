# Kaçkarlı Tur - Rize Yayla Turizmi

Rize'de yayla turizmi, günübirlik ve konaklamalı turlar için public web sitesi.

Yönetim paneli ayrı repoda: **[kackarli-tour-backoffice](../kackarli-tour-backoffice)**

## Teknoloji

- **Next.js 16** (App Router)
- **TypeScript**
- **Tailwind CSS v4** + **shadcn/ui**
- **PostgreSQL** + **Prisma ORM**
- **Zod** doğrulama

## Kurulum

```bash
npm install
cp .env.example .env
# DATABASE_URL değerini doldurun
npm run db:migrate
npm run db:seed
npm run dev
```

- Site: http://localhost:3000
- Admin panel: http://localhost:3001/admin (`kackarli-tour-backoffice` repo)

## Proje Yapısı

```
src/
├── actions/          # Public server actions
├── app/              # Public sayfalar
├── components/
│   ├── public/       # Site bileşenleri
│   └── ui/           # shadcn/ui
├── lib/
└── generated/prisma/
```

## İlgili Repolar

| Repo | Açıklama |
|------|----------|
| `kackarli-tour` | Public site (bu repo) |
| `kackarli-tour-backoffice` | Admin paneli |

Her iki proje aynı PostgreSQL veritabanını paylaşır.
