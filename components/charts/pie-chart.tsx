"use client";

import {
  Cell,
  Legend,
  Pie,
  PieChart as RechartsPieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { CHART_COLORS, chartTooltipStyle } from "@/lib/chart-theme";

const SLICE_COLORS = [
  CHART_COLORS.primary,
  CHART_COLORS.secondary,
  "hsl(38, 92%, 50%)",
];

type Props = {
  data: { name: string; value: number }[];
};

export function PieChart({ data }: Props) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <RechartsPieChart>
        <Pie
          data={data}
          cx="50%"
          cy="45%"
          innerRadius={56}
          outerRadius={88}
          paddingAngle={2}
          dataKey="value"
          nameKey="name"
          stroke="none"
        >
          {data.map((entry, index) => (
            <Cell
              key={entry.name}
              fill={SLICE_COLORS[index % SLICE_COLORS.length]}
            />
          ))}
        </Pie>
        <Tooltip
          contentStyle={chartTooltipStyle}
          formatter={(value) => [`${value}%`, "Share"]}
        />
        <Legend
          verticalAlign="bottom"
          iconType="circle"
          iconSize={8}
          formatter={(value) => (
            <span className="text-sm text-muted-foreground">{value}</span>
          )}
        />
      </RechartsPieChart>
    </ResponsiveContainer>
  );
}
