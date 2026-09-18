import { useState, useEffect } from "react";

import { IconArrow, IconClose, IconCopy, IconCheck, GithubIcon, LinkedinIcon, ScribbleLogo, SketchMenu, ProjectIcon } from "./icons";
import { PROJECTS, SKILL_GROUPS, STATS, QUOTE, TERMINAL_LINES } from "./data";
import { EASE, useInView, enter } from "./motion";
import { Sticker, SquiggleLine } from "./Sticker";
import { CaseStudyModal } from "./CaseStudyModal";

/* ════════════════════════════════════════════════════════════════════════
   Ayesha Kamran — Portfolio
   Hand-drawn / sketch aesthetic: warm cream canvas, single sage accent,
   bold marker display type, "sticker" offset cards, numbered project
   rows, dark footer CTA.
   ════════════════════════════════════════════════════════════════════════ */
export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeProject, setActiveProject] = useState(null);
  const [copied, setCopied] = useState(false);
  const [stats, setStats] = useState({ y: 0, p: 0, f: 0, a: 0 });
  const [termLine, setTermLine] = useState(0);
  const [termChar, setTermChar] = useState(0);

  const [aboutRef, aboutSeen] = useInView();
  const [workRef, workSeen] = useInView();
  const [skillsRef, skillsSeen] = useInView();
  const [contactRef, contactSeen] = useInView();

  // Stat counters: run once when the section enters view, ~700ms, then stop for good.
  useEffect(() => {
    if (!aboutSeen) return;
    const target = { y: 2, p: 5, f: 50, a: 20 };
    const duration = 700;
    const start = Date.now();
    const iv = setInterval(() => {
      const t = Math.min((Date.now() - start) / duration, 1);
      const e = 1 - Math.pow(1 - t, 3);
      setStats({
        y: Math.round(e * target.y), p: Math.round(e * target.p),
        f: Math.round(e * target.f), a: Math.round(e * target.a),
      });
      if (t >= 1) clearInterval(iv);
    }, 16);
    return () => clearInterval(iv);
  }, [aboutSeen]);

  // Terminal types one character at a time, one line at a time, then stops for good.
  useEffect(() => {
    if (termLine >= TERMINAL_LINES.length) return;
    const full = TERMINAL_LINES[termLine].t;
    if (termChar < full.length) {
      const t = setTimeout(() => setTermChar(c => c + 1), termLine === 0 ? 22 : 16);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => { setTermLine(n => n + 1); setTermChar(0); }, termLine === 0 ? 300 : 260);
    return () => clearTimeout(t);
  }, [termLine, termChar]);

  const scrollTo = (id) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setMenuOpen(false); };
  const NAV_ITEMS = ["Work", "About", "Skills", "Contact"];

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
          --bg:#F4F3ED; --surface:#FFFFFF; --ink:#171412; --muted:#787672; --border:#E4E2D8;
          --sage:#B7C4A3; --sage-ink:#5B6E48;
          --display:'Kalam',cursive; --sans:'Space Grotesk',system-ui,sans-serif; --mono:'JetBrains Mono',monospace;
          --px:64px; --py:100px; --nav-h:76px;
          background:var(--bg); color:var(--ink); font-family:var(--sans); min-height:100vh;
        }
        @media(max-width:900px){.portfolio-root{--px:22px;--py:68px;--nav-h:64px}}
        .portfolio-root :is(h1,h2,h3){margin:0}
        .portfolio-root p{margin:0}
        .portfolio-root button{font-family:inherit}
        @media(prefers-reduced-motion:reduce){.portfolio-root *,.portfolio-root *::before,.portfolio-root *::after{animation-duration:.001ms!important;transition-duration:.001ms!important}}

        .sec{padding:var(--py) var(--px)}
        .inner{max-width:1120px;margin:0 auto}
        .eyebrow{font-family:var(--mono);font-size:11.5px;color:var(--muted)}
        .h2{font-family:var(--display);font-size:clamp(28px,4vw,40px);line-height:1.15}
        .body-text{font-size:15.5px;line-height:1.8}
        .body-text.small{font-size:13.5px;line-height:1.75}
        .muted{color:var(--muted)}

        /* ---- nav ---- */
        .nav{position:sticky;top:0;z-index:200;height:var(--nav-h);display:flex;align-items:center;justify-content:space-between;padding:0 var(--px);background:var(--bg)}
        .nav-logo{background:none;border:none;cursor:pointer;padding:6px;display:flex}
        .nav-links{display:flex;align-items:center;gap:30px}
        .nav-link{color:var(--ink);font-size:15px;font-weight:500;cursor:pointer;background:none;border:none;transition:opacity 240ms ${EASE};padding:4px 0}
        .nav-link:hover{opacity:.55}
        .menu-toggle{background:none;border:none;cursor:pointer;padding:8px}
        @media(max-width:820px){.nav-links{display:none}}
        .mobile-menu{position:fixed;top:var(--nav-h);left:0;right:0;z-index:199;background:var(--bg);border-top:2px solid var(--ink);display:flex;flex-direction:column;padding:8px var(--px) 22px}
        .mobile-menu .nav-link{font-size:17px;padding:13px 0;border-bottom:1px dashed var(--border);text-align:left}

        /* ---- sticker: one component, used by every raised element on the page ---- */
        .sticker{position:relative;display:inline-block;cursor:pointer;border:none;background:none;padding:0;text-decoration:none;font-family:inherit;color:inherit}
        .sticker-shadow{position:absolute;inset:0;background:var(--sage);border-radius:inherit;transform:translate(6px,6px);transition:transform 240ms ${EASE}}
        .sticker-face{position:relative;display:inline-flex;align-items:center;gap:9px;background:var(--surface);border:2px solid var(--ink);border-radius:8px;transition:transform 240ms ${EASE},box-shadow 240ms ${EASE}}
        .sticker:hover .sticker-face{transform:translate(-2px,-2px);box-shadow:0 10px 22px -10px rgba(91,110,72,.4)}
        .sticker:hover .sticker-shadow{transform:translate(9px,9px)}
        .sticker:active .sticker-face{transform:translate(1px,1px) scale(.98);transition-duration:120ms}
        .sticker:active .sticker-shadow{transform:translate(4px,4px);transition-duration:120ms}
        .sticker.pill-shape .sticker-face,.sticker.pill-shape .sticker-shadow{border-radius:999px}
        .sticker .icon-nudge{transition:transform 240ms ${EASE}}
        .sticker:hover .icon-nudge{transform:translateX(3px)}

        .sticker-cta .sticker-face{padding:15px 26px;font-weight:600;font-size:14px;letter-spacing:.03em;text-transform:uppercase}
        .sticker-btn .sticker-face{padding:11px 20px;font-weight:600;font-size:13.5px}

        /* ---- plain buttons (dark/light, no sticker offset — used in the modal) ---- */
        .btn{display:inline-flex;align-items:center;gap:7px;padding:10px 18px;border-radius:8px;font-size:13.5px;font-weight:600;text-decoration:none;cursor:pointer;border:2px solid var(--ink);transition:transform 220ms ${EASE};background:none}
        .btn:hover{transform:translate(-2px,-2px)}
        .btn-dark{background:var(--ink);color:var(--surface)}
        .btn-light{background:var(--surface);color:var(--ink)}

        /* ---- hero ---- */
        .hero{padding-top:44px;padding-bottom:84px;overflow:hidden}
        .hero-grid{display:grid;grid-template-columns:1.05fr .95fr;gap:40px;align-items:center}
        @media(max-width:900px){.hero-grid{grid-template-columns:1fr}}
        .hero-title{font-family:var(--display);font-weight:700;font-size:clamp(38px,5.4vw,60px);line-height:1.12;margin-bottom:26px}
        .hero-lines p{line-height:2;font-size:17px}
        .hero-links{display:flex;gap:10px;align-items:center;margin-top:52px}
        .hero-links a{color:var(--ink);text-decoration:underline;text-underline-offset:3px;font-size:14px;transition:opacity 220ms ${EASE}}
        .hero-links a:hover{opacity:.6}
        .hero-visual{position:relative;height:380px}
        @media(max-width:900px){.hero-visual{display:none}}
        .hero-blob{position:absolute;top:-6%;left:4%;width:78%;height:78%;border-radius:50%;background:radial-gradient(circle,rgba(183,196,163,.35) 0%,transparent 70%)}
        .hero-circle{position:absolute;top:8%;left:6%;width:72%;height:72%;border-radius:50%;background:var(--surface)}
        .terminal-wrap{position:absolute;bottom:6%;right:0;width:min(360px,88%)}
        .terminal-shadow{position:absolute;inset:0;background:#8B8A83;border-radius:12px;transform:translate(10px,10px)}
        .terminal{position:relative;background:#171412;border-radius:12px;padding:18px 20px;min-height:168px}
        .terminal-dots{display:flex;justify-content:flex-end;gap:6px;margin-bottom:14px}
        .terminal-dot{width:10px;height:10px;border-radius:50%}
        .terminal-body{font-family:var(--mono);font-size:13px;line-height:2}
        .term-cursor{display:inline-block;width:7px;height:13px;background:#5DCAA5;margin-left:2px;transform:translateY(2px)}

        /* ---- about ---- */
        .about-grid{display:grid;grid-template-columns:1.1fr 1fr;gap:56px;align-items:center}
        @media(max-width:900px){.about-grid{grid-template-columns:1fr}}
        .status-chip{display:inline-flex;align-items:center;gap:8px}
        .status-dot{width:7px;height:7px;border-radius:50%;background:var(--sage-ink)}
        .sticker-stats .sticker-face{display:flex;padding:0;width:100%;border-radius:14px;overflow:hidden}
        .sticker-stats .sticker-shadow{border-radius:14px}
        .stat-bar-row{display:flex;width:100%}
        .stat-item{flex:1;padding:24px 22px;transition:background 240ms ${EASE}}
        .stat-item:hover{background:var(--bg)}
        .stat-item + .stat-item{border-left:1.5px dashed var(--border)}
        .stat-num{font-family:var(--display);font-size:clamp(28px,3.4vw,36px);line-height:1}
        .stat-label{font-size:12.5px;color:var(--muted);margin-top:8px}
        @media(max-width:600px){.stat-bar-row{flex-wrap:wrap}.stat-item{flex:1 1 50%}.stat-item:nth-child(2n){border-left:1.5px dashed var(--border)}.stat-item:nth-child(3),.stat-item:nth-child(4){border-top:1.5px dashed var(--border)}.stat-item:nth-child(3){border-left:none}}

        /* ---- projects ---- */
        .project-row{display:grid;grid-template-columns:220px 1fr;gap:32px;align-items:center}
        @media(max-width:760px){.project-row{grid-template-columns:1fr}}
        .project-row + .project-row{margin-top:40px}
        .project-icon-card{position:relative;background:var(--sage);border-radius:14px;height:160px;display:flex;align-items:center;justify-content:center;overflow:hidden;transition:transform 280ms ${EASE}}
        .project-icon-card:hover{transform:translate(-3px,-3px) rotate(-2deg)}
        .project-icon-card svg :is(path,circle,ellipse,rect){stroke-dasharray:300;stroke-dashoffset:300;transition:stroke-dashoffset 900ms ${EASE} var(--draw-delay,0ms)}
        .project-icon-card.drawn svg :is(path,circle,ellipse,rect){stroke-dashoffset:0}
        .project-num{position:absolute;top:10px;left:14px;font-family:var(--display);font-size:36px;color:rgba(23,20,18,.18);line-height:1;opacity:0;transform:scale(.5);transition:opacity 380ms ${EASE} var(--draw-delay,0ms),transform 380ms ${EASE} var(--draw-delay,0ms)}
        .project-icon-card.drawn .project-num{opacity:1;transform:scale(1)}
        .project-desc{font-size:14px;line-height:1.7;color:var(--muted);margin:8px 0 18px;max-width:480px}
        .project-title{font-family:var(--display);font-size:26px;margin-bottom:6px;transition:color 240ms ${EASE}}
        .project-row:hover .project-title{color:var(--sage-ink)}

        /* ---- pills / tags ---- */
        .pill-row{display:flex;flex-wrap:wrap;gap:8px}
        .pill{font-family:var(--mono);font-size:11px;font-weight:500;padding:5px 12px;border-radius:999px;background:var(--surface);color:var(--muted);border:1.5px solid var(--border)}
        .pill-accent{background:var(--sage);color:var(--sage-ink);border-color:var(--sage)}

        /* ---- skills ---- */
        .skill-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:22px}
        @media(max-width:820px){.skill-grid{grid-template-columns:1fr 1fr}}
        @media(max-width:480px){.skill-grid{grid-template-columns:1fr}}
        .skill-col{background:var(--surface);border:2px solid var(--ink);border-radius:10px;padding:20px 18px;transition:transform 240ms ${EASE},box-shadow 240ms ${EASE}}
        .skill-col:hover{transform:translate(-2px,-2px);box-shadow:0 10px 20px -10px rgba(23,20,18,.18)}
        .skill-cat{font-family:var(--mono);font-size:11px;color:var(--muted);margin-bottom:12px}
        .skill-item{padding:9px 0;border-bottom:1px dashed var(--border)}
        .skill-item:last-child{border-bottom:none}
        .skill-name{font-size:13.5px;font-weight:600}
        .skill-detail{font-size:12px;color:var(--muted);margin-top:2px}

        /* ---- quote ---- */
        .quote-band{background:var(--sage);padding:84px var(--px)}
        .quote-text{font-family:var(--display);font-size:clamp(24px,3.6vw,38px);line-height:1.35;max-width:880px;color:var(--sage-ink)}

        /* ---- footer / contact (dark) ---- */
        .footer{background:#171412;color:#F1EFE8}
        .footer-grid{display:grid;grid-template-columns:1fr 1fr;gap:32px;align-items:center}
        @media(max-width:820px){.footer-grid{grid-template-columns:1fr}.footer-squiggle{display:none}}
        .footer-title{font-family:var(--display);font-size:clamp(30px,4.6vw,48px);line-height:1.15;color:var(--sage);margin-bottom:14px}
        .footer-sub{font-size:15px;color:#9C9A92}
        .footer-actions{display:flex;gap:12px;flex-wrap:wrap;margin-top:40px}
        .sticker-cta-dark .sticker-face{background:#FFFFFF;color:var(--ink);border-color:#FFFFFF}
        .sticker-cta-dark .sticker-shadow{background:var(--sage)}
        .sticker-outline-dark .sticker-face{background:#FFFFFF;color:var(--ink);border-color:#FFFFFF}
        .sticker-outline-dark .sticker-shadow{background:var(--sage)}
        .footer-socials{display:flex;gap:10px;align-items:center;margin-top:26px}
        .footer-socials a{display:flex;align-items:center;gap:7px;color:#9C9A92;text-decoration:none;font-size:13px;font-weight:500;transition:color 220ms ${EASE}}
        .footer-socials a:hover{color:#F1EFE8}
        .footer-bottom{margin-top:68px;padding-top:20px;border-top:1px solid #3A3834;display:flex;justify-content:space-between;flex-wrap:wrap;gap:10px;color:#726F68;font-size:12.5px}

        /* ---- modal ---- */
        .modal-scrim{position:fixed;inset:0;z-index:1000;display:flex;align-items:flex-end;justify-content:center;background:rgba(23,20,18,.45);animation:scrimIn 280ms ${EASE}}
        @keyframes scrimIn{from{background:rgba(23,20,18,0)}to{background:rgba(23,20,18,.45)}}
        @keyframes modalUp{from{opacity:0;transform:translateY(28px) scale(.98)}to{opacity:1;transform:translateY(0) scale(1)}}
        .modal-panel{position:relative;width:100%;max-width:760px;max-height:88vh;margin-bottom:0;background:var(--surface);border-radius:16px 16px 0 0;overflow-y:auto;animation:modalUp 320ms ${EASE}}
        .modal-close{position:sticky;top:18px;float:right;margin-right:20px;width:36px;height:36px;border-radius:50%;background:var(--surface);border:2px solid var(--ink);cursor:pointer;display:flex;align-items:center;justify-content:center;transition:transform 220ms ${EASE}}
        .modal-close:hover{transform:translate(-2px,-2px)}
        .modal-body{padding:44px 40px 44px;clear:both}
        .modal-meta{font-family:var(--mono);font-size:12px;color:var(--muted);margin-bottom:8px}
        .modal-title{font-family:var(--display);font-size:clamp(30px,5vw,46px);line-height:1.05;margin-bottom:10px}
        .modal-subtitle{font-size:15px;color:var(--muted);margin-bottom:20px}
        .modal-label{font-family:var(--mono);font-size:11px;font-weight:600;color:var(--muted);margin-bottom:10px}
        .modal-rule{height:2px;background:var(--ink);opacity:.08;margin:26px 0}
        .modal-two-col{display:grid;grid-template-columns:1fr 1fr;gap:20px}
        @media(max-width:600px){.modal-two-col{grid-template-columns:1fr!important}}
        .modal-soft-box{background:var(--bg);border:1.5px dashed var(--border);border-radius:10px;padding:18px 20px}
        .feature-list{display:flex;flex-direction:column;gap:9px}
        .feature-item{display:flex;align-items:flex-start;gap:9px;font-size:13px;line-height:1.6}
        .feature-dot{width:5px;height:5px;border-radius:50%;background:var(--sage-ink);flex-shrink:0;margin-top:7px}
        .tech-row{display:flex;justify-content:space-between;gap:8px;padding:9px 0;border-bottom:1px dashed var(--border)}
        .tech-key{font-family:var(--mono);font-size:11px;color:var(--muted)}
        .tech-val{font-size:13px;text-align:right}
        .modal-note{font-size:12px;color:var(--muted);margin-top:14px;line-height:1.6}
      `}</style>

      {activeProject && <CaseStudyModal project={activeProject} onClose={() => setActiveProject(null)} />}

      {/* NAV */}
      <nav className="nav">
        <button className="nav-logo" onClick={() => scrollTo("hero")} aria-label="Home"><ScribbleLogo /></button>
        <div className="nav-links">
          {NAV_ITEMS.map(l => <button key={l} className="nav-link" onClick={() => scrollTo(l.toLowerCase())}>{l}</button>)}
        </div>
        <button className="menu-toggle" onClick={() => setMenuOpen(v => !v)} aria-label="Menu">
          {menuOpen ? <IconClose size={20} /> : <SketchMenu />}
        </button>
      </nav>
      {menuOpen && (
        <div className="mobile-menu">
          {NAV_ITEMS.map(l => <button key={l} className="nav-link" onClick={() => scrollTo(l.toLowerCase())}>{l}</button>)}
        </div>
      )}

      {/* HERO */}
      <section id="hero" className="sec hero">
        <div className="inner">
          <div className="hero-grid">
            <div>
              <h1 className="hero-title" style={enter(true, 0)}>Flutter Developer,<br />shipping real apps.</h1>
              <div className="hero-lines" style={enter(true, 90)}>
                <p>Hi, I'm Ayesha!</p>
                <p className="muted">— a Flutter developer shipping production apps</p>
                <p className="muted">— shipping production apps at Splenify since 2024</p>
                <p className="muted">— particular about clean architecture &amp; smooth UI</p>
              </div>

              <div style={{ marginTop: 34, ...enter(true, 170) }}>
                <Sticker className="sticker-cta" onClick={() => scrollTo("work")}>
                  See my work <span className="icon-nudge"><IconArrow size={16} /></span>
                </Sticker>
              </div>

              <div className="hero-links" style={enter(true, 230)}>
                <a href="https://github.com/ayeshakamran543" target="_blank" rel="noreferrer">Github</a>
                <span className="muted">/</span>
                <a href="https://www.linkedin.com/in/ayesha-kamran-b2b570247/" target="_blank" rel="noreferrer">LinkedIn</a>
                <span className="muted">/</span>
                <a href="/resume.pdf" download="Ayesha_Kamran_Resume.pdf">Resume</a>
              </div>
            </div>

            <div className="hero-visual" style={enter(true, 150)}>
              <div className="hero-blob" />
              <div className="hero-circle" />
              <div className="terminal-wrap">
                <div className="terminal-shadow" />
                <div className="terminal">
                  <div className="terminal-dots">
                    <span className="terminal-dot" style={{ background: "#F0B429" }} />
                    <span className="terminal-dot" style={{ background: "#5DCAA5" }} />
                    <span className="terminal-dot" style={{ background: "#E8574A" }} />
                  </div>
                  <div className="terminal-body">
                    {TERMINAL_LINES.slice(0, termLine).map((l, i) => (
                      <div key={i} style={{ color: l.c }}>{l.t}</div>
                    ))}
                    {termLine < TERMINAL_LINES.length && (
                      <div style={{ color: TERMINAL_LINES[termLine].c }}>
                        {TERMINAL_LINES[termLine].t.slice(0, termChar)}
                        <span className="term-cursor" />
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
      <section id="about" className="sec" ref={aboutRef}>
        <div className="inner">
          <div className="about-grid">
            <div>
              <p className="eyebrow" style={{ marginBottom: 12, ...enter(aboutSeen, 0) }}>About</p>
              <h2 className="h2" style={{ marginBottom: 22, ...enter(aboutSeen, 60) }}>Building apps people rely on.</h2>
              <p className="body-text" style={{ marginBottom: 16, ...enter(aboutSeen, 120) }}>
                I'm a Flutter developer with two years of experience crafting mobile experiences that are fast, considered, and built to last past the demo. At Splenify, I turn design specs into production-ready UI and take features from concept through to launch across a growing portfolio of apps.
              </p>
              <p className="body-text" style={{ marginBottom: 24, ...enter(aboutSeen, 170) }}>
                Currently leading the frontend on FanHub and MogWars, two apps built from the ground up.
              </p>
              <div style={enter(aboutSeen, 220)}>
                <Sticker as="div" className="sticker-btn pill-shape">
                  <span className="status-chip">
                    <span className="status-dot" />
                    Currently at Splenify
                  </span>
                </Sticker>
              </div>
            </div>

            <div style={enter(aboutSeen, 100)}>
              <Sticker as="div" className="sticker-stats">
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
        </div>
      </section>

      {/* PROJECTS */}
      <section id="work" className="sec" ref={workRef}>
        <div className="inner">
          <h2 className="h2" style={{ marginBottom: 8, ...enter(workSeen, 0) }}>Crafted with care.</h2>
          <p className="muted" style={{ fontSize: 15, marginBottom: 48, ...enter(workSeen, 50) }}>
            Here's a selection of the apps I've shipped end to end.
          </p>

          {PROJECTS.map((p, i) => {
            const IconEl = ProjectIcon[p.name];
            const rowDelay = 80 + i * 60;
            return (
              <div key={p.name} className="project-row" style={enter(workSeen, rowDelay)}>
                <div
                  className={`project-icon-card${workSeen ? " drawn" : ""}`}
                  style={{ "--draw-delay": `${rowDelay + 200}ms` }}
                >
                  <span className="project-num">{String(i + 1).padStart(2, "0")}</span>
                  {IconEl && <IconEl width="70" height="70" />}
                </div>
                <div>
                  <div className="pill-row" style={{ marginBottom: 8 }}>
                    {p.tags.map(t => <span key={t} className="pill">{t}</span>)}
                    <span className="eyebrow">{p.year}</span>
                  </div>
                  <h3 className="project-title">{p.name}</h3>
                  <p className="project-desc">{p.desc}</p>
                  <Sticker className="sticker-btn" onClick={() => setActiveProject(p)}>
                    View project <span className="icon-nudge"><IconArrow size={14} /></span>
                  </Sticker>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* QUOTE */}
      <section className="quote-band">
        <div className="inner">
          <p className="quote-text">&ldquo;{QUOTE}&rdquo;</p>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="sec" ref={skillsRef}>
        <div className="inner">
          <h2 className="h2" style={{ marginBottom: 10, ...enter(skillsSeen, 0) }}>What I build with.</h2>
          <p className="muted" style={{ fontSize: 15, marginBottom: 34, ...enter(skillsSeen, 50) }}>
            Skills that ship production apps, not tutorials.
          </p>
          <div className="skill-grid" style={enter(skillsSeen, 100)}>
            {SKILL_GROUPS.map(grp => (
              <div key={grp.cat} className="skill-col">
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

      {/* CONTACT / FOOTER */}
      <section id="contact" className="sec footer" ref={contactRef} style={{ paddingBottom: "calc(var(--py) + 20px)" }}>
        <div className="inner">
          <div className="footer-grid">
            <div>
              <h2 className="footer-title" style={enter(contactSeen, 0)}>Let's build<br />something together.</h2>
              <p className="footer-sub" style={enter(contactSeen, 60)}>Open to Flutter roles, freelance work, and international opportunities.</p>
            </div>
            <div className="footer-squiggle" style={enter(contactSeen, 100)}><SquiggleLine /></div>
          </div>

          <div className="footer-actions" style={enter(contactSeen, 150)}>
            <Sticker as="a" href="mailto:ayeshakamran053@gmail.com" className="sticker-btn sticker-cta-dark">
              Say hello <span className="icon-nudge"><IconArrow size={13} /></span>
            </Sticker>
            <Sticker className="sticker-btn sticker-outline-dark" onClick={copyEmail}>
              {copied ? <IconCheck size={13} /> : <IconCopy size={13} />}
              {copied ? "Copied" : "ayeshakamran053@gmail.com"}
            </Sticker>
            <Sticker as="a" href="/resume.pdf" download="Ayesha_Kamran_Resume.pdf" className="sticker-btn sticker-outline-dark">
              Download resume
            </Sticker>
          </div>

          <div className="footer-socials" style={enter(contactSeen, 190)}>
            <a href="https://github.com/ayeshakamran543" target="_blank" rel="noreferrer"><GithubIcon size={15} /> github.com/ayeshakamran543</a>
            <span style={{ color: "#3A3834" }}>·</span>
            <a href="https://www.linkedin.com/in/ayesha-kamran-b2b570247/" target="_blank" rel="noreferrer"><LinkedinIcon size={15} /> linkedin.com/in/ayeshakamran</a>
          </div>

          <div className="footer-bottom">
            <span>Ayesha Kamran — Flutter Developer</span>
            <span>Rawalpindi, Pakistan</span>
          </div>
        </div>
      </section>
    </div>
  );
}