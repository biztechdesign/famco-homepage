"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronRight, LayoutGrid, X } from "lucide-react";

/**
 * 3-level vehicle category tree.
 * Level 1: Top categories (left column)
 * Level 2: Filter dimensions  (middle column)
 * Level 3: Leaf options       (right column)
 */
type Leaf = { label: string; href: string };
type Group = { label: string; leaves: Leaf[] };
type Category = { label: string; groups: Group[] };

const TREE: Category[] = [
  {
    label: "Trucks",
    groups: [
      {
        label: "Type",
        leaves: [
          { label: "Tractor unit", href: "#" },
          { label: "Tipper", href: "#" },
          { label: "Box / Curtain side", href: "#" },
          { label: "Concrete mixer", href: "#" },
          { label: "Crane truck", href: "#" },
          { label: "Recovery truck", href: "#" },
          { label: "Refrigerated", href: "#" },
        ],
      },
      {
        label: "Brand",
        leaves: [
          { label: "Volvo", href: "#" },
          { label: "Eicher", href: "#" },
          { label: "Renault", href: "#" },
          { label: "Mercedes-Benz", href: "#" },
          { label: "MAN", href: "#" },
          { label: "Scania", href: "#" },
        ],
      },
      {
        label: "Drive configuration",
        leaves: [
          { label: "4x2", href: "#" },
          { label: "6x2", href: "#" },
          { label: "6x4", href: "#" },
          { label: "8x4", href: "#" },
        ],
      },
      {
        label: "Year",
        leaves: [
          { label: "2024+", href: "#" },
          { label: "2020 – 2023", href: "#" },
          { label: "2015 – 2019", href: "#" },
          { label: "Before 2015", href: "#" },
        ],
      },
    ],
  },
  {
    label: "Buses",
    groups: [
      {
        label: "Type",
        leaves: [
          { label: "Coach bus", href: "#" },
          { label: "City bus", href: "#" },
          { label: "School bus", href: "#" },
          { label: "Mini bus", href: "#" },
          { label: "Staff transport", href: "#" },
        ],
      },
      {
        label: "Brand",
        leaves: [
          { label: "Volvo", href: "#" },
          { label: "Mercedes-Benz", href: "#" },
          { label: "MAN", href: "#" },
          { label: "Higer", href: "#" },
        ],
      },
    ],
  },
  {
    label: "Construction equipment",
    groups: [
      {
        label: "Equipment type",
        leaves: [
          { label: "Excavator", href: "#" },
          { label: "Wheel loader", href: "#" },
          { label: "Backhoe loader", href: "#" },
          { label: "Bulldozer", href: "#" },
          { label: "Roller / Compactor", href: "#" },
          { label: "Skid steer", href: "#" },
          { label: "Telehandler", href: "#" },
        ],
      },
      {
        label: "Brand",
        leaves: [
          { label: "Volvo CE", href: "#" },
          { label: "Doosan", href: "#" },
          { label: "SDLG", href: "#" },
          { label: "Caterpillar", href: "#" },
          { label: "Komatsu", href: "#" },
          { label: "Hitachi", href: "#" },
        ],
      },
      {
        label: "Operating weight",
        leaves: [
          { label: "Up to 5 t", href: "#" },
          { label: "5 – 15 t", href: "#" },
          { label: "15 – 30 t", href: "#" },
          { label: "30 t and above", href: "#" },
        ],
      },
    ],
  },
  {
    label: "Material handling",
    groups: [
      {
        label: "Type",
        leaves: [
          { label: "Diesel forklift", href: "#" },
          { label: "Electric forklift", href: "#" },
          { label: "LPG forklift", href: "#" },
          { label: "Reach truck", href: "#" },
          { label: "Pallet truck", href: "#" },
          { label: "Container handler", href: "#" },
        ],
      },
      {
        label: "Brand",
        leaves: [
          { label: "Linde", href: "#" },
          { label: "Toyota", href: "#" },
          { label: "Hyster", href: "#" },
          { label: "Crown", href: "#" },
        ],
      },
      {
        label: "Capacity",
        leaves: [
          { label: "Up to 2.5 t", href: "#" },
          { label: "2.5 – 5 t", href: "#" },
          { label: "5 – 10 t", href: "#" },
          { label: "10 t and above", href: "#" },
        ],
      },
    ],
  },
  {
    label: "Power & industrial",
    groups: [
      {
        label: "Type",
        leaves: [
          { label: "Diesel generator", href: "#" },
          { label: "Lighting tower", href: "#" },
          { label: "Air compressor", href: "#" },
          { label: "Welding generator", href: "#" },
        ],
      },
      {
        label: "Brand",
        leaves: [
          { label: "Himoinsa", href: "#" },
          { label: "AGG", href: "#" },
          { label: "Ingersoll Rand", href: "#" },
          { label: "Yanmar", href: "#" },
        ],
      },
      {
        label: "Power output",
        leaves: [
          { label: "Up to 50 kVA", href: "#" },
          { label: "50 – 200 kVA", href: "#" },
          { label: "200 – 500 kVA", href: "#" },
          { label: "500 kVA and above", href: "#" },
        ],
      },
    ],
  },
  {
    label: "Marine solutions",
    groups: [
      {
        label: "Type",
        leaves: [
          { label: "Marine engine", href: "#" },
          { label: "Marine generator", href: "#" },
          { label: "Drive systems", href: "#" },
        ],
      },
      {
        label: "Brand",
        leaves: [{ label: "Yanmar", href: "#" }],
      },
    ],
  },
  {
    label: "Trailers",
    groups: [
      {
        label: "Type",
        leaves: [
          { label: "Flatbed trailer", href: "#" },
          { label: "Tipper trailer", href: "#" },
          { label: "Low-loader", href: "#" },
          { label: "Container chassis", href: "#" },
          { label: "Box trailer", href: "#" },
        ],
      },
    ],
  },
  {
    label: "Various",
    groups: [
      {
        label: "Other equipment",
        leaves: [
          { label: "Workshop tools", href: "#" },
          { label: "Spare parts lots", href: "#" },
          { label: "Attachments", href: "#" },
        ],
      },
    ],
  },
];

