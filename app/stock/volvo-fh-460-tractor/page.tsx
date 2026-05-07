import UtilityBar from "@/components/UtilityBar";
import Header from "@/components/Header";
import CategoryStrip from "@/components/CategoryStrip";
import Footer from "@/components/Footer";
import PdpGallery from "@/components/pdp/PdpGallery";
import PdpSidebar from "@/components/pdp/PdpSidebar";
import PdpTabs, { type SpecGroup, Tick } from "@/components/pdp/PdpTabs";
import PdpLiveInspection from "@/components/pdp/PdpLiveInspection";
import PdpTransportCosts from "@/components/pdp/PdpTransportCosts";
import PdpStateOfVehicle from "@/components/pdp/PdpStateOfVehicle";
import StockCard from "@/components/stock/StockCard";
import { VEHICLES } from "@/lib/vehicles";
import { link } from "@/lib/asset";
import { ChevronRight, FileDown } from "lucide-react";

export const metadata = {
  title: "Volvo FH 500 6×4 Tractor Head — Globetrotter XL · Used | FAMCO",
  description:
    "Volvo FH 500 6×4 Globetrotter XL — 2022, 210,000 km, FAMCO Approved Grade A. 3-month FAMCO drivetrain warranty, 0% finance, GCC delivery.",
};

const SPEC_GROUPS: SpecGroup[] = [
  {
    title: "General",
    rows: [
      { label: "Product Group", value: "Tractor Head" },
      { label: "Brand", value: "Volvo" },
      { label: "Model", value: "FH 500" },
      { label: "Colour", value: "White" },
      { label: "Gross Vehicle Weight (GVW)", value: "26,000 kg" },
      { label: "Power", value: "500 HP" },
      { label: "Year", value: "2022" },
      { label: "Mileage", value: "210,000 km" },
    ],
  },
  {
    title: "Engine & Drivetrain",
    rows: [
      { label: "Engine", value: "Volvo D13 · 13L" },
      { label: "Transmission", value: "I-Shift 12-speed AMT" },
      { label: "Drive", value: "6×4" },
      { label: "Fuel", value: "Diesel" },
      { label: "Emissions", value: "Euro 5" },
      { label: "Axle ratio", value: "2.79" },
    ],
  },
  {
    title: "Cab",
    rows: [
      { label: "Cab type", value: "Globetrotter XL" },
      { label: "Beds", value: "Double bunk" },
      { label: "Air conditioning", value: <Tick /> },
      { label: "Cruise control", value: <Tick /> },
      { label: "Leather interior", value: <Tick /> },
      { label: "Refrigerator", value: <Tick /> },
    ],
  },
  {
    title: "Safety",
    rows: [
      { label: "ABS", value: <Tick /> },
      { label: "EBS", value: <Tick /> },
      { label: "Lane departure warning", value: <Tick /> },
      { label: "Driver airbag", value: <Tick /> },
    ],
  },
  {
    title: "Vehicle dimensions",
    rows: [
      { label: "Vehicle height", value: "380 cm" },
      { label: "Vehicle length", value: "580 cm" },
      { label: "Vehicle width", value: "250 cm" },
      { label: "Wheelbase", value: "380 cm" },
    ],
  },
  {
    title: "Axle 1 — Steering",
    rows: [
      { label: "Axle capacity", value: "7,500 kg" },
      { label: "Brakes Axle 1", value: "Disc" },
      { label: "Type of suspension axle 1", value: "Air" },
      { label: "Type of tyres axle 1", value: "Single" },
      { label: "Tyre brand Axle 1", value: "Michelin" },
      { label: "Tyre size Axle 1", value: "315/80R22.5" },
    ],
  },
  {
    title: "Axle 2 — Drive",
    rows: [
      { label: "Axle capacity", value: "11,500 kg" },
      { label: "Brakes Axle 2", value: "Disc" },
      { label: "Type of suspension axle 2", value: "Air" },
      { label: "Type of tyres axle 2", value: "Twin" },
      { label: "Tyre brand Axle 2", value: "Michelin" },
      { label: "Tyre size Axle 2", value: "315/80R22.5" },
    ],
  },
  {
    title: "Axle 3 — Drive",
    rows: [
      { label: "Axle capacity", value: "11,500 kg" },
      { label: "Brakes Axle 3", value: "Disc" },
      { label: "Type of suspension axle 3", value: "Air" },
      { label: "Type of tyres axle 3", value: "Twin" },
      { label: "Tyre brand Axle 3", value: "Michelin" },
      { label: "Tyre size Axle 3", value: "315/80R22.5" },
    ],
  },
  {
    title: "Documents",
    rows: [
      { label: "Registration date", value: "06-2022" },
      { label: "Mulkiya", value: "Transferable" },
      { label: "Customs paperwork", value: <Tick /> },
      { label: "FAMCO Grade", value: "A — Excellent", emphasis: true },
    ],
  },
];

