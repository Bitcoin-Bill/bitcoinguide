import React from "react";
import { ChevronDown, Compass } from "lucide-react";
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

export default function ResourceSectionNav({ sections }) {
  const goTo = (title) => {
    const el = document.getElementById(slugify(title));
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="inline-flex items-center gap-2 border border-border bg-parchment hover:border-[var(--page-accent)] hover:shadow-sm transition-all duration-300 px-4 py-2.5 rounded-sm group">
          <Compass size={15} className="text-[var(--page-accent)]" />
          <span className="font-mono text-xs tracking-[0.2em] uppercase text-lead group-hover:text-ink transition-colors duration-300">
            Jump to section
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
  );
}