# PRODUCT REQUIREMENTS DOCUMENT (PRD)

## Personal Portfolio Website

### 1. Product Overview

Personal Portfolio Website adalah website yang digunakan untuk memperkenalkan profil, pengalaman, kemampuan, proyek, pencapaian, dan dokumentasi kegiatan secara profesional.

Website dibuat dengan konsep **modern, clean, minimalis, dan interactive**, tetapi tetap sederhana sehingga mudah dikembangkan dan diperbarui.

Website tidak terlalu merucut pada satu profesi tertentu. Konten dapat menggambarkan pemilik sebagai mahasiswa/young professional yang memiliki pengalaman dalam teknologi, project, organisasi, dan berbagai kegiatan.

---

# 2. Product Goals

Website bertujuan untuk:

* Menampilkan profil personal secara profesional.
* Menampilkan pengalaman kerja dan organisasi.
* Menampilkan project yang pernah dikerjakan.
* Menampilkan skill dan teknologi yang dikuasai.
* Menampilkan achievement dan certification.
* Menampilkan dokumentasi kegiatan dan project dalam bentuk visual.
* Memberikan informasi singkat namun menarik kepada recruiter, perusahaan, maupun pengunjung.
* Menyediakan kontak dan social media.
* Memiliki tampilan responsive dan mudah digunakan.

---

# 3. Target Users

### Primary Users

* Recruiter
* HR
* Hiring Manager
* Perusahaan
* Client

### Secondary Users

* Dosen
* Teman
* Professional Network
* Pengunjung umum

---

# 4. Website Structure

Website menggunakan konsep single-page portfolio dengan section:

1. Navbar
2. Hero
3. About Me
4. Skills
5. Experience
6. Projects
7. Achievements
8. Activity & Documentation
9. Contact
10. Footer

---

# 5. Navbar

Navbar berada di bagian atas website.

### Navigation

* Home
* About
* Skills
* Experience
* Projects
* Achievements
* Activities
* Contact

### Requirements

* Sticky saat scrolling.
* Smooth scrolling.
* Active section indicator.
* Responsive mobile navigation.
* Nama/logo sebagai identitas.

---

# 6. Hero Section

Hero menjadi bagian pertama yang dilihat pengunjung.

### Content

* Nama
* Short professional headline
* Short introduction
* CTA
* Social media

Contoh:

> Hi, I'm Amirul Ichsandina

> Information Systems Student

Short description:

> Exploring technology, digital solutions, system analysis, and project development.

### CTA

* View My Work
* Download CV
* Contact Me

### Social Links

* GitHub
* LinkedIn
* Email

Hero dapat menggunakan visual sederhana seperti profile image, abstract technology illustration, atau decorative element.

---

# 7. About Me

Menampilkan informasi singkat mengenai pemilik portfolio.

### Content

* Profile photo
* Short biography
* Education
* Interest
* Personal introduction

Contoh:

> I am an Information Systems student interested in technology, system analysis, product development, and digital solutions. I enjoy learning through projects, collaboration, and real-world experiences.

Jangan membuat About terlalu panjang.

Tambahkan informasi singkat:

* Education
* Location
* Interest
* Current status

---

# 8. Skills

Menampilkan kemampuan dalam kategori.

### Technical Skills

* System Analysis
* Requirements Analysis
* Business Process Analysis
* Product Analysis
* Web Development
* Database
* Network Configuration
* IoT

### Programming & Technology

* PHP
* Laravel
* JavaScript
* React
* MySQL
* HTML
* CSS
* Git
* GitHub

### Soft Skills

* Analytical Thinking
* Problem Solving
* Critical Thinking
* Project Coordination
* Team Collaboration
* Technical Communication
* Task Management

### UI

Gunakan:

* Skill cards
* Badge
* Icon
* Technology logo

Tidak menggunakan progress bar/persentase skill.

---

# 9. Experience Section

Experience merupakan salah satu section utama.

Setiap experience ditampilkan dalam bentuk **card atau timeline**.

## Experience Card

Setiap card memiliki:

* Company/project name
* Position
* Location
* Date
* Main image
* Short description
* Responsibilities
* Technology/skills used
* View Details button

### Image

Setiap experience dapat memiliki satu atau beberapa gambar dokumentasi.

Contoh:

```text
[ EXPERIENCE IMAGE ]

PT Asteria Riksa Indonesia
Project Development
Jan 2026 – Jul 2026

Short description...

[ View Details ]
```

Ketika user menekan **View Details**, tampilkan modal/detail panel berisi:

* Gallery
* Description
* Responsibilities
* Skills used
* Project context

### Gallery

Experience dapat memiliki multiple images:

```text
[Image 1] [Image 2] [Image 3]
```

