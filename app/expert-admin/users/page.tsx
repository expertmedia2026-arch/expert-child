import { Suspense } from "react";
import { AdminShell } from "@/components/admin-shell";
import { UsersDirectory } from "@/components/users-directory";
import { listDirectory } from "@/lib/directory-users";

export const metadata = {
  title: "Users — Expert Admin",
  description: "Users in the Expert Child portal.",
};

export default function UsersPage() {
  return (
    <AdminShell current="users">
      <Suspense fallback={<UsersFallback />}>
        <UsersFromDatabase />
      </Suspense>
    </AdminShell>
  );
}

async function UsersFromDatabase() {
  try {
    const directory = await listDirectory();
    return <UsersDirectory users={directory.users} schools={directory.schools} />;
  } catch {
    return (
      <section className="rounded-2xl border border-[#1c1412]/8 bg-white px-4 py-8">
        <h2 className="text-base font-semibold tracking-tight">Users</h2>
        <p className="mt-2 text-sm text-[#6d5c56]">Users could not be loaded from the database.</p>
      </section>
    );
  }
}

function UsersFallback() {
  return (
    <section className="rounded-2xl border border-[#1c1412]/8 bg-white px-4 py-8">
      <h2 className="text-base font-semibold tracking-tight">Users</h2>
      <p className="mt-2 text-sm text-[#6d5c56]">Loading users…</p>
    </section>
  );
}
