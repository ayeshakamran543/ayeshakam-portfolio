/* ── Your sketch character ────────────────────────────────────────────────
   Change these to match your photo. Every colour is optional; the palette
   defaults below are from the "retro spring" set.
     hair:  "long" | "bun" | "hijab"
     glasses: true | false
   ───────────────────────────────────────────────────────────────────── */
export const CHARACTER = {
  hair: "long",
  hairColor: "#3B2A25",
  hijabColor: "#EBA5A5", // only used when hair is "hijab"
  skin: "#E8BE9F",
  top: "#A4BDA8",        // meadow
  glasses: false,
};

/* Flutter-style hot reload console lines — one per section, shown once when
   that section first inks in. The numbers are a joke, not a benchmark. */
export const RELOAD_LINES = {
  hero:    "Reloaded 1 of 612 libraries in 212ms.",
  about:   "Reloaded 2 of 612 libraries in 148ms.",
  work:    "Reloaded 6 of 612 libraries in 301ms.",
  skills:  "Reloaded 4 of 612 libraries in 176ms.",
  contact: "Reloaded 1 of 612 libraries in 94ms. Ready.",
  manual:  "Performing hot reload…",
};