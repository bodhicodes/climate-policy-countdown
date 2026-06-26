export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center p-8">
      <div className="max-w-lg w-full flex flex-col items-center text-center gap-8">
        <div className="flex flex-col gap-3">
          <h1 className="text-4xl font-bold tracking-tight">
            Climate Policy Countdown
          </h1>
          <p className="text-zinc-400 text-lg">
            A live tracker of the climate deadlines that matter. What&apos;s been
            met, what&apos;s slipping, and what&apos;s at stake.
          </p>
        </div>

        <div className="w-full border border-white/10 p-6 flex flex-col gap-4">
          <p className="text-zinc-300 text-base">
            This is a starter template from{" "}
            <a
              href="https://studio.terra.do"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white underline underline-offset-4"
            >
              Terra Studio
            </a>
            , the AI intensive for climate professionals. Open{" "}
            <span className="text-white font-mono">CLAUDE.md</span> to get the
            full build brief, data model, design prompts, and research
            templates.
          </p>
          <div className="flex flex-col gap-2 text-base">
            <a
              href="https://studio.terra.do/free-courses"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-white transition-colors"
            >
              Free courses &rarr;
            </a>
            <a
              href="https://studio.terra.do/intensive"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-white transition-colors"
            >
              6-week intensive &rarr;
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-2 text-zinc-500 text-base">
          <p>
            Built by{" "}
            <a
              href="https://www.project3rdrock.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-white transition-colors"
            >
              Bodhi Debnath / Project 3rd Rock
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
