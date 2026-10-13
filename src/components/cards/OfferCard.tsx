import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import SmartImage from "@/components/ui/SmartImage";
import type { OfferView } from "@/lib/content";

export default function OfferCard({ offer }: { offer: OfferView }) {
  const t = useTranslations("offers");

  return (
    <div className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-card">
      <div className="relative aspect-[16/10]">
        <SmartImage
          src={offer.image}
          alt={offer.destination}
          label={offer.destination}
          className="h-full w-full object-cover"
        />
        <span className="absolute start-3 top-3 rounded-full bg-accent-500 px-3 py-1 text-xs font-bold text-white shadow-sm">
          {t("off", { pct: offer.discountPct })}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <p className="text-xs font-semibold text-brand-600">
          {offer.destination}
        </p>
        <h3 className="mt-1 font-bold text-slate-800">{offer.title}</h3>
        <p className="mt-1 line-clamp-2 text-sm text-slate-500">
          {offer.description}
        </p>
        <div className="mt-auto flex items-center justify-between pt-4">
          <span className="rounded-lg border border-dashed border-brand-300 bg-brand-50 px-2 py-1 text-xs font-bold text-brand-700">
            {t("useCode")}: {offer.code}
          </span>
          <Link
            href="/offers"
            className="text-sm font-semibold text-accent-600 hover:text-accent-500"
          >
            {t("grab")} →
          </Link>
        </div>
      </div>
    </div>
  );
}
