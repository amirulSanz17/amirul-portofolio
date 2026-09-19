import { useEffect, useRef } from "react";
import { skills } from "../data/portfolio";

const categories = [
  { label: "Technical Skills",       items: skills.technical  },
  { label: "Programming & Technology", items: skills.programming },
  { label: "Soft Skills",            items: skills.soft       },
];

export default function Skills() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.querySelectorAll(".reveal").forEach((r, i) => {
            (r as HTMLElement).style.transitionDelay = `${i * 0.08}s`;
            r.classList.add("visible");
          });
          obs.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="skills" className="section" ref={ref as React.RefObject<HTMLElement>}>
      <div className="container">
        <p className="section-label reveal">Skills</p>
        <h2 className="section-title reveal" style={{ marginBottom: "2.5rem" }}>
          What I work with
        </h2>

        <div
          style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.25rem" }}
          className="skills-grid"
        >
          {categories.map((cat, i) => (
            <div
              key={cat.label}
              className="card reveal"
              style={{ padding: "1.5rem", transitionDelay: `${i * 0.1}s` }}
            >
              <h3
                style={{
                  fontFamily: "'Instrument Sans', sans-serif",
                  fontSize: "0.88rem",
                  fontWeight: 600,
                  color: "var(--fg)",
                  marginBottom: "1rem",
                  paddingBottom: "0.75rem",
                  borderBottom: "1px solid var(--border)",
                }}
              >
                {cat.label}
              </h3>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                {cat.items.map((skill) => (
                  <span
                    key={skill}
                    className="tag"
                    style={{ transition: "background 0.15s, border-color 0.15s, color 0.15s", cursor: "default" }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget;
                      el.style.background = "var(--accent-dim)";
                      el.style.borderColor = "rgba(77,124,255,0.25)";
                      el.style.color = "var(--accent)";
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget;
                      el.style.background = "";
                      el.style.borderColor = "";
                      el.style.color = "";
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px)  { .skills-grid { grid-template-columns: 1fr !important; } }
        @media (min-width: 901px) and (max-width: 1100px) { .skills-grid { grid-template-columns: repeat(2, 1fr) !important; } }
      `}</style>
    </section>
  );
}
