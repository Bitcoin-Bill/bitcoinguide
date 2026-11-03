import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, X } from "lucide-react";

const readingList = [
  { title: "Broken Money", author: "Lyn Alden" },
  { title: "Gradually Then Suddenly", author: "Parker A. Lewis" },
  { title: "The Fiat Standard", author: "Saifedean Ammous" },
  { title: "The Price of Tomorrow", author: "Jeff Booth" },
  { title: "The Sovereign Individual", author: "James Dale Davidson & William Rees-Mogg" },
  { title: "The Creature from Jekyll Island", author: "G. Edward Griffin" },
  { title: "The Gold Standard", author: "Saifedean Ammous" },
  { title: "Fiat Food", author: "Matthew Lysiak" },
  { title: "Principles of Economics", author: "Saifedean Ammous" },
  { title: "Softwar", author: "Jason P. Lowery" },
  { title: "The Bitcoin Enlightenment", author: "Ricardo B. Salinas" },
  { title: "The Bitcoin Standard", author: "Saifedean Ammous" },
  { title: "The Big Print", author: "Lawrence Lepard" },
  { title: "Layered Money", author: "Nick Bhatia" },
  { title: "The Blocksize War", author: "Jonathan Bier" },
];

export default function ReadingListLink() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <div id="bitcoin-bill-reading-list" className="scroll-mt-20">
        <button
          onClick={() => setOpen(true)}
          className="group flex items-start gap-4 border border-border bg-parchment hover:border-[var(--page-accent)] hover:shadow-sm transition-all duration-300 p-5 w-full text-left"
        >
          <img
            src="https://media.base44.com/images/public/6a4d10bcc776843a6d26b955/8f242b043_820A3C90-DCA2-4290-A63A-3CE51B68512C_Original.png"
            alt="Bitcoin Bill Reading List"
            className="w-14 h-14 object-cover rounded-sm shrink-0 border border-border group-hover:border-[var(--page-accent)] transition-colors duration-300"
          />
          <div className="flex-1 min-w-0">
            <h3 className="font-heading text-lg text-ink group-hover:text-[var(--page-accent)] transition-colors duration-300 flex items-center gap-2 flex-wrap">
              Bitcoin Bill Reading List
              <span className="font-mono text-[9px] tracking-widest uppercase text-lead/50 border border-border px-1.5 py-0.5 rounded">
                Reading List
              </span>
            </h3>
            <p className="font-body text-sm text-lead leading-relaxed mt-1">
              My essential reading list — 15 recommended books on monetary knowledge and Bitcoin, from Broken Money and Gradually Then Suddenly to The Bitcoin Standard and The Blocksize War.
            </p>
          </div>
          <BookOpen
            size={18}
            className="text-lead/40 group-hover:text-[var(--page-accent)] transition-colors duration-300 shrink-0 mt-1"
          />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-ink/60 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-parchment border border-border rounded-sm shadow-2xl max-w-lg w-full max-h-[85vh] overflow-y-auto"
            >
              <button
                onClick={() => setOpen(false)}
                aria-label="Close reading list"
                className="absolute top-3 right-3 flex items-center justify-center h-8 w-8 rounded-full text-lead hover:text-ink hover:bg-secondary transition-colors duration-200 z-10"
              >
                <X size={18} />
              </button>

              <div className="p-8 md:p-10">
                <div className="flex items-center gap-4 mb-6">
                  <img
                    src="https://media.base44.com/images/public/6a4d10bcc776843a6d26b955/8f242b043_820A3C90-DCA2-4290-A63A-3CE51B68512C_Original.png"
                    alt="Bitcoin Bill"
                    className="w-16 h-16 object-cover rounded-sm border border-border shrink-0"
                  />
                  <div>
                    <h2 className="font-heading text-2xl text-ink leading-tight">
                      My Essential Reading List
                    </h2>
                    <p className="font-mono text-xs tracking-[0.15em] uppercase text-lead mt-1">
                      Recommended Books on Monetary Knowledge & Bitcoin
                    </p>
                  </div>
                </div>

                <div className="w-12 h-px bg-[var(--page-accent)] mb-6" />

                <ul className="space-y-3">
                  {readingList.map((book, i) => (
                    <li
                      key={i}
                      className="flex items-baseline gap-3 border-b border-border/50 pb-3 last:border-0"
                    >
                      <span className="font-mono text-xs text-lead/50 shrink-0 w-6">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div className="flex-1">
                        <span className="font-heading text-base text-ink">
                          {book.title}
                        </span>
                        <span className="font-body text-sm text-lead ml-2">
                          — {book.author}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}