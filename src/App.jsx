import { useState, useEffect, useRef } from "react";
import {
  FileDown, X, ExternalLink,
  Smartphone, Code2, Play, ChevronRight, Copy, Check
} from "lucide-react";

const GithubIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0 }}>
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);

const LinkedinIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0 }}>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

/* ── TYPED CODE ─────────────────────────────────────────────────────────── */
const CODE = [
  { t: "class ", c: "#5DCAA5" }, { t: "AyeshaPortfolio", c: "#F1EFE8" }, { t: " {\n", c: "#D3D1C7" },
  { t: "  role", c: "#F0997B" }, { t: " = ", c: "#D3D1C7" }, { t: '"Flutter Lead"\n', c: "#5DCAA5" },
  { t: "  skills", c: "#F0997B" }, { t: " = [\n", c: "#D3D1C7" },
  { t: '    "Flutter"', c: "#5DCAA5" }, { t: ", ", c: "#D3D1C7" }, { t: '"Clean Architecture"', c: "#5DCAA5" }, { t: ",\n", c: "#D3D1C7" },
  { t: '    "Riverpod"', c: "#5DCAA5" }, { t: ", ", c: "#D3D1C7" }, { t: '"BLoC"', c: "#5DCAA5" }, { t: "\n", c: "#D3D1C7" },
  { t: "  ]\n\n", c: "#D3D1C7" },
  { t: "  build", c: "#F0997B" }, { t: "() {\n    return ", c: "#D3D1C7" },
  { t: "greatApps()", c: "#F1EFE8" }, { t: " ", c: "#D3D1C7" }, { t: "// always\n  }\n", c: "#888780" },
  { t: "}", c: "#D3D1C7" },
];
const TOTAL = CODE.reduce((s, x) => s + x.t.length, 0);

