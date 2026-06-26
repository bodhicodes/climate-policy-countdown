export interface MilestoneSource {
  label: string;
  url: string;
}

export interface MilestoneStat {
  label: string;
  value: string;
  context: string;
  progress: number | null;
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  summary?: string;
  insight?: string;
  date: string;
  status: "met" | "at_risk" | "missed" | "upcoming";
  category: string;
  region: string;
  era?: "past" | "now" | "crunch" | "beyond";
  stats?: MilestoneStat[];
  source?: MilestoneSource;
}
