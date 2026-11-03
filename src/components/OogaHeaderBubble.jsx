import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import OogaCavemanIcon from "@/components/OogaCavemanIcon";

export default function OogaHeaderBubble({ className }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={cn("relative inline-flex shrink-0", className)}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <Link
        to="/oogabooga-land"
        aria-label="Ooga Booga Land — make your own caveman and join the island"
        className="block h-11 w-11 md:h-14 md:w-14 rounded-lg transition-transform duration-500 hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B45309]/60"
      >
        <OogaCavemanIcon className="w-full h-full" />
      </Link>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.96 }}
            transition={{ duration: 0.18 }}
            className="pointer-events-none absolute right-0 top-full mt-2 z-50 w-56 rounded-xl border border-border bg-popover shadow-lg p-3 text-left"
          >
            <p className="font-mono text-[10px] tracking-[0.15em] uppercase text-lead/70 mb-1">
              Ooga Booga Land
            </p>
            <p className="font-body text-xs text-lead leading-relaxed">
              Make your own caveman with AI and join the island.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}