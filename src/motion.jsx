import { useState, useEffect, useRef } from "react";

/* ── MOTION SYSTEM — one rule set, applied everywhere ────────────────────
   EASE      cubic-bezier(.22,1,.36,1)   — every transition uses this
   ENTER     500ms, translateY(16px)->0, opacity 0->1, stagger 60ms/item
   HOVER     240ms, lift + offset shadow grows
   PRESS     120ms, compress slightly
   Everything is one-shot or interaction-driven. Nothing loops or plays
   on its own after the page has loaded.
   ───────────────────────────────────────────────────────────────────── */
export const EASE = "cubic-bezier(.22,1,.36,1)";
/* A touch of overshoot — used sparingly, only where something should feel
   like it just landed on the page (ghost numbers, the logo, stat digits) */
export const POP = "cubic-bezier(.34,1.56,.64,1)";

/* Fires `seen = true` once an element scrolls into view, never repeats */
export function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setSeen(true); o.disconnect(); } }, { threshold });
    o.observe(ref.current);
    return () => o.disconnect();
  }, []);
  return [ref, seen];
}

/* Shared scroll-reveal inline style: fade + rise, one-shot */
export const enter = (seen, delayMs = 0) => ({
  opacity: seen ? 1 : 0,
  transform: seen ? "none" : "translateY(16px)",
  transition: `opacity 500ms ${EASE} ${delayMs}ms, transform 500ms ${EASE} ${delayMs}ms`,
});