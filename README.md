# Kaçkarlı Tur - Rize Yayla Turizmi MVP

Rize'de yayla turizmi, günübirlik ve konaklamalı turlar düzenleyen firma için web uygulaması.

## Teknoloji

- **Next.js 16** (App Router)
- **TypeScript**
- **Tailwind CSS v4** + **shadcn/ui**
- **PostgreSQL** + **Prisma ORM**
- **Auth.js** (NextAuth v5)
- **Cloudinary** CDN
- **Zod** doğrulama

## Kurulum

### 1. Bağımlılıkları yükleyin

```bash
npm install
```

### 2. Ortam değişkenlerini ayarlayın

```bash
cp .env.example .env
```

`.env` dosyasını düzenleyin:

- `DATABASE_URL` — PostgreSQL bağlantı dizesi
- `AUTH_SECRET` — `openssl rand -base64 32` ile oluşturun
- `CLOUDINARY_*` — Cloudinary hesap bilgileri

### 3. Veritabanını oluşturun

```bash
npm run db:migrate
npm run db:seed
```

### 4. Geliştirme sunucusunu başlatın

```bash
npm run dev
```

- Site: http://localhost:3000
- Admin: http://localhost:3000/admin
- Giriş: seed ile oluşturulan admin hesabı (varsayılan: `admin@kackarlitur.com` / `admin123456`)

## Proje Yapısı

```
src/
├── actions/          # Server Actions (CRUD)
├── app/
│   ├── admin/        # Admin paneli
│   ├── api/          # API routes (auth, upload)
│   └── page.tsx      # Ana sayfa
├── components/
│   ├── admin/        # Admin bileşenleri
│   └── ui/           # shadcn/ui
├── lib/              # Yardımcı kütüphaneler
└── generated/prisma/ # Prisma client
```

## İlk Aşama (Tamamlandı)

- [x] Next.js proje yapısı
- [x] Tailwind ve shadcn/ui
- [x] Prisma ve PostgreSQL modelleri
- [x] Auth.js admin girişi
- [x] Cloudinary görsel yükleme
- [x] Admin panel layout
- [x] Tur CRUD
- [x] Tur görsel yükleme

## Sonraki Aşamalar

- [ ] Public tur sayfaları
- [ ] Rezervasyon sistemi
- [ ] Tur tarihleri yönetimi
- [ ] Duyuru sistemi
- [ ] Galeri yönetimi
- [ ] Site ayarları
- [ ] Ana sayfa yönetimi

## Vercel Deploy

1. PostgreSQL veritabanı oluşturun (Vercel Postgres, Neon, Supabase vb.)
2. Ortam değişkenlerini Vercel'e ekleyin
3. Deploy edin — `postinstall` script'i Prisma client'ı otomatik üretir
