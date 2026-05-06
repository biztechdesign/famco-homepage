import { ShieldCheck, Wrench, FileText, Truck } from "lucide-react";

const ITEMS = [
  {
    icon: ShieldCheck,
    title: "Authorized & Genuine",
    body: "Backed by Al-Futtaim, the official Volvo distributor in the UAE since 1978.",
  },
  {
    icon: Wrench,
    title: "25-point Inspection",
    body: "Every vehicle inspected and serviced by Volvo-certified technicians at TMH workshops.",
  },
  {
    icon: FileText,
    title: "Clean Documentation",
    body: "Mulkiya, service history, customs and export paperwork handled in-house.",
  },
  {
    icon: Truck,
    title: "GCC-wide Delivery",
    body: "We ship across UAE, KSA, Oman, Qatar, Kuwait and Bahrain.",
  },
];

export default function WhyFamco() {
  return (
    <section className="py-16 lg:py-24">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="eyebrow mb-2">Why FAMCO Used Equipment</div>
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-ink">
            Trusted, inspected and ready to work
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {ITEMS.map((item) => (
            <div
              key={item.title}
              className="text-center p-6 rounded-xl border border-line hover:border-secondary/40 hover:shadow-card transition-all"
            >
              <div className="h-14 w-14 mx-auto mb-4 rounded-full bg-secondary/10 flex items-center justify-center">
                <item.icon className="h-7 w-7 text-secondary" />
              </div>
              <h3 className="font-display text-xl font-bold text-ink mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-muted leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
