import { Plane } from "lucide-react";
import { useTranslations } from "next-intl";

export default function Logo({ light = false }: { light?: boolean }) {
  const t = useTranslations("common");
  return (
    <span className="inline-flex items-center gap-2 text-xl font-extrabold">
      <span className="grid h-8 w-8 place-items-center rounded-lg bg-accent-500 text-white">
        <Plane className="h-5 w-5 -rotate-45" />
      </span>
      <span className={light ? "text-white" : "text-brand-700"}>
        {t("brand")}
      </span>
    </span>
  );
}
