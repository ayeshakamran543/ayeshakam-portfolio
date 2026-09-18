import { useEffect } from "react";
import { X, ExternalLink, Smartphone, Code2, Play, ChevronRight } from "lucide-react";
import { CASE_STUDIES } from "./data";

/* ── CASE STUDY MODAL ────────────────────────────────────────────────────── */
export function CaseStudyModal({ project, onClose }) {
  const cs = CASE_STUDIES[project.name];

  useEffect(() => {
    const esc = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", esc);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", esc); document.body.style.overflow = ""; };
  }, []);

  const SectionLabel = ({ children }) => (
    <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".2em", textTransform: "uppercase", color: project.accent, marginBottom: 10 }}>{children}</p>
  );
  const Divider = () => <div style={{ height: 1, background: "rgba(255,255,255,.07)", margin: "32px 0" }} />;

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 1000, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end" }}>
      {/* Backdrop */}
      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,.75)", backdropFilter: "blur(6px)" }} onClick={onClose} />

      {/* Panel */}
      <div style={{
        position: "relative", width: "100%", maxWidth: 860,
        background: "#1E1E1C", borderRadius: "20px 20px 0 0",
        maxHeight: "92vh", overflowY: "auto",
        animation: "slideUpModal .4s cubic-bezier(.16,1,.3,1)",
        boxShadow: "0 -24px 80px rgba(0,0,0,.6)",
      }}>
        {/* Drag pill */}
        <div style={{ display: "flex", justifyContent: "center", padding: "14px 0 0" }}>
          <div style={{ width: 40, height: 4, borderRadius: 2, background: "rgba(255,255,255,.15)" }} />
        </div>

        {/* Close */}
        <button onClick={onClose} style={{ position: "absolute", top: 16, right: 20, background: "rgba(255,255,255,.08)", border: "none", borderRadius: "50%", width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#888780", transition: "background .2s" }}
          onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,.14)"}
          onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,.08)"}>
          <X size={16} />
        </button>

        {/* Content */}
        <div style={{ padding: "16px 40px 48px" }}>
          {/* Header */}
          <div style={{ marginBottom: 28 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
              <div style={{ width: 4, height: 32, background: project.accent, borderRadius: 2 }} />
              <div>
                <p style={{ fontSize: 12, color: "#888780", marginBottom: 2 }}>{cs.client} · {cs.duration}</p>
                <h2 style={{ fontSize: "clamp(26px,5vw,38px)", fontWeight: 700, letterSpacing: "-.02em", lineHeight: 1.1 }}>{project.name}</h2>
              </div>
            </div>
            <p style={{ fontSize: 15, color: project.accent, fontWeight: 500, paddingLeft: 16 }}>{cs.subtitle}</p>
          </div>

          {/* Meta badges */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 28, paddingLeft: 16 }}>
            {project.tags.map(t => (
              <span key={t} style={{ background: "#3A3A37", color: "#D3D1C7", fontSize: 12, fontWeight: 500, padding: "5px 12px", borderRadius: 20 }}>{t}</span>
            ))}
            <span style={{ background: "rgba(93,202,165,.12)", color: project.accent, fontSize: 12, fontWeight: 500, padding: "5px 12px", borderRadius: 20, border: `1px solid ${project.accent}40` }}>
              {cs.role}
            </span>
          </div>

          <Divider />

          {/* Overview */}
          <div style={{ marginBottom: 28 }}>
            <SectionLabel>Overview</SectionLabel>
            <p style={{ fontSize: 15, lineHeight: 1.8, color: "#D3D1C7" }}>{cs.overview}</p>
          </div>

          {/* Challenge + Solution side by side on desktop */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 8 }}>
            <div style={{ background: "#2C2C2A", borderRadius: 12, padding: "20px 20px 24px", borderLeft: `3px solid rgba(216,90,48,.6)` }}>
              <SectionLabel>The Challenge</SectionLabel>
              <p style={{ fontSize: 14, lineHeight: 1.8, color: "#D3D1C7" }}>{cs.challenge}</p>
            </div>
            <div style={{ background: "#2C2C2A", borderRadius: 12, padding: "20px 20px 24px", borderLeft: `3px solid ${project.accent}` }}>
              <SectionLabel>The Solution</SectionLabel>
              <p style={{ fontSize: 14, lineHeight: 1.8, color: "#D3D1C7" }}>{cs.solution}</p>
            </div>
          </div>

          <Divider />

          {/* Features + Tech Stack */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28, marginBottom: 8 }}>
            <div>
              <SectionLabel>Key Features</SectionLabel>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {cs.features.map((f, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                    <ChevronRight size={14} style={{ color: project.accent, flexShrink: 0, marginTop: 3 }} />
                    <span style={{ fontSize: 13, color: "#D3D1C7", lineHeight: 1.6 }}>{f}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <SectionLabel>Tech Stack</SectionLabel>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {Object.entries(cs.tech).map(([k, v]) => (
                  <div key={k} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8, padding: "8px 0", borderBottom: "1px solid rgba(255,255,255,.05)" }}>
                    <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: ".05em", color: "#888780", flexShrink: 0 }}>{k.toUpperCase()}</span>
                    <span style={{ fontSize: 13, color: "#F1EFE8", textAlign: "right" }}>{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <Divider />

          {/* Action links */}
          <div>
            <SectionLabel>Links</SectionLabel>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: cs.note ? 16 : 0 }}>
              {cs.links.video && (
                <a href={cs.links.video} target="_blank" rel="noreferrer"
                  style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 18px", borderRadius: 8, background: project.accent, color: "#1E1E1C", fontSize: 13, fontWeight: 600, textDecoration: "none", transition: "opacity .2s" }}
                  onMouseEnter={e => e.currentTarget.style.opacity = ".85"}
                  onMouseLeave={e => e.currentTarget.style.opacity = "1"}>
                  <Play size={14} fill="currentColor" /> Watch demo
                </a>
              )}
              {cs.links.github && (
                <a href={cs.links.github} target="_blank" rel="noreferrer"
                  style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 18px", borderRadius: 8, background: "#3A3A37", color: "#F1EFE8", fontSize: 13, fontWeight: 600, textDecoration: "none", transition: "background .2s" }}
                  onMouseEnter={e => e.currentTarget.style.background = "#444441"}
                  onMouseLeave={e => e.currentTarget.style.background = "#3A3A37"}>
                  <Code2 size={14} /> View code
                </a>
              )}
              {cs.links.apk && (
                <a href={cs.links.apk} target="_blank" rel="noreferrer"
                  style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 18px", borderRadius: 8, background: "#3A3A37", color: "#F1EFE8", fontSize: 13, fontWeight: 600, textDecoration: "none", transition: "background .2s" }}
                  onMouseEnter={e => e.currentTarget.style.background = "#444441"}
                  onMouseLeave={e => e.currentTarget.style.background = "#3A3A37"}>
                  <Smartphone size={14} /> Download APK
                </a>
              )}
              {cs.links.store && (
                <a href={cs.links.store} target="_blank" rel="noreferrer"
                  style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 18px", borderRadius: 8, background: "#3A3A37", color: "#F1EFE8", fontSize: 13, fontWeight: 600, textDecoration: "none", transition: "background .2s" }}
                  onMouseEnter={e => e.currentTarget.style.background = "#444441"}
                  onMouseLeave={e => e.currentTarget.style.background = "#3A3A37"}>
                  <ExternalLink size={14} /> View on App Store
                </a>
              )}
            </div>
            {cs.note && (
              <p style={{ fontSize: 12, color: "#888780", fontStyle: "italic", marginTop: 8 }}>ℹ️ {cs.note}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}