import { addDays, format } from "date-fns";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { prisma } from "@/lib/db";
import { pickHotel } from "@/lib/content";
import { cities } from "@/lib/data/cities";
import type { Locale } from "@/i18n/routing";
import SearchWidget from "@/components/search/SearchWidget";
import HotelResults from "@/components/hotels/HotelResults";

const str = (v: string | string[] | undefined) =>
  typeof v === "string" ? v : "";

export default async function HotelsPage({
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
  const t = await getTranslations("hotels");

  const city = str(sp.city) || "Dubai";
  const checkin = str(sp.checkin) || format(addDays(new Date(), 3), "yyyy-MM-dd");
  const checkout =
    str(sp.checkout) || format(addDays(new Date(), 5), "yyyy-MM-dd");
  const adults = Number(sp.adults) || 2;
  const children = Number(sp.children) || 0;
  const rooms = Number(sp.rooms) || 1;

  let rows = await prisma.hotel.findMany({
    where: {
      OR: [{ city: { contains: city } }, { cityAr: { contains: city } }],
    },
  });
  const exact = rows.length > 0;
  if (!exact) rows = await prisma.hotel.findMany();

  const hotels = rows.map((h) => pickHotel(h, l));
  const cityObj = cities.find((c) => c.name === city);
  const cityLabel = cityObj ? (l === "ar" ? cityObj.nameAr : cityObj.name) : city;
  const query = {
    checkin,
    checkout,
    adults: String(adults),
    children: String(children),
    rooms: String(rooms),
  };

  return (
    <div>
      <div className="bg-brand-800">
        <div className="mx-auto max-w-7xl px-4 py-6">
          <SearchWidget
            defaultTab="hotels"
            initial={{
              tab: "hotels",
              city,
              checkin,
              checkout,
              guests: { adults, children, rooms },
            }}
          />
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-5">
          <h1 className="text-xl font-bold text-slate-800">
            {t("title")} · {cityLabel}
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            {t("results", { count: hotels.length })}
          </p>
        </div>
        <HotelResults hotels={hotels} query={query} />
      </div>
    </div>
  );
}
