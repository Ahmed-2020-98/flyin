import { SignJWT, jwtVerify } from "jose";

// Edge-safe session helpers (jose only — no bcrypt/node APIs) so they can run
// inside middleware as well as in route handlers / server components.

export const SESSION_COOKIE = "flyin_session";

const secret = new TextEncoder().encode(
  process.env.AUTH_SECRET ?? "insecure-dev-secret",
);

export type SessionPayload = {
  userId: string;
  name: string;
  email: string;
};

export async function signSession(payload: SessionPayload): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret);
}

export async function verifySession(
  token: string,
): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, secret);
    return {
      userId: String(payload.userId),
      name: String(payload.name),
      email: String(payload.email),
    };
  } catch {
    return null;
  }
}