export default function VolvoFH500Page() {
  const v = VEHICLES.find((x) => x.id === "1")!;
  const similar = VEHICLES.filter((x) => x.id !== v.id).slice(0, 3);

  // Three real product detail photos for this Volvo FH unit
  const images = [
    { src: "/products/detail-1.jpg", alt: "Volvo FH 500 — front three-quarter view" },
    { src: "/products/detail-2.jpg", alt: "Volvo FH 500 — side view" },
    { src: "/products/detail-3.jpg", alt: "Volvo FH 500 — rear / driver detail" },
  ];

  // Local GLB renders via Google's <model-viewer> custom element (loaded in layout.tsx).
  // No external embed = no scrollbar, no third-party error pages.
  const glbModel = "/models/volvo-fh-tractor.glb";

  const videoSrc = "/videos/volvo-fh-walkaround.mp4";

  return (
    <>
      <UtilityBar />
      <Header />
      <CategoryStrip />

      <main className="bg-bgalt min-h-screen">
        <section className="container py-6 lg:py-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-[12.5px] text-muted mb-5 flex-wrap">
            <a href={link("/")} className="hover:text-secondary">
              Home
            </a>
            <ChevronRight className="h-3 w-3" />
            <a href={link("/stock")} className="hover:text-secondary">
              Stock
            </a>
            <ChevronRight className="h-3 w-3" />
            <a href={link("/stock?category=trucks")} className="hover:text-secondary">
              Trucks
            </a>
            <ChevronRight className="h-3 w-3" />
            <span className="text-ink font-medium truncate">{v.title}</span>
          </nav>

          {/* Top — gallery + sidebar (55% left, 45% right) */}
          <div className="grid lg:grid-cols-[55fr_45fr] gap-6 lg:gap-7 items-start">
            {/* LEFT — gallery + tabs */}
            <div className="space-y-5">
              <PdpGallery
                title={v.title}
                refId="FA-2024-7821"
                approved
                grade="A"
                images={images}
                videoSrc={videoSrc}
                videoPoster={images[0].src}
                glbModel={glbModel}
              />

              {/* Spec section */}
              <PdpTabs specGroups={SPEC_GROUPS} />

              {/* Transport / delivery cost estimator */}
              <PdpTransportCosts />
            </div>

            {/* RIGHT — sticky sidebar + live video inspection */}
            <div className="lg:sticky lg:top-32 self-start space-y-3">
              <PdpSidebar
                refId="FA-2024-7821"
                title={v.title}
                approved
                grade="A — Excellent"
                price={v.price}
                currency="AED"
                vatNote="VAT Excl."
                usdEquivalent={77600}
                monthlyFinance={4200}
                warrantyText="3-Month FAMCO Drivetrain Warranty included"
                buyHref="#buy"
              />

              {/* Two equal CTAs — Download report (left) + Live
                  inspection (right) — share the same h-14 / rounded-xl
                  shape so they read as a paired action row. */}
              <div className="grid grid-cols-2 gap-3">
                <a
                  href="#inspection-report"
                  className="
                    group flex items-center gap-3
                    h-14 px-4 rounded-xl
                    bg-white border border-line shadow-card text-ink
                    hover:border-charcoal hover:bg-bgalt
                    transition-colors
                  "
                >
                  <span className="inline-flex h-9 w-9 rounded-lg bg-bgalt items-center justify-center shrink-0 group-hover:bg-white">
                    <FileDown className="h-4 w-4 text-secondary-700" />
                  </span>
                  <span className="flex-1 text-left leading-tight min-w-0">
                    <span className="block text-[14px] font-bold">
                      Download
                    </span>
                    <span className="block text-[11px] font-bold uppercase tracking-wider opacity-70 mt-0.5">
                      Inspection report
                    </span>
                  </span>
                </a>

                <PdpLiveInspection />
              </div>
            </div>
          </div>

          {/* State of this vehicle + Things to know */}
          <PdpStateOfVehicle />

          {/* Similar vehicles */}
          <div className="mt-14 lg:mt-20">
            <div className="flex items-end justify-between gap-4 mb-6">
              <div>
                <div className="eyebrow mb-1">More like this</div>
                <h2 className="font-display text-2xl lg:text-3xl font-bold text-ink">
                  Similar vehicles
                </h2>
              </div>
              <a
                href={link("/stock")}
                className="text-[13px] font-semibold text-secondary hover:underline"
              >
                View all stock →
              </a>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {similar.map((s) => (
                <StockCard key={s.id} v={s} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
