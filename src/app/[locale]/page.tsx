import { addDays, format } from "date-fns";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { prisma } from "@/lib/db";
import { pickOffer, pickPackage } from "@/lib/content";
import { formatCurrency } from "@/lib/format";
import { destinations } from "@/lib/data/destinations";
import type { Locale } from "@/i18n/routing";
import Hero from "@/components/home/Hero";
import ServicesSection from "@/components/home/ServicesSection";
import AppSection from "@/components/home/AppSection";
import SectionHeading from "@/components/ui/SectionHeading";
import DestinationCard from "@/components/cards/DestinationCard";
import OfferCard from "@/components/cards/OfferCard";
import PackageCard from "@/components/cards/PackageCard";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const l = locale as Locale;
  const t = await getTranslations("home");
  const tc = await getTranslations("common");

  const [offers, packages] = await Promise.all([
    prisma.offer.findMany({ take: 4, orderBy: { discountPct: "desc" } }),
    prisma.package.findMany({ take: 3 }),
  ]);

  const depart = format(addDays(new Date(), 14), "yyyy-MM-dd");

  return (
    <div>
      <Hero />

      <div className="mx-auto max-w-7xl space-y-16 px-4 py-12 sm:py-16">
        <section>
          <SectionHeading
            title={t("popularDestinations")}
            subtitle={t("destinationsSubtitle")}
            href="/flights"
            linkLabel={tc("viewAll")}
          />
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {destinations.slice(0, 8).map((d) => (
              <DestinationCard
                key={d.code}
                href={{
                  pathname: "/flights",
                  query: {
                    origin: d.code === "RUH" ? "JED" : "RUH",
                    destination: d.code,
                    depart,
                    adults: "1",
                    children: "0",
                    infants: "0",
                    cabin: "economy",
                    trip: "oneway",
                  },
                }}
                image={d.image}
                city={l === "ar" ? d.cityAr : d.city}
                country={l === "ar" ? d.countryAr : d.country}
                priceLabel={`${tc("fromPrice")} ${formatCurrency(d.fromPrice, l)}`}
              />
            ))}
          </div>
        </section>

        <section>
          <SectionHeading
            title={t("exploreDeals")}
            subtitle={t("dealsSubtitle")}
            href="/offers"
            linkLabel={tc("viewAll")}
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {offers.map((o) => (
              <OfferCard key={o.id} offer={pickOffer(o, l)} />
            ))}
          </div>
        </section>

        <section>
          <SectionHeading
            title={t("featuredPackages")}
            subtitle={t("packagesSubtitle")}
            href="/packages"
            linkLabel={tc("viewAll")}
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {packages.map((p) => (
              <PackageCard key={p.id} pkg={pickPackage(p, l)} />
            ))}
          </div>
        </section>

        <ServicesSection />
      </div>

      <div className="pb-16">
        <AppSection />
      </div>
    </div>
  );
}
