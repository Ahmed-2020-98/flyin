import {
  Car,
  Coffee,
  Dumbbell,
  Snowflake,
  Sparkles,
  Utensils,
  Waves,
  Wifi,
  type LucideIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";

const ICONS: Record<string, LucideIcon> = {
  wifi: Wifi,
  pool: Waves,
  breakfast: Coffee,
  parking: Car,
  gym: Dumbbell,
  spa: Sparkles,
  restaurant: Utensils,
  ac: Snowflake,
};

export default function AmenityChips({
  amenities,
  variant = "chip",
}: {
  amenities: string[];
  variant?: "chip" | "list";
}) {
  const t = useTranslations("amenities");

  if (variant === "list") {
    return (
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {amenities.map((a) => {
          const Icon = ICONS[a] ?? Sparkles;
          return (
            <div key={a} className="flex items-center gap-2 text-sm text-slate-600">
              <Icon className="h-4 w-4 text-brand-500" />
              {t(a)}
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-1.5">
      {amenities.map((a) => {
        const Icon = ICONS[a] ?? Sparkles;
        return (
          <span
            key={a}
            className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-2 py-0.5 text-xs text-slate-600"
          >
            <Icon className="h-3 w-3 text-brand-500" />
            {t(a)}
          </span>
        );
      })}
    </div>
  );
}
