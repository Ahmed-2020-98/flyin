import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getSessionUser } from "@/lib/auth";
import Logo from "@/components/ui/Logo";
import NavLink from "./NavLink";
import LanguageToggle from "./LanguageToggle";
import UserMenu from "./UserMenu";
import MobileMenu from "./MobileMenu";

const LINKS = [
  ["/flights", "flights"],
  ["/hotels", "hotels"],
  ["/packages", "packages"],
  ["/offers", "offers"],
  ["/contact", "support"],
] as const;

export default async function Header() {
  const session = await getSessionUser();
  const t = await getTranslations("nav");

  return (
    <header className="sticky top-0 z-40 border-b border-slate-100 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-2 px-4">
        <Link href="/" aria-label="Flyin home">
          <Logo />
        </Link>

        <nav className="ms-4 hidden items-center gap-1 md:flex">
          {LINKS.map(([href, key]) => (
            <NavLink key={href} href={href}>
              {t(key)}
            </NavLink>
          ))}
        </nav>

        <div className="ms-auto flex items-center gap-1.5">
          <span className="hidden rounded-lg border border-slate-200 px-2.5 py-2 text-xs font-bold text-slate-500 sm:inline-flex">
            SAR
          </span>
          <LanguageToggle />

          {session ? (
            <div className="hidden md:block">
              <UserMenu name={session.name} />
            </div>
          ) : (
            <div className="hidden items-center gap-1.5 md:flex">
              <Link
                href="/login"
                className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                {t("login")}
              </Link>
              <Link
                href="/register"
                className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-700"
              >
                {t("register")}
              </Link>
            </div>
          )}

          <MobileMenu authed={!!session} name={session?.name} />
        </div>
      </div>
    </header>
  );
}
