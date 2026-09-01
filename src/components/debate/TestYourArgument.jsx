import React, { useState } from "react";
import { FlaskConical, Loader2, RotateCcw } from "lucide-react";
import { base44 } from "@/api/base44Client";

export default function TestYourArgument({ member }) {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [err, setErr] = useState(null);

  const analyze = async () => {
    if (!text.trim() || analyzing) return;
    setAnalyzing(true);
    setErr(null);
    setResult(null);
    try {
      const prompt = `You are a strict, objective logic mediator. Analyze the following argument and expose the holes in its reasoning. Identify any specific logical fallacies present (e.g. ad hominem, strawman, false dichotomy, equivocation, hasty generalization, non sequitur, appeal to authority, circular reasoning, begging the question). List any unsupported or unverified premises. List the strongest counterarguments an opponent could raise — the real weaknesses. Rate the logical validity from 0 to 100. Provide one concise, neutral suggestion for strengthening the argument. Be strict and impartial — do not agree or disagree with the conclusion, only assess its logical structure and surface its vulnerabilities.

Argument: "${text.trim()}"

Return only the JSON.`;
      const res = await base44.integrations.Core.InvokeLLM({
        prompt,
        response_json_schema: {
          type: "object",
          properties: {
            fallacies: { type: "array", items: { type: "string" } },
            unsupported_premises: { type: "array", items: { type: "string" } },
            counterarguments: { type: "array", items: { type: "string" } },
            validity_score: { type: "number" },
            suggestion: { type: "string" },
          },
        },
      });
      setResult(typeof res === "string" ? JSON.parse(res) : res);
    } catch (e) {
      setErr(e?.message || "Analysis failed — try again.");
    } finally {
      setAnalyzing(false);
    }
  };

  const reset = () => {
    setText("");
    setResult(null);
    setErr(null);
  };

  const List = ({ label, items }) =>
    items && items.length > 0 ? (
      <div className="mb-3">
        <p className="font-mono text-[9px] tracking-[0.2em] uppercase text-lead/60 mb-1">
          {label}
        </p>
        <ul className="space-y-1">
          {items.map((it, i) => (
            <li key={i} className="font-body text-sm text-ink/90 leading-snug flex gap-2">
              <span className="text-verdigris shrink-0">•</span>
              <span>{it}</span>
            </li>
          ))}
        </ul>
      </div>
    ) : null;

  const score = result?.validity_score;
  const scoreColor =
    score == null
      ? "text-lead"
      : score >= 75
      ? "text-verdigris"
      : score >= 45
      ? "text-copper"
      : "text-destructive";

  return (
    <div className="border border-border bg-parchment rounded-sm p-5 md:p-6">
      <div className="flex items-center gap-2 mb-1">
        <FlaskConical size={16} className="text-verdigris" />
        <p className="font-mono text-xs tracking-[0.2em] uppercase text-lead">
          Private — nothing is posted
        </p>
      </div>
      <h3 className="font-heading text-2xl md:text-3xl font-light text-ink leading-tight mb-2">
        Test Your Argument
      </h3>
      <p className="font-body text-sm text-lead/80 leading-relaxed mb-5 max-w-xl">
        Write out your argument and run it through the logic mediator before you
        post it publicly. It will flag fallacies, unsupported premises, and the
        strongest counterarguments — the holes in your own reasoning — so you can
        tighten it up. This stays entirely on your screen; nothing is saved or
        published.
      </p>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={5}
        placeholder="State your full argument here — the claim, your premises, and your reasoning…"
        className="w-full bg-parchment border border-border rounded-sm px-3 py-2 font-body text-sm text-ink placeholder:text-lead/40 focus:outline-none focus:border-verdigris resize-none mb-3"
      />

      <div className="flex items-center gap-3 flex-wrap">
        <button
          onClick={analyze}
          disabled={!text.trim() || analyzing}
          className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] uppercase border border-verdigris text-verdigris px-4 py-2 rounded-sm hover:bg-verdigris hover:text-parchment transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {analyzing ? (
            <>
              <Loader2 size={14} className="animate-spin" /> Analyzing…
            </>
          ) : (
            <>
              <FlaskConical size={14} /> Run logic mediator
            </>
          )}
        </button>
        {(text || result) && (
          <button
            onClick={reset}
            disabled={analyzing}
            className="inline-flex items-center gap-1.5 font-mono text-[10px] tracking-[0.2em] uppercase text-lead hover:text-ink transition-colors duration-300 disabled:opacity-50"
          >
            <RotateCcw size={12} /> Clear
          </button>
        )}
      </div>

      {err && (
        <p className="font-body text-sm text-destructive mt-4">{err}</p>
      )}

      {result && (
        <div className="mt-5 border-t border-border pt-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="border-l-2 border-verdigris/40 pl-3">
              <p className="font-mono text-[9px] tracking-[0.15em] uppercase text-lead/60 mb-0.5">
                Logical validity
              </p>
              <p className={`font-heading text-3xl leading-none ${scoreColor}`}>
                {score != null ? score : "—"}
                <span className="text-base text-lead/50">/100</span>
              </p>
            </div>
          </div>

          <List label="Logical fallacies" items={result.fallacies} />
          <List label="Unsupported premises" items={result.unsupported_premises} />
          <List label="Holes — strongest counterarguments" items={result.counterarguments} />

          {result.suggestion && (
            <div className="border border-verdigris/30 bg-verdigris/5 rounded-sm px-3 py-2.5 mt-2">
              <p className="font-mono text-[9px] tracking-[0.2em] uppercase text-verdigris mb-1">
                How to strengthen it
              </p>
              <p className="font-body text-sm text-ink/90 leading-relaxed">
                {result.suggestion}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}