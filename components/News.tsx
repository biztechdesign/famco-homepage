import { ArrowRight } from "lucide-react";

const POSTS = [
  {
    type: "OFFER",
    title: "End-of-quarter offer: Save AED 25,000 on selected Volvo FH tractors",
    excerpt:
      "Limited stock. Inspected, financing available. Visit FAMCO DIP this week.",
    date: "May 02, 2026",
    img: "/placeholders/news-1.svg",
  },
  {
    type: "NEWS",
    title: "FAMCO opens expanded TMH workshop bays for heavy excavators",
    excerpt:
      "New bays at Umm Ramool support faster turnaround on Volvo CE and Doosan service.",
    date: "Apr 18, 2026",
    img: "/placeholders/news-2.svg",
  },
  {
    type: "NEWS",
    title: "Volvo FH Aero arrives in the UAE — what UAE fleets need to know",
    excerpt:
      "Improved aero, lower fuel use, redesigned cab — coming to FAMCO showrooms.",
    date: "Apr 03, 2026",
    img: "/placeholders/news-3.svg",
  },
];

export default function News() {
  return (
    <section className="bg-bgalt py-16 lg:py-24">
      <div className="container">
        <div className="flex items-end justify-between mb-10">
          <div>
            <div className="eyebrow mb-2">Offers & News</div>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-ink">
              Latest from FAMCO
            </h2>
          </div>
          <a
            href="#"
            className="hidden md:flex items-center gap-2 text-secondary font-semibold hover:gap-3 transition-all"
          >
            View all news <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {POSTS.map((p) => (
            <a
              key={p.title}
              href="#"
              className="group bg-white rounded-xl overflow-hidden border border-line shadow-card hover:shadow-lift transition-all"
            >
              <div className="aspect-[16/10] overflow-hidden bg-bgalt relative">
                <img
                  src={p.img}
                  alt={p.title}
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span
                  className={`absolute top-4 left-4 text-[10px] font-bold tracking-wider px-2.5 py-1 rounded ${
                    p.type === "OFFER"
                      ? "bg-secondary text-white"
                      : "bg-primary text-white"
                  }`}
                >
                  {p.type}
                </span>
              </div>
              <div className="p-6">
                <div className="text-xs text-muted mb-2">{p.date}</div>
                <h3 className="font-display text-xl font-bold text-ink leading-snug mb-2 group-hover:text-secondary transition-colors">
                  {p.title}
                </h3>
                <p className="text-sm text-muted line-clamp-2 mb-4">{p.excerpt}</p>
                <span className="inline-flex items-center gap-1 text-secondary font-semibold text-sm group-hover:gap-2 transition-all">
                  Read more <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
