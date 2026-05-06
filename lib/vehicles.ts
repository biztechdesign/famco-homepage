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
    badges: ["INSPECTED", "NEW ARRIVAL"],
    hasVideo: true,
    has3D: true,
    href: "/stock/volvo-fh-460-tractor",
  },
  {
    id: "2",
    title: "Volvo EC950E Crawler Excavator",
    description:
      "95-ton class, quarry-spec rock bucket, 8,400 hrs, factory undercarriage",
    brand: "Volvo CE",
    country: "UAE",
    countryFlag: "🇦🇪",
    year: 2019,
    hours: 8400,
    transmission: "Automatic",
    fuel: "Diesel",
    dealer: "TMH Umm Ramool",
    category: "Construction",
    oldPrice: 345000,
    price: 325000,
    image: "/products/volvo-ec950e.jpg",
    badges: ["INSPECTED", "0% FINANCE"],
    hasVideo: true,
  },
  {
    id: "3",
    title: "Volvo A60H Articulated Hauler",
    description:
      "60-ton hauler, off-highway tyres, automatic level control, FAMCO-certified",
    brand: "Volvo CE",
    country: "UAE",
    countryFlag: "🇦🇪",
    year: 2020,
    hours: 6800,
    transmission: "Automatic",
    fuel: "Diesel",
    dealer: "FAMCO DIP",
    category: "Construction",
    oldPrice: 612000,
    price: 575000,
    image: "/products/volvo-a60h.jpg",
    badges: ["INSPECTED", "SALE"],
    hasVideo: true,
    has3D: true,
  },
  {
    id: "4",
    title: "Linde H50D Diesel Forklift Fleet",
    description:
      "5-ton diesel forklift, side-shift fork positioner, ROPS cab, low hours",
    brand: "Linde",
    country: "UAE",
    countryFlag: "🇦🇪",
    year: 2021,
    hours: 3200,
    transmission: "Automatic",
    fuel: "Diesel",
    dealer: "FAMCO Umm Ramool",
    category: "Material handling",
    oldPrice: 92000,
    price: 86500,
    image: "/products/linde-fleet.jpg",
    badges: ["INSPECTED", "SALE"],
    has3D: true,
  },
  {
    id: "5",
    title: "Linde E60 Heavy Electric Forklift",
    description:
      "6-ton electric forklift, lithium battery, full charge in 90 min, 1,850 hrs",
    brand: "Linde",
    country: "UAE",
    countryFlag: "🇦🇪",
    year: 2022,
    hours: 1850,
    transmission: "Automatic",
    fuel: "Electric",
    dealer: "FAMCO Umm Ramool",
    category: "Material handling",
    price: 142000,
    image: "/products/linde-e60.jpg",
    badges: ["INSPECTED", "NEW ARRIVAL"],
    hasVideo: true,
  },
  {
    id: "6",
    title: "Eicher Skyline Pro 3014 Bus",
    description:
      "30+1 seater staff transport, AC, ABS, dual airbag, FAMCO warranty",
    brand: "Eicher",
    country: "UAE",
    countryFlag: "🇦🇪",
    year: 2023,
    km: 64000,
    transmission: "Manual",
    fuel: "Diesel",
    dealer: "FAMCO DIP",
    category: "Buses",
    oldPrice: 178000,
    price: 168000,
    image: "/products/eicher-bus-pair.jpg",
    badges: ["NEW ARRIVAL", "0% FINANCE"],
    hasVideo: true,
  },
  {
    id: "7",
    title: "Eicher Starline Bus — Factory Fresh",
    description:
      "Newly arrived inventory, multiple units available, white livery, AC ready",
    brand: "Eicher",
    country: "UAE",
    countryFlag: "🇦🇪",
    year: 2024,
    km: 8400,
    transmission: "Manual",
    fuel: "Diesel",
    dealer: "FAMCO DIP",
    category: "Buses",
    oldPrice: 192000,
    price: 184000,
    image: "/products/eicher-bus-fleet.jpg",
    badges: ["INSPECTED", "NEW ARRIVAL"],
  },
  {
    id: "8",
    title: "Volvo FH16 750 8×4 Tipper",
    description:
      "Heavy-spec tipper, 750 hp, hydraulic tipping body, 287k km, single owner",
    brand: "Volvo",
    country: "UAE",
    countryFlag: "🇦🇪",
    year: 2020,
    km: 287000,
    transmission: "AMT",
    fuel: "Diesel",
    euro: "Euro 5",
    drive: "8×4",
    dealer: "FAMCO DIP",
    category: "Trucks",
    oldPrice: 268000,
    price: 248000,
    image: "/products/volvo-fh-lineup.jpg",
    badges: ["INSPECTED", "0% FINANCE"],
    hasVideo: true,
    has3D: true,
  },
  {
    id: "9",
    title: "Volvo EC750D Excavator",
    description:
      "75-ton class, hardrock quarry-spec, hydraulic hammer ready, full hydraulics",
    brand: "Volvo CE",
    country: "UAE",
    countryFlag: "🇦🇪",
    year: 2021,
    hours: 5600,
    transmission: "Automatic",
    fuel: "Diesel",
    dealer: "TMH Umm Ramool",
    category: "Construction",
    price: 285000,
    image: "/products/volvo-ec750d.jpg",
    badges: ["INSPECTED"],
    hasVideo: true,
  },
];
