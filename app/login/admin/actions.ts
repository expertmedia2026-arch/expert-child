"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { verifyPassword } from "@/lib/password";
import { createSession } from "@/lib/session";

export async function signInAdmin(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  if (!email || !password) redirect("/login/admin?error=credentials");

  const user = await prisma.user.findUnique({ where: { email } });
  const passwordMatches = Boolean(user?.passwordHash && verifyPassword(password, user.passwordHash));
  if (!user || !passwordMatches) redirect("/login/admin?error=credentials");
  if (user.role !== "EXPERT_ADMIN" || user.status !== "ACTIVE") redirect("/login/admin?error=role");

  const signedIn = await createSession(user.id);
  if (!signedIn) redirect("/login/admin?error=config");
  redirect("/expert-admin");
}
