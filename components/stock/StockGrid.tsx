"use client";

import StockCard from "./StockCard";
import { VEHICLES, type Vehicle } from "@/lib/vehicles";
import { link } from "@/lib/asset";

// Re-export so existing imports keep working
export { VEHICLES };
export type { Vehicle };

export default function StockGrid({
  vehicles = VEHICLES,
}: {
  vehicles?: Vehicle[];
}) {
  if (vehicles.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-line shadow-card p-10 text-center">
        <div className="text-[40px] mb-3">📭</div>
        <h3 className="font-display text-xl font-bold text-ink mb-1.5">
          No vehicles match this filter
        </h3>
        <p className="text-[13.5px] text-muted max-w-sm mx-auto">
          Try a broader category, or save a search and we'll notify you the
          moment matching stock arrives.
        </p>
        <a
          href={link("/stock")}
          className="
            mt-5 inline-flex items-center justify-center
            h-11 px-5 rounded-md
            bg-secondary hover:bg-secondary-700 text-white
            font-semibold text-[13px]
            transition-colors
          "
        >
          Browse all stock
        </a>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
        {vehicles.map((v) => (
          <StockCard key={v.id} v={v} />
        ))}
      </div>

      {/* Pagination / load more */}
      <div className="mt-10 flex flex-col items-center gap-3">
        <button
          className="
            inline-flex items-center justify-center gap-2
            h-12 px-6 rounded-md
            bg-white border-2 border-secondary text-secondary
            font-semibold text-[14px]
            hover:bg-secondary hover:text-white
            transition-colors
          "
        >
          Load more
        </button>
        <div className="text-[12px] text-muted">
          Showing{" "}
          <span className="font-semibold text-ink">{vehicles.length}</span>{" "}
          of <span className="font-semibold text-ink">{vehicles.length}</span>{" "}
          vehicles
        </div>
      </div>
    </div>
  );
}
