import { Suspense } from "react";
import { AdminShell } from "@/components/admin-shell";
import { SchoolsDirectory } from "@/components/schools-directory";
import { listSchools } from "@/lib/directory-schools";

export const metadata = {
  title: "Schools — Expert Admin",
  description: "Schools in the Expert Child portal.",
};

export default function SchoolsPage() {
  return (
    <AdminShell current="schools">
      <Suspense fallback={<SchoolsFallback />}>
        <SchoolsFromDatabase />
      </Suspense>
    </AdminShell>
  );
}

async function SchoolsFromDatabase() {
  try {
    const schools = await listSchools();
    return <SchoolsDirectory schools={schools} />;
  } catch {
    return (
      <section className="rounded-2xl border border-[#1c1412]/8 bg-white px-4 py-8">
        <h2 className="text-base font-semibold tracking-tight">Schools</h2>
        <p className="mt-2 text-sm text-[#6d5c56]">Schools could not be loaded from the database.</p>
      </section>
    );
  }
}

function SchoolsFallback() {
  return (
    <section className="rounded-2xl border border-[#1c1412]/8 bg-white px-4 py-8">
      <h2 className="text-base font-semibold tracking-tight">Schools</h2>
      <p className="mt-2 text-sm text-[#6d5c56]">Loading schools…</p>
    </section>
  );
}
