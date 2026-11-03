import React, { useState } from "react";
import { Sparkles, Send } from "lucide-react";
import { base44 } from "@/api/base44Client";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import ReactMarkdown from "react-markdown";
import { SITE_KNOWLEDGE, SITE_INSTRUCTIONS } from "@/lib/siteKnowledge";

const SUGGESTED = [
  "What is Bitcoin?",
  "Where can I find a hardware wallet?",
  "How do I buy Bitcoin?",
  "What books are on the site?",
  "What is the Lightning Network?",
  "How do I generate a seed with dice?",
];

export default function Faq() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const ask = async (q) => {
    const prompt = (q ?? question).trim();
    if (!prompt || loading) return;
    setLoading(true);
    setError("");
    setAnswer("");
    if (q) setQuestion(q);
    try {
      const res = await base44.integrations.Core.InvokeLLM({
        prompt:
          SITE_KNOWLEDGE +
          "\n\n" +
          SITE_INSTRUCTIONS +
          "\n\nQuestion: " +
          prompt,
      });
      setAnswer(typeof res === "string" ? res : res?.answer || String(res));
    } catch (e) {
      setError("Something went wrong reaching the AI. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-parchment">
      <Navbar />

      <section className="relative pt-36 pb-10 md:pt-36 md:pb-12">
        <div className="absolute left-6 lg:left-12 top-0 bottom-0 w-px bg-border hidden md:block" />
        <div className="max-w-3xl mx-auto px-6 lg:px-12">
          <div className="flex items-center gap-3 mb-2">
            <Sparkles className="h-12 w-12 md:h-14 md:w-14 text-[#EC4899]" />
            <h1 className="font-heading text-4xl md:text-5xl font-light text-ink leading-tight">
              AI FAQ
            </h1>
          </div>
          <p className="font-heading text-lg text-lead italic mb-3">
            Ask anything about Bitcoin — or about anything you find on this site.
          </p>
          <div className="w-12 h-px bg-[var(--page-accent)]" />
        </div>
      </section>

      <section className="relative pb-24">
        <div className="absolute left-6 lg:left-12 top-0 bottom-0 w-px bg-border hidden md:block" />
        <div className="max-w-3xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col sm:flex-row gap-2 mb-4">
            <input
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") ask();
              }}
              placeholder="Type your Bitcoin question…"
              className="flex-1 rounded-md border border-border bg-card px-4 py-3 font-body text-ink placeholder:text-lead/50 focus:outline-none focus:ring-1 focus:ring-[var(--page-accent)]"
            />
            <button
              onClick={() => ask()}
              disabled={loading || !question.trim()}
              className="flex items-center justify-center gap-2 rounded-md bg-[var(--page-accent)] px-5 py-3 font-mono text-xs tracking-[0.2em] uppercase text-parchment hover:opacity-90 disabled:opacity-40 transition-opacity"
            >
              <Send size={14} />
              Ask
            </button>
          </div>

          <div className="flex flex-wrap gap-2 mb-8">
            {SUGGESTED.map((s) => (
              <button
                key={s}
                onClick={() => ask(s)}
                disabled={loading}
                className="rounded-full border border-border px-3 py-1.5 font-mono text-[11px] tracking-wide text-lead hover:text-ink hover:border-ink/30 transition-colors disabled:opacity-40"
              >
                {s}
              </button>
            ))}
          </div>

          {loading && (
            <div className="flex items-center gap-2 font-mono text-xs tracking-[0.2em] uppercase text-lead/60">
              <span className="inline-block w-3 h-3 border border-lead/40 border-t-lead rounded-full animate-spin" />
              Thinking…
            </div>
          )}

          {error && !loading && (
            <p className="font-body text-sm text-red-600">{error}</p>
          )}

          {answer && !loading && (
            <div className="rounded-lg border border-border bg-card p-6 font-body text-ink/90 text-[15px] leading-relaxed [&_p]:mb-3 [&_p:last-child]:mb-0 [&_h2]:font-heading [&_h2]:text-lg [&_h2]:mt-4 [&_h3]:font-heading [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mb-3 [&_ol]:list-decimal [&_ol]:pl-5 [&_a]:text-[var(--page-accent)] [&_a]:underline [&_code]:font-mono [&_code]:text-sm">
              <ReactMarkdown>{answer}</ReactMarkdown>
            </div>
          )}

          {!answer && !loading && !error && (
            <p className="font-mono text-xs text-lead/40 italic">
              Your answer will appear here.
            </p>
          )}
        </div>
      </section>

      <FooterSection />
    </div>
  );
}