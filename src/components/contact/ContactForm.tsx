"use client";

import { useState } from "react";
import { CheckCircle2, Send } from "lucide-react";
import { useTranslations } from "next-intl";

export default function ContactForm() {
  const t = useTranslations("contact");
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  if (sent) {
    return (
      <div className="flex items-center gap-3 rounded-2xl bg-emerald-50 p-6 text-emerald-700 shadow-card">
        <CheckCircle2 className="h-6 w-6 shrink-0" />
        <p className="font-semibold">{t("sent")}</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
      className="space-y-4 rounded-2xl bg-white p-6 shadow-card"
    >
      <h2 className="font-bold text-slate-800">{t("formTitle")}</h2>
      <input
        className="field"
        placeholder="Name"
        required
        value={form.name}
        onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
      />
      <input
        type="email"
        className="field"
        placeholder="Email"
        required
        value={form.email}
        onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
      />
      <textarea
        className="field min-h-32 resize-y"
        placeholder={t("message")}
        required
        value={form.message}
        onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
      />
      <button
        type="submit"
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-600 py-3 font-bold text-white hover:bg-brand-700"
      >
        <Send className="h-4 w-4" />
        {t("send")}
      </button>
    </form>
  );
}
