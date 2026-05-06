import { ArrowRight } from "lucide-react";

const SERVICES = [
  {
    title: "Financing",
    body: "Tailored financing for fleet operators with Al-Futtaim Finance partners.",
    cta: "Get a quote",
    img: "/placeholders/svc-finance.svg",
  },
  {
    title: "Rental",
    body: "Daily, monthly, long-term. Forklifts, gensets, trucks — pick a term that fits.",
    cta: "Browse rentals",
    img: "/placeholders/svc-rental.svg",
  },
  {
    title: "Service & Parts",
    body: "TMH-certified workshops in Umm Ramool. Genuine Volvo parts in stock.",
    cta: "Book service",
    img: "/placeholders/svc-service.svg",
  },
];

export default function Services() {
  return (
    <section className="py-16 lg:py-24 bg-bgalt">
      <div className="container">
        <div className="max-w-2xl mb-12">
          <div className="eyebrow mb-2">Beyond the sale</div>
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-ink">
            Finance, rent and service — all in one place
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SERVICES.map((s) => (
            <a
              key={s.title}
              href="#"
              className="group relative block rounded-xl overflow-hidden bg-primary text-white min-h-[360px] shadow-card hover:shadow-lift transition-all"
            >
              <img
                src={s.img}
                alt={s.title}
                className="absolute inset-0 h-full w-full object-cover opacity-40 group-hover:opacity-30 group-hover:scale-105 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/70 to-transparent" />
              {/* Diagonal secondary corner */}
              <div className="absolute -top-8 -right-8 h-20 w-20 bg-secondary rotate-45 opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="relative p-7 flex flex-col h-full justify-end min-h-[360px]">
                <h3 className="font-display text-3xl font-bold mb-3">{s.title}</h3>
                <p className="text-white/85 mb-5 max-w-xs">{s.body}</p>
                <span className="inline-flex items-center gap-2 font-semibold text-secondary-300 group-hover:gap-3 transition-all">
                  {s.cta} <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
