import { getTranslations } from "next-intl/server";
import SearchWidget from "@/components/search/SearchWidget";

export default async function Hero() {
  const t = await getTranslations("home");

  return (
    <section className="relative bg-brand-800">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=2000&q=70')",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-brand-900/85 via-brand-800/75 to-brand-700/70" />

      <div className="relative mx-auto max-w-7xl px-4 pb-24 pt-14 sm:pt-20">
        <div className="max-w-2xl text-white">
          <h1 className="text-3xl font-extrabold leading-tight sm:text-5xl">
            {t("heroTitle")}
          </h1>
          <p className="mt-3 text-white/85 sm:text-lg">{t("heroSubtitle")}</p>
        </div>
        <div className="mt-8">
          <SearchWidget />
        </div>
      </div>
    </section>
  );
}
