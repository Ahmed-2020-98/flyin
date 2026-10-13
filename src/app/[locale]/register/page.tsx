import { getTranslations, setRequestLocale } from "next-intl/server";
import { getSessionUser } from "@/lib/auth";
import { redirect } from "@/i18n/navigation";
import AuthForm from "@/components/auth/AuthForm";
import Logo from "@/components/ui/Logo";

export default async function RegisterPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const session = await getSessionUser();
  if (session) redirect({ href: "/account", locale });
  const t = await getTranslations("auth");

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <div className="grid overflow-hidden rounded-3xl bg-white shadow-card md:grid-cols-2">
        <div className="hidden flex-col justify-between bg-gradient-to-br from-brand-700 to-brand-900 p-10 text-white md:flex">
          <div className="[&_span]:text-white">
            <Logo light />
          </div>
          <div>
            <h2 className="text-2xl font-extrabold">{t("registerTitle")}</h2>
            <p className="mt-2 text-white/80">{t("registerSubtitle")}</p>
          </div>
          <p className="text-sm text-white/60">
            © {new Date().getFullYear()} Flyin
          </p>
        </div>

        <div className="p-8">
          <h1 className="text-2xl font-extrabold text-slate-800">
            {t("registerTitle")}
          </h1>
          <p className="mt-1 text-sm text-slate-500">{t("registerSubtitle")}</p>
          <div className="mt-6">
            <AuthForm mode="register" />
          </div>
        </div>
      </div>
    </div>
  );
}
