/** Shared Recharts styling */
export const CHART_COLORS = {
  primary: "hsl(221, 83%, 53%)",
  secondary: "hsl(160, 60%, 45%)",
  muted: "hsl(215, 16%, 47%)",
  grid: "hsl(214, 32%, 91%)",
  border: "hsl(214, 32%, 91%)",
};

/** Palette for pie / donut segments — cycles when data has more slices than colors */
export const PIE_CHART_COLORS = [
  CHART_COLORS.primary,
  CHART_COLORS.secondary,
  "hsl(262, 70%, 58%)",
  "hsl(38, 92%, 50%)",
  "hsl(199, 89%, 48%)",
  "hsl(340, 75%, 55%)",
  CHART_COLORS.muted,
] as const;

export const chartTooltipStyle = {
  fontSize: 12,
  borderRadius: 6,
  border: "1px solid hsl(214, 32%, 91%)",
  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
};

export const pieChartDefaults = {
  outerRadius: 100,
  innerRadius: 0,
  paddingAngle: 2,
  stroke: "none" as const,
};

export type PieChartDatum = {
  name: string;
  value: number;
};
