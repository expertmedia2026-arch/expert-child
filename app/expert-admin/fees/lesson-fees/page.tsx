import { AdminShell } from "@/components/admin-shell";

export const metadata = {
  title: "Lesson Fees — Expert Admin",
  description: "Manage lesson fees in the Expert Child portal.",
};

export default function LessonFeesPage() {
  return (
    <AdminShell current="lesson-fees">
      <section className="rounded-2xl border border-[#1c1412]/8 bg-white px-4 py-3">
        <h2 className="text-base font-semibold tracking-tight">Lesson Fees</h2>
        <p className="text-xs text-[#8a756d]">Manage lesson fees</p>
      </section>
    </AdminShell>
  );
}
