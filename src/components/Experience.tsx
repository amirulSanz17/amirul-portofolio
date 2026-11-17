import { useEffect, useState } from "react"
import { type Experience } from "../data/portfolio"
import Lightbox from "./Lightbox"
import ContentCarousel from "./ContentCarousel"
import { sortByLatestDate } from "../utils/dateRange"
import { supabase } from "../lib/supabase"

/* ── shared close button ── */
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

function ExperienceModal({
  exp,
  onClose,
}: {
  exp: Experience
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
          aria-labelledby="experience-dialog-title"
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
              src={exp.image}
              alt={exp.company}
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
                <h2
                  id="experience-dialog-title"
                  style={{
                    fontFamily: "'Instrument Sans', sans-serif",
                    fontSize: "1.35rem",
                    fontWeight: 700,
                    color: "var(--fg)",
                    marginBottom: "0.2rem",
                  }}
                >
                  {exp.position}
                </h2>
                <p
                  style={{
                    color: "var(--accent)",
                    fontWeight: 600,
                    fontSize: "0.9rem",
                  }}
                >
                  {exp.company}
                </p>
                <p
                  style={{
                    color: "var(--fg-muted)",
                    fontSize: "0.8rem",
                    marginTop: "0.2rem",
                  }}
                >
                  {exp.date} · {exp.location}
                </p>
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
              {exp.description}
            </p>

            <div style={{ marginBottom: "1.25rem" }}>
              <ModalLabel>Responsibilities</ModalLabel>
              <ul
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.45rem",
                }}
              >
                {exp.responsibilities.map((r) => (
                  <li
                    key={r}
                    style={{
                      display: "flex",
                      gap: "0.6rem",
                      alignItems: "flex-start",
                    }}
                  >
                    <span
                      style={{
                        color: "var(--accent)",
                        marginTop: "0.45rem",
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
                        lineHeight: 1.6,
                      }}
                    >
                      {r}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div style={{ marginBottom: "1.25rem" }}>
              <ModalLabel>Skills Used</ModalLabel>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                {exp.skills.map((s) => (
                  <span key={s} className="tag tag-accent">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {exp.gallery.length > 0 && (
              <div>
                <ModalLabel>Gallery</ModalLabel>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(auto-fill, minmax(150px, 1fr))",
                    gap: "0.5rem",
                  }}
                >
                  {exp.gallery.map((img, i) => (
                    <button
                      type="button"
                      className="gallery-thumb"
                      key={i}
                      aria-label={`View image ${i + 1} of ${exp.gallery.length}`}
                      onClick={() =>
                        setLightbox({ images: exp.gallery, idx: i })
                      }
                      style={{
                        aspectRatio: "3/2",
                        borderRadius: 8,
                        overflow: "hidden",
                        cursor: "pointer",
                        background: "var(--bg-alt)",
                        border: "1px solid var(--border)",
                      }}
                    >
                      <img
                        src={img}
                        alt=""
                        className="img-cover"
                        loading="lazy"
                        width={600}
                        height={400}
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}
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

export default function Experience() {
  const [experiences, setExperiences] = useState<Experience[]>([])
  const [selected, setSelected] = useState<Experience | null>(null)
  const [dataError, setDataError] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    const fetchExperiences = async () => {
      try {
        const { data, error } = await supabase
          .from("experiences")
          .select("*")
          .order("created_at", { ascending: false })
        if (!active) return
        if (error) {
          console.error("Supabase experiences error:", error.message)
          setDataError(error.message)
          return
        }
        setExperiences(
          sortByLatestDate(
            (data ?? []).map((row) => ({
              id: row.id,
              company: row.company ?? "",
              position: row.position ?? "",
              location: row.location ?? "",
              date: row.date ?? "",
              image: row.image ?? "",
              description: row.description ?? "",
              responsibilities: row.responsibilities ?? [],
              skills: row.skills ?? [],
              gallery: row.gallery ?? [],
            })),
          ),
        )
      } catch (error) {
        if (!active) return
        console.error("Supabase experiences request failed:", error)
        setDataError(
          error instanceof Error ? error.message : "Unexpected request error",
        )
      } finally {
        if (active) setLoading(false)
      }
    }
    void fetchExperiences()
    return () => {
      active = false
    }
  }, [])

  return (
    <>
      <section id="experience" className="section section-alt">
        <div className="container">
          <p className="section-label">Experience</p>
          <h2 className="section-title" style={{ marginBottom: "2.5rem" }}>
            Where I've worked
          </h2>
          {loading ? (
            <p className="portfolio-state" data-state="loading" role="status">
              Loading experience...
            </p>
          ) : dataError ? (
            <p className="portfolio-state" data-state="error" role="alert">
              Could not load experience data: {dataError}
            </p>
          ) : experiences.length === 0 ? (
            <p className="portfolio-state" data-state="empty">
              No experience entries available.
            </p>
          ) : (
            <ContentCarousel
              className="exp-grid"
              label="experience"
              itemCount={experiences.length}
            >
              {experiences.map((exp) => (
                <article
                  key={exp.id}
                  className="card"
                  style={{ overflow: "hidden" }}
                >
                  {/* image with zoom */}
                  <div
                    style={{
                      aspectRatio: "4/3",
                      background: "var(--bg-alt)",
                      overflow: "hidden",
                      position: "relative",
                    }}
                  >
                    <img
                      src={exp.image}
                      alt={exp.company}
                      className="img-cover"
                      loading="lazy"
                      width={800}
                      height={500}
                    />
                  </div>

                  <div style={{ padding: "1.25rem" }}>
                    <h3
                      style={{
                        fontFamily: "'Instrument Sans', sans-serif",
                        fontSize: "0.97rem",
                        fontWeight: 700,
                        color: "var(--fg)",
                        marginBottom: "0.2rem",
                      }}
                    >
                      {exp.company}
                    </h3>
                    <p
                      style={{
                        fontSize: "0.82rem",
                        color: "var(--fg-muted)",
                        marginBottom: "0.8rem",
                      }}
                    >
                      {exp.position} · {exp.location} · {exp.date}
                    </p>
                    <p
                      style={{
                        fontSize: "0.82rem",
                        color: "var(--fg-secondary)",
                        lineHeight: 1.65,
                        marginBottom: "0.9rem",
                      }}
                    >
                      {exp.description.slice(0, 100)}…
                    </p>
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "0.35rem",
                        marginBottom: "1rem",
                      }}
                    >
                      {exp.skills.slice(0, 3).map((s) => (
                        <span key={s} className="tag">
                          {s}
                        </span>
                      ))}
                    </div>
                    <button
                      className="btn-outline"
                      style={{
                        width: "100%",
                        justifyContent: "center",
                        padding: "0.6rem",
                        fontSize: "0.82rem",
                      }}
                      onClick={() => setSelected(exp)}
                    >
                      View Details
                    </button>
                  </div>
                </article>
              ))}
            </ContentCarousel>
          )}
        </div>
      </section>

      {selected && (
        <ExperienceModal exp={selected} onClose={() => setSelected(null)} />
      )}
    </>
  )
}
