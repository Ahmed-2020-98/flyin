import { NextRequest, NextResponse } from "next/server";
import { generateFlights } from "@/lib/mock/flights";
import type { CabinClass } from "@/lib/types";

const CABINS = ["economy", "premium", "business", "first"];

export async function GET(req: NextRequest) {
  const sp = req.nextUrl.searchParams;
  const origin = (sp.get("origin") ?? "").toUpperCase();
  const destination = (sp.get("destination") ?? "").toUpperCase();
  const depart = sp.get("depart") ?? "";
  const cabinParam = sp.get("cabin") ?? "economy";
  const cabin = (CABINS.includes(cabinParam) ? cabinParam : "economy") as CabinClass;

  if (!origin || !destination || !depart) {
    return NextResponse.json(
      { error: "origin, destination and depart are required" },
      { status: 400 },
    );
  }

  const flights = generateFlights(origin, destination, depart, cabin);
  return NextResponse.json({ count: flights.length, flights });
}
