import { ArrowRight } from "lucide-react";
import { asset, link } from "@/lib/asset";

export default function SplitFlag() {
  return (
    <section className="bg-white">
      <div className="container py-6 lg:py-8">
        <div className="grid gap-4 lg:gap-5 lg:grid-cols-2">
          {/* ─── LEFT — In stock, ready to roll ─── */}
          <FlagCard
            title={
              <>
                Best <span className="text-secondary-300">deal</span>.
                <br />
                Best <span className="text-secondary-300">buy</span>.
              </>
            }
            cta="View stock"
            href={link("/stock")}
            tone="secondary"
            iconClass="fi-rr-gift"
            bgImage="/hero/brand-new.jpg"
          />

          {/* ─── RIGHT — Inspected & ready ─── */}
          <FlagCard
            title={
              <>
                <span className="text-secondary-300">150-point</span> check.
                <br />
                Paperwork done.
              </>
            }
            cta="View inspected stock"
            href={link("/stock")}
            tone="charcoal"
            iconClass="fi-rr-shield-check"
            bgImage="/hero/truck-1.jpg"
            flipBg

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
  title,
  cta,
  href,
  tone,
  iconClass,
  bgImage,
  flipBg,
}: {
  title: React.ReactNode;
  cta: string;
  href: string;
  tone: "secondary" | "charcoal";
  iconClass: string;
  bgImage?: string;
  flipBg?: boolean;
}) {
  // When a background photo is present we always overlay a dark
  // gradient on top, so the card reads as dark regardless of tone.
  // Tone only drives the look for the solid (no-image) variant.
  const hasImage = Boolean(bgImage);

  const surface = hasImage
    ? "bg-charcoal text-white"
    : tone === "secondary"
      ? "bg-secondary text-ink"
      : "bg-charcoal text-white";

  // CTA pill — bright yellow pill on dark surfaces, dark pill on yellow
  const ctaClasses = hasImage
    ? "bg-secondary text-ink hover:bg-secondary-600"
    : tone === "secondary"
      ? "bg-charcoal text-white hover:bg-charcoal-700"
      : "bg-secondary text-ink hover:bg-secondary-600";

  // Decorative icon tint (only used when there is no bgImage)
  const iconColor =
    tone === "secondary" ? "text-ink/15" : "text-secondary/30";
  const iconHover =
    tone === "secondary" ? "group-hover:text-ink/30" : "group-hover:text-secondary/55";

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
            className={`absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 ${
              flipBg ? "scale-x-[-1] group-hover:scale-x-[-1.05]" : ""
            }`}
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
        <h2 className="font-display font-bold uppercase tracking-tight leading-[0.95] text-3xl sm:text-4xl lg:text-5xl">
          {title}
        </h2>
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
