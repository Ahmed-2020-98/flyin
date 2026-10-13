import { Apple, Play, Smartphone, Star } from "lucide-react";
import { getTranslations } from "next-intl/server";

function StoreButton({
  Icon,
  top,
  label,
}: {
  Icon: typeof Apple;
  top: string;
  label: string;
}) {
  return (
    <a
      href="#"
      className="inline-flex items-center gap-2 rounded-xl bg-black/85 px-4 py-2.5 text-white transition hover:bg-black"
    >
      <Icon className="h-6 w-6" />
      <span className="text-start leading-tight">
        <span className="block text-[10px] opacity-80">{top}</span>
        <span className="block text-sm font-bold">{label}</span>
      </span>
    </a>
  );
}

export default async function AppSection() {
  const t = await getTranslations("home");

  return (
    <section className="mx-auto max-w-7xl px-4">
      <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-brand-700 to-brand-900 px-6 py-10 text-white sm:px-12 sm:py-14">
        <div className="grid items-center gap-8 md:grid-cols-2">
          <div>
            <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-sm">
              <Star className="h-4 w-4 fill-accent-400 text-accent-400" />
              4.8 · 1M+
            </div>
            <h2 className="text-2xl font-extrabold sm:text-3xl">
              {t("appTitle")}
            </h2>
            <p className="mt-3 max-w-md text-white/85">{t("appDesc")}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <StoreButton Icon={Apple} top="Download on the" label={t("appStore")} />
              <StoreButton Icon={Play} top="GET IT ON" label={t("googlePlay")} />
            </div>
          </div>
          <div className="hidden justify-center md:flex">
            <div className="grid h-48 w-48 place-items-center rounded-full bg-white/10">
              <Smartphone className="h-24 w-24 text-white/90" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
