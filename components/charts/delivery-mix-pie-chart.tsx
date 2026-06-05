"use client";

import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { CHART_COLORS, chartTooltipStyle } from "@/lib/chart-theme";

const SLICE_COLORS = [
  CHART_COLORS.primary,
  "hsl(215, 16%, 47%)",
  "hsl(38, 92%, 50%)",
];

type Props = {
  data: { label: string; count: number; share: number }[];
};

export function DeliveryMixPieChart({ data }: Props) {
  const chartData = data.map((slice) => ({
    name: slice.label,
    value: slice.count,
    share: slice.share,
  }));

  return (
    <ResponsiveContainer width="100%" height={260}>
      <PieChart>
        <Pie
          data={chartData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          innerRadius={56}
          outerRadius={88}
          paddingAngle={2}
          stroke="none"
        >
          {chartData.map((_, index) => (
            <Cell key={chartData[index].name} fill={SLICE_COLORS[index % SLICE_COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={chartTooltipStyle}
          formatter={(value, _name, item) => {
            const share = item.payload?.share as number | undefined;
            const pct = share != null ? `${Math.round(share * 100)}%` : "";
            return [`${value} ships (${pct})`, item.payload?.name];
          }}
        />
        <Legend
          verticalAlign="bottom"
          height={36}
          formatter={(value) => (
            <span className="text-xs text-muted-foreground">{value}</span>
          )}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
