# Climate Policy Countdown

A live visual tracker of the world's most important climate deadlines. What's been met, what's slipping, and what's at stake.

Built live during a [Terra Studio](https://studio.terra.do) event using three AI tools in parallel: Claude Design for the design system, Perplexity for policy research and verification, and Claude Code for component generation.

## Get started

This is a starter template. The data model, design constraints, component specs, research prompts, and Claude Design prompts are all in `CLAUDE.md`. That file is your build brief.

```bash
pnpm install
pnpm dev
```

Open `CLAUDE.md` and follow the steps: run the design prompts, research your milestones, then build the components with Claude Code.

## Stack

Next.js 14, Tailwind CSS, TypeScript, d3 (d3-scale, d3-shape)

## What's included

- Data model and TypeScript interfaces (`src/data/types.ts`)
- One example milestone with verified stats (`src/data/milestones.json`)
- Starter page with project links (`src/app/page.tsx`)
- Tailwind config with TODO placeholders for your design tokens
- Full `CLAUDE.md` workbook: component specs, Perplexity prompt templates, Claude Design prompts, deployment instructions

## What you build

- Countdown hero with days remaining until 2030
- Milestone cards with status badges, stats grids, and insight callouts
- Era sections grouping milestones by timeline
- d3 data visualizations per milestone
- 4 more researched and verified milestones

## Links

- [Terra Studio](https://studio.terra.do) — AI intensive for climate professionals
- [Free courses](https://studio.terra.do/free-courses)
- [6-week intensive](https://studio.terra.do/intensive)
- [Project 3rd Rock](https://www.project3rdrock.com/) — the reference build