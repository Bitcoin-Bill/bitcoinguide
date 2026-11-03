import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, ChevronDown } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

function slugify(s) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function getLinkType(url) {
  const u = url.toLowerCase();
  if (u.includes("youtube.com") || u.includes("youtu.be")) return "YouTube Video";
  if (u.includes("://x.com") || u.includes("twitter.com")) return "X / Twitter";
  if (u.endsWith(".pdf") || u.includes("bitcoin-whitepaper")) return "PDF";
  if (u.includes("apps.apple.com") || u.includes("play.google.com")) return "App Store";
  if (u.includes("podcast")) return "Podcast";
  return "Website";
}

export default function ResourceLink({ link, index, noLink = false }) {
  const { theme } = useTheme();
  const [expanded, setExpanded] = useState(false);
  const linkType = getLinkType(link.url);
  const thumbnail =
    link.thumbnailDark && theme === "dark" ? link.thumbnailDark : link.thumbnail;

  return (
    <div id={slugify(link.title)} className="scroll-mt-20">
      <div
        role="button"
        tabIndex={0}
        onClick={() => setExpanded((v) => !v)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setExpanded((v) => !v);
          }
        }}
        className="group flex items-start gap-4 border border-border bg-parchment hover:border-[var(--page-accent)] hover:shadow-sm transition-all duration-300 p-5 cursor-pointer"
      >
        {thumbnail && (
          <img
            src={thumbnail}
            alt={link.title}
            className={`w-14 h-14 rounded-sm shrink-0 border border-border group-hover:border-[var(--page-accent)] transition-colors duration-300 ${
              link.fit === "contain" ? "object-contain bg-parchment" : "object-cover"
            } ${link.darkInvert ? "dark:invert" : ""}`}
          />
        )}
        <div className="flex-1 min-w-0">
          <h3 className="font-heading text-lg text-ink group-hover:text-[var(--page-accent)] transition-colors duration-300 flex items-center gap-2 flex-wrap">
            {link.title}
            <span className="font-mono text-[9px] tracking-widest uppercase text-lead/50 border border-border px-1.5 py-0.5 rounded">
              {linkType}
            </span>
          </h3>

          <AnimatePresence initial={false}>
            {expanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <p className="font-body text-sm text-lead leading-relaxed mt-2">
                  {link.description}
                </p>
                {!noLink && (
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-1.5 mt-3 font-mono text-[10px] tracking-widest uppercase text-lead border border-border px-3 py-1.5 hover:bg-[var(--page-accent)] hover:text-parchment hover:border-[var(--page-accent)] transition-colors duration-300"
                  >
                    Open Link
                    <ExternalLink size={12} />
                  </a>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <ChevronDown
          size={18}
          className={`text-lead/40 group-hover:text-[var(--page-accent)] transition-all duration-300 shrink-0 mt-1 ${
            expanded ? "rotate-180" : ""
          }`}
        />
      </div>
    </div>
  );
}