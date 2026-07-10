import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import DonateButton from "@/components/DonateButton";
import StrikeTip from "@/components/StrikeTip";
import ShakepayTip from "@/components/ShakepayTip";

export default function FooterSection() {
  const [expanded, setExpanded] = useState(false);

  return (
    <footer className="relative border-t border-border py-8 md:py-10">
      <div className="absolute left-6 lg:left-12 top-0 bottom-0 w-px bg-border hidden md:block" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row items-center md:items-center gap-8">
          <Link to="/#archive" className="shrink-0 md:flex-1 md:flex md:justify-start">
            <img
              src="https://media.base44.com/images/public/6a4d10bcc776843a6d26b955/4b4c823cc_newestcubesthanksn.png"
              alt="Back to literature archive"
              className="w-full max-w-[200px] md:max-w-[240px] object-contain hover:opacity-80 transition-opacity duration-300 border-0 outline-none my-1 opacity-95" />
            
          </Link>

          <p className="font-mono text-xs tracking-[0.3em] uppercase text-lead text-center md:text-center shrink-0 px-24 mx-24">BITCOIN GUIDE LITERATURE

          </p>

          <div className="w-full md:w-auto shrink-0">
            <p className="font-heading text-sm text-ink text-center md:text-left mb-3">
              Connect
            </p>
            <button
              onClick={() => setExpanded(!expanded)}
              className="flex items-center gap-2 font-mono text-xs tracking-[0.2em] uppercase text-lead hover:text-ink transition-colors duration-300 w-full md:w-auto justify-center md:justify-start">
              
              {expanded ? "Hide Links" : "View Links"}
              <ChevronDown
                size={14}
                className={`transition-transform duration-300 ${expanded ? "rotate-180" : ""}`} />
              
            </button>

            <div
              className={`overflow-hidden transition-all duration-300 ${
              expanded ? "max-h-32 opacity-100 mt-4" : "max-h-0 opacity-0"}`
              }>
              
              <div className="flex flex-col md:flex-row items-center gap-6">
                <a
                  href="https://x.com/riekert_billy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body text-sm text-lead hover:text-ink transition-colors duration-300">
                  
                  X / Twitter
                </a>
                <a
                  href="mailto:christopherriekert@gmail.com"
                  className="font-body text-sm text-lead hover:text-ink transition-colors duration-300">
                  
                  Email
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-center gap-3 flex-wrap">
          <DonateButton href="https://buy.tryspeed.com/plink_live_mrdubqpogZW5MJiy" />
          <StrikeTip />
          <ShakepayTip />
        </div>

        <div className="mt-8 pt-6 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
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