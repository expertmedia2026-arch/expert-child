import { SchoolAdminShell } from "@/components/school-admin-shell";

const users = [
  { name: "Ada Okonkwo", role: "School admin", status: "Active" },
  { name: "Year 2 teacher", role: "Teacher", status: "Active" },
  { name: "Chidi Nwosu", role: "Bursar", status: "Active" },
  { name: "Amaka Bello", role: "Teacher", status: "Invited" },
];

export const metadata = {
  title: "Users — School Admin",
  description: "Users at Riverside Primary.",
};

export default function SchoolAdminUsersPage() {
  return (
    <SchoolAdminShell current="users">
      <section className="overflow-hidden rounded-2xl border border-[#1c1412]/8 bg-white">
        <div className="border-b border-[#1c1412]/8 px-4 py-3">
          <h2 className="text-base font-semibold tracking-tight">Users</h2>
          <p className="text-xs text-[#8a756d]">Riverside Primary · {users.length} staff</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[520px] text-left text-sm">
            <thead className="bg-[#faf7f4] text-xs tracking-wide text-[#6d5c56] uppercase">
              <tr>
                <th className="px-4 py-2 font-semibold">Name</th>
                <th className="px-4 py-2 font-semibold">Role</th>
                <th className="px-4 py-2 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.name} className="border-t border-[#1c1412]/6">
                  <td className="px-4 py-2.5 font-medium">{user.name}</td>
                  <td className="px-4 py-2.5 text-[#6d5c56]">{user.role}</td>
                  <td className="px-4 py-2.5">
                    <span
                      className={`inline-flex rounded-full px-2 py-0.5 text-xs font-semibold ${
                        user.status === "Active"
                          ? "bg-[#e7f6ee] text-[#1f7a4d]"
                          : "bg-[#fff4d6] text-[#9a6700]"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </SchoolAdminShell>
  );
}
