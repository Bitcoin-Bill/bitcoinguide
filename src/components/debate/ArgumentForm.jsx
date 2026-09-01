import React, { useState } from "react";

export default function ArgumentForm({ side, onSubmit, disabled, role }) {
  const [text, setText] = useState("");
  const label = role || (side === "pro" ? "Proposer" : "Challenger");

  const submit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSubmit(text.trim());
    setText("");
  };

  return (
    <form onSubmit={submit} className="mt-2">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={disabled}
        placeholder={`Your argument (${label})…`}
        rows={3}
        className="w-full bg-parchment border border-border rounded-sm px-3 py-2 font-body text-sm text-ink placeholder:text-lead/40 focus:outline-none focus:border-verdigris resize-none disabled:opacity-50"
      />
      <button
        type="submit"
        disabled={disabled || !text.trim()}
        className="mt-2 font-mono text-[10px] tracking-[0.2em] uppercase border border-verdigris text-verdigris px-3 py-1.5 rounded-sm hover:bg-verdigris hover:text-parchment transition-colors duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Post argument
      </button>
    </form>
  );
}