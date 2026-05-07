import { link } from "@/lib/asset";

type Group = {
  title: string;
  links: { label: string; href: string }[];
};

const GROUPS: Group[] = [
  {
    title: "Trucks",
    links: [
      { label: "Volvo trucks", href: "/stock?category=trucks&brand=volvo" },
      { label: "Eicher trucks", href: "/stock?category=trucks&brand=eicher" },
      { label: "Renault trucks", href: "/stock?category=trucks&brand=renault" },
      { label: "Mercedes trucks", href: "/stock?category=trucks&brand=mercedes" },
      { label: "MAN trucks", href: "/stock?category=trucks&brand=man" },
      { label: "More about trucks", href: "/stock?category=trucks" },
    ],
  },
  {
    title: "Buses",
    links: [
      { label: "Volvo buses", href: "/stock?category=buses&brand=volvo" },
      { label: "Eicher buses", href: "/stock?category=buses&brand=eicher" },
      { label: "Coach buses", href: "/stock?category=buses" },
      { label: "School buses", href: "/stock?category=buses" },
      { label: "Staff transport", href: "/stock?category=buses" },
      { label: "More about buses", href: "/stock?category=buses" },
    ],
  },
  {
    title: "Construction",
    links: [
      { label: "Volvo CE", href: "/stock?category=construction&brand=volvo" },
      { label: "Doosan equipment", href: "/stock?category=construction&brand=doosan" },
      { label: "SDLG equipment", href: "/stock?category=construction&brand=sdlg" },
      { label: "Excavators", href: "/stock?category=construction" },
      { label: "Wheel loaders", href: "/stock?category=construction" },
      { label: "More about machinery", href: "/stock?category=construction" },
    ],
  },
  {
    title: "Material handling",
    links: [
      { label: "Linde forklifts", href: "/stock?category=material-handling&brand=linde" },
      { label: "Diesel forklifts", href: "/stock?category=material-handling" },
      { label: "Electric forklifts", href: "/stock?category=material-handling" },
      { label: "Reach trucks", href: "/stock?category=material-handling" },
      { label: "Pallet trucks", href: "/stock?category=material-handling" },
      { label: "More about handling", href: "/stock?category=material-handling" },
    ],
  },
  {
    title: "Power & industrial",
    links: [
      { label: "Himoinsa generators", href: "/stock?category=power&brand=himoinsa" },
      { label: "AGG generators", href: "/stock?category=power" },
      { label: "Ingersoll Rand", href: "/stock?category=power" },
      { label: "Yanmar engines", href: "/stock?category=power" },
      { label: "Lighting towers", href: "/stock?category=power" },
      { label: "More about power", href: "/stock?category=power" },
    ],
  },
  {
    title: "Sell",
    links: [
      { label: "Sell your truck", href: "/stock?category=sell&type=truck" },
      { label: "Sell your bus", href: "/stock?category=sell&type=bus" },
      { label: "Sell your machine", href: "/stock?category=sell&type=machine" },
      { label: "Sell your forklift", href: "/stock?category=sell&type=forklift" },
      { label: "Trade in & trade up", href: "/stock?category=sell" },
      { label: "Get free valuation", href: "/stock?category=sell" },
    ],
  },
];

export default function PopularCategories() {
  return (
    <section className="bg-bgalt">
      <div className="container py-12 lg:py-16">
        {/* Header */}
        <div className="text-center mb-10 lg:mb-14">
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-ink">
            Popular <span className="text-secondary-300">categories</span>
          </h2>
        </div>

        {/* 6 columns */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-6 gap-y-10">
          {GROUPS.map((g) => (
            <div key={g.title}>
              <h3 className="font-display text-base font-bold text-ink mb-4">
                {g.title}
              </h3>
              <ul className="space-y-2.5">
                {g.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={link(l.href)}
                      className="text-[13.5px] text-ink/75 hover:text-secondary transition-colors"
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
    </section>
  );
}
