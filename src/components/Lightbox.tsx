import { useEffect, useState } from "react";

interface Props {
  images: string[];
  initialIndex: number;
  onClose: () => void;
}

export default function Lightbox({ images, initialIndex, onClose }: Props) {
  const [idx, setIdx] = useState(initialIndex);

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setIdx((i) => (i + 1) % images.length);
      if (e.key === "ArrowLeft") setIdx((i) => (i - 1 + images.length) % images.length);
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [images.length, onClose]);

  return (
    <div className="lightbox-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-label="Image viewer">
      <button
        onClick={onClose}
        aria-label="Close"
        style={{
          position: "fixed", top: "1rem", right: "1rem",
          background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)",
          borderRadius: "50%", width: 38, height: 38,
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer", color: "#fff", zIndex: 10,
        }}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M2 2L12 12M12 2L2 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>

      <div style={{ position: "relative", maxWidth: "88vw", maxHeight: "86vh" }} onClick={(e) => e.stopPropagation()}>
        <img
          src={images[idx]}
          alt={`Image ${idx + 1} of ${images.length}`}
          style={{ maxWidth: "88vw", maxHeight: "80vh", objectFit: "contain", borderRadius: 8, display: "block" }}
        />

        {images.length > 1 && (
          <>
            {[
              { dir: "prev", onClick: () => setIdx((i) => (i - 1 + images.length) % images.length), left: true,
                icon: <path d="M8 2L3 7L8 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /> },
              { dir: "next", onClick: () => setIdx((i) => (i + 1) % images.length), left: false,
                icon: <path d="M4 2L9 7L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /> },
            ].map(({ dir, onClick, left, icon }) => (
              <button
                key={dir}
                onClick={onClick}
                aria-label={dir === "prev" ? "Previous" : "Next"}
                style={{
                  position: "absolute", [left ? "left" : "right"]: "-2.75rem", top: "50%", transform: "translateY(-50%)",
                  background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.18)",
                  borderRadius: "50%", width: 36, height: 36,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  cursor: "pointer", color: "#fff",
                }}
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">{icon}</svg>
              </button>
            ))}
          </>
        )}

        <p style={{ textAlign: "center", marginTop: "0.65rem", color: "rgba(255,255,255,0.5)", fontSize: "0.78rem" }}>
          {idx + 1} / {images.length}
        </p>
      </div>
    </div>
  );
}
