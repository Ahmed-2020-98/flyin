import { NextRequest, NextResponse } from "next/server";
import { searchAirports } from "@/lib/data/airports";

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q") ?? "";
  return NextResponse.json({ airports: searchAirports(q) });
}
