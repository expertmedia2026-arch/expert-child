import { AdminShell } from "@/components/admin-shell";

export const metadata = {
  title: "Tuition — Expert Admin",
  description: "Manage tuition fees in the Expert Child portal.",
};

export default function TuitionFeesPage() {
  return (
    <AdminShell current="tuition">
      <section className="rounded-2xl border border-[#1c1412]/8 bg-white px-4 py-3">
        <h2 className="text-base font-semibold tracking-tight">Tuition</h2>
        <p className="text-xs text-[#8a756d]">Manage tuition fees</p>
      </section>
    </AdminShell>
  );
}
