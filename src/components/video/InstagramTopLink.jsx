import React from "react";
import { Instagram } from "lucide-react";

const INSTAGRAM_URL =
  "https://www.instagram.com/bitcoin_guideapp?igsi=MWRnNGdvdXZrYzcybw%3D%3D&utm_source=qr";

export default function InstagramTopLink() {
  return (
    <a
      href={INSTAGRAM_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 font-mono text-[10px] tracking-[0.15em] uppercase text-lead hover:text-ink transition-colors duration-300"
    >
      <Instagram size={13} className="text-[#DD2A7B]" />
      @bitcoin_guideapp
      <span className="text-lead/50">·</span>
      <span className="text-ink hover:underline">view on instagram</span>
    </a>
  );
}