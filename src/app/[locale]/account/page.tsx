import { Ticket } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { redirect, Link } from "@/i18n/navigation";
import { formatDate } from "@/lib/format";
import type { Locale } from "@/i18n/routing";
import BookingCard from "@/components/booking/BookingCard";

export default async function AccountPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const l = locale as Locale;
  const user = await getCurrentUser();
  if (!user) redirect({ href: "/login", locale });
  const t = await getTranslations("account");

  const bookings = await prisma.booking.findMany({
    where: { userId: user!.id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="bg-gradient-to-br from-brand-700 to-brand-900 text-white">
        <div className="mx-auto max-w-4xl px-4 py-10">
          <h1 className="text-2xl font-extrabold sm:text-3xl">
            {t("greeting", { name: user!.name })}
          </h1>
          <p className="mt-1 text-white/80">{t("subtitle")}</p>
          <p className="mt-3 text-sm text-white/60">
            {t("memberSince", {
              date: formatDate(new Date(user!.createdAt).toISOString(), l),
            })}
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-8">
        <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-slate-800">
          <Ticket className="h-5 w-5 text-brand-500" />
          {t("myBookings")}
        </h2>

        {bookings.length === 0 ? (
          <div className="rounded-2xl bg-white p-10 text-center shadow-card">
            <p className="text-slate-600">{t("noBookings")}</p>
            <Link
              href="/"
              className="mt-4 inline-block rounded-xl bg-brand-600 px-5 py-2.5 font-semibold text-white hover:bg-brand-700"
            >
              {t("noBookingsCta")}
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {bookings.map((b) => (
              <BookingCard key={b.id} booking={b} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
