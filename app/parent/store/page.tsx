import { ParentShell } from "@/components/parent-shell";
import { ParentStore } from "@/components/parent-store";

export const metadata = {
  title: "Store — Parent",
  description: "School store for children linked to your Expert Child parent account.",
};

export default function ParentStorePage() {
  return (
    <ParentShell current="store">
      <ParentStore />
    </ParentShell>
  );
}
