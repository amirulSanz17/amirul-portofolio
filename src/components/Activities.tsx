import { useEffect, useState } from "react"
import { type Activity } from "../data/portfolio"
import Lightbox from "./Lightbox"
import ContentCarousel from "./ContentCarousel"
import { sortByLatestDate } from "../utils/dateRange"
import { supabase } from "../lib/supabase"

const FILTERS = [
  "All",
  "Work",
  "Project",
  "Organization",
  "Competition",
  "Campus",
  "Other",
] as const
type FilterVal = typeof FILTERS[number]

const catColor: Record<string, string> = {
  Work: "var(--accent)",
  Project: "var(--accent)",
  Organization: "var(--accent)",
  Competition: "var(--accent)",
  Campus: "var(--accent)",
  Other: "var(--fg-muted)",
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

function ActivityModal({
  act,
  onClose,
}: {
  act: Activity
  onClose: () => void
}) {
  const [lightbox, setLightbox] = useState<{
    images: string[]
    idx: number
  } | null>(null)
  const color = catColor[act.category] ?? "var(--fg-muted)"

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
          aria-labelledby="activity-dialog-title"
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
              src={act.image}
              alt={act.title}
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
                <div
                  style={{
                    display: "flex",
                    gap: "0.5rem",
                    marginBottom: "0.5rem",
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{
                      fontSize: "0.72rem",
                      fontWeight: 600,
                      color,
                      padding: "0.15rem 0.55rem",
                      background: "var(--bg-card)",
                      border: "1px solid var(--border)",
                      borderRadius: 4,
                      cursor: "default",
                    }}
                  >
                    {act.category}
                  </span>
                  <span
                    style={{ fontSize: "0.72rem", color: "var(--fg-muted)" }}
                  >
                    {act.date}
                  </span>
                </div>
                <h2
                  id="activity-dialog-title"
                  style={{
                    fontFamily: "'Instrument Sans', sans-serif",
                    fontSize: "1.3rem",
                    fontWeight: 700,
                    color: "var(--fg)",
                    marginBottom: "0.2rem",
                  }}
                >
                  {act.title}
                </h2>
                <p style={{ color: "var(--fg-muted)", fontSize: "0.8rem" }}>
                  {act.location}
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
              {act.description}
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
                { label: "What I Did", text: act.whatIDid },
                { label: "What I Learned", text: act.whatILearned },
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
                      color,
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

            <div style={{ marginBottom: "1.5rem" }}>
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
                Skills Used
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                {act.skillsUsed.map((s) => (
                  <span key={s} className="tag">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {act.gallery.length > 0 && (
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
                  Gallery
                </p>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(auto-fill, minmax(150px, 1fr))",
                    gap: "0.5rem",
                  }}
                >
                  {act.gallery.map((img, i) => (
                    <button
                      type="button"
                      className="gallery-thumb"
                      key={i}
                      aria-label={`View image ${i + 1} of ${act.gallery.length}`}
                      onClick={() =>
                        setLightbox({ images: act.gallery, idx: i })
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

export default function Activities() {
  const [filter, setFilter] = useState<FilterVal>("All")
  const [activities, setActivities] = useState<Activity[]>([])
  const [selected, setSelected] = useState<Activity | null>(null)
  const [dataError, setDataError] = useState("")
  const [loading, setLoading] = useState(true)

  const filtered =
    filter === "All"
      ? activities
      : activities.filter((a) => a.category === filter)

  useEffect(() => {
    let active = true
    const fetchActivities = async () => {
      try {
        const { data, error } = await supabase
          .from("activities")
          .select("*")
          .order("created_at", { ascending: false })
        if (!active) return
        if (error) {
          console.error("Supabase activities error:", error.message)
          setDataError(error.message)
          return
        }
        setActivities(
          sortByLatestDate(
            (data ?? []).map((row) => ({
              id: row.id,
              title: row.title ?? "",
              category: row.category ?? "Other",
              date: row.date ?? "",
              location: row.location ?? "",
              description: row.description ?? "",
              image: row.image ?? "",
              gallery: row.gallery ?? [],
              whatIDid: row.what_i_did ?? "",
              whatILearned: row.what_i_learned ?? "",
              skillsUsed: row.skills_used ?? [],
            })),
          ),
        )
      } catch (error) {
        if (!active) return
        console.error("Supabase activities request failed:", error)
        setDataError(
          error instanceof Error ? error.message : "Unexpected request error",
        )
      } finally {
        if (active) setLoading(false)
      }
    }
    void fetchActivities()
    return () => {
      active = false
    }
  }, [])

  return (
    <>
      <section id="activities" className="section">
        <div className="container">
          <p className="section-label">Activities</p>
          <h2 className="section-title" style={{ marginBottom: "1.5rem" }}>
            Documented experiences
          </h2>
          {/* Filter */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.45rem",
              marginBottom: "2.25rem",
            }}
          >
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`filter-pill${filter === f ? " active" : ""}`}
                aria-pressed={filter === f}
              >
                {f}
                {f !== "All" && (
                  <span
                    style={{
                      marginLeft: "0.3rem",
                      fontSize: "0.65rem",
                    }}
                  >
                    ({activities.filter((a) => a.category === f).length})
                  </span>
                )}
              </button>
            ))}
          </div>

          {loading ? (
            <p className="portfolio-state" data-state="loading" role="status">
              Loading activities...
            </p>
          ) : dataError ? (
            <p className="portfolio-state" data-state="error" role="alert">
              Could not load activities: {dataError}
            </p>
          ) : activities.length === 0 ? (
            <p className="portfolio-state" data-state="empty">
              No activities available.
            </p>
          ) : filtered.length === 0 ? (
            <p className="portfolio-state" data-state="empty">
              No activities in this category yet.
            </p>
          ) : (
            <ContentCarousel
              key={filter}
              className="act-grid"
              label="activities"
              itemCount={filtered.length}
            >
              {filtered.map((act) => {
                const color = catColor[act.category] ?? "var(--fg-muted)"
                return (
                  <article
                    key={act.id}
                    className="card act-card"
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
                        src={act.image}
                        alt={act.title}
                        className="img-cover"
                        loading="lazy"
                        width={800}
                        height={600}
                      />
                      <span
                        style={{
                          position: "absolute",
                          top: "0.6rem",
                          left: "0.6rem",
                          fontSize: "0.68rem",
                          fontWeight: 600,
                          color,
                          padding: "0.15rem 0.55rem",
                          background: "var(--bg)",
                          border: "1px solid var(--border)",
                          borderRadius: 4,
                          cursor: "default",
                        }}
                      >
                        {act.category}
                      </span>
                    </div>

                    <div style={{ padding: "1.1rem" }}>
                      <p
                        style={{
                          fontSize: "0.7rem",
                          color: "var(--fg-muted)",
                          marginBottom: "0.3rem",
                        }}
                      >
                        {act.date} · {act.location}
                      </p>
                      <h3
                        style={{
                          fontFamily: "'Instrument Sans', sans-serif",
                          fontSize: "0.93rem",
                          fontWeight: 700,
                          color: "var(--fg)",
                          marginBottom: "0.4rem",
                          lineHeight: 1.35,
                        }}
                      >
                        {act.title}
                      </h3>
                      <p
                        style={{
                          fontSize: "0.8rem",
                          color: "var(--fg-secondary)",
                          lineHeight: 1.65,
                          marginBottom: "0.85rem",
                        }}
                      >
                        {act.description.slice(0, 85)}…
                      </p>
                      <button
                        className="btn-ghost"
                        style={{
                          padding: 0,
                          fontSize: "0.8rem",
                          color,
                          gap: "0.3rem",
                          cursor: "pointer",
                        }}
                        onClick={() => setSelected(act)}
                      >
                        Read More
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
        <ActivityModal act={selected} onClose={() => setSelected(null)} />
      )}
    </>
  )
}
