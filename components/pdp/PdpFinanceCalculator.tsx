"use client";

import { useMemo, useState } from "react";

const TERMS = [12, 24, 36, 48] as const;

const fmt = (n: number) =>
  new Intl.NumberFormat("en-AE", { maximumFractionDigits: 0 }).format(n);

/**
 * Finance calculator — sliders + term pills on the left, estimated summary
 * card on the right. Uses standard amortising loan formula:
 *   M = P * r / (1 - (1 + r)^-n)
 *
 * The Apply for Finance CTA uses the brand `btn-primary` (driven by the
 * site-wide --secondary CSS variable, which the floating ThemePicker
 * rewrites at runtime).
 */
export default function PdpFinanceCalculator({
  defaultPrice = 285000,
  rate = 4.5,
  currency = "AED",
}: {
  defaultPrice?: number;
  rate?: number;
  currency?: string;
}) {
  const [price, setPrice] = useState(defaultPrice);
  const [downPct, setDownPct] = useState(25);
  const [term, setTerm] = useState<(typeof TERMS)[number]>(36);

  const downAmount = Math.round((price * downPct) / 100);
  const loanAmount = price - downAmount;

  const monthly = useMemo(() => {
    const r = rate / 100 / 12;
    const n = term;
    if (loanAmount <= 0) return 0;
    if (r === 0) return loanAmount / n;
    return (loanAmount * r) / (1 - Math.pow(1 + r, -n));
  }, [loanAmount, rate, term]);

  return (
    <div>
      {/* Heading */}
      <div className="mb-5">
        <h3 className="font-display text-xl font-bold text-ink leading-tight">
          Finance Calculator
        </h3>
        <p className="text-[13px] text-muted mt-1">
          Estimate your monthly payments and plan your budget.
        </p>
      </div>

      <div className="grid lg:grid-cols-[1fr_380px] gap-5">
        {/* LEFT — controls */}
        <div className="rounded-lg border border-line bg-bgalt/40 p-5 lg:p-6 space-y-6">
          {/* Equipment price */}
          <div>
            <div className="flex items-baseline justify-between gap-2 mb-2">
              <label className="text-[13px] font-bold text-ink">
                Equipment Price ({currency})
              </label>
              <span className="font-display text-lg font-bold text-ink tabular-nums">
                {currency} {fmt(price)}
              </span>
            </div>
            <input
              type="range"
              min={50000}
              max={1000000}
              step={5000}
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="w-full accent-charcoal"
            />
            <div className="flex justify-between text-[11px] text-muted mt-1">
              <span>{currency} 50K</span>
              <span>{currency} 1M+</span>
            </div>
          </div>

          {/* Down payment */}
          <div>
            <div className="flex items-baseline justify-between gap-2 mb-2">
              <label className="text-[13px] font-bold text-ink">
                Down Payment (%)
              </label>
              <span className="text-[13px] font-semibold text-ink">
                <span className="font-display text-lg font-bold tabular-nums">
                  {downPct}
                </span>{" "}
                <span className="text-muted">% ·</span>{" "}
                <span className="text-muted tabular-nums">
                  {currency} {fmt(downAmount)}
                </span>
              </span>
            </div>
            <input
              type="range"
              min={10}
              max={50}
              step={1}
              value={downPct}
              onChange={(e) => setDownPct(Number(e.target.value))}
              className="w-full accent-charcoal"
            />
            <div className="flex justify-between text-[11px] text-muted mt-1">
              <span>10%</span>
              <span>50%</span>
            </div>
          </div>

          {/* Finance term */}
          <div>
            <label className="block text-[13px] font-bold text-ink mb-2.5">
              Finance Term (Months)
            </label>
            <div className="grid grid-cols-4 gap-2">
              {TERMS.map((t) => {
                const active = t === term;
                return (
                  <button
                    key={t}
                    onClick={() => setTerm(t)}
                    type="button"
                    className={`
                      h-12 rounded-md text-[14px] font-bold transition-colors
                      ${
                        active
                          ? "bg-charcoal text-white border border-charcoal"
                          : "bg-white text-ink border border-line hover:border-charcoal"
                      }
                    `}
                  >
                    {t}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* RIGHT — summary */}
        <div className="rounded-lg border border-line bg-bgalt/40 overflow-hidden">
          <div className="px-5 pt-5">
            <div className="text-[11px] uppercase tracking-widest font-bold text-muted mb-4">
              Estimated Summary
            </div>

            <div className="space-y-3 text-[13.5px]">
              <Row label="Loan Amount" value={`${currency} ${fmt(loanAmount)}`} />
              <Row
                label="Interest Rate"
                value={
                  <span className="inline-flex items-center gap-1.5">
                    {rate.toFixed(1)}% p.a.
                    <span className="text-[10px] uppercase tracking-widest font-bold text-muted bg-white border border-line rounded px-1.5 py-0.5">
                      Est
                    </span>
                  </span>
                }
              />
              <Row label="Total Term" value={`${term} Months`} />
            </div>
          </div>

          {/* Estimated monthly payment block */}
          <div className="mt-4 mx-5 rounded-md bg-charcoal text-white px-5 py-5 text-center">
            <div className="text-[11px] uppercase tracking-widest font-bold text-white/70 mb-1.5">
              Estimated Monthly Payment
            </div>
            <div className="font-display text-[34px] lg:text-[36px] font-bold text-secondary-300 leading-none tabular-nums">
              {currency} {fmt(monthly)}
            </div>
          </div>

          {/* CTA — uses brand secondary via .btn-primary, controlled by the
              site-wide ThemePicker in the bottom-right corner */}
          <div className="px-5 pb-5 pt-4">
            <a
              href="#"
              className="
                btn btn-primary w-full h-12 rounded-md text-[14px]
                inline-flex items-center justify-center
              "
            >
              Apply for Finance
            </a>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <p className="mt-4 text-[11.5px] text-muted leading-relaxed">
        Estimates are indicative only and subject to credit approval by
        Al-Futtaim Finance. Final rate and monthly payment depend on your
        application, vehicle and term selected. Includes processing &amp;
        documentation fees where applicable.
      </p>
    </div>
  );
}

function Row({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-3 py-2 border-b border-line last:border-0">
      <span className="text-muted">{label}</span>
      <span className="font-semibold text-ink text-right tabular-nums">
        {value}
      </span>
    </div>
  );
}
