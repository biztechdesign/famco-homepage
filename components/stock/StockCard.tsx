"use client";

import { Heart, Play, Box, Triangle } from "lucide-react";
import { useState } from "react";
import { asset, link } from "@/lib/asset";
import type { Vehicle } from "@/lib/vehicles";
export type { Vehicle };

const BADGE_STYLES: Record<string, string> = {
  INSPECTED: "bg-primary text-white",
  "NEW ARRIVAL": "bg-secondary text-ink",
  SALE: "bg-secondary text-ink",
  "0% FINANCE": "bg-charcoal text-white",
};

const fmt = (n: number) => new Intl.NumberFormat("en-AE").format(n);

export default function StockCard({ v }: { v: Vehicle }) {
  const [saved, setSaved] = useState(false);
  const [hover3D, setHover3D] = useState(false);
  const currency = v.currency ?? "AED";
  const has3DPreview = Boolean(v.sketchfabId);

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
        onMouseEnter={() => has3DPreview && setHover3D(true)}
        onMouseLeave={() => has3DPreview && setHover3D(false)}
        className="block relative aspect-[4/3] overflow-hidden bg-bgalt rounded-t-xl"
      >
        <img
          src={asset(v.image)}
          alt={v.title}
          className={`absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 ${
            hover3D ? "opacity-0" : "opacity-100"
          }`}
        />

        {/* 3D hover preview — lazy-mounted only on hover */}
        {has3DPreview && hover3D && (
          <>
            <div className="absolute inset-0 bg-charcoal flex items-center justify-center">
              <span className="text-white/80 text-[11px] font-semibold tracking-wider uppercase animate-pulse">
                Loading 3D view…
              </span>
            </div>
            <iframe
              key={`sf-${v.id}`}
              title={`${v.title} — 3D view`}
              allow="autoplay; fullscreen; xr-spatial-tracking"
              className="absolute inset-0 h-full w-full border-0 pointer-events-none"
              src={`https://sketchfab.com/models/${v.sketchfabId}/embed?autospin=0.6&autostart=1&transparent=0&ui_hint=0&ui_theme=dark&ui_animations=0&ui_infos=0&ui_inspector=0&ui_settings=0&ui_watermark_link=0&ui_watermark=0&ui_controls=0&ui_stop=0&ui_help=0&ui_ar=0&ui_ar_help=0&ui_fullscreen=0&ui_annotations=0&ui_loading=0`}
            />
          </>
        )}

        {/* Badges top-left */}
        {v.badges && v.badges.length > 0 && (
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {v.badges.map((b) => (
              <span
                key={b}
                className={`text-[10px] font-bold tracking-wider px-2 py-1 rounded ${BADGE_STYLES[b]}`}
              >
                {b}
              </span>
            ))}
          </div>
        )}

        {/* Media tags bottom-left */}
        {(v.hasVideo || v.has3D) && (
          <div className="absolute bottom-3 left-3 flex items-center gap-1.5">
            {v.hasVideo && (
              <span className="inline-flex items-center gap-1 bg-charcoal-900/80 backdrop-blur text-white text-[10px] font-bold tracking-wider uppercase px-2 py-1 rounded">
                <Play className="h-3 w-3 fill-white" />
                Video
              </span>
            )}
            {v.has3D && (
              <span className="inline-flex items-center gap-1 bg-charcoal-900/80 backdrop-blur text-white text-[10px] font-bold tracking-wider uppercase px-2 py-1 rounded">
                <Box className="h-3 w-3" />
                3D View
              </span>
            )}
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
            saved ? "fill-secondary text-secondary" : ""
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

        {/* Description */}
        <p className="mt-1 text-[12.5px] text-muted line-clamp-1">
          {v.description}
        </p>

        {/* Spec row — pipe-separated, wraps */}
        <div className="mt-3 text-[12.5px] text-ink/85 leading-relaxed">
          {specs.map((s, i) => (
            <span key={i}>
              {i > 0 && <span className="text-line mx-2">|</span>}
              <span>{s}</span>
            </span>
          ))}
        </div>

        {/* Dealer */}
        <div className="mt-3 flex items-center text-[12.5px]">
          <span className="inline-flex items-center gap-1.5 text-ink font-semibold">
            <Triangle
              className="h-3 w-3 text-secondary fill-secondary"
              style={{ transform: "rotate(90deg)" }}
            />
            {v.dealer ?? "FAMCO"}
          </span>
        </div>

        {/* Price block */}
        <div className="mt-4 pt-3 border-t border-line flex items-baseline justify-between gap-3">
          <span className="text-[12.5px] text-muted">Buy</span>
          <div className="text-right">
            {v.oldPrice && v.oldPrice > v.price && (
              <div className="text-[12.5px] text-muted line-through tabular-nums">
                {currency} {fmt(v.oldPrice)}
              </div>
            )}
            <div className="font-display text-[18px] font-bold text-secondary leading-none tabular-nums">
              {currency} {fmt(v.price)}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
