/**
 * Mock data for the dashboard demo.
 * Numbers are fabricated for demo purposes.
 */

export const adoptionCurve = {
  labels: [
    "Jun", "Jul", "Aug", "Sep", "Oct", "Nov",
    "Dec", "Jan", "Feb", "Mar", "Apr", "May",
  ],
  values: [18, 22, 28, 31, 38, 44, 51, 58, 64, 71, 79, 87],
};

export const lifecyclePipeline = [
  { phase: "Discover",  count: 12, share: 0.08 },
  { phase: "Define",    count: 18, share: 0.12 },
  { phase: "Design",    count: 24, share: 0.16 },
  { phase: "Build",     count: 41, share: 0.28 },
  { phase: "Verify",    count: 28, share: 0.19 },
  { phase: "Ship",      count: 16, share: 0.11 },
  { phase: "Steward",   count: 9,  share: 0.06 },
];

export const deliveryMix = [
  { name: "Autonomous", value: 62 },
  { name: "Co-piloted", value: 28 },
  { name: "Manual",     value: 10 },
];

export const teamAdoption = [
  { team: "Engineering", value: 92 },
  { team: "Research",    value: 88 },
  { team: "Design",      value: 78 },
  { team: "Leadership",  value: 71 },
  { team: "Operations",  value: 64 },
  { team: "Finance",     value: 41 },
];

export const kpis = [
  { label: "Autonomy Index",   value: "87",     unit: "/100",   delta: "+12",   trend: "up"   as const, foot: "vs. Q1 — across 47 practices" },
  { label: "Cycle Time",       value: "3.2",    unit: "days",   delta: "−10.8", trend: "down" as const, foot: "down from 14d, twelve months ago" },
  { label: "Autonomous Ships", value: "47",     unit: "/mo",    delta: "+9",    trend: "up"   as const, foot: "April → May, weighted by scope" },
  { label: "Quality Score",    value: "96.4",   unit: "/100",   delta: "+1.2",  trend: "up"   as const, foot: "regression + review composite" },
];

export const sparkA = [12, 18, 22, 19, 27, 31, 38, 41, 47, 52, 58, 64, 71, 79, 87];
export const sparkB = [14, 13, 12, 11, 10,  9,  8,  7,  6,  5,  4,  4,  3,  3, 3.2];
export const sparkC = [22, 28, 31, 33, 38, 39, 41, 42, 43, 44, 45, 46, 46, 47, 47];
export const sparkD = [91, 92, 92, 93, 93, 94, 94, 95, 95, 95, 96, 96, 96, 96, 96.4];

export type LedgerKind = "autonomous" | "copilot" | "human";
export const ledger: ReadonlyArray<{
  id: string; title: string; practice: string; author: string; at: string; kind: LedgerKind; note: string;
}> = [
  { id: "HD-2174", title: "Onboarding flow refresh",         practice: "Atelier",   author: "Autonomous", at: "2h ago",     kind: "autonomous", note: "shipped 14 commits across 6 files" },
  { id: "HD-2173", title: "Pricing page experiment",          practice: "Atelier",   author: "Autonomous", at: "6h ago",     kind: "autonomous", note: "A/B variant served to 8% traffic" },
  { id: "HD-2172", title: "API rate-limit dashboard",         practice: "Forge",     author: "M. Hayath",  at: "yesterday",  kind: "copilot",    note: "co-piloted, 2 reviewers" },
  { id: "HD-2171", title: "Quarterly almanac, vol. III",      practice: "Studio",    author: "Autonomous", at: "yesterday",  kind: "autonomous", note: "Q1 retrospective auto-drafted" },
  { id: "HD-2170", title: "Customer interview synthesis",     practice: "Research",  author: "Autonomous", at: "Mon",        kind: "autonomous", note: "23 transcripts → 9 themes" },
  { id: "HD-2169", title: "Auth migration — phase II",        practice: "Forge",     author: "H. Whittle", at: "Mon",        kind: "human",      note: "review approved, awaiting deploy" },
  { id: "HD-2168", title: "Hallmark design tokens v1.4",      practice: "Studio",    author: "Autonomous", at: "Sun",        kind: "autonomous", note: "53 component diffs proposed" },
];

export const practices = [
  { name: "Atelier",   focus: "Autonomous delivery",            count: 14, autonomy: 0.84 },
  { name: "Forge",     focus: "Platform engineering",           count: 11, autonomy: 0.62 },
  { name: "Studio",    focus: "Design & editorial systems",     count: 9,  autonomy: 0.71 },
  { name: "Research",  focus: "Customer & market intelligence", count: 8,  autonomy: 0.88 },
  { name: "Ledger",    focus: "Operations & finance ops",       count: 5,  autonomy: 0.41 },
];

export const colophon = {
  volume: "Volume III",
  issue: "Issue No. 02",
  set: "MMXXVI",
  city: "Sydney",
  serial: "HD‑0027845",
};
