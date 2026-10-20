import Link from "next/link";
import { AdminShell } from "@/components/admin-shell";

const stats = [
  { label: "Schools", value: "12", note: "3 pending setup" },
  { label: "Users", value: "96", note: "4 invites waiting" },
  { label: "Active", value: "9", note: "Schools open today" },
  { label: "Messages", value: "6", note: "2 need a reply" },
];

const schools = [
  { name: "Riverside Primary", city: "Lagos", pupils: 486, status: "Active" },
  { name: "Hillcrest Academy", city: "Abuja", pupils: 732, status: "Active" },
  { name: "Greenfield School", city: "Port Harcourt", pupils: 214, status: "Pending" },
  { name: "St. Mary's", city: "Ibadan", pupils: 358, status: "Active" },
  { name: "Oakbridge", city: "Enugu", pupils: 141, status: "Paused" },
];

const users = [
  { name: "Ada Okonkwo", detail: "School admin · Riverside Primary" },
  { name: "Kwame Mensah", detail: "Invite waiting · sent yesterday" },
  { name: "Nadia Rahman", detail: "expert-admin · Hillcrest Academy" },
];

const statusTone: Record<string, string> = {
  Active: "bg-[#e7f6ee] text-[#1f7a4d]",
  Pending: "bg-[#fff4d6] text-[#9a6700]",
  Paused: "bg-[#fde8ea] text-[#9f1239]",
};

export function AdminDashboard() {
  return (
    <AdminShell current="overview">
          <section className="grid grid-cols-2 gap-3 xl:grid-cols-4">
            {stats.map((stat) => (
              <article
                key={stat.label}
                className="rounded-2xl border border-[#1c1412]/8 bg-white px-4 py-3"
              >
                <p className="text-xs font-medium text-[#6d5c56]">{stat.label}</p>
                <p className="mt-1 text-2xl font-semibold tracking-tight">{stat.value}</p>
                <p className="mt-1 text-xs text-[#8a756d]">{stat.note}</p>
              </article>
            ))}
          </section>

          <div className="mt-4 grid gap-4 xl:grid-cols-[minmax(0,1.5fr)_minmax(260px,0.8fr)]">
            <section
              id="schools"
              className="overflow-hidden rounded-2xl border border-[#1c1412]/8 bg-white"
            >
              <div className="flex items-center justify-between px-4 py-3">
                <h2 className="text-sm font-semibold">Schools</h2>
                <Link href="/expert-admin/schools" className="text-xs font-medium text-[#a33b32] hover:underline">
                  View all
                </Link>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[520px] text-left text-sm">
                  <thead className="bg-[#faf7f4] text-xs tracking-wide text-[#6d5c56] uppercase">
                    <tr>
                      <th className="px-4 py-2 font-semibold">School</th>
                      <th className="px-4 py-2 font-semibold">City</th>
                      <th className="px-4 py-2 font-semibold">Pupils</th>
                      <th className="px-4 py-2 font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {schools.map((school) => (
                      <tr key={school.name} className="border-t border-[#1c1412]/6">
                        <td className="px-4 py-2.5 font-medium">{school.name}</td>
                        <td className="px-4 py-2.5 text-[#6d5c56]">{school.city}</td>
                        <td className="px-4 py-2.5 text-[#6d5c56]">{school.pupils.toLocaleString("en-GB")}</td>
                        <td className="px-4 py-2.5">
                          <span
                            className={`inline-flex rounded-full px-2 py-0.5 text-xs font-semibold ${statusTone[school.status]}`}
                          >
                            {school.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section
              id="users"
              className="rounded-2xl border border-[#1c1412]/8 bg-white px-4 py-3"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold">Users</h2>
                <Link href="/expert-admin/users" className="text-xs font-medium text-[#a33b32] hover:underline">
                  View all
                </Link>
              </div>
              <ul className="mt-3 space-y-3">
                {users.map((user) => (
                  <li key={user.name} className="border-t border-[#1c1412]/6 pt-3 first:border-t-0 first:pt-0">
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="mt-0.5 text-xs leading-5 text-[#6d5c56]">{user.detail}</p>
                  </li>
                ))}
              </ul>
              <div id="messages" className="mt-4 rounded-xl bg-[#fff4f2] px-3 py-3">
                <p className="text-xs font-semibold tracking-wide text-[#a33b32] uppercase">
                  Messages
                </p>
                <p className="mt-1 text-sm leading-6 text-[#1c1412]">
                  Two notes are waiting for a staff reply.
                </p>
              </div>
            </section>
          </div>
    </AdminShell>
  );
}
