import React, { useState } from "react";
import { BookOpen, X, ArrowRightLeft, LogOut, GitFork, Trash2, ThumbsUp, Gavel } from "lucide-react";

export default function DebateRules() {
  const [open, setOpen] = useState(false);

  const rules = [
    {
      icon: ThumbsUp,
      title: "For / Against",
      body: "Every debate has two sides — for and against the claim. The proposer opens with their stance; the challenger takes the opposite. When you post or take a slot, you're arguing one side.",
    },
    {
      icon: ArrowRightLeft,
      title: "Engage",
      body: "If a slot is open (proposer or challenger), take it to join the debate. Your opening argument claims that side and locks you in as a participant.",
    },
    {
      icon: LogOut,
      title: "Disengage",
      body: "Step away from your slot at any time — someone else can then take over your side. Your arguments stay on the record.",
    },
    {
      icon: GitFork,
      title: "Fork",
      body: "Start your own debate from an existing one. Your opening argument becomes the new headline, and the fork notes which debate it came from.",
    },
    {
      icon: Trash2,
      title: "Delete",
      body: "Creators can delete their own debate within 24 hours of posting. After that, it stays — your words are on the record.",
    },
    {
      icon: Gavel,
      title: "Mediator",
      body: "Click \"Show mediation\" on any debate with arguments to run a neutral logic check — it flags fallacies, unsupported premises, and gives a validity score plus one tip to strengthen your case.",
    },
  ];

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-1.5 font-mono text-[10px] tracking-[0.2em] uppercase border border-border text-lead px-3 py-1.5 rounded-sm hover:text-ink hover:border-ink transition-colors duration-300"
      >
        <BookOpen size={12} />
        Rules
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-ink/40 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <div
            className="relative w-full max-w-lg max-h-[85vh] overflow-y-auto bg-parchment border border-border rounded-sm p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close rules"
              className="absolute top-3 right-3 flex items-center justify-center h-7 w-7 rounded text-lead hover:text-ink hover:bg-secondary/60 transition-colors duration-300"
            >
              <X size={16} />
            </button>

            <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-verdigris mb-1">
              Member guide
            </p>
            <h2 className="font-heading text-2xl font-light text-ink mb-4">
              Debate Rules
            </h2>

            <div className="space-y-4">
              {rules.map(({ icon: Icon, title, body }) => (
                <div key={title} className="flex items-start gap-3">
                  <div className="shrink-0 mt-0.5 flex items-center justify-center h-7 w-7 rounded-sm border border-verdigris/40 bg-verdigris/5">
                    <Icon size={13} className="text-verdigris" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-heading text-sm text-ink mb-0.5">{title}</p>
                    <p className="font-body text-[13px] text-lead leading-relaxed">
                      {body}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 pt-4 border-t border-border">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="font-mono text-[10px] tracking-[0.2em] uppercase border border-verdigris text-verdigris px-3 py-1.5 rounded-sm hover:bg-verdigris hover:text-parchment transition-colors duration-300"
              >
                Got it
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}