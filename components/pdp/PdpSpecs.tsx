import { Check } from "lucide-react";

export type SpecGroup = {
  title: string;
  rows: { label: string; value: string }[];
};

export default function PdpSpecs({ groups }: { groups: SpecGroup[] }) {
  return (
    <div className="grid sm:grid-cols-2 gap-5">
      {groups.map((g) => (
        <div
          key={g.title}
          className="bg-white rounded-xl border border-line shadow-card overflow-hidden"
        >
          <div className="px-5 py-3 bg-bgalt border-b border-line">
            <h4 className="font-display text-[15px] font-bold text-ink">
              {g.title}
            </h4>
          </div>
          <dl className="divide-y divide-line">
            {g.rows.map((r) => (
              <div
                key={r.label}
                className="flex items-baseline justify-between gap-3 px-5 py-2.5 text-[13.5px]"
              >
                <dt className="text-muted">{r.label}</dt>
                <dd className="font-semibold text-ink text-right">{r.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      ))}
    </div>
  );
}

export function PdpEquipment({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((it) => (
        <span
          key={it}
          className="inline-flex items-center gap-1.5 bg-white border border-line text-ink text-[12.5px] font-medium px-3 py-1.5 rounded-md"
        >
          <Check className="h-3.5 w-3.5 text-secondary" strokeWidth={3} />
          {it}
        </span>
      ))}
    </div>
  );
}

export function PdpInspection({
  items,
}: {
  items: { label: string; ok: boolean; note?: string }[];
}) {
  const passed = items.filter((i) => i.ok).length;
  return (
    <div className="bg-white rounded-xl border border-line shadow-card overflow-hidden">
      <div className="flex items-center justify-between gap-3 px-5 py-4 bg-bgalt border-b border-line">
        <div>
          <h4 className="font-display text-[15px] font-bold text-ink">
            Famco Approved
          </h4>
          <p className="text-[12px] text-muted">
            Inspected by Volvo-certified technicians at TMH Umm Ramool.
          </p>
        </div>
        <div className="text-right">
          <div className="font-display text-2xl font-bold text-secondary tabular-nums leading-none">
            {passed}/{items.length}
          </div>
          <div className="text-[11px] uppercase tracking-widest font-bold text-muted mt-0.5">
            Points passed
          </div>
        </div>
      </div>
      <ul className="grid sm:grid-cols-2 divide-y sm:divide-y-0 divide-line">
        {items.map((it, i) => (
          <li
            key={it.label}
            className={`
              flex items-start gap-2.5 px-5 py-2.5 text-[13px]
              ${i % 2 === 0 ? "sm:border-r sm:border-line" : ""}
              ${i >= 2 ? "sm:border-t sm:border-line" : ""}
            `}
          >
            <span
              className={`
                h-5 w-5 rounded-full flex items-center justify-center shrink-0 mt-0.5
                ${it.ok ? "bg-secondary/15" : "bg-red-100"}
              `}
            >
              <Check
                className={`h-3 w-3 ${
                  it.ok ? "text-secondary" : "text-red-500"
                }`}
                strokeWidth={3}
              />
            </span>
            <div className="flex-1">
              <div className="font-medium text-ink">{it.label}</div>
              {it.note && (
                <div className="text-[12px] text-muted">{it.note}</div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
