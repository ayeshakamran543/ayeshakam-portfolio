import { useEffect, useRef, useState } from "react";
import { CHARACTER } from "./config";

/* ════════════════════════════════════════════════════════════════════════
   Ayesha, drawn in the same loose marker line as the logo.
   Sits behind her laptop and waves once when the page first "inks".
   - Eyes follow the cursor (fine pointers only, written straight to the
     DOM in rAF, so nothing re-renders on mouse move)
   - Blinks when you hover her, waves again when you click her
   - `wire` renders her as a dashed pencil sketch with no fills
   Nothing here loops on its own.
   ════════════════════════════════════════════════════════════════════════ */

// Eye centre in viewBox units, used to aim the pupils
const VB_W = 360, VB_H = 380, EYE_X = 180, EYE_Y = 134;

export function Character({ wire = false, waveKey = 0, onBubbleClick }) {
  const c = CHARACTER;
  const svgRef = useRef(null);
  const pupilsRef = useRef(null);
  const eyesRef = useRef(null);
  const [localWave, setLocalWave] = useState(0);
  const armKey = waveKey + localWave;

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const onMove = (e) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const svg = svgRef.current, p = pupilsRef.current;
        if (!svg || !p) return;
        const r = svg.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width * (EYE_X / VB_W));
        const dy = e.clientY - (r.top + r.height * (EYE_Y / VB_H));
        const d = Math.hypot(dx, dy) || 1;
        const k = Math.min(1, d / 280);
        p.style.transform = `translate(${(dx / d) * 3.2 * k}px, ${(dy / d) * 2.4 * k}px)`;
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => { window.removeEventListener("pointermove", onMove); cancelAnimationFrame(raf); };
  }, []);

  const blink = () => {
    const el = eyesRef.current;
    if (!el) return;
    el.classList.remove("blink");
    void el.getBoundingClientRect(); // restart the one-shot animation
    el.classList.add("blink");
  };

  const hijab = c.hair === "hijab";

  return (
    <div className={`char${wire ? " is-wire" : ""}`}>
      <svg
        ref={svgRef}
        viewBox={`0 0 ${VB_W} ${VB_H}`}
        role="img"
        aria-label="Sketch of Ayesha waving from behind her laptop"
        fill="none" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"
        onPointerEnter={blink}
        onClick={() => setLocalWave(n => n + 1)}
      >
        {/* doodles */}
        <g className="char-doodles">
          <path d="M70 70c2 10 4 12 14 14-10 2-12 4-14 14-2-10-4-12-14-14 10-2 12-4 14-14Z" />
          <path d="M292 52c1.5 7 3 8.5 10 10-7 1.5-8.5 3-10 10-1.5-7-3-8.5-10-10 7-1.5 8.5-3 10-10Z" />
          <path data-fill fill="#EBA5A5" d="M300 146c-12-10-10-22 0-16 10-6 12 6 0 16Z" />
        </g>

        {/* hair, back layer */}
        {c.hair === "long" && (
          <path data-fill fill={c.hairColor} d="M130 128c-4-58 104-58 100 0 4 52 14 94 6 122-20-12-36-14-40-36h-32c-4 22-20 24-40 36-8-28 2-70 6-122Z" />
        )}
        {c.hair === "bun" && (
          <circle data-fill fill={c.hairColor} cx="180" cy="72" r="20" />
        )}

        {/* body */}
        <path data-fill fill={c.top} d="M100 364c2-98 32-152 80-158 48 6 78 60 80 158Z" />

        {hijab ? (
          <>
            <path data-fill fill={c.hijabColor} d="M180 70c-58 0-68 62-62 100 2 44 22 80 62 86 40-6 60-42 62-86 6-38-4-100-62-100Z" />
            <ellipse data-fill fill={c.skin} cx="180" cy="138" rx="36" ry="42" />
            <path data-fill fill={c.hijabColor} d="M140 120c6-32 74-32 80 0-14-12-66-12-80 0Z" />
          </>
        ) : (
          <>
            <path data-fill fill={c.skin} d="M168 168v34h24v-34" />
            <circle data-fill fill={c.skin} cx="180" cy="130" r="46" />
          </>
        )}

        {/* hair, front layer */}
        {c.hair === "long" && (
          <path data-fill fill={c.hairColor} d="M134 122c4-38 44-50 78-34 10 6 16 18 16 34-22-8-40-18-50-34-8 18-24 30-44 34Z" />
        )}
        {c.hair === "bun" && (
          <path data-fill fill={c.hairColor} d="M134 124c-2-40 94-40 92 0-12-22-80-22-92 0Z" />
        )}

        {/* face */}
        <path d="M157 117c6-4 12-4 16-1M187 116c4-3 10-3 16 1" />
        <g ref={eyesRef} className="eyes">
          <g ref={pupilsRef} className="pupils">
            <ellipse className="ink-fill" cx="165" cy="134" rx="3.4" ry="4.4" />
            <ellipse className="ink-fill" cx="195" cy="134" rx="3.4" ry="4.4" />
          </g>
        </g>
        <ellipse data-fill fill="#EBA5A5" fillOpacity=".6" stroke="none" cx="153" cy="151" rx="8" ry="4.5" />
        <ellipse data-fill fill="#EBA5A5" fillOpacity=".6" stroke="none" cx="207" cy="151" rx="8" ry="4.5" />
        <path d="M170 155c6 7 14 7 20 0" />
        {c.glasses && (
          <g>
            <circle cx="165" cy="134" r="12" />
            <circle cx="195" cy="134" r="12" />
            <path d="M177 133q3-3 6 0" />
          </g>
        )}

        {/* waving arm — sits under the laptop lid when lowered */}
        <g key={armKey} className={`char-arm${armKey > 0 ? " wave" : ""}`}>
          <path className="arm-ol" strokeWidth="27" d="M238 236 258 196" />
          <path stroke={c.top} strokeWidth="21" d="M238 236 258 196" />
          <path className="arm-ol" strokeWidth="18" d="M258 198 270 168" />
          <path stroke={c.skin} strokeWidth="12.5" d="M258 198 270 168" />
          <circle data-fill fill={c.skin} cx="272" cy="160" r="11" />
        </g>

        {/* laptop, lid facing us */}
        <rect data-fill fill="#FFFFFF" x="92" y="252" width="176" height="112" rx="12" />
        <path data-fill fill="#EBA5A5" d="M136 306c-14-10-12-24 0-18 12-6 14 8 0 18Z" />
        <circle data-fill fill="#FFCA8C" cx="224" cy="292" r="15" />
        <text className="ink-fill" x="224" y="299" textAnchor="middle" fontFamily="Kalam, cursive" fontSize="19">r</text>
        <g>
          {[0, 72, 144, 216, 288].map(a => (
            <circle key={a} data-fill fill="#A4BDA8"
              cx={176 + 7.5 * Math.cos((a * Math.PI) / 180)}
              cy={334 + 7.5 * Math.sin((a * Math.PI) / 180)} r="5" />
          ))}
          <circle data-fill fill="#FFCA8C" cx="176" cy="334" r="3.6" />
        </g>
        <path d="M28 366c80-6 220 4 304-3" />
      </svg>

      {armKey > 0 && (
        <button type="button" className="char-bubble" onClick={onBubbleClick}>
          psst, press <kbd>r</kbd>
        </button>
      )}
    </div>
  );
}