Image dapat diklik untuk membuka ukuran lebih besar.

---

# 10. Projects Section

Menampilkan project yang pernah dibuat.

Project menggunakan card.

### Project Card

* Project image
* Project name
* Short description
* Role
* Technology
* Category
* GitHub
* Live Demo

Contoh:

```text
[ Project Image ]

Asteria Riksa Uji Integrated

Integrated web application for managing
inspection and testing processes.

Laravel • Tailwind CSS • MySQL

[ View Project ] [ GitHub ]
```

### Project Detail

Jika user memilih project:

* Hero image
* Project description
* Problem
* Solution
* Role
* Features
* Technology
* Screenshots
* Development process
* GitHub
* Live demo jika tersedia

---

# 11. Achievements Section

Achievement dibuat lebih visual dibandingkan CV.

Gunakan **achievement cards**.

Setiap achievement memiliki:

* Achievement image
* Title
* Competition/event
* Date
* Position/result
* Short description
* View Details

Contoh:

```text
[ Achievement Photo ]

2nd Place
Business Plan Competition

COMFAIR 2025

Short description...

[ View Details ]
```

### Achievement Detail

Ketika card dibuka:

* Full image
* Event name
* Achievement
* Date
* Description
* Role/contribution
* Additional documentation

Achievement dapat berupa:

* Competition
* Certification
* Award
* Organization achievement
* Academic achievement

---

# 12. Activity & Documentation

Section khusus untuk menampilkan **dokumentasi kegiatan yang pernah dilakukan**.

Section ini bersifat fleksibel dan tidak terbatas pada pekerjaan.

Contoh dokumentasi:

* Project installation
* Organization activities
* Campus activities
* Competition
* Workshop
* Team project
* IoT staging
* Network installation
* CCTV installation
* Presentation
* Event
* Collaboration
* Other activities

---

## Activity Card

Setiap activity memiliki:

* Cover image
* Activity title
* Category
* Date
* Location
* Short description

Contoh:

```text
[ Activity Photo ]

IoT Device Staging

Project IoT BGN

Dec 2025 – Mar 2026

Documentation of device staging,
configuration, and testing activities.

[ Read More ]
```

---

## Activity Detail

Ketika user memilih activity:

```text
Activity Title

Date
Location
Category

[ Large Image ]

Description

[ Gallery ]

Activity Details

What I Did
...

What I Learned
...

Skills Used
...
```

### Gallery

Satu activity dapat memiliki beberapa foto.

Contoh:

```text
[Image 1] [Image 2] [Image 3]

[Image 4] [Image 5] [Image 6]
```

User dapat mengklik gambar untuk melihatnya dalam **lightbox**.

---

# 13. Activity Categories

Tambahkan filter:

* All
* Work
* Project
* Organization
* Competition
* Campus
* Other

User dapat memilih kategori untuk menampilkan dokumentasi tertentu.

---

# 14. Contact Section

Menampilkan informasi kontak.

### Content

* Email
* GitHub
* LinkedIn
* Location

### Contact Form

Fields:

* Name
* Email
* Message

Button:

> Send Message

Untuk versi awal, form dapat menggunakan mailto atau service sederhana tanpa backend.

---

# 15. Footer

Footer berisi:

* Nama
* Short tagline
* Social media
* Copyright

Contoh:

> © 2026 Amirul Ichsandina. All rights reserved.

---

# 16. UI/UX Design

### Design Direction

Gunakan:

* Modern
* Minimalist
* Clean
* Professional
* Personal
* Technology-oriented

Website harus terasa seperti **personal portfolio**, bukan sekadar website yang memindahkan isi CV.

### Visual Style

* Banyak whitespace.
* Typography modern.
* Rounded card.
* Subtle border.
* Soft shadow.
* Clean grid.
* Consistent spacing.
* Smooth animation.

---

# 17. Image Requirements

Karena portfolio memiliki banyak dokumentasi, sistem gambar harus dibuat dengan baik.

### Image Features

* Responsive image.
* Lazy loading.
* Image preview.
* Lightbox.
* Multiple image gallery.
* Aspect ratio konsisten.
* Image fallback jika gambar tidak tersedia.

### Recommended Structure

```text
public/
└── images/
    ├── profile/
    ├── experience/
    │   ├── asteria/
    │   ├── cctv/
    │   └── iot/
    ├── projects/
    ├── achievements/
    └── activities/
```

---

# 18. Animation

Animation digunakan secara ringan.

### Animation

* Fade in on scroll.
* Slide up.
* Hover effect.
* Card interaction.
* Image zoom.
* Smooth scrolling.
* Navbar transition.

Hindari animasi berlebihan.

---

# 19. Responsive Design

Website harus responsive pada:

