import { useEffect, useState } from "react"
import { type Achievement } from "../data/portfolio"
import Lightbox from "./Lightbox"
import ContentCarousel from "./ContentCarousel"
import { sortByLatestDate } from "../utils/dateRange"
import { supabase } from "../lib/supabase"

const badge: Record<string, {
  label: string
  color: string
  bg: string
  border: string
}> = {
  gold: {
    label: "1st Place",
    color: "var(--fg-secondary)",
    bg: "var(--bg-card)",
    border: "var(--border)",
  },
  silver: {
    label: "2nd Place",
    color: "var(--fg-secondary)",
    bg: "var(--bg-card)",
    border: "var(--border)",
  },
  bronze: {
    label: "3rd Place",
    color: "var(--fg-secondary)",
    bg: "var(--bg-card)",
    border: "var(--border)",
  },
  blue: {
    label: "Certified",
    color: "var(--accent)",
    bg: "var(--accent-dim)",
    border: "rgba(125,211,167,0.25)",
  },
}

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

function AchievementModal({
  ach,
  onClose,
}: {
  ach: Achievement
  onClose: () => void
}) {
  const [lightbox, setLightbox] = useState<{
    images: string[]
    idx: number
  } | null>(null)
  const b = badge[ach.positionColor] ?? badge.blue

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
          aria-labelledby="achievement-dialog-title"
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
              src={ach.image}
              alt={ach.title}
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
                  style={{
                    display: "inline-block",
                    padding: "0.2rem 0.7rem",
                    background: b.bg,
                    border: `1px solid ${b.border}`,
                    borderRadius: 20,
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    color: b.color,
                    marginBottom: "0.6rem",
                  }}
                >
                  {b.label}
                </span>
                <h2
                  id="achievement-dialog-title"
                  style={{
                    fontFamily: "'Instrument Sans', sans-serif",
                    fontSize: "1.3rem",
                    fontWeight: 700,
                    color: "var(--fg)",
                    marginBottom: "0.2rem",
                  }}
                >
                  {ach.title}
                </h2>
                <p style={{ color: "var(--fg-muted)", fontSize: "0.8rem" }}>
                  {ach.event} · {ach.organizer} · {ach.date}
                </p>
              </div>
              <CloseBtn onClick={onClose} />
            </div>

            <p
              style={{
                color: "var(--fg-secondary)",
                lineHeight: 1.75,
                fontSize: "0.9rem",
                marginBottom: "1rem",
              }}
            >
              {ach.description}
            </p>
            <p
              style={{
                fontSize: "0.84rem",
                color: "var(--fg-muted)",
                marginBottom: "1.5rem",
              }}
            >
              <strong style={{ color: "var(--fg)" }}>Role:</strong> {ach.role}
            </p>

            {ach.gallery.length > 0 && (
              <>
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
                  Documentation
                </p>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(auto-fill, minmax(160px, 1fr))",
                    gap: "0.5rem",
                  }}
                >
                  {ach.gallery.map((img, i) => (
                    <button
                      type="button"
                      className="gallery-thumb"
                      key={i}
                      aria-label={`View image ${i + 1} of ${ach.gallery.length}`}
                      onClick={() =>
                        setLightbox({ images: ach.gallery, idx: i })
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
              </>
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

export default function Achievements() {
  const [achievements, setAchievements] = useState<Achievement[]>([])
  const [selected, setSelected] = useState<Achievement | null>(null)
  const [dataError, setDataError] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    const fetchAchievements = async () => {
      try {
        const { data, error } = await supabase
          .from("achievements")
          .select("*")
          .order("created_at", { ascending: false })
        if (!active) return
        if (error) {
          console.error("Supabase achievements error:", error.message)
          setDataError(error.message)
          return
        }
        setAchievements(
          sortByLatestDate(
            (data ?? []).map((row) => ({
              id: row.id,
              title: row.title ?? "",
              event: row.event ?? "",
              organizer: row.organizer ?? "",
              date: row.date ?? "",
              position: row.position ?? "",
              positionColor: row.position_color ?? "blue",
              description: row.description ?? "",
              role: row.role ?? "",
              image: row.image ?? "",
              gallery: row.gallery ?? [],
            })),
          ),
        )
      } catch (error) {
        if (!active) return
        console.error("Supabase achievements request failed:", error)
        setDataError(
          error instanceof Error ? error.message : "Unexpected request error",
        )
      } finally {
        if (active) setLoading(false)
      }
    }
    void fetchAchievements()
    return () => {
      active = false
    }
  }, [])

  return (
    <>
      <section id="achievements" className="section section-alt">
        <div className="container">
          <p className="section-label">Achievements</p>
          <h2 className="section-title" style={{ marginBottom: "2.5rem" }}>
            Milestones & recognition
          </h2>
          {loading ? (
            <p className="portfolio-state" data-state="loading" role="status">
              Loading achievements...
            </p>
          ) : dataError ? (
            <p className="portfolio-state" data-state="error" role="alert">
              Could not load achievements: {dataError}
            </p>
          ) : achievements.length === 0 ? (
            <p className="portfolio-state" data-state="empty">
              No achievements available.
            </p>
          ) : (
            <ContentCarousel
              className="ach-grid"
              label="achievements"
              itemCount={achievements.length}
            >
              {achievements.map((ach) => {
                const b = badge[ach.positionColor] ?? badge.blue
                return (
                  <article
                    key={ach.id}
                    className="card"
                    style={{ overflow: "hidden" }}
                  >
                    <div
                      style={{
                        aspectRatio: "4/3",
                        background: "var(--bg-alt)",
                        overflow: "hidden",
                        position: "relative",
                      }}
                    >
                      <img
                        src={ach.image}
                        alt={ach.title}
                        className="img-cover"
                        loading="lazy"
                        width={800}
                        height={600}
                      />
                    </div>

                    <div style={{ padding: "1.25rem" }}>
                      <p
                        className="achievement-status"
                        style={{ color: b.color }}
                      >
                        {b.label}
                      </p>
                      <p
                        style={{
                          fontSize: "0.72rem",
                          color: "var(--fg-muted)",
                          marginBottom: "0.35rem",
                        }}
                      >
                        {ach.event} · {ach.date}
                      </p>
                      <h3
                        style={{
                          fontFamily: "'Instrument Sans', sans-serif",
                          fontSize: "0.95rem",
                          fontWeight: 700,
                          color: "var(--fg)",
                          marginBottom: "0.5rem",
                          lineHeight: 1.35,
                        }}
                      >
                        {ach.title}
                      </h3>
                      <p
                        style={{
                          fontSize: "0.82rem",
                          color: "var(--fg-secondary)",
                          lineHeight: 1.65,
                          marginBottom: "1rem",
                        }}
                      >
                        {ach.description.slice(0, 100)}…
                      </p>
                      <button
                        className="btn-outline"
                        style={{
                          width: "100%",
                          justifyContent: "center",
                          padding: "0.6rem",
                          fontSize: "0.82rem",
                        }}
                        onClick={() => setSelected(ach)}
                      >
                        View Details
                      </button>
                    </div>
                  </article>
                )
              })}
            </ContentCarousel>
          )}
        </div>
      </section>

      {selected && (
        <AchievementModal ach={selected} onClose={() => setSelected(null)} />
      )}
    </>
  )
}
