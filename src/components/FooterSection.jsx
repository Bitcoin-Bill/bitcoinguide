import React from "react";
import { BookOpen, Boxes, Sparkles, Newspaper, Twitter, Mail, Dices, KeyRound, Clapperboard, Instagram } from "lucide-react";
import OogaPalmTreeIcon from "@/components/OogaPalmTreeIcon";
import { Link } from "react-router-dom";
import BeerTip from "@/components/BeerTip";
import { Image } from "@/components/ui/image";
import { useTheme } from "@/components/ThemeProvider";
import { ENTROPYLAB_URL, ENTROPYLAB_THUMB_LIGHT, ENTROPYLAB_THUMB_DARK } from "@/components/EntropyLabLink";


export default function FooterSection() {
  const { theme } = useTheme();
  return (
    <footer className="relative border-t border-border py-3 md:py-4">
      <div className="absolute left-6 lg:left-12 top-0 bottom-0 w-px bg-border hidden md:block" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row items-center md:items-center gap-4 md:gap-6">
          <div className="flex items-center gap-2 md:gap-2.5 md:flex-1 md:justify-start">
            <Link to="/literature" aria-label="Literature" className="flex items-center justify-center h-6 w-6 md:h-7 md:w-7 hover:opacity-70 transition-opacity duration-300">
              <BookOpen className="text-[#009DFF]" size={18} strokeWidth={1.4} />
            </Link>
            <Link to="/resources" aria-label="Resources" className="flex items-center justify-center h-6 w-6 md:h-7 md:w-7 hover:opacity-70 transition-opacity duration-300">
              <Boxes className="text-[#FF8C00]" size={18} strokeWidth={1.4} />
            </Link>
            <Link to="/this-week" aria-label="This Week in Bitcoin" className="flex items-center justify-center h-6 w-6 md:h-7 md:w-7 hover:opacity-70 transition-opacity duration-300">
              <Newspaper className="text-ink" size={18} />
            </Link>
            <Link to="/dice-entropy" aria-label="Dice Rolls & Entropy" className="flex items-center justify-center h-6 w-6 md:h-7 md:w-7 hover:opacity-70 transition-opacity duration-300">
              <Dices className="text-[#8B5CF6]" size={18} strokeWidth={1.4} />
            </Link>
            <Link to="/passphrase" aria-label="BIP39 Passphrase" className="flex items-center justify-center h-6 w-6 md:h-7 md:w-7 hover:opacity-70 transition-opacity duration-300">
              <KeyRound className="text-[#16A34A]" size={18} strokeWidth={1.4} />
            </Link>
            <Link to="/video-essays" aria-label="Video Essays" className="flex items-center justify-center h-6 w-6 md:h-7 md:w-7 hover:opacity-70 transition-opacity duration-300">
              <Clapperboard className="text-[#FACC15]" size={18} strokeWidth={1.4} />
            </Link>
            <Link to="/faq" aria-label="AI FAQ" className="flex items-center justify-center h-6 w-6 md:h-7 md:w-7 hover:opacity-70 transition-opacity duration-300">
              <Sparkles className="text-[#EC4899]" size={18} strokeWidth={1.4} />
            </Link>
            <span className="font-mono text-xs text-lead/40 select-none" aria-hidden="true">/</span>
            <Link to="/oogabooga-land" aria-label="Ooga Booga Land — make your own caveman" className="group relative flex items-center justify-center h-6 w-6 md:h-7 md:w-7 hover:opacity-70 transition-opacity duration-300">
              <OogaPalmTreeIcon className="w-[18px] h-[18px] shrink-0" />
              <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-ink px-2 py-1 font-mono text-[9px] tracking-[0.15em] uppercase text-parchment opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                Ooga Booga Land · make a caveman
              </span>
            </Link>
            <a
              href={ENTROPYLAB_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="EntropyLab — air-gapped Bitcoin calculator (third-party site)"
              className="group relative flex items-center justify-center h-6 w-6 md:h-7 md:w-7 hover:opacity-70 transition-opacity duration-300"
            >
              <Image
                src={theme === "dark" ? ENTROPYLAB_THUMB_DARK : ENTROPYLAB_THUMB_LIGHT}
                alt="EntropyLab"
                className="w-[18px] h-[18px] rounded-sm object-cover"
              />
              <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-ink px-2 py-1 font-mono text-[9px] tracking-[0.15em] uppercase text-parchment opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                EntropyLab · beta · test only
              </span>
            </a>
          </div>

          <div className="flex items-center gap-3 md:flex-1 md:justify-end shrink-0">
            <BeerTip />
            <a
              href="https://x.com/bitcoinguideapp"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X / Twitter"
              className="flex items-center justify-center h-7 w-7 md:h-8 md:w-8 text-lead hover:text-ink transition-colors duration-300"
            >
              <Twitter size={18} />
            </a>
            <a
              href="https://www.instagram.com/bitcoin_guideapp?igsi=MWRnNGdvdXZrYzcybw%3D%3D&utm_source=qr"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="flex items-center justify-center h-7 w-7 md:h-8 md:w-8 text-lead hover:text-ink transition-colors duration-300"
            >
              <Instagram size={18} />
            </a>
            <a
              href="mailto:bitcoinguideapp@proton.me"
              aria-label="Email"
              className="flex items-center justify-center h-7 w-7 md:h-8 md:w-8 text-lead hover:text-ink transition-colors duration-300"
            >
              <Mail size={18} />
            </a>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-border flex flex-col md:flex-row items-center justify-between gap-2">
          <p className="font-mono text-[10px] tracking-widest uppercase text-lead/40">
            © {new Date().getFullYear()} Bitcoin Bill. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <p className="font-mono text-[10px] tracking-widest uppercase text-lead/40">
              SoV ≺ MoE
            </p>
            <p className="font-mono text-[10px] tracking-widest uppercase text-lead/40">
              Proof of Work — Not Proof of Stake
            </p>
          </div>
        </div>
      </div>
    </footer>);

}