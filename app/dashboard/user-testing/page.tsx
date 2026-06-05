import Link from "next/link";
import { UsabilitySentimentChart } from "@/components/charts/usability-sentiment-chart";
import { ChartCard } from "@/components/dashboard/chart-card";
import {
  userTestingIssues,
  userTestingSentiment,
  userTestingSessions,
  userTestingSummary,
  type IssuePriority,
  type UserTestingSentiment,
} from "@/lib/mock-data";

export default function UserTestingPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-8">
      <header className="surface-card mb-2 px-6 py-5">
        <Link
          href="/dashboard"
          className="text-sm text-primary hover:underline"
        >
          ← Back to dashboard
        </Link>
        <div className="accent-bar mt-4 w-16" />
        <div className="mt-3 flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">
              <span className="text-gradient">User testing report</span>
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              HPRO-0005 — feedback on the Autonomy Index pie gauge integration
            </p>
          </div>
          <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-700 ring-1 ring-emerald-600/20">
            {userTestingSummary.sessionsCompleted} sessions completed
          </span>
        </div>
      </header>

      <section className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <SummaryStat
          label="Sessions"
          value={`${userTestingSummary.sessionsCompleted}/${userTestingSummary.targetSessions}`}
          foot="Target met — 6 participants"
        />
        <SummaryStat
          label="Avg. SUS score"
          value={userTestingSummary.avgSusScore.toFixed(1)}
          foot="System Usability Scale (0–100)"
        />
        <SummaryStat
          label="Task success"
          value={`${Math.round(userTestingSummary.taskSuccessRate * 100)}%`}
          foot="Locate & interpret gauge score"
        />
        <SummaryStat
          label="Feature tested"
          value="Pie gauge"
          foot={userTestingSummary.featureUnderTest}
        />
      </section>

      <section className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <ChartCard
          title="Feedback sentiment"
          description="Participant reactions after completing the gauge comprehension task"
        >
          <UsabilitySentimentChart data={[...userTestingSentiment]} />
        </ChartCard>

        <div className="surface-card overflow-hidden">
          <div className="border-b border-white/60 bg-white/30 px-5 py-4">
            <h2 className="text-base font-semibold text-foreground">
              Prioritized issues
            </h2>
            <p className="text-sm text-muted-foreground">
              Ranked for resolution — {userTestingIssues.filter((i) => i.status !== "resolved").length} open
            </p>
          </div>
          <ul className="divide-y divide-white/60">
            {userTestingIssues.map((issue) => (
              <li key={issue.id} className="px-5 py-4">
                <div className="flex flex-wrap items-start gap-2">
                  <PriorityBadge priority={issue.priority} />
                  <StatusBadge status={issue.status} />
                </div>
                <p className="mt-2 text-sm font-medium text-foreground">
                  {issue.title}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {issue.description}
                </p>
                <p className="mt-2 text-xs text-muted-foreground">
                  {issue.id} · reported in {issue.sessionsAffected} session
                  {issue.sessionsAffected !== 1 ? "s" : ""}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mt-6">
        <div className="surface-card overflow-hidden">
          <div className="border-b border-white/60 bg-white/30 px-5 py-4">
            <h2 className="text-base font-semibold text-foreground">
              Session feedback
            </h2>
            <p className="text-sm text-muted-foreground">
              Documented participant responses — {userTestingSummary.completedAt}
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/60 bg-white/40 text-left text-muted-foreground">
                  <th className="px-5 py-3 font-medium">ID</th>
                  <th className="px-5 py-3 font-medium">Participant</th>
                  <th className="px-5 py-3 font-medium">Role</th>
                  <th className="px-5 py-3 font-medium">SUS</th>
                  <th className="px-5 py-3 font-medium">Task</th>
                  <th className="px-5 py-3 font-medium">Sentiment</th>
                  <th className="px-5 py-3 font-medium">Feedback</th>
                </tr>
              </thead>
              <tbody>
                {userTestingSessions.map((session) => (
                  <tr
                    key={session.id}
                    className="border-b border-white/50 last:border-0 hover:bg-white/50"
                  >
                    <td className="px-5 py-3 font-mono text-xs text-muted-foreground">
                      {session.id}
                    </td>
                    <td className="px-5 py-3 font-medium text-foreground whitespace-nowrap">
                      {session.participant}
                    </td>
                    <td className="px-5 py-3 text-muted-foreground whitespace-nowrap">
                      {session.role}
                    </td>
                    <td className="px-5 py-3 tabular-nums text-foreground">
                      {session.susScore}
                    </td>
                    <td className="px-5 py-3">
                      <TaskBadge success={session.taskSuccess} />
                    </td>
                    <td className="px-5 py-3">
                      <SentimentBadge sentiment={session.sentiment} />
                    </td>
                    <td className="px-5 py-3 max-w-md text-muted-foreground">
                      {session.feedback}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}

function SummaryStat({
  label,
  value,
  foot,
}: {
  label: string;
  value: string;
  foot: string;
}) {
  return (
    <div className="surface-card p-5">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="mt-1 text-2xl font-semibold tabular-nums text-foreground">
        {value}
      </p>
      <p className="mt-1 text-xs text-muted-foreground">{foot}</p>
    </div>
  );
}

function PriorityBadge({ priority }: { priority: IssuePriority }) {
  const styles: Record<IssuePriority, string> = {
    P0: "bg-red-50 text-red-700 ring-red-600/20",
    P1: "bg-amber-50 text-amber-800 ring-amber-600/20",
    P2: "bg-slate-100 text-slate-700 ring-slate-600/20",
  };

  return (
    <span
      className={`inline-flex rounded-md px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${styles[priority]}`}
    >
      {priority}
    </span>
  );
}

function StatusBadge({
  status,
}: {
  status: "open" | "in-progress" | "resolved";
}) {
  const styles = {
    open: "bg-slate-100 text-slate-600 ring-slate-500/20",
    "in-progress": "bg-blue-50 text-blue-700 ring-blue-600/20",
    resolved: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  };
  const labels = {
    open: "Open",
    "in-progress": "In progress",
    resolved: "Resolved",
  };

  return (
    <span
      className={`inline-flex rounded-md px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${styles[status]}`}
    >
      {labels[status]}
    </span>
  );
}

function TaskBadge({ success }: { success: boolean }) {
  return (
    <span
      className={`inline-flex rounded-md px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${
        success
          ? "bg-emerald-50 text-emerald-700 ring-emerald-600/20"
          : "bg-red-50 text-red-700 ring-red-600/20"
      }`}
    >
      {success ? "Pass" : "Fail"}
    </span>
  );
}

function SentimentBadge({ sentiment }: { sentiment: UserTestingSentiment }) {
  const styles: Record<UserTestingSentiment, string> = {
    positive: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
    neutral: "bg-amber-50 text-amber-800 ring-amber-600/20",
    negative: "bg-red-50 text-red-700 ring-red-600/20",
  };
  const labels: Record<UserTestingSentiment, string> = {
    positive: "Positive",
    neutral: "Neutral",
    negative: "Negative",
  };

  return (
    <span
      className={`inline-flex rounded-md px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${styles[sentiment]}`}
    >
      {labels[sentiment]}
    </span>
  );
}
