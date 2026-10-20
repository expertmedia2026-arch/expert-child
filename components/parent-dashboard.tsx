import Link from "next/link";
import { ParentShell } from "@/components/parent-shell";

const children = [
  {
    name: "Amara Cole",
    school: "Riverside Primary",
    room: "Year 2",
    status: "In school",
  },
];

const messages = [
  {
    from: "Year 2 teacher",
    detail: "Amara was present this morning. Reading books go home today.",
  },
  {
    from: "Riverside Primary",
    detail: "School closes at the usual time on Friday.",
  },
];

export function ParentDashboard() {
  return (
    <ParentShell current="home">
      <section className="grid grid-cols-2 gap-3 xl:grid-cols-3">
        <article className="rounded-2xl border border-[#1c1412]/8 bg-white px-4 py-3">
          <p className="text-xs font-medium text-[#6d5c56]">Children</p>
          <p className="mt-1 text-2xl font-semibold tracking-tight">{children.length}</p>
          <p className="mt-1 text-xs text-[#8a756d]">Linked to your account</p>
        </article>
        <article className="rounded-2xl border border-[#1c1412]/8 bg-white px-4 py-3">
          <p className="text-xs font-medium text-[#6d5c56]">School</p>
          <p className="mt-1 text-lg font-semibold tracking-tight">Riverside</p>
          <p className="mt-1 text-xs text-[#8a756d]">Riverside Primary · Lagos</p>
        </article>
        <article className="col-span-2 rounded-2xl border border-[#1c1412]/8 bg-white px-4 py-3 xl:col-span-1">
          <p className="text-xs font-medium text-[#6d5c56]">Messages</p>
          <p className="mt-1 text-2xl font-semibold tracking-tight">{messages.length}</p>
          <p className="mt-1 text-xs text-[#8a756d]">From school today</p>
        </article>
      </section>

      <div className="mt-4 grid gap-4 xl:grid-cols-[minmax(0,1.2fr)_minmax(260px,0.8fr)]">
        <section id="children" className="rounded-2xl border border-[#1c1412]/8 bg-white">
          <div className="flex items-center justify-between px-4 py-3">
            <h2 className="text-sm font-semibold">Your children</h2>
            <Link href="/parent/children" className="text-xs font-medium text-[#a33b32] hover:underline">
              View all
            </Link>
          </div>
          <ul>
            {children.map((child) => (
              <li key={child.name} className="border-t border-[#1c1412]/6 px-4 py-3">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="font-medium">{child.name}</p>
                    <p className="mt-0.5 text-sm text-[#6d5c56]">
                      {child.room} · {child.school}
                    </p>
                  </div>
                  <span className="rounded-full bg-[#e7f6ee] px-2 py-0.5 text-xs font-semibold text-[#1f7a4d]">
                    {child.status}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section id="messages" className="rounded-2xl border border-[#1c1412]/8 bg-white px-4 py-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold">Messages</h2>
            <Link href="/parent/messages" className="text-xs font-medium text-[#a33b32] hover:underline">
              View all
            </Link>
          </div>
          <ul className="mt-3 space-y-3">
            {messages.map((message) => (
              <li key={message.from} className="border-t border-[#1c1412]/6 pt-3 first:border-t-0 first:pt-0">
                <p className="text-sm font-medium">{message.from}</p>
                <p className="mt-0.5 text-xs leading-5 text-[#6d5c56]">{message.detail}</p>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </ParentShell>
  );
}
