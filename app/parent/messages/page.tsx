import { ParentMessages } from "@/components/parent-messages";
import { ParentShell } from "@/components/parent-shell";

export const metadata = {
  title: "Messages — Parent",
  description: "School messages for your Expert Child parent account.",
};

export default function ParentMessagesPage() {
  return (
    <ParentShell current="messages">
      <ParentMessages />
    </ParentShell>
  );
}
