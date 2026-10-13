import { Link } from "@/i18n/navigation";

export default function SectionHeading({
  title,
  subtitle,
  href,
  linkLabel,
}: {
  title: string;
  subtitle?: string;
  href?: string;
  linkLabel?: string;
}) {
  return (
    <div className="mb-6 flex items-end justify-between gap-4">
      <div>
        <h2 className="text-2xl font-extrabold text-slate-800 sm:text-3xl">
          {title}
        </h2>
        {subtitle && <p className="mt-1 text-slate-500">{subtitle}</p>}
      </div>
      {href && linkLabel && (
        <Link
          href={href}
          className="shrink-0 text-sm font-semibold text-brand-600 hover:text-brand-700"
        >
          {linkLabel} →
        </Link>
      )}
    </div>
  );
}
