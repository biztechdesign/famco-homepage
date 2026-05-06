const BRANDS = [
  "Volvo Trucks",
  "Volvo Buses",
  "Volvo CE",
  "Yanmar",
  "Doosan",
  "Linde",
  "SDLG",
  "Ingersoll Rand",
  "Himoinsa",
  "AGG",
  "Eicher",
];

export default function Brands() {
  return (
    <section className="py-12 border-y border-line bg-white">
      <div className="container">
        <div className="text-center mb-8">
          <div className="eyebrow">Authorized & Trusted Brands</div>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-11 gap-x-4 gap-y-6">
          {BRANDS.map((b) => (
            <div
              key={b}
              className="flex items-center justify-center h-14 px-3 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all"
            >
              <span className="font-display text-base font-bold text-ink uppercase tracking-wide text-center leading-tight">
                {b}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
