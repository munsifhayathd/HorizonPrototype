"use client";

import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { CHART_COLORS, chartTooltipStyle } from "@/lib/chart-theme";
import type { UserTestingSentiment } from "@/lib/mock-data";

const SENTIMENT_COLORS: Record<UserTestingSentiment, string> = {
  positive: CHART_COLORS.secondary,
  neutral: "hsl(30, 80%, 55%)",
  negative: "hsl(0, 72%, 51%)",
};

type Props = {
  data: { label: string; value: number; sentiment: UserTestingSentiment }[];
};

export function UsabilitySentimentChart({ data }: Props) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={56}
          outerRadius={88}
          paddingAngle={2}
          dataKey="value"
          nameKey="label"
          stroke="none"
        >
          {data.map((entry) => (
            <Cell key={entry.sentiment} fill={SENTIMENT_COLORS[entry.sentiment]} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={chartTooltipStyle}
          formatter={(value, _name, item) => [
            `${value} of 6 sessions`,
            item.payload?.label ?? "Sessions",
          ]}
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
