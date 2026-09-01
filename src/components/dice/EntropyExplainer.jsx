import React from "react";
import { Sparkles, Droplet, Droplets } from "lucide-react";

const TIERS = [
  {
    Icon: Sparkles,
    label: "Ideal Seed Entropy",
    caption: "An atom drawn from the entire universe",
    detail:
      "The gold standard — randomness so vast it could never be guessed or reproduced. This is the ideal every seed aims for: an entropy source with more possible outcomes than there are atoms in the cosmos.",
    accent: "#8B5CF6",
  },
  {
    Icon: Droplets,
    label: "A Bucket of Water",
    caption: "An atom drawn from a bucket (still searchable)",
    detail:
      "Better, but still finite. The pool is larger than a single drop, yet a determined attacker could in principle search through it. Usable, but not the strongest foundation.",
    accent: "#3B82F6",
  },
  {
    Icon: Droplet,
    label: "A Single Drop",
    caption: "An atom drawn from a single drop of water",
    detail:
      "Weakest. The pool of possibilities is so small that the resulting seed can eventually be found by brute force — no matter how random the words look.",
    accent: "#EC4899",
  },
];

export default function EntropyExplainer() {
  return (
    <div className="mt-8 border border-border rounded-sm bg-secondary/30 p-5">
      <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-lead mb-1">
        What Is Entropy?
      </p>
      <p className="font-heading text-lg text-ink italic mb-4">
        The size of the pool your randomness is drawn from.
      </p>
      <p className="font-body text-sm text-lead leading-relaxed mb-5 max-w-2xl">
        Entropy is the measure of unpredictability behind your seed. The bigger
        and more random the source, the harder your seed is to guess. Think of
        it as drawing a single atom from a pool — the larger the pool, the more
        possible atoms, and the more secure the draw.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {TIERS.map((t) => (
          <div
            key={t.label}
            className="relative rounded-md border border-border bg-card p-4 pt-5 overflow-hidden"
          >
            <span
              className="absolute top-0 left-0 right-0 h-1"
              style={{ background: `linear-gradient(90deg, ${t.accent}, transparent)` }}
            />
            <t.Icon
              size={26}
              strokeWidth={1.5}
              style={{ color: t.accent }}
              className="mb-3"
            />
            <p className="font-body font-semibold text-ink text-sm mb-1">
              {t.label}
            </p>
            <p className="font-body text-xs text-lead italic mb-2">
              {t.caption}
            </p>
            <p className="font-body text-xs text-lead/80 leading-relaxed">
              {t.detail}
            </p>
          </div>
        ))}
      </div>

      <p className="font-body text-sm text-ink/80 leading-relaxed mt-5 max-w-2xl">
        Physical dice rolls let you create entropy yourself, from a source you
        can see and trust. Enough fair rolls give you a pool large enough to
        approach the “entire universe” ideal — far beyond anything an attacker
        could ever search. That is why rolling your own dice, and converting the
        rolls offline, is one of the most verifiable ways to generate a Bitcoin
        seed.
      </p>
    </div>
  );
}