import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { TodayLabel } from "@/components/today-label";
import { productSlug, storeProducts } from "@/lib/store-catalog";

const nav = [
  { href: "/school-admin", label: "Overview", id: "overview" },
  { href: "/school-admin/users", label: "Users", id: "users" },
  { href: "/school-admin/classes", label: "Manage Classes", id: "classes" },
] as const;

const feeNav = [
  { href: "/school-admin/fees/tuition", label: "Tuition", id: "tuition" },
  { href: "/school-admin/fees/books", label: "Books", id: "books" },
  { href: "/school-admin/fees/lesson-fees", label: "Lesson Fees", id: "lesson-fees" },
] as const;

const productIds = new Set(storeProducts.map((product) => productSlug(product.name)));

export function SchoolAdminShell({
  current,
  children,
}: {
  current: string;
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
            School admin
          </p>
        </div>
        <nav className="mt-6 flex flex-1 flex-col gap-1 px-3">
          {nav.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              aria-current={item.id === current ? "page" : undefined}
              className={`rounded-xl px-3 py-2.5 text-sm font-medium ${
                item.id === current
                  ? "bg-white/15 text-white"
                  : "text-[#ffd9d4] hover:bg-white/10 hover:text-white"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <FlyoutMenu
            label="Manage Fees"
            items={feeNav}
            current={current}
            active={current === "fees" || feeNav.some((item) => item.id === current)}
          />
          <Link
            href="/school-admin/products"
            aria-current={current === "products" || productIds.has(current) ? "page" : undefined}
            className={`rounded-xl px-3 py-2.5 text-sm font-medium ${
              current === "products" || productIds.has(current)
                ? "bg-white/15 text-white"
                : "text-[#ffd9d4] hover:bg-white/10 hover:text-white"
            }`}
          >
            Manage Products
          </Link>
        </nav>
        <p className="px-5 pb-5 text-xs text-[#ffc7c0]">Ada Okonkwo</p>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex shrink-0 items-center justify-between gap-3 border-b border-[#1c1412]/8 bg-white px-4 py-3 sm:px-6">
          <div className="min-w-0">
            <TodayLabel />
            <h1 className="truncate text-lg font-semibold tracking-tight sm:text-xl">School admin</h1>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="rounded-full border border-[#1c1412]/10 px-3 py-1.5 text-xs font-medium text-[#6e1520] hover:bg-[#fff8f6]"
            >
              Sign out
            </Link>
            <span className="grid size-9 place-items-center rounded-full bg-[#6e1520] text-xs font-semibold text-white">
              AO
            </span>
          </div>
        </header>

        <nav className="flex shrink-0 gap-2 overflow-x-auto border-b border-[#1c1412]/8 bg-white px-4 py-2 lg:hidden">
          {nav.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              aria-current={item.id === current ? "page" : undefined}
              className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold ${
                item.id === current ? "bg-[#6e1520] text-white" : "bg-[#f4efe8] text-[#6d5c56]"
              }`}
            >
              {item.label}
            </Link>
          ))}
          {feeNav.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              aria-current={item.id === current ? "page" : undefined}
              className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold ${
                item.id === current ? "bg-[#6e1520] text-white" : "bg-[#f4efe8] text-[#6d5c56]"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/school-admin/products"
            aria-current={current === "products" || productIds.has(current) ? "page" : undefined}
            className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold ${
              current === "products" || productIds.has(current)
                ? "bg-[#6e1520] text-white"
                : "bg-[#f4efe8] text-[#6d5c56]"
            }`}
          >
            Manage Products
          </Link>
        </nav>

        <main className="min-h-0 flex-1 overflow-y-auto px-4 py-4 sm:px-6 sm:py-5">{children}</main>
      </div>
    </div>
  );
}

function FlyoutMenu({
  label,
  items,
  current,
  active,
}: {
  label: string;
  items: readonly { href: string; label: string; id: string }[];
  current: string;
  active: boolean;
}) {
  return (
    <div className="group relative">
      <button
        type="button"
        aria-haspopup="menu"
        className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm font-medium ${
          active ? "bg-white/15 text-white" : "text-[#ffd9d4] hover:bg-white/10 hover:text-white"
        }`}
      >
        {label}
        <svg viewBox="0 0 20 20" aria-hidden="true" className="size-4 shrink-0" fill="currentColor">
          <path d="M7.2 4.7a.75.75 0 0 1 1.06-.04l4.5 4.25a.75.75 0 0 1 0 1.08l-4.5 4.25a.75.75 0 1 1-1.02-1.1L11.2 10 7.24 5.76a.75.75 0 0 1-.04-1.06Z" />
        </svg>
      </button>
      <div className="pointer-events-none absolute top-0 left-full z-30 pl-2 opacity-0 group-hover:pointer-events-auto group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:opacity-100">
        <div
          role="menu"
          aria-label={label}
          className="max-h-[70vh] w-44 overflow-y-auto rounded-xl border border-[#1c1412]/8 bg-white p-1.5 text-[#1c1412] shadow-[0_16px_40px_-24px_rgba(28,20,18,0.5)]"
        >
          {items.map((item) => (
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
