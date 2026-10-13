"use client";

import { useState } from "react";
import { ChevronDown, LogOut, Ticket, User } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link, useRouter } from "@/i18n/navigation";

export default function UserMenu({ name }: { name: string }) {
  const t = useTranslations("nav");
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const firstName = name.split(" ")[0];

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    setOpen(false);
    router.push("/");
    router.refresh();
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold hover:bg-slate-50"
      >
        <span className="grid h-6 w-6 place-items-center rounded-full bg-brand-100 text-brand-700">
          <User className="h-4 w-4" />
        </span>
        <span className="hidden sm:inline">{firstName}</span>
        <ChevronDown className="h-4 w-4 text-slate-400" />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute end-0 z-20 mt-2 w-52 rounded-xl border border-slate-100 bg-white p-1.5 shadow-float">
            <Link
              href="/account"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-slate-50"
            >
              <User className="h-4 w-4 text-slate-400" />
              {t("myAccount")}
            </Link>
            <Link
              href="/account"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-slate-50"
            >
              <Ticket className="h-4 w-4 text-slate-400" />
              {t("myBookings")}
            </Link>
            <button
              type="button"
              onClick={logout}
              className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-600 hover:bg-red-50"
            >
              <LogOut className="h-4 w-4" />
              {t("logout")}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
