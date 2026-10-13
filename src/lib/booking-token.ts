// Compact, URL-safe encoding used to carry a selected offer (flight / hotel /
// package snapshot) from search results into the checkout flow without needing
// to persist search results. Runs server-side (Buffer) where these are decoded.

export function encodeToken(obj: unknown): string {
  return Buffer.from(JSON.stringify(obj), "utf8").toString("base64url");
}

export function decodeToken<T>(token: string): T | null {
  try {
    return JSON.parse(
      Buffer.from(token, "base64url").toString("utf8"),
    ) as T;
  } catch {
    return null;
  }
}
