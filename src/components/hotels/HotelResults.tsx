"use client";

import { useMemo, useState } from "react";
import { SlidersHorizontal, Star } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import HotelCard from "./HotelCard";
import AmenityChips from "./AmenityChips";
import { formatCurrency } from "@/lib/format";
import type { Locale } from "@/i18n/routing";
import type { HotelView } from "@/lib/content";

type Sort = "recommended" | "priceLow" | "priceHigh" | "rating";

export default function HotelResults({
  hotels,
  query,
}: {
  hotels: HotelView[];
  query: Record<string, string>;
}) {
  const locale = useLocale() as Locale;
  const t = useTranslations("hotels");
  const tc = useTranslations("common");

  const prices = hotels.map((h) => h.pricePerNight);
  const minP = Math.min(...prices);
  const maxP = Math.max(...prices);

  const [maxPrice, setMaxPrice] = useState(maxP);
  const [stars, setStars] = useState<number[]>([]);
  const [amenities, setAmenities] = useState<string[]>([]);
  const [sort, setSort] = useState<Sort>("recommended");
  const [showFilters, setShowFilters] = useState(false);

  const allAmenities = useMemo(
    () => Array.from(new Set(hotels.flatMap((h) => h.amenities))),
    [hotels],
  );

  const filtered = useMemo(() => {
    const list = hotels.filter((h) => {
      if (h.pricePerNight > maxPrice) return false;
      if (stars.length && !stars.includes(h.starRating)) return false;
      if (amenities.length && !amenities.every((a) => h.amenities.includes(a)))
        return false;
      return true;
    });
    return list.sort((a, b) => {
      if (sort === "priceLow") return a.pricePerNight - b.pricePerNight;
      if (sort === "priceHigh") return b.pricePerNight - a.pricePerNight;
      if (sort === "rating") return b.rating - a.rating;
      return b.rating * 10 - b.starRating - (a.rating * 10 - a.starRating);
    });
  }, [hotels, maxPrice, stars, amenities, sort]);

  const toggle = <T,>(arr: T[], v: T): T[] =>
    arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v];

  return (
    <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
      <aside className={`${showFilters ? "block" : "hidden"} lg:block`}>
        <div className="space-y-5 rounded-2xl bg-white p-5 shadow-card">
          <h3 className="font-bold text-slate-800">{t("filters")}</h3>

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
              {t("starFilter")}
            </p>
            <div className="flex gap-2">
              {[5, 4, 3].map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setStars((v) => toggle(v, s))}
                  className={`flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-semibold transition ${
                    stars.includes(s)
                      ? "bg-brand-600 text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {s} <Star className="h-3 w-3 fill-current" />
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-2 text-sm font-semibold text-slate-700">
              {t("amenitiesFilter")}
            </p>
            <div className="space-y-2">
              {allAmenities.map((a) => (
                <label
                  key={a}
                  className="flex cursor-pointer items-center gap-2 text-sm text-slate-600"
                >
                  <input
                    type="checkbox"
                    checked={amenities.includes(a)}
                    onChange={() => setAmenities((v) => toggle(v, a))}
                    className="accent-brand-600"
                  />
                  <AmenityChips amenities={[a]} />
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
            <option value="recommended">{t("sort.recommended")}</option>
            <option value="priceLow">{t("sort.priceLow")}</option>
            <option value="priceHigh">{t("sort.priceHigh")}</option>
            <option value="rating">{t("sort.rating")}</option>
          </select>
        </div>

        <div className="space-y-4">
          {filtered.length === 0 ? (
            <div className="rounded-2xl bg-white p-10 text-center shadow-card">
              <p className="font-semibold text-slate-700">{tc("noResults")}</p>
            </div>
          ) : (
            filtered.map((h) => (
              <HotelCard key={h.id} hotel={h} query={query} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
