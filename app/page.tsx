import Image from "next/image";
import Link from "next/link";

const bars = [28, 46, 68, 92, 68, 46, 28];

export default function Home() {
  return (
    <div className="grid h-[100vh] max-h-[100vh] overflow-hidden bg-[#f4efe8] text-[#1c1412] lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
      <section className="relative hidden overflow-hidden bg-[#6e1520] text-[#fff6f3] lg:flex lg:items-center">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 -left-16 h-72 w-72 rounded-full bg-[#e10600]/35 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute right-[-4rem] bottom-[-5rem] h-80 w-80 rounded-full bg-[#ffb4a8]/15 blur-3xl"
        />

        <div className="relative px-12 xl:px-16">
          <p className="text-[11px] font-semibold tracking-[0.28em] text-[#ffd2cb] uppercase">
            Expert Media Solutions
          </p>
          <div className="mt-8 flex items-end gap-2" aria-hidden>
            {bars.map((height, index) => (
              <span
                key={height + index}
                className="w-3 rounded-full bg-white"
                style={{ height }}
              />
            ))}
          </div>
          <h1 className="mt-8 max-w-md text-5xl leading-[1.05] font-semibold tracking-tight">
            Expert Child portal
          </h1>
          <p className="mt-5 max-w-sm text-base leading-7 text-[#ffd9d4]">
            One doorway for families and school staff. Pick the account that
            matches how you use the portal.
          </p>
        </div>
      </section>

      <main className="flex h-[100vh] max-h-[100vh] min-h-0 flex-col overflow-hidden bg-[#f4efe8]">
        <header className="flex shrink-0 items-center justify-between bg-white px-5 py-3 sm:px-10">
          <Image
            src="/logo.png"
            alt="Expert Media Solutions"
            width={220}
            height={66}
            priority
            className="h-9 w-auto sm:h-11"
          />
          <p className="text-[11px] font-semibold tracking-[0.22em] text-[#8a3a34] uppercase">
            Portal
          </p>
        </header>

        <div className="flex min-h-0 flex-1 items-center justify-center overflow-hidden px-5 sm:px-10">
          <div className="w-full max-w-[440px]">
            <p className="text-[11px] font-semibold tracking-[0.24em] text-[#a33b32] uppercase">
              Sign in
            </p>
            <h2 className="mt-2 text-3xl leading-none font-semibold tracking-tight sm:text-4xl">
              Welcome back
            </h2>
            <p className="mt-2 text-sm leading-6 text-[#6d5c56] [@media(max-height:640px)]:hidden">
              Choose Parents login or Admin login to continue.
            </p>

            <div className="mt-5 flex flex-col gap-3 [@media(max-height:640px)]:mt-4">
              <Link
                href="/login/parents"
                className="group flex items-center gap-4 rounded-2xl bg-[#e10600] px-4 py-3 text-white shadow-[0_14px_30px_-18px_rgba(225,6,0,0.9)] transition hover:bg-[#c40500] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e10600]"
              >
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-white/15">
                  <ParentsIcon />
                </span>
                <span className="min-w-0 flex-1 text-left">
                  <span className="block text-base font-semibold">
                    Parents login
                  </span>
                  <span className="block text-sm text-white/80">
                    Guardians and families
                  </span>
                </span>
                <Arrow />
              </Link>

              <Link
                href="/login/admin"
                className="group flex items-center gap-4 rounded-2xl border border-[#1c1412]/10 bg-white px-4 py-3 text-[#1c1412] transition hover:border-[#e10600]/40 hover:bg-[#fff8f6] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e10600]"
              >
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-[#f6ebe6] text-[#6e1520]">
                  <AdminIcon />
                </span>
                <span className="min-w-0 flex-1 text-left">
                  <span className="block text-base font-semibold">
                    Admin login
                  </span>
                  <span className="block text-sm text-[#6d5c56]">
                    School staff
                  </span>
                </span>
                <Arrow className="text-[#a33b32]" />
              </Link>
            </div>
          </div>
        </div>

        <footer className="shrink-0 px-5 py-3 text-center text-xs text-[#8a756d] sm:px-10">
          Expert Child · Expert Media Solutions
        </footer>
      </main>
    </div>
  );
}

function Arrow({ className = "text-white/80" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      aria-hidden
      className={`size-5 shrink-0 transition group-hover:translate-x-0.5 ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M4 10h12M11 5l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ParentsIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="size-6" fill="currentColor">
      <circle cx="8.2" cy="7.2" r="2.3" />
      <circle cx="15.6" cy="8" r="1.9" />
      <path d="M3.6 18.6c.45-3.15 2.45-4.9 4.6-4.9s4.15 1.75 4.6 4.9H3.6Z" />
      <path d="M12.7 18.6c.3-2.45 1.7-3.85 3.15-3.85 1.5 0 2.85 1.3 3.2 3.85h-6.35Z" />
    </svg>
  );
}

function AdminIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="size-6" fill="none" stroke="currentColor" strokeWidth="1.7">
      <path d="M12 3.5 19 6.2v5.2c0 4.1-2.8 7.2-7 8.6-4.2-1.4-7-4.5-7-8.6V6.2L12 3.5Z" strokeLinejoin="round" />
      <path d="M9.2 12.1 11.1 14l3.8-4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
