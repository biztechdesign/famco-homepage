"use client";

import { asset } from "@/lib/asset";

/**
 * Category strip — 8 lineal Freepik vehicle icons rendered as masked
 * spans, so we can recolor them via CSS (currentColor / bg-color).
 *
 * Default: black silhouette + black label.
 * Hover:   secondary-blue silhouette + secondary-blue label.
 */

type Cat = {
  label: string;
  count: number;
  href: string;
  src: string; // path inside public/
};

const CATEGORIES: Cat[] = [
  { label: "Trucks", count: 531, href: "/stock?category=trucks", src: "/icons/category/_truck.svg" },
  { label: "Vans", count: 853, href: "/stock?category=vans", src: "/icons/category/_light-commercial-vehicle.svg" },
  { label: "Tractor", count: 418, href: "/stock?category=tractor", src: "/icons/category/_tractorhead.svg" },
  { label: "Semi", count: 263, href: "/stock?category=semi", src: "/icons/category/_semi-trailer.svg" },
  { label: "Construction", count: 262, href: "/stock?category=construction", src: "/icons/category/_construction-equipment.svg" },
  { label: "Trailers", count: 29, href: "/stock?category=trailers", src: "/icons/category/_trailer.svg" },
  { label: "Combo", count: 25, href: "/stock?category=combo", src: "/icons/category/_combination.svg" },
  { label: "Various", count: 10, href: "/stock?category=various", src: "/icons/category/_various.svg" },
];

export default function CategoryStrip() {
  return (
    <div className="border-t border-line bg-white">
      <div className="container">
        <ul className="flex items-stretch justify-between gap-2 sm:gap-3 overflow-x-auto scrollbar-hide py-1.5">
          {CATEGORIES.map((c) => (
            <li key={c.label} className="shrink-0">
              <a
                href={c.href}
                className="
                  group relative flex flex-col items-center gap-0.5
                  px-3 py-1 rounded-md
                  border border-transparent
                  transition-all duration-200 ease-out
                  hover:bg-secondary-50
                  hover:border-secondary
                "
              >
                {/* Masked icon — silhouette filled with current color */}
                <span
                  aria-hidden
                  style={{
                    WebkitMaskImage: `url(${asset(c.src)})`,
                    maskImage: `url(${asset(c.src)})`,
                    WebkitMaskRepeat: "no-repeat",
                    maskRepeat: "no-repeat",
                    WebkitMaskPosition: "center",
                    maskPosition: "center",
                    WebkitMaskSize: "contain",
                    maskSize: "contain",
                  }}
                  className="
                    block h-9 w-14
                    bg-ink
                    transition-all duration-200 ease-out
                    group-hover:bg-secondary
                    group-hover:scale-110
                  "
                />
                {/* Label + count */}
                <span className="text-[12px] font-semibold text-ink group-hover:text-secondary whitespace-nowrap transition-colors leading-tight">
                  {c.label}{" "}
                  <span className="text-muted group-hover:text-secondary/80 font-normal">
                    ({c.count})
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
