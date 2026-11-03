import React, { useState } from "react";
import { Copy, Check } from "lucide-react";

const AI_PROMPT = `You are writing ONE character file for Ooga Booga Land, a plain-JavaScript WebGL2 game. I will paste a real character file at the end: treat it as the exact template.

Output ONLY the finished file contents. No explanation, no markdown code fences.

Hard rules:
- Keep the same wrapper and the same key names as my template. Change only the values.
- Plain data only: no functions, loops, callbacks, getters, spread operators, template strings, imports, DOM access, network calls or console output.
- Keep "handle" and "github" exactly as I give them below.
- "voice.poke" is one short, non-empty line.
- "voice.idle" is a list of 1 to 24 short lines of plain text, 160 characters each at most.
- Do not invent new keys. If you are unsure whether a look option exists, use one that already appears in my template.

Values to use:
  handle: "[your-github-username]"
  github: "[your-github-username]"
  display: "[optional prettier name]"

My caveman: [describe hair, skin tone, face, build, hat, and the catchphrase or lines you want them to say]

--- MY TEMPLATE ---
[paste a real file from src/characters/ here]
--- END TEMPLATE ---`;

export default function OogaPromptCard() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(AI_PROMPT);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="mt-6 rounded-sm border border-border bg-white dark:bg-card overflow-hidden">
      <div className="flex items-center justify-between px-5 py-3 border-b border-border">
        <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-lead">
          The prompt to paste
        </span>
        <button
          onClick={copy}
          className="inline-flex items-center gap-1.5 font-mono text-[10px] tracking-[0.15em] uppercase px-2.5 py-1.5 rounded-sm border border-border text-lead hover:text-ink hover:border-[#B45309] transition-colors duration-300"
        >
          {copied ? <Check size={11} /> : <Copy size={11} />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="px-5 py-4 overflow-x-auto font-mono text-[11px] leading-relaxed text-lead whitespace-pre">
        {AI_PROMPT}
      </pre>
      <p className="px-5 pb-4 font-body text-xs text-lead/70 leading-relaxed">
        Fill in the two bracketed names before sending. Anything still in square brackets is a
        placeholder for you to replace.
      </p>
    </div>
  );
}