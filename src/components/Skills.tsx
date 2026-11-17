import { skills } from "../data/portfolio"

const categories = [
  { label: "Technical Skills", items: skills.technical },
  { label: "Programming & Technology", items: skills.programming },
  { label: "Soft Skills", items: skills.soft },
]

export default function Skills() {
  return (
    <section id="skills" className="section">
      <div className="container">
        <p className="section-label">Skills</p>
        <h2 className="section-title" style={{ marginBottom: "2.5rem" }}>
          What I work with
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1.25rem",
          }}
          className="skills-grid"
        >
          {categories.map((cat, i) => (
            <div
              key={cat.label}
              className="card"
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
                  <span key={skill} className="tag">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
