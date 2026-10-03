import type { ReactNode } from "react"

import { useState } from "react"

import { navigateAdmin } from "./AdminApp"

import { supabase } from "../lib/supabase"

const links = [
  { label: "Dashboard", path: "/admin" },

  { label: "Experience", path: "/admin/experiences" },

  { label: "Projects", path: "/admin/projects" },

  { label: "Achievements", path: "/admin/achievements" },

  { label: "Activities", path: "/admin/activities" },
]

export default function AdminLayout({
  email,

  children,

  onReturnToPortfolio,
}: {
  email: string

  children: ReactNode

  onReturnToPortfolio: () => void
}) {
  const [error, setError] = useState("")

  async function signOut() {
    setError("")

    const { error: signOutError } = await supabase.auth.signOut({
      scope: "local",
    })

    if (signOutError) setError(signOutError.message)
    else navigateAdmin("/admin/login")
  }

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <a
          className="admin-brand"
          href="/"
          onClick={(event) => {
            event.preventDefault()

            void onReturnToPortfolio()
          }}
        >
          Amirul <span>Ichsandina</span>
        </a>
        <p className="admin-sidebar-label">Workspace</p>
        <nav className="admin-nav">
          {links.map((link) => (
            <a
              key={link.path}
              href={link.path}
              onClick={(event) => {
                event.preventDefault()

                navigateAdmin(link.path)
              }}
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="admin-account">
          <span className="admin-muted">{email}</span>
          <button className="btn-outline" onClick={signOut}>
            Sign out
          </button>
        </div>
      </aside>
      <main className="admin-main">
        {error && (
          <p className="admin-alert admin-alert-error" role="alert">
            {error}
          </p>
        )}
        {children}
      </main>
    </div>
  )
}
