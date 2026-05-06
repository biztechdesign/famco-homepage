"use client";

import { useState } from "react";
import {
  Search,
  Heart,
  User,
  Menu,
  X,
  ChevronDown,
  LayoutGrid,
} from "lucide-react";
import CategoriesMegaMenu from "./CategoriesMegaMenu";

export default function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-line shadow-sm">
      {/* Single row — Logo · Search bar · Actions */}
      <div className="container flex h-20 items-center gap-4 lg:gap-6">
        {/* Logo */}
        <a href="/" className="flex items-center shrink-0">
          <img
            src="/brand/logo.png"
            alt="Al-Futtaim FAMCO Used Equipment"
            className="h-10 sm:h-12 w-auto"
          />
        </a>

        {/* Search bar with category mega-menu trigger */}
        <div className="flex-1 relative hidden md:block">
          <div className="flex items-stretch h-12 rounded-lg border border-line bg-white shadow-sm overflow-hidden focus-within:ring-2 focus-within:ring-secondary focus-within:border-secondary">
            <button
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
                placeholder="Search by make, model, or keyword — e.g. Volvo FH 6×4"
                className="w-full ml-3 bg-transparent text-[14px] text-ink placeholder:text-muted outline-none"
              />
            </div>

            <button className="bg-secondary hover:bg-secondary-700 text-white px-5 lg:px-7 font-semibold flex items-center gap-2 transition-colors">
              <Search className="h-4 w-4" />
              <span className="hidden lg:inline">Search</span>
            </button>
          </div>

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
            <span className="absolute top-1 right-1 h-4 min-w-4 px-1 rounded-full bg-secondary text-white text-[10px] flex items-center justify-center">
              3
            </span>
          </button>
          <button className="hidden sm:inline-flex h-10 w-10 items-center justify-center rounded-md hover:bg-bgalt">
            <User className="h-5 w-5 text-ink" />
          </button>
          <a
            href="#"
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
                href="#"
                className="flex items-center gap-3 px-3 py-3.5 rounded-md hover:bg-secondary font-medium"
              >
                <Heart className="h-5 w-5" /> Favorites (3)
              </a>
              <a
                href="#"
                className="flex items-center gap-3 px-3 py-3.5 rounded-md hover:bg-secondary font-medium"
              >
                <User className="h-5 w-5" /> Sign in
              </a>
            </nav>
            <div className="p-5 border-t border-white/15 space-y-3">
              <a href="#" className="btn btn-primary w-full">
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
