import { AdminShell } from "@/components/admin-shell";

export const metadata = {
  title: "Books — Expert Admin",
  description: "Manage book fees in the Expert Child portal.",
};

export default function BookFeesPage() {
  return (
    <AdminShell current="books">
      <section className="rounded-2xl border border-[#1c1412]/8 bg-white px-4 py-3">
        <h2 className="text-base font-semibold tracking-tight">Books</h2>
        <p className="text-xs text-[#8a756d]">Manage book fees</p>
      </section>
    </AdminShell>
  );
}
