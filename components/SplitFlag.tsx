import { ArrowRight } from "lucide-react";
import { asset, link } from "@/lib/asset";

export default function SplitFlag() {
  return (
    <section className="bg-white">
      <div className="container py-6 lg:py-8">
        <div className="grid gap-4 lg:gap-5 lg:grid-cols-2">
          {/* ─── LEFT — Brand new, best deal ─── */}
          <FlagCard
            eyebrow="Directly available"
            title={
              <>
                Brand new.
                <br />
                Best deal.
              </>
            }
            body="Over 800 brand-new trucks, vans and equipment in stock — financed, registered and delivered."
            cta="View new stock"
            href={link("/stock")}
            tone="secondary"
            iconClass="fi-rr-gift"
            bgImage="/hero/brand-new.jpg"
          />

          {/* ─── RIGHT — Inspected & ready ─── */}
          <FlagCard
            eyebrow="Inspected & ready"
            title={
              <>
                150-point check.
                <br />
                Paperwork done.
              </>
            }
            body="Every used vehicle is inspected by Volvo-certified technicians at TMH, with all customs and documents handled in-house."
            cta="View inspected stock"
            href={link("/stock")}
            tone="charcoal"
            iconClass="fi-rr-shield-check"
            bgImage="/hero/inspected.jpg"
          />
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   FlagCard — one of the two big BAS-style split CTAs
   ───────────────────────────────────────────────────────────── */

function FlagCard({
  eyebrow,
  title,
  body,
  cta,
  href,
  tone,
  iconClass,
  bgImage,
}: {
  eyebrow: string;
  title: React.ReactNode;
  body: string;
  cta: string;
  href: string;
  tone: "secondary" | "charcoal";
  iconClass: string;
  bgImage?: string;
}) {
  const surface =
    tone === "secondary"
      ? "bg-secondary text-white"
      : "bg-charcoal text-white";

  // CTA pill — unified across both cards (secondary-blue, matches the rest of the site)
  const ctaClasses = "bg-secondary text-white hover:bg-secondary-700";

  // Eyebrow tint
  const eyebrowColor =
    tone === "secondary" ? "text-white/85" : "text-secondary-300";

  // Decorative icon tint
  const iconColor =
    tone === "secondary" ? "text-white/20" : "text-secondary/30";
  const iconHover =
    tone === "secondary" ? "group-hover:text-white/35" : "group-hover:text-secondary/55";

  return (
    <a
      href={href}
      className={`
        group relative overflow-hidden rounded-2xl
        ${surface}
        p-8 lg:p-12 min-h-[320px] lg:min-h-[400px]
        flex flex-col justify-between
        transition-all duration-300
        hover:shadow-lift hover:-translate-y-0.5
      `}
    >
      {/* Optional background image */}
      {bgImage && (
        <>
          <img
            src={asset(bgImage)}
            alt=""
            aria-hidden
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {/* Black gradient — same as hero left video card */}
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal-900 via-charcoal-800/70 to-transparent" />
        </>
      )}

      {/* Decorative big icon — only when no bg image */}
      {!bgImage && (
        <i
          aria-hidden
          className={`
            fi ${iconClass}
            absolute top-6 right-6
            flex items-center justify-center
            ${iconColor}
            text-[110px] lg:text-[160px] leading-none
            transition-all duration-300
            ${iconHover}
            group-hover:scale-105 group-hover:rotate-[-4deg]
          `}
        />
      )}

      <div className={`relative ${bgImage ? "" : "pr-24 lg:pr-36"}`}>
        <div
          className={`text-[11px] uppercase tracking-[0.18em] font-bold ${eyebrowColor} mb-3`}
        >
          {eyebrow}
        </div>
        <h2 className="font-display font-bold uppercase tracking-tight leading-[0.95] text-3xl sm:text-4xl lg:text-5xl">
          {title}
        </h2>
        <p className="mt-5 text-[15px] max-w-md opacity-90 leading-relaxed">
          {body}
        </p>
      </div>

      <div className="relative mt-8">
        <span
          className={`
            inline-flex items-center gap-2
            ${ctaClasses}
            font-semibold rounded-md
            h-11 px-5 text-[14px]
            transition-colors
          `}
        >
          {cta}
          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </span>
      </div>
    </a>
  );
}
