import Image from "next/image";
import Link from "next/link";

export function SignInForm({
  eyebrow,
  title,
  description,
  accent,
  nextHref,
}: {
  eyebrow: string;
  title: string;
  description: string;
  accent: "parents" | "admin";
  nextHref?: string;
}) {
  const submitClass =
    accent === "parents"
      ? "bg-[#e10600] text-white hover:bg-[#c40500]"
      : "bg-[#1c1412] text-white hover:bg-[#3a2a26]";

  return (
    <main className="flex h-[100vh] max-h-[100vh] flex-col overflow-hidden bg-[#f4efe8] text-[#1c1412]">
      <header className="flex shrink-0 items-center justify-between bg-white px-5 py-3 sm:px-10">
        <Link href="/" className="rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#e10600]">
          <Image
            src="/logo.png"
            alt="Expert Media Solutions"
            width={220}
            height={66}
            priority
            className="h-9 w-auto sm:h-11"
          />
        </Link>
        <Link
          href="/"
          className="text-sm font-medium text-[#6e1520] underline-offset-4 hover:underline"
        >
          All logins
        </Link>
      </header>

      <div className="flex min-h-0 flex-1 items-center justify-center px-5">
        <section className="w-full max-w-[420px] rounded-3xl border border-[#1c1412]/8 bg-white px-5 py-4 shadow-[0_24px_50px_-36px_rgba(28,20,18,0.45)] sm:px-7 sm:py-6">
          <p className="text-[11px] font-semibold tracking-[0.24em] text-[#a33b32] uppercase">
            {eyebrow}
          </p>
          <h1 className="mt-1.5 text-2xl font-semibold tracking-tight sm:text-3xl">
            {title}
          </h1>
          <p className="mt-1.5 text-sm leading-6 text-[#6d5c56] [@media(max-height:520px)]:hidden">
            {description}
          </p>

          <form className="mt-4 space-y-3" action="#" method="post">
            <label className="block">
              <span className="text-xs font-semibold tracking-wide text-[#5c4b45] uppercase">
                Email
              </span>
              <input
                type="email"
                name="email"
                autoComplete="email"
                required
                placeholder="name@email.com"
                className="mt-1 w-full rounded-xl border border-[#1c1412]/10 bg-[#faf7f4] px-3.5 py-2 text-sm outline-none focus:border-[#e10600] focus:bg-white"
              />
            </label>
            <label className="block">
              <span className="text-xs font-semibold tracking-wide text-[#5c4b45] uppercase">
                Password
              </span>
              <input
                type="password"
                name="password"
                autoComplete="current-password"
                required
                placeholder="Enter your password"
                className="mt-1 w-full rounded-xl border border-[#1c1412]/10 bg-[#faf7f4] px-3.5 py-2 text-sm outline-none focus:border-[#e10600] focus:bg-white"
              />
            </label>
            {nextHref ? (
              <Link
                href={nextHref}
                className={`mt-1 flex w-full items-center justify-center rounded-xl px-4 py-2.5 text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e10600] ${submitClass}`}
              >
                Sign in
              </Link>
            ) : (
              <button
                type="submit"
                className={`mt-1 w-full rounded-xl px-4 py-2.5 text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e10600] ${submitClass}`}
              >
                Sign in
              </button>
            )}
          </form>
        </section>
      </div>
    </main>
  );
}
