"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function FaqAccordion({
  items,
}: {
  items: { q: string; a: string }[];
}) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="space-y-3">
      {items.map((it, i) => (
        <div
          key={i}
          className="overflow-hidden rounded-2xl bg-white shadow-card"
        >
          <button
            type="button"
            onClick={() => setOpen((o) => (o === i ? null : i))}
            className="flex w-full items-center justify-between gap-3 p-4 text-start font-semibold text-slate-800"
          >
            {it.q}
            <ChevronDown
              className={`h-5 w-5 shrink-0 text-slate-400 transition ${
                open === i ? "rotate-180" : ""
              }`}
            />
          </button>
          {open === i && (
            <div className="px-4 pb-4 leading-relaxed text-slate-600">
              {it.a}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
