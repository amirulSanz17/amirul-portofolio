import { useEffect, useRef, useState } from "react";
import { achievements, type Achievement } from "../data/portfolio";
import Lightbox from "./Lightbox";
import { adaptiveGrid } from "../utils/grid";

const badge: Record<string, { label: string; color: string; bg: string; border: string }> = {
  gold:   { label: "🥇 1st Place",  color: "#f59e0b", bg: "rgba(245,158,11,0.1)",  border: "rgba(245,158,11,0.25)" },
  silver: { label: "🥈 2nd Place",  color: "#a1a1aa", bg: "rgba(161,161,170,0.1)", border: "rgba(161,161,170,0.25)" },
  bronze: { label: "🥉 3rd Place",  color: "#d97706", bg: "rgba(217,119,6,0.1)",   border: "rgba(217,119,6,0.25)" },
  blue:   { label: "📜 Certified",  color: "var(--accent)", bg: "var(--accent-dim)", border: "rgba(77,124,255,0.25)" },
};

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

function AchievementModal({ ach, onClose }: { ach: Achievement; onClose: () => void }) {
  const [lightbox, setLightbox] = useState<{ images: string[]; idx: number } | null>(null);
  const b = badge[ach.positionColor];

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
            <img src={ach.image} alt={ach.title} className="img-cover"/>
          </div>

          <div style={{ padding: "1.75rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: "1rem", marginBottom: "1.25rem" }}>
              <div>
                <span style={{
                  display: "inline-block",
                  padding: "0.2rem 0.7rem",
                  background: b.bg, border: `1px solid ${b.border}`,
                  borderRadius: 20, fontSize: "0.75rem", fontWeight: 600, color: b.color,
                  marginBottom: "0.6rem",
                }}>
                  {b.label}
                </span>
                <h2 style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: "1.3rem", fontWeight: 700, color: "var(--fg)", marginBottom: "0.2rem" }}>
                  {ach.title}
                </h2>
                <p style={{ color: "var(--fg-muted)", fontSize: "0.8rem" }}>
                  {ach.event} · {ach.organizer} · {ach.date}
                </p>
              </div>
              <CloseBtn onClick={onClose}/>
            </div>

            <p style={{ color: "var(--fg-secondary)", lineHeight: 1.75, fontSize: "0.9rem", marginBottom: "1rem" }}>
              {ach.description}
            </p>
            <p style={{ fontSize: "0.84rem", color: "var(--fg-muted)", marginBottom: "1.5rem" }}>
              <strong style={{ color: "var(--fg)" }}>Role:</strong> {ach.role}
            </p>

            {ach.gallery.length > 0 && (
              <>
                <p style={{ fontSize: "0.68rem", fontWeight: 600, color: "var(--fg-muted)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.6rem" }}>
                  Documentation
                </p>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: "0.5rem" }}>
                  {ach.gallery.map((img, i) => (
                    <div
                      key={i}
                      onClick={() => setLightbox({ images: ach.gallery, idx: i })}
                      style={{ aspectRatio: "3/2", borderRadius: 8, overflow: "hidden", cursor: "pointer", background: "var(--bg-alt)", border: "1px solid var(--border)" }}
                    >
                      <img src={img} alt="" className="img-cover" loading="lazy"
                        style={{ transition: "transform 0.3s" }}
                        onMouseEnter={(e) => ((e.currentTarget as HTMLImageElement).style.transform = "scale(1.07)")}
                        onMouseLeave={(e) => ((e.currentTarget as HTMLImageElement).style.transform = "scale(1)")}
                      />
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      {lightbox && <Lightbox images={lightbox.images} initialIndex={lightbox.idx} onClose={() => setLightbox(null)}/>}
    </>
  );
}

export default function Achievements() {
  const ref    = useRef<HTMLElement>(null);
  const [selected, setSelected] = useState<Achievement | null>(null);
  const gridStyle = adaptiveGrid(achievements.length);

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
      <section id="achievements" className="section section-alt" ref={ref as React.RefObject<HTMLElement>}>
        <div className="container">
          <p className="section-label reveal">Achievements</p>
          <h2 className="section-title reveal" style={{ marginBottom: "2.5rem" }}>
            Milestones & recognition
          </h2>

          <div style={gridStyle} className="ach-grid">
            {achievements.map((ach, i) => {
              const b = badge[ach.positionColor];
              return (
                <article
                  key={ach.id}
                  className="card reveal"
                  style={{ overflow: "hidden", cursor: "pointer", transitionDelay: `${i * 0.09}s` }}
                  onClick={() => setSelected(ach)}
                >
                  <div style={{ aspectRatio: "16/9", background: "var(--bg-alt)", overflow: "hidden", position: "relative" }}>
                    <img
                      src={ach.image} alt={ach.title}
                      className="img-cover" loading="lazy"
                      style={{ transition: "transform 0.4s ease" }}
                      onMouseEnter={(e) => ((e.currentTarget as HTMLImageElement).style.transform = "scale(1.06)")}
                      onMouseLeave={(e) => ((e.currentTarget as HTMLImageElement).style.transform = "scale(1)")}
                    />
                    <span style={{
                      position: "absolute", top: "0.65rem", right: "0.65rem",
                      padding: "0.18rem 0.6rem",
                      background: b.bg, border: `1px solid ${b.border}`,
                      borderRadius: 20, fontSize: "0.7rem", fontWeight: 600, color: b.color,
                      backdropFilter: "blur(6px)",
                    }}>
                      {b.label}
                    </span>
                  </div>

                  <div style={{ padding: "1.25rem" }}>
                    <p style={{ fontSize: "0.72rem", color: "var(--fg-muted)", marginBottom: "0.35rem" }}>
                      {ach.event} · {ach.date}
                    </p>
                    <h3 style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: "0.95rem", fontWeight: 700, color: "var(--fg)", marginBottom: "0.5rem", lineHeight: 1.35 }}>
                      {ach.title}
                    </h3>
                    <p style={{ fontSize: "0.82rem", color: "var(--fg-secondary)", lineHeight: 1.65, marginBottom: "1rem" }}>
                      {ach.description.slice(0, 100)}…
                    </p>
                    <button
                      className="btn-outline"
                      style={{ width: "100%", justifyContent: "center", padding: "0.6rem", fontSize: "0.82rem" }}
                      onClick={(e) => { e.stopPropagation(); setSelected(ach); }}
                    >
                      View Details
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {selected && <AchievementModal ach={selected} onClose={() => setSelected(null)}/>}

      <style>{`
        @media (max-width: 900px)  { .ach-grid { grid-template-columns: 1fr !important; max-width: none !important; } }
        @media (min-width: 901px) and (max-width: 1100px) {
          .ach-grid { grid-template-columns: repeat(2, 1fr) !important; max-width: none !important; }
        }
      `}</style>
    </>
  );
}
