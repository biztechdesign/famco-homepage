"use client";

import { Heart, Triangle } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { asset, link } from "@/lib/asset";
import type { Vehicle } from "@/lib/vehicles";
export type { Vehicle };

const BADGE_STYLES: Record<string, string> = {
  INSPECTED: "bg-primary text-white",
  "NEW ARRIVAL": "bg-secondary text-ink",
  SALE: "bg-secondary text-ink",
  "0% FINANCE": "bg-charcoal text-white",
};

// vehicle.country (display name) → ISO 2-letter lowercase used by the
// lipis/flag-icons CSS classes (e.g. "ae" → fi fi-ae).
const FLAG_ISO: Record<string, string> = {
  UAE: "ae",
  "Saudi Arabia": "sa",
  "United Arab Emirates": "ae",
  Oman: "om",
  Qatar: "qa",
  "United Kingdom": "gb",
};

const fmt = (n: number) => new Intl.NumberFormat("en-AE").format(n);

export default function StockCard({ v }: { v: Vehicle }) {
  const [saved, setSaved] = useState(false);
  const [hoverVideo, setHoverVideo] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const currency = v.currency ?? "AED";
  const hasVideoPreview = Boolean(v.video);

  // Restart the clip from frame 0 every time the user re-enters the card
  // so the preview always plays the intro, not wherever it last paused.
  useEffect(() => {
    if (!hoverVideo) return;
    const el = videoRef.current;
    if (!el) return;
    el.currentTime = 0;
    el.play().catch(() => {
      /* autoplay may be blocked — silent no-op */
    });
  }, [hoverVideo]);

  // Spec row items in display order
  const specs: string[] = [
    v.brand,
    v.country,
    String(v.year),
    v.hours ? `${fmt(v.hours)} hrs` : v.km !== undefined ? `${fmt(v.km)} km` : "",
    v.transmission ?? "",
  ].filter(Boolean);

  return (
    <article
      className="
        group relative bg-white rounded-xl overflow-hidden
        border border-line shadow-card
        hover:shadow-lift hover:-translate-y-0.5 hover:border-secondary
        transition-all duration-300
      "
    >
      {/* Image */}
      <a
        href={link(v.href ?? "/stock/volvo-fh-460-tractor")}
        onMouseEnter={() => hasVideoPreview && setHoverVideo(true)}
        onMouseLeave={() => hasVideoPreview && setHoverVideo(false)}
        className="block relative aspect-[4/3] overflow-hidden bg-bgalt rounded-t-xl"
      >
        <img
          src={asset(v.image)}
          alt={v.title}
          className={`absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 ${
            hoverVideo ? "opacity-0" : "opacity-100"
          }`}
        />

        {/* Video hover preview — lazy-mounted on first hover, then kept
            in the DOM (with display toggled via opacity) so subsequent
            hovers don't re-download. Mirrors the walk-around the PDP
            shows in its Video tab. 3D model previews are intentionally
            NOT rendered here — listing stays light. */}
        {hasVideoPreview && hoverVideo && (
          <video
            ref={videoRef}
            src={asset(v.video!)}
            poster={asset(v.image)}
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}

        {/* "FAMCO Approved" chip — top-left, on every card */}
        <span className="absolute top-3 left-3 inline-flex items-center gap-1 bg-white/95 backdrop-blur text-ink text-[10px] font-bold tracking-wider px-2 py-1 rounded shadow-card">
          <span className="h-3.5 w-3.5 rounded-full bg-secondary text-ink flex items-center justify-center text-[9px] leading-none">
            ✓
          </span>
          FAMCO APPROVED
        </span>

        {/* Per-vehicle badges (NEW ARRIVAL / INSPECTED) — bottom-left */}
        {v.badges &&
          v.badges.filter((b) => b !== "SALE" && b !== "0% FINANCE").length >
            0 && (
            <div className="absolute bottom-3 left-3 flex flex-col gap-1.5">
              {v.badges
                .filter((b) => b !== "SALE" && b !== "0% FINANCE")
                .map((b) => (
                  <span
                    key={b}
                    className={`text-[10px] font-bold tracking-wider px-2 py-1 rounded ${BADGE_STYLES[b]}`}
                  >
                    {b}
                  </span>
                ))}
            </div>
          )}
      </a>

      {/* Save button (square, top-right — matches reference) */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          setSaved(!saved);
        }}
        aria-label={saved ? "Remove from favorites" : "Save to favorites"}
        className="
          absolute top-3 right-3
          h-9 w-9 rounded-md
          bg-charcoal/80 hover:bg-charcoal text-white
          flex items-center justify-center
          backdrop-blur transition-colors
        "
      >
        <Heart
          className={`h-4 w-4 ${
            saved ? "fill-secondary-500 text-secondary-500" : ""
          }`}
        />
      </button>

      {/* Body */}
      <div className="p-5">
        {/* Title */}
        <a href={link(v.href ?? "/stock/volvo-fh-460-tractor")} className="block">
          <h3 className="font-display text-[16px] sm:text-[17px] font-bold text-ink leading-tight line-clamp-1">
            {v.title}
          </h3>
        </a>

        {/* Subtitle / short description — single line */}
        {v.description && (
          <p className="mt-1 text-[13px] text-muted line-clamp-1">
            {v.description}
          </p>
        )}

        {/* Spec row — pipe-separated, wraps */}
        <div className="mt-3 text-[12.5px] text-ink/85 leading-relaxed">
          {specs.map((s, i) => (
            <span key={i}>
              {i > 0 && <span className="text-line mx-2">|</span>}
              <span>{s}</span>
            </span>
          ))}
        </div>

        {/* Dealer (left) + country flag (right) */}
        <div className="mt-3 flex items-center justify-between text-[12.5px] gap-3">
          <span className="inline-flex items-center gap-1.5 text-ink font-semibold">
            <Triangle
              className="h-3 w-3 text-secondary fill-secondary"
              style={{ transform: "rotate(90deg)" }}
            />
            {v.dealer ?? "FAMCO"}
          </span>
          {v.country && (
            <span className="inline-flex items-center gap-1.5 text-ink/85">
              {FLAG_ISO[v.country] && (
                <span
                  aria-hidden
                  className={`fi fi-${FLAG_ISO[v.country]} rounded-sm shadow-[0_0_0_0.5px_rgba(0,0,0,0.08)]`}
                  style={{ width: "1.2em", height: "0.9em" }}
                />
              )}
              {v.country}
            </span>
          )}
        </div>

        {/* Price block — centered "Buy" label with price stacked below */}
        <div className="mt-4 pt-3 border-t border-line text-center">
          <div className="text-[13px] text-muted">Buy</div>
          {v.oldPrice && v.oldPrice > v.price && (
            <div className="text-[12.5px] text-muted line-through tabular-nums">
              {currency} {fmt(v.oldPrice)}
            </div>
          )}
          <div className="font-display text-[20px] font-bold text-ink leading-none tabular-nums mt-0.5">
            {currency} {fmt(v.price)}
          </div>
        </div>
      </div>
    </article>
  );
}
