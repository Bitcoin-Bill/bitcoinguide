import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Newspaper, BookOpen, Boxes, Sparkles, Dices, KeyRound, Clapperboard, Sun, Moon, ExternalLink } from "lucide-react";
import OrangeCubeLogo from "@/components/OrangeCubeLogo";
import { useTheme } from "@/components/ThemeProvider";
import { Image } from "@/components/ui/image";
import EntropyLabHeaderBubble from "@/components/EntropyLabHeaderBubble";
import { ENTROPYLAB_DESCRIPTION, ENTROPYLAB_BETA_NOTE } from "@/components/EntropyLabLink";


const choices = [
  {
    to: "/literature",
    label: "Literature",
    tagline: "The essential essays & articles",
    icon: BookOpen,
    color: "#009DFF",
    wide: true,
  },
  {
    to: "/resources",
    label: "Resources",
    tagline: "Everything to buy, store & understand",
    icon: Boxes,
    color: "#FF8C00",
    wide: true,
  },
  {
    to: "/this-week",
    label: "This Week",
    tagline: "Weekly news & Bitcoin events",
    icon: Newspaper,
    color: "hsl(var(--ink))",
  },
  {
    to: "/dice-entropy",
    label: "Dice Rolls",
    tagline: "Generate seeds with dice entropy",
    icon: Dices,
    color: "#8B5CF6",
  },
  {
    to: "/passphrase",
    label: "Passphrase",
    tagline: "Dice-based BIP39 passphrase guide",
    icon: KeyRound,
    color: "#16A34A",
  },
  {
    to: "/video-essays",
    label: "Video Essays",
    tagline: "Short reels that bring the essays to life",
    icon: Clapperboard,
    color: "#FACC15",
  },
  {
    to: "/faq",
    label: "AI FAQ",
    tagline: "Ask anything about this site & Bitcoin",
    icon: Sparkles,
    color: "#EC4899",
  },
];

export default function Landing() {
  const { theme, toggleTheme, setTheme } = useTheme();
  const [expandedLab, setExpandedLab] = useState(null);

  useEffect(() => {
    setTheme("dark");
  }, [setTheme]);

  return (
    <div className="bg-parchment min-h-screen flex flex-col">
      <button
        onClick={toggleTheme}
        aria-label="Toggle light or dark theme"
        className="fixed top-5 right-5 z-50 flex items-center justify-center h-9 w-9 rounded-full border border-border bg-parchment/80 backdrop-blur-sm transition-colors duration-300 hover:text-ink"
      >
        {theme === "dark" ? <Sun size={16} className="text-yellow-400" /> : <Moon size={16} className="text-teal-500" />}
      </button>
      <section className="relative flex-1 flex items-center justify-center pt-16 pb-16 md:pt-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-12 w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-center mb-12 md:mb-16 relative z-50"
          >
            <h1 className="relative inline-flex items-center justify-center font-heading text-4xl md:text-6xl font-light text-ink leading-[0.95] tracking-tight">
              <OrangeCubeLogo className="absolute right-full mr-3 h-11 w-11 md:h-14 md:w-14 shrink-0" />
              Bitcoin Guide
              <EntropyLabHeaderBubble className="absolute left-full ml-3 top-1/2 -translate-y-1/2" />
            </h1>
            <p className="font-heading text-base md:text-lg text-ink/70 italic max-w-lg mx-auto mt-4">
              A starting point for learning Bitcoin — choose a section below to begin.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            {choices.map((c, i) => {
              const isExternal = !!c.href;
              const isExpandable = !!c.expandable;
              const cardClassName =
                "group relative flex flex-col h-full rounded-2xl bg-white dark:bg-card p-6 shadow-sm hover:shadow-md border border-black/5 dark:border-white/5 transition-shadow duration-300 overflow-hidden";
              const inner = (
                <>
                  <span
                    className="absolute top-0 left-0 right-0 h-1"
                    style={{ background: c.gradient ? c.gradient : `linear-gradient(90deg, ${c.color}, transparent)` }}
                  />
                  {c.thumb ? (
                    <Image
                      src={theme === "dark" ? c.thumb.dark : c.thumb.light}
                      alt={c.label}
                      className="w-9 h-9 rounded-lg mb-4 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  ) : (
                    React.createElement(c.icon, {
                      size: 26,
                      strokeWidth: 1.6,
                      style: { color: c.color },
                      className: "mb-4 transition-transform duration-500 group-hover:scale-110",
                    })
                  )}
                  <h3 className="font-body font-semibold text-ink text-lg mb-1 flex items-center gap-1.5">
                    {c.label}
                    {isExternal && <ExternalLink size={13} className="text-lead" />}
                  </h3>
                  <p className="font-body text-sm text-lead">{c.tagline}</p>
                </>
              );
              return (
                <motion.div
                  key={c.label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.08 }}
                  className={c.wide ? "sm:col-span-2 lg:col-span-2" : ""}
                >
                  {isExpandable ? (
                    <div className={cardClassName}>
                      <button
                        type="button"
                        onClick={() => setExpandedLab((v) => (v === c.label ? null : c.label))}
                        className="text-left w-full"
                      >
                        {inner}
                      </button>
                      <AnimatePresence initial={false}>
                        {expandedLab === c.label && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="pt-3 mt-3 border-t border-black/5 dark:border-white/10">
                              <p className="font-body text-sm text-lead leading-relaxed mb-3">
                                {ENTROPYLAB_DESCRIPTION}
                              </p>
                              <p className="font-mono text-[10px] tracking-[0.15em] uppercase mb-3" style={{ color: c.color }}>
                                ⚠ {ENTROPYLAB_BETA_NOTE}
                              </p>
                              <p className="font-mono text-[10px] tracking-[0.15em] uppercase text-lead/60 mb-3 flex items-center gap-1.5">
                                <ExternalLink size={11} /> External site — opens in a new window
                              </p>
                              <a
                                href={c.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.15em] uppercase px-4 py-2 rounded-md text-white"
                                style={{ background: c.gradient || c.color }}
                              >
                                Open EntropyLab <ExternalLink size={12} />
                              </a>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : isExternal ? (
                    <a href={c.href} target="_blank" rel="noopener noreferrer" className={cardClassName}>
                      {inner}
                    </a>
                  ) : (
                    <Link to={c.to} className={cardClassName}>
                      {inner}
                    </Link>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}