/* ── CASE STUDY DATA ────────────────────────────────────────────────────── */
const CASE_STUDIES = {
  FanHub: {
    subtitle: "Sports fan engagement platform",
    client: "Dime Droppers LLC", duration: "6 months", role: "Lead Flutter Developer",
    overview: "FanHub keeps sports fans connected to their favourite teams and athletes between matches. I was the sole Flutter developer responsible for building the entire frontend from scratch — from design token system to App Store submission.",
    challenge: "The Predictions feature demanded a fully custom animated slider matching a highly specific design — no off-the-shelf widget came close. Managing complex state across 10+ nested screens with live match data also created serious performance bottlenecks.",
    solution: "Built a custom GestureDetector-based slider with AnimationController for smooth physics. Introduced a part-of file architecture to split 2000+ line screens into manageable files. Used granular ChangeNotifier scoping to eliminate unnecessary rebuilds across the feed.",
    features: ["Custom animated prediction slider built from scratch","Real-time match data with live score updates","Donation flow with payment gateway integration","Partner offers catalog with deep linking","Impact Wall social feed with infinite scroll","Engage Live — real-time chat and reactions","Home screen ranking cards","Push notifications via Firebase Messaging"],
    tech: { "State Management":"Provider + ChangeNotifier", "Networking":"Dio + REST APIs", "UI Toolkit":"flutter_screenutil", "Design System":"Custom AppTheme + AppText tokens", "Architecture":"Part-of file splitting", "Notifications":"Firebase Cloud Messaging" },
    links: { store: "#", github: null, apk: null, video: "#" },
    note: "Client project — source code is proprietary. Full walkthrough available on request.",
  },
  MogWars: {
    subtitle: "Live-streaming gaming arena",
    client: "Dime Droppers LLC", duration: "5 months", role: "Lead Flutter Developer",
    overview: "MogWars is a live-streaming gaming app where streamers compete in 'Mog Off' battles while viewers react and vote in real-time. I designed and built the complete Flutter frontend across three distinct user roles.",
    challenge: "Building a single app that felt completely different for streamers, viewers, and spectators — each with separate UI logic — while keeping reaction latency under 200ms and maintaining a clean, testable codebase.",
    solution: "Separate widget trees per role, mounted conditionally. Firebase Realtime Database for low-latency reactions. BLoC pattern cleanly separated streaming business logic from UI, making each role independently testable without touching the others.",
    features: ["Streamer broadcast control UI","Mog Off live battle mode","Real-time viewer reactions (emoji, hearts, votes)","Live chat with moderation tools","Analytics dashboard for streamers","Referral engine with tracking","Full onboarding flow with animated steps","Go Live UI with connection status"],
    tech: { "State Management":"BLoC + Cubit", "Real-time":"Firebase Realtime Database", "Auth":"Firebase Auth", "Networking":"Dio + REST APIs", "Architecture":"BLoC + repository pattern", "Notifications":"FCM" },
    links: { store: "#", github: null, apk: null, video: "#" },
    note: "Client project — source code is proprietary. Full walkthrough available on request.",
  },
  MoRoute: {
    subtitle: "Safety-first navigation & emergency response",
    client: "Splenify", duration: "2025", role: "Flutter Developer",
    overview: "MoRoute is a safety-first navigation and emergency-response app built to help people move with more confidence — whether commuting, travelling across town, or driving unfamiliar roads. It combines road-aware navigation, live incident reporting, trip sharing with trusted contacts, one-tap emergency SOS, and a directory of verified nearby service providers in one experience.",
    challenge: "Time-critical features like Emergency SOS and live trip sharing need to stay reliable even on weak connectivity or low battery, while the live road-incident feed and the verified service-provider directory (mechanics, tow trucks, roadside assistance, fuel, hotels, ambulance) need to stay fresh without draining the device. Layering in-app chat and calling with providers, plus a provider verification flow, on top of that added real architectural complexity.",
    solution: "Background location tracking scales its update frequency to the current trip state, paired with a low-latency layer for SOS broadcasts and Trusted Group notifications so alerts land within seconds. Road-incident and provider data are cached and refreshed incrementally to keep the feed current without hammering the network, and provider chat/calling is surfaced directly in-app to keep the emergency-to-help path as short as possible.",
    features: ["Safety-focused route guidance with road-incident awareness", "Live Road Feed of recent incidents and updates nearby", "Trip Monitoring shared live with Trusted Groups", "One-tap Emergency SOS with location sharing", "Verified nearby service providers — mechanics, tow, roadside assistance, fuel, hotels, ambulance, insurance", "In-app chat & calling with service providers", "Provider verification flow for trust & safety"],
    tech: { "Framework": "Flutter", "Category": "Maps & Navigation" },
    links: { store: "https://play.google.com/store/apps/details?id=com.splenify.moroute", github: null, apk: null, video: null },
    note: "Live on Google Play, built at Splenify. Feature set is from the public listing — challenge/solution are drafted from that and should be refined with real implementation details.",
  },
  "My Chain Fitness": {
    subtitle: "Discipline & habit-streak fitness tracker",
    client: "Splenify", duration: "2025", role: "Flutter Developer",
    overview: "My Chain Fitness turns workout consistency into a game: every completed session adds a link to your \"Chain,\" and the core loop is built entirely around never letting it break. On top of the streak system it offers fast workout logging, a distraction-free Lock-In Mode, AI-generated training plans, and social competition with friends.",
    challenge: "The whole app is built around a single motivational hook — don't break the chain — so any friction anywhere in the core loop (logging a set, starting a session, getting a new routine) directly undermines the habit it's designed to build. Layering in AI-generated workout plans and a friends leaderboard on top of that loop, without slowing it down, was the central design constraint.",
    solution: "Workout logging was pared down to a minimal number of taps per set, with the chain visual updating immediately on completion so the reward loop feels instant. AI-generated routines are grouped and cached by category (upper/lower body, core, full body, cardio, flexibility) so recommendations load without a visible wait, and Lock-In Mode strips the UI down during active sessions to remove distractions. Friend chains and leaderboards sync in the background so social features never block the core logging flow.",
    features: ["\"The Chain\" streak system with visual progress", "Fast workout logging — sets, reps, and weight", "Lock-In Mode for distraction-free training sessions", "AI-generated workout plans (upper/lower body, core, full body, cardio, flexibility)", "Friend leaderboard — compete on chain length", "Social connectivity to stay motivated together"],
    tech: { "Framework": "Flutter", "Category": "Health & Fitness" },
    links: { store: "https://play.google.com/store/apps/details?id=com.splenify.chainfitness", github: null, apk: null, video: null },
    note: "Live on Google Play, built at Splenify. Feature set is from the public listing — challenge/solution are drafted from that and should be refined with real implementation details.",
  },
  Nureo: {
    subtitle: "All-in-one nutrition & wellness companion",
    client: "Splenify", duration: "2025", role: "Flutter Developer",
    overview: "Nureo is an all-in-one nutrition and wellness companion that helps everyday users build healthier habits through guided tracking, expert support, and educational content — while giving nutrition professionals and organisations the tools to manage bookings, courses, and payments inside the very same app.",
    challenge: "Nureo has to serve two very different audiences from one codebase: everyday users tracking meals, check-ins, and habits, and practitioners managing their profile, availability, course content, and payments. Keeping onboarding, navigation, and profile management coherent across both roles — while supporting real-time booking/session workflows and secure payments — required careful role-based architecture rather than two separate apps bolted together.",
    solution: "A dual-profile system lets a single account hold both a personal and a professional profile, with role-aware navigation and dashboards for each. Booking and session management run through a shared availability/calendar layer that powers both one-off consultations and course enrolment, and practitioner-only flows (course publishing, payment setup) sit behind a dedicated professional onboarding path so the everyday user experience stays uncluttered.",
    features: ["Personalised onboarding & wellness goal setting", "Meal, check-in, and habit tracking with progress insights", "Nutrition insights & food analysis tools", "Book sessions & consultations with nutrition professionals", "Courses & learning modules for wellness education", "In-app messaging & notifications", "Practitioner tools — profile, course publishing, bookings, and payment setup"],
    tech: { "Framework": "Flutter", "Category": "Lifestyle" },
    links: { store: "https://play.google.com/store/apps/details?id=com.splenify.nureo", github: null, apk: null, video: null },
    note: "Live on Google Play, built at Splenify. Feature set is from the public listing — challenge/solution are drafted from that and should be refined with real implementation details.",
  },
  Paycific: {
    subtitle: "Multi-currency digital wallet",
    client: "Personal project", duration: "3 months", role: "Solo Flutter Developer",
    overview: "Paycific is a concept fintech app exploring how a clean, fast digital wallet experience could be built in Flutter — multi-currency support, biometric auth, and animated financial data visualisation all in one.",
    challenge: "Stripe's Flutter SDK had poor documentation for multi-currency flows at the time. Building a smooth, animated spending breakdown chart that felt native (not WebView) was also non-trivial.",
    solution: "Implemented a custom CustomPainter-based bar chart with interpolated animation on data load. Used flutter_stripe with manual intent creation on a Node.js test backend. BLoC handled all transaction state with error recovery baked in.",
    features: ["12-currency wallet with live exchange rates","CustomPainter animated spending chart","Biometric auth (Face ID / Fingerprint)","Transaction history with category filters","Send / receive with QR code scan","Stripe integration for card top-ups","Offline mode with Isar local cache","Dark-mode-only design system"],
    tech: { "State Management":"BLoC + Cubit", "Payments":"Stripe Flutter SDK", "Charts":"Custom Painter", "Auth":"local_auth (biometrics)", "Local Storage":"Isar DB", "Networking":"Dio + REST APIs" },
    links: { store: null, github: "https://github.com/ayeshakamran543", apk: "#", video: "#" },
    note: "Open-source demo. Backend uses Stripe test mode — no real charges.",
  },
  Pulse: {
    subtitle: "AI-adaptive health & fitness tracker",
    client: "Personal project", duration: "2 months", role: "Solo Flutter Developer",
    overview: "Pulse is a health tracking concept with deeply custom UI — ring-based progress visualisation drawn with Canvas API, Apple Health & Google Fit integration, and a streak reward system complete with Lottie celebration animations.",
    challenge: "Apple HealthKit and Google Health Connect have completely different APIs. Abstracting them into a single clean data layer without leaking platform specifics into the UI layer took significant architectural work.",
    solution: "Built a HealthRepository interface with platform-specific implementations behind it — the UI never knows which platform it's on. Custom Painter rings update with a spring-curve animation on every data refresh.",
    features: ["Custom Painter progress rings (spring animation)","Apple Health & Google Fit integration","Adaptive workout recommendations","Streak system with Lottie celebrations","Heart rate zone tracking","Sleep quality visualisation","Wearable device data sync","Weekly summary with shareable card"],
    tech: { "State Management":"Riverpod", "Charts":"Custom Painter + Canvas API", "Health Data":"health package (HealthKit + Health Connect)", "Animation":"Lottie + AnimationController", "Architecture":"Repository pattern", "Local Storage":"Hive" },
    links: { store: null, github: "https://github.com/ayeshakamran543", apk: "#", video: "#" },
    note: "Open-source demo. Health data stays on-device — no server sync in demo.",
  },
  Threadly: {
    subtitle: "Social commerce — creators meet shopping",
    client: "Personal project", duration: "2 months", role: "Solo Flutter Developer",
    overview: "Threadly is a social commerce concept where style creators curate shoppable lookbooks. Users follow creators, save outfits, and complete in-app checkout — all powered by a custom scroll-driven animation engine.",
    challenge: "Achieving the signature 'parallax product card' scroll effect in Flutter — where product images move at a different rate from the card background — without dropping below 60fps on mid-range Android devices.",
    solution: "Used a ScrollController-driven transform matrix on each card's image layer, updating only on scroll delta rather than rebuilding widgets. Added a Sliver-based layout for the feed to avoid off-screen rebuilds entirely.",
    features: ["Creator lookbook builder","Shoppable product tagging","In-app checkout flow","Parallax scroll product cards","Save / wishlist with Lottie heart","Infinite scroll feed (Sliver-based)","Creator follow + notification system","Shareable outfit card generation"],
    tech: { "State Management":"Provider", "Animation":"Custom ScrollController + Transform", "UI":"Lottie + flutter_animate", "Networking":"Dio + REST APIs", "Image":"cached_network_image", "Architecture":"MVVM" },
    links: { store: null, github: "https://github.com/ayeshakamran543", apk: "#", video: "#" },
    note: "Open-source demo. Uses mock product API — no real purchases.",
  },
  Zeno: {
    subtitle: "AI-powered task planner with offline sync",
    client: "Personal project", duration: "2 months", role: "Solo Flutter Developer",
    overview: "Zeno is a daily planner that uses OpenAI's API to suggest tasks based on your habits and workload. The entire UI — including a fully custom calendar widget — is built with Flutter's Canvas API, with Isar for offline-first sync.",
    challenge: "The GPT API introduces unpredictable latency. Making AI suggestions feel instant (not like the app is frozen) while also handling partial responses gracefully required a streaming-aware UX layer.",
    solution: "Implemented server-sent event streaming from OpenAI, rendering tokens as they arrive into the task input — the same 'typing' effect you see in ChatGPT. All suggestions are cached locally in Isar so the app works fully offline after first load.",
    features: ["Streaming AI task suggestions (token-by-token)","Custom Painter calendar widget","Habit streak tracker","Isar offline-first local database","Smart notification scheduling","Priority matrix drag-and-drop","Daily/weekly review summaries","Dark + light adaptive theme"],
    tech: { "State Management":"BLoC + Cubit", "AI":"OpenAI API (streaming SSE)", "Local Storage":"Isar DB", "Calendar":"Custom Painter", "Architecture":"Clean Architecture", "DI":"get_it + injectable" },
    links: { store: null, github: "https://github.com/ayeshakamran543", apk: "#", video: "#" },
    note: "Requires your own OpenAI API key — instructions in README.",
  },
};

