"use client";

import { useState } from "react";
import { CreditCard, Loader2, Lock, ShieldCheck } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import SmartImage from "@/components/ui/SmartImage";
import { formatCurrency } from "@/lib/format";
import type { Locale } from "@/i18n/routing";
import type { CheckoutData } from "@/lib/checkout";

export default function CheckoutForm({ data }: { data: CheckoutData }) {
  const t = useTranslations("checkout");
  const tc = useTranslations("common");
  const locale = useLocale() as Locale;
  const router = useRouter();

  const [contact, setContact] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });
  const [card, setCard] = useState({
    number: "",
    name: "",
    expiry: "",
    cvv: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updContact =
    (k: keyof typeof contact) => (e: React.ChangeEvent<HTMLInputElement>) =>
      setContact((f) => ({ ...f, [k]: e.target.value }));
  const updCard =
    (k: keyof typeof card) => (e: React.ChangeEvent<HTMLInputElement>) =>
      setCard((f) => ({ ...f, [k]: e.target.value }));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: data.type,
          itemId: data.itemId,
          totalPrice: data.pricing.total,
          currency: data.pricing.currency,
          details: { ...data.snapshot, contact },
        }),
      });
      const d = await res.json().catch(() => ({}));
      if (!res.ok) {
        if (res.status === 401) {
          router.push("/login?callbackUrl=/checkout");
          return;
        }
        setError(tc("error"));
        setLoading(false);
        return;
      }
      router.push(`/booking/confirmation/${d.reference}`);
    } catch {
      setError(tc("error"));
      setLoading(false);
    }
  }

  return (
    <form onSubmit={submit} className="grid gap-6 lg:grid-cols-[1fr_360px]">
      <div className="space-y-6">
        <section className="rounded-2xl bg-white p-5 shadow-card">
          <h2 className="mb-4 font-bold text-slate-800">
            {data.type === "hotel" ? t("guestDetails") : t("travellerDetails")}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label={t("firstName")}>
              <input
                className="field"
                required
                value={contact.firstName}
                onChange={updContact("firstName")}
              />
            </Field>
            <Field label={t("lastName")}>
              <input
                className="field"
                required
                value={contact.lastName}
                onChange={updContact("lastName")}
              />
            </Field>
            <Field label={t("email")}>
              <input
                type="email"
                className="field"
                required
                value={contact.email}
                onChange={updContact("email")}
              />
            </Field>
            <Field label={t("phone")}>
              <input
                type="tel"
                className="field"
                required
                value={contact.phone}
                onChange={updContact("phone")}
                placeholder="+966…"
              />
            </Field>
          </div>
        </section>

        <section className="rounded-2xl bg-white p-5 shadow-card">
          <h2 className="mb-3 flex items-center gap-2 font-bold text-slate-800">
            <CreditCard className="h-5 w-5 text-brand-500" />
            {t("payment")}
          </h2>
          <div className="mb-4 flex items-center gap-2 rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-700">
            <ShieldCheck className="h-4 w-4 shrink-0" />
            {t("mockNotice")}
          </div>
          <div className="grid gap-4">
            <Field label={t("cardNumber")}>
              <input
                className="field"
                required
                inputMode="numeric"
                placeholder="4242 4242 4242 4242"
                value={card.number}
                onChange={updCard("number")}
              />
            </Field>
            <Field label={t("cardName")}>
              <input
                className="field"
                required
                value={card.name}
                onChange={updCard("name")}
              />
            </Field>
            <div className="grid grid-cols-2 gap-4">
              <Field label={t("expiry")}>
                <input
                  className="field"
                  required
                  placeholder="MM/YY"
                  value={card.expiry}
                  onChange={updCard("expiry")}
                />
              </Field>
              <Field label={t("cvv")}>
                <input
                  className="field"
                  required
                  inputMode="numeric"
                  placeholder="123"
                  value={card.cvv}
                  onChange={updCard("cvv")}
                />
              </Field>
            </div>
          </div>
        </section>
      </div>

      <aside>
        <div className="sticky top-20 space-y-4 rounded-2xl bg-white p-5 shadow-card">
          <div className="flex gap-3">
            {data.summary.image && (
              <div className="h-16 w-20 shrink-0 overflow-hidden rounded-lg">
                <SmartImage
                  src={data.summary.image}
                  alt={data.summary.title}
                  className="h-full w-full object-cover"
                />
              </div>
            )}
            <div className="min-w-0">
              <p className="truncate font-bold text-slate-800">
                {data.summary.title}
              </p>
              <p className="truncate text-sm text-slate-500">
                {data.summary.subtitle}
              </p>
            </div>
          </div>

          <div className="space-y-1.5 border-t border-slate-100 pt-3 text-sm text-slate-600">
            {data.summary.lines.map((line, i) => (
              <div key={i} className="flex justify-between gap-3">
                <span className="text-slate-500">{line.label}</span>
                <span className="text-end font-medium">{line.value}</span>
              </div>
            ))}
          </div>

          <div className="space-y-1.5 border-t border-slate-100 pt-3 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-500">{t("basePrice")}</span>
              <span>{formatCurrency(data.pricing.base, locale)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">{t("taxesFees")}</span>
              <span>{formatCurrency(data.pricing.taxes, locale)}</span>
            </div>
            <div className="flex justify-between border-t border-slate-100 pt-2 text-base font-extrabold">
              <span>{t("grandTotal")}</span>
              <span className="text-brand-700">
                {formatCurrency(data.pricing.total, locale)}
              </span>
            </div>
          </div>

          {error && (
            <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-accent-500 py-3 font-bold text-white transition hover:bg-accent-600 disabled:opacity-60"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Lock className="h-4 w-4" />
            )}
            {loading ? t("processing") : t("completeBooking")}
          </button>
        </div>
      </aside>
    </form>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-semibold text-slate-600">
        {label}
      </span>
      {children}
    </label>
  );
}
