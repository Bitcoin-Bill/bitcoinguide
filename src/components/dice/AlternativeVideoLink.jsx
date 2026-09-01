import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Youtube, ChevronDown, ExternalLink } from "lucide-react";

export default function AlternativeVideoLink() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="border border-[#8B5CF6]/50 bg-[#8B5CF6]/5 rounded-sm">
      <button
        onClick={() => setExpanded((v) => !v)}
        className="group w-full flex items-center gap-2.5 px-4 py-2.5 text-left"
      >
        <Youtube size={16} className="text-red-600 dark:text-red-400 shrink-0" />
        <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#8B5CF6]">
          YouTube — External Video
        </span>
        <span className="font-body text-sm text-ink/80 hidden sm:inline">
          Coin Flip with 256 Coins
        </span>
        <ChevronDown
          size={14}
          className={`text-lead/50 group-hover:text-ink transition-all duration-300 ml-auto ${
            expanded ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 pt-1 border-t border-[#8B5CF6]/30">
              <p className="font-body text-sm text-lead leading-relaxed mt-3 mb-3">
                Prefer coins to dice? This video walks through generating a
                24-word Bitcoin seed phrase by flipping 256 coins — a physical
                entropy alternative to dice rolls. Hosted on YouTube — clicking
                the link below will take you off-site.
              </p>
              <a
                href="https://youtu.be/k5h7A7kRM8Y"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-[#8B5CF6] text-[#8B5CF6] hover:bg-[#8B5CF6] hover:text-parchment transition-colors duration-300 px-4 py-2 font-mono text-xs tracking-[0.15em] uppercase"
              >
                <Youtube size={14} />
                Open on YouTube
                <ExternalLink size={12} className="opacity-60" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}