import { ArrowRight } from "lucide-react";
import { asset } from "@/lib/asset";

/**
 * Two big BAS-style cards below LiveInspection.
 * Same visual format as SplitFlag: full-bleed image, charcoal gradient,
 * eyebrow + uppercase H2 + body + bottom-left CTA button.
 */
export default function FeatureBlocks() {
  return (
    <section className="bg-white">
      <div className="container py-6 lg:py-8">
        <div className="grid gap-4 lg:gap-5 lg:grid-cols-2">
          {/* ─── LEFT — Trade in. Trade up. ─── */}
          <BigCard
            eyebrow="Got an old fleet?"
            title={
              <>
                Trade in.
                <br />
                Trade up.
              </>
            }
            body="Apply the value of your existing trucks toward your next purchase. Same-day quote, paperwork handled in-house."
            cta="Get my trade-in value"
            href="/stock?category=sell"
            bgImage="/hero/sell.jpg"
          />

          {/* ─── RIGHT — TMH Workshop & Parts ─── */}
          <BigCard
            eyebrow="After-sales · TMH"
            title={
              <>
                Workshop.
                <br />
                Genuine parts.
              </>
            }
            body="Volvo-certified technicians, OEM parts on the shelf, bays sized for everything from light vans to heavy excavators."
            cta="Book a service slot"
            href="/stock"
            bgImage="/hero/inspected.jpg"
          />
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   BigCard — full-bleed image card with charcoal gradient overlay
   (matches the SplitFlag reference exactly)
   ───────────────────────────────────────────────────────────── */

function BigCard({
  eyebrow,
  title,
  body,
  cta,
  href,
  bgImage,
}: {
  eyebrow: string;
  title: React.ReactNode;
  body: string;
  cta: string;
  href: string;
  bgImage: string;
}) {
  return (
    <a
      href={href}
      className="
        group relative overflow-hidden rounded-2xl
        bg-charcoal text-white
        p-8 lg:p-12 min-h-[320px] lg:min-h-[400px]
        flex flex-col justify-between
        transition-all duration-300
        hover:shadow-lift hover:-translate-y-0.5
      "
    >
      {/* Background image */}
      <img
        src={asset(bgImage)}
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
      />

      {/* Black gradient — same as hero left video card and SplitFlag */}
      <div className="absolute inset-0 bg-gradient-to-r from-charcoal-900 via-charcoal-800/70 to-transparent" />

      {/* Content */}
      <div className="relative">
        <div className="text-[11px] uppercase tracking-[0.18em] font-bold text-secondary-300 mb-3">
          {eyebrow}
        </div>
        <h2 className="font-display font-bold uppercase tracking-tight leading-[0.95] text-3xl sm:text-4xl lg:text-5xl">
          {title}
        </h2>
        <p className="mt-5 text-[15px] max-w-md text-white/85 leading-relaxed">
          {body}
        </p>
      </div>

      <div className="relative mt-8">
        <span className="inline-flex items-center gap-2 btn btn-primary h-11 px-5 text-[14px] rounded-md">
          {cta}
          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </span>
      </div>
    </a>
  );
}
