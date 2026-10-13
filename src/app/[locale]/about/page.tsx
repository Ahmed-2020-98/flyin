import { getTranslations, setRequestLocale } from "next-intl/server";
import PageHero from "@/components/ui/PageHero";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("about");

  return (
    <div>
      <PageHero title={t("title")} />
      <div className="mx-auto max-w-3xl px-4 py-10">
        <p className="text-lg leading-relaxed text-slate-600">{t("body")}</p>
      </div>
    </div>
  );
}
