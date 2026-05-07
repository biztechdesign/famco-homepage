"use client";

import { useState } from "react";
import { ChevronDown, Grid3x3, List } from "lucide-react";

export type SortKey =
  | "newest"
  | "price-asc"
  | "price-desc"
  | "year-desc"
  | "year-asc"
  | "mileage-asc";

const SORTS: { key: SortKey; label: string }[] = [
  { key: "newest", label: "Newest first" },
  { key: "price-asc", label: "Price: low to high" },
  { key: "price-desc", label: "Price: high to low" },
  { key: "year-desc", label: "Year: newest" },
  { key: "year-asc", label: "Year: oldest" },
  { key: "mileage-asc", label: "Mileage: low to high" },
];

/**
 * Sort dropdown + grid/list view toggle. Sits between title and grid.
 * `sort` is controlled by the parent so the listing actually re-orders.
 */
export default function StockSortBar({
  count,
  sort,
  onSortChange,
}: {
  count: number;
  sort: SortKey;
  onSortChange: (s: SortKey) => void;
}) {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [open, setOpen] = useState(false);
  const currentLabel =
    SORTS.find((s) => s.key === sort)?.label ?? SORTS[0].label;

  return (
    <div className="bg-white rounded-lg border border-line shadow-card px-4 py-3 flex items-center justify-between gap-3">
      <div className="text-[12.5px] text-muted">
        Showing{" "}
        <span className="font-semibold text-ink tabular-nums">
          {count.toLocaleString("en-AE")}
        </span>{" "}
        vehicles
      </div>

      <div className="flex items-center gap-2 shrink-0">
        {/* Sort dropdown */}
        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="
              inline-flex items-center gap-2
              h-9 px-3 rounded-md
              bg-bgalt border border-line
              text-[12.5px] font-medium text-ink
              hover:border-secondary
              transition-colors
            "
          >
            <span className="text-muted text-[11.5px] hidden sm:inline">
              Sort:
            </span>
            {currentLabel}
            <ChevronDown
              className={`h-3.5 w-3.5 text-muted transition-transform ${
                open ? "rotate-180" : ""
              }`}
            />
          </button>
          {open && (
            <>
              <button
                aria-hidden
                className="fixed inset-0 z-10"
                onClick={() => setOpen(false)}
              />
              <ul
                role="listbox"
                className="
                  absolute right-0 top-full mt-2 z-20
                  min-w-[220px] bg-white rounded-md border border-line
                  shadow-lift py-1
                "
              >
                {SORTS.map((s) => (
                  <li key={s.key}>
                    <button
                      onClick={() => {
                        onSortChange(s.key);
                        setOpen(false);
                      }}
                      className={`
                        w-full text-left px-3.5 py-2 text-[12.5px]
                        hover:bg-bgalt
                        ${
                          s.key === sort
                            ? "text-secondary font-semibold"
                            : "text-ink"
                        }
                      `}
                    >
                      {s.label}
                    </button>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>

        {/* View toggle */}
        <div className="hidden sm:flex items-center gap-0.5 bg-bgalt rounded-md p-0.5 border border-line">
          <button
            onClick={() => setView("grid")}
            aria-label="Grid view"
            className={`
              h-8 w-8 rounded flex items-center justify-center
              transition-colors
              ${
                view === "grid"
                  ? "bg-white text-secondary shadow-card"
                  : "text-muted hover:text-ink"
              }
            `}
          >
            <Grid3x3 className="h-4 w-4" />
          </button>
          <button
            onClick={() => setView("list")}
            aria-label="List view"
            className={`
              h-8 w-8 rounded flex items-center justify-center
              transition-colors
              ${
                view === "list"
                  ? "bg-white text-secondary shadow-card"
                  : "text-muted hover:text-ink"
              }
            `}
          >
            <List className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
