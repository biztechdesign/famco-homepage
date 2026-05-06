import {
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  Mail,
  Phone,
  MapPin,
  ChevronDown,
  ArrowRight,
} from "lucide-react";

const COLS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Inventory",
    links: [
      { label: "View all stock", href: "#" },
      { label: "Trucks", href: "#" },
      { label: "Buses", href: "#" },
      { label: "Construction equipment", href: "#" },
      { label: "Material handling", href: "#" },
      { label: "Power & industrial", href: "#" },
    ],
  },
  {
    title: "Buy & sell",
    links: [
      { label: "How to buy", href: "#" },
      { label: "0% interest finance", href: "#" },
      { label: "Trade in & trade up", href: "#" },
      { label: "Get free valuation", href: "#" },
      { label: "Live video inspection", href: "#" },
    ],
  },
  {
    title: "Service",
    links: [
      { label: "TMH Workshop", href: "#" },
      { label: "Genuine parts", href: "#" },
      { label: "Book a service slot", href: "#" },
      { label: "GCC delivery", href: "#" },
      { label: "Customer support", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About FAMCO", href: "#" },
      { label: "Al-Futtaim Group", href: "#" },
      { label: "News & articles", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Ethics & compliance", href: "#" },
    ],
  },
];

const BRANCHES = [
  {
    name: "FAMCO DIP",
    address: "Dubai Investment Park, Dubai",
    phone: "800 32626",
  },
  {
    name: "FAMCO Umm Ramool",
    address: "Umm Ramool, Dubai",
    phone: "800 32626",
  },
  {
    name: "TMH Umm Ramool",
    address: "Truck & Machinery Hub, Dubai",
    phone: "800 32626",
  },
];

export default function Footer() {
  return (
    <footer className="bg-charcoal text-white">
      {/* ─── Branches strip — top of footer ──────────────────────── */}
      <div className="border-b border-white/10">
        <div className="container py-8">
          <div className="grid sm:grid-cols-3 gap-5">
            {BRANCHES.map((b) => (
              <div
                key={b.name}
                className="flex items-start gap-3"
              >
                <span className="h-9 w-9 rounded-md bg-white/10 flex items-center justify-center shrink-0">
                  <MapPin className="h-4 w-4 text-secondary-300" />
                </span>
                <div className="min-w-0">
                  <div className="text-[14px] font-semibold text-white leading-tight">
                    {b.name}
                  </div>
                  <div className="text-[12.5px] text-white/60 mt-0.5">
                    {b.address}
                  </div>
                  <a
                    href={`tel:${b.phone.replace(/\s/g, "")}`}
                    className="text-[12.5px] text-white/80 hover:text-secondary-300 transition-colors"
                  >
                    {b.phone}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ─── Newsletter band ─────────────────────────────────────── */}
      <div className="border-b border-white/10">
        <div className="container py-10 lg:py-12">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <div className="text-[11px] uppercase tracking-[0.18em] font-bold text-secondary-300 mb-2">
                Stay in the loop
              </div>
              <h3 className="font-display text-2xl lg:text-3xl font-bold leading-tight">
                Subscribe for new stock,
                <br className="hidden sm:block" />
                offers and FAMCO news
              </h3>
            </div>

            <form
              action="#"
              method="post"
              className="flex w-full lg:w-auto lg:min-w-[440px] gap-2"
            >
              <input
                type="email"
                required
                placeholder="Enter your email"
                aria-label="Email address"
                className="
                  flex-1 h-12 px-4 rounded-md
                  bg-white/5 border border-white/15
                  text-[14px] text-white placeholder:text-white/40
                  outline-none focus:border-secondary focus:bg-white/10
                  transition-colors
                "
              />
              <button
                type="submit"
                className="btn btn-primary h-12 px-5 text-[14px] rounded-md whitespace-nowrap"
              >
                Subscribe
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* ─── Main link grid ──────────────────────────────────────── */}
      <div className="container py-12 lg:py-16">
        <div className="grid lg:grid-cols-[1.5fr_repeat(4,minmax(0,1fr))] gap-10 lg:gap-12">
          {/* Brand block */}
          <div>
            <a href="/" className="inline-flex items-center mb-5">
              <span className="bg-white inline-block rounded-md p-3">
                <img
                  src="/brand/logo.png"
                  alt="Al-Futtaim FAMCO Used Equipment"
                  className="h-10 w-auto"
                />
              </span>
            </a>
            <p className="text-[13.5px] text-white/65 leading-relaxed mb-6 max-w-sm">
              Part of Al-Futtaim Group · UAE since 1978. Sole Volvo distributor —
              inspected used trucks, buses and machinery, delivered across the GCC.
            </p>

            {/* Direct contact row */}
            <div className="space-y-2.5">
              <a
                href="tel:80032626"
                className="flex items-center gap-2.5 text-[13.5px] text-white/80 hover:text-secondary-300 transition-colors"
              >
                <span className="h-7 w-7 rounded-md bg-white/10 flex items-center justify-center shrink-0">
                  <Phone className="h-3.5 w-3.5" />
                </span>
                800 32626
              </a>
              <a
                href="mailto:FAMCO@alfuttaim.ae"
                className="flex items-center gap-2.5 text-[13.5px] text-white/80 hover:text-secondary-300 transition-colors"
              >
                <span className="h-7 w-7 rounded-md bg-white/10 flex items-center justify-center shrink-0">
                  <Mail className="h-3.5 w-3.5" />
                </span>
                FAMCO@alfuttaim.ae
              </a>
            </div>
          </div>

          {/* Link columns */}
          {COLS.map((c) => (
            <div key={c.title}>
              <h4 className="text-[11px] uppercase tracking-[0.18em] font-bold text-white mb-4">
                {c.title}
              </h4>
              <ul className="space-y-2.5">
                {c.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="text-[13.5px] text-white/65 hover:text-secondary-300 transition-colors"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* ─── Bottom bar — socials · legal · language ─────────────── */}
      <div className="border-t border-white/10 bg-charcoal-800">
        <div className="container py-5 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* Socials */}
          <div className="flex items-center gap-2">
            {[Linkedin, Facebook, Instagram, Youtube].map((Icon, i) => (
              <a
                key={i}
                href="#"
                aria-label="Social link"
                className="
                  h-9 w-9 rounded-md bg-white/5 border border-white/10
                  hover:bg-secondary hover:border-secondary
                  flex items-center justify-center
                  transition-colors
                "
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>

          {/* Legal links */}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 text-[12.5px] text-white/60">
            <span>© 2026 Al-Futtaim Auto &amp; Machinery Co. LLC</span>
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Cookies</a>
            <a href="#" className="hover:text-white">Terms</a>
            <a href="#" className="hover:text-white">Sitemap</a>
          </div>

          {/* Language */}
          <button
            className="
              inline-flex items-center gap-2 self-start lg:self-auto
              bg-white/5 border border-white/10
              text-[13px] font-medium text-white
              px-3.5 py-2 rounded-md
              hover:bg-white/10 transition-colors
            "
          >
            <span aria-hidden className="text-base leading-none">🇦🇪</span>
            English
            <ChevronDown className="h-3.5 w-3.5 opacity-70" />
          </button>
        </div>
      </div>
    </footer>
  );
}
