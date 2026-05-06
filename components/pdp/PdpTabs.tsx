"use client";

import { useState } from "react";

export type SpecRow = { label: string; value: string; emphasis?: boolean };
export type SpecGroup = { title: string; rows: SpecRow[] };

const TABS = ["Description", "Specifications"] as const;
type TabId = (typeof TABS)[number];

export default function PdpTabs({
  specGroups,
  description,
}: {
  specGroups: SpecGroup[];
  description: React.ReactNode;
}) {
  const [tab, setTab] = useState<TabId>("Description");

  return (
    <div className="bg-white rounded-xl border border-line shadow-card overflow-hidden">
      {/* Tab strip */}
      <div className="border-b border-line bg-bgalt/60 px-3 sm:px-5 pt-2">
        <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide">
          {TABS.map((id) => {
            const active = tab === id;
            return (
              <button
                key={id}
                onClick={() => setTab(id)}
                className={`
                  px-3 sm:px-4 py-2.5
                  text-[13px] font-semibold whitespace-nowrap
                  border-b-2 -mb-px
                  transition-colors
                  ${
                    active
                      ? "text-ink border-secondary"
                      : "text-muted border-transparent hover:text-ink"
                  }
                `}
              >
                {id}
              </button>
            );
          })}
        </div>
      </div>

      <div className="p-5 lg:p-7">
        {tab === "Specifications" && <SpecsView groups={specGroups} />}
        {tab === "Description" && (
          <div className="prose-sm max-w-none text-[14px] text-ink/85 leading-relaxed space-y-3">
            {description}
          </div>
        )}
      </div>
    </div>
  );
}

function SpecsView({ groups }: { groups: SpecGroup[] }) {
  return (
    <div className="grid sm:grid-cols-2 gap-x-10 gap-y-8">
      {groups.map((g) => (
        <div key={g.title}>
          <h4 className="text-[11px] uppercase tracking-widest font-bold text-muted pb-3 border-b border-line">
            {g.title}
          </h4>
          <dl className="divide-y divide-line">
            {g.rows.map((r) => (
              <div
                key={r.label}
                className="flex items-baseline justify-between gap-3 py-3 text-[13.5px]"
              >
                <dt className="text-muted">{r.label}</dt>
                <dd
                  className={
                    r.emphasis
                      ? "font-bold text-secondary tabular-nums"
                      : "font-semibold text-ink tabular-nums"
                  }
                >
                  {r.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      ))}
    </div>
  );
}

