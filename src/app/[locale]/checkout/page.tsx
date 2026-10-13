import { addDays, format } from "date-fns";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { decodeToken } from "@/lib/booking-token";
import { prisma } from "@/lib/db";
import { pickHotel, pickPackage } from "@/lib/content";
import {
  flightTotal,
  hotelTotal,
  nightsBetween,
  taxesFor,
} from "@/lib/pricing";
import { formatDate, formatDuration, formatTime } from "@/lib/format";
import { findAirport } from "@/lib/data/airports";
import { airlineByCode } from "@/lib/data/airlines";
import type { CheckoutData } from "@/lib/checkout";
import type { CabinClass, FlightOffer, TripType } from "@/lib/types";
import type { Locale } from "@/i18n/routing";
import CheckoutForm from "@/components/booking/CheckoutForm";

const str = (v: string | string[] | undefined) =>
  typeof v === "string" ? v : "";

export default async function CheckoutPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const l = locale as Locale;
  const sp = await searchParams;
  const t = await getTranslations("checkout");
  const ts = await getTranslations("search");
  const tf = await getTranslations("flights");
  const tc = await getTranslations("common");

  const type = str(sp.type);
  const id = str(sp.id);
  let data: CheckoutData | null = null;

  if (type === "flight") {
    const flight = decodeToken<Omit<FlightOffer, "id">>(id);
    if (flight) {
      const trip: TripType = sp.trip === "oneway" ? "oneway" : "roundtrip";
      const adults = Number(sp.adults) || 1;
      const children = Number(sp.children) || 0;
      const infants = Number(sp.infants) || 0;
      const base = flightTotal(flight.price, trip, adults, children, infants);
      const taxes = taxesFor(base);
      const oAp = findAirport(flight.origin);
      const dAp = findAirport(flight.destination);
      const airline = airlineByCode(flight.airlineCode);
      const oCity = oAp ? (l === "ar" ? oAp.cityAr : oAp.city) : flight.origin;
      const dCity = dAp ? (l === "ar" ? dAp.cityAr : dAp.city) : flight.destination;
      const stopsLabel =
        flight.stops === 0
          ? tc("nonstop")
          : flight.stops === 1
            ? tc("oneStop")
            : tc("stops", { count: flight.stops });

      data = {
        type: "flight",
        itemId: id,
        summary: {
          title: `${oCity} → ${dCity}`,
          subtitle: `${airline ? (l === "ar" ? airline.nameAr : airline.name) : flight.airlineCode} · ${flight.flightNumber}`,
          lines: [
            {
              label: ts("depart"),
              value: `${formatDate(flight.departISO, l)} · ${formatTime(flight.departISO, l)}`,
            },
            {
              label: tf("duration"),
              value: `${formatDuration(flight.durationMin, l)} · ${stopsLabel}`,
            },
            { label: ts("cabinLabel"), value: ts(`cabin.${flight.cabin}`) },
            {
              label: ts("travellers"),
              value: `${adults + children + infants}`,
            },
          ],
        },
        pricing: { base, taxes, total: base + taxes, currency: "SAR" },
        snapshot: {
          type: "flight",
          route: `${oCity} → ${dCity}`,
          airline: airline?.name ?? flight.airlineCode,
          airlineCode: flight.airlineCode,
          flightNumber: flight.flightNumber,
          departISO: flight.departISO,
          arriveISO: flight.arriveISO,
          cabin: flight.cabin as CabinClass,
          trip,
          adults,
          children,
          infants,
        },
      };
    }
  } else if (type === "hotel") {
    const row = await prisma.hotel.findUnique({ where: { slug: id } });
    if (row) {
      const hotel = pickHotel(row, l);
      const checkin =
        str(sp.checkin) || format(addDays(new Date(), 3), "yyyy-MM-dd");
      const checkout =
        str(sp.checkout) || format(addDays(new Date(), 5), "yyyy-MM-dd");
      const rooms = Number(sp.rooms) || 1;
      const adults = Number(sp.adults) || 2;
      const children = Number(sp.children) || 0;
      const nights = nightsBetween(checkin, checkout);
      const base = hotelTotal(hotel.pricePerNight, nights, rooms);
      const taxes = taxesFor(base);

      data = {
        type: "hotel",
        itemId: id,
        summary: {
          title: hotel.name,
          subtitle: `${hotel.city}, ${hotel.country}`,
          image: hotel.images[0],
          lines: [
            { label: ts("checkin"), value: formatDate(checkin, l) },
            { label: ts("checkout"), value: formatDate(checkout, l) },
            {
              label: ts("rooms"),
              value: `${rooms} · ${nights} × ${adults + children}`,
            },
          ],
        },
        pricing: { base, taxes, total: base + taxes, currency: "SAR" },
        snapshot: {
          type: "hotel",
          hotelName: hotel.name,
          city: hotel.city,
          checkin,
          checkout,
          nights,
          rooms,
          adults,
          children,
        },
      };
    }
  } else if (type === "package") {
    const row = await prisma.package.findUnique({ where: { slug: id } });
    if (row) {
      const pkg = pickPackage(row, l);
      const pax = Math.max(
        1,
        (Number(sp.adults) || 0) + (Number(sp.children) || 0) || 1,
      );
      const base = pkg.price * pax;
      const taxes = taxesFor(base);

      data = {
        type: "package",
        itemId: id,
        summary: {
          title: pkg.title,
          subtitle: pkg.destination,
          image: pkg.image,
          lines: [
            { label: "✈", value: pkg.flightSummary },
            { label: "🏨", value: pkg.hotelSummary },
            { label: ts("travellers"), value: `${pax}` },
          ],
        },
        pricing: { base, taxes, total: base + taxes, currency: "SAR" },
        snapshot: {
          type: "package",
          title: pkg.title,
          destination: pkg.destination,
          nights: pkg.nights,
          pax,
        },
      };
    }
  }

  if (!data) {
    return (
      <div className="mx-auto max-w-lg px-4 py-20 text-center">
        <p className="text-lg font-semibold text-slate-700">
          {t("invalidItem")}
        </p>
        <Link
          href="/"
          className="mt-4 inline-block rounded-xl bg-brand-600 px-5 py-2.5 font-semibold text-white"
        >
          {t("title")}
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-extrabold text-slate-800">
        {t("title")}
      </h1>
      <CheckoutForm data={data} />
    </div>
  );
}
