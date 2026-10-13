"use client";

import { useState } from "react";
import { AlertCircle, Eye, EyeOff, Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { Link, useRouter } from "@/i18n/navigation";

export default function AuthForm({ mode }: { mode: "login" | "register" }) {
  const t = useTranslations("auth");
  const router = useRouter();
  const params = useSearchParams();
  const callbackUrl = params.get("callbackUrl");

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPw, setShowPw] = useState(false);

  const upd =
    (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (mode === "register") {
      if (form.password.length < 8) return setError(t("passwordHint"));
      if (form.password !== form.confirmPassword)
        return setError(t("errorMismatch"));
    }

    setLoading(true);
    try {
      const url =
        mode === "login" ? "/api/auth/login" : "/api/auth/register";
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setError(
          data.error === "emailTaken"
            ? t("errorEmailTaken")
            : data.error === "invalid"
              ? t("errorInvalid")
              : t("errorGeneric"),
        );
        setLoading(false);
        return;
      }

      const dest = callbackUrl?.startsWith("/")
        ? callbackUrl.replace(/^\/(en|ar)(?=\/|$)/, "") || "/account"
        : "/account";
      router.push(dest);
      router.refresh();
    } catch {
      setError(t("errorGeneric"));
      setLoading(false);
    }
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      {error && (
        <div className="flex items-center gap-2 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
          <AlertCircle className="h-4 w-4 shrink-0" />
          {error}
        </div>
      )}

      {mode === "register" && (
        <Field label={t("name")}>
          <input
            className="field"
            value={form.name}
            onChange={upd("name")}
            required
            minLength={2}
          />
        </Field>
      )}

      <Field label={t("email")}>
        <input
          type="email"
          className="field"
          value={form.email}
          onChange={upd("email")}
          required
          autoComplete="email"
        />
      </Field>

      {mode === "register" && (
        <Field label={t("phone")}>
          <input
            type="tel"
            className="field"
            value={form.phone}
            onChange={upd("phone")}
            placeholder="+966…"
          />
        </Field>
      )}

      <Field label={t("password")}>
        <div className="relative">
          <input
            type={showPw ? "text" : "password"}
            className="field pe-10"
            value={form.password}
            onChange={upd("password")}
            required
            autoComplete={mode === "login" ? "current-password" : "new-password"}
          />
          <button
            type="button"
            onClick={() => setShowPw((s) => !s)}
            className="absolute end-3 top-1/2 -translate-y-1/2 text-slate-400"
            aria-label="toggle password"
          >
            {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
        {mode === "register" && (
          <p className="mt-1 text-xs text-slate-400">{t("passwordHint")}</p>
        )}
      </Field>

      {mode === "register" && (
        <Field label={t("confirmPassword")}>
          <input
            type="password"
            className="field"
            value={form.confirmPassword}
            onChange={upd("confirmPassword")}
            required
          />
        </Field>
      )}

      <button
        type="submit"
        disabled={loading}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-600 py-3 font-bold text-white transition hover:bg-brand-700 disabled:opacity-60"
      >
        {loading && <Loader2 className="h-4 w-4 animate-spin" />}
        {mode === "login" ? t("loginCta") : t("registerCta")}
      </button>

      <p className="text-center text-sm text-slate-500">
        {mode === "login" ? t("noAccount") : t("haveAccount")}{" "}
        <Link
          href={mode === "login" ? "/register" : "/login"}
          className="font-semibold text-brand-600 hover:text-brand-700"
        >
          {mode === "login" ? t("createOne") : t("signIn")}
        </Link>
      </p>
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
