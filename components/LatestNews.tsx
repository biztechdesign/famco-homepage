import { ArrowRight } from "lucide-react";
import { asset, link } from "@/lib/asset";

type Post = {
  title: string;
  image: string;
  href: string;
};

const FEATURED: Post = {
  title:
    "Volvo FH Aero arrives in the UAE — what fleet operators need to know",
  image: "/hero/sell.jpg",
  href: "/stock",
};

const POSTS: Post[] = [
  {
    title: "Save AED 25,000 on selected Volvo FH tractors this quarter",
    image: "/hero/finance.jpg",
    href: "/stock",
  },
  {
    title: "FAMCO expands TMH workshop bays for heavy excavators",
    image: "/hero/inspected.jpg",
    href: "/stock",
  },
  {
    title: "Used vs. new trucks in the UAE — which one is right for you?",
    image: "/hero/brand-new.jpg",
    href: "/stock",
  },
];

export default function LatestNews() {
  return (
    <section className="bg-white">
      <div className="container py-12 lg:py-16">
        {/* ─── Header ──────────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8 lg:mb-10">
          <div>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-ink">
              Latest from <span className="text-secondary-300">FAMCO</span>
            </h2>
          </div>
          <a
            href={link("/stock")}
            className="
              inline-flex items-center gap-2 text-secondary font-semibold
              hover:gap-3 transition-all self-start sm:self-auto
            "
          >
            View all articles <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        {/* ─── Grid: 1 featured + 3 stacked compact cards ───────── */}
        <div className="grid lg:grid-cols-2 gap-5 lg:gap-6">
          {/* Featured (large, left) */}
          <FeaturedCard post={FEATURED} />

          {/* 3 compact horizontal cards (right column) */}
          <div className="grid gap-4 lg:gap-5">
            {POSTS.map((p) => (
              <CompactCard key={p.title} post={p} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   Featured card — large image + title overlay (BAS-style)
   ───────────────────────────────────────────────────────────── */

function FeaturedCard({ post }: { post: Post }) {
  return (
    <a
      href={link(post.href)}
      className="
        group relative overflow-hidden rounded-2xl
        bg-charcoal text-white
        min-h-[360px] lg:min-h-[520px]
        flex flex-col justify-end
        transition-all duration-300
        hover:shadow-lift
      "
    >
      <img
        src={asset(post.image)}
        alt=""
        aria-hidden
        className="
          absolute inset-0 h-full w-full object-cover
          transition-transform duration-700 group-hover:scale-105
        "
      />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900 via-charcoal-900/55 to-transparent" />

      {/* Content — bottom */}
      <div className="relative p-6 lg:p-8">
        <h3 className="font-display text-2xl lg:text-3xl font-bold leading-tight max-w-xl mb-4">
          {post.title}
        </h3>
        <span className="inline-flex items-center gap-2 text-[14px] font-semibold text-secondary-300 group-hover:gap-3 transition-all">
          Read article
          <ArrowRight className="h-4 w-4" />
        </span>
      </div>
    </a>
  );
}

/* ─────────────────────────────────────────────────────────────
   Compact horizontal card — image-left, content-right
   ───────────────────────────────────────────────────────────── */

function CompactCard({ post }: { post: Post }) {
  return (
    <a
      href={link(post.href)}
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
          src={asset(post.image)}
          alt=""
          aria-hidden
          className="
            absolute inset-0 h-full w-full object-cover
            transition-transform duration-500 group-hover:scale-105
          "
        />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 p-4 lg:p-5 flex flex-col justify-center gap-3">
        <h3 className="font-display text-[15px] lg:text-base font-bold text-ink leading-snug line-clamp-2">
          {post.title}
        </h3>
        <span className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-secondary group-hover:gap-2 transition-all">
          Read article
          <ArrowRight className="h-3.5 w-3.5" />
        </span>
      </div>
    </a>
  );
}
