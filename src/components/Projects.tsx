import { useEffect, useRef, useState } from "react";
import { projects, type Project } from "../data/portfolio";
import Lightbox from "./Lightbox";
import { adaptiveGrid } from "../utils/grid";

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * HOW TO ADD A NEW PROJECT
 * ─────────────────────────────────────────────────────────────────────────────
 * 1. Buka  src/data/portfolio.ts
 * 2. Tambahkan objek baru ke array `projects`:
 *
 *    {
 *      id: "proj-4",                              // ID unik
 *      name: "Nama Project",
 *      description: "Deskripsi singkat.",
 *      role: "Full Stack Developer",
 *      category: "Web Application",
 *      tech: ["Laravel", "MySQL", "Tailwind CSS"],
 *
 *      image: "/images/projects/nama/cover.jpg",  // cover card
 *      github: "https://github.com/username/repo",
 *      demo: null,                                // atau URL jika ada
 *
 *      problem: "Masalah yang diselesaikan.",
 *      solution: "Solusi yang dibangun.",
 *      features: ["Fitur 1", "Fitur 2"],
 *
 *      screenshots: [                             // gallery di modal
 *        "/images/projects/nama/ss-1.jpg",
 *        "/images/projects/nama/ss-2.jpg",
 *      ],
 *    }
 *
 * FOLDER GAMBAR:
 *  public/images/projects/
 *  ├── asteria/
 *  │   ├── cover.jpg
 *  │   └── ss-1.jpg
 *  └── nama-project-baru/
 *      ├── cover.jpg
 *      └── ss-1.jpg
 * ─────────────────────────────────────────────────────────────────────────────
 */

function CloseBtn({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick} aria-label="Close"
      style={{
        background: "rgba(255,255,255,0.06)", border: "1px solid var(--border-strong)",
        borderRadius: "50%", width: 34, height: 34,
        display: "flex", alignItems: "center", justifyContent: "center",
        cursor: "pointer", color: "var(--fg-muted)", flexShrink: 0,
        transition: "background 0.15s, color 0.15s",
      }}
      onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.12)"; e.currentTarget.style.color = "var(--fg)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.color = "var(--fg-muted)"; }}
    >
      <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
        <path d="M1.5 1.5L11.5 11.5M11.5 1.5L1.5 11.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    </button>
  );
}

