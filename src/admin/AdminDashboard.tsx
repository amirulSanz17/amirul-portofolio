import { useEffect, useState } from "react"

import { supabase } from "../lib/supabase"
import { navigateAdmin } from "./AdminApp"

const sections = [
  {
    label: "Experience",
    path: "/admin/experiences",
    table: "experiences",
    text: "Kelola pengalaman kerja dan skills.",
  },
  {
    label: "Projects",
    path: "/admin/projects",
    table: "projects",
    text: "Kelola project, teknologi, dan tautan.",
  },
  {
    label: "Achievements",
    path: "/admin/achievements",
    table: "achievements",
    text: "Kelola pencapaian dan sertifikasi.",
  },
  {
    label: "Activities",
    path: "/admin/activities",
    table: "activities",
    text: "Kelola aktivitas dan dokumentasi.",
  },
]

function getErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message
  return "Terjadi kesalahan yang tidak diketahui."
}

export default function AdminDashboard() {
  const [counts, setCounts] = useState<Record<string, number>>({})
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(true)
  const [refreshKey, setRefreshKey] = useState(0)

  useEffect(() => {
    let active = true

    async function loadCounts() {
      setLoading(true)
      setErrors({})

      const results = await Promise.all(
        sections.map(async (section) => {
          try {
            const { count, error } = await supabase
              .from(section.table)
              .select("id", { count: "exact", head: true })

            if (error) {
              return {
                path: section.path,
                count: null,
                error: error.message,
              }
            }

            if (count === null) {
              return {
                path: section.path,
                count: null,
                error: "Server tidak mengembalikan jumlah data.",
              }
            }

            return {
              path: section.path,
              count,
              error: null,
            }
          } catch (error) {
            return {
              path: section.path,
              count: null,
              error: getErrorMessage(error),
            }
          }
        }),
      )

      if (!active) return

      const nextCounts: Record<string, number> = {}
      const nextErrors: Record<string, string> = {}

      for (const result of results) {
        if (result.error) {
          nextErrors[result.path] = result.error
        } else if (result.count !== null) {
          nextCounts[result.path] = result.count
        }
      }

      setCounts(nextCounts)
      setErrors(nextErrors)
      setLoading(false)
    }

    void loadCounts()

    return () => {
      active = false
    }
  }, [refreshKey])

  const hasErrors = Object.keys(errors).length > 0

  return (
    <>
      <p className="section-label">Portfolio CMS</p>
      <h1 className="section-title">Dashboard</h1>
      <p className="admin-muted admin-intro">
        Pilih bagian portfolio yang ingin dikelola.
      </p>

      {hasErrors && (
        <div className="admin-alert admin-alert-error admin-dashboard-error">
          <p role="alert">
            {sections
              .filter((section) => errors[section.path])
              .map(
                (section) =>
                  `${section.label}: ${errors[section.path]}`,
              )
              .join(", ")}
          </p>
          <button
            type="button"
            className="btn-outline"
            onClick={() => setRefreshKey((key) => key + 1)}
          >
            Coba lagi
          </button>
        </div>
      )}

      <div className="admin-dashboard-grid">
        {sections.map((section) => (
          <button
            key={section.path}
            type="button"
            className="admin-section-card card"
            onClick={() => navigateAdmin(section.path)}
          >
            <span className="section-label">Manage</span>
            <h2>{section.label}</h2>
            <p>{section.text}</p>
            <span
              className="admin-section-count"
              role={loading ? "status" : undefined}
            >
              {loading
                ? "Memuat jumlah..."
                : errors[section.path]
                  ? "Jumlah tidak tersedia"
                  : `${counts[section.path] ?? 0} konten`}
            </span>
            <span className="admin-card-link">Kelola konten →</span>
          </button>
        ))}
      </div>
    </>
  )
}
