import { Star, Quote } from "lucide-react";

const QUOTES = [
  {
    body: "We've been buying Volvo trucks from FAMCO for over a decade. Inspection quality is consistent and paperwork is always on time.",
    name: "Khalid Al-Mansouri",
    role: "Fleet Manager, Emirates Logistics",
  },
  {
    body: "Found a Doosan excavator in great shape, financed it through FAMCO and had it on site in three days.",
    name: "Vikram Iyer",
    role: "Site Director, Al-Futtaim Construction",
  },
  {
    body: "Their TMH workshop knows Volvo inside-out. Used buses we bought are still running daily after four years.",
    name: "Ahmed Hassan",
    role: "Operations, Sharjah Transport",
  },
];

export default function Reviews() {
  return (
    <section className="py-16 lg:py-24">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="eyebrow mb-2">Trusted by fleets across the GCC</div>
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-ink">
            What our customers say
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-14">
          {QUOTES.map((q) => (
            <figure
              key={q.name}
              className="relative bg-white p-7 rounded-xl border border-line shadow-card"
            >
              <Quote className="h-8 w-8 text-secondary/20 absolute top-5 right-5" />
              <div className="flex items-center gap-1 mb-4">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star key={i} className="h-4 w-4 fill-secondary text-secondary" />
                ))}
              </div>
              <blockquote className="text-ink/90 leading-relaxed mb-5">
                "{q.body}"
              </blockquote>
              <figcaption className="pt-4 border-t border-line">
                <div className="font-semibold text-ink">{q.name}</div>
                <div className="text-sm text-muted">{q.role}</div>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-10 border-t border-line text-center">
          {[
            { n: "46", l: "Years in the UAE" },
            { n: "14k+", l: "Transactions / yr" },
            { n: "ISO", l: "Certified workshops" },
            { n: "GCC", l: "Wide delivery" },
          ].map((s) => (
            <div key={s.l}>
              <div className="font-display text-4xl font-bold text-secondary">{s.n}</div>
              <div className="text-sm text-muted mt-1">{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
