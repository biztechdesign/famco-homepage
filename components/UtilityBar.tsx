"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  Phone,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Star,
} from "lucide-react";
import { link } from "@/lib/asset";

const ANNOUNCEMENTS = [
  "Eid Al Adha offers — save up to AED 25,000 on selected Volvo FH tractors",
  "Free GCC delivery on all inspected used trucks this month",
  "Just arrived: low-mileage Volvo FH Aero at FAMCO DIP showroom",
  "TMH Umm Ramool workshop — book a service slot online in 60 seconds",
];

const AUTOPLAY_MS = 5000;

export default function UtilityBar() {
  const [i, setI] = useState(0);
  // direction: 1 = next (incoming slides UP from bottom, outgoing exits to top)
  // direction: -1 = prev (incoming slides DOWN from top, outgoing exits to bottom)
  const [dir, setDir] = useState<1 | -1>(1);
  const total = ANNOUNCEMENTS.length;
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startAutoplay = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setDir(1);
      setI((p) => (p + 1) % total);
    }, AUTOPLAY_MS);
  };

  useEffect(() => {
    startAutoplay();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [total]);

  const prev = () => {
    setDir(-1);
    setI((p) => (p - 1 + total) % total);
    startAutoplay();
  };
  const next = () => {
    setDir(1);
    setI((p) => (p + 1) % total);
    startAutoplay();
  };

  return (
    <div className="hidden md:block bg-primary text-white text-[13px]">
      <div className="container flex h-9 items-center justify-between gap-6">
        {/* LEFT — Trustpilot with proportional fill */}
        <a
          href="#"
          className="flex items-center gap-2 hover:opacity-90 shrink-0"
          aria-label="Trustpilot rating 4.7 out of 5"
        >
          <span className="font-semibold tracking-wide">Trustpilot</span>
          <RatingStars rating={4.7} />
          <span className="text-white/85">
            <span className="font-semibold text-white">4.7</span>
            <span className="text-white/65"> · 2,184 reviews</span>
          </span>
        </a>

        {/* CENTER — Announcement carousel */}
        <div className="flex-1 flex items-center justify-center gap-2 min-w-0">
          <button
            onClick={prev}
            aria-label="Previous announcement"
            className="h-6 w-6 rounded-md hover:bg-white/10 flex items-center justify-center shrink-0"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          <Ticker items={ANNOUNCEMENTS} index={i} dir={dir} />

          <button
            onClick={next}
            aria-label="Next announcement"
            className="h-6 w-6 rounded-md hover:bg-white/10 flex items-center justify-center shrink-0"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        {/* RIGHT — Phone + Inventory country + Language switcher */}
        <div className="flex items-center gap-5 shrink-0">
          <a
            href="tel:80032626"
            className="flex items-center gap-1.5 hover:text-secondary-300"
          >
            <Phone className="h-3.5 w-3.5" />
            <span className="font-semibold">800 32626</span>
          </a>

          <CountrySwitcher />
          <LanguageSwitcher />
        </div>
      </div>
    </div>
  );
}

/**
 * Renders 5 stars with proportional fill for fractional ratings.
 * For rating=4.7: stars 1-4 are 100% filled, star 5 is 70% filled.
 */
