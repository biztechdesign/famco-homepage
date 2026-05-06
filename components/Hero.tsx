import { ArrowRight } from "lucide-react";
import { asset, link } from "@/lib/asset";

export default function Hero() {
  return (
    <section className="bg-white">
      <div className="container py-6 lg:py-8">
        <div className="grid gap-4 lg:gap-5 lg:grid-cols-[1.6fr_1fr]">
          {/* ─── LEFT — Big hero card (BUY) ───────────────────────── */}
          <a
            href={link("/stock")}
            className="group relative overflow-hidden rounded-2xl bg-charcoal text-white min-h-[360px] lg:min-h-[440px] flex"
          >
            {/* Background video */}
            <video
              src={asset("/placeholders/famco-marketplace3.1-compressed.mp4")}
              poster={asset("/placeholders/hero.svg")}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-hidden
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Left-to-right black gradient — solid charcoal on the left, transparent on the right */}
            <div className="absolute inset-0 bg-gradient-to-r from-charcoal-900 via-charcoal-800/70 to-transparent" />

            {/* Content */}
            <div className="relative z-10 flex flex-col justify-between p-7 lg:p-10 w-full">
              <div>
                <div className="eyebrow text-secondary-300 mb-3">
                  In the UAE · Since 1978
                </div>
                <h1 className="font-display font-bold uppercase tracking-tight leading-[0.95] text-3xl sm:text-5xl lg:text-6xl text-white">
                  Buy used trucks
                  <br />
                  <span className="text-secondary-300">& machinery</span>
                  <br />
                  in the UAE
                </h1>
              </div>

              <div className="mt-8">
                <span className="inline-flex items-center gap-2 btn btn-primary h-12 px-6 text-[15px] shadow-lift">
                  View stock
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
          </a>

          {/* ─── RIGHT — Two stacked cards ────────────────────────── */}
          <div className="grid gap-4 lg:gap-5">
            {/* TOP: Finance — uses the FAMCO-approved 0% finance image */}
            <BentoCard
              eyebrow="0% Interest finance"
              title="Approved & ready to roll."
              cta="Apply for finance"
              href={link("/stock/volvo-fh-460-tractor#finance")}
              variant="primary"
              iconClass="fi-rr-money-bill-wave"
              bgImage="/hero/approved.jpg"
            />

            {/* BOTTOM: Sell */}
            <BentoCard
              eyebrow="Sell with FAMCO"
              title="Get the best price for your fleet."
              cta="Get free valuation"
              href={link("/stock?category=sell")}
              variant="dark"
              iconClass="fi-rr-tags"
              bgImage="/hero/sell.jpg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   Reusable smaller bento card (top-right + bottom-right slots)
   ───────────────────────────────────────────────────────────── */

function BentoCard({
  eyebrow,
  title,
  cta,
  href,
  variant,
  iconClass,
  bgImage,
}: {
  eyebrow: string;
  title: string;
  cta: string;
  href: string;
  variant: "primary" | "dark";
  iconClass: string; // Uicons class, e.g. "fi-rr-money-bill-wave"
  bgImage?: string;
}) {
  // Literal classes so Tailwind's JIT sees them at build-time
  const bgClass =
    variant === "dark" ? "bg-charcoal-800" : "bg-charcoal";
  const eyebrowColor = "text-secondary-300";

  return (
    <a
      href={href}
      className={[
        "group relative overflow-hidden rounded-2xl",
        bgClass,
        "text-white",
        "p-7 lg:p-8 min-h-[170px] lg:min-h-[210px]",
        "flex flex-col justify-between",
        "transition-all duration-300",
        "hover:shadow-lift hover:-translate-y-0.5",
      ].join(" ")}
    >
      {/* Optional background image — sits behind everything */}
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

      {/* Decorative big icon — only shown when there is no background image */}
      {!bgImage && (
        <i
          aria-hidden
          className={`
            fi ${iconClass}
            absolute top-5 right-5
            flex items-center justify-center
            text-secondary/35
            text-[64px] lg:text-[80px] leading-none
            transition-all duration-300
            group-hover:text-secondary/70
            group-hover:scale-110 group-hover:rotate-[-6deg]
          `}
        />
      )}

      <div className={`relative ${bgImage ? "" : "pr-20 lg:pr-24"}`}>
        <div
          className={`text-[11px] uppercase tracking-[0.18em] font-bold ${eyebrowColor} mb-2`}
        >
          {eyebrow}
        </div>
        <h2 className="font-display text-2xl lg:text-3xl font-bold leading-tight max-w-md">
          {title}
        </h2>
      </div>

      <div className="relative mt-5 flex items-center gap-3">
        {/* Big circular arrow button (BAS-style) */}
        <span
          className="
            inline-flex items-center justify-center
            h-10 w-10 rounded-full
            bg-secondary text-ink
            transition-all duration-200
            group-hover:bg-white group-hover:text-primary
            group-hover:scale-110
          "
        >
          <ArrowRight className="h-5 w-5" />
        </span>
        <span className="text-[15px] font-semibold text-white group-hover:text-secondary-300 transition-colors">
          {cta}
        </span>
      </div>
    </a>
  );
}
