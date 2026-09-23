import { useState, useEffect, useCallback, useRef } from "react";

import { IconArrow, IconClose, IconCopy, IconCheck, GithubIcon, LinkedinIcon, ScribbleLogo, SketchMenu, ProjectIcon } from "./icons";
import { PROJECTS, SKILL_GROUPS, STATS, QUOTE, TERMINAL_LINES } from "./data";
import { RELOAD_LINES } from "./config.js";
import { EASE, POP, useInView } from "./motion";
import { Sticker, SquiggleLine } from "./Sticker";
import { CaseStudyModal } from "./CaseStudyModal";
import { Character } from "./Character";
import { ProjectCarousel, GLIDE } from "./ProjectCarousel";
import { SketchDivider, useActiveSection, NavInk } from "./SectionTransitions";

/* ════════════════════════════════════════════════════════════════════════
   Ayesha Kamran — Portfolio · "Hot reload"
   The page loads as a pencil wireframe and gets inked in, the way a Flutter
   hot reload paints your change onto the screen. Each section inks once
   when it scrolls into view; pressing "r" (or the speech bubble) re-runs it.
   That ink-in is the one orchestrated motion on the page. Everything else
   answers something the visitor does.
   Palette: "retro spring", with a warm ink and paper added for legibility.
   ════════════════════════════════════════════════════════════════════════ */
/* Every "ink" change shares this transition. It reads --ink-d on each
   element, which is how a section inks in reading order. (It has to be a
   JS string, not a CSS custom property: a var() inside a custom property
   resolves where it's declared, so the per-element delay would be lost.) */
