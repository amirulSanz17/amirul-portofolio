import { useState } from "react"
import { profile } from "../data/portfolio"

/* Brand colors per platform */
const CONNECT = [
  {
    label: "GitHub",
    href: () => profile.github,
    color: "#6e7681",
    hoverColor: "#e6edf3",
    bg: "rgba(110,118,129,0.12)",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: () => profile.linkedin,
    color: "#0a66c2",
    hoverColor: "#0a66c2",
    bg: "rgba(10,102,194,0.10)",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: () => profile.instagram,
    color: "#e1306c",
    hoverColor: "#e1306c",
    bg: "rgba(225,48,108,0.10)",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
      </svg>
    ),
  },
  {
    label: "WhatsApp",
    href: () => profile.whatsapp,
    color: "#25d366",
    hoverColor: "#25d366",
    bg: "rgba(37,211,102,0.10)",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zm-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884zm8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
      </svg>
    ),
  },
  {
    label: "Email",
    href: () => `mailto:${profile.email}`,
    color: "var(--accent)",
    hoverColor: "var(--accent)",
    bg: "var(--accent-dim)",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="M2 7l10 7 10-7" />
      </svg>
    ),
  },
]

const SECTIONS = [
  "about",
  "skills",
  "experience",
  "projects",
  "achievements",
  "activities",
  "contact",
]

function ConnectIcon({ item }: { item: typeof CONNECT[0] }) {
  const [hovered, setHovered] = useState(false)
  const href = item.href()

  const style: React.CSSProperties = {
    width: 40,
    height: 40,
    borderRadius: 10,
    background: hovered ? item.bg : "var(--bg-card)",
    border: `1px solid ${hovered ? "var(--border-strong)" : "var(--border)"}`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: hovered ? item.hoverColor : "var(--fg-muted)",
    textDecoration: "none",
    cursor: "pointer",
    transition: "background 0.18s, border-color 0.18s, color 0.18s",
    transform: "none",
    boxShadow: "none",
    flexShrink: 0,
  }

  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel="noopener noreferrer"
      title={item.label}
      aria-label={item.label}
      style={style}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onTouchStart={() => setHovered(true)}
      onTouchEnd={() => setTimeout(() => setHovered(false), 300)}
    >
      {item.icon}
    </a>
  )
}

export default function Footer() {
  const go = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "auto" })

  return (
    <footer
      style={{
        borderTop: "1px solid var(--border)",
        background: "var(--bg-alt)",
        padding: "2.75rem 0 1.5rem",
      }}
    >
      <div className="container">
        {/* ── Main grid ── */}
        <div
          className="footer-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "200px 1fr 1fr",
            gap: "2.5rem",
            marginBottom: "2rem",
            alignItems: "start",
          }}
        >
          {/* Brand */}
          <div>
            <button
              onClick={() => go("home")}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontFamily: "'Instrument Sans', sans-serif",
                fontWeight: 700,
                fontSize: "1rem",
                color: "var(--fg)",
                padding: 0,
                marginBottom: "0.45rem",
                display: "block",
                transition: "color 0.15s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "var(--accent)")
              }
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--fg)")}
            >
              Amirul <span style={{ color: "var(--accent)" }}>Ichsandina</span>
            </button>
            <p
              style={{
                fontSize: "0.8rem",
                color: "var(--fg-muted)",
                lineHeight: 1.65,
              }}
            >
              Information Systems student building digital solutions.
            </p>
          </div>

          {/* Sections */}
          <div>
            <p
              style={{
                fontSize: "0.63rem",
                fontWeight: 700,
                color: "var(--fg-subtle)",
                textTransform: "uppercase",
                letterSpacing: "0.13em",
                marginBottom: "0.8rem",
              }}
            >
              Sections
            </p>
            <div
              className="footer-sections"
              style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}
            >
              {SECTIONS.map((id) => (
                <button
                  key={id}
                  onClick={() => go(id)}
                  style={{
                    background: "var(--bg-card)",
                    border: "1px solid var(--border)",
                    borderRadius: 20,
                    cursor: "pointer",
                    color: "var(--fg-muted)",
                    fontSize: "0.77rem",
                    fontWeight: 500,
                    padding: "0.26rem 0.72rem",
                    fontFamily: "'Inter', sans-serif",
                    textTransform: "capitalize",
                    transition:
                      "color 0.15s, border-color 0.15s, background 0.15s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "var(--accent)"
                    e.currentTarget.style.borderColor = "var(--accent)"
                    e.currentTarget.style.background = "var(--accent-dim)"
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "var(--fg-muted)"
                    e.currentTarget.style.borderColor = "var(--border)"
                    e.currentTarget.style.background = "var(--bg-card)"
                  }}
                >
                  {id.charAt(0).toUpperCase() + id.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Connect */}
          <div>
            <p
              style={{
                fontSize: "0.63rem",
                fontWeight: 700,
                color: "var(--fg-subtle)",
                textTransform: "uppercase",
                letterSpacing: "0.13em",
                marginBottom: "0.8rem",
              }}
            >
              Connect
            </p>
            <div
              className="footer-connect"
              style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}
            >
              {CONNECT.map((item) => (
                <ConnectIcon key={item.label} item={item} />
              ))}
            </div>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div
          style={{ borderTop: "1px solid var(--border)", paddingTop: "1.1rem" }}
        >
          <p
            style={{
              fontSize: "0.74rem",
              color: "var(--fg-subtle)",
              textAlign: "center",
            }}
          >
            © 2026 Amirul Ichsandina. All rights reserved.
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 960px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 2rem !important;
          }
          .footer-grid > div:first-child { grid-column: 1 / -1; }
        }
        @media (max-width: 600px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
            gap: 1.75rem !important;
          }
          .footer-grid > div:first-child { grid-column: 1 !important; }
        }
      `}</style>
    </footer>
  )
}
