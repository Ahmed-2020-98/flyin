import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(req: NextRequest) {
  const city = req.nextUrl.searchParams.get("city") ?? "";
  const where = city
    ? { OR: [{ city: { contains: city } }, { cityAr: { contains: city } }] }
    : {};
  const hotels = await prisma.hotel.findMany({ where });
  return NextResponse.json({ count: hotels.length, hotels });
}
