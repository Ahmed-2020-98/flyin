import { Clock, Mail, MessageCircle, Phone } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import PageHero from "@/components/ui/PageHero";
import ContactForm from "@/components/contact/ContactForm";

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contact");

  const methods = [
    { Icon: Phone, label: t("phone"), value: "+966 920025959" },
    { Icon: MessageCircle, label: t("whatsapp"), value: "+966 920025959" },
    { Icon: Mail, label: t("email"), value: "customercare@flyin.com" },
    { Icon: Clock, label: t("hours"), value: "24 / 7" },
  ];

  return (
    <div>
      <PageHero title={t("title")} subtitle={t("subtitle")} />
      <div className="mx-auto grid max-w-5xl gap-8 px-4 py-10 md:grid-cols-2">
        <div className="space-y-3">
          {methods.map((m) => (
            <div
              key={m.label}
              className="flex items-center gap-4 rounded-2xl bg-white p-5 shadow-card"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600">
                <m.Icon className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm text-slate-500">{m.label}</p>
                <p className="font-bold text-slate-800" dir="ltr">
                  {m.value}
                </p>
              </div>
            </div>
          ))}
        </div>
        <ContactForm />
      </div>
    </div>
  );
}
