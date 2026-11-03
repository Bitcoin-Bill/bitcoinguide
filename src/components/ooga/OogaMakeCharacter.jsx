import React from "react";
import { Sparkles, FolderOpen, Bot, Save, GitPullRequest } from "lucide-react";
import OogaPromptCard from "@/components/ooga/OogaPromptCard";

const STEPS = [
  {
    icon: Bot,
    title: "Pick whatever AI you already like",
    body: "ChatGPT, Claude, Gemini, Grok, a coding agent — any of them can do this. There is nothing special to install and no account to connect. The only thing that matters is that the AI follows the file format exactly.",
  },
  {
    icon: FolderOpen,
    title: "Copy a real character file as your template",
    body: "Open the characters folder in the repository and open any file. Copy the whole thing. This is your template — it has the real, exact key names, so you are not guessing at what the game accepts.",
    link: {
      label: "Browse src/characters",
      href: "https://github.com/OogaBoogaX/oogaboogaland/tree/rock/src/characters",
    },
  },
  {
    icon: Sparkles,
    title: "Describe your caveman to the AI",
    body: "Paste the prompt below into your AI, replace the placeholders with your GitHub username, and paste the template file at the end. Then describe your character in your own words: hair, skin tone, face, build, hat, and the lines they should say.",
  },
  {
    icon: Save,
    title: "Save the answer as one .js file",
    body: "Your AI's answer should be a single file. Save it as src/characters/your-github-username.js — lowercase, matching your GitHub username exactly. If the AI wrapped it in markdown code fences, strip those lines out.",
  },
  {
    icon: GitPullRequest,
    title: "Upload it with a pull request",
    body: "You can do this entirely on github.com — no command line. The crash course below walks through every click, including the one thing people get wrong: the pull request has to target the rock branch.",
  },
];

export default function OogaMakeCharacter() {
  return (
    <div className="pb-14">
      <h2 className="font-heading text-2xl md:text-3xl font-light text-ink mb-2">
        Make your own Ooga with AI
      </h2>
      <p className="font-body text-base text-lead leading-relaxed mb-7">
        A character is a tiny data file — a name, a look, and a few things to say. That makes it a
        perfect job for an AI assistant.
      </p>

      <ol className="space-y-5">
        {STEPS.map((step, i) => (
          <li key={step.title} className="flex items-start gap-4">
            <span
              className="flex items-center justify-center h-9 w-9 rounded-full shrink-0 font-mono text-xs"
              style={{ background: "rgba(180,83,9,0.10)", color: "#B45309" }}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="flex-1 min-w-0">
              <h3 className="font-body font-semibold text-ink text-base mb-1 flex items-center gap-2">
                <step.icon size={15} className="text-[#B45309]" strokeWidth={1.8} />
                {step.title}
              </h3>
              <p className="font-body text-sm text-lead leading-relaxed">{step.body}</p>
              {step.link && (
                <a
                  href={step.link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-2 font-mono text-[10px] tracking-[0.15em] uppercase text-[#B45309] hover:underline"
                >
                  {step.link.label} →
                </a>
              )}
            </div>
          </li>
        ))}
      </ol>

      <OogaPromptCard />
    </div>
  );
}