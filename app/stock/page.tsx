"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import UtilityBar from "@/components/UtilityBar";
import Header from "@/components/Header";
import CategoryStrip from "@/components/CategoryStrip";
import Footer from "@/components/Footer";
import StockHero from "@/components/stock/StockHero";
import StockSortBar, { type SortKey } from "@/components/stock/StockSortBar";
import StockFilters from "@/components/stock/StockFilters";
import StockGrid from "@/components/stock/StockGrid";
import { VEHICLES, type Vehicle } from "@/lib/vehicles";

type CategoryConfig = {
  title: string;
  description: string;
  matches: string[];
};

const CATEGORY_MAP: Record<string, CategoryConfig> = {
  vans: {
    title: "Used vans & light commercial vehicles",
    description:
      "Sprinters, Masters, Trafics and box vans — inspected, registered and ready for last-mile work in the UAE.",
    matches: ["Vans"],
  },
  trucks: {
    title: "Used trucks",
    description:
      "Volvo FH, Eicher Pro, Renault T and more — tractors, tippers and rigid box trucks in stock now.",
    matches: ["Trucks"],
  },
  tractor: {
    title: "Used tractor units",
    description:
      "Volvo FH and FM tractor units — Euro 5 and Euro 6, in 4×2 / 6×4 / 8×4 configurations.",
    matches: ["Trucks"],
  },
  semi: {
    title: "Used semi-trailers",
    description:
      "Flatbeds, tippers, low-loaders and reefer trailers — inspected and documented by FAMCO.",
    matches: ["Trailers"],
  },
  construction: {
    title: "Used construction equipment",
    description:
      "Volvo CE, Doosan and SDLG machinery serviced by Volvo-certified technicians at TMH.",
    matches: ["Construction"],
  },
  "material-handling": {
    title: "Used forklifts & material handling",
    description:
      "Linde diesel, electric and LPG forklifts — full inspection report on every unit.",
    matches: ["Material handling"],
  },
  power: {
    title: "Used power & industrial",
    description:
      "Himoinsa, AGG and Ingersoll Rand gensets, lighting towers and air compressors.",
    matches: ["Power"],
  },
  trailers: {
    title: "Used trailers",
    description:
      "Drawbar trailers, container chassis and box trailers — inspected and documented.",
    matches: ["Trailers"],
  },
  combo: {
    title: "Used combinations",
    description:
      "Pre-matched truck + trailer rigs sold as a package — finance the whole rig in one go.",
    matches: ["Trucks", "Trailers"],
  },
  buses: {
    title: "Used buses",
    description:
      "Volvo coaches, Eicher staff transport and city buses — passenger-ready after our 150-point inspection.",
    matches: ["Buses"],
  },
  various: {
    title: "Used vehicles & equipment",
    description:
      "Browse FAMCO's full stock — every unit checked at TMH, with paperwork and GCC delivery handled in-house.",
    matches: [],
  },
};

const DEFAULT_DESCRIPTION =
  "Inspected by Volvo-certified technicians at TMH and ready for delivery across the GCC.";

// Country code (UAE / SA) → vehicle.country string used in the dataset
const COUNTRY_LABEL: Record<string, string> = {
  UAE: "UAE",
  SA: "Saudi Arabia",
};

/* ─────────────────────────────────────────────────────────────
   Predicate helpers — convert the sidebar's slug-based filter
   values into checks against the actual Vehicle dataset.
   ───────────────────────────────────────────────────────────── */

function matchesYearGroup(year: number, slug: string): boolean {
  switch (slug) {
    case "2024":
      return year >= 2024;
    case "2020-2023":
      return year >= 2020 && year <= 2023;
    case "2015-2019":
      return year >= 2015 && year <= 2019;
    case "before-2015":
      return year < 2015;
    default:
      return false;
  }
}

function matchesCondition(v: Vehicle, slug: string): boolean {
  if (slug === "sale") {
    return Boolean(v.oldPrice && v.oldPrice > v.price) || Boolean(v.badges?.includes("SALE"));
  }
  if (slug === "new-arrival") return Boolean(v.badges?.includes("NEW ARRIVAL"));
  if (slug === "inspected") return Boolean(v.badges?.includes("INSPECTED"));
  return false;
}

const CATEGORY_SLUG_TO_LABEL: Record<string, string> = {
  trucks: "Trucks",
  buses: "Buses",
  construction: "Construction",
  "material-handling": "Material handling",
  power: "Power",
  trailers: "Trailers",
  vans: "Vans",
};

const COUNTRY_SLUG_TO_LABEL: Record<string, string> = {
  uae: "UAE",
  saudi: "Saudi Arabia",
  oman: "Oman",
  qatar: "Qatar",
  bahrain: "Bahrain",
  kuwait: "Kuwait",
};

