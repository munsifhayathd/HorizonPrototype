import { Sidebar } from "@/components/dashboard/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-app">
      <Sidebar />
      <main className="relative flex-1 min-w-0">
        <div
          className="pointer-events-none absolute inset-0 overflow-hidden"
          aria-hidden
        >
          <div className="absolute -right-24 top-32 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute bottom-24 left-1/3 h-64 w-64 rounded-full bg-violet-400/10 blur-3xl" />
        </div>
        <div className="relative">{children}</div>
      </main>
    </div>
  );
}
