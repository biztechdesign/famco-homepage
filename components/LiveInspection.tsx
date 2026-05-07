import { ArrowRight, Video } from "lucide-react";
import { asset, link } from "@/lib/asset";

export default function LiveInspection() {
  return (
    <section className="bg-white">
      <div className="container py-6 lg:py-8">
        <div className="relative rounded-2xl overflow-hidden bg-charcoal min-h-[312px] lg:min-h-[500px]">
          {/* Single full-bleed DVI photograph spans the whole banner */}
          <img
            src={asset("/placeholders/DVI-video-inspection.webp")}
            alt="FAMCO digital video inspection — buyer reviewing a truck on a live mobile call"
            className="absolute inset-0 h-full w-full object-cover"
          />
          {/* Same charcoal sweep used on Hero / SplitFlag / FeatureBlocks
              — solid on the left so the heading + CTA read clearly,
              transparent on the right so the photo carries the scene. */}
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal-900 via-charcoal-800/70 to-transparent" />

          {/* Foreground content sits on top of the gradient */}
          <div className="relative grid lg:grid-cols-2">
            <div className="relative text-white p-7 lg:p-10 flex flex-col justify-between lg:justify-center min-h-[312px] lg:min-h-[500px]">
              <h2 className="font-display font-bold uppercase tracking-tight leading-[0.95] text-2xl sm:text-3xl lg:text-4xl mb-0 lg:mb-6 whitespace-nowrap">
                Live video{" "}
                <span className="text-secondary-300">inspection.</span>
              </h2>

              <a
                href={link("/stock/volvo-fh-460-tractor")}
                className="group/cta inline-flex items-center gap-2 btn btn-primary h-12 px-6 text-[14px] rounded-lg w-fit shadow-lift"
              >
                <Video className="h-4 w-4" />
                Schedule a call
                <ArrowRight className="h-4 w-4 group-hover/cta:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>

          {/* Floating "Live now" chip — bottom-right of the banner */}
          <div className="absolute bottom-5 right-5 hidden md:flex items-center gap-2 bg-white/95 backdrop-blur rounded-full pl-2 pr-3 py-1.5 shadow-lift z-20">
            <span className="relative inline-flex h-2 w-2">
              <span className="absolute inset-0 rounded-full bg-red-500 animate-ping opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
            </span>
            <span className="text-[11px] font-bold uppercase tracking-wider text-ink">
              Live now
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

