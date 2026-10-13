"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, Users } from "lucide-react";
import { useTranslations } from "next-intl";
import Stepper from "./Stepper";

export type GuestsValue = {
  adults: number;
  children: number;
  rooms: number;
};

export default function GuestsField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: GuestsValue;
  onChange: (v: GuestsValue) => void;
}) {
  const t = useTranslations("search");
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const guests = value.adults + value.children;
  const set = (patch: Partial<GuestsValue>) => onChange({ ...value, ...patch });

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
          {guests} {t("guests")} · {value.rooms} {t("rooms")}
        </span>
        <ChevronDown className="h-4 w-4 text-slate-400" />
      </button>

      {open && (
        <div className="absolute end-0 z-30 mt-1 w-72 rounded-xl border border-slate-100 bg-white p-4 shadow-float">
          <Stepper
            label={t("adults")}
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
            label={t("rooms")}
            value={value.rooms}
            min={1}
            onChange={(v) => set({ rooms: v })}
          />
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
