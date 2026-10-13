"use client";

import { useState } from "react";
import { addDays, format } from "date-fns";
import { Building2, MapPin, Plane, Repeat, Search } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import AutocompleteField, { type Suggestion } from "./AutocompleteField";
import DateField from "./DateField";
import TravellersField, { type TravellersValue } from "./TravellersField";
import GuestsField, { type GuestsValue } from "./GuestsField";
import { findAirport, searchAirports } from "@/lib/data/airports";
import { cities, searchCities } from "@/lib/data/cities";

type Tab = "flights" | "hotels" | "packages";
const iso = (d: Date) => format(d, "yyyy-MM-dd");

const TABS: { id: Tab; icon: React.ReactNode; key: string }[] = [
  { id: "flights", icon: <Plane className="h-4 w-4" />, key: "flights" },
  { id: "hotels", icon: <Building2 className="h-4 w-4" />, key: "hotels" },
  { id: "packages", icon: <MapPin className="h-4 w-4" />, key: "packages" },
];

export type SearchInitial = {
  tab?: Tab;
  trip?: "roundtrip" | "oneway";
  origin?: string;
  destination?: string;
  depart?: string;
  ret?: string;
  travellers?: TravellersValue;
  city?: string;
  checkin?: string;
  checkout?: string;
  guests?: GuestsValue;
};

