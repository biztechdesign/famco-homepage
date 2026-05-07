import { Video, ArrowRight } from "lucide-react";

/**
 * Stand-alone live-inspection CTA. The FREE / no-commitment messaging
 * is baked into the button itself (two-line layout) instead of sitting
 * in a wrapper card, so it visually pairs with the rounded-xl PDP
 * sidebar cards above it.
 */
export default function PdpLiveInspection() {
  return (
    <a
      href="#"
      className="
        group relative flex items-center gap-3
        w-full h-14 px-4 rounded-xl
        bg-secondary hover:bg-secondary-600 text-ink
        shadow-card transition-colors
      "
    >
      <span className="inline-flex h-9 w-9 rounded-lg bg-ink/10 items-center justify-center shrink-0">
        <Video className="h-4 w-4" />
      </span>

      <span className="flex-1 text-left leading-tight min-w-0">
        <span className="block text-[14px] font-bold">
          Schedule Live Inspection
        </span>
        <span className="block text-[11px] font-bold uppercase tracking-wider opacity-80 mt-0.5">
          Free · No commitment
        </span>
      </span>

      <ArrowRight className="h-4 w-4 shrink-0 group-hover:translate-x-1 transition-transform" />
    </a>
  );
}
