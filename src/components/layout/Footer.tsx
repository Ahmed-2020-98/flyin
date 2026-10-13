import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Logo from "@/components/ui/Logo";
import SocialLinks from "./SocialLinks";

export default async function Footer() {
  const t = await getTranslations("footer");
  const year = new Date().getFullYear();

  const columns: { title: string; links: { label: string; href: string }[] }[] =
    [
      {
        title: t("company"),
        links: [
          { label: t("aboutUs"), href: "/about" },
          { label: t("careers"), href: "/about" },
          { label: t("contact"), href: "/contact" },
        ],
      },
      {
        title: t("support"),
        links: [
          { label: t("faq"), href: "/faq" },
          { label: t("help"), href: "/contact" },
          { label: t("contact"), href: "/contact" },
        ],
      },
      {
        title: t("legal"),
        links: [
          { label: t("privacy"), href: "/privacy" },
          { label: t("terms"), href: "/terms" },
        ],
      },
    ];

  const regions = ["🇸🇦 Saudi Arabia", "🇪🇬 Egypt", "🇦🇪 UAE"];

  return (
    <footer className="mt-16 bg-brand-900 text-slate-300">
      <div className="mx-auto max-w-7xl px-4 py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="[&_span]:text-white">
              <Logo light />
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-400">
              {t("description")}
            </p>
            <div className="mt-5">
              <SocialLinks />
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="mb-3 text-sm font-bold text-white">{col.title}</h4>
              <ul className="space-y-2 text-sm">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-slate-400 transition hover:text-white"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-sm text-slate-400 sm:flex-row">
          <p>{t("rights", { year })}</p>
          <div className="flex gap-4">
            {regions.map((r) => (
              <span key={r}>{r}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
