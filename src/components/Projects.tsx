import { useEffect, useRef, useState } from "react"
import type { Project } from "../data/portfolio"
import { supabase } from "../lib/supabase"
import { adaptiveGrid } from "../utils/grid"
import { sortByLatestDate } from "../utils/dateRange"
import { ProjectModal } from "./projects/ProjectModal"

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * PROJECTS
 * Data project sekarang diambil dari Supabase.
 *
 * Supabase table:
 * projects
 *
 * Field:
 * id
 * name
 * description
 * role
 * category
 * tech
 * image
 * github
 * demo
 * problem
 * solution
 * features
 * screenshots
 * created_at
 * ─────────────────────────────────────────────────────────────────────────────
 */

export default function Projects() {
  const ref = useRef<HTMLElement>(null)

  const [projects, setProjects] = useState<Project[]>([])
  const [selected, setSelected] = useState<Project | null>(null)

  // Loading dan error state
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const gridStyle = adaptiveGrid(projects.length)

  // ─────────────────────────────────────────────
  // FETCH PROJECTS DARI SUPABASE
  // ─────────────────────────────────────────────
  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true)
      setError(null)

      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("created_at", { ascending: false })

      if (error) {
        console.error("Supabase projects error:", error)
        setError(error.message)
        setLoading(false)
        return
      }

      const formattedProjects: Project[] = sortByLatestDate((data ?? []).map((project) => ({
        id: project.id,
        name: project.name,
        date: project.date ?? "",
        description: project.description ?? "",
        role: project.role ?? "",
        category: project.category ?? "",
        tech: project.tech ?? [],
        image: project.image ?? "",
        github: project.github ?? "",
        demo: project.demo ?? "",
        problem: project.problem ?? "",
        solution: project.solution ?? "",
        features: project.features ?? [],
        screenshots: project.screenshots ?? [],
      })))

      setProjects(formattedProjects)
      setLoading(false)
    }

    fetchProjects()
  }, [])

  // ─────────────────────────────────────────────
  // SCROLL REVEAL ANIMATION
  // ─────────────────────────────────────────────
  useEffect(() => {
    const el = ref.current

    if (!el) return

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.querySelectorAll(".reveal").forEach((r, i) => {
            ;(r as HTMLElement).style.transitionDelay = `${i * 0.09}s`
            r.classList.add("visible")
          })

          obs.unobserve(entry.target)
        }
      },
      { threshold: 0.1 },
    )

    obs.observe(el)

    return () => obs.disconnect()
  }, [])

  return (
    <>
      <section
        id="projects"
        className="section"
        ref={ref as React.RefObject<HTMLElement>}
      >
        <div className="container">
          <p className="section-label reveal">Projects</p>

          <h2
            className="section-title reveal"
            style={{ marginBottom: "2.5rem" }}
          >
            Things I've built
          </h2>

          {/* ─────────────────────────────────────────
              LOADING / ERROR / EMPTY / DATA
          ───────────────────────────────────────── */}
          {loading ? (
            <div
              style={{
                padding: "2rem 0",
                color: "var(--fg-muted)",
                textAlign: "center",
              }}
            >
              Loading projects...
            </div>
          ) : error ? (
            <div
              style={{
                padding: "2rem 0",
                color: "var(--fg-muted)",
                textAlign: "center",
              }}
            >
              Failed to load projects: {error}
            </div>
          ) : projects.length === 0 ? (
            <div
              style={{
                padding: "2rem 0",
                color: "var(--fg-muted)",
                textAlign: "center",
              }}
            >
              No projects available.
            </div>
          ) : (
            <div style={gridStyle} className="proj-grid">
              {projects.map((project, i) => (
                <article
                  key={project.id}
                  className="card reveal"
                  style={{
                    overflow: "hidden",
                    cursor: "pointer",
                    transitionDelay: `${i * 0.09}s`,
                  }}
                  onClick={() => setSelected(project)}
                >
                  <div
                    style={{
                      aspectRatio: "4/3",
                      background: "var(--bg-alt)",
                      overflow: "hidden",
                    }}
                  >
                    <img
                      src={project.image}
                      alt={project.name}
                      className="img-cover"
                      loading="lazy"
                      style={{
                        transition: "transform 0.4s ease",
                      }}
                      onMouseEnter={(e) =>
                        ((e.currentTarget as HTMLImageElement).style.transform =
                          "scale(1.06)")
                      }
                      onMouseLeave={(e) =>
                        ((e.currentTarget as HTMLImageElement).style.transform =
                          "scale(1)")
                      }
                    />
                  </div>

                  <div style={{ padding: "1.25rem" }}>
                    <span
                      className="tag"
                      style={{
                        marginBottom: "0.6rem",
                        display: "inline-block",
                      }}
                    >
                      {project.category}
                    </span>

                    <h3
                      style={{
                        fontFamily: "'Instrument Sans', sans-serif",
                        fontSize: "0.97rem",
                        fontWeight: 700,
                        color: "var(--fg)",
                        marginBottom: "0.4rem",
                      }}
                    >
                      {project.name}
                    </h3>

                    {project.date && (
                      <p
                        style={{
                          fontSize: "0.75rem",
                          color: "var(--fg-muted)",
                          marginBottom: "0.5rem",
                        }}
                      >
                        {project.date}
                      </p>
                    )}

                    <p
                      style={{
                        fontSize: "0.82rem",
                        color: "var(--fg-secondary)",
                        lineHeight: 1.65,
                        marginBottom: "0.85rem",
                      }}
                    >
                      {project.description}
                    </p>

                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "0.35rem",
                        marginBottom: "1rem",
                      }}
                    >
                      {project.tech.map((t) => (
                        <span key={t} className="tag tag-accent">
                          {t}
                        </span>
                      ))}
                    </div>

                    <div
                      style={{
                        display: "flex",
                        gap: "0.5rem",
                      }}
                    >
                      <button
                        className="btn-outline"
                        style={{
                          flex: 1,
                          justifyContent: "center",
                          padding: "0.55rem 0.75rem",
                          fontSize: "0.8rem",
                        }}
                        onClick={(e) => {
                          e.stopPropagation()
                          setSelected(project)
                        }}
                      >
                        View Project
                      </button>

                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-ghost"
                          style={{
                            padding: "0.55rem 0.75rem",
                            cursor: "pointer",
                          }}
                          onClick={(e) => e.stopPropagation()}
                          aria-label="GitHub"
                        >
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                          >
                            <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {selected && (
        <ProjectModal project={selected} onClose={() => setSelected(null)} />
      )}

      <style>{`
        @media (max-width: 900px) {
          .proj-grid {
            grid-template-columns: 1fr !important;
            max-width: none !important;
          }
        }

        @media (min-width: 901px) and (max-width: 1100px) {
          .proj-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            max-width: none !important;
          }
        }
      `}</style>
    </>
  )
}
