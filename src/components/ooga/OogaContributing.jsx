import React from "react";
import { GitFork, Check, Lightbulb } from "lucide-react";

const STEPS = [
  {
    title: "Make a GitHub account",
    body: "Free, takes a minute. Your username becomes your caveman's name, so pick one you are happy to see on the island permanently.",
  },
  {
    title: "Fork the repository",
    body: "\"Fork\" just means \"give me my own copy to work in.\" Press Fork on the repository page. You now have a version nobody else can change.",
  },
  {
    title: "Add your file, right in the browser",
    body: "In your fork, open src/characters, click \"Add file\", then \"Create new file\", and name it after your GitHub username with a .js ending. Paste in what your AI wrote. No installs, no terminal, nothing to download.",
  },
  {
    title: "Commit the change",
    body: "\"Commit\" is just \"save with a note.\" Something like add my character is fine. This saves the file into your fork.",
  },
  {
    title: "Open a pull request",
    body: "A pull request means \"please consider my change.\" Press \"Contribute\", then \"Open pull request\" — and check that it targets rock, not main. rock is this project's main branch.",
  },
  {
    title: "Wait for checks, then get merged",
    body: "Automated checks run on your pull request. A clean, data-only character that belongs to you normally gets bundled and merged on its own shortly after midnight UTC. If you included custom code, a maintainer reads it first.",
  },
];

const JARGON = [
  { term: "Repository (repo)", body: "The folder holding all the project's files and their history." },
  { term: "Fork", body: "Your own copy of somebody else's repository." },
  { term: "Branch", body: "A parallel version of the project. This one's main branch is called rock." },
  { term: "Commit", body: "A saved change with a short message attached." },
  { term: "Pull request (PR)", body: "A request for your change to be merged into the real project." },
  { term: "Merge", body: "Accepting those changes into the real thing." },
  { term: "Maintainer", body: "A person who reviews changes and approves them." },
  { term: "Checks", body: "Automatic scripts that test whether your change is valid before anyone looks at it." },
];

export default function OogaContributing() {
  return (
    <div className="pb-14">
      <h2 className="font-heading text-2xl md:text-3xl font-light text-ink mb-2">
        Crash course: contributing without being a developer
      </h2>
      <p className="font-body text-base text-lead leading-relaxed mb-7">
        GitHub looks intimidating and is mostly three ideas: copy, save, ask. Here is the whole
        process, in order.
      </p>

      <ol className="space-y-5 mb-10">
        {STEPS.map((step, i) => (
          <li key={step.title} className="flex items-start gap-4">
            <span className="flex items-center justify-center h-6 w-6 rounded-full shrink-0 font-mono text-[10px] text-white bg-[#B45309] mt-1">
              {i + 1}
            </span>
            <div className="flex-1 min-w-0">
              <h3 className="font-body font-semibold text-ink text-base mb-1">{step.title}</h3>
              <p className="font-body text-sm text-lead leading-relaxed">{step.body}</p>
            </div>
          </li>
        ))}
      </ol>

      <h3 className="font-mono text-[10px] tracking-[0.2em] uppercase text-lead mb-4 flex items-center gap-2">
        <GitFork size={13} className="text-[#B45309]" /> The words people will use at you
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
        {JARGON.map((j) => (
          <div key={j.term} className="rounded-sm border border-border bg-white dark:bg-card px-4 py-3">
            <p className="font-mono text-[11px] text-[#B45309] mb-1">{j.term}</p>
            <p className="font-body text-sm text-lead leading-relaxed">{j.body}</p>
          </div>
        ))}
      </div>

      <div className="flex items-start gap-3 rounded-sm border border-border bg-white dark:bg-card px-5 py-4">
        <Lightbulb size={16} className="text-[#B45309] shrink-0 mt-0.5" />
        <p className="font-body text-sm text-lead leading-relaxed">
          You do not need to install anything, use git, or touch a terminal. Everything above happens
          on github.com in a browser. Once you have merged your first one, the next one takes about
          two minutes.
        </p>
      </div>

      <p className="font-mono text-[10px] tracking-[0.15em] uppercase text-lead/50 mt-4 flex items-center gap-1.5">
        <Check size={11} /> A merged character shows up on the island after the next rebuild
      </p>
    </div>
  );
}