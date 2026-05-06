import UtilityBar from "@/components/UtilityBar";
import Header from "@/components/Header";
import CategoryStrip from "@/components/CategoryStrip";
import Footer from "@/components/Footer";
import PdpGallery from "@/components/pdp/PdpGallery";
import PdpSidebar from "@/components/pdp/PdpSidebar";
import PdpLiveInspection from "@/components/pdp/PdpLiveInspection";
import PdpTabs, { type SpecGroup } from "@/components/pdp/PdpTabs";
import StockCard from "@/components/stock/StockCard";
import { VEHICLES } from "@/lib/vehicles";
import { ChevronRight } from "lucide-react";

export const metadata = {
  title: "Volvo FH 500 6×4 Tractor Head — Globetrotter XL · Used | FAMCO",
  description:
    "Volvo FH 500 6×4 Globetrotter XL — 2022, 210,000 km, FAMCO Approved Grade A. 3-month FAMCO drivetrain warranty, 0% finance, GCC delivery.",
};

const SPEC_GROUPS: SpecGroup[] = [
  {
    title: "Engine & Drivetrain",
    rows: [
      { label: "Engine Model", value: "Volvo D13 Euro 5" },
      { label: "Power Output", value: "500 HP (368 kW)" },
      { label: "Torque", value: "2,500 Nm" },
      { label: "Transmission", value: "Volvo I-Shift 12-speed" },
      { label: "Drive Configuration", value: "6×4" },
      { label: "Fuel Type", value: "Diesel" },
    ],
  },
  {
    title: "Dimensions & Body",
    rows: [
      { label: "Cab Type", value: "Globetrotter XL" },
      { label: "Wheelbase", value: "3,800 mm" },
      { label: "Sleeper", value: "Double bunk" },
      { label: "Suspension (Front)", value: "Air suspension" },
      { label: "Suspension (Rear)", value: "Air suspension" },
      { label: "Axle Ratio", value: "2.79" },
    ],
  },
  {
    title: "Performance",
    rows: [
      { label: "Odometer", value: "210,000 km" },
      { label: "Engine Hours", value: "14,200 hrs" },
      { label: "GVW", value: "26,000 kg" },
      { label: "GCW", value: "120,000 kg" },
    ],
  },
  {
    title: "Registration & Compliance",
    rows: [
      { label: "Year of Manufacture", value: "2022" },
      { label: "Country of Origin", value: "Sweden" },
      { label: "Emission Standard", value: "Euro 5" },
      { label: "Location", value: "Dubai, UAE" },
      { label: "VIN / Chassis No.", value: "YV2RTDAH***" },
      { label: "FAMCO Grade", value: "A — Excellent", emphasis: true },
    ],
  },
];

const DESCRIPTION = (
  <>
    <p>
      A flagship Volvo FH 500 Globetrotter XL tractor head, registered in 2022
      and operated by a single owner in the UAE since new. Maintained on the
      Volvo recommended service schedule at the FAMCO TMH workshop, with full
      digital service records on file.
    </p>
    <p>
      The Volvo D13 500 hp engine paired with the I-Shift 12-speed AMT
      delivers efficient long-haul performance — twin-bunk Globetrotter XL
      cab, full air suspension front and rear, and a 2.79 axle ratio for
      open-road economy. Spec'd for GCC distribution work with twin 600 L
      aluminium fuel tanks and a hydraulic 5th wheel.
    </p>
    <p>
      <strong>FAMCO Approved · Grade A — Excellent.</strong> Passes the
      150-point inspection with flying colours. Includes a 3-month FAMCO
      drivetrain warranty, transferable Mulkiya, and full customs paperwork.
      0% finance pre-approved through Al-Futtaim Finance; GCC-wide delivery
      arranged on request.
    </p>
  </>
);

const QUICK_SPECS = [
  { iconKey: "calendar" as const, label: "Year", value: "2022" },
  { iconKey: "gauge" as const, label: "Mileage", value: "210,000 km" },
  { iconKey: "map" as const, label: "Location", value: "Dubai, UAE" },
  { label: "Power", value: "500 HP" },
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

  // Sketchfab ID extracted from
  // https://sketchfab.com/3d-models/volvo-fh-series-truck-748a51c9d1034efa896a2c917cad434f
  const sketchfabId = "748a51c9d1034efa896a2c917cad434f";

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
            <a href="/" className="hover:text-secondary">
              Home
            </a>
            <ChevronRight className="h-3 w-3" />
            <a href="/stock" className="hover:text-secondary">
              Stock
            </a>
            <ChevronRight className="h-3 w-3" />
            <a href="/stock?category=trucks" className="hover:text-secondary">
              Trucks
            </a>
            <ChevronRight className="h-3 w-3" />
            <span className="text-ink font-medium truncate">{v.title}</span>
          </nav>

          {/* Top — gallery + sidebar */}
          <div className="grid lg:grid-cols-[1fr_380px] gap-6 lg:gap-7 items-start">
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
                sketchfabId={sketchfabId}
              />

              {/* Tabbed spec section */}
              <PdpTabs specGroups={SPEC_GROUPS} description={DESCRIPTION} />
            </div>

            {/* RIGHT — sticky sidebar + live inspection */}
            <div className="lg:sticky lg:top-32 self-start space-y-3">
              <PdpSidebar
                refId="FA-2024-7821"
                category="Truck / Tractor Head"
                title={v.title}
                approved
                grade="A — Excellent"
                price={v.price}
                currency="AED"
                vatNote="VAT Excl."
                usdEquivalent={77600}
                monthlyFinance={4200}
                warrantyText="3-Month FAMCO Drivetrain Warranty included"
                specs={QUICK_SPECS}
                buyHref="#buy"
                compareHref="#compare"
                inspectionReportHref="#inspection-report"
              />
              <PdpLiveInspection />
            </div>
          </div>

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
                href="/stock"
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