function ModalLabel({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ fontSize: "0.68rem", fontWeight: 600, color: "var(--fg-muted)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.6rem" }}>
      {children}
    </p>
  );
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const [lightbox, setLightbox] = useState<{ images: string[]; idx: number } | null>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", h);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", h); };
  }, [onClose]);

  return (
    <>
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div style={{ aspectRatio: "16/7", background: "var(--bg-alt)", overflow: "hidden" }}>
            <img src={project.image} alt={project.name} className="img-cover"/>
          </div>

          <div style={{ padding: "1.75rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: "1rem", marginBottom: "1.25rem" }}>
              <div>
                <span className="tag" style={{ marginBottom: "0.5rem", display: "inline-block" }}>{project.category}</span>
                <h2 style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: "1.35rem", fontWeight: 700, color: "var(--fg)", marginBottom: "0.2rem" }}>
                  {project.name}
                </h2>
                <p style={{ color: "var(--fg-muted)", fontSize: "0.8rem" }}>Role: {project.role}</p>
              </div>
              <CloseBtn onClick={onClose}/>
            </div>

            <p style={{ color: "var(--fg-secondary)", lineHeight: 1.75, fontSize: "0.9rem", marginBottom: "1.5rem" }}>
              {project.description}
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "1.25rem" }}>
              {[{ label: "Problem", text: project.problem }, { label: "Solution", text: project.solution }].map(({ label, text }) => (
                <div key={label} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid var(--border)", borderRadius: 8, padding: "0.85rem" }}>
                  <p style={{ fontSize: "0.68rem", fontWeight: 600, color: "var(--accent)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.35rem" }}>{label}</p>
                  <p style={{ fontSize: "0.83rem", color: "var(--fg-secondary)", lineHeight: 1.6 }}>{text}</p>
                </div>
              ))}
            </div>

            <div style={{ marginBottom: "1.25rem" }}>
              <ModalLabel>Key Features</ModalLabel>
              <ul style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                {project.features.map((f) => (
                  <li key={f} style={{ display: "flex", gap: "0.55rem", alignItems: "center" }}>
                    <span style={{ color: "var(--accent)", flexShrink: 0 }}>
                      <svg width="5" height="5" viewBox="0 0 5 5" fill="currentColor"><circle cx="2.5" cy="2.5" r="2.5"/></svg>
                    </span>
                    <span style={{ color: "var(--fg-secondary)", fontSize: "0.875rem" }}>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div style={{ marginBottom: "1.25rem" }}>
              <ModalLabel>Technology</ModalLabel>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                {project.tech.map((t) => <span key={t} className="tag tag-accent">{t}</span>)}
              </div>
            </div>

            {project.screenshots.length > 0 && (
              <div style={{ marginBottom: "1.5rem" }}>
                <ModalLabel>Screenshots</ModalLabel>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "0.5rem" }}>
                  {project.screenshots.map((img, i) => (
                    <div
                      key={i}
                      onClick={() => setLightbox({ images: project.screenshots, idx: i })}
                      style={{ aspectRatio: "16/9", borderRadius: 8, overflow: "hidden", cursor: "pointer", background: "var(--bg-alt)", border: "1px solid var(--border)" }}
                    >
                      <img src={img} alt={`Screenshot ${i + 1}`} className="img-cover" loading="lazy"
                        style={{ transition: "transform 0.3s" }}
                        onMouseEnter={(e) => ((e.currentTarget as HTMLImageElement).style.transform = "scale(1.07)")}
                        onMouseLeave={(e) => ((e.currentTarget as HTMLImageElement).style.transform = "scale(1)")}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div style={{ display: "flex", gap: "0.65rem" }}>
              {project.github && (
                <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn-outline" style={{ fontSize: "0.83rem" }}>
                  GitHub ↗
                </a>
              )}
              {project.demo && (
                <a href={project.demo} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ fontSize: "0.83rem" }}>
                  Live Demo ↗
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
      {lightbox && <Lightbox images={lightbox.images} initialIndex={lightbox.idx} onClose={() => setLightbox(null)}/>}
    </>
  );
}

export default function Projects() {
  const ref      = useRef<HTMLElement>(null);
  const [selected, setSelected] = useState<Project | null>(null);
  const gridStyle = adaptiveGrid(projects.length);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.querySelectorAll(".reveal").forEach((r, i) => {
            (r as HTMLElement).style.transitionDelay = `${i * 0.09}s`;
            r.classList.add("visible");
          });
          obs.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <section id="projects" className="section" ref={ref as React.RefObject<HTMLElement>}>
        <div className="container">
          <p className="section-label reveal">Projects</p>
          <h2 className="section-title reveal" style={{ marginBottom: "2.5rem" }}>
            Things I've built
          </h2>

          <div style={gridStyle} className="proj-grid">
            {projects.map((project, i) => (
              <article
                key={project.id}
                className="card reveal"
                style={{ overflow: "hidden", cursor: "pointer", transitionDelay: `${i * 0.09}s` }}
                onClick={() => setSelected(project)}
              >
                <div style={{ aspectRatio: "16/9", background: "var(--bg-alt)", overflow: "hidden" }}>
                  <img
                    src={project.image} alt={project.name}
                    className="img-cover" loading="lazy"
                    style={{ transition: "transform 0.4s ease" }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLImageElement).style.transform = "scale(1.06)")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLImageElement).style.transform = "scale(1)")}
                  />
                </div>

                <div style={{ padding: "1.25rem" }}>
                  <span className="tag" style={{ marginBottom: "0.6rem", display: "inline-block" }}>{project.category}</span>
                  <h3 style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: "0.97rem", fontWeight: 700, color: "var(--fg)", marginBottom: "0.4rem" }}>
                    {project.name}
                  </h3>
                  <p style={{ fontSize: "0.82rem", color: "var(--fg-secondary)", lineHeight: 1.65, marginBottom: "0.85rem" }}>
                    {project.description}
                  </p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem", marginBottom: "1rem" }}>
                    {project.tech.map((t) => <span key={t} className="tag tag-accent">{t}</span>)}
                  </div>
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    <button
                      className="btn-outline"
                      style={{ flex: 1, justifyContent: "center", padding: "0.55rem 0.75rem", fontSize: "0.8rem" }}
                      onClick={(e) => { e.stopPropagation(); setSelected(project); }}
                    >
                      View Project
                    </button>
                    {project.github && (
                      <a
                        href={project.github} target="_blank" rel="noopener noreferrer"
                        className="btn-ghost"
                        style={{ padding: "0.55rem 0.75rem", cursor: "pointer" }}
                        onClick={(e) => e.stopPropagation()}
                        aria-label="GitHub"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {selected && <ProjectModal project={selected} onClose={() => setSelected(null)}/>}

      <style>{`
        @media (max-width: 900px)  { .proj-grid { grid-template-columns: 1fr !important; max-width: none !important; } }
        @media (min-width: 901px) and (max-width: 1100px) {
          .proj-grid { grid-template-columns: repeat(2, 1fr) !important; max-width: none !important; }
        }
      `}</style>
    </>
  );
}
