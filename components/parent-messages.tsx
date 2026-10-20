"use client";

import { useState } from "react";

const threads = [
  {
    id: "teacher",
    from: "Year 2 teacher",
    about: "Amara Cole",
    when: "Today",
    unread: true,
    messages: [
      {
        from: "Year 2 teacher",
        mine: false,
        when: "08:10",
        text: "Amara was present this morning. Reading books go home today.",
      },
      {
        from: "Jane Cole",
        mine: true,
        when: "08:24",
        text: "Thank you. I will collect the books this afternoon.",
      },
    ],
  },
  {
    id: "school",
    from: "Riverside Primary",
    about: "School notice",
    when: "Today",
    unread: false,
    messages: [
      {
        from: "Riverside Primary",
        mine: false,
        when: "07:40",
        text: "School closes at the usual time on Friday.",
      },
    ],
  },
] as const;

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2);
}

export function ParentMessages() {
  const [selectedId, setSelectedId] = useState<(typeof threads)[number]["id"]>("teacher");
  const selected = threads.find((thread) => thread.id === selectedId) ?? threads[0];

  return (
    <div className="grid h-full min-h-[28rem] overflow-hidden rounded-2xl border border-[#1c1412]/8 bg-white lg:grid-cols-[17rem_minmax(0,1fr)]">
      <aside className="flex min-h-0 flex-col border-b border-[#1c1412]/8 lg:border-r lg:border-b-0">
        <div className="border-b border-[#1c1412]/8 px-4 py-3">
          <h2 className="text-base font-semibold tracking-tight">Messages</h2>
          <p className="text-xs text-[#8a756d]">Riverside Primary · {threads.length} today</p>
        </div>
        <ul className="min-h-0 flex-1 overflow-y-auto">
          {threads.map((thread) => {
            const current = thread.id === selected.id;
            const latest = thread.messages[thread.messages.length - 1];

            return (
              <li key={thread.id} className="border-t border-[#1c1412]/6 first:border-t-0">
                <button
                  type="button"
                  onClick={() => setSelectedId(thread.id)}
                  aria-current={current ? "true" : undefined}
                  className={`flex w-full items-start gap-3 px-4 py-3 text-left ${
                    current ? "bg-[#fff8f6]" : "hover:bg-[#faf7f4]"
                  }`}
                >
                  <span className="grid size-9 shrink-0 place-items-center rounded-full bg-[#6e1520] text-[11px] font-semibold text-white">
                    {initials(thread.from)}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-baseline justify-between gap-2">
                      <span className="truncate text-sm font-semibold">{thread.from}</span>
                      <span className="shrink-0 text-[11px] text-[#8a756d]">{thread.when}</span>
                    </span>
                    <span className="mt-0.5 block truncate text-xs text-[#8a756d]">{thread.about}</span>
                    <span className="mt-1 block truncate text-xs text-[#6d5c56]">{latest.text}</span>
                  </span>
                  {thread.unread ? (
                    <span className="mt-1 size-2 shrink-0 rounded-full bg-[#e10600]" aria-label="Unread" />
                  ) : null}
                </button>
              </li>
            );
          })}
        </ul>
      </aside>

      <section className="flex min-h-0 flex-col">
        <div className="flex items-center gap-3 border-b border-[#1c1412]/8 px-4 py-3">
          <span className="grid size-9 shrink-0 place-items-center rounded-full bg-[#e10600] text-[11px] font-semibold text-white">
            {initials(selected.from)}
          </span>
          <div className="min-w-0">
            <h2 className="truncate text-sm font-semibold">{selected.from}</h2>
            <p className="truncate text-xs text-[#8a756d]">{selected.about}</p>
          </div>
        </div>
        <ul className="min-h-0 flex-1 space-y-3 overflow-y-auto px-4 py-4">
          {selected.messages.map((message) => (
            <li key={`${message.when}-${message.from}`} className={message.mine ? "flex justify-end" : "flex"}>
              <div
                className={`max-w-[32rem] rounded-2xl px-3 py-2 ${
                  message.mine ? "bg-[#6e1520] text-white" : "bg-[#faf7f4] text-[#1c1412]"
                }`}
              >
                <p className="text-sm leading-5">{message.text}</p>
                <p className={`mt-1 text-[11px] ${message.mine ? "text-[#ffc7c0]" : "text-[#8a756d]"}`}>
                  {message.when}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
