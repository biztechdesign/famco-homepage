type Group = {
  title: string;
  links: { label: string; href: string }[];
};

const GROUPS: Group[] = [
  {
    title: "Trucks",
    links: [
      { label: "Volvo trucks", href: "#" },
      { label: "Eicher trucks", href: "#" },
      { label: "Renault trucks", href: "#" },
      { label: "Mercedes trucks", href: "#" },
      { label: "MAN trucks", href: "#" },
      { label: "More about trucks", href: "#" },
    ],
  },
  {
    title: "Buses",
    links: [
      { label: "Volvo buses", href: "#" },
      { label: "Eicher buses", href: "#" },
      { label: "Coach buses", href: "#" },
      { label: "School buses", href: "#" },
      { label: "Staff transport", href: "#" },
      { label: "More about buses", href: "#" },
    ],
  },
  {
    title: "Construction",
    links: [
      { label: "Volvo CE", href: "#" },
      { label: "Doosan equipment", href: "#" },
      { label: "SDLG equipment", href: "#" },
      { label: "Excavators", href: "#" },
      { label: "Wheel loaders", href: "#" },
      { label: "More about machinery", href: "#" },
    ],
  },
  {
    title: "Material handling",
    links: [
      { label: "Linde forklifts", href: "#" },
      { label: "Diesel forklifts", href: "#" },
      { label: "Electric forklifts", href: "#" },
      { label: "Reach trucks", href: "#" },
      { label: "Pallet trucks", href: "#" },
      { label: "More about handling", href: "#" },
    ],
  },
  {
    title: "Power & industrial",
    links: [
      { label: "Himoinsa generators", href: "#" },
      { label: "AGG generators", href: "#" },
      { label: "Ingersoll Rand", href: "#" },
      { label: "Yanmar engines", href: "#" },
      { label: "Lighting towers", href: "#" },
      { label: "More about power", href: "#" },
    ],
  },
  {
    title: "Sell",
    links: [
      { label: "Sell your truck", href: "#" },
      { label: "Sell your bus", href: "#" },
      { label: "Sell your machine", href: "#" },
      { label: "Sell your forklift", href: "#" },
      { label: "Trade in & trade up", href: "#" },
      { label: "Get free valuation", href: "#" },
    ],
  },
];

export default function PopularCategories() {
  return (
    <section className="bg-white">
      <div className="container py-14 lg:py-20">
        {/* Header */}
        <div className="text-center mb-10 lg:mb-14">
          <div className="eyebrow mb-2">Browse all</div>
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-ink">
            Popular categories
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
                      href={l.href}
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
