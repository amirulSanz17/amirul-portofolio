import { useEffect, useRef, useState } from "react";
import { type Activity } from "../data/portfolio";
import Lightbox from "./Lightbox";
import { adaptiveGrid } from "../utils/grid";
import { sortByLatestDate } from "../utils/dateRange";
import { supabase } from "../lib/supabase";

const FILTERS = ["All", "Work", "Project", "Organization", "Competition", "Campus", "Other"] as const;
type FilterVal = typeof FILTERS[number];

const catColor: Record<string, string> = {
  Work:         "var(--accent)",
  Project:      "#8b5cf6",
  Organization: "#f59e0b",
  Competition:  "#f43f5e",
  Campus:       "#10b981",
  Other:        "var(--fg-muted)",
};

function CloseBtn({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick} aria-label="Close"
      style={{
        background: "rgba(255,255,255,0.06)", border: "1px solid var(--border-strong)",
        borderRadius: "50%", width: 34, height: 34,
        display: "flex", alignItems: "center", justifyContent: "center",
        cursor: "pointer", color: "var(--fg-muted)", flexShrink: 0,
        transition: "background 0.15s, color 0.15s",
      }}
      onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.12)"; e.currentTarget.style.color = "var(--fg)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.color = "var(--fg-muted)"; }}
    >
      <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
        <path d="M1.5 1.5L11.5 11.5M11.5 1.5L1.5 11.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    </button>
  );
}

