import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSessionUser } from "@/lib/auth";
import { bookingSchema } from "@/lib/validation";
import { generateReference } from "@/lib/ref";

export async function POST(req: NextRequest) {
  const session = await getSessionUser();
  if (!session) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  const parsed = bookingSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }

  const { type, totalPrice, currency, details } = parsed.data;

  // Create with a unique reference, retrying once on the rare collision.
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const booking = await prisma.booking.create({
        data: {
          reference: generateReference(),
          userId: session.userId,
          type,
          status: "confirmed",
          totalPrice,
          currency,
          details: JSON.stringify(details),
        },
      });
      return NextResponse.json({ ok: true, reference: booking.reference });
    } catch {
      // Unique constraint on reference — try again with a new one.
      if (attempt === 2) {
        return NextResponse.json({ error: "server" }, { status: 500 });
      }
    }
  }
  return NextResponse.json({ error: "server" }, { status: 500 });
}

export async function GET() {
  const session = await getSessionUser();
  if (!session) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const bookings = await prisma.booking.findMany({
    where: { userId: session.userId },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json({ bookings });
}
