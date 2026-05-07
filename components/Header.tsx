"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  Search,
  Heart,
  User,
  Menu,
  X,
  ChevronDown,
  LayoutGrid,
  Play,
  Box,
} from "lucide-react";
import CategoriesMegaMenu from "./CategoriesMegaMenu";
import { link } from "@/lib/asset";
import { asset } from "@/lib/asset";
import { VEHICLES, type Vehicle } from "@/lib/vehicles";

const fmtNum = (n: number) => new Intl.NumberFormat("en-AE").format(n);

function matchVehicles(query: string, limit = 6): Vehicle[] {
  const q = query.trim().toLowerCase();
  // Empty query → seed the dropdown with the first N vehicles so users
  // see something to click the moment they focus the search bar.
  if (!q) return VEHICLES.slice(0, limit);
  const tokens = q.split(/\s+/).filter(Boolean);
  return VEHICLES.filter((v) => {
    const hay = [
      v.title,
      v.description,
      v.brand,
      v.category,
      v.country,
      v.dealer ?? "",
      v.transmission ?? "",
      v.fuel ?? "",
      v.euro ?? "",
      v.drive ?? "",
      String(v.year),
    ]
      .join(" ")
      .toLowerCase();
    return tokens.every((t) => hay.includes(t));
  }).slice(0, limit);
}

