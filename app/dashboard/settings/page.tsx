"use client";

import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function SettingsPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-8">
      <header className="surface-card px-6 py-5">
        <Link
          href="/dashboard"
          className="text-sm text-primary hover:underline"
        >
          ← Back to dashboard
        </Link>
        <div className="accent-bar mt-4 w-12" />
        <h1 className="mt-3 text-2xl font-semibold text-foreground">
          <span className="text-gradient">Settings</span>
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage your account and notification preferences
        </p>
      </header>

      <section className="mt-6 space-y-6">
        <SettingsBlock title="Profile">
          <div className="surface-card space-y-4 p-5">
            <Field label="Email" defaultValue="brad@horizondigital.au" />
            <Field label="Full name" defaultValue="Brad Mitchell" />
            <Field label="Role" defaultValue="Admin" />
            <Field label="Timezone" defaultValue="Australia/Sydney (UTC+10)" />
          </div>
        </SettingsBlock>

        <SettingsBlock title="Notifications">
          <div className="surface-card space-y-3 p-3">
            <ToggleRow label="Email digest" description="Daily summary at 6:30 AM" defaultOn />
            <ToggleRow label="Slack alerts" description="#delivery channel" defaultOn />
            <ToggleRow label="Deploy notifications" description="On every production ship" defaultOn />
            <ToggleRow label="Mobile push" description="Critical incidents only" defaultOn />
            <ToggleRow label="Weekly report" description="PDF export every Monday" defaultOn={false} />
          </div>
        </SettingsBlock>

        <SettingsBlock title="Teams">
          <div className="surface-card divide-y divide-white/60 overflow-hidden">
            {[
              { name: "Engineering", on: true },
              { name: "Design", on: true },
              { name: "Research", on: true },
              { name: "Operations", on: true },
              { name: "Finance", on: false },
            ].map((team) => (
              <div
                key={team.name}
                className="flex items-center justify-between px-4 py-3"
              >
                <span className="text-sm font-medium text-foreground">
                  {team.name}
                </span>
                <Toggle defaultOn={team.on} />
              </div>
            ))}
          </div>
        </SettingsBlock>

        <SettingsBlock title="Danger zone">
          <div className="rounded-xl border border-destructive/25 bg-gradient-to-br from-destructive/5 to-red-50/80 p-4 backdrop-blur-sm">
            <p className="text-sm font-medium text-foreground">Sign out everywhere</p>
            <p className="mt-1 text-sm text-muted-foreground">
              End all active sessions on this account.
            </p>
            <Link
              href="/"
              className="mt-4 inline-block rounded-md border border-destructive px-4 py-2 text-sm font-medium text-destructive hover:bg-destructive hover:text-destructive-foreground"
            >
              Sign out
            </Link>
          </div>
        </SettingsBlock>
      </section>
    </div>
  );
}

function SettingsBlock({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="text-base font-semibold text-foreground">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function Field({ label, defaultValue }: { label: string; defaultValue: string }) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-foreground">{label}</span>
      <input
        type="text"
        defaultValue={defaultValue}
        className="mt-1 block w-full rounded-lg border border-white/80 bg-white/50 px-3 py-2 text-sm backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
      />
    </label>
  );
}

function ToggleRow({
  label,
  description,
  defaultOn,
}: {
  label: string;
  description: string;
  defaultOn?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-lg border border-white/50 bg-white/40 px-4 py-3">
      <div>
        <div className="text-sm font-medium text-foreground">{label}</div>
        <div className="text-xs text-muted-foreground">{description}</div>
      </div>
      <Toggle defaultOn={defaultOn} />
    </div>
  );
}

function Toggle({ defaultOn }: { defaultOn?: boolean }) {
  const [on, setOn] = useState(!!defaultOn);

  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      onClick={() => setOn((v) => !v)}
      className={cn(
        "relative h-6 w-11 shrink-0 rounded-full transition-colors",
        on ? "bg-gradient-to-r from-primary to-violet-500" : "bg-slate-200"
      )}
    >
      <span
        className={cn(
          "absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform",
          on && "translate-x-5"
        )}
      />
    </button>
  );
}
