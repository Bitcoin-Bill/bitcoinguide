import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, FileText, ExternalLink } from "lucide-react";

const PDF_URL =
  "https://base44.app/api/apps/6a4d10bcc776843a6d26b955/files/mp/public/6a4d10bcc776843a6d26b955/e17a58d59_Bitcoin-Seed-Dice-and-Restore-Guide.pdf";

export default function OfflineInstructionsPdf() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="border border-[#8B5CF6]/50 bg-[#8B5CF6]/5 rounded-sm">
      <button
        onClick={() => setExpanded((v) => !v)}
        className="group w-full flex items-center gap-2.5 px-4 py-2.5 text-left"
      >
        <FileText size={16} className="text-[#8B5CF6] shrink-0" />
        <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#8B5CF6]">
          PDF — Offline Instructions
        </span>
        <span className="font-body text-sm text-ink/80 hidden sm:inline">
          Preview &amp; Download
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
                A printable, air-gapped reference for generating a Bitcoin seed
                with dice. Open it in your browser to read, then save a copy
                for offline use if you'd like.
              </p>

              <div className="flex flex-wrap gap-3 mt-1">
                <a
                  href={PDF_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-[#8B5CF6] text-[#8B5CF6] hover:bg-[#8B5CF6] hover:text-parchment transition-colors duration-300 px-4 py-2 font-mono text-xs tracking-[0.15em] uppercase"
                >
                  <ExternalLink size={14} />
                  Open PDF
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}