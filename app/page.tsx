import Link from "next/link";

export default function HomePage() {
  return (
    <main className="relative min-h-screen bg-app overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden
      >
        <div className="absolute -left-20 top-20 h-96 w-96 rounded-full bg-primary/15 blur-3xl" />
        <div className="absolute right-0 top-1/3 h-80 w-80 rounded-full bg-violet-400/15 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-400/10 blur-3xl" />
      </div>

      <header className="surface-header relative z-10">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <div className="logo-badge flex h-8 w-8 items-center justify-center rounded-lg text-sm font-bold">
              HD
            </div>
            <span className="text-sm font-semibold text-foreground">
              Horizon Digital
            </span>
          </div>
          <Link
            href="/login"
            className="rounded-lg px-4 py-2 text-sm font-medium text-primary hover:bg-white/50"
          >
            Sign in
          </Link>
        </div>
      </header>

      <section className="relative z-10 mx-auto max-w-5xl px-6 py-20">
        <div className="accent-bar w-20" />
        <h1 className="mt-6 max-w-2xl text-4xl font-semibold tracking-tight text-foreground">
          Project delivery dashboard for{" "}
          <span className="text-gradient">modern teams</span>
        </h1>
        <p className="mt-4 max-w-xl text-lg text-muted-foreground">
          Track adoption, pipeline health, and team activity in one place.
          Built for Horizon Digital&apos;s internal delivery workflow.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            href="/login"
            className="btn-gradient rounded-lg px-5 py-2.5 text-sm font-medium"
          >
            Get started
          </Link>
          <Link
            href="/dashboard"
            className="surface-card rounded-lg px-5 py-2.5 text-sm font-medium text-foreground transition-shadow hover:shadow-xl"
          >
            View demo dashboard
          </Link>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-3">
          {[
            {
              title: "Metrics at a glance",
              body: "KPI cards and charts for adoption, cycle time, and quality.",
              bar: "linear-gradient(90deg, hsl(221 83% 53%), hsl(262 70% 58%))",
            },
            {
              title: "Pipeline visibility",
              body: "See how work moves from discovery through to delivery.",
              bar: "linear-gradient(90deg, hsl(262 70% 58%), hsl(280 65% 60%))",
            },
            {
              title: "Activity feed",
              body: "Recent ships and updates across all teams.",
              bar: "linear-gradient(90deg, hsl(199 89% 48%), hsl(221 83% 53%))",
            },
          ].map((item) => (
            <article
              key={item.title}
              className="surface-card-hover relative overflow-hidden p-5"
            >
              <div
                className="absolute inset-x-0 top-0 h-1"
                style={{ background: item.bar }}
              />
              <h2 className="mt-2 font-semibold text-foreground">{item.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{item.body}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
