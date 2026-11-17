import { profile } from "../data/portfolio"

/**
 * ─── GANTI FOTO ───────────────────────────────────────────────────────────────
 * Ubah PROFILE_PHOTO ke path foto kamu.
 * Taruh file di:  public/images/profile/about.jpg
 * Lalu ganti ke:  const PROFILE_PHOTO = "/images/profile/about.jpg";
 * Ukuran ideal:   500×600 px, portrait.
 * ─────────────────────────────────────────────────────────────────────────────
 */
const PROFILE_PHOTO = "/images/profile/image.png"

export default function About() {
  const info = [
    { label: "Education", value: profile.education },
    { label: "Location", value: profile.location },
    { label: "Status", value: profile.status },
  ]

  return (
    <section id="about" className="section section-alt">
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
          <div className="about-photo-wrap">
            <div
              className="photo-tilt"
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
                width={680}
                height={840}
                loading="lazy"
              />
            </div>
          </div>

          {/* ── Content ── */}
          <div className="about-content">
            <p className="section-label">About Me</p>
            <h2 className="section-title" style={{ marginBottom: "1rem" }}>
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

            <div>
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
    </section>
  )
}
