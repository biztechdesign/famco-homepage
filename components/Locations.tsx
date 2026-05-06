import { MapPin, Phone, Clock, ArrowRight } from "lucide-react";

const BRANCHES = [
  {
    name: "FAMCO DIP",
    address: "Dubai Investment Park",
    hours: "Sat–Thu 8:00–17:00",
    phone: "800 32626",
  },
  {
    name: "FAMCO Umm Ramool",
    address: "Umm Ramool, Dubai",
    hours: "Sat–Thu 8:00–17:00",
    phone: "800 32626",
  },
  {
    name: "TMH Umm Ramool",
    address: "Truck & Machinery Hub, Dubai",
    hours: "Sat–Thu 8:00–17:00",
    phone: "800 32626",
  },
];

export default function Locations() {
  return (
    <section className="py-16 lg:py-24">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="eyebrow mb-2">Visit us</div>
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-ink">
            Three branches across Dubai
          </h2>
        </div>

        {/* Map placeholder */}
        <div className="rounded-xl overflow-hidden border border-line bg-bgalt aspect-[16/6] mb-6 relative">
          <img
            src="/placeholders/uae-map.svg"
            alt="UAE map with FAMCO branches"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-primary/5" />
          {[
            { x: "32%", y: "55%" },
            { x: "55%", y: "45%" },
            { x: "60%", y: "50%" },
          ].map((p, i) => (
            <div
              key={i}
              className="absolute -translate-x-1/2 -translate-y-full"
              style={{ left: p.x, top: p.y }}
            >
              <div className="relative">
                <MapPin className="h-8 w-8 text-secondary fill-secondary" strokeWidth={1.5} />
                <span className="absolute inset-0 -z-10 m-auto h-3 w-3 rounded-full bg-secondary/40 animate-ping" />
              </div>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {BRANCHES.map((b) => (
            <div
              key={b.name}
              className="bg-white rounded-xl border border-line p-6 shadow-card hover:shadow-lift transition-all"
            >
              <div className="flex items-start gap-3 mb-4">
                <div className="h-10 w-10 rounded-md bg-secondary/10 flex items-center justify-center shrink-0">
                  <MapPin className="h-5 w-5 text-secondary" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold text-ink leading-tight">
                    {b.name}
                  </h3>
                  <p className="text-sm text-muted mt-0.5">{b.address}</p>
                </div>
              </div>
              <div className="space-y-2 text-sm text-ink/80 pb-4 border-b border-line">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted" /> {b.hours}
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted" /> {b.phone}
                </div>
              </div>
              <a
                href="#"
                className="mt-4 inline-flex items-center gap-1 text-secondary font-semibold hover:gap-2 transition-all"
              >
                Get directions <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
