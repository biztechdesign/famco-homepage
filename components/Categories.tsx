import { ArrowRight } from "lucide-react";

const CATS = [
  { name: "Trucks", sub: "Heavy-duty Volvo, Eicher, Renault", count: 124, img: "/placeholders/cat-trucks.svg" },
  { name: "Buses", sub: "Volvo coaches & city buses", count: 38, img: "/placeholders/cat-buses.svg" },
  { name: "Construction Equipment", sub: "Excavators, loaders, dozers", count: 86, img: "/placeholders/cat-construction.svg" },
  { name: "Material Handling", sub: "Linde forklifts & warehouse", count: 52, img: "/placeholders/cat-material.svg" },
  { name: "Power & Industrial", sub: "Himoinsa, AGG generators", count: 24, img: "/placeholders/cat-power.svg" },
  { name: "Marine Solutions", sub: "Yanmar marine engines", count: 12, img: "/placeholders/cat-marine.svg" },
];

export default function Categories() {
  return (
    <section className="py-16 lg:py-24">
      <div className="container">
        <div className="flex items-end justify-between mb-10">
          <div>
            <div className="eyebrow mb-2">Browse Inventory</div>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-ink">
              Find the right equipment for the job
            </h2>
          </div>
          <a
            href="#"
            className="hidden md:flex items-center gap-2 text-secondary font-semibold hover:gap-3 transition-all"
          >
            View all stock <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {CATS.map((c) => (
            <a
              key={c.name}
              href="#"
              className="group relative block rounded-xl overflow-hidden border border-line bg-white shadow-card hover:shadow-lift transition-all"
            >
              <div className="aspect-[4/3] overflow-hidden bg-bgalt">
                <img
                  src={c.img}
                  alt={c.name}
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5">
                <h3 className="font-display text-2xl font-bold text-ink mb-1">
                  {c.name}
                </h3>
                <p className="text-sm text-muted mb-3">{c.sub}</p>
                <div className="flex items-center justify-between pt-3 border-t border-line">
                  <span className="text-sm font-semibold text-ink">
                    {c.count} in stock
                  </span>
                  <span className="text-secondary font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                    Browse <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-secondary scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
