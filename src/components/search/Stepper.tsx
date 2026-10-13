"use client";

import { Minus, Plus } from "lucide-react";

export default function Stepper({
  label,
  hint,
  value,
  min = 0,
  max = 9,
  onChange,
}: {
  label: string;
  hint?: string;
  value: number;
  min?: number;
  max?: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="flex items-center justify-between py-2">
      <div>
        <p className="text-sm font-semibold text-slate-700">{label}</p>
        {hint && <p className="text-xs text-slate-400">{hint}</p>}
      </div>
      <div className="flex items-center gap-3">
        <button
          type="button"
          disabled={value <= min}
          onClick={() => onChange(value - 1)}
          className="grid h-8 w-8 place-items-center rounded-full border border-slate-200 text-brand-600 transition hover:border-brand-400 disabled:opacity-40"
          aria-label="decrease"
        >
          <Minus className="h-4 w-4" />
        </button>
        <span className="w-5 text-center text-sm font-bold">{value}</span>
        <button
          type="button"
          disabled={value >= max}
          onClick={() => onChange(value + 1)}
          className="grid h-8 w-8 place-items-center rounded-full border border-slate-200 text-brand-600 transition hover:border-brand-400 disabled:opacity-40"
          aria-label="increase"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
