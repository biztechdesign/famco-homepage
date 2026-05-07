"use client";

import { useMemo, useState } from "react";
import { ChevronDown, X, SlidersHorizontal, Bell } from "lucide-react";
import SaveSearchModal from "./SaveSearchModal";

type Group = {
  id: string;
  label: string;
  options: { value: string; label: string; count: number; flag?: string }[];
};

const GROUPS: Group[] = [
  {
    id: "category",
    label: "Category",
    options: [
      { value: "trucks", label: "Trucks", count: 124 },
      { value: "buses", label: "Buses", count: 38 },
      { value: "construction", label: "Construction equipment", count: 86 },
      { value: "material-handling", label: "Material handling", count: 52 },
      { value: "power", label: "Power & industrial", count: 24 },
      { value: "trailers", label: "Trailers", count: 31 },
    ],
  },
  {
    id: "country",
    label: "Country",
    options: [
      { value: "uae", label: "United Arab Emirates", count: 9, flag: "ae" },
      { value: "saudi", label: "Saudi Arabia", count: 3, flag: "sa" },
      { value: "oman", label: "Oman", count: 1, flag: "om" },
      { value: "qatar", label: "Qatar", count: 1, flag: "qa" },
      { value: "bahrain", label: "Bahrain", count: 1, flag: "bh" },
      { value: "kuwait", label: "Kuwait", count: 1, flag: "kw" },
    ],
  },
  {
    id: "brand",
    label: "Brand",
    options: [
      { value: "volvo", label: "Volvo", count: 89 },
      { value: "eicher", label: "Eicher", count: 42 },
      { value: "linde", label: "Linde", count: 36 },
      { value: "doosan", label: "Doosan", count: 28 },
      { value: "renault", label: "Renault", count: 21 },
      { value: "mercedes", label: "Mercedes-Benz", count: 18 },
      { value: "man", label: "MAN", count: 14 },
      { value: "scania", label: "Scania", count: 11 },
      { value: "himoinsa", label: "Himoinsa", count: 12 },
    ],
  },
  {
    id: "year",
    label: "Year",
    options: [
      { value: "2024", label: "2024+", count: 31 },
      { value: "2020-2023", label: "2020 – 2023", count: 142 },
      { value: "2015-2019", label: "2015 – 2019", count: 98 },
      { value: "before-2015", label: "Before 2015", count: 41 },
    ],
  },
  {
    id: "fuel",
    label: "Fuel type",
    options: [
      { value: "diesel", label: "Diesel", count: 287 },
      { value: "electric", label: "Electric", count: 18 },
      { value: "lpg", label: "LPG", count: 7 },
    ],
  },
  {
    id: "drive",
    label: "Drive configuration",
    options: [
      { value: "4x2", label: "4×2", count: 88 },
      { value: "6x2", label: "6×2", count: 45 },
      { value: "6x4", label: "6×4", count: 72 },
      { value: "8x4", label: "8×4", count: 12 },
    ],
  },
  {
    id: "condition",
    label: "Condition",
    options: [
      { value: "inspected", label: "Inspected", count: 256 },
      { value: "new-arrival", label: "New arrival", count: 38 },
      { value: "sale", label: "On sale", count: 47 },
    ],
  },
];

