import milestones from "@/data/milestones.json";
import CountdownHero from "@/components/countdown/hero";
import MilestoneFeature from "@/components/countdown/milestone-feature";
import type { Milestone } from "@/data/types";

const typed = milestones as Milestone[];
const climateFinance = typed.find((m) => m.id === "climate-finance-100b")!;

export default function Home() {
  return (
    <div className="min-h-screen bg-[#080808]">
      <main className="mx-auto max-w-6xl px-6 py-16 flex flex-col gap-8">
        <CountdownHero milestones={typed} />
        <MilestoneFeature milestone={climateFinance} />
      </main>
    </div>
  );
}
