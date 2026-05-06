/**
 * Slim header: H1 title + short description (count + tagline).
 * Sort + view toggle live in StockSortBar (rendered separately).
 */
export default function StockHero({
  title = "Used trucks, vans & machinery",
  count = 312,
  description,
}: {
  title?: string;
  count?: number;
  description?: string;
}) {
  const desc =
    description ??
    "Inspected by Volvo-certified technicians at TMH and ready for delivery across the GCC.";

  return (
    <div>
      <h1 className="font-display text-2xl lg:text-3xl font-bold text-ink leading-tight">
        {title}
      </h1>
      <p className="mt-1.5 text-[13.5px] text-muted">
        <span className="font-semibold text-ink tabular-nums">
          {count.toLocaleString("en-AE")}
        </span>{" "}
        results · {desc}
      </p>
    </div>
  );
}
