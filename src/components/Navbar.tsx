import { useEffect, useState } from "react";

const NAV = [
  { label: "Home",         id: "home" },
  { label: "About",        id: "about" },
  { label: "Skills",       id: "skills" },
  { label: "Experience",   id: "experience" },
  { label: "Projects",     id: "projects" },
  { label: "Achievements", id: "achievements" },
  { label: "Activities",   id: "activities" },
  { label: "Contact",      id: "contact" },
];

interface Props {
  theme: "dark" | "light";
  toggleTheme: () => void;
}

function SunIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5"/>
      <line x1="12" y1="1" x2="12" y2="3"/>
      <line x1="12" y1="21" x2="12" y2="23"/>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
      <line x1="1" y1="12" x2="3" y2="12"/>
      <line x1="21" y1="12" x2="23" y2="12"/>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  );
}

export default function Navbar({ theme, toggleTheme }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [active,   setActive]   = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); });
      },
      { threshold: 0.35 }
    );
    NAV.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      style={{
        position: "fixed",
        top: 0, left: 0, right: 0,
        zIndex: 1000,
        background: scrolled ? "var(--nav-bg-scrolled)" : "transparent",
        borderBottom: scrolled ? "1px solid var(--nav-border)" : "1px solid transparent",
        backdropFilter: scrolled ? "blur(14px)" : "none",
        transition: "background 0.3s, border-color 0.3s",
      }}
    >
      <div className="container" style={{ display: "flex", alignItems: "center", height: 58, gap: "1.5rem" }}>

        {/* Logo */}
        <button
          onClick={() => scrollTo("home")}
          style={{
            background: "none", border: "none",
            cursor: "pointer",
            fontFamily: "'Instrument Sans', sans-serif",
            fontWeight: 700, fontSize: "1.25rem",
            color: "var(--fg)", letterSpacing: "-0.01em",
            padding: 0, flexShrink: 0,
            transition: "opacity 0.15s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.75")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
        >
          Amirul <span style={{ color: "var(--accent)" }}>Ichsandina</span>
        </button>

        {/* Desktop links */}
        <div className="nav-desktop" style={{ display: "flex", alignItems: "center", gap: "1.5rem", marginLeft: "auto" }}>
          {NAV.map(({ label, id }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className={`nav-link${active === id ? " active" : ""}`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Theme toggle — always visible */}
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          title={theme === "dark" ? "Light mode" : "Dark mode"}
        >
          {theme === "dark" ? <SunIcon /> : <MoonIcon />}
        </button>

        {/* Mobile hamburger — far right on mobile */}
        <button
          className="nav-mobile-btn"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          style={{
            display: "none",
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "var(--fg)",
            padding: "0.25rem",
            lineHeight: 0,
          }}
        >
          {menuOpen ? (
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <path d="M3 3L19 19M19 3L3 19" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <path d="M3 6H19M3 11H19M3 16H19" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          )}
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div
          style={{
            background: "var(--nav-bg-mobile)",
            borderTop: "1px solid var(--nav-border)",
            padding: "0.5rem 1.5rem 1.25rem",
          }}
        >
          {NAV.map(({ label, id }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              style={{
                display: "block",
                width: "100%",
                textAlign: "left",
                background: "none",
                border: "none",
                borderBottom: "1px solid var(--border)",
                cursor: "pointer",
                color: active === id ? "var(--accent)" : "var(--fg)",
                fontFamily: "'Inter', sans-serif",
                fontWeight: 500,
                fontSize: "0.95rem",
                padding: "0.7rem 0",
                transition: "color 0.15s",
              }}
            >
              {label}
            </button>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .nav-desktop    { display: none !important; }
          .nav-mobile-btn { display: block !important; }
          .theme-toggle   { margin-left: auto; }
        }
      `}</style>
    </nav>
  );
}
