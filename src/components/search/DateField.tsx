"use client";

import { Calendar } from "lucide-react";

export default function DateField({
  label,
  value,
  min,
  onChange,
}: {
  label: string;
  value: string;
  min?: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="mb-1 block text-xs font-semibold text-slate-500">
        {label}
      </label>
      <div className="field flex items-center gap-2 !py-0">
        <Calendar className="h-4 w-4 shrink-0 text-brand-500" />
        <input
          type="date"
          value={value}
          min={min}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-transparent py-2.5 text-sm outline-none"
        />
      </div>
    </div>
  );
}
