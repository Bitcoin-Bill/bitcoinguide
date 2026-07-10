import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink } from "lucide-react";

export default function DonateButton({ href, label = "Donate BTC/LN" }) {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [showModal]);

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="font-mono text-xs tracking-[0.2em] uppercase text-parchment bg-verdigris hover:bg-verdigris/80 transition-colors duration-300 px-4 py-2 rounded border border-verdigris inline-block cursor-pointer"
      >
        {label}
      </button>

      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="bg-[#1a1a1a] rounded-lg border border-verdigris/40 shadow-2xl w-full max-w-3xl h-[80vh] flex flex-col relative"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/10">
                <p className="font-mono text-[10px] tracking-widest uppercase text-white/70 truncate">
                  {href}
                </p>
                <div className="flex items-center gap-2 shrink-0">
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 font-mono text-[10px] tracking-widest uppercase text-white/80 hover:text-white border border-white/20 rounded px-2 py-1 transition-colors"
                  >
                    Open <ExternalLink size={11} />
                  </a>
                  <button
                    onClick={() => setShowModal(false)}
                    className="text-white/50 hover:text-white transition-colors"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>
              <iframe
                src={href}
                className="flex-1 w-full rounded-b-lg"
                title="Donate Preview"
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}