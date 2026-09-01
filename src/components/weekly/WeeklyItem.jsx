import React, { useState } from "react";
import { ExternalLink, BookOpen, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

export default function WeeklyItem({ item }) {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);

  if (item.popup) {
    return (
      <>
        <button
          onClick={() => setOpen(true)}
          className="group w-full text-left flex items-start gap-4 border border-border bg-parchment hover:border-[var(--page-accent)] hover:shadow-sm transition-all duration-300 p-4 rounded-sm cursor-pointer"
        >
          <BookOpen
            size={14}
            className="text-[var(--page-accent)] group-hover:text-[var(--page-accent)] shrink-0 mt-1"
          />
          <div className="flex-1 min-w-0">
            {item.source && (
              <span className="inline-block font-mono text-[9px] tracking-[0.15em] uppercase text-lead/60 border border-border px-1.5 py-0.5 rounded mb-2">
                {item.source}
              </span>
            )}
            <h4 className="font-heading text-base text-ink group-hover:text-[var(--page-accent)] transition-colors duration-300 leading-snug">
              {item.title}
            </h4>
            <p className="font-mono text-[10px] tracking-widest uppercase text-lead/50 mt-2">
              Read article →
            </p>
          </div>
        </button>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="max-w-2xl bg-parchment border-border max-h-[85vh] overflow-y-auto">
            <DialogHeader>
              {item.source && (
                <span className="inline-block w-fit font-mono text-[9px] tracking-[0.15em] uppercase text-lead/60 border border-border px-1.5 py-0.5 rounded mb-2">
                  {item.source}
                </span>
              )}
              <DialogTitle className="font-heading text-xl md:text-2xl font-light text-ink leading-tight">
                {item.title}
              </DialogTitle>
              {item.description && (
                <DialogDescription asChild>
                  <span className="sr-only">Article content</span>
                </DialogDescription>
              )}
            </DialogHeader>
            {item.description && (
              <p className="font-body text-[15px] leading-relaxed text-ink/90 whitespace-pre-line">
                {item.description}
              </p>
            )}
            {item.url && (
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 mt-4 font-mono text-[10px] tracking-[0.15em] uppercase text-[var(--page-accent)] border border-border hover:bg-[var(--page-accent)] hover:text-parchment px-3 py-1.5 transition-colors duration-300"
              >
                <ExternalLink size={12} />
                Open site
              </a>
            )}
          </DialogContent>
        </Dialog>
      </>
    );
  }

  return (
    <div className="group border border-border bg-parchment hover:border-[var(--page-accent)] hover:shadow-sm transition-all duration-300 p-4 rounded-sm">
      <button
        onClick={() => setExpanded((v) => !v)}
        className="w-full text-left flex items-start gap-4 cursor-pointer"
      >
        <div className="flex-1 min-w-0">
          {item.source && (
            <span className="inline-block font-mono text-[9px] tracking-[0.15em] uppercase text-lead/60 border border-border px-1.5 py-0.5 rounded mb-2">
              {item.source}
            </span>
          )}
          <h4 className="font-heading text-base text-ink group-hover:text-[var(--page-accent)] transition-colors duration-300 leading-snug">
            {item.title}
          </h4>
          <p className="font-mono text-[10px] tracking-widest uppercase text-lead/50 mt-2 flex items-center gap-1.5">
            {expanded ? "Hide" : "Read summary"}
            <ChevronDown
              size={12}
              className={`transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
            />
          </p>
        </div>
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
            <div className="mt-3 pt-3 border-t border-border">
              {item.description && (
                <p className="font-body text-sm text-lead/80 leading-relaxed mb-3">
                  {item.description}
                </p>
              )}
              {item.url?.includes("coinkite.com/entropy-technical-backgrounder") && (
                <a
                  href="https://entropylab.online/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 mb-2.5 font-mono text-[10px] tracking-[0.15em] uppercase text-[var(--page-accent)] hover:opacity-80 transition-colors duration-300"
                >
                  <ExternalLink size={12} />
                  EntropyLab — Air-gapped Bitcoin calculator
                </a>
              )}
              {item.url && (
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-mono text-[10px] tracking-[0.15em] uppercase text-[var(--page-accent)] border border-border hover:bg-[var(--page-accent)] hover:text-parchment px-3 py-1.5 transition-colors duration-300"
                >
                  <ExternalLink size={12} />
                  View original source
                </a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}