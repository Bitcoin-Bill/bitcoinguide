import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const SHAKEPAY_LINK = "https://shakepay.me/l2iekert";

export default function ShakepayTip() {
  const [showQr, setShowQr] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const hoverTimerRef = useRef(null);

  const handleOpenShakepay = () => {
    const isMobile = window.matchMedia("(hover: none)").matches;
    if (isMobile) {
      // Try the shakepay:// custom scheme to open the native app.
      // If the app isn't installed, fall back to the web link after a delay.
      const start = Date.now();
      const onBlur = () => { window.clearTimeout(timer); };
      window.addEventListener("blur", onBlur, { once: true });
      const timer = window.setTimeout(() => {
        window.removeEventListener("blur", onBlur);
        // If less than ~1.5s passed, the app didn't open — redirect to web
        if (Date.now() - start < 1500) {
          window.location.href = SHAKEPAY_LINK;
        }
      }, 1500);
      window.location.href = "shakepay://";
    } else {
      window.open(SHAKEPAY_LINK, "_blank", "noopener,noreferrer");
    }
  };

  const handleMouseEnter = () => {
    hoverTimerRef.current = setTimeout(() => setShowQr(true), 300);
  };

  const handleMouseLeave = () => {
    clearTimeout(hoverTimerRef.current);
    setShowQr(false);
  };

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
      <div
        className="relative inline-block"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-2 bg-[#56A3FF] border border-[#56A3FF] rounded-md px-3 py-1.5 hover:opacity-80 transition-opacity duration-300 cursor-pointer"
          title="Tip on Shakepay"
        >
          <img
            src="https://media.base44.com/images/public/6a4d10bcc776843a6d26b955/1011423e1_IMG_8773.jpeg"
            alt="Shakepay"
            className="h-5 w-5 object-contain rounded"
          />
          <span className="font-mono text-xs tracking-[0.15em] uppercase text-white">
            Tip on Shakepay
          </span>
        </button>

        {showQr && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-full left-0 mb-3 z-50"
          >
            <div className="bg-[#1a1a1a] rounded-lg border border-[#56A3FF]/30 shadow-xl p-4 w-64">
              <p className="font-mono text-[10px] tracking-widest uppercase text-white/70 text-center mb-3">
                Scan to tip on Shakepay
              </p>
              <img
                src="https://media.base44.com/images/public/6a4d10bcc776843a6d26b955/db341732d_IMG_8775.jpeg"
                alt="Shakepay QR Code"
                className="w-full h-auto rounded"
              />
            </div>
          </motion.div>
        )}
      </div>

      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 px-6"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="bg-[#1a1a1a] rounded-lg border border-[#56A3FF]/30 shadow-2xl p-5 w-full max-w-xs relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-2 right-2 text-white/50 hover:text-white transition-colors"
              >
                <X size={18} />
              </button>
              <p className="font-mono text-[10px] tracking-widest uppercase text-white/70 text-center mb-3">
                Scan to tip on Shakepay
              </p>
              <img
                src="https://media.base44.com/images/public/6a4d10bcc776843a6d26b955/db341732d_IMG_8775.jpeg"
                alt="Shakepay QR Code"
                className="w-full h-auto rounded"
              />
              <button
                onClick={handleOpenShakepay}
                className="block text-center w-full mt-4 font-mono text-xs tracking-[0.15em] uppercase text-white bg-[#56A3FF] rounded-md py-2 hover:opacity-80 transition-opacity"
              >
                Open Shakepay
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}