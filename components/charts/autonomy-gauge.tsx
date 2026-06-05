"use client";

import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import { CHART_COLORS } from "@/lib/chart-theme";

type Props = {
  value: number;
  label?: string;
};

export function AutonomyGauge({ value, label = "Autonomy Index" }: Props) {
  const data = [
    { name: "score", value },
    { name: "rest", value: 100 - value },
  ];

  return (
    <div className="flex flex-col items-center">
      <ResponsiveContainer width={160} height={160}>
        <PieChart>
          <defs>
            <linearGradient id="gaugeGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="hsl(221, 83%, 53%)" />
              <stop offset="100%" stopColor="hsl(262, 70%, 58%)" />
            </linearGradient>
          </defs>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            startAngle={180}
            endAngle={0}
            innerRadius={52}
            outerRadius={72}
            paddingAngle={0}
            dataKey="value"
            stroke="none"
          >
            <Cell fill="url(#gaugeGrad)" />
            <Cell fill={CHART_COLORS.grid} />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="-mt-14 text-center">
        <div className="text-3xl font-semibold tabular-nums text-foreground">
          {value}
        </div>
        <div className="text-xs text-muted-foreground">/ 100</div>
        <div className="mt-1 text-sm font-medium text-foreground">{label}</div>
      </div>
    </div>
  );
}
