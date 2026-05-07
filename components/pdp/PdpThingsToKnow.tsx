import { ArrowRight } from "lucide-react";
import { asset, link } from "@/lib/asset";

/**
 * Two-up card row styled to match the Latest-from-FAMCO compact-card
 * pattern (image-left, content-right, "Read more →" yellow link).
 */

type Item = {
  title: string;
  body: string;
  cta: string;
  href: string;
  image: string;
  alt: string;
};

const ITEMS: Item[] = [
  {
    title: "Finance & warranty at FAMCO",
    body: "Flexible finance plans and warranty cover on every used vehicle, plus in-house workshop service and customisation by FAMCO experts.",
    cta: "Explore options",
    href: link("/stock"),
    image: asset("/hero/brand-new.jpg"),
    alt: "FAMCO workshop technician servicing a truck",
  },
  {
    title: "Sell your current vehicle",
    body: "Looking to sell your current vehicle or equipment? Get a free price proposal and let our experts handle valuation, paperwork and pickup.",
    cta: "Start selling",
    href: link("/stock?category=sell"),
    image: asset("/hero/sell.jpg"),
    alt: "FAMCO buyer inspecting a customer vehicle",
  },
];

export default function PdpThingsToKnow() {
  return (
    <section className="mt-14 lg:mt-20">
      <h2 className="font-display text-2xl lg:text-3xl font-bold text-ink mb-6 lg:mb-8">
        Things to know
      </h2>

      <div className="grid sm:grid-cols-2 gap-4 lg:gap-5">
        {ITEMS.map((it) => (
          <a
            key={it.title}
            href={it.href}
            className="
              group bg-white rounded-xl overflow-hidden
              border border-line shadow-card
              flex
              transition-all duration-300
              hover:shadow-lift hover:-translate-y-0.5
            "
          >
            {/* Image — fixed width on desktop */}
            <div className="relative w-32 sm:w-40 lg:w-44 shrink-0 overflow-hidden bg-bgalt">
              <img
                src={it.image}
                alt={it.alt}
                loading="lazy"
                className="
                  absolute inset-0 h-full w-full object-cover
                  transition-transform duration-500 group-hover:scale-105
                "
              />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0 p-4 lg:p-5 flex flex-col justify-center gap-2.5">
              <h3 className="font-display text-[15px] lg:text-base font-bold text-ink leading-snug line-clamp-2">
                {it.title}
              </h3>
              <p className="text-[12.5px] text-muted leading-snug line-clamp-2">
                {it.body}
              </p>
              <span className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-secondary group-hover:gap-2 transition-all">
                {it.cta}
                <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
