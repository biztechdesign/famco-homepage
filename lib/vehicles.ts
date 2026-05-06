/**
 * Shared vehicle data + types — safe to import from both server and client
 * components (no "use client" directive, no hooks, no event handlers).
 */

export type Vehicle = {
  id: string;
  title: string;
  description: string;
  brand: string;
  country: string;
  countryFlag?: string;
  year: number;
  km?: number;
  hours?: number;
  transmission?: "Manual" | "Automatic" | "AMT";
  fuel?: "Diesel" | "Electric" | "LPG";
  euro?: string;
  drive?: string;
  dealer?: string;
  category: string;
  oldPrice?: number;
  price: number;
  currency?: string;
  image: string;
  badges?: ("INSPECTED" | "NEW ARRIVAL" | "SALE" | "0% FINANCE")[];
  hasVideo?: boolean;
  has3D?: boolean;
  sketchfabId?: string;
  href?: string;
};

export const VEHICLES: Vehicle[] = [
  {
    id: "1",
    title: "Volvo FH 500 6×4 Tractor Head — Globetrotter XL",
    description:
      "Globetrotter XL cab, double bunk, I-Shift 12-speed, FAMCO Approved Grade A — Excellent",
    brand: "Volvo",
    country: "UAE",
    countryFlag: "🇦🇪",
    year: 2022,
    km: 210000,
    transmission: "AMT",
    fuel: "Diesel",
    euro: "Euro 5",
    drive: "6×4",
    dealer: "FAMCO DIP",
    category: "Trucks",
    oldPrice: 305000,
    price: 285000,
    image: "/products/detail-1.jpg",
    badges: ["NEW ARRIVAL"],
    hasVideo: true,
    has3D: true,
    sketchfabId: "748a51c9d1034efa896a2c917cad434f",
    href: "/stock/volvo-fh-460-tractor",
  },
  {
    id: "2",
    title: "Scania R 450 Highline 4×2 Tractor",
    description:
      "Highline cab, Opticruise 12-speed, Euro 6, single owner — UAE delivered",
    brand: "Scania",
    country: "UAE",
    countryFlag: "🇦🇪",
    year: 2021,
    km: 248000,
    transmission: "AMT",
    fuel: "Diesel",
    euro: "Euro 6",
    drive: "4×2",
    dealer: "FAMCO DIP",
    category: "Trucks",
    oldPrice: 215000,
    price: 198000,
    image: "/products/scania-r-tractor.jpg",
    badges: ["0% FINANCE"],
    hasVideo: true,
  },
  {
    id: "3",
    title: "MAN TGX 18.500 4×2 Tractor",
    description:
      "XLX cab, retarder, leather interior, full MAN service history",
    brand: "MAN",
    country: "UAE",
    countryFlag: "🇦🇪",
    year: 2020,
    km: 312000,
    transmission: "AMT",
    fuel: "Diesel",
    euro: "Euro 6",
    drive: "4×2",
    dealer: "FAMCO Umm Ramool",
    category: "Trucks",
    oldPrice: 186000,
    price: 172000,
    image: "/products/man-tgx-blue.jpg",
    badges: ["SALE"],
    hasVideo: true,
    has3D: true,
  },
  {
    id: "4",
    title: "Volvo FH 460 4×2 Globetrotter",
    description:
      "Globetrotter cab, sleeper, lane-keep assist, single owner since new",
    brand: "Volvo",
    country: "UAE",
    countryFlag: "🇦🇪",
    year: 2022,
    km: 168000,
    transmission: "AMT",
    fuel: "Diesel",
    euro: "Euro 6",
    drive: "4×2",
    dealer: "FAMCO DIP",
    category: "Trucks",
    oldPrice: 245000,
    price: 228000,
    image: "/products/volvo-fh-white.jpg",
    badges: ["NEW ARRIVAL"],
    has3D: true,
  },
  {
    id: "5",
    title: "Scania R 410 Streamline 4×2",
    description:
      "Streamline cab, GRSO 905R Opticruise, fleet maintained, low km",
    brand: "Scania",
    country: "UAE",
    countryFlag: "🇦🇪",
    year: 2019,
    km: 384000,
    transmission: "AMT",
    fuel: "Diesel",
    euro: "Euro 5",
    drive: "4×2",
    dealer: "FAMCO Umm Ramool",
    category: "Trucks",
    price: 154000,
    image: "/products/scania-r-blue.jpg",
    badges: [],
    hasVideo: true,
  },
  {
    id: "6",
    title: "Volvo FH 500 6×4 Tractor — White",
    description:
      "Globetrotter XL, double bunk, fridge, retarder, FAMCO Approved",
    brand: "Volvo",
    country: "UAE",
    countryFlag: "🇦🇪",
    year: 2021,
    km: 224000,
    transmission: "AMT",
    fuel: "Diesel",
    euro: "Euro 6",
    drive: "6×4",
    dealer: "FAMCO DIP",
    category: "Trucks",
    oldPrice: 268000,
    price: 252000,
    image: "/products/volvo-fh-tractor.jpg",
    badges: ["0% FINANCE"],
    hasVideo: true,
    has3D: true,
  },
  {
    id: "7",
    title: "MAN TGX 18.540 4×2 Long-Haul",
    description:
      "Hydraulic 5th wheel, twin tanks, LED lighting, factory-fresh interior",
    brand: "MAN",
    country: "UAE",
    countryFlag: "🇦🇪",
    year: 2023,
    km: 86000,
    transmission: "AMT",
    fuel: "Diesel",
    euro: "Euro 6",
    drive: "4×2",
    dealer: "TMH Umm Ramool",
    category: "Trucks",
    oldPrice: 245000,
    price: 232000,
    image: "/products/man-tgx-green.jpg",
    badges: ["NEW ARRIVAL"],
  },
  {
    id: "8",
    title: "Volvo 9700 Luxury Coach Bus",
    description:
      "53+1 seater coach, premium AC, reclining seats, USB ports, low km",
    brand: "Volvo",
    country: "UAE",
    countryFlag: "🇦🇪",
    year: 2022,
    km: 142000,
    transmission: "Manual",
    fuel: "Diesel",
    dealer: "FAMCO DIP",
    category: "Buses",
    oldPrice: 348000,
    price: 325000,
    image: "/products/coach-bus.jpg",
    badges: ["0% FINANCE"],
    hasVideo: true,
    has3D: true,
  },
  {
    id: "9",
    title: "Volvo EC220E Crawler Excavator",
    description:
      "22-ton class, hydraulic hammer ready, factory undercarriage, low hours",
    brand: "Volvo CE",
    country: "UAE",
    countryFlag: "🇦🇪",
    year: 2022,
    hours: 4200,
    transmission: "Automatic",
    fuel: "Diesel",
    dealer: "TMH Umm Ramool",
    category: "Construction",
    oldPrice: 268000,
    price: 248000,
    image: "/products/volvo-ec950e.jpg",
    badges: ["NEW ARRIVAL"],
    hasVideo: true,
  },
];
