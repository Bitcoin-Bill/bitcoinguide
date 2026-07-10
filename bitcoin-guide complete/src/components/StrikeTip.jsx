import React from "react";

export default function StrikeTip() {
  const href = "https://strike.me/l3itcoinl3ill";
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 bg-black border border-[#ADD8E6]/40 rounded-md px-3 py-1.5 hover:opacity-80 transition-opacity duration-300"
      title="Tip on Strike"
    >
      <img
        src="https://media.base44.com/images/public/6a4d10bcc776843a6d26b955/9fb9bd1aa_Screenshot2026-07-09at14901PM.png"
        alt="Strike"
        className="h-5 w-5 object-contain"
      />
      <span className="font-mono text-xs tracking-[0.15em] uppercase text-white">
        Tip on Strike
      </span>
    </a>
  );
}