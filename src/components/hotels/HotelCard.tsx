"use client";

import { MapPin } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import SmartImage from "@/components/ui/SmartImage";
import StarRating from "@/components/ui/StarRating";
import AmenityChips from "./AmenityChips";
import { formatCurrency } from "@/lib/format";
import type { Locale } from "@/i18n/routing";
import type { HotelView } from "@/lib/content";

export default function HotelCard({
  hotel,
  query,
}: {
  hotel: HotelView;
  query: Record<string, string>;
}) {
  const locale = useLocale() as Locale;
  const t = useTranslations("hotels");
  const tc = useTranslations("common");

  return (
    <div className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-card sm:flex-row">
      <div className="relative shrink-0 sm:w-64">
        <div className="h-48 sm:absolute sm:inset-0 sm:h-auto">
          <SmartImage
            src={hotel.images[0]}
            alt={hotel.name}
            label={hotel.city}
            className="h-full w-full object-cover"
          />
        </div>
        <span className="absolute start-3 top-3 rounded-md bg-white/90 px-2 py-0.5 text-xs font-bold text-brand-700">
          {t("star", { count: hotel.starRating })}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-4 sm:flex-row sm:justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-slate-800">{hotel.name}</h3>
            <StarRating rating={hotel.starRating} />
          </div>
          <p className="mt-0.5 flex items-center gap-1 text-sm text-slate-500">
            <MapPin className="h-3.5 w-3.5" />
            {hotel.city}, {hotel.country}
          </p>
          <div className="mt-2">
            <AmenityChips amenities={hotel.amenities.slice(0, 4)} />
          </div>
          <p className="mt-2 line-clamp-2 text-sm text-slate-500">
            {hotel.description}
          </p>
        </div>

        <div className="flex items-end justify-between border-t border-slate-100 pt-3 sm:w-44 sm:flex-col sm:items-end sm:border-t-0 sm:pt-0">
          <div className="flex items-center gap-2 sm:flex-col sm:items-end sm:gap-0.5">
            <span className="rounded-lg bg-brand-600 px-2 py-1 text-sm font-bold text-white">
              {hotel.rating.toFixed(1)}
            </span>
            <span className="text-xs text-slate-400">
              {hotel.reviews} {tc("reviews")}
            </span>
          </div>
          <div className="text-end">
            <p className="text-lg font-extrabold text-brand-700">
              {formatCurrency(hotel.pricePerNight, locale)}
            </p>
            <p className="text-xs text-slate-400">{tc("perNight")}</p>
            <Link
              href={{ pathname: `/hotels/${hotel.slug}`, query }}
              className="mt-2 inline-block rounded-xl bg-accent-500 px-4 py-2 text-sm font-bold text-white transition hover:bg-accent-600"
            >
              {t("selectRoom")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
