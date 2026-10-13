const img = (id: string) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1000&q=70`;

// Popular destinations shown on the home page. `code` links to a flight search.
export type Destination = {
  code: string;
  city: string;
  cityAr: string;
  country: string;
  countryAr: string;
  image: string;
  fromPrice: number;
};

export const destinations: Destination[] = [
  { code: "DXB", city: "Dubai", cityAr: "دبي", country: "United Arab Emirates", countryAr: "الإمارات", image: img("1512453979798-5ea266f8880c"), fromPrice: 420 },
  { code: "CAI", city: "Cairo", cityAr: "القاهرة", country: "Egypt", countryAr: "مصر", image: img("1539650116574-75c0c6d73f6e"), fromPrice: 690 },
  { code: "IST", city: "Istanbul", cityAr: "إسطنبول", country: "Turkey", countryAr: "تركيا", image: img("1524231757912-21f4fe3a7200"), fromPrice: 880 },
  { code: "JED", city: "Jeddah", cityAr: "جدة", country: "Saudi Arabia", countryAr: "السعودية", image: img("1518481612222-68bbe828ecd1"), fromPrice: 210 },
  { code: "RUH", city: "Riyadh", cityAr: "الرياض", country: "Saudi Arabia", countryAr: "السعودية", image: img("1586724237569-f3d0c1dee8c6"), fromPrice: 210 },
  { code: "MED", city: "Madinah", cityAr: "المدينة المنورة", country: "Saudi Arabia", countryAr: "السعودية", image: img("1591604129939-f1efa4d9f7fa"), fromPrice: 260 },
  { code: "MLE", city: "Maldives", cityAr: "المالديف", country: "Maldives", countryAr: "المالديف", image: img("1514282401047-d79a71a590e8"), fromPrice: 1980 },
  { code: "BCN", city: "Barcelona", cityAr: "برشلونة", country: "Spain", countryAr: "إسبانيا", image: img("1583422409516-2895a77efded"), fromPrice: 1450 },
];
