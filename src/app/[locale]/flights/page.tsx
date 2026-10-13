import { PlaneTakeoff } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { generateFlights } from "@/lib/mock/flights";
import { findAirport } from "@/lib/data/airports";
import { formatDate } from "@/lib/format";
import type { CabinClass, TripType } from "@/lib/types";
import type { Locale } from "@/i18n/routing";
import SearchWidget from "@/components/search/SearchWidget";
import FlightResults from "@/components/flights/FlightResults";

const CABINS = ["economy", "premium", "business", "first"];
const str = (v: string | string[] | undefined) =>
  typeof v === "string" ? v : "";

export default async function FlightsPage({
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
  const t = await getTranslations("flights");

  const origin = str(sp.origin).toUpperCase();
  const destination = str(sp.destination).toUpperCase();
  const depart = str(sp.depart);
  const ret = str(sp.return) || undefined;
  const trip: TripType = sp.trip === "oneway" ? "oneway" : "roundtrip";
  const cabin = (CABINS.includes(str(sp.cabin))
    ? str(sp.cabin)
    : "economy") as CabinClass;
  const adults = Number(sp.adults) || 1;
  const children = Number(sp.children) || 0;
  const infants = Number(sp.infants) || 0;

  const hasQuery = Boolean(origin && destination && depart);
  const flights = hasQuery
    ? generateFlights(origin, destination, depart, cabin)
    : [];

  const oAp = findAirport(origin);
  const dAp = findAirport(destination);
  const oCity = oAp ? (l === "ar" ? oAp.cityAr : oAp.city) : origin;
  const dCity = dAp ? (l === "ar" ? dAp.cityAr : dAp.city) : destination;

  return (
    <div>
      <div className="bg-brand-800">
        <div className="mx-auto max-w-7xl px-4 py-6">
          <SearchWidget
            defaultTab="flights"
            initial={{
              tab: "flights",
              trip,
              origin: origin || undefined,
              destination: destination || undefined,
              depart: depart || undefined,
              ret,
              travellers: { adults, children, infants, cabin },
            }}
          />
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8">
        {!hasQuery ? (
          <div className="rounded-2xl bg-white p-12 text-center shadow-card">
            <PlaneTakeoff className="mx-auto h-10 w-10 text-brand-400" />
            <h1 className="mt-3 text-lg font-bold text-slate-800">
              {t("title")}
            </h1>
            <p className="mt-1 text-sm text-slate-500">{t("noResultsHint")}</p>
          </div>
        ) : (
          <>
            <div className="mb-5">
              <h1 className="flex items-center gap-2 text-xl font-bold text-slate-800">
                {oCity}
                <PlaneTakeoff className="h-5 w-5 text-brand-500 rtl:-scale-x-100" />
                {dCity}
              </h1>
              <p className="mt-1 text-sm text-slate-500">
                {formatDate(depart, l)} · {t("results", { count: flights.length })}
              </p>
            </div>
            <FlightResults
              flights={flights}
              trip={trip}
              adults={adults}
              children={children}
              infants={infants}
            />
          </>
        )}
      </div>
    </div>
  );
}
