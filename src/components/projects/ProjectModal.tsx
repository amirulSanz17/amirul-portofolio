import { useEffect, useState } from "react"
import type { Project } from "../../data/portfolio"
import Lightbox from "../Lightbox"

function CloseBtn({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label="Close"
      style={{
        background: "rgba(255,255,255,0.06)",
        border: "1px solid var(--border-strong)",
        borderRadius: 4,
        width: 44,
        height: 44,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        color: "var(--fg-muted)",
        flexShrink: 0,
        transition: "background 0.15s, color 0.15s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "rgba(255,255,255,0.12)"
        e.currentTarget.style.color = "var(--fg)"
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "rgba(255,255,255,0.06)"
        e.currentTarget.style.color = "var(--fg-muted)"
      }}
    >
      <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
        <path
          d="M1.5 1.5L11.5 11.5M11.5 1.5L1.5 11.5"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    </button>
  )
}

function ModalLabel({ children }: { children: React.ReactNode }) {
  return (
    <p
      style={{
        fontSize: "0.68rem",
        fontWeight: 600,
        color: "var(--fg-muted)",
        textTransform: "uppercase",
        letterSpacing: "0.1em",
        marginBottom: "0.6rem",
      }}
    >
      {children}
    </p>
  )
}

export function ProjectModal({
  project,
  onClose,
}: {
  project: Project
  onClose: () => void
}) {
  const [lightbox, setLightbox] = useState<{
    images: string[]
    idx: number
  } | null>(null)

  useEffect(() => {
    document.body.style.overflow = "hidden"

    const h = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }

    window.addEventListener("keydown", h)

    return () => {
      document.body.style.overflow = ""
      window.removeEventListener("keydown", h)
    }
  }, [onClose])

  return (
    <>
      <div className="modal-overlay" onClick={onClose}>
        <div
          className="modal-content"
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-dialog-title"
          tabIndex={-1}
          onClick={(e) => e.stopPropagation()}
        >
          <div
            style={{
              aspectRatio: "16/7",
              background: "var(--bg-alt)",
              overflow: "hidden",
            }}
          >
            <img
              src={project.image}
              alt={project.name}
              className="img-cover"
              width={1200}
              height={750}
            />
          </div>

          <div style={{ padding: "1.75rem" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: "1rem",
                marginBottom: "1.25rem",
              }}
            >
              <div>
                <span
                  className="tag"
                  style={{
                    marginBottom: "0.5rem",
                    display: "inline-block",
                  }}
                >
                  {project.category}
                </span>

                <h2
                  id="project-dialog-title"
                  style={{
                    fontFamily: "'Instrument Sans', sans-serif",
                    fontSize: "1.35rem",
                    fontWeight: 700,
                    color: "var(--fg)",
                    marginBottom: "0.2rem",
                  }}
                >
                  {project.name}
                </h2>

                <p
                  style={{
                    color: "var(--fg-muted)",
                    fontSize: "0.8rem",
                  }}
                >
                  Role: {project.role}
                </p>
                {project.date && (
                  <p
                    style={{
                      color: "var(--fg-muted)",
                      fontSize: "0.8rem",
                      marginTop: "0.2rem",
                    }}
                  >
                    {project.date}
                  </p>
                )}
              </div>

              <CloseBtn onClick={onClose} />
            </div>

            <p
              style={{
                color: "var(--fg-secondary)",
                lineHeight: 1.75,
                fontSize: "0.9rem",
                marginBottom: "1.5rem",
              }}
            >
              {project.description}
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "0.75rem",
                marginBottom: "1.25rem",
              }}
            >
              {[
                { label: "Problem", text: project.problem },
                { label: "Solution", text: project.solution },
              ].map(({ label, text }) => (
                <div
                  key={label}
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid var(--border)",
                    borderRadius: 8,
                    padding: "0.85rem",
                  }}
                >
                  <p
                    style={{
                      fontSize: "0.68rem",
                      fontWeight: 600,
                      color: "var(--accent)",
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      marginBottom: "0.35rem",
                    }}
                  >
                    {label}
                  </p>

                  <p
                    style={{
                      fontSize: "0.83rem",
                      color: "var(--fg-secondary)",
                      lineHeight: 1.6,
                    }}
                  >
                    {text}
                  </p>
                </div>
              ))}
            </div>

            <div style={{ marginBottom: "1.25rem" }}>
              <ModalLabel>Key Features</ModalLabel>

              <ul
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.4rem",
                }}
              >
                {project.features.map((f) => (
                  <li
                    key={f}
                    style={{
                      display: "flex",
                      gap: "0.55rem",
                      alignItems: "center",
                    }}
                  >
                    <span
                      style={{
                        color: "var(--accent)",
                        flexShrink: 0,
                      }}
                    >
                      <svg
                        width="5"
                        height="5"
                        viewBox="0 0 5 5"
                        fill="currentColor"
                      >
                        <circle cx="2.5" cy="2.5" r="2.5" />
                      </svg>
                    </span>

                    <span
                      style={{
                        color: "var(--fg-secondary)",
                        fontSize: "0.875rem",
                      }}
                    >
                      {f}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div style={{ marginBottom: "1.25rem" }}>
              <ModalLabel>Technology</ModalLabel>

              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "0.4rem",
                }}
              >
                {project.tech.map((t) => (
                  <span key={t} className="tag tag-accent">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {project.screenshots.length > 0 && (
              <div style={{ marginBottom: "1.5rem" }}>
                <ModalLabel>Screenshots</ModalLabel>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(auto-fill, minmax(180px, 1fr))",
                    gap: "0.5rem",
                  }}
                >
                  {project.screenshots.map((img, i) => (
                    <button
                      type="button"
                      className="gallery-thumb"
                      key={i}
                      aria-label={`View screenshot ${i + 1} of ${project.screenshots.length}`}
                      onClick={() =>
                        setLightbox({
                          images: project.screenshots,
                          idx: i,
                        })
                      }
                      style={{
                        aspectRatio: "4/3",
                        borderRadius: 8,
                        overflow: "hidden",
                        cursor: "pointer",
                        background: "var(--bg-alt)",
                        border: "1px solid var(--border)",
                        padding: 0,
                      }}
                    >
                      <img
                        src={img}
                        alt={`Screenshot ${i + 1}`}
                        className="img-cover"
                        loading="lazy"
                        width={600}
                        height={450}
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div
              style={{
                display: "flex",
                gap: "0.65rem",
              }}
            >
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline"
                  style={{ fontSize: "0.83rem" }}
                >
                  GitHub ↗
                </a>
              )}

              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                  style={{ fontSize: "0.83rem" }}
                >
                  Live Demo ↗
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {lightbox && (
        <Lightbox
          images={lightbox.images}
          initialIndex={lightbox.idx}
          onClose={() => setLightbox(null)}
        />
      )}
    </>
  )
}
