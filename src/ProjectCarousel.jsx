import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Sticker } from "./Sticker";
import { IconArrow } from "./icons";

/* ════════════════════════════════════════════════════════════════════════
   Project carousel
   - One glide curve for everything that moves: the track, the card scale
     and the card fade share GLIDE + GLIDE_MS, so a slide change reads as
     one soft motion with a gentle settle at the end.
   - The active card sits at full size; neighbours rest at 0.9 and fade
     back, which pulls the eye to the centre without a hard cut.
   - Drag or swipe (with rubber-banding at the ends), arrow keys when
     focused, prev/next buttons, and dash indicators.
   - The track's transform is written straight to the DOM, never through
     React state, so dragging stays smooth on phones.
   ════════════════════════════════════════════════════════════════════════ */
export const GLIDE = "cubic-bezier(.45,.05,.15,1)";
export const GLIDE_MS = 720;

const ART_BG = ["var(--frosted)", "var(--sunset)", "var(--meadow)", "var(--peach)", "var(--sprout)", "var(--rose)"];

export function ProjectCarousel({ projects, icons, onOpen, drawn }) {
  const viewportRef = useRef(null);
  const trackRef = useRef(null);
  const placedOnce = useRef(false);
  const drag = useRef({ active: false, moved: false, startX: 0, dx: 0, t: 0 });
  const [index, setIndex] = useState(0);
  const [vw, setVw] = useState(0);
  const [contentLeft, setContentLeft] = useState(0);
  const count = projects.length;

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    // Align the active card's left edge with the section's own content
    // column (the same one "Crafted with care." sits in), not the raw
    // viewport — the carousel breaks out to full-bleed so neighbours can
    // peek at the edges, but the active card shouldn't drift from the copy.
    const measureContentLeft = () => {
      const inner = el.closest(".sec")?.querySelector(".inner");
      if (inner) setContentLeft(inner.getBoundingClientRect().left);
    };
    const ro = new ResizeObserver(([e]) => { setVw(e.contentRect.width); measureContentLeft(); });
    ro.observe(el);
    window.addEventListener("resize", measureContentLeft);
    return () => { ro.disconnect(); window.removeEventListener("resize", measureContentLeft); };
  }, []);

  const small = vw < 640;
  const gap = small ? 14 : 28;
  const cardW = Math.min(660, vw * (small ? 0.78 : 0.6));
  const xFor = useCallback((i) => contentLeft - i * (cardW + gap), [contentLeft, cardW, gap]);

  const place = useCallback((x, animate) => {
    const t = trackRef.current;
    if (!t) return;
    t.style.transition = animate ? `transform ${GLIDE_MS}ms ${GLIDE}` : "none";
    t.style.transform = `translate3d(${x}px,0,0)`;
  }, []);

  useLayoutEffect(() => {
    if (!vw) return;
    place(xFor(index), placedOnce.current);
    placedOnce.current = true;
  }, [index, vw, xFor, place]);

  // At either end, a short nudge-and-return says "that's the last one"
  const bump = (dir) => {
    place(xFor(index) - dir * 22, true);
    setTimeout(() => place(xFor(index), true), 200);
  };
  const go = (i) => {
    if (i < 0 || i >= count) return bump(i < 0 ? -1 : 1);
    setIndex(i);
  };

  const onPointerDown = (e) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    drag.current = { active: true, moved: false, startX: e.clientX, dx: 0, t: performance.now() };
  };
  const onPointerMove = (e) => {
    const d = drag.current;
    if (!d.active) return;
    let dx = e.clientX - d.startX;
    if (!d.moved) {
      if (Math.abs(dx) < 6) return;
      d.moved = true;
      viewportRef.current?.setPointerCapture(e.pointerId);
    }
    if ((index === 0 && dx > 0) || (index === count - 1 && dx < 0)) dx *= 0.35;
    d.dx = dx;
    place(xFor(index) + dx, false);
  };
  const onPointerUp = () => {
    const d = drag.current;
    if (!d.active) return;
    d.active = false;
    if (!d.moved) return;
    const velocity = d.dx / Math.max(1, performance.now() - d.t);
    const far = Math.abs(d.dx) > cardW * 0.2 || Math.abs(velocity) > 0.5;
    const next = far ? index + (d.dx < 0 ? 1 : -1) : index;
    if (next === index || next < 0 || next >= count) place(xFor(index), true);
    else setIndex(next);
  };
  // Swallow the click that ends a drag, so dropping a card doesn't open it
  const onClickCapture = (e) => {
    if (drag.current.moved) { e.stopPropagation(); e.preventDefault(); drag.current.moved = false; }
  };
  const onKeyDown = (e) => {
    if (e.key === "ArrowRight") { e.preventDefault(); go(index + 1); }
    if (e.key === "ArrowLeft") { e.preventDefault(); go(index - 1); }
  };

  return (
    <div className="carousel">
      <div
        ref={viewportRef}
        className="carousel-viewport"
        tabIndex={0}
        role="region"
        aria-roledescription="carousel"
        aria-label="Projects. Use the arrow keys to move between them."
        onKeyDown={onKeyDown}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onClickCapture={onClickCapture}
      >
        <div ref={trackRef} className="carousel-track" style={{ gap }}>
          {projects.map((p, i) => {
            const Art = icons[p.name];
            const active = i === index;
            return (
              <article
                key={p.name}
                className={`slide${active ? " is-active" : ""}`}
                style={{ width: cardW }}
                role="group"
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${count}: ${p.name}`}
                aria-hidden={!active}
                onClick={() => !active && go(i)}
              >
                <div className="slide-card">
                  <div className={`slide-art${drawn ? " drawn" : ""}`} style={{ background: ART_BG[i % ART_BG.length] }}>
                    {Art && <Art width="88" height="88" />}
                  </div>
                  <div className="slide-body">
                    <div className="pill-row">
                      {p.tags.map(t => <span key={t} className="pill">{t}</span>)}
                    </div>
                    <h3 className="slide-title">{p.name} <span className="slide-year">{p.year}</span></h3>
                    <p className="slide-desc">{p.desc}</p>
                    <Sticker className="sticker-btn" tabIndex={active ? 0 : -1} onClick={(e) => { e.stopPropagation(); onOpen(p); }}>
                      View project <span className="icon-nudge"><IconArrow size={14} /></span>
                    </Sticker>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      <div className="carousel-controls">
        <Sticker className="sticker-round" aria-label="Previous project" onClick={() => go(index - 1)}>
          <span className="flip-x"><IconArrow size={16} /></span>
        </Sticker>
        <div className="carousel-dots">
          {projects.map((p, i) => (
            <button
              key={p.name}
              type="button"
              className={`dot${i === index ? " on" : ""}`}
              aria-label={`Show ${p.name}`}
              aria-current={i === index ? "true" : undefined}
              onClick={() => go(i)}
            />
          ))}
        </div>
        <span className="carousel-count" aria-live="polite">{index + 1} of {count}</span>
        <Sticker className="sticker-round" aria-label="Next project" onClick={() => go(index + 1)}>
          <IconArrow size={16} />
        </Sticker>
      </div>
    </div>
  );
}