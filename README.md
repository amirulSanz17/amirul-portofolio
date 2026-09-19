# Portfolio Personal — Amirul Ichsandina

Website portfolio pribadi yang menampilkan profil, pengalaman kerja, project, pencapaian, aktivitas, keterampilan, dan informasi kontak secara modern dan rapi. Proyek ini dibuat dengan React, TypeScript, dan Tailwind CSS v4, dengan fokus pada tampilan yang profesional, responsif, dan mudah dikelola dari satu sumber data.

## Tentang Website Ini

Portofolio ini berfungsi sebagai ruang digital untuk memperkenalkan diri secara profesional kepada recruiter, client, rekan kerja, maupun komunitas. Di dalamnya terdapat beberapa section penting seperti:

- Hero section dengan profil singkat
- About / biodata personal
- Skill dan kompetensi
- Pengalaman kerja dan kontribusi
- Project yang pernah dibangun
- Achievement dan penghargaan
- Aktivitas organisasi dan kegiatan
- Informasi kontak serta sosial media

Tujuannya adalah menampilkan identitas, kemampuan teknis, serta perjalanan profesional dengan tampilan yang modern dan mudah dibaca.

---

## Teknologi yang Digunakan

- React 19
- TypeScript
- Tailwind CSS v4
- Vite 8
- No backend — seluruh konten dikelola dari file data tunggal

---

## Fitur Utama

- Tampilan responsif untuk desktop, tablet, dan mobile
- Desain portfolio yang modern dan minimalis
- Data konten disimpan terpusat di `src/data/portfolio.ts`
- Section project dan experience yang mudah diperbarui
- Support galeri foto untuk project, achievement, dan activity
- Integrasi link GitHub, LinkedIn, dan email

---

## Cara Menjalankan Project

```bash
# install dependencies
pnpm install

# jalankan development server
pnpm dev
```

Setelah itu, buka browser pada:

```bash
http://localhost:5173
```

Jika port berubah, gunakan port yang ditampilkan di terminal.

---

## Struktur Project

```bash
src/
├── components/         # Semua section UI website
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── Skills.tsx
│   ├── Experience.tsx
│   ├── Projects.tsx
│   ├── Achievements.tsx
│   ├── Activities.tsx
│   ├── Contact.tsx
│   ├── Footer.tsx
│   └── Lightbox.tsx
├── data/
│   └── portfolio.ts    # File utama untuk mengubah konten portfolio
├── hooks/
│   └── useInView.ts
├── App.tsx
├── main.tsx
├── index.css
└── vite-env.d.ts

public/
└── images/             # Folder untuk menyimpan foto dan gambar portfolio
    ├── profile/
    ├── experience/
    ├── projects/
    ├── achievements/
    └── activities/
```

---

## Cara Mengubah Konten Portfolio

Semua data utama berada di file:

- `src/data/portfolio.ts`

Dengan mengubah file ini, Anda dapat mengganti:

- nama dan profil
- bio singkat
- kontak
- skill
- pengalaman kerja
- project
- achievement
- activity
- foto profil dan galeri

### Contoh mengubah profil

```ts
export const profile = {
  name: "Amirul Ichsandina",
  email: "email-kamu@gmail.com",
  github: "https://github.com/username-kamu",
  linkedin: "https://linkedin.com/in/username-kamu",
  location: "Karawang, Indonesia",
};
```

### Contoh menambah pengalaman kerja

```ts
{
  id: "exp-4",
  company: "Nama Perusahaan",
  position: "Posisi Kamu",
  location: "Kota, Indonesia",
  date: "Jan 2026 – Jul 2026",
  image: "/images/experience/nama/cover.jpg",
  description: "Deskripsi singkat tentang pengalaman kerja.",
  responsibilities: [
    "Tanggung jawab 1",
    "Tanggung jawab 2",
  ],
  skills: ["Skill 1", "Skill 2"],
  gallery: [
    "/images/experience/nama/foto-1.jpg",
    "/images/experience/nama/foto-2.jpg",
  ],
}
```

### Contoh menambah project

```ts
{
  id: "proj-4",
  name: "Nama Project",
  description: "Deskripsi singkat project.",
  role: "Full Stack Developer",
  category: "Web Application",
  tech: ["Laravel", "MySQL"],
  image: "/images/projects/nama/cover.jpg",
  github: "https://github.com/username/repo",
  demo: null,
  problem: "Masalah yang diselesaikan.",
  solution: "Solusi yang dibangun.",
  features: ["Fitur 1", "Fitur 2"],
  screenshots: [
    "/images/projects/nama/ss-1.jpg",
  ],
}
```

---

## Menambahkan Foto

Tempatkan foto yang ingin ditampilkan ke folder public sesuai kategori:

- `public/images/profile/`
- `public/images/experience/`
- `public/images/projects/`
- `public/images/achievements/`
- `public/images/activities/`

Contoh path foto:

```ts
const PROFILE_PHOTO = "/images/profile/foto-saya.jpg";
```

---

## Build untuk Produksi

```bash
pnpm build
```

Hasil build akan dibuat di folder:

```bash
dist/
```

Folder tersebut siap di-deploy ke Vercel, Netlify, atau hosting lain yang mendukung static site.

---

## Dokumentasi Tambahan

Untuk panduan deployment lebih lengkap, lihat file:

- `DEPLOY.md`

---

## Kesimpulan

Proyek ini dibuat sebagai personal portfolio website yang modern, profesional, dan mudah dikelola. Dengan struktur data yang terorganisir, Anda dapat memperbarui isi portofolio tanpa perlu mengubah banyak komponen UI secara manual.
