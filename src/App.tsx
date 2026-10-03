import { useEffect, useState } from "react"
import { useTheme } from "./hooks/useTheme"
import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import About from "./components/About"
import Skills from "./components/Skills"
import Experience from "./components/Experience"
import Projects from "./components/Projects"
import Achievements from "./components/Achievements"
import Activities from "./components/Activities"
import Contact from "./components/Contact"
import Footer from "./components/Footer"
import AdminApp from "./admin/AdminApp"
import { clearAdminSession } from "./admin/session"

export default function App() {
  const [adminRoute, setAdminRoute] = useState(() =>
    window.location.pathname.startsWith("/admin"),
  )
  const { theme, toggle } = useTheme()

  useEffect(() => {
    const handleRouteChange = () => {
      const isAdminRoute = window.location.pathname.startsWith("/admin")
      setAdminRoute(isAdminRoute)
      if (!isAdminRoute) {
        clearAdminSession().catch((error: unknown) => {
          console.error(
            "Gagal menghapus sesi saat kembali ke portfolio:",
            error,
          )
        })
      }
    }

    if (!window.location.pathname.startsWith("/admin")) {
      clearAdminSession().catch((error: unknown) => {
        console.error("Gagal menghapus sesi pada halaman utama:", error)
      })
    }

    window.addEventListener("popstate", handleRouteChange)
    return () => window.removeEventListener("popstate", handleRouteChange)
  }, [])

  if (adminRoute) return <AdminApp />

  return (
    <>
      <Navbar theme={theme} toggleTheme={toggle} />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Achievements />
        <Activities />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
