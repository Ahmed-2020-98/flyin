import { CheckCircle2 } from "lucide-react";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getSessionUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { redirect, Link } from "@/i18n/navigation";
import BookingCard from "@/components/booking/BookingCard";

export default async function ConfirmationPage({
  params,
}: {
  params: Promise<{ locale: string; ref: string }>;
}) {
  const { locale, ref } = await params;
  setRequestLocale(locale);
  const session = await getSessionUser();
  if (!session) redirect({ href: "/login", locale });

  const booking = await prisma.booking.findUnique({
    where: { reference: ref },
  });
  if (!booking || booking.userId !== session!.userId) notFound();

  const t = await getTranslations("confirmation");
  const tc = await getTranslations("common");

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <div className="text-center">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-emerald-100 text-emerald-600">
          <CheckCircle2 className="h-9 w-9" />
        </div>
        <h1 className="mt-4 text-2xl font-extrabold text-slate-800">
          {t("title")}
        </h1>
        <p className="mt-2 text-slate-500">{t("subtitle")}</p>
        <div className="mt-4 inline-block rounded-xl bg-brand-50 px-4 py-2">
          <span className="text-sm text-slate-500">{t("reference")}:</span>{" "}
          <span className="font-mono font-bold text-brand-700">
            {booking.reference}
          </span>
        </div>
      </div>

      <div className="mt-6">
        <BookingCard booking={booking} />
      </div>

      <div className="mt-6 flex justify-center gap-3">
        <Link
          href="/account"
          className="rounded-xl bg-brand-600 px-5 py-2.5 font-semibold text-white hover:bg-brand-700"
        >
          {t("viewBookings")}
        </Link>
        <Link
          href="/"
          className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 font-semibold text-slate-700 hover:bg-slate-50"
        >
          {tc("backHome")}
        </Link>
      </div>
    </div>
  );
}
