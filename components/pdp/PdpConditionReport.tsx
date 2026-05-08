import { ShieldCheck } from "lucide-react";

type Score = {
  label: string;
  score: number; // 0–100
};

const SCORES: Score[] = [
  { label: "Engine Condition", score: 92 },
  { label: "Transmission", score: 95 },
  { label: "Chassis & Frame", score: 88 },
  { label: "Cab & Interior", score: 90 },
  { label: "Electrics & Telematics", score: 96 },
  { label: "Tyres & Wheels", score: 75 },
];

/**
 * 0–59  → Poor (red)
 * 60–69 → Fair (amber)
 * 70–79 → Good (orange-amber)
 * 80–89 → Very Good (green-amber blend; we keep it green)
 * 90+   → Excellent (green)
 *
 * To stay on-brand we use:
 *   Excellent / Very Good → secondary-blue
 *   Good                  → sand (our warm orange-yellow)
 *   Fair / Poor           → red
 */
function rating(s: number) {
  if (s >= 90) return { label: "Excellent", tone: "secondary" } as const;
  if (s >= 80) return { label: "Very Good", tone: "secondary" } as const;
  if (s >= 70) return { label: "Good", tone: "sand" } as const;
  if (s >= 60) return { label: "Fair", tone: "sand" } as const;
  return { label: "Poor", tone: "red" } as const;
}

function toneClasses(tone: ReturnType<typeof rating>["tone"]) {
  switch (tone) {
    case "secondary":
      return { bar: "bg-secondary", text: "text-secondary" };
    case "sand":
      return { bar: "bg-sand-400", text: "text-sand-500" };
    case "red":
      return { bar: "bg-red-500", text: "text-red-600" };
  }
}

export default function PdpConditionReport() {
  return (
    <div>
      {/* Score bars in a 2-column grid */}
      <div className="grid sm:grid-cols-2 gap-x-6 gap-y-5">
        {SCORES.map((s) => {
          const r = rating(s.score);
          const tc = toneClasses(r.tone);
          return (
            <div
              key={s.label}
              className="rounded-lg border border-line bg-white p-4"
            >
              <div className="text-[11px] uppercase tracking-widest font-bold text-muted mb-3">
                {s.label}
              </div>
              {/* Bar track */}
              <div className="relative h-1.5 rounded-full bg-line overflow-hidden">
                <div
                  className={`absolute inset-y-0 left-0 rounded-full ${tc.bar}`}
                  style={{ width: `${s.score}%` }}
                />
              </div>
              {/* Score label */}
              <div className="mt-2.5 text-[13px] font-bold">
                <span className={tc.text}>
                  {s.score} / 100 — {r.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer note */}
      <div className="mt-5 flex items-start gap-3 rounded-lg border border-secondary/20 bg-secondary/5 p-4">
        <span className="inline-flex h-8 w-8 rounded-md bg-secondary/15 items-center justify-center shrink-0">
          <ShieldCheck className="h-4 w-4 text-secondary" />
        </span>
        <div className="text-[13px] text-ink/85 leading-relaxed">
          <span className="font-bold text-ink">
            Famco Approved.
          </span>{" "}
          This vehicle has been fully inspected by our certified FAMCO
          technicians. The full inspection report, including photographs of all
          assessed areas, is available upon request or can be downloaded after
          registration.
        </div>
      </div>
    </div>
  );
}
