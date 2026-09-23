import { useEffect, useRef, useState } from "react";

/* ════════════════════════════════════════════════════════════════════════
   Section transitions
   - SketchDivider: the pencil line between sections. A dashed "wire" guide
     sits there always; when the section below inks in, a solid line draws
     itself left-to-right with a little pencil icon riding the tip.
   - useActiveSection: scrollspy for the nav — whichever section is nearest
     the top of the viewport wins, so the underline never sits on two links.
   - NavInk: a hand-drawn underline that glides to the active nav link,
     measuring the link's own position so it never drifts from the text.
   ════════════════════════════════════════════════════════════════════════ */

export function SketchDivider({ drawn }) {
  return (
    <div className={`divider${drawn ? " drawn" : ""}`} aria-hidden="true">
      <svg viewBox="0 0 1000 24" preserveAspectRatio="none">
        <line className="divider-wire" x1="0" y1="12" x2="1000" y2="12" />
        <line className="divider-ink" x1="0" y1="12" x2="1000" y2="12" pathLength="1" />
      </svg>
      <svg className="divider-pencil" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 19l7-7 3 3-7 7-3-3z" />
        <path d="M18 13l-1.5-4L20 8l-1.5-4" />
        <path d="M2 22l3-1 10-10" />
      </svg>
    </div>
  );
}

/* Whichever section's top edge is closest to (but above) the nav gets the
   underline; falls back to the first section on initial paint. */
export function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    const els = ids.map(id => document.getElementById(id)).filter(Boolean);
    if (!els.length) return;

    const onScroll = () => {
      // Near the bottom of the page there may not be enough scroll room left
      // to ever cross the last section's offsetTop threshold below — so once
      // we're at (or essentially at) the bottom, it just wins outright.
      const atBottom = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2;
      if (atBottom) { setActive(els[els.length - 1].id); return; }

      const y = window.scrollY + 120; // roughly the nav height + a hair
      let current = els[0].id;
      for (const el of els) {
        if (el.offsetTop <= y) current = el.id;
      }
      setActive(current);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [ids]);

  return active;
}

export function NavInk({ containerRef, itemRefs, activeKey }) {
  const [rect, setRect] = useState(null);

  useEffect(() => {
    const measure = () => {
      const container = containerRef.current;
      const item = itemRefs.current[activeKey];
      if (!container || !item) { setRect(null); return; }
      const c = container.getBoundingClientRect();
      const i = item.getBoundingClientRect();
      setRect({ x: i.left - c.left, width: i.width });
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [activeKey, containerRef, itemRefs]);

  if (!rect) return null;

  return (
    <div
      className="nav-ink"
      style={{ width: rect.width, transform: `translateX(${rect.x}px)` }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 100 10" preserveAspectRatio="none" fill="none">
        <path d="M2 6c15-4 30 4 46 0s37-4 50 0" />
      </svg>
    </div>
  );
}
