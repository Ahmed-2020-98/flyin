"use client";

import { useState } from "react";
import { LogOut, Menu, User, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link, useRouter } from "@/i18n/navigation";
import Logo from "@/components/ui/Logo";

const LINKS = [
  ["/flights", "flights"],
  ["/hotels", "hotels"],
  ["/packages", "packages"],
  ["/offers", "offers"],
  ["/contact", "support"],
] as const;

export default function MobileMenu({
  authed,
  name,
}: {
  authed: boolean;
  name?: string;
}) {
  const t = useTranslations("nav");
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const close = () => setOpen(false);

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    close();
    router.push("/");
    router.refresh();
  }

  return (
    <div className="md:hidden">
      <button type="button" onClick={() => setOpen(true)} className="p-2" aria-label="Menu">
        <Menu className="h-6 w-6" />
      </button>

      {open && (
        <div className="fixed inset-0 z-50 bg-black/40" onClick={close}>
          <div
            className="absolute inset-y-0 end-0 flex w-72 flex-col bg-white p-5 shadow-float"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-5 flex items-center justify-between">
              <Logo />
              <button type="button" onClick={close} aria-label="Close">
                <X className="h-6 w-6" />
              </button>
            </div>

            <nav className="flex flex-col gap-1">
              {LINKS.map(([href, key]) => (
                <Link
                  key={href}
                  href={href}
                  onClick={close}
                  className="rounded-lg px-3 py-3 font-semibold text-slate-700 hover:bg-slate-50"
                >
                  {t(key)}
                </Link>
              ))}
            </nav>

            <div className="mt-4 flex flex-col gap-2 border-t border-slate-100 pt-4">
              {authed ? (
                <>
                  <Link
                    href="/account"
                    onClick={close}
                    className="flex items-center gap-2 rounded-lg px-3 py-3 font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    <User className="h-4 w-4" />
                    {name ? name.split(" ")[0] : t("myAccount")}
                  </Link>
                  <button
                    type="button"
                    onClick={logout}
                    className="flex items-center gap-2 rounded-lg px-3 py-3 font-semibold text-red-600 hover:bg-red-50"
                  >
                    <LogOut className="h-4 w-4" />
                    {t("logout")}
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    onClick={close}
                    className="rounded-lg border border-slate-200 px-3 py-3 text-center font-semibold text-slate-700"
                  >
                    {t("login")}
                  </Link>
                  <Link
                    href="/register"
                    onClick={close}
                    className="rounded-lg bg-brand-600 px-3 py-3 text-center font-semibold text-white"
                  >
                    {t("register")}
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