/* ── SKILL GROUPS ────────────────────────────────────────────────────────── */
const SKILL_GROUPS = [
  { cat: "Core Development", accent: "#5DCAA5",
    skills: [{ n: "Flutter SDK", d: "Cross-platform UI" }, { n: "Dart · Async/Streams", d: "Language deep dive" },
             { n: "Clean Architecture", d: "Scalable structure" }, { n: "SOLID Principles", d: "Design patterns" }] },
  { cat: "State & Data", accent: "#1D9E75",
    skills: [{ n: "Riverpod", d: "Modern state mgmt" }, { n: "BLoC Pattern", d: "Business logic" },
             { n: "REST APIs + Dio", d: "Networking layer" }, { n: "Firebase Suite", d: "Auth · FCM · Firestore" }] },
  { cat: "UI & Quality", accent: "#D85A30",
    skills: [{ n: "Custom Animations", d: "Canvas & Lottie" }, { n: "Figma → Flutter", d: "Pixel-perfect handoff" },
             { n: "Unit & Widget Tests", d: "Test-driven quality" }, { n: "CI/CD · Codemagic", d: "Automated pipelines" }] },
  { cat: "Leadership", accent: "#5DCAA5",
    skills: [{ n: "Team Lead · 5 devs", d: "Promoted 2026" }, { n: "Agile / Scrum", d: "Sprint planning" },
             { n: "Code Review", d: "Standards & mentorship" }, { n: "App Store Deploy", d: "iOS & Play Store" }] },
];

