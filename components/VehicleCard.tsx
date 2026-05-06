import { Heart, MapPin, ArrowRight } from "lucide-react";

export type Vehicle = {
  id: string;
  title: string;
  year: number;
  km: string;
  euro?: string;
  location: string;
  price: string;
  image: string;
  badges?: ("INSPECTED" | "NEW ARRIVAL" | "SALE")[];
};

const BADGE_STYLES: Record<string, string> = {
  INSPECTED: "bg-primary text-white",
  "NEW ARRIVAL": "bg-secondary text-white",
  SALE: "bg-secondary text-white",
};

export default function VehicleCard({ v }: { v: Vehicle }) {
  return (
    <article className="group bg-white rounded-xl overflow-hidden border border-line shadow-card hover:shadow-lift transition-all">
      <div className="relative aspect-[4/3] overflow-hidden bg-bgalt">
        <img
          src={v.image}
          alt={v.title}
          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {v.badges?.map((b) => (
            <span
              key={b}
              className={`text-[10px] font-bold tracking-wider px-2 py-1 rounded ${BADGE_STYLES[b]}`}
            >
              {b}
            </span>
          ))}
        </div>
        <button
          className="absolute top-3 right-3 h-9 w-9 rounded-full bg-white/95 hover:bg-white flex items-center justify-center shadow-card"
          aria-label="Save"
        >
          <Heart className="h-4 w-4 text-ink" />
        </button>
      </div>

      <div className="p-5">
        <h3 className="font-display text-xl font-bold text-ink leading-tight mb-2 line-clamp-1">
          {v.title}
        </h3>
        <div className="flex flex-wrap gap-1.5 mb-3">
          <Chip>{v.year}</Chip>
          <Chip>{v.km}</Chip>
          {v.euro && <Chip>{v.euro}</Chip>}
        </div>
        <div className="flex items-center gap-1.5 text-sm text-muted mb-4">
          <MapPin className="h-3.5 w-3.5" /> {v.location}
        </div>
        <div className="flex items-end justify-between pt-3 border-t border-line">
          <div>
            <div className="text-xs text-muted">Price</div>
            <div className="font-display text-2xl font-bold text-primary leading-none">
              {v.price}
            </div>
            <div className="text-[11px] text-muted mt-1">excl. VAT</div>
          </div>
          <a
            href="#"
            className="text-ink font-semibold text-sm flex items-center gap-1 hover:gap-2 hover:text-secondary transition-all"
          >
            View <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </article>
  );
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-xs bg-bgalt text-ink px-2 py-1 rounded font-medium">
      {children}
    </span>
  );
}
