import type { Milestone } from "@/data/types";
import ScenarioBar from "@/components/countdown/charts/scenario-bar";

const STATUS = {
  met: {
    label: "Met",
    dotColor: "#10b981",
    textClass: "text-emerald-400",
    bgStyle: "rgba(16,185,129,0.10)",
    borderStyle: "rgba(16,185,129,0.25)",
  },
  at_risk: {
    label: "At Risk",
    dotColor: "#f59e0b",
    textClass: "text-amber-400",
    bgStyle: "rgba(245,158,11,0.10)",
    borderStyle: "rgba(245,158,11,0.25)",
  },
  missed: {
    label: "Missed",
    dotColor: "#ef4444",
    textClass: "text-red-400",
    bgStyle: "rgba(239,68,68,0.10)",
    borderStyle: "rgba(239,68,68,0.25)",
  },
  upcoming: {
    label: "Upcoming",
    dotColor: "#c5e84d",
    textClass: "text-cpc-lime",
    bgStyle: "rgba(197,232,77,0.10)",
    borderStyle: "rgba(197,232,77,0.28)",
  },
} as const;

const CLIMATE_FINANCE_BARS = [
  { label: "$100B goal",  value: 100,   color: "#71717a", annotation: "$100B",   dimmed: true },
  { label: "2022 actual", value: 115.9, color: "#34d399", annotation: "$115.9B" },
  { label: "2024 actual", value: 136.7, color: "#34d399", annotation: "$136.7B" },
  { label: "2035 goal",   value: 300,   color: "#60a5fa", annotation: "$300B",   dimmed: true },
];

function formatDate(iso: string): string {
  return new Date(iso)
    .toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })
    .toUpperCase();
}

interface MilestoneFeatureProps {
  milestone: Milestone;
}

export default function MilestoneFeature({ milestone }: MilestoneFeatureProps) {
  const st = STATUS[milestone.status];
  const stats = milestone.stats ?? [];

  return (
    <div className="border border-white/10 bg-neutral-900 p-8">

      {/* Header: status badge + date */}
      <div className="flex items-start justify-between gap-6 mb-6">
        <span
          className={`inline-flex items-center gap-2 border px-3 py-1.5 text-sm font-medium uppercase tracking-widest shrink-0 ${st.textClass}`}
          style={{ background: st.bgStyle, borderColor: st.borderStyle }}
        >
          <span
            className="w-1.5 h-1.5 shrink-0"
            style={{ background: st.dotColor }}
          />
          {st.label}
        </span>
        <div className="font-mono text-sm text-neutral-100 tracking-widest text-right">
          {formatDate(milestone.date)}
        </div>
      </div>

      {/* Title */}
      <h3 className="font-display text-2xl font-medium leading-snug tracking-tight text-neutral-100 mb-4 max-w-[60ch]">
        {milestone.title}
      </h3>

      {/* Summary */}
      <p className="font-body text-base leading-relaxed text-neutral-400 mb-8 max-w-[72ch]">
        {milestone.summary ?? milestone.description}
      </p>

      {/* Stats grid */}
      {stats.length > 0 && (
        <div
          className="grid border-t border-b border-white/10 mb-6"
          style={{ gridTemplateColumns: `repeat(${stats.length}, 1fr)` }}
        >
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={[
                "py-5",
                i === 0 ? "pr-6" : i === stats.length - 1 ? "pl-6" : "px-6",
                i < stats.length - 1 ? "border-r border-white/10" : "",
              ].join(" ")}
            >
              <div className="font-body text-sm font-medium uppercase tracking-widest text-neutral-500 mb-2">
                {stat.label}
              </div>
              <div className="font-mono text-4xl font-medium leading-tight tracking-tight text-neutral-100 mb-1">
                {stat.value}
              </div>
              <div className="font-body text-sm text-neutral-500">{stat.context}</div>
              {stat.progress !== null && (
                <div className="mt-3 h-px bg-white/10">
                  <div
                    className="h-full bg-cpc-lime"
                    style={{ width: `${stat.progress}%` }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Climate finance chart — only for this milestone */}
      {milestone.id === "climate-finance-100b" && (
        <div className="mb-6">
          <ScenarioBar
            bars={CLIMATE_FINANCE_BARS}
            yMax={340}
            yLabel="Climate finance — USD billion / year"
            caption="The $100B goal was met three years late, then exceeded."
          />
        </div>
      )}

      {/* Insight callout */}
      {milestone.insight && (
        <div className="border-l-2 border-cpc-lime pl-5 py-1 mb-7">
          <div className="font-mono text-sm text-cpc-lime uppercase tracking-widest mb-2">
            Insight
          </div>
          <p className="font-body text-base leading-relaxed text-neutral-100 max-w-[72ch]">
            {milestone.insight}
          </p>
        </div>
      )}

      {/* Footer: tags + source */}
      <div className="flex items-center justify-between flex-wrap gap-4 pt-5 border-t border-white/10">
        <div className="flex gap-2 flex-wrap">
          <span className="bg-[#080808] border border-white/10 font-mono text-sm text-neutral-400 px-2.5 py-1.5">
            {milestone.category}
          </span>
          <span className="bg-[#080808] border border-white/10 font-mono text-sm text-neutral-400 px-2.5 py-1.5">
            {milestone.region}
          </span>
        </div>
        {milestone.source && (
          <a
            href={milestone.source.url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-body text-sm font-medium text-cpc-lime inline-flex items-center gap-1.5 border-b border-cpc-lime/40 pb-0.5"
          >
            {milestone.source.label}
            <span className="font-mono">↗</span>
          </a>
        )}
      </div>

    </div>
  );
}