export default function StockFilters({
  resultCount = 312,
  selected,
  onChange,
  priceMin,
  priceMax,
  onPriceMinChange,
  onPriceMaxChange,
}: {
  resultCount?: number;
  selected: Record<string, string[]>;
  onChange: (next: Record<string, string[]>) => void;
  priceMin: number;
  priceMax: number;
  onPriceMinChange: (n: number) => void;
  onPriceMaxChange: (n: number) => void;
}) {
  const [openGroups, setOpenGroups] = useState<Set<string>>(new Set());
  const [saveOpen, setSaveOpen] = useState(false);

  const toggle = (groupId: string, value: string) => {
    const current = selected[groupId] ?? [];
    const next = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    onChange({ ...selected, [groupId]: next });
  };

  const toggleGroup = (groupId: string) => {
    setOpenGroups((prev) => {
      const next = new Set(prev);
      if (next.has(groupId)) next.delete(groupId);
      else next.add(groupId);
      return next;
    });
  };

  const totalSelected = Object.values(selected).reduce(
    (sum, arr) => sum + arr.length,
    0,
  );
  const hasFilters = totalSelected > 0;

  const clearAll = () => onChange({});

  // Human-readable summary of the current filter for the email-alerts modal
  const filterSummary = useMemo(() => {
    const parts: string[] = [];
    for (const g of GROUPS) {
      const arr = selected[g.id];
      if (!arr || arr.length === 0) continue;
      const labels = arr
        .map((v) => g.options.find((o) => o.value === v)?.label)
        .filter(Boolean);
      if (labels.length) parts.push(`${g.label}: ${labels.join(", ")}`);
    }
    if (priceMin > 0 || priceMax < 500000) {
      parts.push(`Price: AED ${priceMin.toLocaleString()} – AED ${priceMax.toLocaleString()}`);
    }
    return parts.length ? parts.join(" · ") : "All used trucks, vans & machinery";
  }, [selected, priceMin, priceMax]);

  return (
    <aside className="lg:sticky lg:top-32">
      <div className="bg-white rounded-xl border border-line shadow-card overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between gap-2 px-5 py-4 border-b border-line">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4 text-secondary" />
            <h3 className="font-display text-[15px] font-bold text-ink">
              Filters
            </h3>
            {totalSelected > 0 && (
              <span className="inline-flex items-center justify-center min-w-5 h-5 px-1.5 rounded-full bg-secondary text-ink text-[10.5px] font-bold">
                {totalSelected}
              </span>
            )}
          </div>
          {hasFilters && (
            <button
              onClick={clearAll}
              className="text-[12px] text-muted hover:text-secondary transition-colors"
            >
              Clear all
            </button>
          )}
        </div>

        {/* Active filter chips */}
        {hasFilters && (
          <div className="px-5 pt-4 pb-1 flex flex-wrap gap-1.5">
            {Object.entries(selected).flatMap(([gid, arr]) =>
              arr.map((v) => {
                const group = GROUPS.find((g) => g.id === gid);
                const opt = group?.options.find((o) => o.value === v);
                if (!opt) return null;
                return (
                  <button
                    key={`${gid}-${v}`}
                    onClick={() => toggle(gid, v)}
                    className="
                      inline-flex items-center gap-1
                      bg-secondary/10 text-secondary
                      text-[11.5px] font-semibold
                      px-2 py-1 rounded
                      hover:bg-secondary/20
                    "
                  >
                    {opt.label}
                    <X className="h-3 w-3" />
                  </button>
                );
              }),
            )}
          </div>
        )}

        {/* Price range */}
        <div className="px-5 py-4 border-t border-line">
          <h4 className="text-[12px] uppercase tracking-widest font-bold text-ink mb-3">
            Price (AED)
          </h4>
          <div className="flex items-center gap-2 mb-3">
            <input
              type="number"
              value={priceMin}
              onChange={(e) => onPriceMinChange(Number(e.target.value))}
              placeholder="Min"
              className="w-full h-9 px-2.5 rounded-md border border-line text-[12.5px] text-ink outline-none focus:border-secondary"
            />
            <span className="text-muted text-[12px]">–</span>
            <input
              type="number"
              value={priceMax}
              onChange={(e) => onPriceMaxChange(Number(e.target.value))}
              placeholder="Max"
              className="w-full h-9 px-2.5 rounded-md border border-line text-[12.5px] text-ink outline-none focus:border-secondary"
            />
          </div>
          <input
            type="range"
            min={0}
            max={500000}
            step={5000}
            value={priceMax}
            onChange={(e) => onPriceMaxChange(Number(e.target.value))}
            className="w-full accent-secondary"
          />
          <div className="flex justify-between text-[11px] text-muted mt-1.5">
            <span>AED 0</span>
            <span>AED 500k+</span>
          </div>
        </div>

        {/* Filter groups */}
        {GROUPS.map((g) => {
          const isOpen = openGroups.has(g.id);
          const groupSelected = selected[g.id] ?? [];
          return (
            <div key={g.id} className="border-t border-line">
              <button
                onClick={() => toggleGroup(g.id)}
                className="w-full flex items-center justify-between gap-3 px-5 py-3.5 text-left"
              >
                <span className="text-[12px] uppercase tracking-widest font-bold text-ink">
                  {g.label}
                  {groupSelected.length > 0 && (
                    <span className="ml-2 text-secondary">
                      ({groupSelected.length})
                    </span>
                  )}
                </span>
                <ChevronDown
                  className={`h-4 w-4 text-muted transition-transform ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {isOpen && (
                <ul className="px-5 pb-4 space-y-1">
                  {g.options.map((o) => {
                    const checked = groupSelected.includes(o.value);
                    return (
                      <li key={o.value}>
                        <label
                          className={`
                            flex items-center gap-2.5
                            py-1.5 px-2 -mx-2 rounded
                            cursor-pointer
                            hover:bg-bgalt
                            ${checked ? "text-secondary" : "text-ink"}
                          `}
                        >
                          <span
                            className={`
                              h-4 w-4 rounded border-2 flex items-center justify-center shrink-0
                              transition-colors
                              ${
                                checked
                                  ? "bg-secondary border-secondary"
                                  : "bg-white border-line"
                              }
                            `}
                          >
                            {checked && (
                              <svg
                                viewBox="0 0 12 12"
                                className="h-2.5 w-2.5 text-white"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="3"
                              >
                                <path
                                  d="M2 6 L5 9 L10 3"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            )}
                          </span>
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => toggle(g.id, o.value)}
                            className="sr-only"
                          />
                          {o.flag && (
                            <span
                              aria-hidden
                              className={`fi fi-${o.flag} rounded-sm shadow-[0_0_0_0.5px_rgba(0,0,0,0.08)] shrink-0`}
                              style={{ width: "1.25em", height: "0.95em" }}
                            />
                          )}
                          <span className="flex-1 text-[13px] font-medium">
                            {o.label}
                          </span>
                          <span className="text-[11.5px] text-muted">
                            {o.count}
                          </span>
                        </label>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          );
        })}
      </div>

      {/* Save search CTA — opens email alerts modal */}
      <button
        onClick={() => setSaveOpen(true)}
        className="
          w-full mt-4 h-11 rounded-md
          bg-charcoal hover:bg-charcoal-800 text-white
          text-[13px] font-semibold
          inline-flex items-center justify-center gap-2
          transition-colors
        "
      >
        <Bell className="h-4 w-4" />
        Save search & get email alerts
      </button>

      {/* Email-alerts modal */}
      <SaveSearchModal
        open={saveOpen}
        onClose={() => setSaveOpen(false)}
        resultCount={resultCount}
        filterSummary={filterSummary}
      />
    </aside>
  );
}
