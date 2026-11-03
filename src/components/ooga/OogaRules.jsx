import React from "react";
import { ShieldAlert, ExternalLink, FileText } from "lucide-react";

const RULES = [
  {
    title: "The character has to be yours",
    body: "The ownership check matches the file's github value to the account opening the pull request. You cannot claim someone else's caveman, and you cannot edit or delete another person's.",
  },
  {
    title: "Never edit oogaboogaland.html",
    body: "That big single file is generated automatically after merges and published by their build. Hand edits get overwritten or rejected.",
  },
  {
    title: "Plain JavaScript only",
    body: "No frameworks, packages, TypeScript, bundlers or external scripts. The project is deliberately dependency-free.",
  },
  {
    title: "One small change per pull request",
    body: "Add your character file and stop there. Do not reformat or rename anything else — unrelated edits make a change much harder to review.",
  },
  {
    title: "Assume everything is public forever",
    body: "Your file is public and stays in the project's history. Do not put real names, emails, addresses or anything private in it.",
  },
  {
    title: "It is a shared space",
    body: "The island is played by everyone who visits. Keep your character and its voice lines friendly.",
  },
];

const LINKS = [
  {
    title: "The repository",
    body: "Source, issues and every open pull request.",
    href: "https://github.com/OogaBoogaX/oogaboogaland",
  },
  {
    title: "src/characters — real examples",
    body: "Every contributor's file. Copy one to start from.",
    href: "https://github.com/OogaBoogaX/oogaboogaland/tree/rock/src/characters",
  },
  {
    title: "contributor-onboarding.md",
    body: "How identities, ownership and attribution are checked.",
    href: "https://github.com/OogaBoogaX/oogaboogaland/blob/rock/docs/contributor-onboarding.md",
  },
  {
    title: "character-bundles.md",
    body: "The exact accepted file format and how submissions get merged.",
    href: "https://github.com/OogaBoogaX/oogaboogaland/blob/rock/docs/character-bundles.md",
  },
  {
    title: "AGENTS.md",
    body: "The project's ground rules, for people and for AI agents.",
    href: "https://github.com/OogaBoogaX/oogaboogaland/blob/rock/AGENTS.md",
  },
];

export default function OogaRules() {
  return (
    <div>
      <h2 className="font-heading text-2xl md:text-3xl font-light text-ink mb-2">
        Before you hit submit
      </h2>
      <p className="font-body text-base text-lead leading-relaxed mb-7">
        Six rules that save you a rejected pull request.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {RULES.map((r) => (
          <div key={r.title} className="rounded-sm border border-border bg-white dark:bg-card px-4 py-4">
            <p className="font-body font-semibold text-ink text-sm mb-1 flex items-start gap-2">
              <ShieldAlert size={14} className="text-[#B45309] shrink-0 mt-0.5" />
              {r.title}
            </p>
            <p className="font-body text-sm text-lead leading-relaxed">{r.body}</p>
          </div>
        ))}
      </div>

      <h3 className="font-mono text-[10px] tracking-[0.2em] uppercase text-lead mt-10 mb-4 flex items-center gap-2">
        <FileText size={13} className="text-[#B45309]" /> Read next
      </h3>

      <div className="border-t border-border">
        {LINKS.map((l) => (
          <a
            key={l.title}
            href={l.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-start justify-between gap-4 py-3.5 border-b border-border hover:border-[#B45309] transition-colors duration-300"
          >
            <span className="min-w-0">
              <span className="block font-body text-sm text-ink group-hover:text-[#B45309] transition-colors duration-300">
                {l.title}
              </span>
              <span className="block font-body text-xs text-lead/70 mt-0.5">{l.body}</span>
            </span>
            <ExternalLink
              size={13}
              className="text-lead/40 group-hover:text-[#B45309] shrink-0 mt-1 transition-colors duration-300"
            />
          </a>
        ))}
      </div>

      <p className="font-mono text-[10px] tracking-[0.15em] uppercase text-lead/50 mt-4">
        All links open an external site
      </p>
    </div>
  );
}