function RatingStars({ rating, max = 5 }: { rating: number; max?: number }) {
  const clamped = Math.max(0, Math.min(max, rating));
  return (
    <span
      className="inline-flex items-center gap-0.5"
      role="img"
      aria-label={`${rating} out of ${max} stars`}
    >
      {Array.from({ length: max }).map((_, i) => {
        const fillPct = Math.max(0, Math.min(1, clamped - i)) * 100;
        return (
          <span key={i} className="relative inline-block h-3.5 w-3.5">
            {/* base outline */}
            <Star className="absolute inset-0 h-3.5 w-3.5 text-secondary/35" />
            {/* filled overlay clipped to fillPct */}
            <span
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${fillPct}%` }}
              aria-hidden
            >
              <Star className="h-3.5 w-3.5 fill-secondary text-secondary" />
            </span>
          </span>
        );
      })}
    </span>
  );
}

const LANGUAGES = [
  { code: "EN", country: "United Arab Emirates", label: "English", flag: "🇦🇪" },
  { code: "AR", country: "United Arab Emirates", label: "العربية", flag: "🇦🇪" },
  { code: "EN-GB", country: "United Kingdom", label: "English", flag: "🇬🇧" },
  { code: "EN-SA", country: "Saudi Arabia", label: "English", flag: "🇸🇦" },
  { code: "AR-SA", country: "Saudi Arabia", label: "العربية", flag: "🇸🇦" },
  { code: "EN-OM", country: "Oman", label: "English", flag: "🇴🇲" },
  { code: "EN-QA", country: "Qatar", label: "English", flag: "🇶🇦" },
];

function LanguageSwitcher() {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(LANGUAGES[0]);
  const wrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  return (
    <div ref={wrapRef} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex items-center gap-1.5 hover:text-secondary-300"
      >
        <span aria-hidden className="text-base leading-none">
          {current.flag}
        </span>
        <span className="font-semibold">{current.label}</span>
        <ChevronDown
          className={`h-3.5 w-3.5 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div
          role="listbox"
          className="absolute right-0 top-full mt-2 w-72 bg-white text-ink rounded-lg shadow-lift border border-line py-2 z-50"
        >
          {LANGUAGES.map((l) => {
            const active = l.code === current.code;
            return (
              <button
                key={l.code}
                role="option"
                aria-selected={active}
                onClick={() => {
                  setCurrent(l);
                  setOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-bgalt ${
                  active ? "bg-bgalt" : ""
                }`}
              >
                <span aria-hidden className="text-lg leading-none">
                  {l.flag}
                </span>
                <span className="flex-1">
                  <span className="block text-sm font-medium text-ink">
                    {l.country}
                  </span>
                  <span className="block text-xs text-muted">{l.label}</span>
                </span>
                {active && (
                  <span className="text-secondary text-xs font-bold">✓</span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Country / inventory switcher — UAE vs Saudi Arabia. Drives the
   stock-listing filter via the ?country= URL param so the user only
   sees inventory available in the market they pick.
   ───────────────────────────────────────────────────────────── */

const COUNTRIES = [
  { code: "UAE", label: "UAE", flag: "🇦🇪" },
  { code: "SA", label: "Saudi Arabia", flag: "🇸🇦" },
] as const;

type Country = (typeof COUNTRIES)[number];

const COUNTRY_STORAGE_KEY = "famco-country";

function CountrySwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState<Country>(COUNTRIES[0]);
  const wrapRef = useRef<HTMLDivElement | null>(null);

  // Hydrate the dropdown's current value: URL param first (so deep
  // links stay consistent), then localStorage, else default UAE.
  useEffect(() => {
    const fromUrl = new URLSearchParams(window.location.search).get("country");
    const saved = fromUrl ?? localStorage.getItem(COUNTRY_STORAGE_KEY);
    const found = COUNTRIES.find((c) => c.code === saved);
    if (found) setCurrent(found);
  }, []);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  const choose = (c: Country) => {
    setCurrent(c);
    setOpen(false);
    localStorage.setItem(COUNTRY_STORAGE_KEY, c.code);

    // If the user is already browsing stock, update the listing in
    // place via ?country=. Otherwise send them straight to the listing
    // pre-filtered by the country they just picked.
    if (pathname?.startsWith("/stock")) {
      const next = new URLSearchParams(window.location.search);
      next.set("country", c.code);
      const qs = next.toString();
      router.replace(`${pathname}${qs ? "?" + qs : ""}`, { scroll: false });
    } else {
      router.push(link(`/stock?country=${c.code}`));
    }
  };

  return (
    <div ref={wrapRef} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex items-center gap-1.5 hover:text-secondary-300"
      >
        <span aria-hidden className="text-base leading-none">
          {current.flag}
        </span>
        <span className="font-semibold">{current.label}</span>
        <ChevronDown
          className={`h-3.5 w-3.5 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div
          role="listbox"
          className="absolute right-0 top-full mt-2 w-56 bg-white text-ink rounded-lg shadow-lift border border-line py-2 z-50"
        >
          <div className="px-4 pb-1.5 text-[10px] uppercase tracking-widest font-bold text-muted">
            Browse inventory in
          </div>
          {COUNTRIES.map((c) => {
            const active = c.code === current.code;
            return (
              <button
                key={c.code}
                role="option"
                aria-selected={active}
                onClick={() => choose(c)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-bgalt ${
                  active ? "bg-bgalt" : ""
                }`}
              >
                <span aria-hidden className="text-lg leading-none">
                  {c.flag}
                </span>
                <span className="flex-1 text-sm font-medium text-ink">
                  {c.label}
                </span>
                {active && (
                  <span className="text-secondary text-xs font-bold">✓</span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

/**
 * Vertical-ticker. The active item (index = current) animates in from
 * the bottom when dir=1 (next), or from the top when dir=-1 (prev).
 * The previously active item simultaneously exits to the opposite edge.
 *
 * We track a `prev` index in state so we can render only two children at
 * a time (one entering, one exiting) and rely on CSS transitions on
 * mount/unmount via different starting transforms.
 */
function Ticker({
  items,
  index,
  dir,
}: {
  items: string[];
  index: number;
  dir: 1 | -1;
}) {
  const [renderIndex, setRenderIndex] = useState(index);
  const [entering, setEntering] = useState(false);

  useEffect(() => {
    if (index === renderIndex) return;
    // Start with the new item off-screen, then on next frame move it to 0.
    setEntering(true);
    const id = requestAnimationFrame(() => setEntering(false));
    const t = setTimeout(() => setRenderIndex(index), 500); // duration of slide
    return () => {
      cancelAnimationFrame(id);
      clearTimeout(t);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  const showingTwo = index !== renderIndex;

  // Outgoing (renderIndex) goes opposite direction:
  //   dir=1 (next): outgoing slides UP and OUT of the top  → translateY(-100%)
  //   dir=-1 (prev): outgoing slides DOWN and OUT of bottom → translateY(100%)
  const outgoingTo = dir === 1 ? "-100%" : "100%";

  // Incoming (index) starts from:
  //   dir=1: bottom (translateY(100%))
  //   dir=-1: top (translateY(-100%))
  const incomingFrom = dir === 1 ? "100%" : "-100%";

  return (
    <div className="relative h-5 max-w-[640px] w-full overflow-hidden">
      {/* Outgoing item */}
      {showingTwo && (
        <span
          key={`out-${renderIndex}-${dir}`}
          style={{ transform: `translateY(${outgoingTo})` }}
          className="absolute inset-0 flex items-center justify-center text-center truncate transition-transform duration-500 ease-out"
        >
          {items[renderIndex]}
        </span>
      )}
      {/* Incoming item — starts off-screen on first paint, then slides to 0 */}
      <span
        key={`in-${index}-${dir}`}
        style={{
          transform: entering ? `translateY(${incomingFrom})` : "translateY(0)",
        }}
        className="absolute inset-0 flex items-center justify-center text-center truncate transition-transform duration-500 ease-out"
      >
        {items[index]}
      </span>
    </div>
  );
}
