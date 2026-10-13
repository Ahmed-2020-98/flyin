import { CreditCard, Repeat, RotateCcw, ShieldCheck } from "lucide-react";
import { getTranslations } from "next-intl/server";

export default async function ServicesSection() {
  const t = await getTranslations("home");

  const items = [
    {
      Icon: Repeat,
      title: t("services.flexiflyTitle"),
      desc: t("services.flexiflyDesc"),
      color: "text-brand-600 bg-brand-50",
    },
    {
      Icon: RotateCcw,
      title: t("services.ezcancelTitle"),
      desc: t("services.ezcancelDesc"),
      color: "text-emerald-600 bg-emerald-50",
    },
    {
      Icon: ShieldCheck,
      title: t("services.travelplusTitle"),
      desc: t("services.travelplusDesc"),
      color: "text-sky-600 bg-sky-50",
    },
    {
      Icon: CreditCard,
      title: t("services.installmentsTitle"),
      desc: t("services.installmentsDesc"),
      color: "text-amber-600 bg-amber-50",
    },
  ];

  return (
    <section>
      <h2 className="mb-6 text-2xl font-extrabold text-slate-800 sm:text-3xl">
        {t("whyFlyin")}
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => (
          <div
            key={item.title}
            className="rounded-2xl border border-slate-100 bg-white p-5 shadow-card"
          >
            <span
              className={`mb-4 grid h-12 w-12 place-items-center rounded-xl ${item.color}`}
            >
              <item.Icon className="h-6 w-6" />
            </span>
            <h3 className="font-bold text-slate-800">{item.title}</h3>
            <p className="mt-1 text-sm leading-relaxed text-slate-500">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
