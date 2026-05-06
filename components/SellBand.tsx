import { ArrowRight } from "lucide-react";

export default function SellBand() {
  return (
    <section className="relative bg-primary text-white overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="/placeholders/sell-band.svg"
          alt="FAMCO yard"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/85 to-primary/40" />
      </div>

      <div className="container relative py-16 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <div className="eyebrow text-secondary-300 mb-3">Sell with FAMCO</div>
            <h2 className="font-display text-4xl lg:text-5xl font-bold leading-tight mb-5">
              Get the best price for your fleet.
            </h2>
            <p className="text-lg text-white/85 mb-8 max-w-xl">
              We buy used trucks, buses and machinery directly. Free valuation in 24
              hours, paperwork handled by our team, payment on collection.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a href="#" className="btn btn-primary h-12">
                Get free valuation <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="btn btn-outline h-12 text-white border-white/40 hover:bg-white/10"
              >
                How it works
              </a>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 lg:gap-6">
            <Stat n="24h" label="Free valuation" />
            <Stat n="14k+" label="Sales / yr" />
            <Stat n="GCC" label="Buyer reach" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ n, label }: { n: string; label: string }) {
  return (
    <div className="text-center p-5 rounded-xl bg-white/5 border border-white/10 backdrop-blur">
      <div className="font-display text-3xl lg:text-4xl font-bold text-secondary-300">
        {n}
      </div>
      <div className="text-sm text-white/80 mt-1">{label}</div>
    </div>
  );
}
