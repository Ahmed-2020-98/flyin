"use client";

import { useMemo, useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import FlightCard from "./FlightCard";
import AirlineBadge from "./AirlineBadge";
import { formatCurrency } from "@/lib/format";
import { flightUnitPrice } from "@/lib/pricing";
import type { Locale } from "@/i18n/routing";
import type { FlightOffer, TripType } from "@/lib/types";

type Stops = "any" | "0" | "1";
type Sort = "cheapest" | "fastest" | "earliest";

export default function FlightResults({
  flights,
  trip,
  adults,
  children,
  infants,
}: {
  flights: FlightOffer[];
  trip: TripType;
  adults: number;
  children: number;
  infants: number;
}) {
  const locale = useLocale() as Locale;
  const isAr = locale === "ar";
  const t = useTranslations("flights");
  const tc = useTranslations("common");

  const units = flights.map((f) => flightUnitPrice(f.price, trip));
  const minP = Math.min(...units);
  const maxP = Math.max(...units);

  const [stops, setStops] = useState<Stops>("any");
  const [selectedAirlines, setSelectedAirlines] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState(maxP);
  const [sort, setSort] = useState<Sort>("cheapest");
  const [showFilters, setShowFilters] = useState(false);

  const airlineCodes = useMemo(
    () => Array.from(new Set(flights.map((f) => f.airlineCode))),
    [flights],
  );

  const filtered = useMemo(() => {
    const list = flights.filter((f) => {
      if (stops !== "any" && f.stops !== Number(stops)) return false;
      if (selectedAirlines.length && !selectedAirlines.includes(f.airlineCode))
        return false;
      if (flightUnitPrice(f.price, trip) > maxPrice) return false;
      return true;
    });
    return list.sort((a, b) => {
      if (sort === "cheapest")
        return flightUnitPrice(a.price, trip) - flightUnitPrice(b.price, trip);
      if (sort === "fastest") return a.durationMin - b.durationMin;
      return a.departISO.localeCompare(b.departISO);
    });
  }, [flights, stops, selectedAirlines, maxPrice, sort, trip]);

  const toggleAirline = (code: string) =>
    setSelectedAirlines((s) =>
      s.includes(code) ? s.filter((x) => x !== code) : [...s, code],
    );

  const clearAll = () => {
    setStops("any");
    setSelectedAirlines([]);
    setMaxPrice(maxP);
  };

  const pill = (active: boolean) =>
    `flex-1 rounded-lg px-2 py-1.5 text-xs font-semibold transition ${
      active
        ? "bg-brand-600 text-white"
        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
    }`;

  return (
    <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
      <aside className={`${showFilters ? "block" : "hidden"} lg:block`}>
        <div className="space-y-5 rounded-2xl bg-white p-5 shadow-card">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-800">{t("filters")}</h3>
            <button
              type="button"
              onClick={clearAll}
              className="text-xs font-semibold text-brand-600"
            >
              {t("clear")}
            </button>
          </div>

          <div>
            <p className="mb-2 text-sm font-semibold text-slate-700">
              {t("stopsFilter")}
            </p>
            <div className="flex gap-2">
              {(["any", "0", "1"] as Stops[]).map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setStops(s)}
                  className={pill(stops === s)}
                >
                  {s === "any"
                    ? t("anyStops")
                    : s === "0"
                      ? tc("nonstop")
                      : tc("oneStop")}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-2 flex justify-between text-sm font-semibold text-slate-700">
              <span>{t("priceFilter")}</span>
              <span className="text-brand-700">
                {formatCurrency(maxPrice, locale)}
              </span>
            </p>
            <input
              type="range"
              min={minP}
              max={maxP}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-brand-600"
            />
          </div>

          <div>
            <p className="mb-2 text-sm font-semibold text-slate-700">
              {t("airlinesFilter")}
            </p>
            <div className="no-scrollbar max-h-52 space-y-2 overflow-auto">
              {airlineCodes.map((code) => (
                <label
                  key={code}
                  className="flex cursor-pointer items-center gap-2 text-sm"
                >
                  <input
                    type="checkbox"
                    checked={selectedAirlines.includes(code)}
                    onChange={() => toggleAirline(code)}
                    className="accent-brand-600"
                  />
                  <AirlineBadge code={code} showName isAr={isAr} />
                </label>
              ))}
            </div>
          </div>
        </div>
      </aside>

      <div>
        <div className="mb-4 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => setShowFilters((s) => !s)}
            className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold lg:hidden"
          >
            <SlidersHorizontal className="h-4 w-4" />
            {t("filters")}
          </button>
          <p className="hidden text-sm text-slate-500 sm:block">
            {t("results", { count: filtered.length })}
          </p>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as Sort)}
            className="field !w-auto !py-2 text-sm"
          >
            <option value="cheapest">{t("sort.cheapest")}</option>
            <option value="fastest">{t("sort.fastest")}</option>
            <option value="earliest">{t("sort.earliest")}</option>
          </select>
        </div>

        <div className="space-y-3">
          {filtered.length === 0 ? (
            <div className="rounded-2xl bg-white p-10 text-center shadow-card">
              <p className="font-semibold text-slate-700">{tc("noResults")}</p>
              <p className="mt-1 text-sm text-slate-500">
                {t("noResultsHint")}
              </p>
            </div>
          ) : (
            filtered.map((f) => (
              <FlightCard
                key={f.id}
                flight={f}
                trip={trip}
                adults={adults}
                children={children}
                infants={infants}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
