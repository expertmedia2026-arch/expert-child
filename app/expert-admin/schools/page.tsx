import { AdminShell } from "@/components/admin-shell";
import { SchoolsDirectory } from "@/components/schools-directory";

export const metadata = {
  title: "Schools — Expert Admin",
  description: "Schools in the Expert Child portal.",
};

export default function SchoolsPage() {
  return (
    <AdminShell current="schools">
      <SchoolsDirectory />
    </AdminShell>
  );
}
