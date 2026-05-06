import { Video } from "lucide-react";
import { asset } from "@/lib/asset";

export default function LiveInspection() {
  return (
    <section className="bg-white">
      <div className="container py-6 lg:py-8">
        <div className="rounded-2xl overflow-hidden grid lg:grid-cols-2 min-h-[260px] lg:min-h-[320px]">
          {/* ─── LEFT — Charcoal pitch ───────────────────────────── */}
          <div className="relative bg-charcoal text-white p-7 lg:p-10 flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-3">
              <span className="relative inline-flex h-2 w-2">
                <span className="absolute inset-0 rounded-full bg-secondary animate-ping opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-secondary" />
              </span>
              <span className="eyebrow text-secondary-300">
                Live available now
              </span>
            </div>

            <h2 className="font-display font-bold uppercase tracking-tight leading-[0.95] text-2xl sm:text-3xl lg:text-4xl mb-3 whitespace-nowrap">
              Live video <span className="text-secondary-300">inspection.</span>
            </h2>

            <p className="text-[14px] text-white/85 max-w-md leading-relaxed mb-1.5">
              Schedule a live walkthrough with a FAMCO specialist from our
              Dubai facility. Ask questions in real time before you commit.
            </p>
            <p className="text-[12px] text-white/55">
              Free · No commitment · Mon–Sat, 9 AM – 6 PM GST
            </p>
          </div>

          {/* ─── RIGHT — Live video-call mock ─────────────────── */}
          <div className="relative bg-secondary-50 p-6 lg:p-8 flex items-center justify-center overflow-hidden">
            {/* Soft decorative blobs */}
            <span
              aria-hidden
              className="pointer-events-none absolute -top-16 -right-16 h-56 w-56 rounded-full bg-secondary/10 blur-2xl"
            />
            <span
              aria-hidden
              className="pointer-events-none absolute -bottom-20 -left-10 h-48 w-48 rounded-full bg-secondary/10 blur-2xl"
            />

            <div className="relative w-full max-w-md">
              {/* The "video call" frame */}
              <div className="relative rounded-xl overflow-hidden bg-charcoal-900 shadow-lift border border-charcoal-700">
                {/* Main feed — uses the FAMCO yard image as the "specialist's camera view" */}
                <div className="relative aspect-[16/9]">
                  <img
                    src={asset("/hero/inspected.jpg")}
                    alt="Live FAMCO yard view"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  {/* Subtle vignette so overlays read */}
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/70 via-transparent to-charcoal-900/30" />

                  {/* TOP BAR — recording + duration */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-white">
                    <span className="inline-flex items-center gap-1.5 bg-charcoal-900/80 backdrop-blur px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider">
                      <span className="relative inline-flex h-2 w-2">
                        <span className="absolute inset-0 rounded-full bg-red-500 animate-ping opacity-75" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
                      </span>
                      REC
                    </span>
                    <span className="bg-charcoal-900/80 backdrop-blur px-2.5 py-1 rounded-full text-[11px] font-semibold tabular-nums">
                      00:14:32
                    </span>
                  </div>

                  {/* CENTER — pinpoint annotation showing inspection in progress */}
                  <span
                    aria-hidden
                    className="absolute top-[42%] left-[58%] -translate-x-1/2 -translate-y-1/2"
                  >
                    <span className="relative flex h-8 w-8">
                      <span className="absolute inset-0 rounded-full bg-secondary/50 animate-ping" />
                      <span className="relative inline-flex h-8 w-8 rounded-full bg-secondary border-2 border-white items-center justify-center text-white text-[10px] font-bold">
                        ✓
                      </span>
                    </span>
                  </span>

                  {/* SPECIALIST PIP — small floating tile bottom-right */}
                  <div className="absolute bottom-3 right-3 h-20 w-28 rounded-md overflow-hidden border-2 border-white/80 shadow-lift bg-charcoal">
                    <div className="absolute inset-0 bg-gradient-to-br from-charcoal-700 to-charcoal-900" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="h-10 w-10 rounded-full bg-secondary/30 flex items-center justify-center">
                        <i
                          aria-hidden
                          className="fi fi-rr-user text-white text-[18px] leading-none"
                        />
                      </span>
                    </div>
                    <span className="absolute bottom-1 left-1.5 text-[10px] font-bold text-white drop-shadow">
                      Khalid · FAMCO
                    </span>
                  </div>

                  {/* BOTTOM-LEFT chat bubble */}
                  <div className="absolute bottom-3 left-3 max-w-[55%]">
                    <div className="bg-white/95 backdrop-blur rounded-lg px-3 py-2 shadow-card">
                      <div className="text-[10px] font-bold text-secondary uppercase tracking-wider mb-0.5">
                        Khalid
                      </div>
                      <div className="text-[12px] text-ink leading-snug">
                        "Engine looks clean, only 412k km on this Volvo FH —
                        wanna see the fluids?"
                      </div>
                    </div>
                  </div>
                </div>

                {/* CONTROL BAR */}
                <div className="flex items-center justify-between gap-2 px-3 py-3 bg-charcoal-800 border-t border-charcoal-700">
                  <div className="flex items-center gap-1.5">
                    <CallBtn icon="fi-rr-microphone" />
                    <CallBtn icon="fi-rr-video-camera" />
                    <CallBtn icon="fi-rr-comment" />
                    <CallBtn icon="fi-rr-share" />
                  </div>
                  <button
                    type="button"
                    className="inline-flex items-center gap-1.5 bg-red-500 hover:bg-red-600 transition-colors text-white text-[11px] font-bold uppercase tracking-wider rounded-md px-3 py-1.5"
                  >
                    <i
                      aria-hidden
                      className="fi fi-rr-phone-slash text-[12px]"
                    />
                    End
                  </button>
                </div>
              </div>

              {/* CTA pill below the call mock */}
              <a
                href="/stock/volvo-fh-460-tractor"
                className="mt-4 btn btn-primary w-full h-12 px-5 text-[14px] rounded-lg"
              >
                <Video className="h-4 w-4" />
                Schedule a call like this
              </a>

              <div className="mt-3 flex items-center justify-center gap-4 text-[12px] text-muted">
                <span className="inline-flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
                  3 slots today
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
                  7 slots tomorrow
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   Video-call control button (mute, camera, etc.)
   ───────────────────────────────────────────────────────────── */

function CallBtn({ icon }: { icon: string }) {
  return (
    <span className="h-8 w-8 rounded-md bg-charcoal-700 hover:bg-charcoal-600 flex items-center justify-center text-white/85">
      <i aria-hidden className={`fi ${icon} text-[14px] leading-none`} />
    </span>
  );
}
