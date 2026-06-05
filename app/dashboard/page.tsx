import Link from "next/link";
import { AdoptionLineChart } from "@/components/charts/adoption-line-chart";
import { PipelineBarChart } from "@/components/charts/pipeline-bar-chart";
import { TeamAdoptionChart } from "@/components/charts/team-adoption-chart";
import { AutonomyGauge } from "@/components/charts/autonomy-gauge";
import { ChartCard } from "@/components/dashboard/chart-card";
import { StatCard } from "@/components/dashboard/stat-card";
import { CHART_COLORS } from "@/lib/chart-theme";
import {
  adoptionCurve,
  lifecyclePipeline,
  teamAdoption,
  kpis,
  ledger,
  practices,
  sparkA,
  sparkB,
  sparkC,
  sparkD,
} from "@/lib/mock-data";

const SPARKS = [sparkA, sparkB, sparkC, sparkD];
const SPARK_COLORS = [
  CHART_COLORS.primary,
  CHART_COLORS.secondary,
  CHART_COLORS.primary,
  CHART_COLORS.secondary,
];

const adoptionData = adoptionCurve.labels.map((month, i) => ({
  month,
  value: adoptionCurve.values[i],
}));

const pipelineData = lifecyclePipeline.map((p) => ({
  phase: p.phase,
  count: p.count,
}));

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-8">
      <header className="surface-card mb-2 px-6 py-5">
        <div className="accent-bar mb-4 w-16" />
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">
              <span className="text-gradient">Dashboard</span>
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Q2 overview — delivery metrics and project activity
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="rounded-full bg-white/60 px-3 py-1 text-sm text-muted-foreground ring-1 ring-white/80">
              Last updated: 25 May 2026
            </span>
            <button type="button" className="btn-gradient rounded-lg px-4 py-2 text-sm font-medium">
              New project
            </button>
          </div>
        </div>
      </header>

      <section className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_auto]">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {kpis.map((k, i) => (
            <StatCard
              key={k.label}
              label={k.label}
              value={k.value}
              unit={k.unit}
              delta={k.delta}
              trend={k.trend}
              foot={k.foot}
              sparkline={SPARKS[i]}
              sparkColor={SPARK_COLORS[i]}
            />
          ))}
        </div>
        <div className="surface-card flex flex-col items-center justify-center gap-3 p-6 lg:min-w-[200px]">
          <AutonomyGauge value={87} />
          <Link
            href="/dashboard/user-testing"
            className="text-xs font-medium text-primary hover:underline"
          >
            View usability report →
          </Link>
        </div>
      </section>

      <section className="mt-6">
        <ChartCard
          title="AI tooling adoption"
          description="Monthly adoption rate across the organisation (Jun 2025 – May 2026)"
        >
          <AdoptionLineChart data={adoptionData} />
        </ChartCard>
      </section>

      <section
        id="pipeline"
        className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2"
      >
        <ChartCard
          title="Lifecycle pipeline"
          description="148 projects currently in flight by phase"
        >
          <PipelineBarChart data={pipelineData} />
        </ChartCard>
        <ChartCard
          title="Adoption by team"
          description="Percentage of AI toolchain usage per department"
        >
          <TeamAdoptionChart data={teamAdoption} />
        </ChartCard>
      </section>

      <section
        id="activity"
        className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3"
      >
        <div className="surface-card lg:col-span-2 overflow-hidden">
          <div className="flex items-center justify-between border-b border-white/60 bg-white/30 px-5 py-4">
            <div>
              <h2 className="text-base font-semibold text-foreground">
                Recent activity
              </h2>
              <p className="text-sm text-muted-foreground">
                Latest ships and updates
              </p>
            </div>
            <Link
              href="#"
              className="text-sm font-medium text-primary hover:underline"
            >
              View all
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/60 bg-white/40 text-left text-muted-foreground">
                  <th className="px-5 py-3 font-medium">ID</th>
                  <th className="px-5 py-3 font-medium">Title</th>
                  <th className="px-5 py-3 font-medium">Team</th>
                  <th className="px-5 py-3 font-medium">Type</th>
                  <th className="px-5 py-3 font-medium">When</th>
                </tr>
              </thead>
              <tbody>
                {ledger.map((row) => (
                  <tr
                    key={row.id}
                    className="border-b border-white/50 last:border-0 hover:bg-white/50"
                  >
                    <td className="px-5 py-3 font-mono text-xs text-muted-foreground">
                      {row.id}
                    </td>
                    <td className="px-5 py-3">
                      <div className="font-medium text-foreground">{row.title}</div>
                      <div className="text-xs text-muted-foreground">{row.note}</div>
                    </td>
                    <td className="px-5 py-3 text-muted-foreground">
                      {row.practice}
                    </td>
                    <td className="px-5 py-3">
                      <KindBadge kind={row.kind} />
                    </td>
                    <td className="px-5 py-3 text-muted-foreground whitespace-nowrap">
                      {row.at}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="surface-card overflow-hidden">
          <div className="border-b border-white/60 bg-white/30 px-5 py-4">
            <h2 className="text-base font-semibold text-foreground">Teams</h2>
            <p className="text-sm text-muted-foreground">Projects by practice</p>
          </div>
          <ul className="divide-y divide-white/60">
            {practices.map((p) => (
              <li key={p.name} className="px-5 py-4">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-medium text-foreground">{p.name}</span>
                  <span className="text-sm text-muted-foreground">
                    {p.count} projects
                  </span>
                </div>
                <p className="mt-0.5 text-xs text-muted-foreground">{p.focus}</p>
                <div className="mt-2 flex items-center gap-2">
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-200/80">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-primary to-violet-500"
                      style={{ width: `${p.autonomy * 100}%` }}
                    />
                  </div>
                  <span className="text-xs tabular-nums text-muted-foreground w-10 text-right">
                    {Math.round(p.autonomy * 100)}%
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}

function KindBadge({ kind }: { kind: "autonomous" | "copilot" | "human" }) {
  const styles = {
    autonomous: "bg-blue-50 text-blue-700 ring-blue-600/20",
    copilot: "bg-slate-100 text-slate-700 ring-slate-600/20",
    human: "bg-amber-50 text-amber-800 ring-amber-600/20",
  };
  const labels = {
    autonomous: "Autonomous",
    copilot: "Co-piloted",
    human: "Manual",
  };

  return (
    <span
      className={`inline-flex rounded-md px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${styles[kind]}`}
    >
      {labels[kind]}
    </span>
  );
}
