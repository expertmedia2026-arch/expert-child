import { createHmac, timingSafeEqual } from "node:crypto";

const ROLE = "EXPERT_ADMIN";

export const sessionCookie = "expert_child_session";

export type ExpertSession = {
  sub: string;
  role: typeof ROLE;
  exp: number;
};

function secret() {
  const value = process.env.SESSION_SECRET;
  if (!value) return null;
  return value;
}

export function signSession(userId: string, maxAgeSeconds: number) {
  const key = secret();
  if (!key) return null;
  const payload = Buffer.from(
    JSON.stringify({
      sub: userId,
      role: ROLE,
      exp: Date.now() + maxAgeSeconds * 1000,
    } satisfies ExpertSession),
  ).toString("base64url");
  const signature = createHmac("sha256", key).update(payload).digest("base64url");
  return `${payload}.${signature}`;
}

export function readSession(token: string | undefined | null): ExpertSession | null {
  const key = secret();
  if (!key || !token) return null;
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return null;

  const expected = createHmac("sha256", key).update(payload).digest("base64url");
  const actualBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expected);
  if (actualBuffer.length !== expectedBuffer.length || !timingSafeEqual(actualBuffer, expectedBuffer)) {
    return null;
  }

  try {
    const data = JSON.parse(Buffer.from(payload, "base64url").toString()) as ExpertSession;
    if (data.role !== ROLE || typeof data.sub !== "string" || data.sub.length === 0) return null;
    if (typeof data.exp !== "number" || data.exp < Date.now()) return null;
    return data;
  } catch {
    return null;
  }
}
