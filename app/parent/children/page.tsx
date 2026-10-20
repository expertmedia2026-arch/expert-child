import { ParentShell } from "@/components/parent-shell";

const children = [
  {
    name: "Amara Cole",
    school: "Riverside Primary",
    city: "Lagos",
    room: "Year 2",
    teacher: "Year 2 teacher",
    status: "In school",
  },
];

export const metadata = {
  title: "Children — Parent",
  description: "Children linked to your Expert Child parent account.",
};

export default function ParentChildrenPage() {
  return (
    <ParentShell current="children">
      <section className="overflow-hidden rounded-2xl border border-[#1c1412]/8 bg-white">
        <div className="border-b border-[#1c1412]/8 px-4 py-3">
          <h2 className="text-base font-semibold tracking-tight">Children</h2>
          <p className="text-xs text-[#8a756d]">
            {children.length} linked to Jane Cole
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="bg-[#faf7f4] text-xs tracking-wide text-[#6d5c56] uppercase">
              <tr>
                <th className="px-4 py-2 font-semibold">Child</th>
                <th className="px-4 py-2 font-semibold">School</th>
                <th className="px-4 py-2 font-semibold">Class</th>
                <th className="px-4 py-2 font-semibold">Teacher</th>
                <th className="px-4 py-2 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {children.map((child) => (
                <tr key={child.name} className="border-t border-[#1c1412]/6">
                  <td className="px-4 py-2.5 font-medium">{child.name}</td>
                  <td className="px-4 py-2.5 text-[#6d5c56]">
                    {child.school}
                    <span className="block text-xs text-[#8a756d]">{child.city}</span>
                  </td>
                  <td className="px-4 py-2.5 text-[#6d5c56]">{child.room}</td>
                  <td className="px-4 py-2.5 text-[#6d5c56]">{child.teacher}</td>
                  <td className="px-4 py-2.5">
                    <span className="inline-flex rounded-full bg-[#e7f6ee] px-2 py-0.5 text-xs font-semibold text-[#1f7a4d]">
                      {child.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </ParentShell>
  );
}
