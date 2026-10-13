import type { Hotel, Offer, Package } from "@prisma/client";
import type { Locale } from "@/i18n/routing";

// Map bilingual Prisma rows into a locale-specific display shape and parse the
// JSON-encoded string columns (SQLite has no native array/JSON types).

export function pickOffer(o: Offer, locale: Locale) {
  const ar = locale === "ar";
  return {
    id: o.id,
    slug: o.slug,
    title: ar ? o.titleAr : o.title,
    description: ar ? o.descriptionAr : o.description,
    image: o.image,
    discountPct: o.discountPct,
    destination: ar ? o.destinationAr : o.destination,
    code: o.code,
    validUntil: o.validUntil,
  };
}

export function pickPackage(p: Package, locale: Locale) {
  const ar = locale === "ar";
  return {
    id: p.id,
    slug: p.slug,
    title: ar ? p.titleAr : p.title,
    destination: ar ? p.destinationAr : p.destination,
    image: p.image,
    nights: p.nights,
    flightSummary: ar ? p.flightSummaryAr : p.flightSummary,
    hotelSummary: ar ? p.hotelSummaryAr : p.hotelSummary,
    price: p.price,
    discountPct: p.discountPct,
    description: ar ? p.descriptionAr : p.description,
  };
}

export function pickHotel(h: Hotel, locale: Locale) {
  const ar = locale === "ar";
  let images: string[] = [];
  let amenities: string[] = [];
  try {
    images = JSON.parse(h.images);
  } catch {}
  try {
    amenities = JSON.parse(h.amenities);
  } catch {}
  return {
    id: h.id,
    slug: h.slug,
    name: ar ? h.nameAr : h.name,
    city: ar ? h.cityAr : h.city,
    country: ar ? h.countryAr : h.country,
    starRating: h.starRating,
    rating: h.rating,
    reviews: h.reviews,
    pricePerNight: h.pricePerNight,
    description: ar ? h.descriptionAr : h.description,
    images,
    amenities,
  };
}

export type OfferView = ReturnType<typeof pickOffer>;
export type PackageView = ReturnType<typeof pickPackage>;
export type HotelView = ReturnType<typeof pickHotel>;
