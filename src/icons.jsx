/* ── Icons — one small set, one stroke weight, hand-consistent ─────────── */
export const Icon = ({ children, size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
    {children}
  </svg>
);
export const IconArrow  = (p) => <Icon {...p}><line x1="5" y1="12" x2="19" y2="12" /><polyline points="13 6 19 12 13 18" /></Icon>;
export const IconClose  = (p) => <Icon {...p}><line x1="6" y1="6" x2="18" y2="18" /><line x1="18" y1="6" x2="6" y2="18" /></Icon>;
export const IconCopy   = (p) => <Icon {...p}><rect x="8" y="8" width="12" height="12" rx="1.5" /><path d="M5 15V5.5A1.5 1.5 0 0 1 6.5 4H15" /></Icon>;
export const IconCheck  = (p) => <Icon {...p}><polyline points="4 12 9 17 20 6" /></Icon>;

export const GithubIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0 }}>
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);
export const LinkedinIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0 }}>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

export const ScribbleLogo = () => (
  <svg width="32" height="32" viewBox="0 0 40 40" fill="none" stroke="#171412" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 30c0-9 2-17 8-17 5 0 6 6 4 11-1.5 3.7-5 4-6 1-1.4-4 2-9 7-9 4 0 6 3 6 3" />
    <circle cx="15" cy="16" r="1.4" fill="#171412" stroke="none" />
  </svg>
);
export const SketchMenu = () => (
  <svg width="28" height="16" viewBox="0 0 30 18" fill="none" stroke="#171412" strokeWidth="3" strokeLinecap="round">
    <path d="M1 3.5 C 10 2.5, 20 4, 29 3" />
    <path d="M1 14.5 C 10 15.5, 20 14, 29 15" />
  </svg>
);

/* One hand-drawn illustration per app, same loose stroke language as the logo */
export const ProjectIcon = {
  FanHub: (p) => (
    <svg {...p} viewBox="0 0 80 80" fill="none" stroke="#171412" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 14v52" />
      <path d="M22 16c8-5 16-5 24 0-2 6-2 10 0 16-8 5-16 5-24 0" />
      <circle cx="52" cy="26" r="3" fill="#171412" stroke="none" />
      <circle cx="58" cy="36" r="2.4" fill="#171412" stroke="none" />
    </svg>
  ),
  MoRoute: (p) => (
    <svg {...p} viewBox="0 0 80 80" fill="none" stroke="#171412" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M40 12c-10 0-17 7-17 16 0 12 17 34 17 34s17-22 17-34c0-9-7-16-17-16Z" />
      <circle cx="40" cy="28" r="6" />
      <path d="M14 60c8-4 44-4 52 0" strokeDasharray="1 7" />
    </svg>
  ),
  "My Chain Fitness": (p) => (
    <svg {...p} viewBox="0 0 80 80" fill="none" stroke="#171412" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="30" cy="28" rx="12" ry="9" transform="rotate(-25 30 28)" />
      <ellipse cx="48" cy="44" rx="12" ry="9" transform="rotate(-25 48 44)" />
      <ellipse cx="34" cy="58" rx="12" ry="9" transform="rotate(-25 34 58)" />
    </svg>
  ),
  Nureo: (p) => (
    <svg {...p} viewBox="0 0 80 80" fill="none" stroke="#171412" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M40 66c-16-6-22-20-16-34 5-11 17-16 26-11 3-9 12-9 15-2 4 9-2 20-11 24 4 8 0 18-8 22-2 1-4 1-6 1Z" />
      <path d="M40 66c0-14 4-24 12-32" />
    </svg>
  ),
  MogWars: (p) => (
    <svg {...p} viewBox="0 0 80 80" fill="none" stroke="#171412" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="40" cy="40" r="6" fill="#171412" stroke="none" />
      <path d="M28 40a12 12 0 0 1 24 0" />
      <path d="M20 40a20 20 0 0 1 40 0" />
    </svg>
  ),
  Zeno: (p) => (
    <svg {...p} viewBox="0 0 80 80" fill="none" stroke="#171412" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="16" y="18" width="48" height="46" rx="6" />
      <path d="M16 30h48" />
      <path d="M28 12v10M52 12v10" />
      <path d="M28 42h8M28 52h16" />
    </svg>
  ),
};