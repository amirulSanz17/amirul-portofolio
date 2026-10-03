import { useCallback, useEffect, useRef, useState } from "react"

import type { Session } from "@supabase/supabase-js"

import { supabase } from "../lib/supabase"

import AdminLayout from "./AdminLayout"

import AdminLogin from "./AdminLogin"

import AdminDashboard from "./AdminDashboard"

import ExperiencesAdmin from "./experiences/ExperiencesAdmin"

import ProjectsAdmin from "./projects/ProjectsAdmin"

import AchievementsAdmin from "./achievements/AchievementsAdmin"

import ActivitiesAdmin from "./activities/ActivitiesAdmin"

import { ADMIN_IDLE_TIMEOUT_MS, clearAdminSession } from "./session"

export function navigateAdmin(path: string) {
  window.history.pushState({}, "", path)

  window.dispatchEvent(new PopStateEvent("popstate"))
}

export default function AdminApp() {
  const [session, setSession] = useState<Session | null | undefined>(undefined)

  const [path, setPath] = useState(window.location.pathname)

  const [authError, setAuthError] = useState("")

  const lastActivityAt = useRef(Date.now())

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, nextSession) => {
        setSession(nextSession)
      },
    )

    const routeListener = () => setPath(window.location.pathname)

    window.addEventListener("popstate", routeListener)

    supabase.auth.getSession().then(({ data, error }) => {
      if (error) {
        console.error("Supabase session error:", error.message)

        setAuthError(`Tidak dapat memeriksa sesi Supabase. ${error.message}`)
      }

      setSession(data.session)
    })

    return () => {
      authListener.subscription.unsubscribe()

      window.removeEventListener("popstate", routeListener)
    }
  }, [])

  const expireSession = useCallback(async () => {
    setSession(null)

    setAuthError(
      "Sesi admin berakhir karena tidak ada aktivitas. Silakan login kembali.",
    )

    navigateAdmin("/admin/login")

    try {
      await clearAdminSession()
    } catch (error) {
      console.error("Gagal menghapus sesi admin yang kedaluwarsa:", error)

      setAuthError(
        "Sesi admin berakhir, tetapi sesi Supabase gagal dihapus. Silakan coba login kembali.",
      )
    }
  }, [])

  useEffect(() => {
    if (!session) return

    if (session.user.id === "c8ba1928-67f3-48df-9cb5-94a2041eee42") return

    setAuthError("Akun ini tidak memiliki akses admin.")

    setSession(null)

    supabase.auth.signOut({ scope: "local" }).then(({ error }) => {
      if (error) {
        console.error("Supabase sign-out error:", error.message)

        setAuthError(`Akun ini tidak memiliki akses admin. ${error.message}`)
      }
    })
  }, [session])

  useEffect(() => {
    if (!session) return

    lastActivityAt.current = Date.now()

    let timeoutId: number

    const checkIdle = () => {
      const remaining =
        ADMIN_IDLE_TIMEOUT_MS - (Date.now() - lastActivityAt.current)

      if (remaining <= 0) {
        void expireSession()

        return
      }

      timeoutId = window.setTimeout(checkIdle, remaining)
    }

    const recordActivity = () => {
      const now = Date.now()

      if (now - lastActivityAt.current < 1000) return

      lastActivityAt.current = now

      window.clearTimeout(timeoutId)

      checkIdle()
    }

    const checkWhenVisible = () => {
      if (document.visibilityState === "visible") {
        window.clearTimeout(timeoutId)
        checkIdle()
      }
    }

    checkIdle()

    window.addEventListener("pointerdown", recordActivity, { passive: true })

    window.addEventListener("pointermove", recordActivity, { passive: true })

    window.addEventListener("keydown", recordActivity)

    window.addEventListener("scroll", recordActivity, { passive: true })

    window.addEventListener("touchstart", recordActivity, { passive: true })

    document.addEventListener("visibilitychange", checkWhenVisible)

    return () => {
      window.clearTimeout(timeoutId)

      window.removeEventListener("pointerdown", recordActivity)

      window.removeEventListener("pointermove", recordActivity)

      window.removeEventListener("keydown", recordActivity)

      window.removeEventListener("scroll", recordActivity)

      window.removeEventListener("touchstart", recordActivity)

      document.removeEventListener("visibilitychange", checkWhenVisible)
    }
  }, [expireSession, session])

  useEffect(() => {
    if (session && path === "/admin/login") navigateAdmin("/admin")
  }, [path, session])

  if (session === undefined) {
    return (
      <main className="admin-auth-page">
        <p>Loading admin session…</p>
      </main>
    )
  }

  if (!session) return <AdminLogin message={authError} />

  const page = path.startsWith("/admin/experiences") ? (
    <ExperiencesAdmin />
  ) : path.startsWith("/admin/projects") ? (
    <ProjectsAdmin />
  ) : path.startsWith("/admin/achievements") ? (
    <AchievementsAdmin />
  ) : path.startsWith("/admin/activities") ? (
    <ActivitiesAdmin />
  ) : (
    <AdminDashboard />
  )

  const returnToPortfolio = async () => {
    try {
      await clearAdminSession()

      setSession(null)

      window.history.pushState({}, "", "/")

      window.dispatchEvent(new PopStateEvent("popstate"))
    } catch (error) {
      console.error("Gagal menghapus sesi admin:", error)

      setAuthError(
        "Sesi admin gagal dihapus. Coba lagi sebelum meninggalkan panel.",
      )
    }
  }

  return (
    <AdminLayout
      email={session.user.email ?? ""}
      onReturnToPortfolio={returnToPortfolio}
    >
      {page}
    </AdminLayout>
  )
}
