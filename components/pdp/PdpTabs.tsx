"use client";

import { useState } from "react";
import { Sparkles, ChevronDown } from "lucide-react";

export type SpecRow = {
  label: string;
  value: React.ReactNode;
  emphasis?: boolean;
};
export type SpecGroup = { title: string; rows: SpecRow[] };

const COLLAPSED_GROUP_COUNT = 1;

export default function PdpTabs({
  specGroups,
  status = "Brand NEW",
}: {
  specGroups: SpecGroup[];
  status?: string;
}) {
  const [expanded, setExpanded] = useState(false);
  const hasMore = specGroups.length > COLLAPSED_GROUP_COUNT;
  const visible = expanded
    ? specGroups
    : specGroups.slice(0, COLLAPSED_GROUP_COUNT);

  return (
    <div className="bg-white rounded-xl border border-line shadow-card p-5 lg:p-7">
      <header className="flex items-center justify-between gap-3 mb-6">
        <h2 className="font-display text-[20px] lg:text-[22px] font-bold text-ink">
          About this <span className="text-secondary-300">vehicle</span>
        </h2>
        {status && (
          <span className="inline-flex items-center gap-1.5 bg-emerald-600 text-white text-[11.5px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-md">
            <Sparkles className="h-3.5 w-3.5" />
            {status}
          </span>
        )}
      </header>

      <div className="space-y-7">
        {visible.map((g) => (
          <section key={g.title}>
            <h3 className="font-display text-[15px] font-bold text-ink mb-2">
              {g.title}
            </h3>
            <dl className="grid sm:grid-cols-2 gap-x-10">
              {g.rows.map((r) => (
                <div
                  key={r.label}
                  className="flex items-baseline justify-between gap-3 py-2.5 border-b border-line text-[13.5px]"
                >
                  <dt className="text-muted">{r.label}</dt>
                  <dd
                    className={
                      r.emphasis
                        ? "font-bold text-secondary tabular-nums text-right"
                        : "font-semibold text-ink tabular-nums text-right"
                    }
                  >
                    {r.value}
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        ))}
      </div>

      {hasMore && (
        <div className="mt-6 pt-5 border-t border-line flex justify-center">
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}
            className="
              inline-flex items-center gap-2
              h-10 px-5 rounded-md
              border border-line bg-white text-ink
              text-[13px] font-semibold
              hover:border-charcoal hover:bg-bgalt
              transition-colors
            "
          >
            {expanded
              ? "Show less specifications"
              : "Show all specifications"}
            <ChevronDown
              className={`h-4 w-4 transition-transform ${
                expanded ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>
      )}
    </div>
  );
}

/** Convenience renderer for boolean-style ticks (e.g. EBS, ABS). */
export function Tick() {
  return (
    <svg
      viewBox="0 0 16 16"
      className="inline-block h-4 w-4 text-emerald-600"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      aria-label="Yes"
    >
      <path d="M3 8 L7 12 L13 4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
