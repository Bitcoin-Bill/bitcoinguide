import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const CLOCKWORK_IMAGE = "https://media.base44.com/images/public/6a4d10bcc776843a6d26b955/938a7a0a2_generated_135e2688.png";

const paths = [
  {
    number: "I",
    title: "The Foundation Track",
    subtitle: "Begin Here",
    description:
      "For the newcomer. Start with the basics of money, value, and why the current system demands an alternative.",
    steps: [
      "What is Bitcoin? (Video Introduction)",
      "The History of Money (3 min)",
      "Evolution of Moneys",
      "Value",
      "Liminal State of Fiat",
    ],
  },
  {
    number: "II",
    title: "The Austrian Track",
    subtitle: "Economic Foundations",
    description:
      "Dive deep into the economic theory behind Bitcoin — Austrian economics, time preference, and the nature of sound money.",
    steps: [
      "Low Time Preference",
      "Game Theory",
      "Gresham's Law",
      "Monetary Abuse",
      "The Gold Standard — Saifedean Ammous",
    ],
  },
  {
    number: "III",
    title: "The Sovereign Individual Path",
    subtitle: "Philosophy & Freedom",
    description:
      "Explore the philosophical implications of a world with incorruptible money — sovereignty, human nature, and civilizational transformation.",
    steps: [
      "Cognitive Dissonance",
      "Human Nature",
      "Intuition",
      "Innovations: Zero-to-One",
      "Gradually, Then Suddenly",
    ],
  },
  {
    number: "IV",
    title: "The Technical Track",
    subtitle: "How It Works",
    description:
      "Understand the mechanics behind Bitcoin's design — proof of work, decentralization, and why the architecture is unbreakable.",
    steps: [
      "Innovations: Zero-to-One",
      "Game Theory",
      "Intuition",
      "Softwar — Jason Lowery",
      "Conclusion",
    ],
  },
];

export default function PathsSection() {
  return (
    <section id="paths" className="relative py-32 md:py-40 bg-ink">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section header */}
        <div className="mb-20">
          <p className="font-mono text-xs tracking-[0.3em] uppercase text-lead mb-4">
            Curated Paths
          </p>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl text-parchment font-light leading-tight">
            The <span className="italic text-copper">Rabbit Hole</span>
          </h2>
          <p className="font-body text-lead mt-6 max-w-xl">
            Four structured reading journeys. Choose your entry point based on
            your background and curiosity.
          </p>
        </div>

        {/* Image */}
        <div className="relative mb-20 overflow-hidden" style={{ height: "240px" }}>
          <img
            src={CLOCKWORK_IMAGE}
            alt="Macro photography of antique clockwork gears with copper patina"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent" />
        </div>

        {/* Paths grid */}
        <div className="grid md:grid-cols-2 gap-px bg-parchment/10">
          {paths.map((path, i) => (
            <motion.div
              key={path.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-ink p-8 md:p-12 group"
            >
              {/* Path number */}
              <span className="font-mono text-xs tracking-[0.4em] text-copper">
                PATH {path.number}
              </span>

              <h3 className="font-heading text-2xl md:text-3xl text-parchment mt-4 mb-2">
                {path.title}
              </h3>
              <p className="font-mono text-xs tracking-widest uppercase text-lead mb-4">
                {path.subtitle}
              </p>
              <p className="font-body text-sm text-lead leading-relaxed mb-8">
                {path.description}
              </p>

              {/* Steps */}
              <ol className="space-y-3">
                {path.steps.map((step, j) => (
                  <li
                    key={j}
                    className="flex items-start gap-3 text-sm font-body text-parchment/70"
                  >
                    <span className="font-mono text-[10px] text-copper/60 mt-1 w-4 shrink-0">
                      {j + 1}.
                    </span>
                    {step}
                  </li>
                ))}
              </ol>

              <div className="mt-8 flex items-center gap-2 text-xs tracking-widest uppercase text-copper group-hover:gap-3 transition-all duration-300">
                <span>Begin path</span>
                <ArrowRight size={14} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}