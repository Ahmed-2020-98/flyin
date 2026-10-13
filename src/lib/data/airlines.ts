export type Airline = {
  code: string;
  name: string;
  nameAr: string;
  color: string;
};

// A pool of carriers used to synthesize flight search results. `color` drives
// the initials-avatar logo so we don't depend on external image assets.
export const airlines: Airline[] = [
  { code: "SV", name: "Saudia", nameAr: "السعودية", color: "#0a7d4b" },
  { code: "XY", name: "flynas", nameAr: "طيران ناس", color: "#00a3a1" },
  { code: "F3", name: "flyadeal", nameAr: "طيران أديل", color: "#5b2b8c" },
  { code: "EK", name: "Emirates", nameAr: "طيران الإمارات", color: "#d71921" },
  { code: "EY", name: "Etihad", nameAr: "الاتحاد", color: "#bd8b13" },
  { code: "QR", name: "Qatar Airways", nameAr: "الخطوط القطرية", color: "#5c0632" },
  { code: "GF", name: "Gulf Air", nameAr: "طيران الخليج", color: "#b8860b" },
  { code: "MS", name: "EgyptAir", nameAr: "مصر للطيران", color: "#0b3d91" },
  { code: "TK", name: "Turkish Airlines", nameAr: "الخطوط التركية", color: "#c8102e" },
  { code: "KU", name: "Kuwait Airways", nameAr: "الخطوط الكويتية", color: "#0057b8" },
  { code: "WY", name: "Oman Air", nameAr: "الطيران العماني", color: "#7a1f3d" },
  { code: "RJ", name: "Royal Jordanian", nameAr: "الملكية الأردنية", color: "#4b2e2e" },
];

export function airlineByCode(code: string): Airline | undefined {
  return airlines.find((a) => a.code === code);
}
