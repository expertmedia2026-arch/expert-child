import { ParentShell } from "@/components/parent-shell";

const children = [
  {
    name: "Amara Cole",
    school: "Riverside Primary",
    room: "Year 2",
    fees: [
      { item: "Tuition", term: "Term 1", amount: 180000, status: "Paid" },
      { item: "Books and materials", term: "Term 1", amount: 24500, status: "Unpaid" },
      { item: "Lesson fee", term: "Term 1", amount: 18000, status: "Paid" },
    ],
  },
] as const;

function naira(amount: number) {
  return `₦${amount.toLocaleString("en-GB")}`;
}

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2);
}

export const metadata = {
  title: "Fees — Parent",
  description: "School fees for children linked to your Expert Child parent account.",
};

export default function ParentFeesPage() {
  return (
    <ParentShell current="fees">
      <div className="grid gap-4">
        {children.map((child) => (
          <article
            key={child.name}
            className="overflow-hidden rounded-2xl border border-[#1c1412]/8 bg-white"
          >
            <div className="flex items-center gap-3 border-b border-[#1c1412]/8 px-4 py-3">
              <span className="grid size-10 shrink-0 place-items-center rounded-full bg-[#e10600] text-xs font-semibold text-white">
                {initials(child.name)}
              </span>
              <div className="min-w-0">
                <h2 className="truncate text-base font-semibold tracking-tight">{child.name}</h2>
                <p className="truncate text-xs text-[#8a756d]">
                  {child.room} · {child.school}
                </p>
              </div>
            </div>

            <ul>
              {child.fees.map((fee) => (
                <li
                  key={fee.item}
                  className="flex items-center justify-between gap-3 border-t border-[#1c1412]/6 px-4 py-3 first:border-t-0"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-medium">{fee.item}</p>
                    <p className="text-xs text-[#8a756d]">
                      {fee.term} · {naira(fee.amount)}
                    </p>
                  </div>
                  {fee.status === "Paid" ? (
                    <span className="shrink-0 rounded-full bg-[#e7f6ee] px-2 py-0.5 text-xs font-semibold text-[#1f7a4d]">
                      Paid
                    </span>
                  ) : (
                    <div className="flex shrink-0 items-center gap-2">
                      <span className="rounded-full bg-[#fff1e8] px-2 py-0.5 text-xs font-semibold text-[#a33b32]">
                        Unpaid
                      </span>
                      <button
                        type="button"
                        className="rounded-full bg-[#e10600] px-3 py-1 text-xs font-semibold text-white hover:bg-[#c40500]"
                      >
                        Pay
                      </button>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </ParentShell>
  );
}
