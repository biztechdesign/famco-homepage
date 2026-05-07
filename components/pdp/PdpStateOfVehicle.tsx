import { ArrowRight } from "lucide-react";
import { asset } from "@/lib/asset";

/**
 * Mirrors the Latest-from-FAMCO featured-card pattern: a large rounded
 * card with a full-bleed photo, dark gradient, and the headline + body
 * pinned to the bottom. Used to introduce the vehicle's inspection state
 * before the inspection report download.
 */
export default function PdpStateOfVehicle() {
  return (
    <section className="mt-14 lg:mt-20">
      <div className="flex items-end justify-between gap-4 mb-6 lg:mb-8">
        <h2 className="font-display text-2xl lg:text-3xl font-bold text-ink">
          State of this vehicle
        </h2>
        <a
          href="#inspection-report"
          className="inline-flex items-center gap-2 text-secondary font-semibold hover:gap-3 transition-all self-start sm:self-auto"
        >
          View inspection report <ArrowRight className="h-4 w-4" />
        </a>
      </div>

      <article
        className="
          group relative overflow-hidden rounded-2xl
          bg-charcoal text-white
          min-h-[280px] lg:min-h-[360px]
          flex flex-col justify-end
        "
      >
        <img
          src={asset("/hero/inspected.jpg")}
          alt="FAMCO technician inspecting the underside of a truck"
          loading="lazy"
          className="
            absolute inset-0 h-full w-full object-cover
            transition-transform duration-700 group-hover:scale-105
          "
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900 via-charcoal-900/55 to-transparent" />

        <div className="relative p-6 lg:p-8 max-w-3xl">
          <h3 className="font-display text-2xl lg:text-3xl font-bold leading-tight mb-3">
            Fully inspected
          </h3>
          <p className="text-[14px] text-white/85 leading-relaxed mb-4">
            Knowing the condition of a vehicle or machine is essential. Every
            vehicle or machine listed on FAMCO is pre-inspected by our experts.
            This walk-around gives you a clear view of its current state, so
            you know exactly what to expect — what you see is truly what you
            get, giving you the confidence to make the right decision.
          </p>
          <a
            href="#inspection-report"
            className="inline-flex items-center gap-2 text-[14px] font-semibold text-secondary-300 group-hover:gap-3 transition-all"
          >
            See the full report
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </article>
    </section>
  );
}
