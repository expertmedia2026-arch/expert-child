import { Suspense, type ReactNode } from "react";
import { requireExpertAdmin } from "@/lib/auth";

export default function ExpertAdminLayout({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={null}>
      <ExpertAdminGate>{children}</ExpertAdminGate>
    </Suspense>
  );
}

async function ExpertAdminGate({ children }: { children: ReactNode }) {
  await requireExpertAdmin();
  return children;
}