/* ── PROJECTS ────────────────────────────────────────────────────────────── */
const PROJS = [
  { name: "FanHub",   accent: "#5DCAA5", year: "2026", type: "cards",
    tags: ["Flutter", "Provider", "REST APIs", "Animations"],
    desc: "Sports fan engagement platform — Predictions, Donations, Impact Wall, Engage Live, and real-time match data." },
  { name: "MoRoute",  accent: "#E8574A", year: "2025", type: "stream",
    tags: ["Flutter", "Live Location", "Google Play"],
    desc: "Road-safety navigation app — live road alerts, one-tap SOS, trusted contacts, and nearby help." },
  { name: "My Chain Fitness", accent: "#3FB6A8", year: "2025", type: "chain",
    tags: ["Flutter", "Habit Tracking", "Google Play"],
    desc: "Discipline & habit-streak app — build your chain, don't break it." },
  { name: "Nureo",    accent: "#D68FB8", year: "2025", type: "health",
    tags: ["Flutter", "Wellness", "Google Play"],
    desc: "Nutrition tracking, expert booking, and personalised wellness plans." },
  { name: "MogWars",  accent: "#D85A30", year: "2025", type: "stream",
    tags: ["Flutter", "BLoC", "Firebase", "Live Stream"],
    desc: "Live-streaming gaming arena with Mog Off battle mode, real-time reactions, and multi-role architecture." },
  { name: "Zeno",     accent: "#E8A838", year: "2025", type: "ai",
    tags: ["Flutter", "BLoC", "OpenAI API", "Isar DB"],
    desc: "AI daily planner with streaming GPT suggestions, custom calendar widget, and offline-first Isar sync." },
  // Concept/demo projects — commented out, keeping Zeno above as the featured concept piece.
  // { name: "Paycific", accent: "#4A9EE8", year: "2024", type: "wallet",
  //   tags: ["Flutter", "BLoC", "Stripe", "Biometrics"],
  //   desc: "Multi-currency digital wallet with Custom Painter charts, biometric auth, and Stripe top-ups." },
  // { name: "Pulse",    accent: "#5BBD6F", year: "2023", type: "health",
  //   tags: ["Flutter", "Riverpod", "HealthKit", "Custom Painter"],
  //   desc: "Health tracker with Canvas-drawn progress rings, Apple Health & Google Fit integration." },
  // { name: "Threadly", accent: "#8B7EE8", year: "2023", type: "social",
  //   tags: ["Flutter", "Provider", "REST APIs", "Lottie"],
  //   desc: "Social commerce with parallax product cards, shoppable lookbooks, and Sliver-based infinite scroll." },
];

