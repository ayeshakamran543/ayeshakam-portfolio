import { useEffect } from "react";
import { IconClose, IconArrow } from "./icons";
import { CASE_STUDIES } from "./data";

/* ── Case study modal ─────────────────────────────────────────────────── */
export function CaseStudyModal({ project, onClose }) {
  const cs = CASE_STUDIES[project.name];

  useEffect(() => {
    const esc = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", esc);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", esc); document.body.style.overflow = ""; };
  }, []);

  const Label = ({ children }) => <p className="modal-label">{children}</p>;
  const Rule = () => <div className="modal-rule" />;

  return (
    <div className="modal-scrim" onClick={onClose}>
      <div className="modal-panel" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} aria-label="Close" className="modal-close">
          <IconClose size={15} />
        </button>

        <div className="modal-body">
          <p className="modal-meta">{cs.client} · {cs.duration}</p>
          <h2 className="modal-title">{project.name}</h2>
          <p className="modal-subtitle">{cs.subtitle}</p>

          <div className="pill-row">
            {project.tags.map(t => <span key={t} className="pill">{t}</span>)}
            <span className="pill pill-accent">{cs.role}</span>
          </div>

          <Rule />
          <Label>Overview</Label>
          <p className="body-text">{cs.overview}</p>

          <div className="modal-two-col" style={{ marginTop: 26 }}>
            <div className="modal-soft-box">
              <Label>The challenge</Label>
              <p className="body-text small">{cs.challenge}</p>
            </div>
            <div className="modal-soft-box">
              <Label>The solution</Label>
              <p className="body-text small">{cs.solution}</p>
            </div>
          </div>

          <Rule />

          <div className="modal-two-col">
            <div>
              <Label>Key features</Label>
              <div className="feature-list">
                {cs.features.map((f, i) => (
                  <div key={i} className="feature-item">
                    <span className="feature-dot" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <Label>Tech stack</Label>
              <div>
                {Object.entries(cs.tech).map(([k, v]) => (
                  <div key={k} className="tech-row">
                    <span className="tech-key">{k}</span>
                    <span className="tech-val">{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <Rule />
          <Label>Links</Label>
          <div className="pill-row">
            {cs.links.video && <a href={cs.links.video} target="_blank" rel="noreferrer" className="btn btn-dark">Watch demo <IconArrow size={13} /></a>}
            {cs.links.github && <a href={cs.links.github} target="_blank" rel="noreferrer" className="btn btn-light">View code <IconArrow size={13} /></a>}
            {cs.links.apk && <a href={cs.links.apk} target="_blank" rel="noreferrer" className="btn btn-light">Download APK <IconArrow size={13} /></a>}
            {cs.links.store && <a href={cs.links.store} target="_blank" rel="noreferrer" className="btn btn-light">View on Play Store <IconArrow size={13} /></a>}
          </div>
          {cs.note && <p className="modal-note">{cs.note}</p>}
        </div>
      </div>
    </div>
  );
}