import { ShieldCheck, FileCheck, Truck, Phone } from "lucide-react";
import { asset } from "@/lib/asset";

type BannerProps = {
  eyebrow: string;
  title: React.ReactNode;
  body: string;
  image: string;
};

export default function StockBanner({
  eyebrow,
  title,
  body,
  image,
}: BannerProps) {
  return (
    <section className="bg-white">
      <div className="container pt-6 lg:pt-8">
        <div className="relative overflow-hidden rounded-2xl bg-charcoal text-white min-h-[260px] lg:min-h-[320px]">
          {/* Background image */}
          <img
            src={asset(image)}
            alt=""
            aria-hidden
            className="absolute inset-0 h-full w-full object-cover"
          />
          {/* Black gradient — same as hero left video card */}
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal-900 via-charcoal-800/70 to-transparent" />

          {/* Content */}
          <div className="relative z-10 p-7 lg:p-12 flex flex-col justify-between min-h-[260px] lg:min-h-[320px]">
            {/* Top — eyebrow + headline + body */}
            <div className="max-w-2xl">
              <div className="eyebrow text-secondary-300 mb-2.5">{eyebrow}</div>
              <h1 className="font-display font-bold uppercase tracking-tight leading-[0.95] text-3xl sm:text-4xl lg:text-5xl text-white mb-3">
                {title}
              </h1>
              <p className="text-[14px] lg:text-[15px] text-white/85 leading-relaxed max-w-xl">
                {body}
              </p>
            </div>

            {/* Bottom — trust pills */}
            <div className="mt-6 flex flex-wrap items-center gap-2">
              <Pill icon={ShieldCheck}>Famco Approved</Pill>
              <Pill icon={FileCheck}>Paperwork handled</Pill>
              <Pill icon={Truck}>GCC-wide delivery</Pill>
              <Pill icon={Phone} href="tel:80032626">
                800 32626
              </Pill>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Pill({
  icon: Icon,
  children,
  href,
}: {
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
  href?: string;
}) {
  const className =
    "inline-flex items-center gap-1.5 bg-white/10 hover:bg-white/15 border border-white/15 rounded-full px-3 py-1.5 text-[12px] font-semibold text-white transition-colors";
  if (href) {
    return (
      <a href={href} className={className}>
        <Icon className="h-3.5 w-3.5 text-secondary-300" />
        {children}
      </a>
    );
  }
  return (
    <span className={className}>
      <Icon className="h-3.5 w-3.5 text-secondary-300" />
      {children}
    </span>
  );
}
