# Climate Policy Countdown Tracker

## What this is

A single-page Next.js app that tracks critical climate policy deadlines. Each milestone shows a status (met, at risk, missed, upcoming), verified stats with sources, and data visualizations. Dark theme, data-heavy, sharp edges.

**Stack:** Next.js 14 + Tailwind CSS + TypeScript + d3 (for charts)

## Data Model

The core type is in `src/data/types.ts`. Every component renders from this shape:

```typescript
interface Milestone {
  id: string;
  title: string;
  description: string;
  summary?: string;
  insight?: string;
  date: string; // ISO date
  status: "met" | "at_risk" | "missed" | "upcoming";
  category: string;
  region: string;
  era?: "past" | "now" | "crunch" | "beyond";
  stats?: { label: string; value: string; context: string; progress: number | null }[];
  source?: { label: string; url: string };
}
```

Milestones live in `src/data/milestones.json`. One example is included. You need to research and add 4 more.

## Design System

> **TODO:** Paste your Claude Design output here after running Prompt 1.

When you have your design tokens, update `tailwind.config.ts` with:
- Custom colors (background, surface, accent, status colors)
- Font families (display + body)
- Any spacing extensions

### Constraints (non-negotiable)

- Background: pure black (#000) to near-black (#0a0a0a)
- Accent color: lime/chartreuse (#c5e84d)
- Status colors: emerald = met, amber = at risk, red = missed, lime = upcoming
- Typography: Space Grotesk for display/headings, Geist for body text
- Minimum text size: `text-sm` (14px). Nothing smaller.
- No opacity on text. Use distinct color values for readability.
- No rounded corners. All sharp edges.
- Borders: white at 7-10% opacity
- Dot-grid pattern on card backgrounds (radial-gradient, ~22px spacing)
- Pure Tailwind utility classes. No CSS modules, no inline styles for layout.

## Components to Build

You will build these with Claude Code. Each one is a React component in `src/components/countdown/`.

### 1. CountdownHero (`hero.tsx`)
- Large countdown number: days remaining until Dec 31, 2030
- Subtitle text explaining the 43% reduction target
- 4-cell scorecard grid: count of each status (met / at risk / missed / upcoming)
- Each scorecard cell uses its status color
- Uses `useState` + `useEffect` for the countdown

### 2. MilestoneCard (`milestone-card.tsx`)
- Status badge (icon + label) with status color
- Title (large, bold)
- Date + relative time ("6mo ago", "in 4y")
- Summary paragraph
- 3-column stats grid: label (small uppercase), value (large bold), context (small muted)
- Insight callout with colored left border accent
- Footer: category + region tags, source link
- Left accent bar matching status color

### 3. EraSection (`era-section.tsx`)
- Era header with label and descriptor
- Era names: "The Record" (past), "Live Now" (now), "The Crunch" (crunch), "Beyond 2030" (beyond)
- Contains a vertical stack of MilestoneCards

### 4. StatBlock (`stat-block.tsx`)
- Individual stat display within a MilestoneCard
- Shows label, value, context
- Optional progress bar when `progress` is not null

### 5. Charts (`charts/` directory)
Each milestone can have a data visualization. Build these as needed:
- `scenario-bar.tsx` — d3 bar chart comparing values (e.g., carbon prices across markets)
- `waffle.tsx` — 10x10 grid chart, pure SVG (e.g., share of emissions)
- `emissions-gap.tsx` — d3 line chart with historical data + projections
- More chart types as your data requires

## Page Structure

`src/app/page.tsx` composes everything:
1. Import milestones from JSON
2. Sort by date
3. Group by era
4. Render: CountdownHero → EraSection (past) → EraSection (now) → EraSection (crunch) → EraSection (beyond)

## Milestone Research

Use Perplexity (or any research tool) to find 4 more milestones. The starter includes one example (EU CBAM). You need milestones that cover:

- [ ] **One "past" era milestone** — a deadline that has already passed (e.g., climate finance goals, previous COP commitments)
- [ ] **One more "now" milestone** — something happening in 2025-2026 (e.g., US Paris withdrawal, new carbon markets)
- [ ] **One "crunch" milestone** — a 2028-2030 deadline (e.g., the 43% global emissions reduction target)
- [ ] **One "beyond" milestone** — a post-2030 target (e.g., global net-zero 2050)

### Research Prompt Template (for Perplexity)

```
I need verified, sourced data on [MILESTONE NAME AND DATE].

Research this and give me the output as a single JSON code block (```json) matching this exact structure:

{
  id: string (kebab-case),
  era: "past" | "now" | "crunch" | "beyond",
  title: string,
  description: string (one sentence),
  summary: string (3-5 sentences, factual, sourced),
  insight: string (1-2 sentences, the "so what"),
  date: "YYYY-MM-DD",
  status: "met" | "at_risk" | "missed" | "upcoming",
  category: string,
  region: string,
  source: { label: string, url: string },
  stats: [
    { label: string, value: string, context: string, progress: number | null }
  ]
}

I need exactly 3 stats. Each stat must have a specific number or value, not a vague description. Every claim must be traceable to a named source.

Output ONLY the ```json code block. No commentary before or after.
```

### Verification Prompt Template

```
Fact-check these three claims about [MILESTONE]. For each one, confirm or correct with a source:

1. [STAT 1]
2. [STAT 2]
3. [STAT 3]

For any correction, give me the updated JSON field.
```

## Claude Design Prompts

Run these three prompts in Claude Design to generate your design system. Send them as separate messages.

### Prompt 1: Context + Design System

```
I'm building a climate policy countdown tracker — a single-page Next.js app with pure Tailwind CSS. Dark theme, sharp edges, data-heavy.

Before we design any components, give me a foundational design system I can build on:

- Color palette: background (black to near-black), surface/card color, border color, text hierarchy (primary white, secondary, muted). One accent: lime/chartreuse (#c5e84d). Four status colors: emerald (met), amber (at risk), red (missed), lime (upcoming).
- Typography: Space Grotesk for display/headings, Geist for body. Scale from page title down to labels. Minimum text size is text-sm (14px) — nothing smaller. No opacity tricks on text, just distinct color values for readability.
- Spacing: a consistent scale for padding, gaps, section spacing.
- Borders: white at low opacity (7-10%). No rounded corners anywhere.
- Buttons and badges: status badges, category tags, source links.

Keep it tight. This is the foundation — I'll ask for components next.
```

### Prompt 2: Data + Components

```
Great. Now here's the data model these components will render:

[Paste the Milestone interface from src/data/types.ts]

Using the design system you just made, design these components:

1. CountdownHero — large countdown number (days to Dec 31 2030), subtitle text, and a 4-cell scorecard grid showing the count of each status. Each cell uses its status color.

2. MilestoneCard — status badge, title, date + relative time, summary, 3-column stats grid, insight callout with left border accent, footer with category/region tags and source link.

3. EraSection — section header with era label and descriptor. Contains a stack of MilestoneCards.

Use the design system tokens. These will go to Claude Code as React + Tailwind components.
```

### Prompt 3: Full Page Composition

```
Now compose everything into a full page layout.

The page has:
- CountdownHero at the top
- Then 4 EraSections stacked vertically: "The Record" (past), "Live Now" (now), "The Crunch" (crunch), "Beyond 2030" (beyond)
- Each era has 1-2 milestone cards

Show me the full page mockup with real content from your example milestones.

Use a dot-grid subtle pattern (radial-gradient, ~22px) on card backgrounds. Page background is pure black.
```

## Deployment

When your app builds locally (`npm run dev` looks good):

1. Push to GitHub
2. Connect to Vercel (vercel.com → Import Project → select repo)
3. Deploy. Default Next.js settings work.
