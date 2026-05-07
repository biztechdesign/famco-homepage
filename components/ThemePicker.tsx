"use client";

import { useEffect, useRef, useState } from "react";
import { Palette, X, RotateCcw } from "lucide-react";

/**
 * Floating bottom-right theme picker.
 *
 * Lets you pick ANY color via:
 *   • OS native color picker (eyedropper on supporting browsers)
 *   • Hex input field
 *   • Brand presets row for one-click swaps
 *
 * From a single picked color we generate the full secondary-50 → 900
 * palette via HSL lightness adjustments, then write the values to the
 * --secondary-* CSS variables on :root. Every Tailwind class that uses
 * `secondary` recolors instantly across the whole site.
 */

const STORAGE_KEY = "famco-theme-secondary";
const DEFAULT_HEX = "#FFD100";

const PRESETS: { hex: string; label: string }[] = [
  { hex: "#FFD100", label: "FAMCO yellow" },
  { hex: "#00A0E0", label: "FAMCO cyan" },
  { hex: "#0D4F8B", label: "Al-Futtaim navy" },
  { hex: "#E2231A", label: "FAMCO red" },
  { hex: "#00B67A", label: "Trustpilot green" },
  { hex: "#7C3AED", label: "Premium violet" },
];

/* ──────────────────────────────────────────────────────────────────
   Color helpers — hex → HSL → hex, and palette generation
   ────────────────────────────────────────────────────────────────── */

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  const full = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
  const num = parseInt(full, 16);
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
}

function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }
  return [h * 360, s * 100, l * 100];
}

function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  h /= 360;
  s /= 100;
  l /= 100;
  if (s === 0) {
    const v = Math.round(l * 255);
    return [v, v, v];
  }
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  const hue2rgb = (t: number) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };
  return [
    Math.round(hue2rgb(h + 1 / 3) * 255),
    Math.round(hue2rgb(h) * 255),
    Math.round(hue2rgb(h - 1 / 3) * 255),
  ];
}

/* WCAG 2.1 contrast — used to pick the best foreground (white vs dark
   ink) for whatever accent color the user lands on, so CTA text stays
   legible whether the bg is yellow, navy, red, etc. */
function srgbToLinear(c: number): number {
  const v = c / 255;
  return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
}

function relativeLuminance([r, g, b]: [number, number, number]): number {
  return (
    0.2126 * srgbToLinear(r) +
    0.7152 * srgbToLinear(g) +
    0.0722 * srgbToLinear(b)
  );
}

function contrastRatio(
  a: [number, number, number],
  b: [number, number, number],
): number {
  const la = relativeLuminance(a);
  const lb = relativeLuminance(b);
  const [hi, lo] = la > lb ? [la, lb] : [lb, la];
  return (hi + 0.05) / (lo + 0.05);
}

/* Foreground options: site dark-ink (#0F172A) and white. Picking
   between just these two is the standard accessibility approach —
   trying to grade arbitrary mid-tones almost always loses contrast. */
const INK_RGB: [number, number, number] = [15, 23, 42];
const WHITE_RGB: [number, number, number] = [255, 255, 255];

function bestForeground(bg: [number, number, number]): {
  rgb: [number, number, number];
  ratio: number;
  isWhite: boolean;
} {
  const ratioWhite = contrastRatio(bg, WHITE_RGB);
  const ratioInk = contrastRatio(bg, INK_RGB);
  return ratioWhite >= ratioInk
    ? { rgb: WHITE_RGB, ratio: ratioWhite, isWhite: true }
    : { rgb: INK_RGB, ratio: ratioInk, isWhite: false };
}

/**
 * Build the 10-shade palette by holding hue + saturation steady and
 * sliding lightness. Targets approximate Tailwind's defaults.
 */
function paletteFromHex(hex: string): Record<number, string> {
  const [r, g, b] = hexToRgb(hex);
  const [h, s] = rgbToHsl(r, g, b);
  const targets: Record<number, number> = {
    50: 95,
    100: 89,
    200: 78,
    300: 67,
    400: 56,
    500: 45,   // base
    600: 38,
    700: 30,
    800: 22,
    900: 14,
  };
  const out: Record<number, string> = {};
  Object.entries(targets).forEach(([step, lightness]) => {
    const [rr, gg, bb] = hslToRgb(h, s, lightness);
    out[Number(step)] = `${rr} ${gg} ${bb}`;
  });
  return out;
}

