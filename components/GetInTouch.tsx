import { Phone, MessageCircle, Mail } from "lucide-react";
import { asset, link } from "@/lib/asset";

export default function GetInTouch() {
  return (
    <section className="bg-white">
      <div className="container py-6 lg:py-8">
        <div className="relative rounded-2xl overflow-hidden bg-charcoal min-h-[360px] lg:min-h-[500px]">
          {/* Single full-bleed photo — FAMCO specialists on a call */}
          <img
            src={asset("/hero/call.jpg")}
            alt="FAMCO specialists on a customer call"
            className="absolute inset-0 h-full w-full object-cover"
          />
          {/* Same charcoal sweep used on Hero / SplitFlag / FeatureBlocks
              / LiveInspection — solid on the left so the heading + CTAs
              read clearly, transparent on the right so the photo carries
              the scene. */}
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal-900 via-charcoal-800/70 to-transparent" />

          {/* Foreground content */}
          <div className="relative grid lg:grid-cols-2">
            <div className="relative text-white p-8 lg:p-14 flex flex-col justify-between lg:justify-center min-h-[360px] lg:min-h-[500px]">
              <h2 className="font-display font-bold uppercase tracking-tight leading-[0.95] text-3xl sm:text-4xl lg:text-5xl mb-0 lg:mb-7 whitespace-nowrap">
                Get in <span className="text-secondary-300">touch.</span>
              </h2>

              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="tel:80032626"
                  className="btn btn-primary h-12 px-5 text-[14px] rounded-md inline-flex items-center justify-center gap-2"
                >
                  <Phone className="h-4 w-4" />
                  Call 800 32626
                </a>

                <a
                  href={link("/stock")}
                  className="
                    inline-flex items-center justify-center gap-2
                    h-12 px-5 text-[14px] font-semibold rounded-md
                    border border-white/30 text-white
                    hover:bg-white/10 hover:border-white/60
                    transition-colors
                  "
                >
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp us
                </a>

                <a
                  href="mailto:FAMCO@alfuttaim.ae"
                  className="
                    inline-flex items-center justify-center gap-2
                    h-12 px-5 text-[14px] font-semibold rounded-md
                    border border-white/30 text-white
                    hover:bg-white/10 hover:border-white/60
                    transition-colors
                  "
                >
                  <Mail className="h-4 w-4" />
                  Email us
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
