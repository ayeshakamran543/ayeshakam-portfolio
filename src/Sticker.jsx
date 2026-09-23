/* ── Reusable "sticker" button: one implementation, used everywhere ─────── */
export function Sticker({ as: Tag = "button", className = "", children, ...rest }) {
  return (
    <Tag className={`sticker ${className}`} {...rest}>
      <span className="sticker-shadow" aria-hidden="true" />
      <span className="sticker-face">{children}</span>
    </Tag>
  );
}

/* Hand-drawn squiggle connector used in the dark footer */
export const SquiggleLine = () => (
  <svg width="100%" height="70" viewBox="0 0 500 70" preserveAspectRatio="none" fill="none" stroke="#5B6E48" strokeWidth="2.4" strokeLinecap="round">
    <path d="M0 52c60 8 110 8 150-9s60-30 110-13 90 34 140 9 70-26 100-13" />
  </svg>
);