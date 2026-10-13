export default function PageHero({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="bg-gradient-to-br from-brand-700 to-brand-900 text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:py-16">
        <h1 className="text-3xl font-extrabold sm:text-4xl">{title}</h1>
        {subtitle && (
          <p className="mt-2 max-w-2xl text-white/85">{subtitle}</p>
        )}
      </div>
    </div>
  );
}