function applyHex(hex: string) {
  const root = document.documentElement;
  const palette = paletteFromHex(hex);
  Object.entries(palette).forEach(([k, v]) => {
    root.style.setProperty(`--secondary-${k}`, v);
  });
  // Pick the most-readable foreground for the new accent and write it
  // into --secondary-fg. .btn-primary and .bg-secondary.text-ink read
  // this var, so every CTA flips its text color in the same paint.
  const fg = bestForeground(hexToRgb(hex));
  root.style.setProperty(
    "--secondary-fg",
    `${fg.rgb[0]} ${fg.rgb[1]} ${fg.rgb[2]}`,
  );
}

function isValidHex(s: string): boolean {
  return /^#?([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(s.trim());
}

function normalizeHex(s: string): string {
  let h = s.trim();
  if (!h.startsWith("#")) h = "#" + h;
  if (h.length === 4) {
    // expand #abc → #aabbcc
    h = "#" + h[1] + h[1] + h[2] + h[2] + h[3] + h[3];
  }
  return h.toLowerCase();
}

/* ──────────────────────────────────────────────────────────────────
   Component
   ────────────────────────────────────────────────────────────────── */

export default function ThemePicker() {
  const [open, setOpen] = useState(false);
  const [color, setColor] = useState(DEFAULT_HEX);
  const [hexInput, setHexInput] = useState(DEFAULT_HEX);
  const wrapRef = useRef<HTMLDivElement | null>(null);

  // Hydrate on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && isValidHex(saved)) {
      const norm = normalizeHex(saved);
      setColor(norm);
      setHexInput(norm);
      applyHex(norm);
    }
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

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const choose = (hex: string) => {
    const norm = normalizeHex(hex);
    setColor(norm);
    setHexInput(norm);
    applyHex(norm);
    localStorage.setItem(STORAGE_KEY, norm);
  };

  const onHexChange = (raw: string) => {
    setHexInput(raw);
    if (isValidHex(raw)) choose(raw);
  };

  const reset = () => {
    choose(DEFAULT_HEX);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <div ref={wrapRef} className="fixed bottom-5 right-5 z-[90] print:hidden">
      {/* Launcher */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          aria-label="Open color picker"
          title="Pick a site accent color"
          className="
            h-12 w-12 rounded-full
            shadow-lift border-2 border-white
            flex items-center justify-center
            transition-transform hover:scale-105
          "
          style={{ backgroundColor: color }}
        >
          <Palette className="h-5 w-5 text-white drop-shadow" />
        </button>
      )}

      {/* Panel */}
      {open && (
        <div className="bg-white rounded-xl border border-line shadow-lift w-[300px] overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between gap-2 px-4 py-3 border-b border-line bg-bgalt/60">
            <div className="flex items-center gap-2">
              <Palette className="h-4 w-4" style={{ color }} />
              <span className="text-[13px] font-bold text-ink">
                Site accent color
              </span>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="h-7 w-7 rounded-md hover:bg-white flex items-center justify-center"
            >
              <X className="h-3.5 w-3.5 text-ink" />
            </button>
          </div>

          {/* Picker body */}
          <div className="p-4 space-y-4">
            {/* Native color picker + hex input */}
            <div className="flex items-center gap-2">
              <label
                className="
                  relative h-11 w-12 rounded-md border border-line shrink-0
                  overflow-hidden cursor-pointer
                "
                style={{ backgroundColor: color }}
                title="Open color wheel"
              >
                <input
                  type="color"
                  value={color}
                  onChange={(e) => choose(e.target.value)}
                  className="absolute inset-0 h-full w-full opacity-0 cursor-pointer"
                />
              </label>
              <div className="flex-1">
                <label className="block text-[10.5px] uppercase tracking-widest font-bold text-muted mb-1">
                  Hex
                </label>
                <input
                  type="text"
                  value={hexInput}
                  onChange={(e) => onHexChange(e.target.value)}
                  spellCheck={false}
                  className={`
                    w-full h-9 px-2.5 rounded-md
                    border bg-white
                    text-[13px] font-mono uppercase tracking-wide text-ink
                    outline-none transition-colors
                    ${
                      isValidHex(hexInput)
                        ? "border-line focus:border-secondary"
                        : "border-red-400 focus:border-red-500"
                    }
                  `}
                  placeholder="#FFD100"
                />
              </div>
            </div>

            {/* CTA contrast preview — shows the foreground color the
                picker auto-selected (white vs dark ink) for the chosen
                accent, plus the WCAG contrast ratio it scored. */}
            {(() => {
              const fg = bestForeground(hexToRgb(color));
              const ratio = fg.ratio;
              const grade =
                ratio >= 7
                  ? "AAA"
                  : ratio >= 4.5
                    ? "AA"
                    : ratio >= 3
                      ? "AA Large"
                      : "Fail";
              const gradeColor =
                ratio >= 4.5
                  ? "text-emerald-600"
                  : ratio >= 3
                    ? "text-amber-600"
                    : "text-red-600";
              return (
                <div>
                  <label className="block text-[10.5px] uppercase tracking-widest font-bold text-muted mb-1.5">
                    CTA preview
                  </label>
                  <div
                    className="flex items-center justify-between gap-3 h-12 rounded-md border border-line px-3"
                    style={{
                      backgroundColor: color,
                      color: fg.isWhite ? "#FFFFFF" : "#0F172A",
                    }}
                  >
                    <span className="text-[15px] font-bold tracking-tight">
                      Aa — Get a quote
                    </span>
                    <span className="text-[10.5px] font-mono opacity-90">
                      {fg.isWhite ? "WHITE" : "INK"}
                    </span>
                  </div>
                  <p className="mt-1 text-[10.5px] text-muted">
                    Contrast{" "}
                    <span className="font-mono font-semibold text-ink">
                      {ratio.toFixed(2)}:1
                    </span>{" "}
                    <span className={`font-bold ${gradeColor}`}>· {grade}</span>
                  </p>
                </div>
              );
            })()}

            {/* Preview row — 5 generated shades */}
            <div>
              <label className="block text-[10.5px] uppercase tracking-widest font-bold text-muted mb-1.5">
                Generated palette
              </label>
              <div className="flex h-7 rounded-md overflow-hidden border border-line">
                {[100, 300, 500, 700, 900].map((step) => {
                  const palette = paletteFromHex(color);
                  const [r, g, b] = palette[step].split(" ").map(Number);
                  return (
                    <div
                      key={step}
                      className="flex-1"
                      style={{ backgroundColor: `rgb(${r}, ${g}, ${b})` }}
                      title={`secondary-${step}`}
                    />
                  );
                })}
              </div>
            </div>

            {/* Brand presets */}
            <div>
              <label className="block text-[10.5px] uppercase tracking-widest font-bold text-muted mb-1.5">
                Quick presets
              </label>
              <div className="flex items-center gap-2 flex-wrap">
                {PRESETS.map((p) => {
                  const active = normalizeHex(color) === normalizeHex(p.hex);
                  return (
                    <button
                      key={p.hex}
                      onClick={() => choose(p.hex)}
                      title={`${p.label} · ${p.hex}`}
                      aria-label={`Use ${p.label}`}
                      className={`
                        h-7 w-7 rounded-full border-2 border-white shadow-card
                        transition-transform
                        ${active ? "ring-2 ring-offset-1 ring-charcoal scale-110" : "hover:scale-110"}
                      `}
                      style={{ backgroundColor: p.hex }}
                    />
                  );
                })}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-4 py-3 border-t border-line bg-bgalt/40 flex items-center justify-between gap-2">
            <button
              onClick={reset}
              className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-muted hover:text-ink"
            >
              <RotateCcw className="h-3 w-3" />
              Reset
            </button>
            <p className="text-[10.5px] text-muted text-right leading-tight">
              Recolors the whole site.<br />Saved in this browser.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
