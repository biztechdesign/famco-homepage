import { Video } from "lucide-react";

/**
 * Compact live video inspection booking card — matches the reference layout
 * but tuned to the FAMCO secondary-blue palette instead of yellow.
 */
export default function PdpLiveInspection() {
  return (
    <div className="bg-white rounded-xl border border-line shadow-card overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 px-5 py-3.5 border-b border-line bg-bgalt/60">
        <div className="flex items-center gap-3 min-w-0">
          <span className="inline-flex h-9 w-9 rounded-md bg-secondary/10 items-center justify-center shrink-0">
            <i
              aria-hidden
              className="fi fi-rr-video-camera text-secondary text-[18px] leading-none"
            />
          </span>
          <div className="min-w-0">
            <h3 className="font-display text-[14px] font-bold text-ink leading-tight">
              Live Video Inspection
            </h3>
            <p className="text-[11.5px] text-muted truncate">
              See the equipment live before you commit
            </p>
          </div>
        </div>

        <span className="inline-flex items-center gap-1.5 text-[10.5px] font-bold uppercase tracking-wider text-secondary shrink-0">
          <span className="relative inline-flex h-2 w-2">
            <span className="absolute inset-0 rounded-full bg-secondary animate-ping opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-secondary" />
          </span>
          Live available
        </span>
      </div>

      {/* Body */}
      <div className="p-5">
        <p className="text-[12.5px] text-ink/85 leading-relaxed mb-4">
          Schedule a live walkthrough with a FAMCO specialist from our Dubai
          facility. Ask questions in real time before you commit.
        </p>

        {/* Slot cards */}
        <div className="grid grid-cols-2 gap-2.5 mb-4">
          <Slot eyebrow="Today" window="2:00 – 6:00 PM" slots={3} />
          <Slot eyebrow="Tomorrow" window="9 AM – 6 PM" slots={7} />
        </div>

        {/* CTA */}
        <a
          href="#"
          className="
            btn btn-primary
            w-full h-11 px-4 text-[13px] rounded-md
          "
        >
          <Video className="h-4 w-4" />
          Schedule Live Inspection
        </a>

        {/* Helper */}
        <p className="text-center text-[11px] text-muted mt-2.5">
          Free · No commitment · Mon–Sat, 9 AM – 6 PM GST
        </p>
      </div>
    </div>
  );
}

function Slot({
  eyebrow,
  window,
  slots,
}: {
  eyebrow: string;
  window: string;
  slots: number;
}) {
  return (
    <div className="rounded-md border border-secondary/30 bg-secondary-50 p-3">
      <div className="text-[10px] uppercase tracking-widest font-bold text-secondary mb-1">
        {eyebrow}
      </div>
      <div className="font-display text-[14px] font-bold text-ink leading-tight mb-1">
        {window}
      </div>
      <div className="flex items-center gap-1 text-[11px] font-semibold text-secondary">
        <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
        {slots} slots available
      </div>
    </div>
  );
}
