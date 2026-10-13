import type { TripType } from "@/lib/types";

// Round-trip carries roughly 1.9x the one-way fare.
export function flightUnitPrice(oneWay: number, trip: TripType): number {
  return trip === "roundtrip" ? Math.round(oneWay * 1.9) : oneWay;
}

// Children pay 75% and infants 10% of the adult fare (typical airline model).
export function flightTotal(
  oneWay: number,
  trip: TripType,
  adults: number,
  children: number,
  infants: number,
): number {
  const unit = flightUnitPrice(oneWay, trip);
  return Math.round(unit * (adults + children * 0.75 + infants * 0.1));
}

export function nightsBetween(checkin: string, checkout: string): number {
  const a = new Date(checkin).getTime();
  const b = new Date(checkout).getTime();
  const n = Math.round((b - a) / (1000 * 60 * 60 * 24));
  return Math.max(1, n);
}

export function hotelTotal(
  pricePerNight: number,
  nights: number,
  rooms: number,
): number {
  return pricePerNight * nights * rooms;
}

// Taxes & fees shown at checkout (demo): 15% VAT-style component.
export function taxesFor(base: number): number {
  return Math.round(base * 0.15);
}
