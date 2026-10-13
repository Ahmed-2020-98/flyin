export type City = {
  name: string;
  nameAr: string;
  country: string;
  countryAr: string;
};

// Cities available for hotel/package search. Includes every city we seed hotels
// in, plus a few popular extras.
export const cities: City[] = [
  { name: "Dubai", nameAr: "دبي", country: "United Arab Emirates", countryAr: "الإمارات" },
  { name: "Abu Dhabi", nameAr: "أبوظبي", country: "United Arab Emirates", countryAr: "الإمارات" },
  { name: "Cairo", nameAr: "القاهرة", country: "Egypt", countryAr: "مصر" },
  { name: "Riyadh", nameAr: "الرياض", country: "Saudi Arabia", countryAr: "السعودية" },
  { name: "Jeddah", nameAr: "جدة", country: "Saudi Arabia", countryAr: "السعودية" },
  { name: "Makkah", nameAr: "مكة المكرمة", country: "Saudi Arabia", countryAr: "السعودية" },
  { name: "Madinah", nameAr: "المدينة المنورة", country: "Saudi Arabia", countryAr: "السعودية" },
  { name: "Istanbul", nameAr: "إسطنبول", country: "Turkey", countryAr: "تركيا" },
  { name: "Doha", nameAr: "الدوحة", country: "Qatar", countryAr: "قطر" },
  { name: "Amman", nameAr: "عمّان", country: "Jordan", countryAr: "الأردن" },
  { name: "Barcelona", nameAr: "برشلونة", country: "Spain", countryAr: "إسبانيا" },
];

export function searchCities(query: string, limit = 8): City[] {
  const q = query.trim().toLowerCase();
  if (!q) return cities.slice(0, limit);
  return cities
    .filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.nameAr.includes(query.trim()) ||
        c.country.toLowerCase().includes(q),
    )
    .slice(0, limit);
}
