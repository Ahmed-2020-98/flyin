"use client";

import { Plane } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import AirlineBadge from "./AirlineBadge";
import { formatCurrency, formatDuration, formatTime } from "@/lib/format";
import { flightUnitPrice } from "@/lib/pricing";
import type { Locale } from "@/i18n/routing";
import type { FlightOffer, TripType } from "@/lib/types";

export default function FlightCard({
  flight,
  trip,
  adults,
  children,
  infants,
}: {
  flight: FlightOffer;
  trip: TripType;
  adults: number;
  children: number;
  infants: number;
}) {
  const locale = useLocale() as Locale;
  const isAr = locale === "ar";
  const t = useTranslations("flights");
  const tc = useTranslations("common");

  const unit = flightUnitPrice(flight.price, trip);
  const stopsLabel =
    flight.stops === 0
      ? tc("nonstop")
      : flight.stops === 1
        ? tc("oneStop")
        : tc("stops", { count: flight.stops });

  const dayDiff = Math.round(
    (new Date(flight.arriveISO.slice(0, 10)).getTime() -
      new Date(flight.departISO.slice(0, 10)).getTime()) /
      86400000,
  );

  return (
    <div className="rounded-2xl bg-white p-4 shadow-card transition hover:shadow-float sm:p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="sm:w-44">
          <AirlineBadge code={flight.airlineCode} showName isAr={isAr} />
          <p className="mt-1 text-xs text-slate-400">{flight.flightNumber}</p>
        </div>

        <div className="flex flex-1 items-center gap-3">
          <div className="text-center">
            <p className="text-xl font-bold text-slate-800">
              {formatTime(flight.departISO, locale)}
            </p>
            <p className="text-xs text-slate-400">{flight.origin}</p>
          </div>

          <div className="flex-1 text-center">
            <p className="text-xs text-slate-400">
              {formatDuration(flight.durationMin, locale)}
            </p>
            <div className="relative my-1.5 h-px bg-slate-200">
              <Plane className="absolute end-0 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-brand-400 rtl:rotate-180" />
            </div>
            <p className="text-xs font-medium text-slate-500">{stopsLabel}</p>
          </div>

          <div className="text-center">
            <p className="text-xl font-bold text-slate-800">
              {formatTime(flight.arriveISO, locale)}
              {dayDiff > 0 && (
                <sup className="ms-0.5 text-[10px] font-semibold text-accent-600">
                  +{dayDiff}
                </sup>
              )}
            </p>
            <p className="text-xs text-slate-400">{flight.destination}</p>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 border-t border-slate-100 pt-3 sm:w-48 sm:flex-col sm:items-end sm:border-t-0 sm:pt-0">
          <div className="text-end">
            <p className="text-lg font-extrabold text-brand-700">
              {formatCurrency(unit, locale)}
            </p>
            <p className="text-[11px] text-slate-400">{t("perAdult")}</p>
          </div>
          <Link
            href={{
              pathname: "/checkout",
              query: {
                type: "flight",
                id: flight.id,
                trip,
                adults: String(adults),
                children: String(children),
                infants: String(infants),
              },
            }}
            className="rounded-xl bg-accent-500 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-accent-600"
          >
            {t("selectFlight")}
          </Link>
        </div>
      </div>

      {flight.seatsLeft <= 4 && (
        <p className="mt-3 text-xs font-semibold text-accent-600">
          {t("seatsLeft", { count: flight.seatsLeft })}
        </p>
      )}
    </div>
  );
}
