export type CabinClass = "economy" | "premium" | "business" | "first";

export type TripType = "roundtrip" | "oneway";

export type FlightOffer = {
  id: string; // opaque token that encodes the offer (flights are not persisted)
  airlineCode: string;
  flightNumber: string;
  origin: string; // airport code
  destination: string; // airport code
  departISO: string;
  arriveISO: string;
  durationMin: number;
  stops: number;
  cabin: CabinClass;
  price: number;
  seatsLeft: number;
};

export type FlightSearchParams = {
  origin: string;
  destination: string;
  departDate: string;
  returnDate?: string;
  adults: number;
  children: number;
  infants: number;
  cabin: CabinClass;
  tripType: TripType;
};

export type HotelDTO = {
  id: string;
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

export type BookingType = "flight" | "hotel" | "package";
