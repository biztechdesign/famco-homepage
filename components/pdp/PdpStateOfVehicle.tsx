import { ArrowRight, FileDown } from "lucide-react";
import { asset, link } from "@/lib/asset";

/**
 * Combined block: "State of this vehicle" inspection card on the left,
 * two stacked cards on the right. All three cards share the home-page
 * charcoal sweep gradient (Hero / LiveInspection / SplitFlag etc.) so
 * the section reads as one consistent system. Each card is reduced to
 * image + title + button — no eyebrow, no body copy.
 */

type Side = {
  title: string;
  cta: string;
  href: string;
  image: string;
  alt: string;
};

const SIDES: Side[] = [
  {
    title: "Finance & warranty at FAMCO",
    cta: "Explore options",
    href: link("/stock"),
    image: asset("/hero/brand-new.jpg"),
    alt: "FAMCO workshop technician servicing a truck",
  },
  {
    title: "Sell your current vehicle",
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
        {/* LEFT — image + title + See Full Report button */}
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
            <h3 className="font-display text-2xl lg:text-3xl font-bold leading-tight mb-5">
              Fully <span className="text-secondary-300">inspected</span>
            </h3>
            <a
              href={link("/reports/famco-inspection-fa-2024-7821.html")}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-2 btn btn-primary h-12 px-5 text-[14px] rounded-md w-fit shadow-lift"
            >
              <FileDown className="h-4 w-4" />
              See Full Report
            </a>
          </div>
        </article>

        {/* RIGHT — image + title + button only */}
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
                <h3 className="font-display text-lg lg:text-xl font-bold leading-tight mb-3">
                  {s.title}
                </h3>
                <span className="inline-flex items-center gap-2 bg-secondary hover:bg-secondary-600 text-ink font-semibold rounded-md h-10 px-4 text-[13px] transition-colors w-fit shadow-card">
                  {s.cta}
                  <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
