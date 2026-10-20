import { SchoolAdminShell } from "@/components/school-admin-shell";

export const metadata = {
  title: "Books — School Admin",
  description: "Manage book fees at Riverside Primary.",
};

export default function SchoolBooksPage() {
  return (
    <SchoolAdminShell current="books">
      <section className="rounded-2xl border border-[#1c1412]/8 bg-white px-4 py-3">
        <h2 className="text-base font-semibold tracking-tight">Books</h2>
        <p className="text-xs text-[#8a756d]">Riverside Primary · Term 1 · ₦24,500</p>
      </section>
    </SchoolAdminShell>
  );
}