const INK_T = ["background-color 520ms", "border-color 520ms", "color 520ms", "opacity 520ms", "filter 620ms"]
  .map(t => `${t} ${EASE} var(--ink-d,0ms)`).join(",");

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeProject, setActiveProject] = useState(null);
  const [copied, setCopied] = useState(false);
  const [stats, setStats] = useState({ y: 0, p: 0, f: 0, a: 0 });
  const [termLine, setTermLine] = useState(0);
  const [termChar, setTermChar] = useState(0);

  // Hot reload state
  const [booted, setBooted] = useState(false);      // hero's first "build"
  const [reloading, setReloading] = useState(false); // manual "r" re-ink
  const [waveKey, setWaveKey] = useState(0);
  const [toasts, setToasts] = useState([]); // queued, shown one at a time
  const toast = toasts[0];

  const [aboutRef, aboutSeen] = useInView();
  const [workRef, workSeen] = useInView(0.2);
  const [skillsRef, skillsSeen] = useInView();
  const [contactRef, contactSeen] = useInView();
  const [quoteRef, quoteSeen] = useInView(0.3);

  // Nav follows you through the page
  const activeSection = useActiveSection(["hero", "about", "work", "skills", "contact"]);
  const navLinksRef = useRef(null);
  const navItemRefs = useRef({});

  const showToast = useCallback((text, replace = false) => {
    const item = { id: Date.now() + Math.random(), text };
    setToasts(q => (replace ? [item] : [...q, item]));
  }, []);
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToasts(q => q.slice(1)), 1700);
    return () => clearTimeout(t);
  }, [toast]);

  // First paint is the sketch; ~650ms later the hero inks and she waves.
  useEffect(() => {
    const t = setTimeout(() => { setBooted(true); setWaveKey(1); showToast(RELOAD_LINES.hero); }, 650);
    return () => clearTimeout(t);
  }, [showToast]);

  // Sections below the fold only ink once the hero has finished its first build
  const quoteOn = quoteSeen && booted, aboutOn = aboutSeen && booted, workOn = workSeen && booted, skillsOn = skillsSeen && booted, contactOn = contactSeen && booted;
  useEffect(() => { if (aboutOn) showToast(RELOAD_LINES.about); }, [aboutOn, showToast]);
  useEffect(() => { if (workOn) showToast(RELOAD_LINES.work); }, [workOn, showToast]);
  useEffect(() => { if (skillsOn) showToast(RELOAD_LINES.skills); }, [skillsOn, showToast]);
  useEffect(() => { if (contactOn) showToast(RELOAD_LINES.contact); }, [contactOn, showToast]);

  const hotReload = useCallback(() => {
    if (reloading) return;
    setReloading(true);
    showToast(RELOAD_LINES.manual, true);
    setTimeout(() => {
      setReloading(false);
      setWaveKey(k => k + 1);
      showToast("Reloaded 6 of 612 libraries in 187ms.", true);
    }, 560);
  }, [reloading, showToast]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key !== "r" || e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.target.closest?.("input, textarea, [contenteditable]")) return;
      hotReload();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [hotReload]);

  /* Ink order inside a section. Sections below the hero wait ~560ms for
     the pencil to finish its line, then ink in reading order. */
  const inkAt = (i) => ({ "--ink-d": `${560 + i * 110}ms` });
  const heroAt = (i) => ({ "--ink-d": `${i * 90}ms` });
  const hr = (seen) => `hr${seen && !reloading ? "" : " is-wire"}`;

  // Stat counters: run once when About inks, ~700ms, then stop for good.
  useEffect(() => {
    if (!aboutOn) return;
    const target = { y: 2, p: 5, f: 50, a: 20 };
    const start = Date.now() + 780; // wait until the stats box has inked
    const iv = setInterval(() => {
      if (Date.now() < start) return;
      const t = Math.min((Date.now() - start) / 700, 1);
      const e = 1 - Math.pow(1 - t, 3);
      setStats({ y: Math.round(e * target.y), p: Math.round(e * target.p), f: Math.round(e * target.f), a: Math.round(e * target.a) });
      if (t >= 1) clearInterval(iv);
    }, 16);
    return () => clearInterval(iv);
  }, [aboutOn]);

  // Terminal types once, after the hero has inked.
  useEffect(() => {
    if (!booted || termLine >= TERMINAL_LINES.length) return;
    const full = TERMINAL_LINES[termLine].t;
    if (termChar < full.length) {
      const t = setTimeout(() => setTermChar(c => c + 1), termLine === 0 ? 22 : 16);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => { setTermLine(n => n + 1); setTermChar(0); }, 260);
    return () => clearTimeout(t);
  }, [booted, termLine, termChar]);

  const scrollTo = (id) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setMenuOpen(false); };
  const NAV_ITEMS = ["About", "Work", "Skills", "Contact"];

  const copyEmail = () => {
    navigator.clipboard?.writeText("ayeshakamran053@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div className="portfolio-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Kalam:wght@400;700&family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
        *,*::before,*::after{box-sizing:border-box}

        .portfolio-root{
          /* retro spring */
          --paper:#FFF8F3; --surface:#FFFFFF; --ink:#2B2220; --muted:#76655F; --border:#EFDCD5; --wire:#CDB9B2;
          --frosted:#F5CEC7; --sunset:#FFCA8C; --rose:#EBA5A5; --sprout:#C7C19D; --peach:#FABB92; --meadow:#A4BDA8;
          /* deeper tones, only for text on the pastels */
          --rose-ink:#9E4452; --meadow-ink:#2F4634; --sunset-ink:#6A3F0C;

          --display:'Kalam',cursive; --sans:'Space Grotesk',system-ui,sans-serif; --mono:'JetBrains Mono',ui-monospace,monospace;
          --px:64px; --py:100px; --nav-h:76px;
          --fs-hero:clamp(38px,5.2vw,58px); --fs-h2:clamp(28px,4vw,40px); --fs-h3:clamp(22px,2.4vw,28px); --fs-quote:clamp(24px,3.4vw,34px);
          background:var(--paper); color:var(--ink); font-family:var(--sans); min-height:100vh;
        }
        @media(max-width:900px){.portfolio-root{--px:22px;--py:68px;--nav-h:64px}}
        .portfolio-root :is(h1,h2,h3){margin:0}
        .portfolio-root p{margin:0}
        .portfolio-root button{font-family:inherit;color:inherit}
        .portfolio-root :focus-visible{outline:2.5px solid var(--rose-ink);outline-offset:3px;border-radius:6px}
        .portfolio-root kbd{font-family:var(--mono);font-size:.85em;padding:1px 7px;border:1.5px solid currentColor;border-bottom-width:3px;border-radius:6px;background:var(--surface)}
        @media(prefers-reduced-motion:reduce){.portfolio-root *,.portfolio-root *::before,.portfolio-root *::after{animation-duration:.001ms!important;transition-duration:.001ms!important}}

        .sec{padding:var(--py) var(--px)}
        .sec{position:relative}

        /* ---- section transitions: pencil divider ---- */
        .divider{position:absolute;top:0;left:var(--px);right:var(--px);height:24px;transform:translateY(-50%);pointer-events:none}
        .divider svg{display:block;width:100%;height:100%;overflow:visible}
        .divider-wire{stroke:var(--wire);stroke-width:1.5;stroke-dasharray:5 7;opacity:.7}
        .divider-ink{stroke:var(--ink);stroke-width:2.2;stroke-linecap:round;stroke-dasharray:1;stroke-dashoffset:1}
        .divider.drawn .divider-ink{animation:lineDraw 620ms ${EASE} forwards}
        .divider-pencil{position:absolute;top:-24px;left:0;color:var(--ink);opacity:0;margin-left:-6px}
        .divider.drawn .divider-pencil{animation:pencilRun 620ms ${EASE} forwards,pencilOut 260ms ${EASE} 620ms forwards}
        @keyframes lineDraw{to{stroke-dashoffset:0}}
        @keyframes pencilRun{from{left:0;opacity:1;transform:rotate(-6deg)}to{left:100%;opacity:1;transform:rotate(6deg)}}
        @keyframes pencilOut{from{opacity:1;left:100%}to{opacity:0;left:100%;transform:translate(10px,-10px) rotate(20deg)}}

        /* ---- section transitions: nav underline ---- */
        .nav-links{position:relative}
        .nav-ink{position:absolute;left:0;bottom:-6px;height:10px;pointer-events:none;transition:transform 560ms ${GLIDE},width 560ms ${GLIDE},opacity 300ms ${EASE}}
        .nav-ink svg{display:block;width:100%;height:100%}
        .nav-ink path{stroke:var(--rose);stroke-width:3;stroke-linecap:round}
        .nav-link[aria-current="true"]{font-weight:600}
        .mobile-menu .nav-link[aria-current="true"]{color:var(--rose-ink)}
        .inner{max-width:1120px;margin:0 auto}
        .h2{font-family:var(--display);font-size:var(--fs-h2);line-height:1.15}
        .body-text{font-size:16px;line-height:1.8;max-width:60ch}
        .muted{color:var(--muted)}
        .lede{font-size:15.5px;color:var(--muted);max-width:56ch}
        :is(.h2,.hero-title,.hero-lines p,.body-text,.lede,.stat-num,.stat-label,.skill-name,.skill-detail,.skill-cat,.slide-title,.slide-desc,.quote-text,.footer-title,.footer-sub){transition:color 520ms ${EASE} var(--ink-d,0ms)}

        /* ---- hot reload: wire state ---- */
        /* going back to the sketch is instant; only inking is staggered */
        .hr.is-wire,.hr.is-wire *{--ink-d:0ms!important}
        .hr.is-wire :is(.h2,.hero-title,.hero-lines p,.body-text,.lede,.stat-num,.stat-label,.skill-name,.skill-detail,.skill-cat,.slide-title,.slide-desc,.quote-text,.footer-title,.footer-sub){color:var(--wire)!important}
        .hr.is-wire :is(.sticker-face,.skill-col,.slide-card,.terminal,.kbd-chip,.hero-circle){background-color:transparent!important;border-style:dashed!important;border-color:var(--wire)!important;box-shadow:none!important;color:var(--wire)!important}
        .hr.is-wire .sticker-shadow,.hr.is-wire .terminal-shadow{opacity:0!important}
        .hr.is-wire :is(.pill,.slide-art){background:transparent!important;color:var(--wire)!important;border-color:var(--wire)!important;outline:1.5px dashed var(--wire);outline-offset:-6px}
        .hr.is-wire .slide-art svg{opacity:.3}
        .hr.is-wire .terminal-body{opacity:0}
        .hr.is-wire .hero-links a{color:var(--wire);text-decoration-color:var(--wire)}
        .quote-band.is-wire,.footer.is-wire{background:transparent!important}
        .footer.is-wire :is(.footer-socials a,.footer-bottom){color:var(--wire)!important}
        .hr-toast{position:fixed;left:18px;bottom:18px;z-index:500;pointer-events:none}
        .hr-toast-in{display:inline-flex;align-items:center;gap:9px;background:var(--ink);color:#F6EAE4;font-family:var(--mono);font-size:12px;padding:9px 14px;border-radius:10px;box-shadow:0 14px 30px -16px rgba(43,34,32,.6);animation:toastIn 1700ms ${EASE} both}
        .hr-glyph{display:inline-block;color:var(--sunset);animation:spinOnce 600ms ${EASE}}
        @keyframes toastIn{0%{opacity:0;transform:translateY(10px)}12%{opacity:1;transform:none}82%{opacity:1;transform:none}100%{opacity:0;transform:translateY(6px)}}
        @keyframes spinOnce{from{transform:rotate(-200deg)}to{transform:none}}
        @media(max-width:600px){.hr-toast{left:12px;right:12px;bottom:12px}.hr-toast-in{font-size:11px}}

        /* ---- nav ---- */
        .nav{position:sticky;top:0;z-index:200;height:var(--nav-h);display:flex;align-items:center;justify-content:space-between;padding:0 var(--px);background:var(--paper)}
        .nav-logo{background:none;border:none;cursor:pointer;padding:6px;display:flex}
        .nav-logo svg{stroke:var(--ink)}
        .nav-links{display:flex;align-items:center;gap:30px}
        .nav-link{color:var(--ink);font-size:15px;font-weight:500;cursor:pointer;background:none;border:none;transition:opacity 240ms ${EASE};padding:4px 0}
        .nav-link:hover{opacity:.55}
        .menu-toggle{background:none;border:none;cursor:pointer;padding:8px;display:none}
        .menu-toggle svg{stroke:var(--ink)}
        @media(max-width:820px){.nav-links{display:none}.menu-toggle{display:flex}}
        .mobile-menu{position:fixed;top:var(--nav-h);left:0;right:0;z-index:199;background:var(--paper);border-top:2px solid var(--ink);display:flex;flex-direction:column;padding:8px var(--px) 22px}
        .mobile-menu .nav-link{font-size:17px;padding:13px 0;border-bottom:1px dashed var(--border);text-align:left}

        /* ---- sticker ---- */
        .sticker{position:relative;display:inline-block;cursor:pointer;border:none;background:none;padding:0;text-decoration:none;font-family:inherit;color:inherit}
        .sticker-shadow{position:absolute;inset:0;background:var(--rose);border-radius:inherit;transform:translate(6px,6px);transition:transform 240ms ${EASE},opacity 520ms ${EASE} var(--ink-d,0ms)}
        .sticker-face{position:relative;display:inline-flex;align-items:center;gap:9px;background:var(--surface);color:var(--ink);border:2px solid var(--ink);border-radius:10px;transition:transform 240ms ${EASE},box-shadow 240ms ${EASE},${INK_T}}
        .sticker:hover .sticker-face{transform:translate(-2px,-2px);box-shadow:0 10px 22px -12px rgba(158,68,82,.45)}
        .sticker:hover .sticker-shadow{transform:translate(9px,9px)}
        .sticker:active .sticker-face{transform:translate(1px,1px) scale(.98);transition-duration:120ms}
        .sticker:active .sticker-shadow{transform:translate(4px,4px);transition-duration:120ms}
        .sticker.pill-shape .sticker-face,.sticker.pill-shape .sticker-shadow{border-radius:999px}
        .sticker .icon-nudge{display:flex;transition:transform 240ms ${EASE}}
        .sticker:hover .icon-nudge{transform:translateX(3px)}
        .sticker-cta .sticker-face{padding:15px 26px;font-weight:600;font-size:15px}
        .sticker-btn .sticker-face{padding:11px 20px;font-weight:600;font-size:13.5px}
        .sticker-round .sticker-face,.sticker-round .sticker-shadow{border-radius:50%}
        .sticker-round .sticker-face{width:46px;height:46px;justify-content:center}
        .sticker-round .sticker-shadow{transform:translate(4px,4px)}
        .flip-x{display:flex;transform:scaleX(-1)}

        /* modal buttons (used by CaseStudyModal) */
        .btn{display:inline-flex;align-items:center;gap:7px;padding:10px 18px;border-radius:10px;font-size:13.5px;font-weight:600;text-decoration:none;cursor:pointer;border:2px solid var(--ink);transition:transform 220ms ${EASE};background:none}
        .btn:hover{transform:translate(-2px,-2px)}
        .btn-dark{background:var(--ink);color:var(--surface)}
        .btn-light{background:var(--surface);color:var(--ink)}

        /* ---- hero ---- */
        .hero{padding-top:36px;padding-bottom:84px;overflow:hidden}
        .hero-grid{display:grid;grid-template-columns:1fr 1fr;gap:40px;align-items:center}
        .hero-title{font-family:var(--display);font-weight:700;font-size:var(--fs-hero);line-height:1.1;margin-bottom:24px}
        .hero-lines p{line-height:1.95;font-size:17px}
        .hero-lines p + p{color:var(--muted)}
        .hero-actions{display:flex;align-items:center;gap:22px;flex-wrap:wrap;margin-top:34px}
        .kbd-chip{display:inline-flex;align-items:center;gap:9px;background:none;border:1.5px dashed var(--rose);border-radius:999px;padding:8px 14px;font-size:13px;color:var(--muted);cursor:pointer;transition:transform 220ms ${EASE},${INK_T}}
        .kbd-chip:hover{transform:translate(-1px,-1px)}
        .hero-links{display:flex;gap:10px;align-items:center;margin-top:40px}
        .hero-links a{color:var(--ink);transition:color 520ms ${EASE},text-decoration-color 220ms ${EASE};text-decoration:underline;text-decoration-color:var(--rose);text-decoration-thickness:2px;text-underline-offset:4px;font-size:14px}
        .hero-links a:hover{text-decoration-color:var(--ink)}
        .hero-visual{position:relative;height:540px}
        .hero-circle{position:absolute;top:4%;right:4%;width:82%;aspect-ratio:1;border-radius:50%;background:var(--frosted);border:2px solid transparent;transition:${INK_T}}
        .hero-visual .char{position:absolute;top:2%;right:0;width:min(440px,94%)}
        .terminal-wrap{position:absolute;bottom:-4%;left:-6%;width:min(290px,60%);z-index:2}
        .terminal-shadow{position:absolute;inset:0;background:var(--sunset);border-radius:12px;transform:translate(8px,8px);transition:opacity 520ms ${EASE} var(--ink-d,0ms)}
        .terminal{position:relative;background:var(--ink);border:2px solid var(--ink);border-radius:12px;padding:16px 18px;min-height:150px;transition:${INK_T}}
        .terminal-dots{display:flex;gap:6px;margin-bottom:12px}
        .terminal-dot{width:9px;height:9px;border-radius:50%}
        .terminal-body{font-family:var(--mono);font-size:12px;line-height:1.9;transition:opacity 400ms ${EASE}}
        .term-cursor{display:inline-block;width:7px;height:12px;background:var(--meadow);margin-left:2px;transform:translateY(2px)}
        @media(max-width:900px){
          .hero-grid{grid-template-columns:1fr}
          .hero-visual{height:auto;order:-1;max-width:380px;width:100%;margin:0 auto}
          .hero-visual .char{position:relative;width:100%;top:0}
          .hero-circle{right:8%;width:78%}
          .terminal-wrap{display:none}
        }

        /* ---- character ---- */
        .char{--line:var(--ink)}
        .char svg{display:block;width:100%;height:auto;stroke:var(--line);overflow:visible;cursor:pointer;-webkit-tap-highlight-color:transparent}
        .char svg *{transition:stroke 520ms ${EASE} var(--ink-d,0ms),fill-opacity 620ms ${EASE} var(--ink-d,0ms)}
        .char .ink-fill{fill:var(--line);stroke:none}
        .char .arm-ol{stroke:var(--line)}
        .char .pupils{transition:transform 140ms linear}
        .char .eyes{transform-box:fill-box;transform-origin:center}
        .char .eyes.blink{animation:blink 220ms ease}
        @keyframes blink{50%{transform:scaleY(.1)}}
        .char-arm{transform-box:view-box;transform-origin:238px 236px;transform:rotate(150deg)}
        .char-arm.wave{animation:wave 2300ms ${EASE} both}
        @keyframes wave{0%{transform:rotate(150deg)}18%{transform:rotate(-4deg)}30%{transform:rotate(14deg)}42%{transform:rotate(-8deg)}54%{transform:rotate(14deg)}66%{transform:rotate(-2deg)}84%{transform:rotate(-2deg)}100%{transform:rotate(150deg)}}
        .char-doodles path{stroke-dasharray:90;stroke-dashoffset:0;transition:stroke-dashoffset 900ms ${EASE} 250ms,fill-opacity 620ms ${EASE}}
        .char.is-wire{--line:var(--wire)}
        .char.is-wire svg *{stroke-dasharray:4 6}
        .char.is-wire [data-fill]{fill-opacity:0}
        .char.is-wire .char-arm{opacity:0}
        .char.is-wire .char-doodles path{stroke-dasharray:90;stroke-dashoffset:90}
        .char-bubble{position:absolute;top:0;left:-2%;background:var(--surface);border:2px solid var(--ink);border-radius:18px 18px 18px 4px;padding:9px 14px;font-family:var(--display);font-size:17px;cursor:pointer;animation:bubbleIn 520ms ${POP} 900ms both;transition:transform 220ms ${EASE}}
        .char-bubble:hover{transform:translate(-2px,-2px) rotate(-2deg)}
        .char-bubble kbd{font-size:13px}
        @keyframes bubbleIn{from{opacity:0;transform:translateY(8px) scale(.85)}to{opacity:1;transform:none}}
        .hr.is-wire .char-bubble{opacity:0}

        /* ---- about ---- */
        .about-grid{display:grid;grid-template-columns:1.1fr 1fr;gap:56px;align-items:center}
        @media(max-width:900px){.about-grid{grid-template-columns:1fr}}
        .status-chip{display:inline-flex;align-items:center;gap:8px}
        .status-dot{width:8px;height:8px;border-radius:50%;background:var(--meadow-ink)}
        .sticker-stats{width:100%}
        .sticker-stats .sticker-face{display:flex;padding:0;width:100%;border-radius:16px;overflow:hidden;cursor:default}
        .sticker-stats .sticker-shadow{border-radius:16px;background:var(--sunset)}
        .stat-bar-row{display:grid;grid-template-columns:repeat(4,1fr);width:100%}
        .stat-item{padding:24px 20px}
        .stat-item + .stat-item{border-left:1.5px dashed var(--border)}
        .stat-num{font-family:var(--display);font-size:clamp(30px,3.4vw,38px);line-height:1}
        .stat-label{font-size:12.5px;color:var(--muted);margin-top:8px}
        @media(max-width:600px){.stat-bar-row{grid-template-columns:1fr 1fr}.stat-item:nth-child(3){border-left:none}.stat-item:nth-child(n+3){border-top:1.5px dashed var(--border)}}

        /* ---- work / carousel ---- */
        .work-head{margin-bottom:12px}
        .carousel{margin:0 calc(var(--px) * -1)}
        .carousel-viewport{overflow:hidden;padding:30px 0 70px;margin-bottom:-36px;touch-action:pan-y;cursor:grab;user-select:none;-webkit-user-select:none}
        .carousel-viewport:active{cursor:grabbing}
        .carousel-viewport:focus-visible{outline-offset:-6px}
        .carousel-track{display:flex;align-items:stretch;will-change:transform}
        .slide{flex:0 0 auto;transform:scale(.9);opacity:.5;transform-origin:50% 50%;transition:transform ${720}ms ${GLIDE},opacity ${720}ms ${GLIDE};cursor:pointer}
        .slide.is-active{transform:none;opacity:1;cursor:auto}
        .slide-card{height:100%;display:grid;grid-template-columns:40% 1fr;background:var(--surface);border:2px solid var(--ink);border-radius:20px;overflow:hidden;
          box-shadow:0 1px 0 rgba(43,34,32,.04),0 10px 24px -18px rgba(43,34,32,.3);transition:box-shadow ${720}ms ${GLIDE},${INK_T}}
        .slide.is-active .slide-card{box-shadow:0 2px 0 rgba(43,34,32,.05),0 30px 60px -30px rgba(158,68,82,.5),0 14px 28px -20px rgba(43,34,32,.35)}
        .slide-art{position:relative;min-height:280px;display:flex;align-items:center;justify-content:center;border-right:2px solid var(--ink);transition:${INK_T}}
        .slide-art svg{stroke:var(--ink);transition:opacity 520ms ${EASE} var(--ink-d,0ms)}
        .slide-art svg [fill="#171412"]{fill:var(--ink)}
        .slide-art svg :is(path,circle,ellipse,rect){stroke-dasharray:300;stroke-dashoffset:300;transition:stroke-dashoffset 1100ms ${EASE} calc(var(--ink-d,0ms) + 200ms)}
        .slide-art.drawn svg :is(path,circle,ellipse,rect){stroke-dashoffset:0}
        .slide-body{padding:30px 30px 32px;display:flex;flex-direction:column;align-items:flex-start}
        .portfolio-root .slide-title{font-family:var(--display);font-size:var(--fs-h3);line-height:1.15;margin:22px 0 8px}
        .slide-year{font-family:var(--sans);font-size:13px;font-weight:500;color:var(--muted);margin-left:6px}
        .portfolio-root .slide-desc{font-size:14.5px;line-height:1.7;color:var(--muted);margin-bottom:24px;flex:1}
        @media(max-width:760px){.slide-card{grid-template-columns:1fr}.slide-art{min-height:170px;border-right:none;border-bottom:2px solid var(--ink)}.slide-body{padding:22px 22px 24px}}
        .carousel-controls{display:flex;align-items:center;justify-content:center;gap:18px;margin-top:4px;padding:0 var(--px)}
        .carousel-dots{display:flex;gap:6px;align-items:center}
        .dot{width:14px;height:6px;border-radius:999px;border:none;background:var(--border);cursor:pointer;padding:0;transition:width ${720}ms ${GLIDE},background-color ${720}ms ${GLIDE}}
        .dot.on{width:34px;background:var(--rose-ink)}
        .carousel-count{font-size:13px;color:var(--muted);min-width:48px;text-align:center}

        /* ---- pills ---- */
        .pill-row{display:flex;flex-wrap:wrap;gap:7px}
        .pill{font-size:12px;font-weight:500;padding:5px 12px;border-radius:999px;background:var(--paper);color:var(--muted);border:1.5px solid var(--border);transition:${INK_T}}

        /* ---- skills ---- */
        .skill-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:22px}
        @media(max-width:900px){.skill-grid{grid-template-columns:1fr 1fr}}
        @media(max-width:480px){.skill-grid{grid-template-columns:1fr}}
        .skill-col{background:var(--surface);border:2px solid var(--ink);border-radius:14px;padding:20px 18px;transition:box-shadow 520ms ${EASE} var(--ink-d,0ms),${INK_T}}
        .skill-col:nth-child(1){box-shadow:6px 6px 0 var(--frosted)}
        .skill-col:nth-child(2){box-shadow:6px 6px 0 var(--meadow)}
        .skill-col:nth-child(3){box-shadow:6px 6px 0 var(--sunset)}
        .skill-col:nth-child(4){box-shadow:6px 6px 0 var(--peach)}
        .skill-cat{font-family:var(--display);font-size:18px;margin-bottom:8px}
        .skill-item{padding:9px 0;border-bottom:1px dashed var(--border)}
        .skill-item:last-child{border-bottom:none}
        .skill-name{font-size:14px;font-weight:600}
        .portfolio-root .skill-detail{font-size:12.5px;color:var(--muted);margin-top:2px}

        /* ---- quote ---- */
        .quote-band{background:var(--frosted);padding:84px var(--px);transition:${INK_T}}
        .quote-text{font-family:var(--display);font-size:var(--fs-quote);line-height:1.35;max-width:880px;color:var(--rose-ink)}

        /* ---- footer ---- */
        .footer{background:var(--ink);color:#F6EAE4;transition:${INK_T}}
        .footer-grid{display:grid;grid-template-columns:1fr 1fr;gap:32px;align-items:center}
        @media(max-width:820px){.footer-grid{grid-template-columns:1fr}.footer-squiggle{display:none}}
        .footer-squiggle path{stroke:var(--rose)}
        .portfolio-root .footer-title{font-family:var(--display);font-size:var(--fs-hero);line-height:1.12;color:var(--frosted);margin-bottom:14px}
        .footer-sub{font-size:15px;color:#CDBCB5}
        .footer-actions{display:flex;gap:14px;flex-wrap:wrap;margin-top:40px}
        .footer .sticker-face{border-color:var(--surface)}
        .footer .sticker:nth-child(2) .sticker-shadow{background:var(--meadow)}
        .footer .sticker:nth-child(3) .sticker-shadow{background:var(--sunset)}
        .footer-socials{display:flex;gap:10px;align-items:center;flex-wrap:wrap;margin-top:28px}
        .footer-socials a{display:flex;align-items:center;gap:7px;color:#CDBCB5;text-decoration:none;font-size:13px;font-weight:500;transition:color 220ms ${EASE}}
        .footer-socials a:hover{color:#FFFFFF}
        .footer-bottom{margin-top:68px;padding-top:20px;border-top:1px solid #4A3D39;display:flex;justify-content:space-between;flex-wrap:wrap;gap:10px;color:#A99792;font-size:12.5px}

        /* ---- modal (class names kept so your CaseStudyModal works as-is) ---- */
        .modal-scrim{position:fixed;inset:0;z-index:1000;display:flex;align-items:flex-end;justify-content:center;background:rgba(43,34,32,.45);animation:scrimIn 280ms ${EASE}}
        @keyframes scrimIn{from{background:rgba(43,34,32,0)}to{background:rgba(43,34,32,.45)}}
        @keyframes modalUp{from{opacity:0;transform:translateY(28px) scale(.98)}to{opacity:1;transform:none}}
        .modal-panel{position:relative;width:100%;max-width:760px;max-height:88vh;background:var(--surface);border-radius:18px 18px 0 0;border:2px solid var(--ink);border-bottom:none;overflow-y:auto;animation:modalUp 320ms ${EASE}}
        .modal-close-wrap{position:sticky;top:0;height:0;z-index:5}
        .modal-close{position:absolute;top:18px;right:20px;width:36px;height:36px;border-radius:50%;background:var(--surface);border:2px solid var(--ink);cursor:pointer;display:flex;align-items:center;justify-content:center;transition:transform 220ms ${EASE}}
        .modal-close:hover{transform:translate(-2px,-2px)}
        .modal-body{padding:44px 40px 56px}
        @media(max-width:600px){.modal-body{padding:36px 22px}}
        .portfolio-root .modal-meta{font-size:12.5px;color:var(--muted);margin-bottom:16px}
        .portfolio-root .modal-title{font-family:var(--display);font-size:var(--fs-h2);line-height:1.05;margin-bottom:20px}
        .portfolio-root .modal-subtitle{font-size:15px;color:var(--muted);margin-bottom:40px}
        .portfolio-root .modal-label{font-size:12px;font-weight:600;color:var(--muted);margin-bottom:10px}
        .modal-rule{height:2px;background:var(--ink);opacity:.08;margin:26px 0}
        .modal-two-col{display:grid;grid-template-columns:1fr 1fr;gap:20px}
        @media(max-width:600px){.modal-two-col{grid-template-columns:1fr!important}}
        .modal-soft-box{background:var(--paper);border:1.5px dashed var(--border);border-radius:12px;padding:18px 20px}
        .feature-list{display:flex;flex-direction:column;gap:9px}
        .feature-item{display:flex;align-items:flex-start;gap:9px;font-size:13.5px;line-height:1.6}
        .feature-dot{width:6px;height:6px;border-radius:50%;background:var(--rose);flex-shrink:0;margin-top:7px}
        .tech-row{display:flex;justify-content:space-between;gap:8px;padding:9px 0;border-bottom:1px dashed var(--border)}
        .tech-key{font-size:12px;color:var(--muted)}
        .tech-val{font-size:13px;text-align:right}
        .modal-links-row{display:flex;flex-wrap:wrap;gap:20px}
        .portfolio-root .modal-note{font-size:12.5px;color:var(--muted);margin-top:30px;line-height:1.6}
        .pill-accent{background:var(--meadow);color:var(--meadow-ink);border-color:var(--meadow)}
      `}</style>

      {activeProject && <CaseStudyModal project={activeProject} onClose={() => setActiveProject(null)} />}

      <div className="hr-toast" role="status" aria-live="polite">
        {toast && (
          <span key={toast.id} className="hr-toast-in"><span className="hr-glyph" aria-hidden="true">↻</span>{toast.text}</span>
        )}
      </div>

      {/* NAV */}
      <nav className="nav">
        <button className="nav-logo" onClick={() => scrollTo("hero")} aria-label="Back to top"><ScribbleLogo /></button>
        <div className="nav-links" ref={navLinksRef}>
          {NAV_ITEMS.map(l => (
            <button key={l} ref={el => { navItemRefs.current[l.toLowerCase()] = el; }} className="nav-link"
              aria-current={activeSection === l.toLowerCase() ? "true" : undefined}
              onClick={() => scrollTo(l.toLowerCase())}>{l}</button>
          ))}
          <NavInk containerRef={navLinksRef} itemRefs={navItemRefs} activeKey={activeSection} />
        </div>
        <button className="menu-toggle" onClick={() => setMenuOpen(v => !v)} aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen}>
          {menuOpen ? <IconClose size={20} /> : <SketchMenu />}
        </button>
      </nav>
      {menuOpen && (
        <div className="mobile-menu">
          {NAV_ITEMS.map(l => (
            <button key={l} className="nav-link" aria-current={activeSection === l.toLowerCase() ? "true" : undefined}
              onClick={() => scrollTo(l.toLowerCase())}>{l}</button>
          ))}
        </div>
      )}

      {/* HERO */}
      <section id="hero" className={`sec hero ${hr(booted)}`}>
        <div className="inner">
          <div className="hero-grid">
            <div>
              <h1 className="hero-title" style={heroAt(0)}>Flutter developer,<br />shipping real apps.</h1>
              <div className="hero-lines" style={heroAt(1)}>
                <p>Hi, I'm Ayesha!</p>
                <p>I build production Flutter apps at Splenify, and I've been at it since 2024.</p>
                <p>Particular about clean architecture and smooth UI.</p>
              </div>

              <div className="hero-actions" style={heroAt(3)}>
                <Sticker className="sticker-cta" onClick={() => scrollTo("work")}>
                  See my work <span className="icon-nudge"><IconArrow size={16} /></span>
                </Sticker>
                <button type="button" className="kbd-chip" onClick={hotReload}>
                  <kbd>r</kbd> Hot reload this page
                </button>
              </div>

              <div className="hero-links" style={heroAt(4)}>
                <a href="https://github.com/ayeshakamran543" target="_blank" rel="noreferrer">GitHub</a>
                <span className="muted">/</span>
                <a href="https://www.linkedin.com/in/ayesha-kamran-b2b570247/" target="_blank" rel="noreferrer">LinkedIn</a>
                <span className="muted">/</span>
                <a href="/resume.pdf" download="Ayesha_Kamran_Resume.pdf">Resume</a>
              </div>
            </div>

            <div className="hero-visual" style={heroAt(2)}>
              <div className="hero-circle" />
              <Character wire={!booted || reloading} waveKey={waveKey} onBubbleClick={hotReload} />
              <div className="terminal-wrap" aria-hidden="true">
                <div className="terminal-shadow" />
                <div className="terminal">
                  <div className="terminal-dots">
                    <span className="terminal-dot" style={{ background: "#EBA5A5" }} />
                    <span className="terminal-dot" style={{ background: "#FFCA8C" }} />
                    <span className="terminal-dot" style={{ background: "#A4BDA8" }} />
                  </div>
                  <div className="terminal-body">
                    {TERMINAL_LINES.slice(0, termLine).map((l, i) => <div key={i} style={{ color: l.c }}>{l.t}</div>)}
                    {termLine < TERMINAL_LINES.length && (
                      <div style={{ color: TERMINAL_LINES[termLine].c }}>
                        {TERMINAL_LINES[termLine].t.slice(0, termChar)}<span className="term-cursor" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className={`sec ${hr(aboutOn)}`} ref={aboutRef}>
        <SketchDivider drawn={aboutOn && !reloading} />
        <div className="inner">
          <div className="about-grid">
            <div>
              <h2 className="h2" style={{ marginBottom: 22, ...inkAt(0) }}>Building apps people rely on.</h2>
              <p className="body-text" style={{ marginBottom: 16, ...inkAt(1) }}>
                I'm a Flutter developer with two years of experience crafting mobile experiences that are fast, considered, and built to last past the demo. At Splenify, I turn design specs into production-ready UI and take features from concept through to launch across a growing portfolio of apps.
              </p>
              <p className="body-text" style={{ marginBottom: 26, ...inkAt(2) }}>
                Currently leading the frontend on FanHub and MogWars, two apps built from the ground up.
              </p>
              <Sticker as="div" className="sticker-btn pill-shape" style={inkAt(3)}>
                <span className="status-chip"><span className="status-dot" />Currently at Splenify</span>
              </Sticker>
            </div>

            <Sticker as="div" className="sticker-stats" style={inkAt(2)}>
              <div className="stat-bar-row">
                {STATS.map(({ k, s, l }) => (
                  <div key={k} className="stat-item">
                    <div className="stat-num">{stats[k]}{s}</div>
                    <div className="stat-label">{l}</div>
                  </div>
                ))}
              </div>
            </Sticker>
          </div>
        </div>
      </section>

      {/* WORK */}
      <section id="work" className={`sec ${hr(workOn)}`} ref={workRef}>
        <SketchDivider drawn={workOn && !reloading} />
        <div className="inner">
          <div className="work-head" style={inkAt(0)}>
            <div>
              <h2 className="h2" style={{ marginBottom: 10 }}>Crafted with care.</h2>
              <p className="lede">A selection of apps I've shipped end to end. Drag, swipe, or use the arrows.</p>
            </div>
          </div>
        </div>
        <div style={inkAt(1)}>
          <ProjectCarousel projects={PROJECTS} icons={ProjectIcon} onOpen={setActiveProject} drawn={workOn && !reloading} />
        </div>
      </section>

      {/* QUOTE */}
      <section className={`quote-band ${hr(quoteOn)}`} ref={quoteRef}>
        <div className="inner">
          <p className="quote-text" style={heroAt(2)}>&ldquo;{QUOTE}&rdquo;</p>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className={`sec ${hr(skillsOn)}`} ref={skillsRef}>
        <SketchDivider drawn={skillsOn && !reloading} />
        <div className="inner">
          <h2 className="h2" style={{ marginBottom: 10, ...inkAt(0) }}>What I build with.</h2>
          <p className="lede" style={{ marginBottom: 36, ...inkAt(1) }}>The tools behind the apps above.</p>
          <div className="skill-grid">
            {SKILL_GROUPS.map((grp, i) => (
              <div key={grp.cat} className="skill-col" style={inkAt(2 + i)}>
                <p className="skill-cat">{grp.cat}</p>
                {grp.skills.map(sk => (
                  <div key={sk.n} className="skill-item">
                    <p className="skill-name">{sk.n}</p>
                    <p className="skill-detail">{sk.d}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className={`sec footer ${hr(contactOn)}`} ref={contactRef} style={{ paddingBottom: "calc(var(--py) + 20px)" }}>
        <div className="inner">
          <div className="footer-grid">
            <div>
              <h2 className="footer-title" style={heroAt(2)}>Let's build<br />something together.</h2>
              <p className="footer-sub" style={heroAt(3)}>Open to Flutter roles, freelance work, and international opportunities.</p>
            </div>
            <div className="footer-squiggle"><SquiggleLine /></div>
          </div>

          <div className="footer-actions" style={heroAt(5)}>
            <Sticker as="a" href="mailto:ayeshakamran053@gmail.com" className="sticker-btn">
              Say hello <span className="icon-nudge"><IconArrow size={13} /></span>
            </Sticker>
            <Sticker className="sticker-btn" onClick={copyEmail}>
              {copied ? <IconCheck size={13} /> : <IconCopy size={13} />}
              {copied ? "Copied" : "ayeshakamran053@gmail.com"}
            </Sticker>
            <Sticker as="a" href="/resume.pdf" download="Ayesha_Kamran_Resume.pdf" className="sticker-btn">
              Download resume
            </Sticker>
          </div>

          <div className="footer-socials">
            <a href="https://github.com/ayeshakamran543" target="_blank" rel="noreferrer"><GithubIcon size={15} /> github.com/ayeshakamran543</a>
            <span style={{ color: "#4A3D39" }} aria-hidden="true">/</span>
            <a href="https://www.linkedin.com/in/ayesha-kamran-b2b570247/" target="_blank" rel="noreferrer"><LinkedinIcon size={15} /> linkedin.com/in/ayesha-kamran</a>
          </div>

          <div className="footer-bottom">
            <span>Ayesha Kamran, Flutter developer</span>
            <span>Rawalpindi, Pakistan</span>
          </div>
        </div>
      </section>
    </div>
  );
}