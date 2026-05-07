"use client";

import { useState } from "react";
import { Truck, ChevronDown } from "lucide-react";

const DELIVERY_OPTIONS = [
  { code: "ae", label: "United Arab Emirates" },
  { code: "sa", label: "Saudi Arabia" },
  { code: "om", label: "Oman" },
  { code: "qa", label: "Qatar" },
  { code: "bh", label: "Bahrain" },
  { code: "kw", label: "Kuwait" },
];

// Stub estimate table so the readout updates instantly when the user
// picks a destination — no separate "Check" CTA needed.
const PRICES: Record<string, number> = {
  ae: 0,
  sa: 4200,
  om: 2400,
  qa: 3800,
  bh: 4600,
  kw: 5200,
};

export default function PdpTransportCosts({
  vehicleLocation = "Dubai, UAE",
  vehicleCountryFlag = "ae",
  currency = "AED",
}: {
  vehicleLocation?: string;
  vehicleCountryFlag?: string;
  currency?: string;
}) {
  const [destination, setDestination] = useState<string>("");
  const [open, setOpen] = useState(false);

  const selected = DELIVERY_OPTIONS.find((o) => o.code === destination);
  const priceLabel = destination
    ? `${currency} ${PRICES[destination]?.toLocaleString() ?? "—"}`
    : `${currency} ····`;

  return (
    <div className="bg-white rounded-xl border border-line shadow-card p-4">
      <header className="flex items-center gap-1.5 mb-3">
        <Truck className="h-4 w-4 text-secondary" />
        <h2 className="font-display text-[14px] font-bold text-ink">
          Transport costs
        </h2>
      </header>

      {/* Single inline row: location → destination → check button → price */}
      <div className="flex items-center gap-2 text-[12.5px] flex-wrap">
        {/* Vehicle location */}
        <span className="flex items-center gap-1.5 shrink-0">
          <span
            aria-hidden
            className={`fi fi-${vehicleCountryFlag} rounded-sm shadow-[0_0_0_0.5px_rgba(0,0,0,0.08)] shrink-0`}
            style={{ width: "1.25em", height: "0.95em" }}
          />
          <span className="font-semibold text-ink">{vehicleLocation}</span>
        </span>

        <span aria-hidden className="text-muted">→</span>

        {/* Destination dropdown */}
        <div className="relative min-w-[150px]">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-haspopup="listbox"
            aria-expanded={open}
            className="
              w-full flex items-center justify-between gap-1.5
              h-9 px-2.5 rounded-md border border-line bg-bgalt/50
              hover:border-charcoal transition-colors
            "
          >
            <span className="flex items-center gap-1.5 min-w-0">
              {selected ? (
                <>
                  <span
                    aria-hidden
                    className={`fi fi-${selected.code} rounded-sm shadow-[0_0_0_0.5px_rgba(0,0,0,0.08)] shrink-0`}
                    style={{ width: "1.25em", height: "0.95em" }}
                  />
                  <span className="font-semibold text-ink truncate">
                    {selected.label}
                  </span>
                </>
              ) : (
                <span className="text-muted">Deliver to · TBD</span>
              )}
            </span>
            <ChevronDown
              className={`h-3.5 w-3.5 text-muted shrink-0 transition-transform ${
                open ? "rotate-180" : ""
              }`}
            />
          </button>

          {open && (
            <>
              <button
                aria-hidden
                tabIndex={-1}
                className="fixed inset-0 z-10"
                onClick={() => setOpen(false)}
              />
              <ul
                role="listbox"
                className="absolute left-0 right-0 top-full mt-1 z-20 bg-white rounded-md border border-line shadow-lift py-1 max-h-56 overflow-y-auto"
              >
                {DELIVERY_OPTIONS.map((o) => {
                  const active = o.code === destination;
                  return (
                    <li key={o.code}>
                      <button
                        type="button"
                        role="option"
                        aria-selected={active}
                        onClick={() => {
                          setDestination(o.code);
                          setOpen(false);
                        }}
                        className={`w-full flex items-center gap-2 px-2.5 py-1.5 text-left text-[12.5px] hover:bg-bgalt ${
                          active ? "bg-bgalt text-secondary font-semibold" : "text-ink"
                        }`}
                      >
                        <span
                          aria-hidden
                          className={`fi fi-${o.code} rounded-sm shadow-[0_0_0_0.5px_rgba(0,0,0,0.08)] shrink-0`}
                          style={{ width: "1.25em", height: "0.95em" }}
                        />
                        {o.label}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </>
          )}
        </div>

        {/* Price readout — sits right next to the dropdown, no gap */}
        <span className="font-display text-[14px] font-bold text-ink tabular-nums whitespace-nowrap">
          {priceLabel}
        </span>
      </div>

      <p className="mt-2 text-[10.5px] text-muted">
        Estimates only — final price may vary.
      </p>
    </div>
  );
}
