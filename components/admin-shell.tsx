import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { TodayLabel } from "@/components/today-label";

const nav = [
  { href: "/expert-admin", label: "Overview", id: "overview" },
  { href: "/expert-admin/schools", label: "Schools", id: "schools" },
  { href: "/expert-admin/users", label: "Users", id: "users" },
  { href: "/expert-admin#messages", label: "Messages", id: "messages" },
] as const;

const feeNav = [
  { href: "/expert-admin/fees/tuition", label: "Tuition", id: "tuition" },
  { href: "/expert-admin/fees/books", label: "Books", id: "books" },
  { href: "/expert-admin/fees/lesson-fees", label: "Lesson Fees", id: "lesson-fees" },
] as const;

type NavId = (typeof nav)[number]["id"] | (typeof feeNav)[number]["id"];

export function AdminShell({
  current,
  children,
}: {
  current: NavId;
  children: ReactNode;
}) {
  return (
    <div className="flex h-[100vh] max-h-[100vh] overflow-hidden bg-[#f4efe8] text-[#1c1412]">
      <aside className="relative z-20 hidden w-[220px] shrink-0 flex-col bg-[#6e1520] text-[#fff6f3] lg:flex">
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
            Expert Admin
          </p>
        </div>
        <nav className="mt-6 flex flex-1 flex-col gap-1 px-3">
          {nav.map((item) => (
            <span key={item.id} className="contents">
              <ShellLink
                href={item.href}
                label={item.label}
                current={item.id === current}
                className={`rounded-xl px-3 py-2.5 text-sm font-medium ${
                  item.id === current
                    ? "bg-white/15 text-white"
                    : "text-[#ffd9d4] hover:bg-white/10 hover:text-white"
                }`}
              />
              {item.id === "users" ? <FeesMenu current={current} /> : null}
            </span>
          ))}
        </nav>
        <div className="px-5 pb-5 text-xs text-[#ffc7c0]">School staff</div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex shrink-0 items-center justify-between gap-3 border-b border-[#1c1412]/8 bg-white px-4 py-3 sm:px-6">
          <div className="min-w-0">
            <TodayLabel />
            <h1 className="truncate text-lg font-semibold tracking-tight sm:text-xl">
              Expert Admin
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="rounded-full border border-[#1c1412]/10 px-3 py-1.5 text-xs font-medium text-[#6e1520] hover:bg-[#fff8f6]"
            >
              Sign out
            </Link>
            <span className="grid size-9 place-items-center rounded-full bg-[#6e1520] text-xs font-semibold text-white">
              AD
            </span>
          </div>
        </header>

        <nav className="flex shrink-0 gap-2 overflow-x-auto border-b border-[#1c1412]/8 bg-white px-4 py-2 lg:hidden">
          {nav.map((item) => (
            <span key={item.id} className="contents">
              <ShellLink
                href={item.href}
                label={item.label}
                current={item.id === current}
                className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold ${
                  item.id === current ? "bg-[#6e1520] text-white" : "bg-[#f4efe8] text-[#6d5c56]"
                }`}
              />
              {item.id === "users"
                ? feeNav.map((fee) => (
                    <ShellLink
                      key={fee.id}
                      href={fee.href}
                      label={fee.label}
                      current={fee.id === current}
                      className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold ${
                        fee.id === current ? "bg-[#6e1520] text-white" : "bg-[#f4efe8] text-[#6d5c56]"
                      }`}
                    />
                  ))
                : null}
            </span>
          ))}
        </nav>

        <main className="min-h-0 flex-1 overflow-y-auto px-4 py-4 sm:px-6 sm:py-5">
          {children}
        </main>
      </div>
    </div>
  );
}

function FeesMenu({ current }: { current: NavId }) {
  const open = feeNav.some((item) => item.id === current);

  return (
    <div className="group relative">
      <button
        type="button"
        aria-haspopup="menu"
        className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm font-medium ${
          open ? "bg-white/15 text-white" : "text-[#ffd9d4] hover:bg-white/10 hover:text-white"
        }`}
      >
        Manage fees
        <svg viewBox="0 0 20 20" aria-hidden="true" className="size-4 shrink-0" fill="currentColor">
          <path d="M7.2 4.7a.75.75 0 0 1 1.06-.04l4.5 4.25a.75.75 0 0 1 0 1.08l-4.5 4.25a.75.75 0 1 1-1.02-1.1L11.2 10 7.24 5.76a.75.75 0 0 1-.04-1.06Z" />
        </svg>
      </button>
      <div className="pointer-events-none absolute top-0 left-full z-30 pl-2 opacity-0 group-hover:pointer-events-auto group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:opacity-100">
        <div role="menu" aria-label="Manage fees" className="w-44 rounded-xl border border-[#1c1412]/8 bg-white p-1.5 text-[#1c1412] shadow-[0_16px_40px_-24px_rgba(28,20,18,0.5)]">
          {feeNav.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              role="menuitem"
              aria-current={item.id === current ? "page" : undefined}
              className={`block rounded-lg px-3 py-2 text-sm font-medium ${
                item.id === current ? "bg-[#fff4f2] text-[#6e1520]" : "hover:bg-[#faf7f4]"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
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
