import { useState, useEffect, useRef } from "react";
import { CODE } from "./data";

/* ── Renders the typed-code hero snippet up to `count` characters ───────── */
export function renderCode(count) {
  let rem = count;
  return CODE.map((seg, i) => {
    if (rem <= 0) return null;
    const vis = seg.t.slice(0, rem); rem -= seg.t.length;
    return <span key={i} style={{ color: seg.c }}>{vis}</span>;
  });
}

/* ── Fires `seen = true` once an element scrolls into view ──────────────── */
export function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setSeen(true); }, { threshold });
    o.observe(ref.current); return () => o.disconnect();
  }, []);
  return [ref, seen];
}

/* ── Shared fade-up-on-scroll inline style ───────────────────────────────── */
export const fadeUp = (seen, delay = 0) => ({
  opacity: seen ? 1 : 0,
  transform: seen ? "none" : "translateY(24px)",
  transition: `opacity .7s ease ${delay}s, transform .7s cubic-bezier(.16,1,.3,1) ${delay}s`,
});