function ActivityModal({ act, onClose }: { act: Activity; onClose: () => void }) {
  const [lightbox, setLightbox] = useState<{ images: string[]; idx: number } | null>(null);
  const color = catColor[act.category] ?? "var(--fg-muted)";

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", h);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", h); };
  }, [onClose]);

  return (
    <>
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div style={{ aspectRatio: "16/7", background: "var(--bg-alt)", overflow: "hidden" }}>
            <img src={act.image} alt={act.title} className="img-cover"/>
          </div>

          <div style={{ padding: "1.75rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: "1rem", marginBottom: "1.25rem" }}>
              <div>
                <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.5rem", alignItems: "center" }}>
                  <span style={{ fontSize: "0.72rem", fontWeight: 600, color, padding: "0.15rem 0.55rem", background: `${color}18`, borderRadius: 20, cursor: "default" }}>
                    {act.category}
                  </span>
                  <span style={{ fontSize: "0.72rem", color: "var(--fg-muted)" }}>{act.date}</span>
                </div>
                <h2 style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: "1.3rem", fontWeight: 700, color: "var(--fg)", marginBottom: "0.2rem" }}>
                  {act.title}
                </h2>
                <p style={{ color: "var(--fg-muted)", fontSize: "0.8rem" }}>{act.location}</p>
              </div>
              <CloseBtn onClick={onClose}/>
            </div>

            <p style={{ color: "var(--fg-secondary)", lineHeight: 1.75, fontSize: "0.9rem", marginBottom: "1.5rem" }}>
              {act.description}
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "1.25rem" }}>
              {[
                { label: "What I Did",     text: act.whatIDid },
                { label: "What I Learned", text: act.whatILearned },
              ].map(({ label, text }) => (
                <div key={label} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid var(--border)", borderRadius: 8, padding: "0.85rem" }}>
                  <p style={{ fontSize: "0.68rem", fontWeight: 600, color, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.35rem" }}>
                    {label}
                  </p>
                  <p style={{ fontSize: "0.83rem", color: "var(--fg-secondary)", lineHeight: 1.6 }}>{text}</p>
                </div>
              ))}
            </div>

            <div style={{ marginBottom: "1.5rem" }}>
              <p style={{ fontSize: "0.68rem", fontWeight: 600, color: "var(--fg-muted)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.6rem" }}>
                Skills Used
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                {act.skillsUsed.map((s) => <span key={s} className="tag">{s}</span>)}
              </div>
            </div>

            {act.gallery.length > 0 && (
              <>
                <p style={{ fontSize: "0.68rem", fontWeight: 600, color: "var(--fg-muted)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.6rem" }}>
                  Gallery
                </p>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: "0.5rem" }}>
                  {act.gallery.map((img, i) => (
                    <div
                      key={i}
                      onClick={() => setLightbox({ images: act.gallery, idx: i })}
                      style={{ aspectRatio: "3/2", borderRadius: 8, overflow: "hidden", cursor: "pointer", background: "var(--bg-alt)", border: "1px solid var(--border)" }}
                    >
                      <img src={img} alt="" className="img-cover" loading="lazy"
                        style={{ transition: "transform 0.3s" }}
                        onMouseEnter={(e) => ((e.currentTarget as HTMLImageElement).style.transform = "scale(1.07)")}
                        onMouseLeave={(e) => ((e.currentTarget as HTMLImageElement).style.transform = "scale(1)")}
                      />
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      {lightbox && <Lightbox images={lightbox.images} initialIndex={lightbox.idx} onClose={() => setLightbox(null)}/>}
    </>
  );
}

export default function Activities() {
  const ref    = useRef<HTMLElement>(null);
  const [filter,   setFilter]   = useState<FilterVal>("All");
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selected, setSelected] = useState<Activity | null>(null);
  const [dataError, setDataError] = useState("");

  const filtered = filter === "All" ? activities : activities.filter((a) => a.category === filter);

  useEffect(() => {
    let active = true;
    supabase.from("activities").select("*").order("created_at", { ascending: false }).then(({ data, error }) => {
      if (!active) return;
      if (error) {
        console.error("Supabase activities error:", error.message);
        setDataError(error.message);
        return;
      }
      setActivities(sortByLatestDate((data ?? []).map((row) => ({
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
      }))));
    });
    return () => { active = false; };
  }, []);

  /* grid adapts to visible item count */
  const gridStyle = adaptiveGrid(filtered.length, "1.1rem");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.querySelectorAll(".reveal").forEach((r, i) => {
            (r as HTMLElement).style.transitionDelay = `${i * 0.07}s`;
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

  const handleFilter = (f: FilterVal) => {
    setFilter(f);
    /* re-trigger reveal on newly shown cards */
    setTimeout(() => {
      document.querySelectorAll(".act-card:not(.visible)").forEach((r, i) => {
        (r as HTMLElement).style.transitionDelay = `${i * 0.06}s`;
        r.classList.add("visible");
      });
    }, 50);
  };

  return (
    <>
      <section id="activities" className="section" ref={ref as React.RefObject<HTMLElement>}>
        <div className="container">
          <p className="section-label reveal">Activities</p>
          <h2 className="section-title reveal" style={{ marginBottom: "1.5rem" }}>
            Documented experiences
          </h2>
          {dataError && <p role="alert" style={{ color: "var(--fg-muted)", marginBottom: "1rem" }}>Could not load activities: {dataError}</p>}

          {/* Filter */}
          <div className="reveal" style={{ display: "flex", flexWrap: "wrap", gap: "0.45rem", marginBottom: "2.25rem" }}>
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => handleFilter(f)}
                className={`filter-pill${filter === f ? " active" : ""}`}
              >
                {f}
                {f !== "All" && (
                  <span style={{ marginLeft: "0.3rem", fontSize: "0.65rem", opacity: 0.65 }}>
                    ({activities.filter((a) => a.category === f).length})
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Grid — adapts to filtered count */}
          <div style={gridStyle} className="act-grid">
            {filtered.length === 0 ? (
              <p style={{ color: "var(--fg-muted)", gridColumn: "1 / -1", textAlign: "center", padding: "3rem 0" }}>
                No activities in this category yet.
              </p>
            ) : (
              filtered.map((act, i) => {
                const color = catColor[act.category] ?? "var(--fg-muted)";
                return (
                  <article
                    key={act.id}
                    className="card reveal act-card"
                    style={{ overflow: "hidden", cursor: "pointer", transitionDelay: `${i * 0.07}s` }}
                    onClick={() => setSelected(act)}
                  >
                    <div style={{ aspectRatio: "4/3", background: "var(--bg-alt)", overflow: "hidden", position: "relative" }}>
                      <img
                        src={act.image} alt={act.title}
                        className="img-cover" loading="lazy"
                        style={{ transition: "transform 0.4s ease" }}
                        onMouseEnter={(e) => ((e.currentTarget as HTMLImageElement).style.transform = "scale(1.06)")}
                        onMouseLeave={(e) => ((e.currentTarget as HTMLImageElement).style.transform = "scale(1)")}
                      />
                      <span style={{
                        position: "absolute", top: "0.6rem", left: "0.6rem",
                        fontSize: "0.68rem", fontWeight: 600, color,
                        padding: "0.15rem 0.55rem",
                        background: `${color}18`,
                        borderRadius: 20, backdropFilter: "blur(4px)",
                        cursor: "default",
                      }}>
                        {act.category}
                      </span>
                    </div>

                    <div style={{ padding: "1.1rem" }}>
                      <p style={{ fontSize: "0.7rem", color: "var(--fg-muted)", marginBottom: "0.3rem" }}>
                        {act.date} · {act.location}
                      </p>
                      <h3 style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: "0.93rem", fontWeight: 700, color: "var(--fg)", marginBottom: "0.4rem", lineHeight: 1.35 }}>
                        {act.title}
                      </h3>
                      <p style={{ fontSize: "0.8rem", color: "var(--fg-secondary)", lineHeight: 1.65, marginBottom: "0.85rem" }}>
                        {act.description.slice(0, 85)}…
                      </p>
                      <button
                        className="btn-ghost"
                        style={{ padding: 0, fontSize: "0.8rem", color, gap: "0.3rem", cursor: "pointer" }}
                        onClick={(e) => { e.stopPropagation(); setSelected(act); }}
                      >
                        Read More →
                      </button>
                    </div>
                  </article>
                );
              })
            )}
          </div>
        </div>
      </section>

      {selected && <ActivityModal act={selected} onClose={() => setSelected(null)}/>}

      <style>{`
        @media (max-width: 900px)  { .act-grid { grid-template-columns: 1fr !important; max-width: none !important; } }
        @media (min-width: 901px) and (max-width: 1100px) {
          .act-grid { grid-template-columns: repeat(2, 1fr) !important; max-width: none !important; }
        }
      `}</style>
    </>
  );
}
