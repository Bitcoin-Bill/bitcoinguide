import React from "react";
import { Instagram, ExternalLink } from "lucide-react";

const INSTAGRAM_URL =
  "https://www.instagram.com/bitcoin_guideapp?igsi=MWRnNGdvdXZrYzcybw%3D%3D&utm_source=qr";

export default function InstagramWatch() {
  return (
    <div className="mt-10 md:mt-14">
      <div className="max-w-md mx-auto rounded-2xl border border-border bg-card overflow-hidden shadow-sm">
        <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
          <div className="flex items-center justify-center h-9 w-9 rounded-full bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF]">
            <Instagram size={18} className="text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-mono text-xs tracking-wide text-ink truncate">
              bitcoin_guideapp
            </p>
            <p className="font-mono text-[10px] tracking-wide text-lead/70">
              Instagram
            </p>
          </div>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#DD2A7B] text-white font-mono text-[10px] tracking-[0.15em] uppercase hover:opacity-90 transition-opacity"
          >
            Follow
          </a>
        </div>
        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="block group"
        >
          <div className="relative aspect-[4/3] bg-gradient-to-br from-[#F58529]/15 via-[#DD2A7B]/15 to-[#8134AF]/15 flex items-center justify-center">
            <div className="flex flex-col items-center gap-2 text-center px-6">
              <div className="flex items-center justify-center h-14 w-14 rounded-full bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF]">
                <Instagram size={26} className="text-white" />
              </div>
              <p className="font-heading text-base text-ink">
                Watch the reels on Instagram
              </p>
              <p className="font-mono text-[10px] tracking-[0.15em] uppercase text-lead/70">
                @bitcoin_guideapp
              </p>
            </div>
            <ExternalLink
              size={16}
              className="absolute top-3 right-3 text-lead/50 group-hover:text-ink transition-colors"
            />
          </div>
        </a>
      </div>
    </div>
  );
}