function passesFilters(
  v: Vehicle,
  selected: Record<string, string[]>,
  priceMin: number,
  priceMax: number,
): boolean {
  // Category (sidebar) — group of slugs → vehicle.category
  const cats = selected.category ?? [];
  if (cats.length > 0) {
    const labels = cats.map((s) => CATEGORY_SLUG_TO_LABEL[s] ?? s);
    if (!labels.includes(v.category)) return false;
  }

  // Country (sidebar)
  const countries = selected.country ?? [];
  if (countries.length > 0) {
    const labels = countries.map((s) => COUNTRY_SLUG_TO_LABEL[s] ?? s);
    if (!labels.includes(v.country)) return false;
  }

  // Brand
  const brands = selected.brand ?? [];
  if (brands.length > 0) {
    const lower = v.brand.toLowerCase();
    if (!brands.some((b) => lower.includes(b))) return false;
  }

  // Year
  const years = selected.year ?? [];
  if (years.length > 0 && !years.some((y) => matchesYearGroup(v.year, y))) {
    return false;
  }

  // Fuel
  const fuels = selected.fuel ?? [];
  if (fuels.length > 0) {
    const fuel = (v.fuel ?? "").toLowerCase();
    if (!fuels.includes(fuel)) return false;
  }

  // Drive — sidebar uses "4x2", data uses "4×2"
  const drives = selected.drive ?? [];
  if (drives.length > 0) {
    const drive = (v.drive ?? "").toLowerCase().replace("×", "x");
    if (!drives.includes(drive)) return false;
  }

  // Condition (badge-driven)
  const conditions = selected.condition ?? [];
  if (conditions.length > 0 && !conditions.some((c) => matchesCondition(v, c))) {
    return false;
  }

  // Price range — only AED-priced UAE stock is comparable; treat foreign
  // currencies as out-of-range so the slider only narrows what it can.
  if (priceMin > 0 || priceMax < 500000) {
    const inRange = v.price >= priceMin && v.price <= priceMax;
    if (!inRange) return false;
  }

  return true;
}

function applySort(list: Vehicle[], key: SortKey): Vehicle[] {
  const out = [...list];
  switch (key) {
    case "price-asc":
      out.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      out.sort((a, b) => b.price - a.price);
      break;
    case "year-desc":
      out.sort((a, b) => b.year - a.year);
      break;
    case "year-asc":
      out.sort((a, b) => a.year - b.year);
      break;
    case "mileage-asc":
      out.sort((a, b) => (a.km ?? a.hours ?? Infinity) - (b.km ?? b.hours ?? Infinity));
      break;
    case "newest":
    default:
      // "Newest first" — use id descending as a stand-in for added-date
      out.sort((a, b) => Number(b.id) - Number(a.id));
      break;
  }
  return out;
}

function StockPageInner() {
  const params = useSearchParams();
  const cat = params?.get("category") ?? "";
  const q = (params?.get("q") ?? "").trim();
  const countryCode = params?.get("country") ?? "";
  const country = COUNTRY_LABEL[countryCode] ?? "";

  const config = CATEGORY_MAP[cat];

  // Sidebar filter state — lifted up so it can drive the listing
  const [selected, setSelected] = useState<Record<string, string[]>>({});
  const [priceMin, setPriceMin] = useState(0);
  const [priceMax, setPriceMax] = useState(500000);
  const [sort, setSort] = useState<SortKey>("newest");

  const filtered = useMemo(() => {
    // Step 0: country filter — driven by the UtilityBar dropdown so
    // users only see inventory available in their selected market.
    // If the sidebar Country filter is set, it overrides the URL param.
    const sidebarCountries = selected.country ?? [];
    let list =
      sidebarCountries.length === 0 && country
        ? VEHICLES.filter((v) => v.country === country)
        : VEHICLES;
    // Step 1: category filter (URL-driven, e.g. /stock?category=trucks)
    if (config && config.matches.length > 0) {
      list = list.filter((v) => config.matches.includes(v.category));
    }
    // Step 2: free-text search. Tokenized AND-match across every
    // user-facing field so a query like "2022 volvo" filters by year +
    // brand together, and a single year like "2022" actually returns
    // 2022 stock. Mirrors Header.tsx's matchVehicles haystack.
    if (q) {
      const tokens = q.toLowerCase().split(/\s+/).filter(Boolean);
      list = list.filter((v) => {
        const hay = [
          v.title,
          v.description,
          v.brand,
          v.category,
          v.country,
          v.dealer ?? "",
          v.transmission ?? "",
          v.fuel ?? "",
          v.euro ?? "",
          v.drive ?? "",
          String(v.year),
        ]
          .join(" ")
          .toLowerCase();
        return tokens.every((t) => hay.includes(t));
      });
    }
    // Step 3: sidebar-driven filters (brand / year / fuel / drive /
    // condition / sidebar-country / price)
    list = list.filter((v) => passesFilters(v, selected, priceMin, priceMax));
    // Step 4: sorting
    return applySort(list, sort);
  }, [config, q, country, selected, priceMin, priceMax, sort]);

  const title = q
    ? `Search results for "${q}"`
    : config?.title ?? "Used trucks, vans & machinery";

  const description = q
    ? config?.description ?? DEFAULT_DESCRIPTION
    : config?.description ?? DEFAULT_DESCRIPTION;

  return (
    <>
      <UtilityBar />
      <Header />
      <CategoryStrip />

      <main className="bg-bgalt min-h-screen">
        <section className="container py-6 lg:py-8">
          {/* Two-column layout: filter sidebar (left) + result column (right) */}
          <div className="grid lg:grid-cols-[280px_1fr] gap-6 lg:gap-8 items-start">
            {/* LEFT — full filter sidebar */}
            <StockFilters
              resultCount={filtered.length}
              selected={selected}
              onChange={setSelected}
              priceMin={priceMin}
              priceMax={priceMax}
              onPriceMinChange={setPriceMin}
              onPriceMaxChange={setPriceMax}
            />

            {/* RIGHT — title + sort + grid */}
            <div className="space-y-5">
              {/* Title + short description */}
              <StockHero
                title={title}
                count={filtered.length}
                description={description}
              />

              {/* Sort + view toggle */}
              <StockSortBar
                count={filtered.length}
                sort={sort}
                onSortChange={setSort}
              />

              {/* Result grid */}
              <StockGrid vehicles={filtered} />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default function StockPage() {
  return (
    <Suspense fallback={null}>
      <StockPageInner />
    </Suspense>
  );
}
