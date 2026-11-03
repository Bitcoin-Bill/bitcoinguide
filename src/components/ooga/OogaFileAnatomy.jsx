import React from "react";
import { AlertTriangle } from "lucide-react";

const FIELDS = [
  {
    key: "handle",
    body: "Your caveman's name in the game. Use your GitHub username, lowercase.",
  },
  {
    key: "github",
    body: "Your GitHub username again. This is what proves the character belongs to you — the ownership check compares it to whoever opens the pull request.",
  },
  {
    key: "display",
    body: "Optional prettier name shown to players. Purely cosmetic; it does not change who owns the character.",
  },
  {
    key: "joined / lastCommit",
    body: "Timestamps in seconds. Copy the format from your template — the numbers themselves do not matter much.",
  },
  {
    key: "look",
    body: "How your caveman looks: skin colour, bald, face and build, height, hat position, eye glow. Copy the exact key names from the file you started from. Made-up keys are rejected.",
  },
  {
    key: "voice.poke",
    body: "The one line they say when someone pokes them. Required, short, plain text.",
  },
  {
    key: "voice.idle",
    body: "Between one and twenty-four short lines they say while standing around. Plain text, 160 characters max each.",
  },
];

export default function OogaFileAnatomy() {
  return (
    <div className="pb-14">
      <h2 className="font-heading text-2xl md:text-3xl font-light text-ink mb-2">
        What is actually inside the file
      </h2>
      <p className="font-body text-base text-lead leading-relaxed mb-7">
        It looks like code, but it is only a settings block. Here is every part in plain English.
      </p>

      <div className="rounded-sm border border-border bg-white dark:bg-card divide-y divide-border">
        {FIELDS.map((f) => (
          <div key={f.key} className="flex flex-col sm:flex-row gap-1 sm:gap-5 px-5 py-4">
            <code className="font-mono text-xs text-[#B45309] sm:w-40 shrink-0">{f.key}</code>
            <p className="font-body text-sm text-lead leading-relaxed flex-1">{f.body}</p>
          </div>
        ))}
      </div>

      <div className="mt-5 flex items-start gap-3 rounded-sm border border-[#B45309]/25 bg-[#B45309]/[0.06] px-5 py-4">
        <AlertTriangle size={16} className="text-[#B45309] shrink-0 mt-0.5" />
        <p className="font-body text-sm text-lead leading-relaxed">
          Only plain data goes in automatically. No functions, loops, imports or clever tricks. If you
          add hand-written drawing code instead — a custom <code className="font-mono text-xs">dress</code>{" "}
          hook, for example — a maintainer has to read and approve it by hand, which takes longer.
        </p>
      </div>
    </div>
  );
}