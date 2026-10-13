import { Link } from "@/i18n/navigation";
import SmartImage from "@/components/ui/SmartImage";

export default function DestinationCard({
  href,
  image,
  city,
  country,
  priceLabel,
}: {
  href: { pathname: string; query?: Record<string, string> };
  image: string;
  city: string;
  country: string;
  priceLabel: string;
}) {
  return (
    <Link
      href={href}
      className="group relative block overflow-hidden rounded-2xl shadow-card"
    >
      <div className="aspect-[3/4] w-full">
        <SmartImage
          src={image}
          alt={city}
          label={city}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-4 text-white">
        <p className="text-lg font-bold">{city}</p>
        <p className="text-xs text-white/80">{country}</p>
        <p className="mt-1 text-sm font-semibold text-accent-400">{priceLabel}</p>
      </div>
    </Link>
  );
}
