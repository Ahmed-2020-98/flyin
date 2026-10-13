const img = (id: string) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1200&q=70`;

export type OfferSeed = {
  slug: string;
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  image: string;
  discountPct: number;
  destination: string;
  destinationAr: string;
  code: string;
  validDays: number; // days from seed time until the offer expires
};

export const offers: OfferSeed[] = [
  {
    slug: "egypt-15-off",
    title: "15% off flights to Egypt", titleAr: "خصم 15% على رحلات مصر",
    description: "Book your flight to Cairo, Hurghada or Sharm El Sheikh and save 15%.",
    descriptionAr: "احجز رحلتك إلى القاهرة أو الغردقة أو شرم الشيخ ووفّر 15%.",
    image: img("1539650116574-75c0c6d73f6e"), discountPct: 15,
    destination: "Egypt", destinationAr: "مصر", code: "EGYPT15", validDays: 45,
  },
  {
    slug: "dubai-5-off",
    title: "5% off Dubai getaways", titleAr: "خصم 5% على عطلات دبي",
    description: "Flights and hotels to Dubai with an extra 5% discount this season.",
    descriptionAr: "رحلات وفنادق إلى دبي مع خصم إضافي 5% هذا الموسم.",
    image: img("1512453979798-5ea266f8880c"), discountPct: 5,
    destination: "Dubai", destinationAr: "دبي", code: "DUBAI5", validDays: 30,
  },
  {
    slug: "sixflags-25-off",
    title: "Up to 25% off Six Flags packages", titleAr: "خصم حتى 25% على باقات سيكس فلاجز",
    description: "Family packages to Qiddiya's Six Flags with savings up to 25%.",
    descriptionAr: "باقات عائلية إلى سيكس فلاجز القدية بخصم يصل إلى 25%.",
    image: img("1513889961551-628c1e5e2ee9"), discountPct: 25,
    destination: "Riyadh", destinationAr: "الرياض", code: "SIXFLAGS25", validDays: 60,
  },
  {
    slug: "morocco-12-off",
    title: "12% off Morocco escapes", titleAr: "خصم 12% على رحلات المغرب",
    description: "Discover Casablanca and Marrakech with 12% off selected flights.",
    descriptionAr: "اكتشف الدار البيضاء ومراكش بخصم 12% على رحلات مختارة.",
    image: img("1489749798305-4fea3ae63d43"), discountPct: 12,
    destination: "Morocco", destinationAr: "المغرب", code: "MOROCCO12", validDays: 40,
  },
  {
    slug: "app-only-60",
    title: "Up to 60 SAR off in the app", titleAr: "خصم حتى 60 ريال في التطبيق",
    description: "Download the Flyin app and get up to 60 SAR off your first booking.",
    descriptionAr: "حمّل تطبيق فلاي إن واحصل على خصم حتى 60 ريال على أول حجز.",
    image: img("1520923642038-b4259acecbd7"), discountPct: 10,
    destination: "Worldwide", destinationAr: "حول العالم", code: "APP60", validDays: 90,
  },
  {
    slug: "spain-18-off",
    title: "18% off flights to Spain", titleAr: "خصم 18% على رحلات إسبانيا",
    description: "Madrid and Barcelona await — book now and save 18%.",
    descriptionAr: "مدريد وبرشلونة بانتظارك — احجز الآن ووفّر 18%.",
    image: img("1583422409516-2895a77efded"), discountPct: 18,
    destination: "Spain", destinationAr: "إسبانيا", code: "SPAIN18", validDays: 50,
  },
];
