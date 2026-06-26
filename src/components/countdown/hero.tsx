"use client";

import { useEffect, useState } from "react";
import type { Milestone } from "@/data/types";

interface CountdownHeroProps {
  milestones: Milestone[];
}

function getDaysRemaining(): number {
  const target = new Date("2030-12-31T23:59:59.999");
  const now = new Date();
  return Math.max(0, Math.ceil((target.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)));
}

export default function CountdownHero({ milestones }: CountdownHeroProps) {
  const [days, setDays] = useState(0);

  useEffect(() => {
    setDays(getDaysRemaining());
    const id = setInterval(() => setDays(getDaysRemaining()), 60 * 60 * 1000);
    return () => clearInterval(id);
  }, []);

  const counts = {
    met: milestones.filter((m) => m.status === "met").length,
    at_risk: milestones.filter((m) => m.status === "at_risk").length,
    missed: milestones.filter((m) => m.status === "missed").length,
    upcoming: milestones.filter((m) => m.status === "upcoming").length,
  };

  return (
    <div className="border border-white/10 bg-[#080808]">
      {/* 1 · Title block */}
      <div className="px-8 py-10">
        <p className="font-body text-sm font-medium uppercase tracking-widest text-cpc-lime mb-3">
          Climate Policy Countdown
        </p>
        <h1 className="font-display text-4xl font-bold leading-tight tracking-tight text-neutral-100 mb-4">
          2030 Global Emissions Reduction Target
        </h1>
        <p className="font-body text-base leading-relaxed text-neutral-400 max-w-2xl">
          Global greenhouse gas emissions must decline by 43% from 2019 levels to
          keep a 1.5°C pathway viable. This is the timeline.
        </p>
      </div>

      {/* 2 · Countdown */}
      <div className="border-t border-white/10 px-8 py-16 flex items-baseline gap-8 flex-wrap">
        <span
          className="font-mono font-medium tabular-nums leading-none tracking-[-0.05em] text-neutral-100"
          style={{ fontSize: "clamp(4.5rem, 18vw, 13.75rem)" }}
        >
          {days.toLocaleString("en-US")}
        </span>
        <span className="font-body text-xl text-neutral-400">
          days remaining
        </span>
      </div>

      {/* 3 · Scorecard */}
      <div className="border-t border-white/10 grid grid-cols-4">
        <div className="px-8 py-7 border-r border-white/10">
          <div className="font-mono text-5xl font-medium leading-none tracking-tight text-emerald-400 mb-2">
            {counts.met}
          </div>
          <div className="font-body text-sm font-medium uppercase tracking-widest text-neutral-500">
            Met
          </div>
        </div>

        <div className="px-8 py-7 border-r border-white/10">
          <div className="font-mono text-5xl font-medium leading-none tracking-tight text-amber-400 mb-2">
            {counts.at_risk}
          </div>
          <div className="font-body text-sm font-medium uppercase tracking-widest text-neutral-500">
            At Risk
          </div>
        </div>

        <div className="px-8 py-7 border-r border-white/10">
          <div className="font-mono text-5xl font-medium leading-none tracking-tight text-red-400 mb-2">
            {counts.missed}
          </div>
          <div className="font-body text-sm font-medium uppercase tracking-widest text-neutral-500">
            Missed
          </div>
        </div>

        <div className="px-8 py-7">
          <div className="font-mono text-5xl font-medium leading-none tracking-tight text-cpc-lime mb-2">
            {counts.upcoming}
          </div>
          <div className="font-body text-sm font-medium uppercase tracking-widest text-neutral-500">
            Upcoming
          </div>
        </div>
      </div>
    </div>
  );
}
