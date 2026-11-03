import React from "react";
import { ChevronDown, Compass, Dices, KeyRound } from "lucide-react";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

function slugify(s) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export default function ResourceSectionNav({ sections, onJump }) {
  const goTo = (title) => {
    if (onJump) {
      onJump(title);
      return;
    }
    const el = document.getElementById(slugify(title));
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="flex items-center gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="inline-flex items-center gap-2 border border-border bg-parchment hover:border-[var(--page-accent)] hover:shadow-sm transition-all duration-300 px-4 py-2.5 rounded-sm group">
            <Compass size={15} className="text-[var(--page-accent)]" />
            <span className="font-mono text-xs tracking-[0.2em] uppercase text-lead group-hover:text-ink transition-colors duration-300">
              Menu
            </span>
            <ChevronDown size={14} className="text-lead/60 group-hover:text-ink transition-colors duration-300" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-56 max-h-[60vh] overflow-y-auto bg-popover border-border">
          <DropdownMenuLabel className="font-mono text-[10px] tracking-[0.2em] uppercase text-lead/60">
            Sections
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {sections.map((section, i) => (
            <DropdownMenuItem
              key={i}
              onSelect={() => goTo(section.title)}
              className="font-mono text-xs tracking-[0.1em] uppercase text-lead hover:text-ink cursor-pointer"
            >
              {section.title}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      <Link
        to="/dice-entropy"
        aria-label="Dice Rolls & Entropy"
        className="inline-flex items-center justify-center h-[42px] w-[42px] border border-border bg-parchment hover:border-[#8B5CF6] hover:shadow-sm transition-all duration-300 rounded-sm group"
      >
        <Dices size={18} strokeWidth={1.4} className="text-[#8B5CF6] group-hover:scale-110 transition-transform duration-300" />
      </Link>
      <Link
        to="/passphrase"
        aria-label="BIP39 Passphrase"
        className="inline-flex items-center justify-center h-[42px] w-[42px] border border-border bg-parchment hover:border-[#16A34A] hover:shadow-sm transition-all duration-300 rounded-sm group"
      >
        <KeyRound size={18} strokeWidth={1.4} className="text-[#16A34A] group-hover:scale-110 transition-transform duration-300" />
      </Link>
    </div>
  );
}