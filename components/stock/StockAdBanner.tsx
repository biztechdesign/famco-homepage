import { ArrowRight, Tag } from "lucide-react";

/**
 * 50px slim promotional strip — sits above the page title in the result column.
 * Fully clickable, secondary-blue background, white text.
 */
export default function StockAdBanner({
  eyebrow = "Eid Al Adha",
  message = "Save up to AED 25,000 on selected Volvo FH tractors",
  cta = "View deals",
  href = "#",
}: {
  eyebrow?: string;
  message?: string;
  cta?: string;
  href?: string;
}) {
  return (
    <a
      href={href}
      className="
        group flex items-center justify-between gap-3
        h-[50px] px-4 sm:px-5
        bg-gradient-to-r from-secondary-700 via-secondary to-secondary-600
        text-white rounded-lg overflow-hidden
        hover:shadow-card transition-shadow
      "
    >
      <div className="flex items-center gap-3 min-w-0">
        <span className="hidden sm:inline-flex h-7 w-7 rounded-md bg-white/15 items-center justify-center shrink-0">
          <Tag className="h-3.5 w-3.5" />
        </span>
        <span className="text-[10.5px] uppercase tracking-widest font-bold bg-white/20 px-2 py-0.5 rounded shrink-0 hidden sm:inline-block">
          {eyebrow}
        </span>
        <span className="text-[13px] sm:text-[14px] font-semibold truncate">
          {message}
        </span>
      </div>
      <span className="inline-flex items-center gap-1.5 text-[12.5px] font-semibold whitespace-nowrap shrink-0 group-hover:gap-2.5 transition-all">
        {cta}
        <ArrowRight className="h-4 w-4" />
      </span>
    </a>
  );
}
