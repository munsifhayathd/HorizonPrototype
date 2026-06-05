"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FolderKanban,
  ListTodo,
  Settings,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { label: "Pipeline", href: "/dashboard#pipeline", icon: FolderKanban },
  { label: "Activity", href: "/dashboard#activity", icon: ListTodo },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="surface-sidebar hidden lg:flex w-64 shrink-0 flex-col h-screen sticky top-0 z-10">
      <div className="flex h-14 items-center gap-2 border-b border-white/50 px-5">
        <div className="logo-badge flex h-8 w-8 items-center justify-center rounded-lg text-sm font-bold">
          HD
        </div>
        <div>
          <div className="text-sm font-semibold text-foreground">Horizon Digital</div>
          <div className="text-xs text-muted-foreground">Project dashboard</div>
        </div>
      </div>

      <nav className="flex-1 space-y-1 p-3">
        {NAV.map((item) => {
          const active =
            item.href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname === item.href.split("#")[0];
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200",
                active
                  ? "nav-active"
                  : "text-muted-foreground hover:bg-white/60 hover:text-foreground"
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-white/50 p-4">
        <div className="flex items-center gap-3 rounded-lg bg-white/40 p-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-violet-400/20 text-sm font-medium text-foreground ring-1 ring-white/80">
            HW
          </div>
          <div className="min-w-0 flex-1">
            <div className="truncate text-sm font-medium text-foreground">
              Harrison Whittle
            </div>
            <div className="truncate text-xs text-muted-foreground">Admin</div>
          </div>
          <Link
            href="/"
            className="text-muted-foreground hover:text-foreground"
            title="Sign out"
          >
            <LogOut className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </aside>
  );
}
