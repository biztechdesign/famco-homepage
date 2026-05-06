import { Phone, MessageCircle, Mail, ArrowRight } from "lucide-react";

export default function GetInTouch() {
  return (
    <section className="bg-white">
      <div className="container py-6 lg:py-8">
        <div className="rounded-2xl overflow-hidden grid lg:grid-cols-2 min-h-[360px] lg:min-h-[460px]">
          {/* ─── LEFT — Charcoal pitch + contact buttons ─────────── */}
          <div className="relative bg-charcoal text-white p-8 lg:p-14 flex flex-col justify-center">
            <div className="eyebrow text-secondary-300 mb-3">
              We're here to help
            </div>

            <h2 className="font-display font-bold uppercase tracking-tight leading-[0.95] text-3xl sm:text-4xl lg:text-5xl mb-4 whitespace-nowrap">
              Get in <span className="text-secondary-300">touch.</span>
            </h2>

            <p className="text-[15px] text-white/85 max-w-md leading-relaxed mb-7">
              Talk to a FAMCO specialist about stock, finance, trade-in, or
              service. Reach us by phone, WhatsApp, or live chat — Sat–Thu, 8 AM
              – 6 PM GST.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              {/* Primary CTA — Call */}
              <a
                href="tel:80032626"
                className="btn btn-primary h-12 px-5 text-[14px] rounded-md inline-flex items-center justify-center gap-2"
              >
                <Phone className="h-4 w-4" />
                Call 800 32626
              </a>

              {/* Secondary — WhatsApp */}
              <a
                href="#"
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
            </div>

            {/* Quick info row */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px] text-white/70 pt-4 border-t border-white/15">
              <a
                href="mailto:FAMCO@alfuttaim.ae"
                className="inline-flex items-center gap-1.5 hover:text-secondary-300"
              >
                <Mail className="h-3.5 w-3.5" />
                FAMCO@alfuttaim.ae
              </a>
              <span className="hidden sm:inline w-px h-4 bg-white/15" />
              <span>Sat–Thu · 8 AM – 6 PM GST</span>
              <span className="hidden sm:inline w-px h-4 bg-white/15" />
              <span>Avg. response: under 2 hours</span>
            </div>
          </div>

          {/* ─── RIGHT — Specialist photo with floating chat bubbles ─── */}
          <div className="relative overflow-hidden bg-charcoal">
            {/* Background image — repurpose finance.jpg (FAMCO yard with specialists) */}
            <img
              src="/hero/finance.jpg"
              alt="FAMCO specialists at the Dubai facility"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 hover:scale-105"
            />
            {/* Subtle left-edge gradient so the join with the charcoal pane is seamless */}
            <div className="absolute inset-0 bg-gradient-to-r from-charcoal-900/40 to-transparent" />

            {/* Floating "live chat" bubble — top-right */}
            <div className="absolute top-6 right-6 max-w-[240px] hidden md:block">
              <div className="bg-white rounded-xl shadow-lift border border-line p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="relative inline-flex h-2 w-2">
                    <span className="absolute inset-0 rounded-full bg-secondary animate-ping opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-secondary" />
                  </span>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-secondary">
                    Specialist online
                  </span>
                </div>
                <p className="text-[12.5px] text-ink leading-snug">
                  "Hi 👋 — looking for a Volvo FH or a forklift? Happy to send
                  matching stock today."
                </p>
                <div className="mt-2 text-[11px] text-muted">
                  Khalid · FAMCO DIP
                </div>
              </div>
            </div>

            {/* Floating "phone" chip — bottom-left */}
            <div className="absolute bottom-6 left-6 hidden md:flex items-center gap-3 bg-white rounded-full shadow-lift border border-line pl-2 pr-4 py-2">
              <span className="h-9 w-9 rounded-full bg-secondary text-white flex items-center justify-center">
                <Phone className="h-4 w-4" />
              </span>
              <div className="leading-tight">
                <div className="text-[10.5px] font-bold uppercase tracking-widest text-muted">
                  Call us
                </div>
                <div className="text-[14px] font-semibold text-ink tabular-nums">
                  800 32626
                </div>
              </div>
            </div>

            {/* "Live chat" CTA chip — bottom-right */}
            <a
              href="#"
              className="
                absolute bottom-6 right-6 hidden md:inline-flex items-center gap-2
                bg-secondary text-white rounded-full
                px-4 py-2.5 text-[13px] font-semibold
                shadow-lift hover:bg-secondary-700 transition-colors
              "
            >
              Start a chat
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
