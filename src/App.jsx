import { useState, useEffect } from "react";
import { FileDown, ExternalLink, ChevronRight, Copy, Check } from "lucide-react";

import { GithubIcon, LinkedinIcon } from "./icons.jsx";
import { TOTAL, PROJS, SKILL_GROUPS, STATS } from "./data";
import { useInView, fadeUp, renderCode } from "./hooks";
import { PhoneMock } from "./PhoneMock";
import { CaseStudyModal } from "./CaseStudyModal";

/* ════════════════════════════════════════════════════════════════════════ */
export default function App() {
  const [scrolled, setScrolled]         = useState(false);
  const [menuOpen, setMenuOpen]         = useState(false);
  const [cnt,      setCnt]              = useState(0);
  const [sv,       setSv]               = useState({ y:0, p:0, f:0, a:0 });
  const [activeProj, setActiveProj]     = useState(null); // case study modal
  const [copied, setCopied]             = useState(false);

  const [aRef, aSeen] = useInView();
  const [pRef, pSeen] = useInView();
  const [sRef, sSeen] = useInView();
  const [cRef, cSeen] = useInView();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  useEffect(() => { if (scrolled) setMenuOpen(false); }, [scrolled]);

  useEffect(() => {
    const t = setTimeout(() => {
      let cur = 0;
      const iv = setInterval(() => { cur = Math.min(cur+3,TOTAL); setCnt(cur); if(cur>=TOTAL) clearInterval(iv); }, 18);
    }, 600);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!aSeen) return;
    const tgt = { y:2, p:5, f:50, a:20 }, dur = 1800, start = Date.now();
    const iv = setInterval(() => {
      const p = Math.min((Date.now()-start)/dur,1), e = 1-Math.pow(1-p,3);
      setSv({ y:Math.round(e*tgt.y), p:Math.round(e*tgt.p), f:Math.round(e*tgt.f), a:Math.round(e*tgt.a) });
      if (p >= 1) clearInterval(iv);
    }, 16);
    return () => clearInterval(iv);
  }, [aSeen]);

  const go = (id) => { document.getElementById(id)?.scrollIntoView({ behavior:"smooth" }); setMenuOpen(false); };
  const sm = { y:sv.y, p:sv.p, f:sv.f, a:sv.a };
  const NAV = ["Work","About","Skills","Contact"];

  const copyEmail = () => {
    navigator.clipboard?.writeText("ayeshakamran053@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // ── render ──
  return (
    <div style={{ background:"#1E1E1C", color:"#F1EFE8", fontFamily:"'Space Grotesk',sans-serif", overflowX:"hidden" }}>

      {/* GLOBAL CSS */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
        *,*::before,*::after{margin:0;padding:0;box-sizing:border-box}
        html{scroll-behavior:smooth}
        :root{--px:72px;--py:120px;--nav-h:64px;--gcols:2;--scols:4}
        @media(max-width:900px){:root{--px:28px;--py:80px;--nav-h:56px;--gcols:1;--scols:2}}
        @media(max-width:480px){:root{--px:20px;--py:56px;--nav-h:52px;--scols:1}}

        @keyframes fadeUp{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:translateY(0)}}
        @keyframes slideR{from{opacity:0;transform:translateX(48px)}to{opacity:1;transform:translateX(0)}}
        @keyframes drawLine{from{height:0;opacity:0}to{height:100px;opacity:1}}
        @keyframes blink{0%,49%{opacity:1}50%,100%{opacity:0}}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
        @keyframes glowP{0%,100%{opacity:.08;transform:scale(1)}50%{opacity:.16;transform:scale(1.06)}}
        @keyframes dotP{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.55;transform:scale(1.4)}}
        @keyframes scrollF{0%{transform:scaleY(0);transform-origin:top;opacity:1}80%{transform:scaleY(1);transform-origin:top;opacity:1}100%{transform:scaleY(1);opacity:0}}
        @keyframes menuSlide{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:translateY(0)}}
        @keyframes slideUpModal{from{opacity:0;transform:translateY(60px)}to{opacity:1;transform:translateY(0)}}
        @media(prefers-reduced-motion:reduce){*,*::before,*::after{animation-duration:.001ms!important;transition-duration:.001ms!important}}

        .sec{padding:var(--py) var(--px)}
        .hero{min-height:100vh;display:flex;align-items:center;padding:calc(var(--nav-h) + 48px) var(--px) var(--py);position:relative;overflow:hidden;background:#1E1E1C}
        .inner{max-width:1280px;margin:0 auto;width:100%}
        .nav{position:sticky;top:0;z-index:200;height:var(--nav-h);display:flex;align-items:center;justify-content:space-between;padding:0 var(--px);transition:background .3s,backdrop-filter .3s,border-color .3s}
        .nav.scrolled{background:rgba(28,28,26,.92);backdrop-filter:blur(14px);border-bottom:0.5px solid rgba(255,255,255,.06)}
        .nav-logo{color:#5DCAA5;font-size:21px;font-weight:700;letter-spacing:-.02em;cursor:pointer;background:none;border:none;font-family:inherit}
        .nav-links{display:flex;align-items:center;gap:32px}
        .nlink{color:#888780;font-size:14px;font-weight:500;letter-spacing:.03em;cursor:pointer;background:none;border:none;font-family:inherit;transition:color .2s;padding:4px 0}
        .nlink:hover{color:#5DCAA5}
        .hamburger{display:none;flex-direction:column;gap:5px;cursor:pointer;background:none;border:none;padding:4px}
        .hamburger span{display:block;width:22px;height:2px;background:#888780;border-radius:2px;transition:transform .25s,opacity .25s}
        .hamburger.open span:nth-child(1){transform:translateY(7px) rotate(45deg)}
        .hamburger.open span:nth-child(2){opacity:0}
        .hamburger.open span:nth-child(3){transform:translateY(-7px) rotate(-45deg)}
        .mobile-menu{position:fixed;top:var(--nav-h);left:0;right:0;z-index:199;background:rgba(28,28,26,.97);backdrop-filter:blur(18px);border-bottom:0.5px solid rgba(255,255,255,.07);display:flex;flex-direction:column;padding:16px var(--px) 24px;animation:menuSlide .22s ease}
        .mobile-menu .nlink{font-size:18px;padding:14px 0;border-bottom:1px solid rgba(255,255,255,.06)}
        .mobile-menu .nlink:last-child{border-bottom:none}
        .mobile-social{display:none;align-items:center;gap:16px;padding:20px 0 8px;border-top:1px solid rgba(255,255,255,.06);margin-top:8px}
        @media(max-width:900px){.nav-links{display:none}.hamburger{display:flex}.mobile-social{display:flex}}
        .hero-row{display:flex;align-items:center;gap:56px}
        .about-row{display:flex;gap:80px;align-items:flex-start}
        .about-stats{flex:0 0 480px;display:grid;grid-template-columns:1fr 1fr;gap:16px}
        .pj-grid{display:grid;grid-template-columns:repeat(var(--gcols),1fr);gap:22px}
        .sk-grid{display:grid;grid-template-columns:repeat(var(--scols),1fr);gap:18px}
        .cta-row{display:flex;gap:14px;flex-wrap:wrap}
        @media(max-width:900px){.hero-row,.about-row{flex-direction:column;gap:40px}.about-stats{flex:1 1 auto;width:100%}}
        @media(max-width:480px){.cta-row{flex-direction:column}.cta-row .btn-c,.cta-row .btn-g{width:100%;justify-content:center;text-align:center}}
        .btn-c{background:#D85A30;color:#F1EFE8;border:none;padding:14px 30px;border-radius:9px;cursor:pointer;font-family:inherit;font-size:15px;font-weight:600;transition:transform .2s,box-shadow .25s;display:inline-flex;align-items:center;gap:8px}
        .btn-c:hover{transform:translateY(-3px);box-shadow:0 10px 30px rgba(216,90,48,.42)}
        .btn-g{background:transparent;color:#5DCAA5;border:1.5px solid rgba(93,202,165,.38);padding:14px 30px;border-radius:9px;cursor:pointer;font-family:inherit;font-size:15px;font-weight:500;transition:border-color .2s,background .2s,box-shadow .2s;display:inline-flex;align-items:center;gap:8px}
        .btn-g:hover{border-color:#5DCAA5;background:rgba(93,202,165,.07);box-shadow:0 0 22px rgba(93,202,165,.18)}
        .icon-btn{background:rgba(255,255,255,.06);border:none;border-radius:8px;width:36px;height:36px;display:flex;align-items:center;justify-content:center;cursor:pointer;color:#888780;transition:background .2s,color .2s;text-decoration:none}
        .icon-btn:hover{background:rgba(255,255,255,.12);color:#F1EFE8}
        .resume-btn{display:flex;align-items:center;gap:6px;background:rgba(93,202,165,.1);border:1px solid rgba(93,202,165,.3);border-radius:8px;padding:7px 14px;font-size:13px;font-weight:600;color:#5DCAA5;cursor:pointer;font-family:inherit;transition:background .2s,box-shadow .2s;text-decoration:none}
        .resume-btn:hover{background:rgba(93,202,165,.16);box-shadow:0 0 16px rgba(93,202,165,.2)}
        .proj-card{background:#3A3A37;border-radius:16px;overflow:hidden;transition:transform .35s cubic-bezier(.16,1,.3,1),box-shadow .35s}
        .proj-card:hover{transform:translateY(-7px);box-shadow:0 24px 54px rgba(0,0,0,.45)}
        .sk-col{background:#3A3A37;border-radius:12px;padding:22px 20px;transition:transform .2s,box-shadow .2s}
        .sk-col:hover{transform:translateY(-4px);box-shadow:0 12px 32px rgba(0,0,0,.3)}
        .case-btn{font-size:14px;font-weight:600;letter-spacing:.04em;display:inline-flex;align-items:center;gap:6px;border:none;background:none;cursor:pointer;font-family:inherit;padding:0;transition:gap .2s}
        .case-btn:hover{gap:12px}
        .sk-item{display:flex;align-items:flex-start;gap:9px;padding:9px 0;border-bottom:1px solid rgba(255,255,255,.05)}
        .sk-item:last-child{border-bottom:none;padding-bottom:0}
        .eyebrow{font-size:11px;font-weight:600;letter-spacing:.2em;text-transform:uppercase;color:#5DCAA5}
        .tag{background:#444441;color:#888780;font-size:11px;font-weight:500;padding:4px 10px;border-radius:6px}
        .nomob{display:block}
        @media(max-width:900px){.nomob{display:none!important}}
        @media(max-width:600px){.cs-grid-2{grid-template-columns:1fr!important}}
      `}</style>

      {/* CASE STUDY MODAL */}
      {activeProj && <CaseStudyModal project={activeProj} onClose={() => setActiveProj(null)} />}

      {/* NAV */}
      <nav className={`nav${scrolled?" scrolled":""}`}>
        <button className="nav-logo" onClick={() => go("hero")}>AK.</button>

        <div className="nav-links">
          {NAV.map(l => <button key={l} className="nlink" onClick={() => go(l.toLowerCase())}>{l}</button>)}
          <div style={{ width:1, height:18, background:"rgba(255,255,255,.1)", margin:"0 4px" }} />
          <a href="https://github.com/ayeshakamran543" target="_blank" rel="noreferrer" className="icon-btn" aria-label="GitHub"><GithubIcon size={16} /></a>
          <a href="https://www.linkedin.com/in/ayesha-kamran-b2b570247/" target="_blank" rel="noreferrer" className="icon-btn" aria-label="LinkedIn"><LinkedinIcon size={16} /></a>
          <a href="/resume.pdf" download="Ayesha_Kamran_Resume.pdf" className="resume-btn"><FileDown size={14} /> Resume</a>
        </div>

        <button className={`hamburger${menuOpen?" open":""}`} onClick={() => setMenuOpen(v=>!v)} aria-label="Menu">
          <span /><span /><span />
        </button>
      </nav>

      {menuOpen && (
        <div className="mobile-menu">
          {NAV.map(l => <button key={l} className="nlink" onClick={() => go(l.toLowerCase())}>{l}</button>)}
          <div className="mobile-social">
            <a href="https://github.com/ayeshakamran543" target="_blank" rel="noreferrer" className="icon-btn"><GithubIcon size={18} /></a>
            <a href="https://www.linkedin.com/in/ayesha-kamran-b2b570247/" target="_blank" rel="noreferrer" className="icon-btn"><LinkedinIcon size={18} /></a>
            <a href="/resume.pdf" download="Ayesha_Kamran_Resume.pdf" className="resume-btn"><FileDown size={14} /> Resume</a>
          </div>
        </div>
      )}

      {/* HERO */}
      <section id="hero" className="hero">
        <div style={{ position:"absolute",top:-220,right:-80,width:560,height:560,borderRadius:"50%",background:"radial-gradient(circle,rgba(29,158,117,.14) 0%,transparent 65%)",animation:"glowP 7s ease-in-out infinite",pointerEvents:"none" }} />
        <div style={{ position:"absolute",bottom:-60,left:-60,width:320,height:320,borderRadius:"50%",background:"radial-gradient(circle,rgba(216,90,48,.1) 0%,transparent 65%)",animation:"glowP 9s ease-in-out infinite 3s",pointerEvents:"none" }} />
        <div className="inner">
          <div className="hero-row">
            <div style={{ flex:1, minWidth:0 }}>
              <div style={{ width:3,borderRadius:2,background:"linear-gradient(to bottom,#5DCAA5,rgba(93,202,165,.15))",marginBottom:20,animation:"drawLine .7s cubic-bezier(.16,1,.3,1) .3s both" }} />
              <p className="eyebrow" style={{ marginBottom:18, animation:"fadeUp .6s ease .6s both" }}>Flutter Developer · Team Lead @ Splenify</p>
              <h1 style={{ fontSize:"clamp(46px,7vw,90px)",fontWeight:700,lineHeight:1.0,letterSpacing:"-.025em",animation:"fadeUp .7s cubic-bezier(.16,1,.3,1) .8s both" }}>
                Hi, I'm<br />
                <span style={{ position:"relative",display:"inline-block" }}>
                  Ayesha.
                  <span style={{ position:"absolute",left:0,bottom:-4,height:4,width:"100%",borderRadius:2,background:"#5DCAA5",display:"block",animation:"fadeUp .4s ease 1.3s both" }} />
                </span>
              </h1>
              <p style={{ fontSize:"clamp(17px,2.5vw,21px)",fontWeight:400,lineHeight:1.65,color:"#D3D1C7",maxWidth:460,marginTop:30,marginBottom:44,animation:"fadeUp .7s ease 1s both" }}>
                I build beautiful Flutter apps<br />that people love to open.
              </p>
              <div className="cta-row" style={{ animation:"fadeUp .6s ease 1.15s both" }}>
                <button className="btn-c" onClick={() => go("work")}>View my work</button>
                <button className="btn-g" onClick={() => go("contact")}>Get in touch</button>
              </div>
            </div>
            <div className="nomob" style={{ flex:"0 0 450px",animation:"slideR .9s cubic-bezier(.16,1,.3,1) 1s both" }}>
              <div style={{ animation:"float 6s ease-in-out 2.2s infinite" }}>
                <div style={{ background:"#3A3A37",borderRadius:16,overflow:"hidden",boxShadow:"0 28px 64px rgba(0,0,0,.55),0 0 0 1px rgba(255,255,255,.05)" }}>
                  <div style={{ background:"#2C2C2A",padding:"11px 16px",display:"flex",alignItems:"center",gap:6 }}>
                    {["#FF5F57","#FEBC2E","#28C840"].map(c => <div key={c} style={{ width:11,height:11,borderRadius:"50%",background:c,opacity:.9 }} />)}
                    <span style={{ marginLeft:10,fontSize:11,color:"#888780",fontFamily:"'JetBrains Mono',monospace" }}>portfolio.dart</span>
                  </div>
                  <pre style={{ padding:"18px 22px 24px",fontFamily:"'JetBrains Mono',monospace",fontSize:12.5,lineHeight:1.85,minHeight:280,overflow:"hidden" }}>
                    {renderCode(cnt)}
                    {cnt<TOTAL && <span style={{ color:"#5DCAA5",animation:"blink .75s step-end infinite" }}>█</span>}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style={{ position:"absolute",bottom:28,left:"50%",transform:"translateX(-50%)",display:"flex",flexDirection:"column",alignItems:"center",gap:8,animation:"fadeUp .5s ease 2s both" }}>
          <span style={{ fontSize:10,letterSpacing:".18em",color:"#888780" }}>SCROLL</span>
          <div style={{ width:1.5,height:30,background:"linear-gradient(to bottom,#5DCAA5,transparent)",borderRadius:1,animation:"scrollF 1.8s ease-in-out 2.5s infinite" }} />
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="sec" ref={aRef} style={{ background:"#2C2C2A" }}>
        <div className="inner">
          <div className="about-row">
            <div style={{ flex:1 }}>
              <p className="eyebrow" style={{ marginBottom:14,...fadeUp(aSeen,0) }}>About me</p>
              <div style={{ width:40,height:2.5,background:"#5DCAA5",borderRadius:2,marginBottom:26,opacity:aSeen?1:0,transition:"opacity .5s ease .15s" }} />
              <h2 style={{ fontSize:"clamp(30px,4.5vw,56px)",fontWeight:700,lineHeight:1.1,letterSpacing:"-.025em",marginBottom:28,...fadeUp(aSeen,.15) }}>Building apps<br />people love.</h2>
              <p style={{ fontSize:"clamp(15px,1.8vw,17px)",lineHeight:1.8,color:"#D3D1C7",marginBottom:20,...fadeUp(aSeen,.3) }}>
                I'm a Flutter Developer & Team Lead with 2+ years of experience crafting mobile experiences that are fast, beautiful, and purposeful. At Splenify, I turn design specs into polished, production-ready UI, mentor junior developers, and take features from concept to launch across a growing portfolio of apps.
              </p>
              <p style={{ fontSize:"clamp(15px,1.8vw,17px)",lineHeight:1.8,color:"#D3D1C7",marginBottom:40,...fadeUp(aSeen,.42) }}>
                Currently building FanHub and MogWars — two major apps from the ground up.
              </p>
              <div style={{ display:"inline-flex",alignItems:"center",gap:10,padding:"10px 18px",borderRadius:24,background:"rgba(15,110,86,.2)",border:"1px solid rgba(93,202,165,.3)",...fadeUp(aSeen,.55) }}>
                <div style={{ width:8,height:8,borderRadius:"50%",background:"#5DCAA5",animation:"dotP 2s ease-in-out infinite" }} />
                <span style={{ fontSize:13,fontWeight:500,color:"#5DCAA5" }}>Currently: Splenify</span>
              </div>
            </div>
            <div className="about-stats" style={{ ...fadeUp(aSeen,.3) }}>
              {STATS.map(({ k,s,l }) => (
                <div key={k} style={{ background:"#3A3A37",borderRadius:14,padding:"26px 22px",borderTop:"3px solid #5DCAA5",boxShadow:"0 8px 24px rgba(0,0,0,.2)" }}>
                  <div style={{ fontSize:"clamp(40px,5vw,54px)",fontWeight:700,color:"#5DCAA5",lineHeight:1,letterSpacing:"-.02em" }}>{sm[k]}{s}</div>
                  <div style={{ fontSize:13,color:"#888780",marginTop:12,lineHeight:1.4 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="work" className="sec" ref={pRef} style={{ background:"#1E1E1C" }}>
        <div className="inner">
          <p className="eyebrow" style={{ marginBottom:14,opacity:pSeen?1:0,transition:"opacity .5s ease" }}>Selected work</p>
          <h2 style={{ fontSize:"clamp(30px,4.5vw,56px)",fontWeight:700,letterSpacing:"-.025em",lineHeight:1.1,marginBottom:56,...fadeUp(pSeen,.1) }}>Projects that shipped.</h2>
          <div className="pj-grid">
            {PROJS.map((p, i) => (
              <div key={p.name} className="proj-card" style={{ opacity:pSeen?1:0,transform:pSeen?"none":"translateY(44px)",transition:`opacity .75s ease ${.15+(i%2)*.12+Math.floor(i/2)*.2}s,transform .75s cubic-bezier(.16,1,.3,1) ${.15+(i%2)*.12+Math.floor(i/2)*.2}s` }}>
                <div style={{ height:4,background:p.accent }} />
                <div style={{ height:230,background:"#2C2C2A",display:"flex",alignItems:"center",justifyContent:"center",position:"relative" }}>
                  <span style={{ position:"absolute",top:13,right:16,fontSize:11,color:"#888780",letterSpacing:".05em",fontFamily:"'JetBrains Mono',monospace" }}>{p.year}</span>
                  <PhoneMock accent={p.accent} type={p.type} />
                </div>
                <div style={{ padding:"22px 26px 28px" }}>
                  <div style={{ display:"flex",flexWrap:"wrap",gap:5,marginBottom:14 }}>
                    {p.tags.map(t => <span key={t} className="tag">{t}</span>)}
                  </div>
                  <h3 style={{ fontSize:"clamp(26px,3.5vw,34px)",fontWeight:700,letterSpacing:"-.02em",marginBottom:10,lineHeight:1.1 }}>{p.name}</h3>
                  <p style={{ fontSize:14,lineHeight:1.75,color:"#D3D1C7",marginBottom:22 }}>{p.desc}</p>
                  <button className="case-btn" style={{ color:p.accent }} onClick={() => setActiveProj(p)}>
                    View case study <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="sec" ref={sRef} style={{ background:"#2C2C2A" }}>
        <div className="inner">
          <p className="eyebrow" style={{ marginBottom:14,opacity:sSeen?1:0,transition:"opacity .5s ease" }}>Tech stack</p>
          <h2 style={{ fontSize:"clamp(30px,4.5vw,56px)",fontWeight:700,letterSpacing:"-.025em",lineHeight:1.1,marginBottom:12,...fadeUp(sSeen,.1) }}>What I build with.</h2>
          <p style={{ fontSize:16,color:"#888780",marginBottom:52,...fadeUp(sSeen,.2) }}>Skills that ship production apps — not tutorials.</p>
          <div className="sk-grid">
            {SKILL_GROUPS.map((grp, gi) => (
              <div key={grp.cat} className="sk-col" style={{ ...fadeUp(sSeen, gi*.1) }}>
                <p style={{ fontSize:10,fontWeight:700,letterSpacing:".2em",color:grp.accent,marginBottom:10,textTransform:"uppercase" }}>{grp.cat}</p>
                <div style={{ height:2,background:grp.accent,borderRadius:1,marginBottom:18,opacity:.4 }} />
                {grp.skills.map(sk => (
                  <div key={sk.n} className="sk-item">
                    <div style={{ width:6,height:6,borderRadius:"50%",background:grp.accent,flexShrink:0,opacity:.85,marginTop:5 }} />
                    <div>
                      <p style={{ fontSize:13,fontWeight:600,color:"#F1EFE8",lineHeight:1.2 }}>{sk.n}</p>
                      <p style={{ fontSize:11,color:"#888780",marginTop:3 }}>{sk.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="sec" ref={cRef} style={{ background:"#1E1E1C",paddingBottom:"calc(var(--py) + 20px)",position:"relative",overflow:"hidden" }}>
        <div style={{ position:"absolute",top:-160,right:-100,width:500,height:500,borderRadius:"50%",background:"radial-gradient(circle,rgba(29,158,117,.08) 0%,transparent 65%)",pointerEvents:"none" }} />
        <div style={{ position:"absolute",bottom:-80,left:-80,width:340,height:340,borderRadius:"50%",background:"radial-gradient(circle,rgba(216,90,48,.07) 0%,transparent 65%)",pointerEvents:"none" }} />
        <div className="inner" style={{ position:"relative" }}>
          <h2 style={{ fontSize:"clamp(36px,6.5vw,78px)",fontWeight:700,lineHeight:1.05,letterSpacing:"-.03em",marginBottom:24,...fadeUp(cSeen,0) }}>
            Let's build something<br /><span style={{ color:"#5DCAA5" }}>together.</span>
          </h2>
          <p style={{ fontSize:"clamp(15px,1.8vw,18px)",lineHeight:1.75,color:"#D3D1C7",maxWidth:520,marginBottom:48,...fadeUp(cSeen,.2) }}>
            Open to Flutter roles, freelance projects, and international opportunities.
          </p>

          <div className="cta-row" style={{ ...fadeUp(cSeen,.35) }}>
            <button className="btn-c" onClick={() => window.open("mailto:ayeshakamran053@gmail.com")}>
              <ExternalLink size={15} /> Say hello
            </button>
            <button className="btn-g" onClick={copyEmail}>
              {copied ? <Check size={15} /> : <Copy size={15} />}
              {copied ? "Copied!" : "ayeshakamran053@gmail.com"}
            </button>
            <a href="/resume.pdf" download="Ayesha_Kamran_Resume.pdf" className="btn-g" style={{ textDecoration:"none" }}>
              <FileDown size={15} /> Download resume
            </a>
          </div>

          {/* Social row */}
          <div style={{ display:"flex",gap:12,marginTop:28,...fadeUp(cSeen,.45) }}>
            <a href="https://github.com/ayeshakamran543" target="_blank" rel="noreferrer"
              style={{ display:"flex",alignItems:"center",gap:8,color:"#888780",textDecoration:"none",fontSize:13,fontWeight:500,transition:"color .2s" }}
              onMouseEnter={e=>e.currentTarget.style.color="#F1EFE8"}
              onMouseLeave={e=>e.currentTarget.style.color="#888780"}>
              <GithubIcon size={16} /> github.com/ayeshakamran543
            </a>
            <span style={{ color:"rgba(255,255,255,.15)" }}>·</span>
            <a href="https://www.linkedin.com/in/ayesha-kamran-b2b570247/" target="_blank" rel="noreferrer"
              style={{ display:"flex",alignItems:"center",gap:8,color:"#888780",textDecoration:"none",fontSize:13,fontWeight:500,transition:"color .2s" }}
              onMouseEnter={e=>e.currentTarget.style.color="#F1EFE8"}
              onMouseLeave={e=>e.currentTarget.style.color="#888780"}>
              <LinkedinIcon size={16} /> linkedin.com/in/ayeshakamran
            </a>
          </div>

          {/* Footer */}
          <div style={{ marginTop:80,paddingTop:26,borderTop:"1px solid rgba(255,255,255,.07)",display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:10,color:"#888780",fontSize:13,opacity:cSeen?1:0,transition:"opacity .6s ease .6s" }}>
            <span>Ayesha Kamran — Flutter Developer & Team Lead</span>
            <span>Rawalpindi, Pakistan · 2025</span>
          </div>
        </div>
      </section>
    </div>
  );
}