import { SchoolAdminShell } from "@/components/school-admin-shell";

const fees = [
  { name: "Tuition", term: "Term 1", amount: "₦180,000", status: "Open" },
  { name: "Books", term: "Term 1", amount: "₦24,500", status: "Due" },
  { name: "Lesson Fees", term: "Term 1", amount: "₦18,000", status: "Open" },
];

export const metadata = {
  title: "Manage Fees — School Admin",
  description: "Fees for Riverside Primary.",
};

export default function SchoolAdminFeesPage() {
  return (
    <SchoolAdminShell current="fees">
      <section className="overflow-hidden rounded-2xl border border-[#1c1412]/8 bg-white">
        <div className="border-b border-[#1c1412]/8 px-4 py-3">
          <h2 className="text-base font-semibold tracking-tight">Manage Fees</h2>
          <p className="text-xs text-[#8a756d]">Riverside Primary · Term 1</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[520px] text-left text-sm">
            <thead className="bg-[#faf7f4] text-xs tracking-wide text-[#6d5c56] uppercase">
              <tr>
                <th className="px-4 py-2 font-semibold">Fee</th>
                <th className="px-4 py-2 font-semibold">Term</th>
                <th className="px-4 py-2 font-semibold">Amount</th>
                <th className="px-4 py-2 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {fees.map((fee) => (
                <tr key={fee.name} className="border-t border-[#1c1412]/6">
                  <td className="px-4 py-2.5 font-medium">{fee.name}</td>
                  <td className="px-4 py-2.5 text-[#6d5c56]">{fee.term}</td>
                  <td className="px-4 py-2.5 text-[#6d5c56]">{fee.amount}</td>
                  <td className="px-4 py-2.5">
                    <span
                      className={`inline-flex rounded-full px-2 py-0.5 text-xs font-semibold ${
                        fee.status === "Due"
                          ? "bg-[#fff1e8] text-[#a33b32]"
                          : "bg-[#e7f6ee] text-[#1f7a4d]"
                      }`}
                    >
                      {fee.status}
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
