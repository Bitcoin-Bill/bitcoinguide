import React from "react";

const PRIMARY =
  "mt-1 rounded-sm bg-[#B45309] px-5 py-2.5 font-mono text-xs uppercase tracking-[0.15em] text-white transition hover:bg-[#92400E]";

const LABEL = "font-mono text-[10px] tracking-[0.25em] uppercase text-[#F7931A]";

export default function GameOverlay({
  status,
  stageIndex,
  stageName,
  totalStages,
  bossStage,
  score,
  high,
  onStart,
  onNext,
  onResume,
}) {
  if (status === "playing") return null;

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[#0b1120]/90 px-6 text-center">
      {status === "ready" && (
        <>
          <p className={LABEL}>
            Stage 1 of {totalStages} · {stageName}
          </p>
          <h2 className="font-heading text-2xl md:text-3xl text-parchment">FUD Patrol</h2>
          <p className="max-w-sm font-body text-sm text-parchment/70">
            Run left to right, dart the critics in your way, and reach the flag. Crack the gold ?
            crates for a random tool — jetpack, spring boots, turbo legs, a life or a coin cache.
            The last stage ends at the gold boss: Peter Schiff.
          </p>
          <button onClick={onStart} className={PRIMARY}>
            Start stage 1
          </button>
          <p className="font-mono text-[10px] tracking-[0.15em] uppercase text-parchment/50">
            ← → run · Space jump · J / Z fire · P pause · M mute
          </p>
          <p className="font-mono text-[10px] tracking-[0.15em] uppercase text-parchment/40">
            Best {high || 0}
          </p>
          <p className="max-w-sm font-body text-[11px] leading-snug text-parchment/40">
            An original game in the spirit of 1980s consoles — not a historical re-release. Every
            critic line here is fictional game dialogue, not a quotation.
          </p>
        </>
      )}

      {status === "paused" && (
        <>
          <h2 className="font-heading text-2xl md:text-3xl text-parchment">Paused</h2>
          <button onClick={onResume} className={PRIMARY}>
            Resume
          </button>
          <p className="font-mono text-[10px] tracking-[0.15em] uppercase text-parchment/50">
            P or Enter to resume
          </p>
        </>
      )}

      {status === "clear" && (
        <>
          <p className={LABEL}>{stageName} · flag reached</p>
          <h2 className="font-heading text-2xl md:text-3xl text-parchment">Stage clear</h2>
          <p className="font-mono text-xs tracking-[0.2em] uppercase text-parchment/70">
            Score {score}
          </p>
          <button onClick={onNext} className={PRIMARY}>
            {bossStage ? "Enter the boss arena" : `Stage ${stageIndex + 2} →`}
          </button>
        </>
      )}

      {status === "over" && (
        <>
          <h2 className="font-heading text-2xl md:text-3xl text-parchment">Wiped out</h2>
          <p className="font-mono text-xs tracking-[0.2em] uppercase text-parchment/70">
            Score {score} · Best {high}
          </p>
          <button onClick={onStart} className={PRIMARY}>
            Back to stage 1
          </button>
          <p className="font-mono text-[10px] tracking-[0.15em] uppercase text-parchment/50">
            Enter or Space to restart
          </p>
        </>
      )}

      {status === "victory" && (
        <>
          <p className={LABEL}>The gold boss is down</p>
          <h2 className="font-heading text-2xl md:text-3xl text-parchment">Island saved</h2>
          <p className="font-mono text-xs tracking-[0.2em] uppercase text-parchment/70">
            Final score {score} · Best {high}
          </p>
          <button onClick={onStart} className={PRIMARY}>
            Play again
          </button>
        </>
      )}
    </div>
  );
}