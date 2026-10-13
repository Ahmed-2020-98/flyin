"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, Users } from "lucide-react";
import { useTranslations } from "next-intl";
import Stepper from "./Stepper";
import type { CabinClass } from "@/lib/types";

export type TravellersValue = {
  adults: number;
  children: number;
  infants: number;
  cabin: CabinClass;
};

const CABINS: CabinClass[] = ["economy", "premium", "business", "first"];

export default function TravellersField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: TravellersValue;
  onChange: (v: TravellersValue) => void;
}) {
  const t = useTranslations("search");
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const total = value.adults + value.children + value.infants;
  const set = (patch: Partial<TravellersValue>) => onChange({ ...value, ...patch });

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  return (
    <div ref={ref} className="relative">
      <label className="mb-1 block text-xs font-semibold text-slate-500">
        {label}
      </label>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="field flex w-full items-center gap-2 text-start"
      >
        <Users className="h-4 w-4 shrink-0 text-brand-500" />
        <span className="flex-1 truncate text-sm">
          {t("passengerSummary", { count: total })} · {t(`cabin.${value.cabin}`)}
        </span>
        <ChevronDown className="h-4 w-4 text-slate-400" />
      </button>

      {open && (
        <div className="absolute end-0 z-30 mt-1 w-72 rounded-xl border border-slate-100 bg-white p-4 shadow-float">
          <Stepper
            label={t("adults")}
            hint={t("adultsHint")}
            value={value.adults}
            min={1}
            onChange={(v) => set({ adults: v })}
          />
          <Stepper
            label={t("children")}
            hint={t("childrenHint")}
            value={value.children}
            onChange={(v) => set({ children: v })}
          />
          <Stepper
            label={t("infants")}
            hint={t("infantsHint")}
            value={value.infants}
            max={value.adults}
            onChange={(v) => set({ infants: v })}
          />
          <div className="mt-3 border-t border-slate-100 pt-3">
            <p className="mb-2 text-xs font-semibold text-slate-500">
              {t("cabinLabel")}
            </p>
            <div className="grid grid-cols-2 gap-2">
              {CABINS.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => set({ cabin: c })}
                  className={`rounded-lg border px-2 py-2 text-xs font-semibold transition ${
                    value.cabin === c
                      ? "border-brand-500 bg-brand-50 text-brand-700"
                      : "border-slate-200 text-slate-600 hover:border-slate-300"
                  }`}
                >
                  {t(`cabin.${c}`)}
                </button>
              ))}
            </div>
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="mt-4 w-full rounded-lg bg-brand-600 py-2 text-sm font-semibold text-white hover:bg-brand-700"
          >
            {t("done")}
          </button>
        </div>
      )}
    </div>
  );
}
