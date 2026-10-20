import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { TodayLabel } from "@/components/today-label";

const nav = [
  { href: "/parent", label: "Home", id: "home" },
  { href: "/parent/children", label: "Children", id: "children" },
  { href: "/parent/fees", label: "Fees", id: "fees" },
  { href: "/parent/store", label: "Store", id: "store" },
  { href: "/parent/messages", label: "Messages", id: "messages" },
] as const;

export function ParentShell({
  current,
  children,
}: {
  current: (typeof nav)[number]["id"];
  children: ReactNode;
}) {
  return (
    <div className="flex h-[100vh] max-h-[100vh] overflow-hidden bg-[#f4efe8] text-[#1c1412]">
      <aside className="hidden w-[220px] shrink-0 flex-col bg-[#6e1520] text-[#fff6f3] lg:flex">
        <div className="px-5 pt-5">
          <Link href="/">
            <Image
              src="/logo.png"
              alt="Expert Media Solutions"
              width={180}
              height={54}
              priority
              className="h-9 w-auto rounded-md bg-white px-2 py-1"
            />
          </Link>
          <p className="mt-4 text-[11px] font-semibold tracking-[0.22em] text-[#ffd2cb] uppercase">
            Parent
          </p>
        </div>
        <nav className="mt-6 flex flex-1 flex-col gap-1 px-3">
          {nav.map((item) => (
            <ShellLink
              key={item.id}
              href={item.href}
              label={item.label}
              current={item.id === current}
              className={`rounded-xl px-3 py-2.5 text-sm font-medium ${
                item.id === current
                  ? "bg-white/15 text-white"
                  : "text-[#ffd9d4] hover:bg-white/10 hover:text-white"
              }`}
            />
          ))}
        </nav>
        <p className="px-5 pb-5 text-xs text-[#ffc7c0]">Jane Cole</p>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex shrink-0 items-center justify-between gap-3 border-b border-[#1c1412]/8 bg-white px-4 py-3 sm:px-6">
          <div className="min-w-0">
            <TodayLabel />
            <h1 className="truncate text-lg font-semibold tracking-tight sm:text-xl">Parent</h1>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="rounded-full border border-[#1c1412]/10 px-3 py-1.5 text-xs font-medium text-[#6e1520] hover:bg-[#fff8f6]"
            >
              Sign out
            </Link>
            <span className="grid size-9 place-items-center rounded-full bg-[#e10600] text-xs font-semibold text-white">
              JC
            </span>
          </div>
        </header>

        <nav className="flex shrink-0 gap-2 overflow-x-auto border-b border-[#1c1412]/8 bg-white px-4 py-2 lg:hidden">
          {nav.map((item) => (
            <ShellLink
              key={item.id}
              href={item.href}
              label={item.label}
              current={item.id === current}
              className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold ${
                item.id === current ? "bg-[#6e1520] text-white" : "bg-[#f4efe8] text-[#6d5c56]"
              }`}
            />
          ))}
        </nav>

        <main className="min-h-0 flex-1 overflow-y-auto px-4 py-4 sm:px-6 sm:py-5">{children}</main>
      </div>
    </div>
  );
}

function ShellLink({
  href,
  label,
  current,
  className,
}: {
  href: string;
  label: string;
  current: boolean;
  className: string;
}) {
  if (href.includes("#")) {
    return (
      <a href={href} className={className}>
        {label}
      </a>
    );
  }

  return (
    <Link href={href} aria-current={current ? "page" : undefined} className={className}>
      {label}
    </Link>
  );
}
