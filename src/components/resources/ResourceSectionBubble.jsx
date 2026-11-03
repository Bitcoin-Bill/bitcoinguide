import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ArrowUp } from "lucide-react";
import ResourceLink from "@/components/resources/ResourceLink";
import ReadingListLink from "@/components/resources/ReadingListLink";

function slugify(s) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export default function ResourceSectionBubble({ section, color, expanded, onToggle }) {
  const id = slugify(section.title);
  const count = section.links.length;

  return (
    <div id={id} className="scroll-mt-44 md:scroll-mt-40">
      <div className="group relative rounded-2xl bg-white dark:bg-card border border-black/5 dark:border-white/5 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
        <span
          className="absolute top-0 left-0 right-0 h-1"
          style={{ background: `linear-gradient(90deg, ${color}, transparent)` }}
        />
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={expanded}
          className="w-full text-left p-6 flex items-start gap-4"
        >
          <span
            className="flex items-center justify-center h-2.5 w-2.5 rounded-full shrink-0 mt-2.5 transition-transform duration-500 group-hover:scale-125"
            style={{ background: color }}
          />
          <div className="flex-1 min-w-0">
            <h3 className="font-heading text-xl text-ink leading-tight flex items-center gap-2">
              {section.title}
            </h3>
            <p className="font-body text-sm text-lead leading-relaxed mt-1">
              {section.subtitle}
            </p>
          </div>
          <ChevronDown
            size={20}
            className="shrink-0 mt-1 transition-all duration-300"
            style={{ color: expanded ? color : "hsl(var(--lead))", transform: expanded ? "rotate(180deg)" : "rotate(0deg)" }}
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
              <div className="px-6 pb-6 pt-1 border-t border-black/5 dark:border-white/10">
                <div className="flex items-center justify-between mb-4 mt-3">
                  <span
                    className="font-mono text-[10px] tracking-[0.2em] uppercase"
                    style={{ color }}
                  >
                    {count} {count === 1 ? "resource" : "resources"}
                  </span>
                  <button
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    aria-label="Return to top"
                    className="flex items-center justify-center h-6 w-6 rounded-sm transition-colors duration-300"
                    style={{ color }}
                  >
                    <ArrowUp size={14} />
                  </button>
                </div>
                <div className="flex flex-col gap-3 lg:grid lg:grid-cols-2 lg:gap-x-6">
                  {count > 0 ? (
                    section.links.map((link, li) => (
                      <ResourceLink key={li} link={link} noLink={!!section.disableUrls} />
                    ))
                  ) : (
                    <p className="font-mono text-xs text-lead/30 italic border border-dashed border-border p-5">
                      Coming soon
                    </p>
                  )}
                  {section.title === "Books & Literature" && <ReadingListLink />}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}