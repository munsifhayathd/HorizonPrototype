"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("brad@horizondigital.au");
  const [password, setPassword] = useState("demo1234");
  const [submitting, setSubmitting] = useState(false);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => router.push("/dashboard"), 400);
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center bg-app-auth px-4">
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden
      >
        <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-80 w-80 rounded-full bg-violet-400/15 blur-3xl" />
      </div>

      <div className="surface-card relative z-10 w-full max-w-md p-8 shadow-xl shadow-slate-300/30">
        <div className="mb-8 text-center">
          <div className="logo-badge mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-xl text-sm font-bold">
            HD
          </div>
          <h1 className="text-xl font-semibold text-foreground">Sign in</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Horizon Digital project dashboard
          </p>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-foreground"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-lg border border-white/80 bg-white/60 px-3 py-2 text-sm backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
              autoComplete="email"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-foreground"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full rounded-lg border border-white/80 bg-white/60 px-3 py-2 text-sm backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
              autoComplete="current-password"
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-muted-foreground">
              <input type="checkbox" defaultChecked className="rounded border-input" />
              Remember me
            </label>
            <button type="button" className="text-primary hover:underline">
              Forgot password?
            </button>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="btn-gradient w-full rounded-lg py-2.5 text-sm font-medium disabled:opacity-70"
          >
            {submitting ? "Signing in…" : "Sign in"}
          </button>
        </form>

        <p className="mt-6 rounded-lg bg-gradient-to-r from-primary/5 to-violet-500/5 px-3 py-2 text-center text-xs text-muted-foreground ring-1 ring-white/60">
          Demo: use any credentials and click Sign in
        </p>

        <p className="mt-4 text-center text-sm text-muted-foreground">
          <Link href="/" className="text-primary hover:underline">
            ← Back to home
          </Link>
        </p>
      </div>
    </main>
  );
}
