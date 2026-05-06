"use client";

import {
  Heart,
  Share2,
  ShieldCheck,
  Send,
  Calendar,
  Gauge,
  MapPin,
  FileDown,
} from "lucide-react";
import { useState } from "react";

const fmt = (n: number) => new Intl.NumberFormat("en-AE").format(n);

type SidebarSpec = {
  iconKey?: "calendar" | "gauge" | "map";
  label: string;
  value: string;
};

const ICONS = {
  calendar: Calendar,
  gauge: Gauge,
  map: MapPin,
} as const;

export default function PdpSidebar({
  refId,
  category,
  title,
  approved = true,
  grade = "A — Excellent",
  price,
  currency = "AED",
  vatNote = "VAT Excl.",
  usdEquivalent,
  monthlyFinance,
  warrantyText = "3-Month FAMCO Drivetrain Warranty included",
  specs,
  buyHref = "#",
  inspectionReportHref = "#",
}: {
  refId: string;
  category: string;
  title: string;
  approved?: boolean;
  grade?: string;
  price: number;
  currency?: string;
  vatNote?: string;
  usdEquivalent?: number;
  monthlyFinance?: number;
  warrantyText?: string;
  specs: SidebarSpec[];
  buyHref?: string;
  inspectionReportHref?: string;
}) {
  const [saved, setSaved] = useState(false);

  return (
    <aside className="space-y-3">
      {/* Main info card */}
      <div className="bg-white rounded-xl border border-line shadow-card p-5">
        {/* Top row — ref + breadcrumb + actions */}
        <div className="flex items-start justify-between gap-3">
          <div className="text-[12px] text-muted leading-snug">
            <span className="text-muted">Ref: </span>
            <span className="text-ink font-semibold tabular-nums">{refId}</span>
            <span className="mx-1.5 text-line">·</span>
            <span>{category}</span>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={() => setSaved(!saved)}
              aria-label={saved ? "Remove from favorites" : "Save to favorites"}
              className="h-8 w-8 rounded-md border border-line bg-white hover:bg-bgalt flex items-center justify-center transition-colors"
            >
              <Heart
                className={`h-4 w-4 ${
                  saved ? "fill-secondary text-secondary" : "text-ink"
                }`}
              />
            </button>
            <button
              aria-label="Share"
              className="h-8 w-8 rounded-md border border-line bg-white hover:bg-bgalt flex items-center justify-center transition-colors"
            >
              <Share2 className="h-4 w-4 text-ink" />
            </button>
          </div>
        </div>

        {/* Title */}
        <h1 className="font-display text-[19px] sm:text-[21px] font-bold text-ink leading-tight mt-3">
          {title}
        </h1>

        {/* Approval pills */}
        <div className="mt-3 flex flex-wrap items-center gap-2">
          {approved && (
            <span className="inline-flex items-center gap-1.5 bg-secondary/10 text-secondary text-[12px] font-bold px-2.5 py-1 rounded">
              <ShieldCheck className="h-3.5 w-3.5" /> FAMCO Approved
            </span>
          )}
          {grade && (
            <span className="inline-flex items-center bg-bgalt border border-line text-ink text-[12px] font-semibold px-2.5 py-1 rounded">
              Grade {grade}
            </span>
          )}
        </div>

        {/* Price block */}
        <div className="mt-4 pt-4 border-t border-line">
          <div className="flex items-baseline gap-2 flex-wrap">
            <span className="font-display text-[28px] lg:text-[30px] font-bold text-ink leading-none tabular-nums">
              {currency} {fmt(price)}
            </span>
            <span className="text-[13px] text-muted">/ {vatNote}</span>
          </div>
          <div className="mt-1 text-[12.5px] text-muted">
            {usdEquivalent && (
              <>
                ~USD {fmt(usdEquivalent)}
                <span className="mx-1.5 text-line">·</span>
              </>
            )}
            {monthlyFinance && (
              <>
                Finance from {currency} {fmt(monthlyFinance)}/mo
              </>
            )}
          </div>
        </div>

        {/* Compact key spec list — replaces the 2×2 card grid */}
        <ul className="mt-4 divide-y divide-line border-y border-line">
          {specs.map((s) => {
            const Icon = s.iconKey ? ICONS[s.iconKey] : null;
            return (
              <li
                key={s.label}
                className="flex items-center justify-between gap-3 py-2.5 text-[13px]"
              >
                <span className="inline-flex items-center gap-2 text-muted">
                  {Icon && <Icon className="h-4 w-4 text-secondary" />}
                  {s.label}
                </span>
                <span className="font-semibold text-ink tabular-nums">
                  {s.value}
                </span>
              </li>
            );
          })}
        </ul>

        {/* Single primary CTA */}
        <a
          href={buyHref}
          className="
            mt-5 inline-flex items-center justify-center gap-2
            w-full h-12 rounded-md
            bg-[#FFC619] hover:bg-[#FFB800] text-ink
            font-bold text-[14px]
            transition-colors
            shadow-[0_2px_0_rgba(0,0,0,0.05)]
          "
        >
          <Send className="h-4 w-4" />
          Buy Now
        </a>

        {/* Warranty line */}
        {warrantyText && (
          <div className="mt-4 pt-4 border-t border-line inline-flex items-center gap-1.5 text-[12.5px] text-secondary">
            <ShieldCheck className="h-4 w-4" />
            {warrantyText}
          </div>
        )}
      </div>

      {/* Inspection report download card */}
      <a
        href={inspectionReportHref}
        className="
          flex items-center justify-center gap-2
          bg-white rounded-xl border border-line shadow-card
          py-4 px-5 text-[13.5px] font-semibold text-ink
          hover:border-secondary hover:text-secondary
          transition-colors
        "
      >
        <FileDown className="h-4 w-4" />
        Download Inspection Report
      </a>
    </aside>
  );
}

