import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ExternalLink } from "lucide-react";
import { Image } from "@/components/ui/image";
import { useTheme } from "@/components/ThemeProvider";

export const ENTROPYLAB_URL = "https://entropylab.online/";
export const ENTROPYLAB_THUMB_LIGHT =
  "https://media.base44.com/images/public/6a4d10bcc776843a6d26b955/e5c68f8da_IMG_0225.png";
export const ENTROPYLAB_THUMB_DARK =
  "https://media.base44.com/images/public/6a4d10bcc776843a6d26b955/3b4162998_IMG_0226.png";

export const ENTROPYLAB_DESCRIPTION =
  "EntropyLab is a free, open-source, air-gapped Bitcoin calculator built as a collaboration from multiple contributors (github.com/w-s-bitcoin/entropylab). Save it to a removable drive and run it entirely offline. Turn dice rolls or an existing seed into receive addresses, export an xpub for a watch-only wallet, build multisig, and inspect PSBTs — all without exposing your private keys to the internet. Supports multiple dice-roll methods (COLDCARD, SeedSigner, Keystone, BitBox diceware, D++) and an optional BIP39 passphrase.";

export const ENTROPYLAB_BETA_NOTE =
  "EntropyLab is in early development and is currently for test purposes only.";

export default function EntropyLabLink({ color = "#8B5CF6", openLabel = "Open EntropyLab" }) {
  const [expanded, setExpanded] = useState(false);
  const { theme } = useTheme();
  const thumb = theme === "dark" ? ENTROPYLAB_THUMB_DARK : ENTROPYLAB_THUMB_LIGHT;

  return (
    <div
      className="rounded-sm"
      style={{ borderWidth: 1, borderColor: `${color}80`, background: `${color}0D` }}
    >
      <button
        onClick={() => setExpanded((v) => !v)}
        className="group w-full flex items-center gap-3 px-4 py-2.5 text-left"
      >
        <Image
          src={thumb}
          alt="EntropyLab"
          className="w-9 h-9 rounded-sm shrink-0 object-cover"
        />
        <span className="flex flex-col">
          <span className="font-mono text-[10px] tracking-[0.2em] uppercase" style={{ color }}>
            EntropyLab
          </span>
          <span className="font-body text-sm text-ink/80">Air-gapped Bitcoin calculator · open-source collaboration</span>
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
            <div className="px-4 pb-4 pt-1 border-t" style={{ borderColor: `${color}4D` }}>
              <p className="font-body text-sm text-lead leading-relaxed mt-3 mb-3">{ENTROPYLAB_DESCRIPTION}</p>
              <p className="font-mono text-[10px] tracking-[0.15em] uppercase mb-3" style={{ color }}>
                ⚠ {ENTROPYLAB_BETA_NOTE}
              </p>
              <a
                href={ENTROPYLAB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border px-4 py-2 font-mono text-xs tracking-[0.15em] uppercase transition-colors duration-300"
                style={{ borderColor: color, color }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = color;
                  e.currentTarget.style.color = "hsl(var(--parchment))";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = color;
                }}
              >
                {openLabel}
                <ExternalLink size={12} className="opacity-60" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}