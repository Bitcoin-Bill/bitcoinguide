import React from "react";
import { AlertTriangle, Lightbulb, Trash2 } from "lucide-react";

export default function ArgumentCard({ argument, member, proposerId, onDelete, disabled, note, analyzing }) {
  const { author_name, author, side, text } = argument;
  const displayAuthor = author_name || author;
  const isComment = side === "comment";
  const isProposer = !!proposerId && argument.author_id === proposerId;
  const canDelete = !!member && argument.author_id === member.id && !!onDelete;

  // Distinct accent per commenter (deterministic from author id) so each
  // member's arguments read as their own color scheme.
  const COMMENTER_PALETTE = [
    "#34d399", "#fbbf24", "#60a5fa", "#c084fc", "#f472b6",
    "#22d3ee", "#a3e635", "#fb923c", "#2dd4bf", "#f87171",
  ];
  const colorFor = (id) => {
    const s = String(id || "");
    let h = 0;
    for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
    return COMMENTER_PALETTE[h % COMMENTER_PALETTE.length];
  };
  const accent = argument.author_color || colorFor(argument.author_id || displayAuthor);

  return (
    <div
      className="border-l-2 pl-4 py-3"
      style={{ borderColor: accent }}
    >
      <div className="flex items-center gap-2 mb-1.5">
        {argument.author_avatar ? (
          <img
            src={argument.author_avatar}
            alt={displayAuthor}
            className="w-5 h-5 rounded-full object-cover shrink-0"
          />
        ) : null}
        <span
          className="font-mono text-[10px] tracking-[0.2em] uppercase px-2 py-0.5 rounded-sm"
          style={{ backgroundColor: `${accent}22`, color: accent }}
        >
          {isComment ? "Comment" : isProposer ? "Proposer" : "Challenger"}
        </span>
        <span className="font-body text-xs font-medium" style={{ color: accent }}>
          {displayAuthor}
        </span>
        {canDelete && (
          <button
            type="button"
            onClick={() => onDelete(argument.id)}
            disabled={disabled}
            title="Delete this comment"
            className="ml-auto inline-flex items-center gap-1 font-mono text-[10px] text-destructive/70 hover:text-destructive hover:opacity-70 transition-opacity duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Trash2 size={11} />
          </button>
        )}
      </div>

      <p className="font-body text-sm text-ink leading-relaxed whitespace-pre-wrap">
        {text}
      </p>

      {analyzing && (
        <div className="mt-3 flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] uppercase text-lead/60">
          <span className="inline-block w-3 h-3 border border-lead/40 border-t-lead rounded-full animate-spin" />
          Mediator analyzing…
        </div>
      )}

      {note && (
        <div className="mt-3 bg-secondary/40 border border-border rounded-sm p-3 space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-lead">
              Mediator note
            </span>
            <span className="font-mono text-[10px] text-ink">
              {note.validity_score}/100
            </span>
          </div>

          {note.fallacies?.length > 0 && (
            <div className="flex items-start gap-2">
              <AlertTriangle size={12} className="text-copper shrink-0 mt-0.5" />
              <div className="flex flex-wrap gap-1.5">
                {note.fallacies.map((f, i) => (
                  <span
                    key={i}
                    className="font-mono text-[10px] tracking-wide uppercase border border-copper/40 text-copper px-1.5 py-0.5 rounded-sm"
                  >
                    {f}
                  </span>
                ))}
              </div>
            </div>
          )}

          {note.unsupported_premises?.length > 0 && (
            <ul className="text-xs text-lead space-y-1 pl-5 list-disc">
              {note.unsupported_premises.map((p, i) => (
                <li key={i}>{p}</li>
              ))}
            </ul>
          )}

          {note.suggestion && (
            <div className="flex items-start gap-2">
              <Lightbulb size={12} className="text-verdigris shrink-0 mt-0.5" />
              <p className="font-body text-xs text-lead italic">
                {note.suggestion}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}