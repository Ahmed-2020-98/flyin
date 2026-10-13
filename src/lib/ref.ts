// Human-friendly booking reference, e.g. "FLY-8K3QP2" (no ambiguous 0/O/1/I).
const CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

export function generateReference(prefix = "FLY"): string {
  let s = "";
  for (let i = 0; i < 6; i++) {
    s += CHARS[Math.floor(Math.random() * CHARS.length)];
  }
  return `${prefix}-${s}`;
}
