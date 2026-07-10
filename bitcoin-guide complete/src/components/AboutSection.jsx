import React from "react";
import { motion } from "framer-motion";

const PRISM_IMAGE = "https://media.base44.com/images/public/6a4d10bcc776843a6d26b955/0b5899880_generated_bd8be20e.png";
const BOOKS_IMAGE = "https://media.base44.com/images/public/6a4d10bcc776843a6d26b955/415f28fe5_generated_8b61b054.png";

export default function AboutSection() {
  return (
    <section id="about" className="relative py-32 md:py-40">
      {/* Vertical rule */}
      <div className="absolute left-6 lg:left-12 top-0 bottom-0 w-px bg-border hidden md:block" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-start">
          {/* Left — text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="font-mono text-xs tracking-[0.3em] uppercase text-lead mb-4">
              About the Guide
            </p>
            <h2 className="font-heading text-4xl md:text-5xl text-ink font-light leading-tight mb-8">
              Bitcoin <span className="italic text-verdigris">Bill</span>
            </h2>

            <div className="space-y-6 font-body text-lead text-sm leading-relaxed">
              <p>
                This literature guide exists because understanding Bitcoin
                requires more than price charts and headlines. It demands a
                journey through economics, philosophy, game theory, and the
                history of money itself.
              </p>
              <p>
                Every text in this collection has been read, annotated, and
                selected for its contribution to a complete understanding of why
                Bitcoin matters — not as a speculation, but as a civilizational
                tool for preserving value across time.
              </p>
              <p>
                The guide is organized to take you from first principles to deep
                conviction. Whether you're new to the concept or years into the
                rabbit hole, there's a structured path waiting for you.
              </p>
              <p className="font-heading text-ink text-lg italic">
                "Money grows in value, not volume."
              </p>
            </div>

            <div className="mt-10 flex items-center gap-6">
              <a
                href="https://linktr.ee/bitcoinbill"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs tracking-widest uppercase text-verdigris hover:text-ink transition-colors duration-300 border-b border-verdigris/30 pb-0.5"
              >
                Linktree
              </a>
              <span className="text-border">|</span>
              <a
                href="https://x.com/riekert_billy"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs tracking-widest uppercase text-verdigris hover:text-ink transition-colors duration-300 border-b border-verdigris/30 pb-0.5"
              >
                X / Twitter
              </a>
            </div>
          </motion.div>

          {/* Right — images */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="overflow-hidden">
              <img
                src={PRISM_IMAGE}
                alt="Light passing through a crystal prism against a dark background"
                className="w-full h-64 md:h-80 object-cover"
              />
            </div>
            <div className="overflow-hidden">
              <img
                src={BOOKS_IMAGE}
                alt="Aged leather-bound book spines with gold leaf on a dark shelf"
                className="w-full h-48 md:h-56 object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}