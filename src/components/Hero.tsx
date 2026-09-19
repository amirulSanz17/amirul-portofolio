import { useRef } from "react";
import { profile } from "../data/portfolio";

/**
 * ─── GANTI FOTO PROFIL ───────────────────────────────────────────────────────
 * Ubah nilai PROFILE_PHOTO di bawah ini ke path foto kamu.
 * Taruh file di:  public/images/profile/photo.jpg
 * Lalu ganti ke:  const PROFILE_PHOTO = "/images/profile/photo.jpg";
 * Ukuran ideal:   min 600×750 px, format portrait.
 * ─────────────────────────────────────────────────────────────────────────────
 */
const PROFILE_PHOTO = "/images/profile/image.png";

export default function Hero() {
  const photoRef = useRef<HTMLDivElement>(null);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  /* 3-D tilt on mouse move */
  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = photoRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(700px) rotateY(${x * 12}deg) rotateX(${-y * 12}deg) scale(1.03)`;
  };

  const onLeave = () => {
    if (photoRef.current)
      photoRef.current.style.transform =
        "perspective(700px) rotateY(0deg) rotateX(0deg) scale(1)";
  };

  return (
    <section
      id="home"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        paddingTop: 58,
        background: "var(--bg)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* subtle grid pattern */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.03,
          backgroundImage:
            "linear-gradient(var(--hero-grid) 1px, transparent 1px)," +
            "linear-gradient(90deg, var(--hero-grid) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          pointerEvents: "none",
        }}
      />

      <div
        className="container"
        style={{ position: "relative", zIndex: 1, width: "100%" }}
      >
        <div
          className="hero-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 380px",
            gap: "3rem",
            alignItems: "center",
            padding: "4rem 0 5rem",
          }}
        >
          {/* ── Text ── */}
          <div>
            <p
              className="hero-eyebrow"
              style={{
                fontSize: "0.72rem",
                fontWeight: 600,
                color: "var(--accent)",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                marginBottom: "1.25rem",
              }}
            >
              Information Systems Student
            </p>

            <h1
              className="hero-title"
              style={{
                fontFamily: "'Instrument Sans', sans-serif",
                fontSize: "clamp(2.6rem, 6vw, 4.8rem)",
                fontWeight: 700,
                lineHeight: 1.02,
                letterSpacing: "-0.03em",
                color: "var(--fg)",
                marginBottom: "1.25rem",
              }}
            >
              Hi, I&apos;m{" "}
              <span style={{ color: "var(--accent)" }}>Amirul</span>
              <br />
              Ichsandina.
            </h1>

            <p
              className="hero-tagline"
              style={{
                fontSize: "1rem",
                color: "var(--fg-muted)",
                lineHeight: 1.8,
                maxWidth: 460,
                marginBottom: "2.25rem",
              }}
            >
              {profile.tagline}
            </p>

            {/* CTA row */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "0.65rem",
                marginBottom: "2.5rem",
              }}
            >
              <button
                className="btn-primary"
                onClick={() => scrollTo("projects")}
              >
                View My Work
              </button>
              <button
                className="btn-outline"
                onClick={() => scrollTo("contact")}
              >
                Contact Me
              </button>
              <button className="btn-ghost" onClick={() => scrollTo("about")}>
                About Me
              </button>
            </div>

            {/* Social links */}
            <div
              style={{
                display: "flex",
                gap: "1.25rem",
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              {[
                {
                  label: "GitHub",
                  href: profile.github,
                  icon: (
                    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                  ),
                },
                {
                  label: "LinkedIn",
                  href: profile.linkedin,
                  icon: (
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  ),
                },
              ].map(({ label, href, icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  style={{
                    color: "var(--fg-muted)",
                    transition: "color 0.15s, transform 0.15s",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.4rem",
                    fontSize: "0.83rem",
                    fontWeight: 500,
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "var(--fg)";
                    e.currentTarget.style.transform = "translateY(-1px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "var(--fg-muted)";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  <svg
                    width="17"
                    height="17"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    {icon}
                  </svg>
                  {label}
                </a>
              ))}
              <span
                style={{
                  width: 1,
                  height: 14,
                  background: "var(--border-strong)",
                }}
              />
              <a
                href={`mailto:${profile.email}`}
                style={{
                  color: "var(--fg-muted)",
                  fontSize: "0.83rem",
                  fontWeight: 500,
                  transition: "color 0.15s, transform 0.15s",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "var(--fg)";
                  e.currentTarget.style.transform = "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "var(--fg-muted)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                Email
              </a>
            </div>
          </div>

          {/* ── Photo with 3D tilt ── */}
          <div
            className="hero-photo-wrap"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <div
              ref={photoRef}
              className="photo-tilt"
              onMouseMove={onMove}
              onMouseLeave={onLeave}
              style={{
                width: "min(100%, 440px)",
                maxWidth: "100%",
                height: "auto",
                aspectRatio: "11 / 13.5",
                borderRadius: 18,
                overflow: "hidden",
                border: "1px solid var(--border-strong)",
                boxShadow: "0 12px 48px rgba(0,0,0,0.5)",
                background: "var(--bg-card)",
                cursor: "crosshair",
                position: "relative",
              }}
            >
              <img
                src={PROFILE_PHOTO}
                alt="Amirul Ichsandina"
                className="img-cover"
                style={{ transition: "transform 0.4s ease" }}
              />
              {/* hover overlay */}
              <div
                className="photo-overlay"
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(135deg, rgba(77,124,255,0.15) 0%, transparent 60%)",
                  opacity: 0,
                  transition: "opacity 0.3s",
                  pointerEvents: "none",
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* scroll cue */}
      <div
        style={{
          position: "absolute",
          bottom: "2rem",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.4rem",
          color: "var(--fg-subtle)",
          userSelect: "none",
        }}
      >
        <span
          style={{
            fontSize: "0.6rem",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}
        >
          Scroll
        </span>
        <div
          style={{
            width: 1,
            height: 36,
            background:
              "linear-gradient(to bottom, var(--fg-subtle), transparent)",
          }}
        />
      </div>

      <style>{`
        .hero-grid:hover .photo-overlay { opacity: 1 !important; }
        @media (min-width: 769px) {
          .hero-grid {
            grid-template-columns: minmax(0, 1fr) minmax(280px, min(480px, 40vw)) !important;
            gap: clamp(2rem, 5vw, 5rem) !important;
            padding: 5rem 0 6rem !important;
          }
          .hero-eyebrow { font-size: 0.82rem !important; }
          .hero-title { font-size: clamp(3.6rem, 6vw, 5.8rem) !important; }
          .hero-tagline { font-size: 1.2rem !important; max-width: 620px !important; }
          .hero-grid .btn-primary,
          .hero-grid .btn-outline,
          .hero-grid .btn-ghost { font-size: 0.98rem; }
          .hero-grid a { font-size: 0.95rem !important; }
        }
        @media (max-width: 768px) {
          .hero-grid { grid-template-columns: 1fr !important; gap: 2.5rem !important; padding: 3rem 0 4rem !important; }
          .hero-photo-wrap > div {
            width: min(72vw, 320px) !important;
            height: auto !important;
            aspect-ratio: 11 / 13.5;
          }
        }
      `}</style>
    </section>
  );
}
