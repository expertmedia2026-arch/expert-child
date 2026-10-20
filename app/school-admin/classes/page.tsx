import { SchoolAdminShell } from "@/components/school-admin-shell";
import { SchoolClasses } from "@/components/school-classes";

export const metadata = {
  title: "Manage Classes — School Admin",
  description: "Classes at Riverside Primary.",
};

export default function SchoolClassesPage() {
  return (
    <SchoolAdminShell current="classes">
      <SchoolClasses />
    </SchoolAdminShell>
  );
}