export default function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);

  // Live-search state — typing on /stock page updates ?q=… in real time
  const router = useRouter();
  const pathname = usePathname();
  const onListing =
    pathname?.endsWith("/stock") || pathname?.endsWith("/stock/");

  // Always start with an empty string so the input is controlled from
  // the first render. Hydrate from ?q= on mount only.
  const [q, setQ] = useState("");

  // Hydrate once on mount (avoids the URL-replace ↔ setQ ping-pong)
  useEffect(() => {
    setQ(new URLSearchParams(window.location.search).get("q") ?? "");
  }, []);

  // Keep input in sync when the user uses Back/Forward navigation
  useEffect(() => {
    const onPop = () => {
      setQ(new URLSearchParams(window.location.search).get("q") ?? "");
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  // Suggestion-dropdown open state + click-outside / ESC handling
  const [openSuggest, setOpenSuggest] = useState(false);
  const searchWrapRef = useRef<HTMLFormElement | null>(null);

  const matches = useMemo(() => matchVehicles(q), [q]);

  // Typing updates local state. On /stock we ALSO update ?q= live so the
  // listing filters in the background; on every other page we just show
  // the dropdown (no auto-navigation). Dropdown stays open even on empty
  // query so the user gets a starter list of equipment to browse.
  const setQuery = (value: string) => {
    setQ(value);
    setOpenSuggest(true);

    if (!onListing) return;
    const trimmed = value.trim();
    const next = new URLSearchParams(window.location.search);
    if (trimmed) next.set("q", trimmed);
    else next.delete("q");
    const qs = next.toString();
    const url = `${pathname}${qs ? "?" + qs : ""}`;
    window.history.replaceState({}, "", url);
    router.replace(url, { scroll: false });
  };

  // Close dropdown on outside click / ESC
  useEffect(() => {
    if (!openSuggest) return;
    const onDocClick = (e: MouseEvent) => {
      if (!searchWrapRef.current) return;
      if (!searchWrapRef.current.contains(e.target as Node)) {
        setOpenSuggest(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenSuggest(false);
    };
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [openSuggest]);

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-line shadow-sm">
      {/* Single row — Logo · Search bar · Actions */}
      <div className="container flex h-20 items-center gap-4 lg:gap-6">
        {/* Logo */}
        <a href={link("/")} className="flex items-center shrink-0">
          <img
            src={asset("/brand/logo.png")}
            alt="Al-Futtaim FAMCO Used Equipment"
            className="h-10 sm:h-12 w-auto"
          />
        </a>

        {/* Search bar with category mega-menu trigger — narrower + centered */}
        <div className="hidden md:flex flex-1 justify-center relative">
          <form
            ref={searchWrapRef}
            action={link("/stock")}
            method="get"
            className="w-full max-w-[560px] relative"
          >
          <div className="flex items-stretch h-11 rounded-lg border border-line bg-white shadow-sm overflow-hidden focus-within:ring-2 focus-within:ring-secondary focus-within:border-secondary">
            <button
              type="button"
              onClick={() => setMegaOpen((v) => !v)}
              aria-expanded={megaOpen}
              aria-haspopup="dialog"
              className={`flex items-center gap-2 px-4 lg:px-5 text-[14px] font-semibold border-r border-line transition-colors ${
                megaOpen
                  ? "bg-primary text-white"
                  : "bg-white text-ink hover:bg-bgalt"
              }`}
            >
              <LayoutGrid
                className={`h-4 w-4 ${
                  megaOpen ? "text-white" : "text-secondary"
                }`}
              />
              <span className="hidden lg:inline">All categories</span>
              <span className="lg:hidden">Categories</span>
              <ChevronDown
                className={`h-4 w-4 transition-transform ${
                  megaOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            <div className="flex-1 flex items-center px-4 min-w-0">
              <Search className="h-5 w-5 text-muted shrink-0" />
              <input
                type="search"
                name="q"
                value={q}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setOpenSuggest(true)}
                placeholder="Search by make, model, or keyword"
                className="w-full ml-3 bg-transparent text-[14px] text-ink placeholder:text-muted outline-none text-ellipsis"
                aria-autocomplete="list"
                aria-expanded={openSuggest}
              />
            </div>

            <button
              type="submit"
              aria-label="Search"
              className="bg-secondary hover:bg-secondary-600 text-ink px-4 flex items-center justify-center transition-colors"
            >
              <Search className="h-4 w-4" />
            </button>
          </div>

          {/* Live results dropdown — opens on focus and seeds with a
              default list, then narrows as the user types. */}
          {openSuggest && (
            <div
              role="listbox"
              className="absolute left-0 right-0 top-full mt-2 bg-white border border-line rounded-lg shadow-lift z-50 overflow-hidden"
            >
              {!q.trim() && (
                <div className="px-4 py-2 border-b border-line bg-bgalt/60 text-[10.5px] uppercase tracking-widest font-bold text-muted">
                  Featured equipment
                </div>
              )}
              {matches.length === 0 ? (
                <div className="px-4 py-6 text-center text-[13px] text-muted">
                  No matching equipment for{" "}
                  <span className="font-semibold text-ink">“{q}”</span>
                </div>
              ) : (
                <ul className="max-h-[70vh] overflow-y-auto divide-y divide-line">
                  {matches.map((v) => {
                    const currency = v.currency ?? "AED";
                    const usage = v.hours
                      ? `${fmtNum(v.hours)} hrs`
                      : v.km !== undefined
                      ? `${fmtNum(v.km)} km`
                      : "";
                    const specs = [
                      v.brand,
                      String(v.year),
                      usage,
                      v.transmission,
                      v.fuel,
                      v.drive,
                      v.euro,
                    ].filter(Boolean) as string[];

                    return (
                      <li key={v.id} role="option">
                        <a
                          href={v.href ? link(v.href) : link("/stock")}
                          onClick={() => setOpenSuggest(false)}
                          className="flex gap-3 p-3 hover:bg-bgalt transition-colors"
                        >
                          <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-md bg-bgalt">
                            <img
                              src={asset(v.image)}
                              alt={v.title}
                              className="absolute inset-0 h-full w-full object-cover"
                            />
                            {(v.hasVideo || v.has3D) && (
                              <div className="absolute bottom-1 left-1 flex items-center gap-1">
                                {v.hasVideo && (
                                  <span className="inline-flex items-center bg-charcoal-900/80 text-white rounded p-0.5">
                                    <Play className="h-2.5 w-2.5 fill-white" />
                                  </span>
                                )}
                                {v.has3D && (
                                  <span className="inline-flex items-center bg-charcoal-900/80 text-white rounded p-0.5">
                                    <Box className="h-2.5 w-2.5" />
                                  </span>
                                )}
                              </div>
                            )}
                          </div>

                          <div className="min-w-0 flex-1">
                            <div className="flex items-start justify-between gap-3">
                              <h4 className="text-[13.5px] font-semibold text-ink leading-tight line-clamp-1">
                                {v.title}
                              </h4>
                              <div className="text-right shrink-0">
                                {v.oldPrice && v.oldPrice > v.price && (
                                  <div className="text-[11px] text-muted line-through tabular-nums leading-none">
                                    {currency} {fmtNum(v.oldPrice)}
                                  </div>
                                )}
                                <div className="text-[14px] font-bold text-secondary tabular-nums leading-none mt-0.5">
                                  {currency} {fmtNum(v.price)}
                                </div>
                              </div>
                            </div>
                            <p className="mt-1 text-[12px] text-muted line-clamp-1">
                              {v.description}
                            </p>
                            <div className="mt-1.5 text-[11.5px] text-ink/80 leading-snug">
                              {specs.map((s, i) => (
                                <span key={i}>
                                  {i > 0 && (
                                    <span className="text-line mx-1.5">|</span>
                                  )}
                                  <span>{s}</span>
                                </span>
                              ))}
                            </div>
                            <div className="mt-1 flex items-center justify-between text-[11px] text-muted">
                              <span>
                                {v.category}
                                {v.dealer ? ` • ${v.dealer}` : ""}
                              </span>
                              <span>
                                {v.countryFlag ? `${v.countryFlag} ` : ""}
                                {v.country}
                              </span>
                            </div>
                          </div>
                        </a>
                      </li>
                    );
                  })}
                </ul>
              )}

              <a
                href={
                  q.trim()
                    ? link(`/stock?q=${encodeURIComponent(q.trim())}`)
                    : link("/stock")
                }
                onClick={() => setOpenSuggest(false)}
                className="block px-4 py-2.5 text-center text-[12.5px] font-semibold text-secondary border-t border-line hover:bg-bgalt"
              >
                {q.trim()
                  ? `See all results for “${q.trim()}” →`
                  : "Browse all stock →"}
              </a>
            </div>
          )}
          </form>

          <CategoriesMegaMenu
            open={megaOpen}
            onClose={() => setMegaOpen(false)}
          />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1.5 shrink-0 ml-auto md:ml-0">
          {/* Mobile search toggle */}
          <button
            className="md:hidden h-10 w-10 inline-flex items-center justify-center rounded-md hover:bg-bgalt"
            aria-label="Search"
          >
            <Search className="h-5 w-5 text-ink" />
          </button>

          <button className="hidden sm:inline-flex h-10 w-10 items-center justify-center rounded-md hover:bg-bgalt relative">
            <Heart className="h-5 w-5 text-ink" />
            <span className="absolute top-1 right-1 h-4 min-w-4 px-1 rounded-full bg-secondary text-ink text-[10px] flex items-center justify-center">
              3
            </span>
          </button>
          <button className="hidden sm:inline-flex h-10 w-10 items-center justify-center rounded-md hover:bg-bgalt">
            <User className="h-5 w-5 text-ink" />
          </button>
          <a
            href={link("/stock?category=sell")}
            className="hidden lg:inline-flex btn btn-primary h-10 ml-2 whitespace-nowrap"
          >
            Sell your equipment
          </a>
          <button
            className="md:hidden h-10 w-10 inline-flex items-center justify-center rounded-md hover:bg-bgalt"
            onClick={() => setDrawerOpen(!drawerOpen)}
            aria-label="Menu"
          >
            {drawerOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {drawerOpen && (
        <>
          <button
            aria-label="Close menu"
            className="md:hidden fixed inset-0 top-20 z-30 bg-black/50"
            onClick={() => setDrawerOpen(false)}
          />
          <aside className="md:hidden fixed top-20 right-0 bottom-0 z-40 w-[88%] max-w-sm bg-primary text-white shadow-2xl flex flex-col">
            <div className="px-5 py-5 border-b border-white/15 flex items-center justify-between">
              <span className="text-xs uppercase tracking-widest text-white/60">
                Menu
              </span>
              <button
                onClick={() => setDrawerOpen(false)}
                className="h-9 w-9 rounded-md hover:bg-white/10 flex items-center justify-center"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto px-2 py-3 space-y-1">
              <a
                href={link("/stock")}
                className="flex items-center gap-3 px-3 py-3.5 rounded-md hover:bg-secondary font-medium"
              >
                <Heart className="h-5 w-5" /> Browse stock
              </a>
              <a
                href={link("/stock?category=sell")}
                className="flex items-center gap-3 px-3 py-3.5 rounded-md hover:bg-secondary font-medium"
              >
                <User className="h-5 w-5" /> Sell your equipment
              </a>
            </nav>
            <div className="p-5 border-t border-white/15 space-y-3">
              <a href={link("/stock?category=sell")} className="btn btn-primary w-full">
                Sell your equipment
              </a>
              <a
                href="tel:80032626"
                className="block text-center text-sm text-white/85 hover:text-white"
              >
                📞 800 32626
              </a>
            </div>
          </aside>
        </>
      )}
    </header>
  );
}
