import { getTranslations, setRequestLocale } from "next-intl/server";
import { prisma } from "@/lib/db";
import { pickOffer } from "@/lib/content";
import type { Locale } from "@/i18n/routing";
import PageHero from "@/components/ui/PageHero";
import OfferCard from "@/components/cards/OfferCard";

export default async function OffersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const l = locale as Locale;
  const t = await getTranslations("offers");

  const rows = await prisma.offer.findMany({
    orderBy: { discountPct: "desc" },
  });
  const offers = rows.map((o) => pickOffer(o, l));

  return (
    <div>
      <PageHero title={t("title")} subtitle={t("subtitle")} />
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {offers.map((o) => (
            <OfferCard key={o.id} offer={o} />
          ))}
        </div>
      </div>
    </div>
  );
}
