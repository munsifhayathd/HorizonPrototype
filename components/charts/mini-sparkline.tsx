"use client";

import { Line, LineChart, ResponsiveContainer } from "recharts";
import { CHART_COLORS } from "@/lib/chart-theme";

type Props = {
  values: number[];
  color?: string;
};

export function MiniSparkline({ values, color = CHART_COLORS.primary }: Props) {
  const data = values.map((value, i) => ({ i, value }));

  return (
    <ResponsiveContainer width="100%" height={40}>
      <LineChart data={data}>
        <Line
          type="monotone"
          dataKey="value"
          stroke={color}
          strokeWidth={2}
          dot={false}
          isAnimationActive={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
