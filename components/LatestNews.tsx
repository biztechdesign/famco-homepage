import { ArrowRight, Calendar } from "lucide-react";
import { asset, link } from "@/lib/asset";

type Post = {
  type: "NEWS" | "OFFER" | "GUIDE";
  category: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  image: string;
  href: string;
};

const FEATURED: Post = {
  type: "NEWS",
  category: "Industry",
  title:
    "Volvo FH Aero arrives in the UAE — what fleet operators need to know",
  excerpt:
    "Lower drag, improved fuel economy and a redesigned cab. We break down what the new FH Aero means for UAE long-haul operations and when it lands at FAMCO showrooms.",
  date: "May 02, 2026",
  readTime: "6 min read",
  image: "/hero/sell.jpg",
  href: "/stock",
};

const POSTS: Post[] = [
  {
    type: "OFFER",
    category: "Offer",
    title: "Save AED 25,000 on selected Volvo FH tractors this quarter",
    excerpt:
      "End-of-quarter clearance. Inspected, financed and ready to roll.",
    date: "Apr 28, 2026",
    readTime: "3 min read",
    image: "/hero/finance.jpg",
    href: "/stock",
  },
  {
    type: "NEWS",
    category: "Workshop",
    title: "FAMCO expands TMH workshop bays for heavy excavators",
    excerpt:
      "Two new bays at Umm Ramool now support faster turnaround on Volvo CE and Doosan service.",
    date: "Apr 18, 2026",
    readTime: "4 min read",
    image: "/hero/inspected.jpg",
    href: "/stock",
  },
  {
    type: "GUIDE",
    category: "Buyers guide",
    title: "Used vs. new trucks in the UAE — which one is right for you?",
    excerpt:
      "A practical breakdown of total cost, financing options and resale value.",
    date: "Apr 03, 2026",
    readTime: "8 min read",
    image: "/hero/brand-new.jpg",
    href: "/stock",
  },
];

const TYPE_STYLES: Record<Post["type"], string> = {
  NEWS: "bg-primary text-white",
  OFFER: "bg-secondary text-white",
  GUIDE: "bg-charcoal text-white",
};

export default function LatestNews() {
  return (
    <section className="bg-bgalt">
      <div className="container py-12 lg:py-16">
        {/* ─── Header ──────────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8 lg:mb-10">
          <div>
            <div className="eyebrow mb-2">News & Articles</div>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-ink">
              Latest from FAMCO
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

      {/* Type badge — top-left */}
      <span
        className={`
          absolute top-5 left-5
          text-[10.5px] font-bold uppercase tracking-wider
          px-2.5 py-1 rounded
          ${TYPE_STYLES[post.type]}
        `}
      >
        {post.type}
      </span>

      {/* Content — bottom */}
      <div className="relative p-6 lg:p-8">
        <div className="flex items-center gap-3 text-[12px] text-white/70 mb-3">
          <span className="inline-flex items-center gap-1.5">
            <Calendar className="h-3 w-3" />
            {post.date}
          </span>
          <span className="h-1 w-1 rounded-full bg-white/40" />
          <span>{post.readTime}</span>
          <span className="h-1 w-1 rounded-full bg-white/40" />
          <span className="text-secondary-300 font-semibold">
            {post.category}
          </span>
        </div>
        <h3 className="font-display text-2xl lg:text-3xl font-bold leading-tight max-w-xl mb-3">
          {post.title}
        </h3>
        <p className="text-[14px] text-white/80 leading-relaxed max-w-xl mb-5 line-clamp-2">
          {post.excerpt}
        </p>
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
        <span
          className={`
            absolute top-2 left-2
            text-[9.5px] font-bold uppercase tracking-wider
            px-2 py-0.5 rounded
            ${TYPE_STYLES[post.type]}
          `}
        >
          {post.type}
        </span>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 p-4 lg:p-5 flex flex-col justify-center">
        <div className="flex items-center gap-2 text-[11px] text-muted mb-1.5">
          <span>{post.date}</span>
          <span className="h-1 w-1 rounded-full bg-line" />
          <span>{post.readTime}</span>
        </div>
        <h3 className="font-display text-[15px] lg:text-base font-bold text-ink leading-snug mb-1.5 line-clamp-2 group-hover:text-secondary transition-colors">
          {post.title}
        </h3>
        <p className="text-[12.5px] text-muted leading-snug line-clamp-2">
          {post.excerpt}
        </p>
      </div>
    </a>
  );
}
