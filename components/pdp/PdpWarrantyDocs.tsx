import { FileText, ClipboardList, Lock, ArrowRight } from "lucide-react";

type DocItem = {
  label: string;
  cta: string;
  icon: "pdf" | "history" | "lock";
  href: string;
  ctaTone?: "secondary";
};

const DOCS: DocItem[] = [
  {
    label: "Famco Approved Report",
    cta: "Download PDF",
    icon: "pdf",
    href: "#",
  },
  {
    label: "Full Service History Record",
    cta: "Request",
    icon: "history",
    href: "#",
  },
  {
    label: "Warranty Terms & Conditions",
    cta: "View",
    icon: "lock",
    href: "#",
  },
];

const ICONS = {
  pdf: FileText,
  history: ClipboardList,
  lock: Lock,
} as const;

export default function PdpWarrantyDocs() {
  return (
    <div>
      {/* Top — Warranty + Service Intervals cards */}
      <div className="grid sm:grid-cols-2 gap-4">
        {/* Warranty card */}
        <div className="rounded-lg border border-line bg-white p-5">
          <div className="text-[11px] uppercase tracking-widest font-bold text-muted mb-2">
            FAMCO Warranty
          </div>
          <div className="font-display text-2xl lg:text-[26px] font-bold text-secondary leading-tight">
            3 Months
          </div>
          <p className="mt-2 text-[13px] text-muted">
            Drivetrain &amp; major mechanical components
          </p>
        </div>

        {/* Service intervals card */}
        <div className="rounded-lg border border-line bg-white p-5">
          <div className="text-[11px] uppercase tracking-widest font-bold text-muted mb-2">
            Service Intervals
          </div>
          <div className="font-display text-2xl lg:text-[26px] font-bold text-ink leading-tight">
            Due at 220k km
          </div>
          <p className="mt-2 text-[13px] text-muted">
            Next major service ~10,000 km away
          </p>
        </div>
      </div>

      {/* Available Documents heading */}
      <h4 className="mt-7 mb-3 font-display text-[15px] font-bold text-ink">
        Available Documents
      </h4>

      {/* Document rows */}
      <ul className="space-y-2">
        {DOCS.map((d) => {
          const Icon = ICONS[d.icon];
          return (
            <li key={d.label}>
              <a
                href={d.href}
                className="
                  flex items-center justify-between gap-4
                  rounded-md border border-line bg-bgalt/60 hover:bg-white
                  hover:border-secondary
                  px-4 py-3.5
                  transition-colors group
                "
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="inline-flex h-8 w-8 rounded-md bg-white border border-line items-center justify-center shrink-0">
                    <Icon className="h-4 w-4 text-ink/70 group-hover:text-secondary transition-colors" />
                  </span>
                  <span className="text-[13.5px] font-medium text-ink truncate">
                    {d.label}
                  </span>
                </div>
                <span className="inline-flex items-center gap-1 text-[12.5px] font-bold text-secondary group-hover:gap-2 transition-all whitespace-nowrap">
                  {d.cta}
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