const STATS = [
  { k: "y", v: 2,  s: "+", l: "Years of experience" },
  { k: "p", v: 5,  s: "+",  l: "Production apps" },
  { k: "f", v: 50, s: "+", l: "Features shipped" },
  { k: "a", v: 20, s: "+", l: "Apps built" },
];

/* ── UTILS ───────────────────────────────────────────────────────────────── */
function renderCode(count) {
  let rem = count;
  return CODE.map((seg, i) => {
    if (rem <= 0) return null;
    const vis = seg.t.slice(0, rem); rem -= seg.t.length;
    return <span key={i} style={{ color: seg.c }}>{vis}</span>;
  });
}
function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setSeen(true); }, { threshold });
    o.observe(ref.current); return () => o.disconnect();
  }, []);
  return [ref, seen];
}
const fadeUp = (seen, delay = 0) => ({
  opacity: seen ? 1 : 0,
  transform: seen ? "none" : "translateY(24px)",
  transition: `opacity .7s ease ${delay}s, transform .7s cubic-bezier(.16,1,.3,1) ${delay}s`,
});

/* ── PHONE MOCKUPS ──────────────────────────────────────────────────────── */
function PhoneMock({ accent, type }) {
  const bg = "#2C2C2A";
  const wrap = { width: 114, height: 198, background: "#444441", borderRadius: 20, overflow: "hidden", display: "flex", flexDirection: "column" };
  const body = { flex: 1, padding: "8px 10px", display: "flex", flexDirection: "column", gap: 7 };
  const Hdr  = () => <div style={{ height: 22, background: accent, opacity: .3 }} />;
  const Cta  = () => <div style={{ marginTop: "auto", height: 24, background: accent, borderRadius: 5 }} />;

  if (type === "cards") return (
    <div style={wrap}><Hdr /><div style={body}>
      {[accent, "#888780"].map((c, i) => (
        <div key={i} style={{ display: "flex", alignItems: "stretch" }}>
          <div style={{ width: 3, background: c, borderRadius: 2, marginRight: 7, opacity: i ? .35 : 1 }} />
          <div style={{ flex: 1, height: 42, background: bg, borderRadius: 5 }} />
        </div>
      ))}<Cta /></div></div>
  );
  if (type === "stream") return (
    <div style={wrap}><Hdr /><div style={body}>
      <div style={{ flex: 1, background: bg, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: 32, height: 32, borderRadius: "50%", border: `2px solid ${accent}`, opacity: .5 }} />
      </div>
      <div style={{ display: "flex", gap: 4 }}>{[...Array(4)].map((_, i) => <div key={i} style={{ flex: 1, height: 15, background: bg, borderRadius: 4 }} />)}</div>
      <Cta /></div></div>
  );
  if (type === "wallet") return (
    <div style={wrap}><Hdr /><div style={body}>
      <div style={{ height: 38, background: bg, borderRadius: 6, padding: "6px 8px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <div style={{ width: 36, height: 3, background: "#888780", opacity: .3, borderRadius: 1, marginBottom: 5 }} />
        <div style={{ width: 62, height: 8, background: accent, opacity: .75, borderRadius: 2 }} />
      </div>
      <div style={{ display: "flex", gap: 3, alignItems: "flex-end", height: 36 }}>
        {[55,40,80,50,70,45,65].map((h, i) => <div key={i} style={{ flex:1, height:`${h}%`, background:accent, opacity:.35+i*.04, borderRadius:"2px 2px 0 0" }} />)}
      </div>
      <div style={{ display: "flex", gap: 5 }}>
        <div style={{ flex:1, height:22, background:accent, borderRadius:5 }} />
        <div style={{ flex:1, height:22, background:bg, borderRadius:5 }} />
      </div></div></div>
  );
  if (type === "health") return (
    <div style={wrap}><Hdr /><div style={body}>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: 66 }}>
        <div style={{ position: "relative", width: 56, height: 56 }}>
          <div style={{ position: "absolute", inset: 0, borderRadius: "50%", border: "5px solid rgba(255,255,255,.07)" }} />
          <div style={{ position: "absolute", inset: 0, borderRadius: "50%", border: `5px solid ${accent}`, borderRightColor: "transparent", borderBottomColor: "transparent", transform: "rotate(-45deg)", opacity: .85 }} />
        </div>
      </div>
      {[75,60,88].map((w,i) => (
        <div key={i} style={{ display:"flex", alignItems:"center", gap:5 }}>
          <div style={{ width:3, height:12, background:accent, opacity:.5+i*.15, borderRadius:1 }} />
          <div style={{ flex:1, height:5, background:bg, borderRadius:3 }}>
            <div style={{ width:`${w}%`, height:"100%", background:accent, opacity:.45+i*.1, borderRadius:3 }} />
          </div>
        </div>
      ))}<Cta /></div></div>
  );
  if (type === "social") return (
    <div style={wrap}><Hdr /><div style={body}>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:3, height:78 }}>
        {[.55,.38,.42,.62].map((op,i) => <div key={i} style={{ background:accent, opacity:op, borderRadius:4 }} />)}
      </div>
      {[...Array(2)].map((_, i) => (
        <div key={i} style={{ display:"flex", alignItems:"center", gap:5 }}>
          <div style={{ width:7, height:7, borderRadius:"50%", background:"#888780", opacity:.45 }} />
          <div style={{ flex:1, height:4, background:bg, borderRadius:2 }} />
          <div style={{ width:7, height:7, borderRadius:"50%", background:accent, opacity:.4 }} />
        </div>
      ))}<Cta /></div></div>
  );
  return (
    <div style={wrap}><Hdr /><div style={body}>
      <div style={{ display:"flex", gap:3, justifyContent:"center" }}>
        {[...Array(7)].map((_, i) => (
          <div key={i} style={{ width:12, height:12, borderRadius:"50%", flexShrink:0, background:i===3?accent:bg, border:`1px solid ${i===3?accent:"rgba(255,255,255,.1)"}` }} />
        ))}
      </div>
      {[1,0,1,0].map((done,i) => (
        <div key={i} style={{ display:"flex", alignItems:"center", gap:6 }}>
          <div style={{ width:11, height:11, borderRadius:"50%", flexShrink:0, background:done?accent:"transparent", border:`1.5px solid ${done?accent:"rgba(255,255,255,.2)"}` }} />
          <div style={{ flex:1, height:5, background:bg, borderRadius:2 }}>
            <div style={{ width:done?`${70+i*10}%`:"30%", height:"100%", background:accent, opacity:done?.4:.15, borderRadius:2 }} />
          </div>
        </div>
      ))}<Cta /></div></div>
  );
}

