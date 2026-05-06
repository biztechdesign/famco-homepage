import { Award, ShieldCheck, FileCheck, MapPin } from "lucide-react";

const ITEMS = [
  { icon: Award, text: "46 years in the UAE" },
  { icon: ShieldCheck, text: "Sole Volvo distributor" },
  { icon: FileCheck, text: "Inspected & documented" },
  { icon: MapPin, text: "3 branches in Dubai" },
];

export default function TrustStrip() {
  return (
    <section className="bg-bgalt border-y border-line">
      <div className="container py-5">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-0 lg:divide-x lg:divide-line">
          {ITEMS.map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-3 lg:px-6 first:lg:pl-0 last:lg:pr-0"
            >
              <item.icon className="h-6 w-6 text-secondary shrink-0" />
              <span className="text-sm lg:text-base font-semibold text-ink">
                {item.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