export default function CategoriesMegaMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [catIdx, setCatIdx] = useState(0); // hovered/selected level-1
  const [groupIdx, setGroupIdx] = useState(0); // hovered/selected level-2
  const panelRef = useRef<HTMLDivElement | null>(null);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (!panelRef.current?.contains(e.target as Node)) onClose();
    };
    // small delay so the opener click doesn't immediately close it
    const id = setTimeout(() => document.addEventListener("mousedown", handler), 0);
    return () => {
      clearTimeout(id);
      document.removeEventListener("mousedown", handler);
    };
  }, [open, onClose]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // Reset sub-indices when re-opened
  useEffect(() => {
    if (open) {
      setCatIdx(0);
      setGroupIdx(0);
    }
  }, [open]);

  if (!open) return null;

  const activeCat = TREE[catIdx];
  const activeGroup = activeCat?.groups[groupIdx];

  return (
    <div
      ref={panelRef}
      className="absolute left-0 right-0 top-full mt-2 z-40 bg-white rounded-lg shadow-lift border border-line overflow-hidden"
      role="dialog"
      aria-label="Vehicle categories"
    >
      {/* Compact toolbar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-line bg-bgalt">
        <div className="flex items-center gap-2 text-[11px] uppercase tracking-widest font-bold text-ink">
          <LayoutGrid className="h-3.5 w-3.5 text-secondary" />
          Vehicle categories
        </div>
        <button
          onClick={onClose}
          className="h-7 w-7 rounded-md hover:bg-white flex items-center justify-center"
          aria-label="Close"
        >
          <X className="h-3.5 w-3.5 text-ink" />
        </button>
      </div>

      {/* 3 compact columns */}
      <div className="grid grid-cols-3">
        {/* Col 1 — categories */}
        <ul className="border-r border-line py-1.5">
          {TREE.map((c, i) => {
            const active = i === catIdx;
            return (
              <li key={c.label}>
                <button
                  onMouseEnter={() => {
                    setCatIdx(i);
                    setGroupIdx(0);
                  }}
                  onClick={() => {
                    setCatIdx(i);
                    setGroupIdx(0);
                  }}
                  className={`w-full flex items-center justify-between gap-3 px-4 py-2 text-left text-[13.5px] transition-colors ${
                    active
                      ? "bg-primary text-white font-semibold"
                      : "text-ink hover:bg-bgalt"
                  }`}
                >
                  <span>{c.label}</span>
                  <ChevronRight
                    className={`h-3.5 w-3.5 ${
                      active ? "text-white" : "text-muted"
                    }`}
                  />
                </button>
              </li>
            );
          })}
        </ul>

        {/* Col 2 — groups */}
        <ul className="border-r border-line py-1.5 bg-white">
          {activeCat?.groups.map((g, i) => {
            const active = i === groupIdx;
            return (
              <li key={g.label}>
                <button
                  onMouseEnter={() => setGroupIdx(i)}
                  onClick={() => setGroupIdx(i)}
                  className={`w-full flex items-center justify-between gap-3 px-4 py-2 text-left text-[13.5px] transition-colors ${
                    active
                      ? "text-secondary font-semibold"
                      : "text-ink hover:bg-bgalt"
                  }`}
                >
                  <span>{g.label}</span>
                  <ChevronRight
                    className={`h-3.5 w-3.5 ${
                      active ? "text-secondary" : "text-muted"
                    }`}
                  />
                </button>
              </li>
            );
          })}
        </ul>

        {/* Col 3 — leaves */}
        <ul className="py-1.5">
          {activeGroup?.leaves.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                className="block px-4 py-2 text-[13.5px] text-secondary hover:underline hover:text-secondary-700"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
