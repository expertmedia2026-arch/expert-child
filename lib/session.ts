import { connection } from "next/server";
import { cookies } from "next/headers";
import { readSession, sessionCookie, signSession, type ExpertSession } from "@/lib/session-token";

export { sessionCookie };
const maxAge = 60 * 60 * 24 * 7;

export async function createSession(userId: string) {
  const token = signSession(userId, maxAge);
  if (!token) return false;
  const cookieStore = await cookies();
  cookieStore.set(sessionCookie, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge,
  });
  return true;
}

export async function clearSession() {
  const cookieStore = await cookies();
  cookieStore.delete(sessionCookie);
}

export async function getSession(): Promise<ExpertSession | null> {
  await connection();
  const cookieStore = await cookies();
  return readSession(cookieStore.get(sessionCookie)?.value);
}
