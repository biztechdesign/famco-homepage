import VehicleCard, { Vehicle } from "./VehicleCard";
import { ArrowRight } from "lucide-react";

const ITEMS: Vehicle[] = [
  {
    id: "1",
    title: "Volvo FH 460 6×4 Tractor",
    year: 2019,
    km: "412,000 km",
    euro: "Euro 5",
    location: "FAMCO DIP, Dubai",
    price: "AED 178,000",
    image: "/placeholders/v-volvo-fh.svg",
    badges: ["INSPECTED", "NEW ARRIVAL"],
  },
  {
    id: "2",
    title: "Doosan DX340LCA Excavator",
    year: 2020,
    km: "6,800 hrs",
    location: "FAMCO Umm Ramool",
    price: "AED 295,000",
    image: "/placeholders/v-doosan.svg",
    badges: ["INSPECTED"],
  },
  {
    id: "3",
    title: "Linde H50D Diesel Forklift",
    year: 2021,
    km: "3,200 hrs",
    location: "FAMCO Umm Ramool",
    price: "AED 86,500",
    image: "/placeholders/v-linde.svg",
    badges: ["INSPECTED", "SALE"],
  },
  {
    id: "4",
    title: "Volvo B11R Coach Bus",
    year: 2018,
    km: "520,000 km",
    euro: "Euro 5",
    location: "FAMCO DIP, Dubai",
    price: "AED 215,000",
    image: "/placeholders/v-volvo-bus.svg",
    badges: ["INSPECTED"],
  },
  {
    id: "5",
    title: "Eicher Pro 6049 Tipper",
    year: 2022,
    km: "98,000 km",
    location: "TMH Umm Ramool",
    price: "AED 142,000",
    image: "/placeholders/v-eicher.svg",
    badges: ["NEW ARRIVAL"],
  },
  {
    id: "6",
    title: "Himoinsa HFW-200 Generator",
    year: 2020,
    km: "4,100 hrs",
    location: "FAMCO DIP, Dubai",
    price: "AED 64,000",
    image: "/placeholders/v-himoinsa.svg",
    badges: ["INSPECTED"],
  },
];

export default function Featured() {
  return (
    <section className="bg-bgalt py-16 lg:py-24">
      <div className="container">
        <div className="flex items-end justify-between mb-10">
          <div>
            <div className="eyebrow mb-2">Handpicked</div>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-ink">
              Latest arrivals at FAMCO
            </h2>
          </div>
          <a
            href="#"
            className="hidden md:flex items-center gap-2 text-secondary font-semibold hover:gap-3 transition-all"
          >
            View all stock <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {ITEMS.slice(0, 4).map((v) => (
            <VehicleCard key={v.id} v={v} />
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mt-5">
          {ITEMS.slice(4).map((v) => (
            <VehicleCard key={v.id} v={v} />
          ))}
        </div>
      </div>
    </section>
  );
}
