"use client";

import { useEffect, useRef, useState } from "react";
import {
  Image as ImageIcon,
  Box,
  Video,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { asset } from "@/lib/asset";

export type GalleryImage = { src: string; alt?: string };

const TABS = [
  { id: "gallery", label: "Gallery", Icon: ImageIcon },
  { id: "360", label: "360° View", Icon: Box },
  { id: "video", label: "Video", Icon: Video },
] as const;
type TabId = (typeof TABS)[number]["id"];

export default function PdpGallery({
  title,
  refId,
  approved = true,
  grade = "A",
  images,
  videoSrc,
  videoPoster,
  sketchfabId,
  glbModel,
}: {
  title: string;
  refId: string;
  approved?: boolean;
  grade?: string;
  images: GalleryImage[];
  videoSrc?: string;
  videoPoster?: string;
  sketchfabId?: string;
  glbModel?: string;
}) {
  const [tab, setTab] = useState<TabId>("gallery");
  const [idx, setIdx] = useState(0);
  const total = images.length;

  const prev = () => setIdx((i) => (i - 1 + total) % total);
  const next = () => setIdx((i) => (i + 1) % total);
  const active = images[idx];

  const has3D = Boolean(glbModel || sketchfabId);

  return (
    <div className="bg-white rounded-xl border border-line shadow-card overflow-hidden">
      {/* Tab strip */}
      <div className="border-b border-line bg-bgalt/60 px-3 sm:px-4 pt-2.5">
        <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide">
          {TABS.map(({ id, label, Icon }) => {
            const isActive = tab === id;
            const disabled =
              (id === "360" && !has3D) || (id === "video" && !videoSrc);
            return (
              <button
                key={id}
                onClick={() => !disabled && setTab(id)}
                disabled={disabled}
                className={`
                  inline-flex items-center gap-1.5
                  px-3 py-2 text-[13px] font-semibold whitespace-nowrap
                  border-b-2 -mb-px
                  transition-colors
                  ${
                    isActive
                      ? "text-ink border-secondary"
                      : disabled
                      ? "text-muted/50 border-transparent cursor-not-allowed"
                      : "text-muted border-transparent hover:text-ink"
                  }
                `}
              >
                <Icon className="h-3.5 w-3.5" />
                {label}
                {id === "gallery" && (
                  <span className="text-muted font-normal">({total})</span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Stage — 16:9 box capped by viewport height so the thumbnail
          rail stays in the first fold. object-contain keeps the full
          truck visible without cropping. */}
      <div className="relative aspect-[16/9] max-h-[55vh] bg-bgalt overflow-hidden">
        {tab === "gallery" && active && (
          <img
            src={asset(active.src)}
            alt={active.alt ?? `${title} — view ${idx + 1}`}
            className="absolute inset-0 h-full w-full object-contain"
          />
        )}

        {tab === "360" && glbModel && (
          // @ts-expect-error — <model-viewer> custom element
          <model-viewer
            src={asset(glbModel)}
            camera-controls
            auto-rotate
            auto-rotate-delay="0"
            rotation-per-second="20deg"
            interaction-prompt="auto"
            exposure="1"
            shadow-intensity="0.7"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              background: "#1A1A1F",
            }}
          />
        )}

        {tab === "360" && !glbModel && sketchfabId && (
          <iframe
            title={`${title} — 3D model`}
            allow="autoplay; fullscreen; xr-spatial-tracking"
            allowFullScreen
            scrolling="no"
            className="absolute inset-0 h-full w-full border-0 overflow-hidden"
            src={`https://sketchfab.com/models/${sketchfabId}/embed?autospin=0.4&autostart=1&ui_hint=2&ui_theme=dark&ui_animations=0&ui_inspector=0&ui_settings=0&ui_watermark_link=0&ui_watermark=0`}
          />
        )}

        {tab === "video" && videoSrc && (
          <video
            src={asset(videoSrc)}
            poster={videoPoster ? asset(videoPoster) : undefined}
            controls
            playsInline
            preload="metadata"
            className="absolute inset-0 h-full w-full object-cover bg-charcoal"
          />
        )}

        {/* Overlay UI — only on gallery tab */}
        {tab === "gallery" && (
          <>
            {/* Top-left: FAMCO Approved + Grade */}
            <div className="absolute top-3 left-3 flex flex-col gap-1.5 pointer-events-none">
              {approved && (
                <span className="inline-flex items-center text-[10.5px] font-bold tracking-wider uppercase px-2.5 py-1 rounded bg-secondary text-ink">
                  FAMCO Approved
                </span>
              )}
              {grade && (
                <span className="inline-flex items-center text-[10.5px] font-bold tracking-wider uppercase px-2.5 py-1 rounded bg-charcoal-900/85 text-white backdrop-blur">
                  Grade {grade}
                </span>
              )}
            </div>

            {/* Top-right: Ref */}
            <span className="absolute top-3 right-3 inline-flex items-center text-[11px] font-semibold px-2.5 py-1 rounded bg-charcoal-900/85 text-white backdrop-blur tabular-nums pointer-events-none">
              Ref: {refId}
            </span>

            {/* Prev/next */}
            {total > 1 && (
              <>
                <button
                  onClick={prev}
                  aria-label="Previous photo"
                  className="absolute left-3 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-white/95 hover:bg-white text-ink shadow-card flex items-center justify-center transition-colors"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={next}
                  aria-label="Next photo"
                  className="absolute right-3 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-white/95 hover:bg-white text-ink shadow-card flex items-center justify-center transition-colors"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </>
            )}
          </>
        )}
      </div>

      {/* Thumbnail rail (gallery only) — fixed h-16 w-24 tiles, but the
          rail repeats the image set so the row reaches the full width
          of the gallery card instead of leaving blank space on the
          right when the source set is short (e.g. only 3 photos). */}
      {tab === "gallery" && total > 0 && (
        <ThumbnailRail
          images={images}
          activeIdx={idx}
          onSelect={setIdx}
        />
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Thumbnail rail — measures its own width and renders enough
   cycled copies of the source images to span the full row at the
   original tile size (h-16 w-24, gap-2). Tiles past the first
   pass are non-interactive duplicates so the active state still
   tracks the real index in the source `images` array.
   ───────────────────────────────────────────────────────────── */

function ThumbnailRail({
  images,
  activeIdx,
  onSelect,
}: {
  images: GalleryImage[];
  activeIdx: number;
  onSelect: (i: number) => void;
}) {
  const TILE_W = 96; // h-16 w-24 → 96px
  const GAP = 8; // gap-2 → 8px
  const railRef = useRef<HTMLDivElement | null>(null);
  const [count, setCount] = useState(images.length);

  useEffect(() => {
    const el = railRef.current;
    if (!el) return;
    const measure = () => {
      const w = el.clientWidth;
      // tile + gap pairs, then add one tile worth of width
      const fits = Math.max(
        images.length,
        Math.floor((w + GAP) / (TILE_W + GAP)),
      );
      setCount(fits);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [images.length]);

  return (
    <div className="px-3 sm:px-4 py-3 border-t border-line">
      <div ref={railRef} className="flex gap-2 overflow-hidden">
        {Array.from({ length: count }).map((_, i) => {
          const sourceIdx = i % images.length;
          const m = images[sourceIdx];
          const isActive = sourceIdx === activeIdx && i < images.length;
          // Only the first pass through the source set is the "real"
          // selectable thumbnail. Repeats past that point are filler so
          // we don't have multiple highlighted copies of the same photo.
          const isFiller = i >= images.length;
          return (
            <button
              key={i}
              onClick={() => onSelect(sourceIdx)}
              aria-label={
                isFiller ? undefined : `Show photo ${sourceIdx + 1}`
              }
              aria-hidden={isFiller || undefined}
              tabIndex={isFiller ? -1 : 0}
              className={`
                shrink-0 h-16 w-24 rounded-md overflow-hidden border-2
                transition-all
                ${
                  isActive
                    ? "border-secondary ring-2 ring-secondary/30"
                    : isFiller
                      ? "border-line/60 opacity-70 hover:opacity-100"
                      : "border-line hover:border-secondary/50"
                }
              `}
            >
              <img
                src={asset(m.src)}
                alt=""
                aria-hidden
                className="h-full w-full object-cover"
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
