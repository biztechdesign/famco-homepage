import { ArrowRight } from "lucide-react";
import { asset, link } from "@/lib/asset";

/**
 * Combined block: "State of this vehicle" inspection card on the left,
 * two stacked "Things to know" cards on the right. All three cards share
 * the home-page charcoal sweep gradient (Hero / LiveInspection /
 * SplitFlag etc.) so the section reads as one consistent system.
 */

type Side = {
  title: string;
  body: string;
  cta: string;
  href: string;
  image: string;
  alt: string;
};

const SIDES: Side[] = [
  {
    title: "Finance & warranty at FAMCO",
    body: "Flexible finance, warranty cover and in-house workshop service on every used vehicle.",
    cta: "Explore options",
    href: link("/stock"),
    image: asset("/hero/brand-new.jpg"),
    alt: "FAMCO workshop technician servicing a truck",
  },
  {
    title: "Sell your current vehicle",
    body: "Get a free price proposal — our experts handle valuation, paperwork and pickup for you.",
    cta: "Start selling",
    href: link("/stock?category=sell"),
    image: asset("/hero/sell.jpg"),
    alt: "FAMCO buyer inspecting a customer vehicle",
  },
];

export default function PdpStateOfVehicle() {
  return (
    <section className="mt-14 lg:mt-20">
      <div className="grid lg:grid-cols-[60fr_40fr] gap-4 lg:gap-5">
        {/* LEFT — State of this vehicle (large inspection card) */}
        <article
          id="inspection-report"
          className="group relative overflow-hidden rounded-2xl bg-charcoal min-h-[420px] lg:min-h-[520px]"
        >
          <img
            src={asset("/hero/inspected.jpg")}
            alt="FAMCO technician inspecting the underside of a truck"
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal-900 via-charcoal-800/70 to-transparent" />

          <div className="relative h-full p-7 lg:p-10 flex flex-col justify-end text-white max-w-xl">
            <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-secondary-300 mb-3">
              State of this vehicle
            </span>
            <h3 className="font-display text-2xl lg:text-3xl font-bold leading-tight mb-3">
              Fully <span className="text-secondary-300">inspected</span>
            </h3>
            <p className="text-[14px] text-white/85 leading-relaxed mb-5">
              Knowing the condition of a vehicle or machine is essential. Every
              vehicle on FAMCO is pre-inspected by our experts — what you see
              is truly what you get, giving you the confidence to make the
              right decision.
            </p>
            <a
              href="#inspection-report"
              className="inline-flex items-center gap-2 text-[14px] font-semibold text-secondary-300 hover:gap-3 transition-all w-fit"
            >
              See the full report
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </article>

        {/* RIGHT — Things to know (two stacked cards) */}
        <div className="grid grid-rows-2 gap-4 lg:gap-5 min-h-[420px] lg:min-h-[520px]">
          {SIDES.map((s) => (
            <a
              key={s.title}
              href={s.href}
              className="group relative overflow-hidden rounded-2xl bg-charcoal block"
            >
              <img
                src={s.image}
                alt={s.alt}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-charcoal-900 via-charcoal-800/70 to-transparent" />

              <div className="relative h-full p-5 lg:p-6 flex flex-col justify-end text-white">
                <h3 className="font-display text-lg lg:text-xl font-bold leading-tight mb-1.5">
                  {s.title}
                </h3>
                <p className="text-[12.5px] text-white/80 leading-snug mb-3 max-w-md">
                  {s.body}
                </p>
                <span className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-secondary-300 group-hover:gap-2.5 transition-all w-fit">
                  {s.cta}
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
