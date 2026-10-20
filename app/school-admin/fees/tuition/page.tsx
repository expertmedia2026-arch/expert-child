import { SchoolAdminShell } from "@/components/school-admin-shell";
import { SchoolTuition } from "@/components/school-tuition";

export const metadata = {
  title: "Tuition — School Admin",
  description: "Manage tuition fees at Riverside Primary.",
};

export default function SchoolTuitionPage() {
  return (
    <SchoolAdminShell current="tuition">
      <SchoolTuition />
    </SchoolAdminShell>
  );
}
