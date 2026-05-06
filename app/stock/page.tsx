"use client";

import { Suspense, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import UtilityBar from "@/components/UtilityBar";
import Header from "@/components/Header";
import CategoryStrip from "@/components/CategoryStrip";
import Footer from "@/components/Footer";
import StockHero from "@/components/stock/StockHero";
import StockSortBar from "@/components/stock/StockSortBar";
import StockFilters from "@/components/stock/StockFilters";
import StockGrid from "@/components/stock/StockGrid";
import { VEHICLES } from "@/lib/vehicles";

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

function StockPageInner() {
  const params = useSearchParams();
  const cat = params?.get("category") ?? "";

  const config = CATEGORY_MAP[cat];
  const filtered = useMemo(() => {
    if (!config || config.matches.length === 0) return VEHICLES;
    return VEHICLES.filter((v) => config.matches.includes(v.category));
  }, [config]);

  const title = config?.title ?? "Used trucks, vans & machinery";
  const description = config?.description ?? DEFAULT_DESCRIPTION;

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
            <StockFilters resultCount={filtered.length} />

            {/* RIGHT — title + sort + grid */}
            <div className="space-y-5">
              {/* Title + short description */}
              <StockHero
                title={title}
                count={filtered.length}
                description={description}
              />

              {/* Sort + view toggle */}
              <StockSortBar count={filtered.length} />

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
