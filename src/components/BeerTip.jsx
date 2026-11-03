import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import { X, Copy, Check, Zap, Bitcoin, Droplet } from "lucide-react";
import { Image } from "@/components/ui/image";
import { usePageAccent } from "@/lib/pageAccent";

const LN_ADDRESS = "l3tcl3ill@strike.me";
const LN_QR =
  "https://media.base44.com/images/public/6a4d10bcc776843a6d26b955/c0f1036c3_IMG_0531.jpeg";
const ONCHAIN_ADDRESS = "bc1qy4aafeqzjmqz70vud7955jjskpffqpkm209kar";
const ONCHAIN_QR =
  "https://media.base44.com/images/public/6a4d10bcc776843a6d26b955/fd02a5bbe_IMG_0532.jpeg";
const LIQUID_ADDRESS =
  "lq1qq2r2z3dqttgmtfrgmzsy9e8yjc06wlvynfva7nd86f0mntus9kckv8zqxvw3mrtqlcyd232l5w4ulnvr52q8y03h0j2d0pt6j";
const LIQUID_QR =
  "https://media.base44.com/images/public/6a4d10bcc776843a6d26b955/534990976_IMG_0539.jpeg";
const CHARACTER_IMG =
  "https://media.base44.com/images/public/6a4d10bcc776843a6d26b955/ccb90b7fc_820A3C90-DCA2-4290-A63A-3CE51B68512C_Original.png";

// Landing page has no page-specific accent — use a neutral dark charcoal card.
const LANDING_ACCENT = "#222326";

function hexToRgb(hex) {
  const h = hex.replace("#", "");
  return {
    r: parseInt(h.slice(0, 2), 16),
    g: parseInt(h.slice(2, 4), 16),
    b: parseInt(h.slice(4, 6), 16),
  };
}

function relLuminance(hex) {
  const { r, g, b } = hexToRgb(hex);
  const a = [r, g, b].map((v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
}

function withAlpha(hex, alpha) {
  const { r, g, b } = hexToRgb(hex);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export default function BeerTip({ className = "" }) {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState("ln");
  const [copied, setCopied] = useState(false);

  const pageAccent = usePageAccent();
  const location = useLocation();
  const accent = location.pathname === "/" ? LANDING_ACCENT : pageAccent;
  // Light accents get dark text; dark accents get white text.
  const onAccent = relLuminance(accent) >= 0.5 ? "#1A1C1E" : "#FFFFFF";

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const address =
    tab === "ln" ? LN_ADDRESS : tab === "onchain" ? ONCHAIN_ADDRESS : LIQUID_ADDRESS;
  const qr = tab === "ln" ? LN_QR : tab === "onchain" ? ONCHAIN_QR : LIQUID_QR;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable */
    }
  };

  const tabStyle = (active) =>
    active
      ? { background: onAccent, color: accent }
      : { color: withAlpha(onAccent, 0.7) };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Tip Bitcoin"
        title="Tip Bitcoin"
        className={`flex items-center justify-center h-8 w-8 rounded text-[#F7931A] hover:text-[#F7931A] transition-colors duration-300 tip-vibrate ${className}`}
      >
        <Bitcoin size={16} />
      </button>

      {createPortal(
        <AnimatePresence>
          {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-start sm:items-center justify-center bg-black/80 p-4 py-8 overflow-y-auto"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 10 }}
              transition={{ duration: 0.22 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-sm overflow-hidden rounded-xl shadow-2xl my-auto"
            >
              <div
                className="flex items-center justify-between px-4 py-3"
                style={{ background: accent }}
              >
                <span
                  className="font-mono text-xs tracking-[0.18em] uppercase"
                  style={{ color: onAccent }}
                >
                  Help support the guide
                </span>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close"
                  className="transition-opacity hover:opacity-80"
                  style={{ color: withAlpha(onAccent, 0.5) }}
                >
                  <X size={16} />
                </button>
              </div>

              <div
                className="px-5 py-6 flex flex-col items-center"
                style={{ background: accent }}
              >
                <div
                  className="w-20 h-20 rounded-full overflow-hidden border-2 shadow-lg mb-4"
                  style={{ background: onAccent, borderColor: withAlpha(onAccent, 0.2) }}
                >
                  <Image
                    src={CHARACTER_IMG}
                    alt="Bitcoin Bill"
                    fittingType="fill"
                    className="w-full h-full"
                  />
                </div>

                <div
                  className="flex gap-1 mb-4 rounded-full p-1"
                  style={{ background: withAlpha(onAccent, 0.15) }}
                >
                  <button
                    onClick={() => setTab("ln")}
                    style={tabStyle(tab === "ln")}
                    className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-opacity hover:opacity-80"
                  >
                    <Zap size={13} /> Lightning
                  </button>
                  <button
                    onClick={() => setTab("onchain")}
                    style={tabStyle(tab === "onchain")}
                    className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-opacity hover:opacity-80"
                  >
                    <Bitcoin size={13} /> On-chain
                  </button>
                  <button
                    onClick={() => setTab("liquid")}
                    style={tabStyle(tab === "liquid")}
                    className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-opacity hover:opacity-80"
                  >
                    <Droplet size={13} /> Liquid
                  </button>
                </div>

                <div className="bg-white rounded-lg p-3 shadow-lg w-52 h-52 flex items-center justify-center">
                  {qr ? (
                    <div className="w-full h-full overflow-hidden rounded flex items-center justify-center">
                      <Image
                        src={qr}
                        alt={`${tab} QR`}
                        fittingType="fill"
                        focalPointX={tab === "liquid" ? 0.5 : undefined}
                        focalPointY={tab === "liquid" ? 0.3 : undefined}
                        className="w-full h-full qr-zoom"
                      />
                    </div>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-center px-4">
                      <p className="font-mono text-[10px] tracking-widest uppercase text-black/40">
                        QR coming soon
                      </p>
                    </div>
                  )}
                </div>

                <div className="mt-4 w-full">
                  <div
                    className="rounded-md px-3 py-2 flex items-center gap-2 min-h-[3.5rem]"
                    style={{ background: withAlpha(onAccent, 0.1) }}
                  >
                    <span
                      className="font-mono text-[11px] break-all flex-1 leading-snug"
                      style={{ color: withAlpha(onAccent, 0.85) }}
                    >
                      {address}
                    </span>
                    <button
                      onClick={copy}
                      aria-label="Copy address"
                      className="shrink-0 transition-opacity hover:opacity-80"
                      style={{ color: withAlpha(onAccent, 0.7) }}
                    >
                      {copied ? (
                        <Check size={15} style={{ color: onAccent }} />
                      ) : (
                        <Copy size={15} />
                      )}
                    </button>
                  </div>
                  <p
                    className="font-mono text-[10px] tracking-widest uppercase text-center mt-3"
                    style={{ color: withAlpha(onAccent, 0.75) }}
                  >
                    ⚡ Thanks for the sats!
                  </p>
                  <p
                    className="font-mono text-[9px] tracking-widest uppercase text-center mt-1"
                    style={{ color: withAlpha(onAccent, 0.5) }}
                  >
                    Tip in sats · DYOR · Not financial advice
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}