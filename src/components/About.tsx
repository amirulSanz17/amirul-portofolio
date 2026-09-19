import { useEffect, useRef } from "react";
import { profile } from "../data/portfolio";

/**
 * ─── GANTI FOTO ───────────────────────────────────────────────────────────────
 * Ubah PROFILE_PHOTO ke path foto kamu.
 * Taruh file di:  public/images/profile/about.jpg
 * Lalu ganti ke:  const PROFILE_PHOTO = "/images/profile/about.jpg";
 * Ukuran ideal:   500×600 px, portrait.
 * ─────────────────────────────────────────────────────────────────────────────
 */
const PROFILE_PHOTO = "/images/profile/image.png";

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);

  /* scroll reveal */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.querySelectorAll(".reveal").forEach((r, i) => {
            (r as HTMLElement).style.transitionDelay = `${i * 0.07}s`;
            r.classList.add("visible");
          });
          obs.unobserve(entry.target);
        }
      },
      { threshold: 0.1 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  /* tilt on photo */
  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = photoRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(700px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) scale(1.02)`;
  };

  const onLeave = () => {
    if (photoRef.current)
      photoRef.current.style.transform =
        "perspective(700px) rotateY(0deg) rotateX(0deg) scale(1)";
  };

  const info = [
    { label: "Education", value: profile.education },
    { label: "Location", value: profile.location },
    { label: "Status", value: profile.status },
  ];

  return (
    <section
      id="about"
      className="section section-alt"
      ref={sectionRef as React.RefObject<HTMLElement>}
    >
      <div className="container">
        <div
          className="about-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "auto 1fr",
            gap: "4rem",
            alignItems: "start",
          }}
        >
          {/* ── Photo ── */}
          <div className="reveal about-photo-wrap">
            <div
              ref={photoRef}
              className="photo-tilt"
              onMouseMove={onMove}
              onMouseLeave={onLeave}
              style={{
                width: 360,
                height: 440,
                borderRadius: 14,
                overflow: "hidden",
                border: "1px solid var(--border-strong)",
                boxShadow: "0 6px 32px rgba(0,0,0,0.55)",
                background: "var(--bg-card)",
                cursor: "crosshair",
                position: "relative",
              }}
            >
              <img
                src={PROFILE_PHOTO}
                alt="Amirul Ichsandina"
                className="img-cover"
              />

              {/* hover tint overlay */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(160deg, rgba(77,124,255,0.14) 0%, transparent 55%)",
                  opacity: 0,
                  transition: "opacity 0.3s",
                  pointerEvents: "none",
                }}
                className="photo-hover-overlay"
              />
            </div>

            {/* small accent line under photo */}
            <div
              style={{
                marginTop: "0.75rem",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  width: 36,
                  height: 2,
                  background: "var(--accent)",
                  borderRadius: 2,
                  opacity: 0.6,
                }}
              />
            </div>
          </div>

          {/* ── Content ── */}
          <div className="about-content">
            <p className="section-label reveal">About Me</p>
            <h2
              className="section-title reveal"
              style={{ marginBottom: "1rem" }}
            >
              A bit about myself
            </h2>

            <p
              className="about-description"
              style={{
                color: "var(--fg-secondary)",
                lineHeight: 1.8,
                marginBottom: "1.75rem",
                maxWidth: 700,
              }}
            >
              {profile.about}
            </p>

            <div
              className="reveal"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.6rem",
                marginBottom: "1.5rem",
              }}
            >
              {info.map(({ label, value }) => (
                <div
                  key={label}
                  style={{
                    display: "flex",
                    gap: "0.75rem",
                    alignItems: "flex-start",
                  }}
                >
                  <span
                    className="about-info-label"
                    style={{
                      fontSize: "0.68rem",
                      fontWeight: 600,
                      color: "var(--fg-muted)",
                      textTransform: "uppercase",
                      letterSpacing: "0.09em",
                      minWidth: 78,
                      paddingTop: "0.15rem",
                    }}
                  >
                    {label}
                  </span>
                  <span
                    className="about-info-value"
                    style={{ fontSize: "0.875rem", color: "var(--fg)" }}
                  >
                    {value}
                  </span>
                </div>
              ))}
            </div>

            <div className="reveal">
              <p
                style={{
                  fontSize: "0.68rem",
                  fontWeight: 600,
                  color: "var(--fg-muted)",
                  textTransform: "uppercase",
                  letterSpacing: "0.09em",
                  marginBottom: "0.6rem",
                }}
              >
                Interests
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                {profile.interests.map((i) => (
                  <span key={i} className="tag tag-accent">
                    {i}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .about-photo-wrap:hover .photo-hover-overlay { opacity: 1 !important; }
        @media (min-width: 769px) {
          .about-grid {
            max-width: 1400px;
            margin: 0 auto;
            grid-template-columns: 360px minmax(0, 760px) !important;
            gap: 6rem !important;
            align-items: center !important;
            justify-content: center;
          }
          .about-content .section-title { font-size: clamp(2.4rem, 3.5vw, 3.2rem); }
          .about-description { font-size: 1.15rem !important; }
          .about-info-label { font-size: 0.78rem !important; min-width: 96px !important; }
          .about-info-value { font-size: 1rem !important; }
          .about-content .tag { font-size: 0.82rem; }
        }
        @media (max-width: 700px) {
          .about-grid { grid-template-columns: 1fr !important; gap: 2rem !important; }
          .about-photo-wrap { display: flex; flex-direction: column; align-items: center; }
          .about-photo-wrap > div:first-child { width: 200px !important; height: 245px !important; }
        }
      `}</style>
    </section>
  );
}