/* ── CASE STUDY MODAL ────────────────────────────────────────────────────── */
function CaseStudyModal({ project, onClose }) {
  const cs = CASE_STUDIES[project.name];

  useEffect(() => {
    const esc = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", esc);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", esc); document.body.style.overflow = ""; };
  }, []);

  const SectionLabel = ({ children }) => (
    <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".2em", textTransform: "uppercase", color: project.accent, marginBottom: 10 }}>{children}</p>
  );
  const Divider = () => <div style={{ height: 1, background: "rgba(255,255,255,.07)", margin: "32px 0" }} />;

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 1000, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end" }}>
      {/* Backdrop */}
      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,.75)", backdropFilter: "blur(6px)" }} onClick={onClose} />

      {/* Panel */}
      <div style={{
        position: "relative", width: "100%", maxWidth: 860,
        background: "#1E1E1C", borderRadius: "20px 20px 0 0",
        maxHeight: "92vh", overflowY: "auto",
        animation: "slideUpModal .4s cubic-bezier(.16,1,.3,1)",
        boxShadow: "0 -24px 80px rgba(0,0,0,.6)",
      }}>
        {/* Drag pill */}
        <div style={{ display: "flex", justifyContent: "center", padding: "14px 0 0" }}>
          <div style={{ width: 40, height: 4, borderRadius: 2, background: "rgba(255,255,255,.15)" }} />
        </div>

        {/* Close */}
        <button onClick={onClose} style={{ position: "absolute", top: 16, right: 20, background: "rgba(255,255,255,.08)", border: "none", borderRadius: "50%", width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#888780", transition: "background .2s" }}
          onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,.14)"}
          onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,.08)"}>
          <X size={16} />
        </button>

        {/* Content */}
        <div style={{ padding: "16px 40px 48px" }}>
          {/* Header */}
          <div style={{ marginBottom: 28 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
              <div style={{ width: 4, height: 32, background: project.accent, borderRadius: 2 }} />
              <div>
                <p style={{ fontSize: 12, color: "#888780", marginBottom: 2 }}>{cs.client} · {cs.duration}</p>
                <h2 style={{ fontSize: "clamp(26px,5vw,38px)", fontWeight: 700, letterSpacing: "-.02em", lineHeight: 1.1 }}>{project.name}</h2>
              </div>
            </div>
            <p style={{ fontSize: 15, color: project.accent, fontWeight: 500, paddingLeft: 16 }}>{cs.subtitle}</p>
          </div>

          {/* Meta badges */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 28, paddingLeft: 16 }}>
            {project.tags.map(t => (
              <span key={t} style={{ background: "#3A3A37", color: "#D3D1C7", fontSize: 12, fontWeight: 500, padding: "5px 12px", borderRadius: 20 }}>{t}</span>
            ))}
            <span style={{ background: "rgba(93,202,165,.12)", color: project.accent, fontSize: 12, fontWeight: 500, padding: "5px 12px", borderRadius: 20, border: `1px solid ${project.accent}40` }}>
              {cs.role}
            </span>
          </div>

          <Divider />

          {/* Overview */}
          <div style={{ marginBottom: 28 }}>
            <SectionLabel>Overview</SectionLabel>
            <p style={{ fontSize: 15, lineHeight: 1.8, color: "#D3D1C7" }}>{cs.overview}</p>
          </div>

          {/* Challenge + Solution side by side on desktop */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 8 }}>
            <div style={{ background: "#2C2C2A", borderRadius: 12, padding: "20px 20px 24px", borderLeft: `3px solid rgba(216,90,48,.6)` }}>
              <SectionLabel>The Challenge</SectionLabel>
              <p style={{ fontSize: 14, lineHeight: 1.8, color: "#D3D1C7" }}>{cs.challenge}</p>
            </div>
            <div style={{ background: "#2C2C2A", borderRadius: 12, padding: "20px 20px 24px", borderLeft: `3px solid ${project.accent}` }}>
              <SectionLabel>The Solution</SectionLabel>
              <p style={{ fontSize: 14, lineHeight: 1.8, color: "#D3D1C7" }}>{cs.solution}</p>
            </div>
          </div>

          <Divider />

          {/* Features + Tech Stack */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28, marginBottom: 8 }}>
            <div>
              <SectionLabel>Key Features</SectionLabel>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {cs.features.map((f, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                    <ChevronRight size={14} style={{ color: project.accent, flexShrink: 0, marginTop: 3 }} />
                    <span style={{ fontSize: 13, color: "#D3D1C7", lineHeight: 1.6 }}>{f}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <SectionLabel>Tech Stack</SectionLabel>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {Object.entries(cs.tech).map(([k, v]) => (
                  <div key={k} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8, padding: "8px 0", borderBottom: "1px solid rgba(255,255,255,.05)" }}>
                    <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: ".05em", color: "#888780", flexShrink: 0 }}>{k.toUpperCase()}</span>
                    <span style={{ fontSize: 13, color: "#F1EFE8", textAlign: "right" }}>{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <Divider />

          {/* Action links */}
          <div>
            <SectionLabel>Links</SectionLabel>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: cs.note ? 16 : 0 }}>
              {cs.links.video && (
                <a href={cs.links.video} target="_blank" rel="noreferrer"
                  style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 18px", borderRadius: 8, background: project.accent, color: "#1E1E1C", fontSize: 13, fontWeight: 600, textDecoration: "none", transition: "opacity .2s" }}
                  onMouseEnter={e => e.currentTarget.style.opacity = ".85"}
                  onMouseLeave={e => e.currentTarget.style.opacity = "1"}>
                  <Play size={14} fill="currentColor" /> Watch demo
                </a>
              )}
              {cs.links.github && (
                <a href={cs.links.github} target="_blank" rel="noreferrer"
                  style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 18px", borderRadius: 8, background: "#3A3A37", color: "#F1EFE8", fontSize: 13, fontWeight: 600, textDecoration: "none", transition: "background .2s" }}
                  onMouseEnter={e => e.currentTarget.style.background = "#444441"}
                  onMouseLeave={e => e.currentTarget.style.background = "#3A3A37"}>
                  <Code2 size={14} /> View code
                </a>
              )}
              {cs.links.apk && (
                <a href={cs.links.apk} target="_blank" rel="noreferrer"
                  style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 18px", borderRadius: 8, background: "#3A3A37", color: "#F1EFE8", fontSize: 13, fontWeight: 600, textDecoration: "none", transition: "background .2s" }}
                  onMouseEnter={e => e.currentTarget.style.background = "#444441"}
                  onMouseLeave={e => e.currentTarget.style.background = "#3A3A37"}>
                  <Smartphone size={14} /> Download APK
                </a>
              )}
              {cs.links.store && (
                <a href={cs.links.store} target="_blank" rel="noreferrer"
                  style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 18px", borderRadius: 8, background: "#3A3A37", color: "#F1EFE8", fontSize: 13, fontWeight: 600, textDecoration: "none", transition: "background .2s" }}
                  onMouseEnter={e => e.currentTarget.style.background = "#444441"}
                  onMouseLeave={e => e.currentTarget.style.background = "#3A3A37"}>
                  <ExternalLink size={14} /> View on App Store
                </a>
              )}
            </div>
            {cs.note && (
              <p style={{ fontSize: 12, color: "#888780", fontStyle: "italic", marginTop: 8 }}>ℹ️ {cs.note}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════════ */
export default function Portfolio() {
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