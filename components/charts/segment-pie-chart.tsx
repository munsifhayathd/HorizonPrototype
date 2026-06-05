"use client";

import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import {
  PIE_CHART_COLORS,
  type PieChartDatum,
  chartTooltipStyle,
  pieChartDefaults,
} from "@/lib/chart-theme";

type Props = {
  data: PieChartDatum[];
  /** Format numeric values in the tooltip (e.g. percentages) */
  valueFormatter?: (value: number) => string;
  height?: number;
};

export function SegmentPieChart({
  data,
  valueFormatter = (value) => String(value),
  height = 280,
}: Props) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={pieChartDefaults.outerRadius}
          innerRadius={pieChartDefaults.innerRadius}
          paddingAngle={pieChartDefaults.paddingAngle}
          stroke={pieChartDefaults.stroke}
        >
          {data.map((entry, index) => (
            <Cell
              key={entry.name}
              fill={PIE_CHART_COLORS[index % PIE_CHART_COLORS.length]}
            />
          ))}
        </Pie>
        <Tooltip
          contentStyle={chartTooltipStyle}
          formatter={(value) => [valueFormatter(Number(value)), ""]}
        />
        <Legend
          verticalAlign="bottom"
          iconType="circle"
          wrapperStyle={{ fontSize: 12, paddingTop: 8 }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
