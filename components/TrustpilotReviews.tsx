import { Star } from "lucide-react";

const REVIEWS = [
  {
    rating: 5,
    title: "Best truck-buying experience in the UAE",
    body: "Inspection was thorough, paperwork was sorted in 48 hours, and the truck was delivered to our yard in Sharjah on the same week. Khalid kept us updated through the whole process.",
    name: "Ahmed Al-Mansoori",
    role: "Fleet Manager, Emirates Logistics",
    location: "Sharjah, UAE",
    date: "May 2026",
    verified: true,
  },
  {
    rating: 5,
    title: "Genuine 0% finance — no hidden fees",
    body: "I'd been quoted high rates everywhere else for a used Volvo FH. FAMCO actually delivered on their 0% interest offer with zero processing tricks. The live video inspection sealed the deal.",
    name: "Vikram Iyer",
    role: "Site Director, Al-Futtaim Construction",
    location: "Dubai, UAE",
    date: "Apr 2026",
    verified: true,
  },
  {
    rating: 4.5,
    title: "Used Linde forklifts in great shape",
    body: "Bought 3 Linde forklifts. Inspection report was honest about minor wear, and the team threw in a service to fix the small issues before delivery. Two months in, all running daily.",
    name: "Sana Hassan",
    role: "Operations, Sharjah Transport",
    location: "Sharjah, UAE",
    date: "Apr 2026",
    verified: true,
  },
];

export default function TrustpilotReviews() {
  return (
    <section className="bg-bgalt">
      <div className="container py-12 lg:py-16">
        {/* ─── Header ──────────────────────────────────────────── */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5 mb-8">
          <div>
            <div className="eyebrow mb-2">Trusted by fleets across the GCC</div>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-ink">
              What our customers say
            </h2>
          </div>

          {/* Trustpilot summary */}
          <a
            href="#"
            className="
              inline-flex items-center gap-3 self-start lg:self-auto
              bg-white rounded-lg border border-line px-4 py-3
              shadow-card hover:shadow-lift transition-shadow
            "
          >
            {/* Trustpilot logo block */}
            <div className="flex items-center gap-2">
              {/* Star tile (Trustpilot's star) */}
              <span className="h-7 w-7 rounded-sm bg-secondary flex items-center justify-center">
                <Star className="h-4 w-4 fill-ink text-ink" />
              </span>
              <span className="font-semibold text-ink text-[15px] tracking-tight">
                Trustpilot
              </span>
            </div>

            <span className="h-7 w-px bg-line" />

            {/* Score */}
            <div className="flex items-center gap-2">
              <RatingStars rating={4.7} />
              <span className="text-[13px] text-ink">
                <span className="font-bold">4.7</span>
                <span className="text-muted"> · 2,184 reviews</span>
              </span>
            </div>
          </a>
        </div>

        {/* ─── Review cards ────────────────────────────────────── */}
        <div className="grid md:grid-cols-3 gap-5">
          {REVIEWS.map((r) => (
            <article
              key={r.name}
              className="
                bg-white rounded-xl border border-line shadow-card
                p-6 flex flex-col
              "
            >
              {/* Stars */}
              <div className="mb-3">
                <RatingStars rating={r.rating} size="lg" />
              </div>

              {/* Title */}
              <h3 className="font-display text-lg lg:text-xl font-bold text-ink leading-tight mb-2">
                {r.title}
              </h3>

              {/* Body */}
              <p className="text-[14px] text-ink/80 leading-relaxed mb-5 flex-1">
                "{r.body}"
              </p>

              {/* Author + meta */}
              <div className="pt-4 border-t border-line">
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <div className="font-semibold text-ink text-[14px] truncate">
                      {r.name}
                    </div>
                    <div className="text-[12px] text-muted truncate">
                      {r.role}
                    </div>
                  </div>
                  {r.verified && (
                    <span className="inline-flex items-center gap-1 text-[10.5px] font-bold uppercase tracking-wider text-secondary shrink-0">
                      <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
                      Verified
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 mt-2 text-[12px] text-muted">
                  <span>{r.location}</span>
                  <span className="text-line">·</span>
                  <span>{r.date}</span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Footer link */}
        <div className="text-center mt-8">
          <a
            href="#"
            className="inline-flex items-center gap-2 text-secondary font-semibold hover:underline"
          >
            Read all 2,184 reviews on Trustpilot
            <span aria-hidden>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   Fractional star rating — secondary blue, partial fill via clip
   ───────────────────────────────────────────────────────────── */

function RatingStars({
  rating,
  max = 5,
  size = "md",
}: {
  rating: number;
  max?: number;
  size?: "md" | "lg";
}) {
  const clamped = Math.max(0, Math.min(max, rating));
  const sizeCls = size === "lg" ? "h-5 w-5" : "h-4 w-4";

  return (
    <span
      className="inline-flex items-center gap-0.5"
      role="img"
      aria-label={`${rating} out of ${max} stars`}
    >
      {Array.from({ length: max }).map((_, i) => {
        const fillPct = Math.max(0, Math.min(1, clamped - i)) * 100;
        return (
          <span
            key={i}
            className={`relative inline-block ${sizeCls}`}
          >
            <Star
              className={`absolute inset-0 ${sizeCls} text-secondary/30`}
            />
            <span
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${fillPct}%` }}
              aria-hidden
            >
              <Star className={`${sizeCls} fill-secondary text-secondary`} />
            </span>
          </span>
        );
      })}
    </span>
  );
}
