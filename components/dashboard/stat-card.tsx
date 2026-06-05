import { MiniSparkline } from "@/components/charts/mini-sparkline";
import { cn } from "@/lib/utils";

type Props = {
  label: string;
  value: string;
  unit?: string;
  delta: string;
  trend: "up" | "down";
  foot: string;
  sparkline: number[];
  sparkColor?: string;
};

export function StatCard({
  label,
  value,
  unit,
  delta,
  trend,
  foot,
  sparkline,
  sparkColor,
}: Props) {
  return (
    <article className="surface-card-hover p-5">
      <div className="flex items-start justify-between gap-2">
        <p className="text-sm font-medium text-muted-foreground">{label}</p>
        <span
          className={cn(
            "text-xs font-medium tabular-nums",
            trend === "up" ? "text-emerald-600" : "text-amber-600"
          )}
        >
          {delta}
        </span>
      </div>
      <div className="mt-2 flex items-baseline gap-1">
        <span className="text-3xl font-semibold tabular-nums text-foreground">
          {value}
        </span>
        {unit && (
          <span className="text-sm text-muted-foreground">{unit}</span>
        )}
      </div>
      <div className="mt-3 h-10">
        <MiniSparkline values={sparkline} color={sparkColor} />
      </div>
      <p className="mt-2 text-xs text-muted-foreground">{foot}</p>
    </article>
  );
}
