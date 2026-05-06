"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ITEMS = [
  {
    title: "Sell your truck",
    href: "#",
    image: "/hero/sell.jpg",
  },
  {
    title: "Sell your bus or van",
    href: "#",
    image: "/hero/finance.jpg",
  },
  {
    title: "Sell your machine",
    href: "#",
    image: "/hero/brand-new.jpg",
  },
  {
    title: "Sell your forklift",
    href: "#",
    image: "/hero/inspected.jpg",
  },
];

export default function SellShowcase() {
  const trackRef = useRef<HTMLDivElement | null>(null);

  const scroll = (dir: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    // Scroll by roughly one card width
    const card = track.querySelector<HTMLElement>("[data-card]");
    const step = card?.offsetWidth ? card.offsetWidth + 20 : 360;
    track.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <section className="bg-white">
      <div className="container py-12 lg:py-16">
        {/* ─── Header row ──────────────────────────────────────── */}
        <div className="flex items-end justify-between gap-4 mb-6 lg:mb-8">
          <div>
            <div className="eyebrow mb-2">Sell with FAMCO</div>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-ink">
              Sell your current vehicle or machine
            </h2>
          </div>

          {/* Prev / next */}
          <div className="hidden sm:flex items-center gap-2 shrink-0">
            <button
              onClick={() => scroll(-1)}
              aria-label="Previous"
              className="
                h-11 w-11 rounded-full border border-line bg-white
                flex items-center justify-center
                text-ink hover:text-secondary
                hover:border-secondary
                transition-colors
              "
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => scroll(1)}
              aria-label="Next"
              className="
                h-11 w-11 rounded-full border border-line bg-white
                flex items-center justify-center
                text-ink hover:text-secondary
                hover:border-secondary
                transition-colors
              "
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* ─── Carousel ────────────────────────────────────────── */}
        <div
          ref={trackRef}
          className="
            flex gap-5 overflow-x-auto scrollbar-hide
            snap-x snap-mandatory
            pb-2
          "
        >
          {ITEMS.map((it) => (
            <a
              key={it.title}
              href={it.href}
              data-card
              className="
                group relative shrink-0
                w-[78%] sm:w-[48%] lg:w-[calc((100%-2.5rem)/3)]
                aspect-[4/3]
                rounded-2xl overflow-hidden
                bg-charcoal
                snap-start
                transition-all duration-300
                hover:shadow-lift hover:-translate-y-0.5
              "
            >
              <img
                src={it.image}
                alt={it.title}
                className="
                  absolute inset-0 h-full w-full object-cover
                  transition-transform duration-700
                  group-hover:scale-105
                "
              />
              {/* Bottom-up dark gradient for label legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/85 via-charcoal-900/15 to-transparent" />

              {/* Title overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-5 lg:p-6 flex items-end justify-between gap-3">
                <h3 className="font-display text-xl lg:text-2xl font-bold text-white leading-tight">
                  {it.title}
                </h3>
                <span
                  aria-hidden
                  className="
                    h-9 w-9 rounded-full
                    bg-secondary text-white
                    flex items-center justify-center shrink-0
                    transition-all duration-200
                    group-hover:bg-white group-hover:text-primary
                    group-hover:scale-110
                  "
                >
                  <ChevronRight className="h-5 w-5" />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
