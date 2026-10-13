import { Building2, Plane } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import SmartImage from "@/components/ui/SmartImage";
import { formatCurrency } from "@/lib/format";
import type { Locale } from "@/i18n/routing";
import type { PackageView } from "@/lib/content";

export default function PackageCard({ pkg }: { pkg: PackageView }) {
  const t = useTranslations("packages");
  const tc = useTranslations("common");
  const locale = useLocale() as Locale;

  return (
    <div className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-card">
      <div className="relative aspect-[16/10]">
        <SmartImage
          src={pkg.image}
          alt={pkg.destination}
          label={pkg.destination}
          className="h-full w-full object-cover"
        />
        {pkg.discountPct > 0 && (
          <span className="absolute start-3 top-3 rounded-full bg-accent-500 px-3 py-1 text-xs font-bold text-white shadow-sm">
            -{pkg.discountPct}%
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-4">
        <p className="text-xs font-semibold text-brand-600">
          {pkg.destination} · {t("nights", { count: pkg.nights })}
        </p>
        <h3 className="mt-1 font-bold text-slate-800">{pkg.title}</h3>
        <ul className="mt-3 space-y-1.5 text-sm text-slate-500">
          <li className="flex items-center gap-2">
            <Plane className="h-4 w-4 text-brand-400" />
            {pkg.flightSummary}
          </li>
          <li className="flex items-center gap-2">
            <Building2 className="h-4 w-4 text-brand-400" />
            {pkg.hotelSummary}
          </li>
        </ul>
        <div className="mt-auto flex items-end justify-between pt-4">
          <div>
            <span className="text-xs text-slate-400">{tc("fromPrice")}</span>
            <p className="text-lg font-extrabold text-brand-700">
              {formatCurrency(pkg.price, locale)}
              <span className="text-xs font-medium text-slate-400">
                {" "}
                / {t("perPerson")}
              </span>
            </p>
          </div>
          <Link
            href={{
              pathname: "/checkout",
              query: { type: "package", id: pkg.slug },
            }}
            className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700"
          >
            {t("bookPackage")}
          </Link>
        </div>
      </div>
    </div>
  );
}
