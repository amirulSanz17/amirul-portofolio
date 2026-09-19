# Portfolio — Amirul Ichsandina

Personal portfolio website built with React, TypeScript, and Tailwind CSS v4.

## Tech Stack

- **React 19** + TypeScript
- **Tailwind CSS v4** (via Vite plugin)
- **Vite 8**
- No backend — semua konten diatur dari satu file data

---

## Cara Menjalankan

```bash
# Install dependencies
pnpm install

# Jalankan development server
pnpm dev
```

Buka browser di `http://localhost:5173` (atau port yang ditampilkan di terminal).

---

## Struktur Folder

```
src/
├── components/       # Semua section UI
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
│   └── portfolio.ts  # ← EDIT FILE INI untuk mengubah konten
├── hooks/
│   └── useInView.ts
├── App.tsx
├── main.tsx
└── index.css

public/
└── images/           # Taruh semua foto di sini
    ├── profile/
    ├── experience/
    ├── projects/
    ├── achievements/
    └── activities/
```

---

## Cara Update Konten

Semua konten dikelola dari satu file: **`src/data/portfolio.ts`**

### Ganti Foto Profil

Dua tempat foto ada di file component:

- **Hero**: `src/components/Hero.tsx` — cari variabel `PROFILE_PHOTO`
- **About**: `src/components/About.tsx` — cari variabel `PROFILE_PHOTO`

Ganti nilainya dengan path foto kamu:
```ts
const PROFILE_PHOTO = "/images/profile/foto-saya.jpg";
```

Taruh file foto di: `public/images/profile/foto-saya.jpg`

### Tambah/Edit Experience

Buka `src/data/portfolio.ts`, cari array `experiences`, tambahkan objek baru:

```ts
{
  id: "exp-4",                          // ID unik
  company: "Nama Perusahaan",
  position: "Posisi Kamu",
  location: "Kota, Indonesia",
  date: "Jan 2026 – Jul 2026",
  image: "/images/experience/nama/cover.jpg",
  description: "Deskripsi singkat.",
  responsibilities: [
    "Tanggung jawab 1",
    "Tanggung jawab 2",
  ],
  skills: ["Skill 1", "Skill 2"],
  gallery: [
    "/images/experience/nama/foto-1.jpg",
    "/images/experience/nama/foto-2.jpg",
  ],
},
```

### Tambah Project

Baca komentar lengkap di `src/components/Projects.tsx` untuk panduan lengkap beserta struktur folder gambar.

Singkatnya, tambahkan ke array `projects` di `portfolio.ts`:

```ts
{
  id: "proj-4",
  name: "Nama Project",
  description: "Deskripsi singkat.",
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
},
```

### Tambah Achievement

```ts
{
  id: "ach-4",
  title: "Judul Penghargaan",
  event: "Nama Event",
  organizer: "Penyelenggara",
  date: "Bulan Tahun",
  position: "1st Place",
  positionColor: "gold",   // "gold" | "silver" | "bronze" | "blue"
  description: "Deskripsi.",
  role: "Team Leader",
  image: "/images/achievements/nama/cover.jpg",
  gallery: [
    "/images/achievements/nama/foto-1.jpg",
  ],
},
```

### Tambah Activity

```ts
{
  id: "act-7",
  title: "Judul Kegiatan",
  category: "Work",         // "Work" | "Project" | "Organization" | "Competition" | "Campus" | "Other"
  date: "Jan 2026",
  location: "Karawang, Indonesia",
  description: "Deskripsi singkat.",
  image: "/images/activities/nama/cover.jpg",
  gallery: [
    "/images/activities/nama/foto-1.jpg",
  ],
  whatIDid: "Apa yang saya lakukan.",
  whatILearned: "Apa yang saya pelajari.",
  skillsUsed: ["Skill 1", "Skill 2"],
},
```

### Edit Skills

```ts
// Di src/data/portfolio.ts
export const skills = {
  technical: ["Skill baru", ...],
  programming: ["Tech baru", ...],
  soft: ["Soft skill baru", ...],
};
```

---

## Ganti Informasi Kontak

Di `src/data/portfolio.ts`, ubah objek `profile`:

```ts
export const profile = {
  name: "Amirul Ichsandina",
  email: "email-kamu@gmail.com",
  github: "https://github.com/username-kamu",
  linkedin: "https://linkedin.com/in/username-kamu",
  location: "Kota, Indonesia",
  // ...
};
```

---

## Build untuk Production

```bash
pnpm build
```

Output ada di folder `dist/`. Siap di-deploy ke Vercel, Netlify, atau hosting lainnya.

Lihat **DEPLOY.md** untuk panduan deployment lengkap.
