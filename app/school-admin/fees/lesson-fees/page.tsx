import { SchoolAdminShell } from "@/components/school-admin-shell";

export const metadata = {
  title: "Lesson Fees — School Admin",
  description: "Manage lesson fees at Riverside Primary.",
};

export default function SchoolLessonFeesPage() {
  return (
    <SchoolAdminShell current="lesson-fees">
      <section className="rounded-2xl border border-[#1c1412]/8 bg-white px-4 py-3">
        <h2 className="text-base font-semibold tracking-tight">Lesson Fees</h2>
        <p className="text-xs text-[#8a756d]">Riverside Primary · Term 1 · ₦18,000</p>
      </section>
    </SchoolAdminShell>
  );
}