export default function SearchWidget({
  defaultTab = "flights",
  initial,
}: {
  defaultTab?: Tab;
  initial?: SearchInitial;
}) {
  const t = useTranslations("search");
  const locale = useLocale();
  const isAr = locale === "ar";
  const router = useRouter();
  const today = iso(new Date());

  const [tab, setTab] = useState<Tab>(initial?.tab ?? defaultTab);
  const [trip, setTrip] = useState<"roundtrip" | "oneway">(
    initial?.trip ?? "roundtrip",
  );

  const [origin, setOrigin] = useState(initial?.origin ?? "RUH");
  const [destination, setDestination] = useState(initial?.destination ?? "DXB");
  const [depart, setDepart] = useState(
    initial?.depart ?? iso(addDays(new Date(), 3)),
  );
  const [ret, setRet] = useState(initial?.ret ?? iso(addDays(new Date(), 7)));
  const [travellers, setTravellers] = useState<TravellersValue>(
    initial?.travellers ?? {
      adults: 1,
      children: 0,
      infants: 0,
      cabin: "economy",
    },
  );

  const [city, setCity] = useState(initial?.city ?? "Dubai");
  const [checkin, setCheckin] = useState(
    initial?.checkin ?? iso(addDays(new Date(), 3)),
  );
  const [checkout, setCheckout] = useState(
    initial?.checkout ?? iso(addDays(new Date(), 5)),
  );
  const [guests, setGuests] = useState<GuestsValue>(
    initial?.guests ?? {
      adults: 2,
      children: 0,
      rooms: 1,
    },
  );

  const airportSuggest = (q: string): Suggestion[] =>
    searchAirports(q).map((a) => ({
      id: a.code,
      primary: `${isAr ? a.cityAr : a.city}, ${isAr ? a.countryAr : a.country}`,
      secondary: isAr ? a.nameAr : a.name,
      badge: a.code,
    }));

  const citySuggest = (q: string): Suggestion[] =>
    searchCities(q).map((c) => ({
      id: c.name,
      primary: isAr ? c.nameAr : c.name,
      secondary: isAr ? c.countryAr : c.country,
    }));

  const apDisplay = (code: string) => {
    const a = findAirport(code);
    return a ? `${isAr ? a.cityAr : a.city} (${a.code})` : "";
  };
  const cityDisplay = (name: string) => {
    const c = cities.find((x) => x.name === name);
    return c ? (isAr ? c.nameAr : c.name) : name;
  };

  function swap() {
    setOrigin(destination);
    setDestination(origin);
  }

  function submit() {
    if (tab === "flights") {
      if (!origin || !destination || origin === destination) return;
      router.push({
        pathname: "/flights",
        query: {
          origin,
          destination,
          depart,
          ...(trip === "roundtrip" ? { return: ret } : {}),
          adults: String(travellers.adults),
          children: String(travellers.children),
          infants: String(travellers.infants),
          cabin: travellers.cabin,
          trip,
        },
      });
    } else if (tab === "hotels") {
      if (!city) return;
      router.push({
        pathname: "/hotels",
        query: {
          city,
          checkin,
          checkout,
          adults: String(guests.adults),
          children: String(guests.children),
          rooms: String(guests.rooms),
        },
      });
    } else {
      router.push({ pathname: "/packages", query: { destination: city } });
    }
  }

  return (
    <div className="rounded-2xl bg-white p-4 shadow-float sm:p-5">
      {/* Tabs */}
      <div className="mb-4 flex gap-1 rounded-xl bg-slate-100 p-1">
        {TABS.map((tb) => (
          <button
            key={tb.id}
            type="button"
            onClick={() => setTab(tb.id)}
            className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition ${
              tab === tb.id
                ? "bg-white text-brand-700 shadow-sm"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            {tb.icon}
            <span className="hidden sm:inline">{t(`tabs.${tb.key}`)}</span>
          </button>
        ))}
      </div>

      {/* Flights */}
      {tab === "flights" && (
        <div className="space-y-3">
          <div className="flex gap-2">
            {(["roundtrip", "oneway"] as const).map((tp) => (
              <button
                key={tp}
                type="button"
                onClick={() => setTrip(tp)}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold transition ${
                  trip === tp
                    ? "bg-brand-600 text-white"
                    : "bg-slate-100 text-slate-600"
                }`}
              >
                {t(`trip.${tp}`)}
              </button>
            ))}
          </div>

          <div className="grid gap-3 lg:grid-cols-4">
            <div className="relative grid gap-3 sm:grid-cols-2 lg:col-span-2">
              <AutocompleteField
                label={t("origin")}
                icon={<Plane className="h-4 w-4" />}
                placeholder={t("fromPlaceholder")}
                display={apDisplay(origin)}
                suggest={airportSuggest}
                onSelect={setOrigin}
              />
              <AutocompleteField
                label={t("destination")}
                icon={<MapPin className="h-4 w-4" />}
                placeholder={t("toPlaceholder")}
                display={apDisplay(destination)}
                suggest={airportSuggest}
                onSelect={setDestination}
              />
              <button
                type="button"
                onClick={swap}
                aria-label="Swap"
                className="absolute start-1/2 top-[60%] hidden h-9 w-9 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-slate-200 bg-white text-brand-600 shadow-sm hover:bg-brand-50 sm:grid"
              >
                <Repeat className="h-4 w-4" />
              </button>
            </div>
            <DateField
              label={t("depart")}
              value={depart}
              min={today}
              onChange={setDepart}
            />
            {trip === "roundtrip" ? (
              <DateField
                label={t("return")}
                value={ret}
                min={depart}
                onChange={setRet}
              />
            ) : (
              <div className="hidden lg:block" />
            )}
          </div>

          <div className="grid gap-3 lg:grid-cols-4">
            <div className="lg:col-span-2">
              <TravellersField
                label={t("travellersClass")}
                value={travellers}
                onChange={setTravellers}
              />
            </div>
            <div className="flex items-end lg:col-span-2">
              <SubmitButton label={t("searchFlights")} onClick={submit} />
            </div>
          </div>
        </div>
      )}

      {/* Hotels */}
      {tab === "hotels" && (
        <div className="grid gap-3 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <AutocompleteField
              label={t("destination")}
              icon={<Building2 className="h-4 w-4" />}
              placeholder={t("destinationPlaceholder")}
              display={cityDisplay(city)}
              suggest={citySuggest}
              onSelect={setCity}
            />
          </div>
          <DateField
            label={t("checkin")}
            value={checkin}
            min={today}
            onChange={setCheckin}
          />
          <DateField
            label={t("checkout")}
            value={checkout}
            min={checkin}
            onChange={setCheckout}
          />
          <GuestsField
            label={t("guests")}
            value={guests}
            onChange={setGuests}
          />
          <div className="lg:col-span-4">
            <SubmitButton label={t("searchHotels")} onClick={submit} />
          </div>
        </div>
      )}

      {/* Packages */}
      {tab === "packages" && (
        <div className="grid gap-3 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <AutocompleteField
              label={t("destination")}
              icon={<MapPin className="h-4 w-4" />}
              placeholder={t("destinationPlaceholder")}
              display={cityDisplay(city)}
              suggest={citySuggest}
              onSelect={setCity}
            />
          </div>
          <DateField
            label={t("depart")}
            value={depart}
            min={today}
            onChange={setDepart}
          />
          <GuestsField
            label={t("guests")}
            value={guests}
            onChange={setGuests}
          />
          <div className="lg:col-span-4">
            <SubmitButton label={t("searchPackages")} onClick={submit} />
          </div>
        </div>
      )}
    </div>
  );
}

function SubmitButton({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center justify-center gap-2 rounded-xl bg-accent-500 px-6 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-accent-600"
    >
      <Search className="h-5 w-5" />
      {label}
    </button>
  );
}
