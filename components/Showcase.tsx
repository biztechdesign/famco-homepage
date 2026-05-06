import { ArrowRight, Check, MapPin, Truck, FileText, Wrench } from "lucide-react";

export default function Showcase() {
  return (
    <section className="bg-white">
      <div className="container py-6 lg:py-8">
        <div className="rounded-2xl overflow-hidden grid lg:grid-cols-2 min-h-[440px]">
          {/* ─── LEFT — Charcoal pitch ───────────────────────────── */}
          <div className="relative bg-charcoal text-white p-8 lg:p-12 flex flex-col justify-center">
            <div className="eyebrow text-secondary-300 mb-3">
              From order to keys-in-hand
            </div>
            <h2 className="font-display font-bold uppercase tracking-tight leading-[0.95] text-3xl sm:text-4xl lg:text-5xl mb-5">
              Track your
              <br />
              <span className="text-secondary-300">delivery.</span>
            </h2>
            <p className="text-[15px] text-white/85 max-w-md leading-relaxed mb-8">
              From the moment you confirm, FAMCO handles inspection,
              paperwork, customs and delivery to your yard — and you can see
              exactly where your vehicle is, every step of the way.
            </p>

            <div>
              <a
                href="#"
                className="inline-flex items-center gap-2 btn btn-primary h-12 px-6 text-[15px]"
              >
                Track an order
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* ─── RIGHT — Light mock UI panel ─────────────────────── */}
          <div className="relative bg-secondary-50 p-8 lg:p-12 flex items-center justify-center overflow-hidden">
            {/* Decorative dotted UAE/GCC backdrop */}
            <DottedMap />

            {/* Tracker mock card */}
            <div className="relative w-full max-w-md bg-white rounded-xl shadow-lift border border-line p-5 lg:p-6">
              {/* Card header */}
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-[11px] uppercase tracking-widest font-bold text-muted">
                    Order #FA-24891
                  </div>
                  <div className="font-display text-lg font-bold text-ink leading-tight mt-0.5">
                    Volvo FH 460 6×4
                  </div>
                </div>
                <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-secondary/10 text-secondary">
                  <span className="h-1.5 w-1.5 rounded-full bg-secondary animate-pulse" />
                  In transit
                </span>
              </div>

              {/* Progress steps */}
              <ol className="space-y-3.5 mb-5">
                <Step
                  Icon={Check}
                  label="Inspection passed"
                  meta="25-pt check · TMH Umm Ramool"
                  state="done"
                />
                <Step
                  Icon={FileText}
                  label="Paperwork & customs"
                  meta="Mulkiya, export docs filed"
                  state="done"
                />
                <Step
                  Icon={Truck}
                  label="In transit"
                  meta="Dubai → Abu Dhabi · ETA today 16:30"
                  state="active"
                />
                <Step
                  Icon={Wrench}
                  label="Final prep & handover"
                  meta="Pre-delivery service"
                  state="upcoming"
                />
              </ol>

              {/* Mini map row */}
              <div className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-bgalt border border-line">
                <MapPin className="h-4 w-4 text-secondary shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="text-[12px] font-semibold text-ink truncate">
                    Sheikh Zayed Rd · Jebel Ali
                  </div>
                  <div className="text-[11px] text-muted">
                    Updated 2 min ago
                  </div>
                </div>
                <span className="text-[11px] font-semibold text-secondary whitespace-nowrap">
                  92 km left
                </span>
              </div>
            </div>

            {/* Floating badges around the card to feel "live" */}
            <span
              aria-hidden
              className="absolute top-8 left-8 hidden md:flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full shadow-card border border-line text-[11px] font-semibold text-ink"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
              GCC-wide delivery
            </span>
            <span
              aria-hidden
              className="absolute bottom-8 right-8 hidden md:flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full shadow-card border border-line text-[11px] font-semibold text-ink"
            >
              <Check className="h-3 w-3 text-secondary" />
              Inspected on arrival
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   Tracker step row
   ───────────────────────────────────────────────────────────── */

function Step({
  Icon,
  label,
  meta,
  state,
}: {
  Icon: React.ComponentType<{ className?: string }>;
  label: string;
  meta: string;
  state: "done" | "active" | "upcoming";
}) {
  const dotClass =
    state === "done"
      ? "bg-secondary text-white border-secondary"
      : state === "active"
      ? "bg-white text-secondary border-secondary ring-4 ring-secondary/20"
      : "bg-white text-muted border-line";

  const labelClass =
    state === "upcoming" ? "text-muted" : "text-ink font-semibold";

  return (
    <li className="flex items-center gap-3">
      <span
        className={`
          h-7 w-7 rounded-full border flex items-center justify-center shrink-0
          transition-all
          ${dotClass}
        `}
      >
        <Icon className="h-3.5 w-3.5" />
      </span>
      <div className="flex-1 min-w-0">
        <div className={`text-[13px] leading-tight ${labelClass}`}>{label}</div>
        <div className="text-[11px] text-muted truncate">{meta}</div>
      </div>
    </li>
  );
}

/* ─────────────────────────────────────────────────────────────
   Decorative GCC dotted map (pure SVG, very subtle)
   ───────────────────────────────────────────────────────────── */

function DottedMap() {
  // Just enough dots to suggest a stylised UAE peninsula in the bg
  const dots: [number, number][] = [
    // outline-ish cluster
    [10, 60], [16, 55], [22, 48], [28, 44], [34, 40], [40, 38],
    [46, 36], [52, 35], [58, 38], [64, 44], [70, 50], [76, 56],
    [82, 60], [88, 62],
    // body
    [20, 62], [26, 58], [32, 55], [38, 52], [44, 50], [50, 48],
    [56, 50], [62, 54], [68, 58], [74, 62], [80, 66],
    [30, 68], [36, 65], [42, 64], [48, 64], [54, 64], [60, 66],
    [66, 70], [72, 72],
    [40, 72], [46, 72], [52, 72], [58, 74],
    [44, 78], [50, 80], [56, 80],
  ];
  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 h-full w-full opacity-50 pointer-events-none"
      aria-hidden
    >
      {dots.map(([x, y], i) => (
        <circle
          key={i}
          cx={x}
          cy={y}
          r="0.6"
          className="fill-secondary"
        />
      ))}
    </svg>
  );
}
