"use client";

import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { CHART_COLORS, chartTooltipStyle } from "@/lib/chart-theme";

const SLICE_COLORS = [
  CHART_COLORS.primary,
  CHART_COLORS.secondary,
  "hsl(262, 70%, 58%)",
  "hsl(38, 92%, 50%)",
  "hsl(215, 16%, 47%)",
];

type Props = {
  data: { label: string; value: number }[];
};

export function ShipMixPieChart({ data }: Props) {
  const chartData = data.map((item) => ({
    name: item.label,
    value: item.value,
  }));

  return (
    <ResponsiveContainer width="100%" height={260}>
      <PieChart>
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          innerRadius={56}
          outerRadius={88}
          paddingAngle={2}
          dataKey="value"
          stroke="none"
        >
          {chartData.map((_, index) => (
            <Cell
              key={`slice-${index}`}
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
          height={36}
          iconType="circle"
          iconSize={8}
          formatter={(value) => (
            <span className="text-xs text-muted-foreground">{value}</span>
          )}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
