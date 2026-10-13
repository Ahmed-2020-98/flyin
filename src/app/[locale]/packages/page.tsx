import { getTranslations, setRequestLocale } from "next-intl/server";
import { prisma } from "@/lib/db";
import { pickPackage } from "@/lib/content";
import type { Locale } from "@/i18n/routing";
import SearchWidget from "@/components/search/SearchWidget";
import PackageCard from "@/components/cards/PackageCard";

const str = (v: string | string[] | undefined) =>
  typeof v === "string" ? v : "";

export default async function PackagesPage({
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
  const t = await getTranslations("packages");

  const destination = str(sp.destination);
  let rows = destination
    ? await prisma.package.findMany({
        where: {
          OR: [
            { destination: { contains: destination } },
            { destinationAr: { contains: destination } },
          ],
        },
      })
    : await prisma.package.findMany();
  if (destination && rows.length === 0)
    rows = await prisma.package.findMany();

  const packages = rows.map((p) => pickPackage(p, l));

  return (
    <div>
      <div className="bg-brand-800">
        <div className="mx-auto max-w-7xl px-4 py-6">
          <SearchWidget
            defaultTab="packages"
            initial={{ tab: "packages", city: destination || undefined }}
          />
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-extrabold text-slate-800">
            {t("title")}
          </h1>
          <p className="mt-1 text-slate-500">{t("subtitle")}</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {packages.map((p) => (
            <PackageCard key={p.id} pkg={p} />
          ))}
        </div>
      </div>
    </div>
  );
}
