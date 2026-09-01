import React from "react";
import { Lock, Bitcoin, Zap } from "lucide-react";

export default function UnlockPrompt({ product, onUnlock, busy }) {
  return (
    <div className="border border-border bg-parchment rounded-sm p-8 text-center max-w-md mx-auto">
      <div className="flex justify-center mb-4">
        <span className="flex items-center justify-center w-12 h-12 rounded-full border border-border text-lead">
          <Lock size={20} />
        </span>
      </div>
      <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-lead mb-2">
        This content is protected
      </p>
      <h2 className="font-heading text-2xl font-light text-ink mb-2">
        Unlock “{product?.title || "Premium Content"}”
      </h2>
      <p className="font-body text-sm text-lead mb-6">
        Unlock for{" "}
        <span className="text-ink font-medium">
          ${product?.price ?? 5} {product?.currency || "USD"}
        </span>{" "}
        with Bitcoin or Lightning. Instant access, non-custodial, no third-party processor.
      </p>
      <button
        onClick={onUnlock}
        disabled={busy}
        className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.2em] uppercase border border-verdigris text-verdigris px-6 py-3 rounded-sm hover:bg-verdigris hover:text-parchment transition-colors duration-300 disabled:opacity-50"
      >
        <Lock size={14} />
        {busy ? "Creating invoice…" : "Unlock Content"}
      </button>
      <div className="flex items-center justify-center gap-4 mt-5 text-lead/50">
        <span className="flex items-center gap-1 font-mono text-[10px] tracking-wide">
          <Zap size={11} /> Lightning
        </span>
        <span className="flex items-center gap-1 font-mono text-[10px] tracking-wide">
          <Bitcoin size={11} /> On-chain
        </span>
      </div>
    </div>
  );
}