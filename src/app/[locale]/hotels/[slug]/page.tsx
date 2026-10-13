import { addDays, format } from "date-fns";
import { MapPin } from "lucide-react";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { prisma } from "@/lib/db";
import { pickHotel } from "@/lib/content";
import { formatCurrency, formatDate } from "@/lib/format";
import { hotelTotal, nightsBetween } from "@/lib/pricing";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import HotelGallery from "@/components/hotels/HotelGallery";
import AmenityChips from "@/components/hotels/AmenityChips";
import StarRating from "@/components/ui/StarRating";

const str = (v: string | string[] | undefined) =>
  typeof v === "string" ? v : "";

export default async function HotelDetail({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string; slug: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const l = locale as Locale;
  const sp = await searchParams;
  const t = await getTranslations("hotels");
  const tc = await getTranslations("common");
  const ts = await getTranslations("search");

  const row = await prisma.hotel.findUnique({ where: { slug } });
  if (!row) notFound();
  const hotel = pickHotel(row, l);

  const checkin =
    str(sp.checkin) || format(addDays(new Date(), 3), "yyyy-MM-dd");
  const checkout =
    str(sp.checkout) || format(addDays(new Date(), 5), "yyyy-MM-dd");
  const rooms = Number(sp.rooms) || 1;
  const adults = Number(sp.adults) || 2;
  const children = Number(sp.children) || 0;
  const nights = nightsBetween(checkin, checkout);
  const total = hotelTotal(hotel.pricePerNight, nights, rooms);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
        <div>
          <div className="mb-4">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-2xl font-extrabold text-slate-800">
                {hotel.name}
              </h1>
              <StarRating rating={hotel.starRating} />
            </div>
            <p className="mt-1 flex items-center gap-1 text-slate-500">
              <MapPin className="h-4 w-4" />
              {hotel.city}, {hotel.country}
            </p>
          </div>

          <HotelGallery images={hotel.images} alt={hotel.name} />

          <div className="mt-6">
            <h2 className="text-lg font-bold text-slate-800">
              {t("aboutHotel")}
            </h2>
            <p className="mt-2 leading-relaxed text-slate-600">
              {hotel.description}
            </p>
          </div>

          <div className="mt-6">
            <h2 className="mb-3 text-lg font-bold text-slate-800">
              {t("amenitiesTitle")}
            </h2>
            <AmenityChips amenities={hotel.amenities} variant="list" />
          </div>
        </div>

        <aside>
          <div className="sticky top-20 rounded-2xl bg-white p-5 shadow-card">
            <div className="flex items-center justify-between">
              <span className="rounded-lg bg-brand-600 px-2.5 py-1 text-sm font-bold text-white">
                {hotel.rating.toFixed(1)}
              </span>
              <span className="text-xs text-slate-400">
                {hotel.reviews} {tc("reviews")}
              </span>
            </div>

            <div className="mt-4 flex items-baseline gap-1">
              <p className="text-2xl font-extrabold text-brand-700">
                {formatCurrency(hotel.pricePerNight, l)}
              </p>
              <span className="text-sm text-slate-400">/ {t("night")}</span>
            </div>

            <div className="mt-4 space-y-2 border-t border-slate-100 pt-4 text-sm text-slate-600">
              <div className="flex justify-between">
                <span>{ts("checkin")}</span>
                <span className="font-semibold">{formatDate(checkin, l)}</span>
              </div>
              <div className="flex justify-between">
                <span>{ts("checkout")}</span>
                <span className="font-semibold">{formatDate(checkout, l)}</span>
              </div>
              <div className="flex justify-between">
                <span>
                  {formatCurrency(hotel.pricePerNight, l)} × {nights} × {rooms}{" "}
                  {ts("rooms")}
                </span>
              </div>
              <div className="flex justify-between border-t border-slate-100 pt-2 text-base font-bold">
                <span>{tc("total")}</span>
                <span className="text-brand-700">
                  {formatCurrency(total, l)}
                </span>
              </div>
            </div>

            <Link
              href={{
                pathname: "/checkout",
                query: {
                  type: "hotel",
                  id: hotel.slug,
                  checkin,
                  checkout,
                  rooms: String(rooms),
                  adults: String(adults),
                  children: String(children),
                },
              }}
              className="mt-4 block rounded-xl bg-accent-500 py-3 text-center font-bold text-white transition hover:bg-accent-600"
            >
              {tc("book")}
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
