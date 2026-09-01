import React, { useState } from "react";
import { X } from "lucide-react";

const SPEED_LINK = "https://buy.tryspeed.com/plink_live_mrdubqpogZW5MJiy";

export default function DonateButton({ label = "Donate BTC/LN" }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="font-mono text-xs tracking-[0.2em] uppercase text-parchment bg-verdigris hover:bg-verdigris/80 transition-colors duration-300 px-4 py-2 rounded border border-verdigris inline-block"
        title="Donate BTC / Lightning"
      >
        {label}
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/70 backdrop-blur-sm p-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="relative bg-parchment rounded-lg border border-border shadow-2xl w-full max-w-md max-h-[85vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-border">
              <p className="font-heading text-sm text-ink">Donate BTC / Lightning</p>
              <button
                onClick={() => setOpen(false)}
                className="text-lead hover:text-ink transition-colors"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>
            <div className="flex-1 overflow-hidden rounded-b-lg">
              <iframe
                src={SPEED_LINK}
                title="Speed donation checkout"
                className="w-full h-[70vh] border-0"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}