"use client";

import { useEffect, useRef, useState } from "react";

export type Suggestion = {
  id: string;
  primary: string;
  secondary?: string;
  badge?: string;
};

type Props = {
  label: string;
  icon: React.ReactNode;
  placeholder: string;
  display: string; // human label for the current value
  suggest: (query: string) => Suggestion[];
  onSelect: (id: string) => void;
};

export default function AutocompleteField({
  label,
  icon,
  placeholder,
  display,
  suggest,
  onSelect,
}: Props) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  const results = suggest(query);

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
        setQuery("");
      }
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  return (
    <div ref={ref} className="relative">
      <label className="mb-1 block text-xs font-semibold text-slate-500">
        {label}
      </label>
      <div className="field flex items-center gap-2 !py-0">
        <span className="shrink-0 text-brand-500">{icon}</span>
        <input
          value={open ? query : display}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          placeholder={placeholder}
          className="w-full bg-transparent py-2.5 text-sm outline-none"
        />
      </div>
      {open && results.length > 0 && (
        <ul className="no-scrollbar absolute z-30 mt-1 max-h-72 w-full overflow-auto rounded-xl border border-slate-100 bg-white py-1 shadow-float">
          {results.map((r) => (
            <li key={r.id}>
              <button
                type="button"
                onClick={() => {
                  onSelect(r.id);
                  setQuery("");
                  setOpen(false);
                }}
                className="flex w-full items-center gap-3 px-3 py-2 text-start hover:bg-slate-50"
              >
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-semibold text-slate-800">
                    {r.primary}
                  </span>
                  {r.secondary && (
                    <span className="block truncate text-xs text-slate-400">
                      {r.secondary}
                    </span>
                  )}
                </span>
                {r.badge && (
                  <span className="rounded bg-slate-100 px-1.5 py-0.5 text-xs font-bold text-slate-500">
                    {r.badge}
                  </span>
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
