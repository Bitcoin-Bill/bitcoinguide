import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { Image } from "@/components/ui/image";
import { useTheme } from "@/components/ThemeProvider";
import { cn } from "@/lib/utils";
import {
  ENTROPYLAB_URL,
  ENTROPYLAB_THUMB_LIGHT,
  ENTROPYLAB_THUMB_DARK,
  ENTROPYLAB_BETA_NOTE,
} from "@/components/EntropyLabLink";

export default function EntropyLabHeaderBubble({ className }) {
  const { theme } = useTheme();
  const [open, setOpen] = useState(false);
  const thumb = theme === "dark" ? ENTROPYLAB_THUMB_DARK : ENTROPYLAB_THUMB_LIGHT;

  return (
    <div
      className={cn("relative inline-flex shrink-0", className)}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="EntropyLab — open third-party site"
        className="jar-jiggle rounded-lg overflow-hidden h-11 w-11 md:h-14 md:w-14 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#16A34A]/60"
      >
        <Image src={thumb} alt="EntropyLab" className="w-full h-full object-cover" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.96 }}
            transition={{ duration: 0.18 }}
            className="absolute right-0 top-full mt-2 z-50 w-60 rounded-xl border border-border bg-popover shadow-lg p-3 text-left"
          >
            <p className="font-mono text-[10px] tracking-[0.15em] uppercase text-lead/70 mb-1">
              EntropyLab
            </p>
            <p className="font-body text-xs text-lead leading-relaxed mb-2">
              Free, open-source, air-gapped Bitcoin calculator. Opens in a new window.
            </p>
            <p className="font-mono text-[9px] tracking-[0.12em] uppercase text-amber-500 dark:text-amber-400 leading-relaxed mb-2">
              ⚠ {ENTROPYLAB_BETA_NOTE}
            </p>
            <a
              href={ENTROPYLAB_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="inline-flex items-center gap-1.5 font-mono text-[11px] tracking-[0.15em] uppercase px-3 py-1.5 rounded-md text-white"
              style={{ background: "linear-gradient(90deg, #16A34A, #FF8C00)" }}
            >
              Open site <ExternalLink size={11} />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}