* Desktop
* Laptop
* Tablet
* Mobile

### Mobile

* Hamburger menu.
* Single-column card.
* Responsive typography.
* Touch-friendly buttons.
* Gallery berubah menjadi horizontal scroll/grid.
* Modal menyesuaikan ukuran layar.

---

# 20. Technical Requirements

Recommended stack:

* React
* JavaScript / TypeScript
* Tailwind CSS
* Vite
* Git
* GitHub

Tidak perlu menggunakan backend/database untuk versi pertama.

---

# 21. Component Structure

Gunakan component yang modular.

```text
src/
├── components/
│   ├── Navbar
│   ├── Hero
│   ├── About
│   ├── Skills
│   ├── Experience
│   ├── ExperienceCard
│   ├── ExperienceModal
│   ├── Projects
│   ├── ProjectCard
│   ├── Achievements
│   ├── AchievementCard
│   ├── Activities
│   ├── ActivityCard
│   ├── ActivityModal
│   ├── Gallery
│   ├── Contact
│   └── Footer
│
├── data/
│   └── portfolio.js
│
├── assets/
│
├── App.jsx
└── main.jsx
```

---

# 22. Portfolio Data

Data dipisahkan dari UI agar mudah diperbarui.

Contoh:

```javascript
const experiences = [
  {
    company: "PT Asteria Riksa Indonesia",
    position: "Project Development",
    date: "Jan 2026 - Jul 2026",
    location: "Karawang, Indonesia",
    image: "/images/experience/asteria/cover.jpg",
    description: "Short description...",
    gallery: [
      "/images/experience/asteria/1.jpg",
      "/images/experience/asteria/2.jpg"
    ],
    skills: [
      "System Analysis",
      "Requirements Analysis",
      "Business Process Analysis"
    ]
  }
];
```

Konsep yang sama digunakan untuk:

* Projects
* Achievements
* Activities

---

# 23. Activity Data Structure

```javascript
const activities = [
  {
    title: "IoT Device Staging",
    category: "Work",
    date: "Dec 2025 - Mar 2026",
    location: "Karawang, Indonesia",
    image: "/images/activities/iot/cover.jpg",
    description: "Documentation of IoT device staging and testing activities.",
    gallery: [
      "/images/activities/iot/1.jpg",
      "/images/activities/iot/2.jpg"
    ],
    skills: [
      "IoT Staging",
      "Device Testing",
      "Team Collaboration"
    ]
  }
];
```

---

# 24. SEO

Implement:

* Page title
* Meta description
* Open Graph
* Semantic HTML
* Proper heading hierarchy
* Image alt text

Title:

> Amirul Ichsandina — Personal Portfolio

Description:

> Personal portfolio showcasing projects, experience, skills, achievements, and activities.

---

# 25. Accessibility

Website harus memiliki:

* Semantic HTML.
* Proper heading hierarchy.
* Alt text.
* Keyboard navigation.
* Accessible buttons.
* Good contrast.
* Focus states.

---

# 26. Performance

Website harus:

* Fast loading.
* Optimized images.
* Lazy loading.
* Minimal unnecessary dependencies.
* Optimized assets.
* Responsive.

---

# 27. Content Flexibility

Website harus memungkinkan penambahan:

* Experience baru.
* Project baru.
* Achievement baru.
* Activity baru.
* Foto baru.
* Skill baru.

Tanpa perlu mengubah struktur utama website.

---

# 28. Future Development

Fitur berikut dapat ditambahkan di masa depan:

* Dark mode.
* Blog.
* Project detail page.
* Admin dashboard.
* CMS.
* Database.
* Contact form backend.
* Analytics.
* Download CV.
* Multilingual support.

---

# 29. Success Criteria

Website dianggap selesai apabila:

* Semua section utama tersedia.
* Responsive.
* Navigation berjalan dengan baik.
* Experience dapat menampilkan gambar dan detail.
* Project dapat menampilkan gambar dan informasi.
* Achievement dapat menampilkan dokumentasi.
* Activity dapat menampilkan gallery dan deskripsi.
* Image lightbox berjalan.
* Social links berfungsi.
* Contact section tersedia.
* Tidak terdapat error.
* Website dapat di-deploy.

---

# 30. Vibe Coding Direction

Build the website with the following principles:

1. Keep the UI clean and modern.
2. Do not make it look like a traditional resume.
3. Use visual storytelling through images.
4. Keep content concise.
5. Make Experience, Projects, Achievements, and Activities visually distinct.
6. Use reusable components.
7. Keep portfolio data separate from UI components.
8. Make the website easy to update.
9. Prioritize responsive design.
10. Avoid unnecessary features.

The website should feel like a **modern personal portfolio that combines CV, project showcase, achievements, and personal activity documentation**.
