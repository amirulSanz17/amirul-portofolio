import { navigateAdmin } from "./AdminApp";

const sections = [
  { label: "Experience", path: "/admin/experiences", text: "Kelola pengalaman kerja dan skills." },
  { label: "Projects", path: "/admin/projects", text: "Kelola project, teknologi, dan tautan." },
  { label: "Achievements", path: "/admin/achievements", text: "Kelola pencapaian dan sertifikasi." },
  { label: "Activities", path: "/admin/activities", text: "Kelola aktivitas dan dokumentasi." },
];

export default function AdminDashboard() {
  return (
    <>
      <p className="section-label">Portfolio CMS</p>
      <h1 className="section-title">Dashboard</h1>
      <p className="admin-muted admin-intro">Pilih bagian portfolio yang ingin dikelola.</p>
      <div className="admin-dashboard-grid">
        {sections.map((section) => (
          <button key={section.path} className="admin-section-card card" onClick={() => navigateAdmin(section.path)}>
            <span className="section-label">Manage</span>
            <h2>{section.label}</h2>
            <p>{section.text}</p>
            <span className="admin-card-link">Kelola konten →</span>
          </button>
        ))}
      </div>
    </>
  );
}
