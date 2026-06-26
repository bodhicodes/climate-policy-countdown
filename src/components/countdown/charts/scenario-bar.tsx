"use client";

import { scaleBand, scaleLinear } from "d3-scale";

export interface BarDatum {
  label: string;
  value: number;
  color: string;
  annotation?: string;
  dimmed?: boolean;
}

interface ScenarioBarProps {
  bars: BarDatum[];
  yMax: number;
  yLabel: string;
  caption: string;
}

const VB_W = 480;
const VB_H = 320;
const M = { top: 40, right: 20, bottom: 52, left: 48 };
const IW = VB_W - M.left - M.right; // 412
const IH = VB_H - M.top - M.bottom; // 228

export default function ScenarioBar({ bars, yMax, yLabel, caption }: ScenarioBarProps) {
  const x = scaleBand<string>()
    .domain(bars.map((b) => b.label))
    .range([0, IW])
    .padding(0.3);

  const y = scaleLinear()
    .domain([0, yMax])
    .range([IH, 0]);

  const ticks = y.ticks(5);
  const bw = x.bandwidth();

  return (
    <div style={{ width: "100%", maxWidth: 440 }}>
      <p
        className="text-sm font-medium uppercase tracking-widest text-cpc-lime mb-3"
        style={{ fontFamily: "var(--font-space-grotesk)" }}
      >
        {yLabel}
      </p>

      <svg
        viewBox={`0 0 ${VB_W} ${VB_H}`}
        style={{ width: "100%", display: "block", fontFamily: "var(--font-space-grotesk)" }}
        aria-label={yLabel}
      >
        <g transform={`translate(${M.left},${M.top})`}>

          {/* Gridlines + y-axis tick labels */}
          {ticks.map((t) => (
            <g key={t}>
              <line
                x1={0} x2={IW}
                y1={y(t)} y2={y(t)}
                stroke="rgba(255,255,255,0.08)"
                strokeWidth={1}
              />
              <text
                x={-10}
                y={y(t)}
                textAnchor="end"
                dominantBaseline="middle"
                fill="#71717a"
                fontSize={11}
              >
                {t}
              </text>
            </g>
          ))}

          {/* Bars */}
          {bars.map((bar) => {
            const bx = x(bar.label) ?? 0;
            const by = y(bar.value);
            const bh = IH - by;
            const fill = bar.dimmed ? "rgba(255,255,255,0.07)" : bar.color;
            const annotationText = bar.annotation ?? String(bar.value);
            const annotationFill = bar.dimmed ? "#71717a" : "#f5f5f5";

            return (
              <g key={bar.label}>
                <rect x={bx} y={by} width={bw} height={bh} fill={fill} />

                {/* Annotation above bar */}
                <text
                  x={bx + bw / 2}
                  y={by - 8}
                  textAnchor="middle"
                  dominantBaseline="auto"
                  fill={annotationFill}
                  fontSize={12}
                  fontWeight={500}
                >
                  {annotationText}
                </text>

                {/* X-axis label below */}
                <text
                  x={bx + bw / 2}
                  y={IH + 22}
                  textAnchor="middle"
                  dominantBaseline="hanging"
                  fill="#71717a"
                  fontSize={11}
                >
                  {bar.label}
                </text>
              </g>
            );
          })}

        </g>
      </svg>

      <p
        className="text-sm text-zinc-400 mt-2"
        style={{ fontFamily: "var(--font-space-grotesk)" }}
      >
        {caption}
      </p>
    </div>
  );
}
