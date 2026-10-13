import { airlineByCode } from "@/lib/data/airlines";

export default function AirlineBadge({
  code,
  showName = false,
  isAr = false,
}: {
  code: string;
  showName?: boolean;
  isAr?: boolean;
}) {
  const airline = airlineByCode(code);
  const initials = code.slice(0, 2);

  return (
    <span className="inline-flex items-center gap-2">
      <span
        className="grid h-9 w-9 shrink-0 place-items-center rounded-lg text-xs font-bold text-white"
        style={{ backgroundColor: airline?.color ?? "#0f57a3" }}
      >
        {initials}
      </span>
      {showName && (
        <span className="text-sm font-semibold text-slate-700">
          {airline ? (isAr ? airline.nameAr : airline.name) : code}
        </span>
      )}
    </span>
  );
}
