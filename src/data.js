/* ── Content (your real portfolio content) ───────────────────────────────── */
export const CASE_STUDIES = {
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

export const PROJECTS = [
  { name: "FanHub", year: "2026", tags: ["Flutter", "Provider", "REST APIs"],
    desc: "Sports fan engagement platform — Predictions, Donations, Impact Wall, Engage Live, and real-time match data." },
  { name: "MoRoute", year: "2025", tags: ["Flutter", "Live Location", "Google Play"],
    desc: "Road-safety navigation app — live road alerts, one-tap SOS, trusted contacts, and nearby help." },
  { name: "My Chain Fitness", year: "2025", tags: ["Flutter", "Habit Tracking", "Google Play"],
    desc: "Discipline & habit-streak app — build your chain, don't break it." },
  { name: "Nureo", year: "2025", tags: ["Flutter", "Wellness", "Google Play"],
    desc: "Nutrition tracking, expert booking, and personalised wellness plans." },
  { name: "MogWars", year: "2025", tags: ["Flutter", "BLoC", "Firebase"],
    desc: "Live-streaming gaming arena with Mog Off battle mode, real-time reactions, and multi-role architecture." },
  { name: "Zeno", year: "2025", tags: ["Flutter", "OpenAI API", "Isar DB"],
    desc: "AI daily planner with streaming GPT suggestions, custom calendar widget, and offline-first Isar sync." },
];

export const SKILL_GROUPS = [
  { cat: "Core development",
    skills: [{ n: "Flutter SDK", d: "Cross-platform UI" }, { n: "Dart — async/streams", d: "Language deep dive" },
             { n: "Clean architecture", d: "Scalable structure" }, { n: "SOLID principles", d: "Design patterns" }] },
  { cat: "State & data",
    skills: [{ n: "Riverpod", d: "Modern state mgmt" }, { n: "BLoC pattern", d: "Business logic" },
             { n: "REST APIs · Dio", d: "Networking layer" }, { n: "Firebase suite", d: "Auth · FCM · Firestore" }] },
  { cat: "UI & quality",
    skills: [{ n: "Custom animations", d: "Canvas & Lottie" }, { n: "Figma to Flutter", d: "Pixel-perfect handoff" },
             { n: "Unit & widget tests", d: "Test-driven quality" }, { n: "CI/CD · Codemagic", d: "Automated pipelines" }] },
  { cat: "Collaboration",
    skills: [{ n: "Agile / Scrum", d: "Sprint planning" }, { n: "Code review", d: "Standards & mentorship" },
             { n: "App Store deploy", d: "iOS & Play Store" }] },
];

export const STATS = [
  { k: "y", v: 2,  s: "+", l: "Years of experience" },
  { k: "p", v: 5,  s: "+", l: "Production apps" },
  { k: "f", v: 50, s: "+", l: "Features shipped" },
  { k: "a", v: 20, s: "+", l: "Apps built" },
];

export const QUOTE = "I'd rather rebuild a screen twice than ship one that almost works.";

/* Original joke terminal, written for Ayesha — not copied from any reference */
export const TERMINAL_LINES = [
  { t: "$ flutter run --release week.dart", c: "#F1EFE8" },
  { t: "> Building...", c: "#8A8880" },
  { t: "> Warning: sleep_hours below minimum threshold", c: "#E8A838" },
  { t: "> Fix suggested: more coffee, fewer standups", c: "#5DCAA5" },
];