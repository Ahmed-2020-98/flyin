// Seed data for hotels. Images point at Unsplash; the UI uses a <SmartImage>
// wrapper that falls back to a themed gradient if any URL fails to load, so the
// layout never looks broken. `amenities` are keys translated via messages.

const img = (id: string) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1200&q=70`;

export type HotelSeed = {
  slug: string;
  name: string;
  nameAr: string;
  city: string;
  cityAr: string;
  country: string;
  countryAr: string;
  starRating: number;
  rating: number;
  reviews: number;
  pricePerNight: number;
  description: string;
  descriptionAr: string;
  images: string[];
  amenities: string[];
};

const ALL_AMENITIES = ["wifi", "pool", "breakfast", "parking", "gym", "spa", "restaurant", "ac"];

export const hotels: HotelSeed[] = [
  {
    slug: "burj-al-arab-jumeirah",
    name: "Burj Al Arab Jumeirah",
    nameAr: "برج العرب جميرا",
    city: "Dubai", cityAr: "دبي", country: "United Arab Emirates", countryAr: "الإمارات",
    starRating: 5, rating: 9.4, reviews: 3820, pricePerNight: 4800,
    description: "Iconic sail-shaped luxury hotel on its own island with private beach, butler service and panoramic Gulf views.",
    descriptionAr: "فندق فاخر على شكل شراع في جزيرة خاصة مع شاطئ خاص وخدمة الخادم الشخصي وإطلالات بانورامية على الخليج.",
    images: [img("1512453979798-5ea266f8880c"), img("1582719478250-c89cae4dc85b"), img("1611892440504-42a792e24d32")],
    amenities: ["wifi", "pool", "breakfast", "spa", "restaurant", "gym", "ac"],
  },
  {
    slug: "atlantis-the-palm",
    name: "Atlantis The Palm",
    nameAr: "أتلانتس النخلة",
    city: "Dubai", cityAr: "دبي", country: "United Arab Emirates", countryAr: "الإمارات",
    starRating: 5, rating: 9.1, reviews: 5210, pricePerNight: 2350,
    description: "Ocean-themed resort on Palm Jumeirah with an aquarium, waterpark and a dozen restaurants.",
    descriptionAr: "منتجع بطابع المحيط على نخلة جميرا مع أكواريوم وحديقة مائية واثني عشر مطعماً.",
    images: [img("1571003123894-1f0594d2b5d9"), img("1566073771259-6a8506099945"), img("1520250497591-112f2f40a3f4")],
    amenities: ["wifi", "pool", "breakfast", "parking", "spa", "restaurant", "gym", "ac"],
  },
  {
    slug: "rove-downtown-dubai",
    name: "Rove Downtown",
    nameAr: "روڤ داون تاون",
    city: "Dubai", cityAr: "دبي", country: "United Arab Emirates", countryAr: "الإمارات",
    starRating: 3, rating: 8.6, reviews: 4120, pricePerNight: 520,
    description: "Smart, affordable stay steps from Burj Khalifa and Dubai Mall with a rooftop pool.",
    descriptionAr: "إقامة عصرية بأسعار مناسبة على بعد خطوات من برج خليفة ودبي مول مع مسبح على السطح.",
    images: [img("1631049307264-da0ec9d70304"), img("1618773928121-c32242e63f39")],
    amenities: ["wifi", "pool", "gym", "restaurant", "ac"],
  },
  {
    slug: "four-seasons-cairo-nile-plaza",
    name: "Four Seasons Cairo at Nile Plaza",
    nameAr: "فورسيزونز القاهرة نايل بلازا",
    city: "Cairo", cityAr: "القاهرة", country: "Egypt", countryAr: "مصر",
    starRating: 5, rating: 9.2, reviews: 2760, pricePerNight: 1350,
    description: "Elegant riverside hotel with Nile-view rooms, lush gardens and award-winning dining.",
    descriptionAr: "فندق أنيق على ضفاف النيل مع غرف تطل على النهر وحدائق غناء ومطاعم حائزة على جوائز.",
    images: [img("1445019980597-93fa8acb246c"), img("1551882547-ff40c63fe5fa"), img("1539650116574-75c0c6d73f6e")],
    amenities: ["wifi", "pool", "breakfast", "parking", "spa", "restaurant", "gym", "ac"],
  },
  {
    slug: "steigenberger-pyramids-cairo",
    name: "Steigenberger Pyramids",
    nameAr: "شتايجنبرجر الأهرامات",
    city: "Cairo", cityAr: "القاهرة", country: "Egypt", countryAr: "مصر",
    starRating: 4, rating: 8.4, reviews: 1890, pricePerNight: 640,
    description: "Modern hotel near the Giza Plateau with a large pool and views of the pyramids.",
    descriptionAr: "فندق حديث بالقرب من هضبة الجيزة مع مسبح كبير وإطلالات على الأهرامات.",
    images: [img("1564501049412-61c2a3083791"), img("1566073771259-6a8506099945")],
    amenities: ["wifi", "pool", "breakfast", "parking", "restaurant", "ac"],
  },
  {
    slug: "the-ritz-carlton-riyadh",
    name: "The Ritz-Carlton Riyadh",
    nameAr: "ريتز كارلتون الرياض",
    city: "Riyadh", cityAr: "الرياض", country: "Saudi Arabia", countryAr: "السعودية",
    starRating: 5, rating: 9.3, reviews: 2140, pricePerNight: 1650,
    description: "Palatial hotel set in landscaped gardens with grand interiors, spa and fine dining.",
    descriptionAr: "فندق فخم وسط حدائق منسقة مع ديكورات فاخرة وسبا ومطاعم راقية.",
    images: [img("1582719478250-c89cae4dc85b"), img("1618773928121-c32242e63f39"), img("1611892440504-42a792e24d32")],
    amenities: ["wifi", "pool", "breakfast", "parking", "spa", "restaurant", "gym", "ac"],
  },
  {
    slug: "voco-riyadh",
    name: "voco Riyadh",
    nameAr: "ڤوكو الرياض",
    city: "Riyadh", cityAr: "الرياض", country: "Saudi Arabia", countryAr: "السعودية",
    starRating: 4, rating: 8.5, reviews: 1320, pricePerNight: 560,
    description: "Contemporary business hotel on King Fahd Road with an indoor pool and gym.",
    descriptionAr: "فندق أعمال عصري على طريق الملك فهد مع مسبح داخلي وصالة رياضية.",
    images: [img("1631049307264-da0ec9d70304"), img("1520250497591-112f2f40a3f4")],
    amenities: ["wifi", "pool", "breakfast", "parking", "gym", "ac"],
  },
  {
    slug: "rosewood-jeddah",
    name: "Rosewood Jeddah",
    nameAr: "روزوود جدة",
    city: "Jeddah", cityAr: "جدة", country: "Saudi Arabia", countryAr: "السعودية",
    starRating: 5, rating: 9.0, reviews: 980, pricePerNight: 1180,
    description: "Waterfront tower on the Corniche with Red Sea views and a rooftop infinity pool.",
    descriptionAr: "برج على الواجهة البحرية بالكورنيش مع إطلالات على البحر الأحمر ومسبح لا متناهٍ على السطح.",
    images: [img("1566073771259-6a8506099945"), img("1571003123894-1f0594d2b5d9")],
    amenities: ["wifi", "pool", "breakfast", "parking", "spa", "restaurant", "gym", "ac"],
  },
  {
    slug: "swissotel-al-maqam-makkah",
    name: "Swissôtel Al Maqam Makkah",
    nameAr: "سويس أوتيل المقام مكة",
    city: "Makkah", cityAr: "مكة المكرمة", country: "Saudi Arabia", countryAr: "السعودية",
    starRating: 5, rating: 8.9, reviews: 6400, pricePerNight: 980,
    description: "Part of the Abraj Al Bait complex, steps from the Masjid al-Haram with Haram-view suites.",
    descriptionAr: "جزء من مجمع أبراج البيت، على بعد خطوات من المسجد الحرام مع أجنحة تطل على الحرم.",
    images: [img("1551882547-ff40c63fe5fa"), img("1445019980597-93fa8acb246c")],
    amenities: ["wifi", "breakfast", "restaurant", "ac"],
  },
  {
    slug: "pullman-zamzam-madinah",
    name: "Pullman Zamzam Madinah",
    nameAr: "بولمان زمزم المدينة",
    city: "Madinah", cityAr: "المدينة المنورة", country: "Saudi Arabia", countryAr: "السعودية",
    starRating: 5, rating: 8.8, reviews: 5120, pricePerNight: 820,
    description: "Directly facing the Prophet's Mosque with spacious family rooms and 24/7 dining.",
    descriptionAr: "يقع مباشرة أمام المسجد النبوي مع غرف عائلية واسعة ومطاعم على مدار الساعة.",
    images: [img("1564501049412-61c2a3083791"), img("1618773928121-c32242e63f39")],
    amenities: ["wifi", "breakfast", "restaurant", "parking", "ac"],
  },
  {
    slug: "ciragan-palace-kempinski-istanbul",
    name: "Çırağan Palace Kempinski",
    nameAr: "قصر تشيراغان كمبينسكي",
    city: "Istanbul", cityAr: "إسطنبول", country: "Turkey", countryAr: "تركيا",
    starRating: 5, rating: 9.4, reviews: 2210, pricePerNight: 1720,
    description: "Restored Ottoman palace on the Bosphorus with an outdoor infinity pool and hammam.",
    descriptionAr: "قصر عثماني مُرمّم على مضيق البوسفور مع مسبح خارجي لا متناهٍ وحمام تركي.",
    images: [img("1541432901042-2d8bd64b4a9b"), img("1582719478250-c89cae4dc85b"), img("1611892440504-42a792e24d32")],
    amenities: ["wifi", "pool", "breakfast", "parking", "spa", "restaurant", "gym", "ac"],
  },
  {
    slug: "raffles-the-palm-dubai",
    name: "Raffles The Palm",
    nameAr: "رافلز النخلة",
    city: "Dubai", cityAr: "دبي", country: "United Arab Emirates", countryAr: "الإمارات",
    starRating: 5, rating: 9.2, reviews: 1740, pricePerNight: 2100,
    description: "Palatial beachfront resort with private beach, spa and Michelin-level restaurants.",
    descriptionAr: "منتجع فخم على الشاطئ مع شاطئ خاص وسبا ومطاعم بمستوى ميشلان.",
    images: [img("1520250497591-112f2f40a3f4"), img("1566073771259-6a8506099945")],
    amenities: ALL_AMENITIES,
  },
];
