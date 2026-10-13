import { Building2, CheckCircle2, MapPin, Plane } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { formatCurrency, formatDate } from "@/lib/format";
import type { Locale } from "@/i18n/routing";

type BookingLike = {
  reference: string;
  type: string;
  status: string;
  totalPrice: number;
  currency: string;
  details: string;
  createdAt: Date | string;
};

export default function BookingCard({ booking }: { booking: BookingLike }) {
  const locale = useLocale() as Locale;
  const t = useTranslations("account");

  let details: Record<string, unknown> = {};
  try {
    details = JSON.parse(booking.details);
  } catch {}

  const Icon =
    booking.type === "hotel"
      ? Building2
      : booking.type === "package"
        ? MapPin
        : Plane;
  const typeLabel =
    booking.type === "hotel"
      ? t("typeHotel")
      : booking.type === "package"
        ? t("typePackage")
        : t("typeFlight");

  const title =
    (details.route as string) ||
    (details.hotelName as string) ||
    (details.title as string) ||
    typeLabel;
  const sub =
    booking.type === "flight"
      ? `${(details.airline as string) ?? ""} ${(details.flightNumber as string) ?? ""}`
      : booking.type === "hotel"
        ? ((details.city as string) ?? "")
        : ((details.destination as string) ?? "");

  const created = new Date(booking.createdAt).toISOString();

  return (
    <div className="rounded-2xl bg-white p-5 shadow-card">
      <div className="flex items-start justify-between gap-4">
        <div className="flex gap-3">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600">
            <Icon className="h-5 w-5" />
          </span>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-md bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-500">
                {typeLabel}
              </span>
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600">
                <CheckCircle2 className="h-3.5 w-3.5" />
                {booking.status}
              </span>
            </div>
            <p className="mt-1 font-bold text-slate-800">{title}</p>
            <p className="text-sm text-slate-500">{sub}</p>
          </div>
        </div>
        <div className="shrink-0 text-end">
          <p className="text-lg font-extrabold text-brand-700">
            {formatCurrency(booking.totalPrice, locale)}
          </p>
          <p className="text-xs text-slate-400">
            {t("reference")}:{" "}
            <span className="font-mono font-semibold text-slate-600">
              {booking.reference}
            </span>
          </p>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 border-t border-slate-100 pt-3 text-xs text-slate-500">
        {typeof details.departISO === "string" && (
          <span>{formatDate(details.departISO, locale)}</span>
        )}
        {typeof details.checkin === "string" &&
          typeof details.checkout === "string" && (
            <span>
              {formatDate(details.checkin, locale)} →{" "}
              {formatDate(details.checkout, locale)}
            </span>
          )}
        <span>
          {t("bookedOn")} {formatDate(created, locale)}
        </span>
      </div>
    </div>
  );
}
