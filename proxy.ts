import { NextResponse } from "next/server";
import { readSession } from "@/lib/session-token";

const sessionCookie = "expert_child_session";

function sessionToken(request: Request) {
  const header = request.headers.get("cookie");
  if (!header) return null;
  for (const part of header.split(";")) {
    const [name, ...rest] = part.trim().split("=");
    if (name === sessionCookie) return decodeURIComponent(rest.join("="));
  }
  return null;
}

export function proxy(request: Request) {
  if (readSession(sessionToken(request))) return NextResponse.next();

  const login = new URL("/login/admin", request.url);
  return NextResponse.redirect(login);
}

export const config = {
  matcher: ["/expert-admin", "/expert-admin/:path*"],
};
