import { airlines } from "@/lib/data/airlines";
import { findAirport, type Airport } from "@/lib/data/airports";
import { encodeToken } from "@/lib/booking-token";
import type { CabinClass, FlightOffer } from "@/lib/types";

// --- deterministic PRNG so the same search always yields the same results ---
function hashString(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function haversineKm(a: Airport, b: Airport): number {
  const toRad = (d: number) => (d * Math.PI) / 180;
  const R = 6371;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

const CABIN_MULT: Record<CabinClass, number> = {
  economy: 1,
  premium: 1.65,
  business: 2.9,
  first: 4.3,
};

const pad2 = (n: number) => n.toString().padStart(2, "0");

// Build a naive local ISO string ("YYYY-MM-DDTHH:mm:00"), rolling to later days
// when minutes exceed 24h. Formatting stays consistent regardless of server TZ.
function buildISO(dateStr: string, minutesFromMidnight: number): string {
  const dayOffset = Math.floor(minutesFromMidnight / 1440);
  const rem = ((minutesFromMidnight % 1440) + 1440) % 1440;
  const hh = Math.floor(rem / 60);
  const mm = rem % 60;
  const [y, m, d] = dateStr.split("-").map(Number);
  const base = new Date(Date.UTC(y, m - 1, d));
  base.setUTCDate(base.getUTCDate() + dayOffset);
  return `${base.getUTCFullYear()}-${pad2(base.getUTCMonth() + 1)}-${pad2(
    base.getUTCDate(),
  )}T${pad2(hh)}:${pad2(mm)}:00`;
}

export function generateFlights(
  origin: string,
  destination: string,
  departDate: string,
  cabin: CabinClass,
): FlightOffer[] {
  const o = findAirport(origin);
  const d = findAirport(destination);
  if (!o || !d || o.code === d.code) return [];

  const distance = haversineKm(o, d);
  const rand = mulberry32(
    hashString(`${o.code}-${d.code}-${departDate}-${cabin}`),
  );

  const count = 7 + Math.floor(rand() * 5); // 7–11 results
  const baseDurationMin = Math.round((distance / 780) * 60) + 40;
  const basePrice = 150 + distance * 0.32;

  const flights: FlightOffer[] = [];
  for (let i = 0; i < count; i++) {
    const airline = airlines[Math.floor(rand() * airlines.length)];
    const departMin = 300 + Math.floor(rand() * 68) * 15; // 05:00 – ~22:00
    const longHaul = distance > 2500;
    const stops = longHaul
      ? rand() < 0.5
        ? 1
        : 0
      : rand() < 0.18
        ? 1
        : 0;
    const layover = stops === 1 ? 55 + Math.floor(rand() * 130) : 0;
    const durationMin =
      baseDurationMin + layover + Math.floor((rand() - 0.5) * 30);
    const priceVar = 0.85 + rand() * 0.5;
    const stopFactor = stops === 1 ? 0.85 : 1.08; // nonstop carries a premium
    const price =
      Math.round((basePrice * CABIN_MULT[cabin] * priceVar * stopFactor) / 5) *
      5;

    const base = {
      airlineCode: airline.code,
      flightNumber: `${airline.code}${100 + Math.floor(rand() * 899)}`,
      origin: o.code,
      destination: d.code,
      departISO: buildISO(departDate, departMin),
      arriveISO: buildISO(departDate, departMin + durationMin),
      durationMin,
      stops,
      cabin,
      price,
      seatsLeft: 1 + Math.floor(rand() * 9),
    };
    flights.push({ id: encodeToken(base), ...base });
  }

  flights.sort((a, b) => a.departISO.localeCompare(b.departISO));
  return flights;
}
