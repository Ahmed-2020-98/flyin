const img = (id: string) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1200&q=70`;

export type PackageSeed = {
  slug: string;
  title: string;
  titleAr: string;
  destination: string;
  destinationAr: string;
  image: string;
  nights: number;
  flightSummary: string;
  flightSummaryAr: string;
  hotelSummary: string;
  hotelSummaryAr: string;
  price: number;
  discountPct: number;
  description: string;
  descriptionAr: string;
};

export const packages: PackageSeed[] = [
  {
    slug: "dubai-5-nights",
    title: "Dubai City Break", titleAr: "عطلة مدينة دبي",
    destination: "Dubai", destinationAr: "دبي",
    image: img("1512453979798-5ea266f8880c"), nights: 5,
    flightSummary: "Return flights from Riyadh", flightSummaryAr: "رحلات ذهاب وعودة من الرياض",
    hotelSummary: "5★ hotel · Breakfast included", hotelSummaryAr: "فندق 5 نجوم · يشمل الإفطار",
    price: 2890, discountPct: 15,
    description: "Five nights in Dubai with return flights, a five-star stay and daily breakfast.",
    descriptionAr: "خمس ليالٍ في دبي مع رحلات ذهاب وعودة وإقامة خمس نجوم وإفطار يومي.",
  },
  {
    slug: "cairo-4-nights",
    title: "Cairo & Pyramids", titleAr: "القاهرة والأهرامات",
    destination: "Cairo", destinationAr: "القاهرة",
    image: img("1539650116574-75c0c6d73f6e"), nights: 4,
    flightSummary: "Return flights from Jeddah", flightSummaryAr: "رحلات ذهاب وعودة من جدة",
    hotelSummary: "4★ hotel · Pyramids tour", hotelSummaryAr: "فندق 4 نجوم · جولة الأهرامات",
    price: 2150, discountPct: 20,
    description: "Explore ancient Egypt with flights, a four-star hotel and a guided pyramids tour.",
    descriptionAr: "استكشف مصر القديمة مع الرحلات وفندق أربع نجوم وجولة إرشادية للأهرامات.",
  },
  {
    slug: "istanbul-6-nights",
    title: "Istanbul Discovery", titleAr: "اكتشاف إسطنبول",
    destination: "Istanbul", destinationAr: "إسطنبول",
    image: img("1541432901042-2d8bd64b4a9b"), nights: 6,
    flightSummary: "Return flights from Riyadh", flightSummaryAr: "رحلات ذهاب وعودة من الرياض",
    hotelSummary: "5★ Bosphorus hotel", hotelSummaryAr: "فندق 5 نجوم على البوسفور",
    price: 3450, discountPct: 12,
    description: "Six nights between two continents with Bosphorus-view accommodation and flights.",
    descriptionAr: "ست ليالٍ بين قارتين مع إقامة تطل على البوسفور والرحلات.",
  },
  {
    slug: "maldives-5-nights",
    title: "Maldives Escape", titleAr: "رحلة المالديف",
    destination: "Maldives", destinationAr: "المالديف",
    image: img("1514282401047-d79a71a590e8"), nights: 5,
    flightSummary: "Return flights + speedboat", flightSummaryAr: "رحلات ذهاب وعودة + قارب سريع",
    hotelSummary: "Overwater villa · Half board", hotelSummaryAr: "فيلا فوق الماء · نصف إقامة",
    price: 7890, discountPct: 10,
    description: "An overwater villa in paradise with flights, transfers and half-board dining.",
    descriptionAr: "فيلا فوق الماء في الجنة مع الرحلات والتنقلات ونصف إقامة.",
  },
  {
    slug: "makkah-madinah-umrah",
    title: "Makkah & Madinah", titleAr: "مكة والمدينة",
    destination: "Saudi Arabia", destinationAr: "السعودية",
    image: img("1591604129939-f1efa4d9f7fa"), nights: 7,
    flightSummary: "Return flights included", flightSummaryAr: "تشمل رحلات الذهاب والعودة",
    hotelSummary: "Haram-view hotels", hotelSummaryAr: "فنادق بإطلالة على الحرم",
    price: 3980, discountPct: 8,
    description: "A seven-night spiritual journey with Haram-view hotels in Makkah and Madinah.",
    descriptionAr: "رحلة روحانية لسبع ليالٍ مع فنادق تطل على الحرم في مكة والمدينة.",
  },
  {
    slug: "barcelona-5-nights",
    title: "Barcelona Getaway", titleAr: "عطلة برشلونة",
    destination: "Barcelona", destinationAr: "برشلونة",
    image: img("1583422409516-2895a77efded"), nights: 5,
    flightSummary: "Return flights from Riyadh", flightSummaryAr: "رحلات ذهاب وعودة من الرياض",
    hotelSummary: "4★ central hotel", hotelSummaryAr: "فندق 4 نجوم في المركز",
    price: 4260, discountPct: 18,
    description: "Five nights in vibrant Barcelona with flights and a centrally located hotel.",
    descriptionAr: "خمس ليالٍ في برشلونة النابضة بالحياة مع الرحلات وفندق في قلب المدينة.",
  },
];
