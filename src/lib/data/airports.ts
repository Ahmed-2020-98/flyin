export type Airport = {
  code: string;
  city: string;
  cityAr: string;
  country: string;
  countryAr: string;
  name: string;
  nameAr: string;
  lat: number;
  lng: number;
};

// Reference data used both for the airport autocomplete and for generating
// realistic (distance-based) mock flight results.
export const airports: Airport[] = [
  { code: "RUH", city: "Riyadh", cityAr: "الرياض", country: "Saudi Arabia", countryAr: "السعودية", name: "King Khalid International", nameAr: "مطار الملك خالد الدولي", lat: 24.9576, lng: 46.6988 },
  { code: "JED", city: "Jeddah", cityAr: "جدة", country: "Saudi Arabia", countryAr: "السعودية", name: "King Abdulaziz International", nameAr: "مطار الملك عبدالعزيز الدولي", lat: 21.6796, lng: 39.1565 },
  { code: "DMM", city: "Dammam", cityAr: "الدمام", country: "Saudi Arabia", countryAr: "السعودية", name: "King Fahd International", nameAr: "مطار الملك فهد الدولي", lat: 26.4712, lng: 49.7979 },
  { code: "MED", city: "Madinah", cityAr: "المدينة المنورة", country: "Saudi Arabia", countryAr: "السعودية", name: "Prince Mohammad bin Abdulaziz", nameAr: "مطار الأمير محمد بن عبدالعزيز", lat: 24.5534, lng: 39.7051 },
  { code: "DXB", city: "Dubai", cityAr: "دبي", country: "United Arab Emirates", countryAr: "الإمارات", name: "Dubai International", nameAr: "مطار دبي الدولي", lat: 25.2532, lng: 55.3657 },
  { code: "AUH", city: "Abu Dhabi", cityAr: "أبوظبي", country: "United Arab Emirates", countryAr: "الإمارات", name: "Zayed International", nameAr: "مطار زايد الدولي", lat: 24.433, lng: 54.6511 },
  { code: "SHJ", city: "Sharjah", cityAr: "الشارقة", country: "United Arab Emirates", countryAr: "الإمارات", name: "Sharjah International", nameAr: "مطار الشارقة الدولي", lat: 25.3286, lng: 55.5172 },
  { code: "CAI", city: "Cairo", cityAr: "القاهرة", country: "Egypt", countryAr: "مصر", name: "Cairo International", nameAr: "مطار القاهرة الدولي", lat: 30.1219, lng: 31.4056 },
  { code: "HRG", city: "Hurghada", cityAr: "الغردقة", country: "Egypt", countryAr: "مصر", name: "Hurghada International", nameAr: "مطار الغردقة الدولي", lat: 27.1783, lng: 33.7994 },
  { code: "SSH", city: "Sharm El Sheikh", cityAr: "شرم الشيخ", country: "Egypt", countryAr: "مصر", name: "Sharm El Sheikh International", nameAr: "مطار شرم الشيخ الدولي", lat: 27.9773, lng: 34.395 },
  { code: "DOH", city: "Doha", cityAr: "الدوحة", country: "Qatar", countryAr: "قطر", name: "Hamad International", nameAr: "مطار حمد الدولي", lat: 25.2731, lng: 51.608 },
  { code: "KWI", city: "Kuwait City", cityAr: "الكويت", country: "Kuwait", countryAr: "الكويت", name: "Kuwait International", nameAr: "مطار الكويت الدولي", lat: 29.2266, lng: 47.9689 },
  { code: "BAH", city: "Manama", cityAr: "المنامة", country: "Bahrain", countryAr: "البحرين", name: "Bahrain International", nameAr: "مطار البحرين الدولي", lat: 26.2708, lng: 50.6336 },
  { code: "MCT", city: "Muscat", cityAr: "مسقط", country: "Oman", countryAr: "عُمان", name: "Muscat International", nameAr: "مطار مسقط الدولي", lat: 23.5933, lng: 58.2844 },
  { code: "AMM", city: "Amman", cityAr: "عمّان", country: "Jordan", countryAr: "الأردن", name: "Queen Alia International", nameAr: "مطار الملكة علياء الدولي", lat: 31.7226, lng: 35.9932 },
  { code: "BEY", city: "Beirut", cityAr: "بيروت", country: "Lebanon", countryAr: "لبنان", name: "Rafic Hariri International", nameAr: "مطار رفيق الحريري الدولي", lat: 33.8209, lng: 35.4884 },
  { code: "IST", city: "Istanbul", cityAr: "إسطنبول", country: "Turkey", countryAr: "تركيا", name: "Istanbul Airport", nameAr: "مطار إسطنبول", lat: 41.2753, lng: 28.7519 },
  { code: "CMN", city: "Casablanca", cityAr: "الدار البيضاء", country: "Morocco", countryAr: "المغرب", name: "Mohammed V International", nameAr: "مطار محمد الخامس الدولي", lat: 33.3675, lng: -7.5898 },
  { code: "TUN", city: "Tunis", cityAr: "تونس", country: "Tunisia", countryAr: "تونس", name: "Tunis-Carthage International", nameAr: "مطار تونس قرطاج الدولي", lat: 36.851, lng: 10.2272 },
  { code: "LHR", city: "London", cityAr: "لندن", country: "United Kingdom", countryAr: "المملكة المتحدة", name: "Heathrow", nameAr: "مطار هيثرو", lat: 51.47, lng: -0.4543 },
  { code: "CDG", city: "Paris", cityAr: "باريس", country: "France", countryAr: "فرنسا", name: "Charles de Gaulle", nameAr: "مطار شارل ديغول", lat: 49.0097, lng: 2.5479 },
  { code: "FCO", city: "Rome", cityAr: "روما", country: "Italy", countryAr: "إيطاليا", name: "Leonardo da Vinci–Fiumicino", nameAr: "مطار فيوميتشينو", lat: 41.8003, lng: 12.2389 },
  { code: "MAD", city: "Madrid", cityAr: "مدريد", country: "Spain", countryAr: "إسبانيا", name: "Adolfo Suárez Madrid–Barajas", nameAr: "مطار مدريد باراخاس", lat: 40.4936, lng: -3.5668 },
  { code: "BCN", city: "Barcelona", cityAr: "برشلونة", country: "Spain", countryAr: "إسبانيا", name: "Josep Tarradellas Barcelona–El Prat", nameAr: "مطار برشلونة", lat: 41.2974, lng: 2.0833 },
  { code: "FRA", city: "Frankfurt", cityAr: "فرانكفورت", country: "Germany", countryAr: "ألمانيا", name: "Frankfurt Airport", nameAr: "مطار فرانكفورت", lat: 50.0379, lng: 8.5622 },
  { code: "JFK", city: "New York", cityAr: "نيويورك", country: "United States", countryAr: "الولايات المتحدة", name: "John F. Kennedy International", nameAr: "مطار جون كينيدي الدولي", lat: 40.6413, lng: -73.7781 },
  { code: "LAX", city: "Los Angeles", cityAr: "لوس أنجلوس", country: "United States", countryAr: "الولايات المتحدة", name: "Los Angeles International", nameAr: "مطار لوس أنجلوس الدولي", lat: 33.9416, lng: -118.4085 },
  { code: "BKK", city: "Bangkok", cityAr: "بانكوك", country: "Thailand", countryAr: "تايلاند", name: "Suvarnabhumi Airport", nameAr: "مطار سوفارنابومي", lat: 13.69, lng: 100.7501 },
  { code: "KUL", city: "Kuala Lumpur", cityAr: "كوالالمبور", country: "Malaysia", countryAr: "ماليزيا", name: "Kuala Lumpur International", nameAr: "مطار كوالالمبور الدولي", lat: 2.7456, lng: 101.7099 },
  { code: "SIN", city: "Singapore", cityAr: "سنغافورة", country: "Singapore", countryAr: "سنغافورة", name: "Changi Airport", nameAr: "مطار شانغي", lat: 1.3644, lng: 103.9915 },
  { code: "BOM", city: "Mumbai", cityAr: "مومباي", country: "India", countryAr: "الهند", name: "Chhatrapati Shivaji Maharaj International", nameAr: "مطار مومباي الدولي", lat: 19.0896, lng: 72.8656 },
  { code: "DEL", city: "New Delhi", cityAr: "نيودلهي", country: "India", countryAr: "الهند", name: "Indira Gandhi International", nameAr: "مطار إنديرا غاندي الدولي", lat: 28.5562, lng: 77.1 },
  { code: "MLE", city: "Maldives", cityAr: "المالديف", country: "Maldives", countryAr: "المالديف", name: "Velana International", nameAr: "مطار فيلانا الدولي", lat: 4.1918, lng: 73.529 },
  { code: "IKA", city: "Tehran", cityAr: "طهران", country: "Iran", countryAr: "إيران", name: "Imam Khomeini International", nameAr: "مطار الإمام الخميني الدولي", lat: 35.4161, lng: 51.1522 },
];

export function findAirport(code: string): Airport | undefined {
  return airports.find((a) => a.code === code.toUpperCase());
}

export function searchAirports(query: string, limit = 8): Airport[] {
  const q = query.trim().toLowerCase();
  if (!q) return airports.slice(0, limit);
  return airports
    .filter(
      (a) =>
        a.code.toLowerCase().includes(q) ||
        a.city.toLowerCase().includes(q) ||
        a.cityAr.includes(query.trim()) ||
        a.country.toLowerCase().includes(q) ||
        a.name.toLowerCase().includes(q),
    )
    .slice(0, limit);
}
