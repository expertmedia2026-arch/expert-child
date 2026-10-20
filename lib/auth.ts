import { connection } from "next/server";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";

export async function requireExpertAdmin() {
  await connection();
  const session = await getSession();
  if (!session) redirect("/login/admin");

  const user = await prisma.user.findUnique({
    where: { id: session.sub },
    select: { id: true, role: true, status: true },
  });

  if (!user || user.role !== "EXPERT_ADMIN" || user.status !== "ACTIVE") {
    redirect("/login/admin");
  }

  return user;
}
