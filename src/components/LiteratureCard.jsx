import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, ExternalLink, X } from "lucide-react";

function slugify(s) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export default function LiteratureCard({ item, index }) {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);
  const [pinned, setPinned] = useState(false);
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const [quickViewItem, setQuickViewItem] = useState(null);
  const quickViewUrl = quickViewItem ? quickViewItem.url : item.url;
  const quickViewTitle = quickViewItem ? quickViewItem.title : item.title;

  const isInternalLink = (url) => url && url.startsWith("/");

  const handleLinkClick = (link) => {
    if (isInternalLink(link.url)) {
      navigate(link.url);
    } else {
      setQuickViewItem(link);
      setQuickViewOpen(true);
    }
  };

  return (
    <>
      <motion.div
        id={slugify(item.title)}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, delay: index * 0.06 }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => setPinned((p) => !p)}
        className="group relative border-b border-border py-5 md:py-6 scroll-mt-20 cursor-pointer"
      >
        <div className="flex items-start gap-4 md:gap-6">
          {/* Cube icon */}
          {item.icon ? (
            <div className="w-14 h-14 md:w-16 md:h-16 shrink-0 overflow-hidden">
              <img
                src={item.icon}
                alt={`${item.title} icon`}
                className="w-full h-full object-contain drop-shadow-md transition-all duration-300"
                style={
                  hovered
                    ? { filter: `drop-shadow(0 0 6px ${item.accent || "var(--page-accent)"})` }
                    : undefined
                }
              />
            </div>
          ) : (
            <span className="font-mono text-xs text-lead/50 pt-1 w-8 shrink-0">
              {String(index + 1).padStart(2, "0")}
            </span>
          )}

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-heading text-xl md:text-2xl text-ink group-hover:text-[var(--page-accent)] transition-colors duration-300">
                  {item.title}
                </h3>
                {item.author && (
                  <p className="font-body text-sm text-lead mt-1">
                    {item.author}
                  </p>
                )}
              </div>

              {/* Category badge */}
              {item.category && (
                <span className="font-mono text-[10px] tracking-widest uppercase text-lead border border-border px-2 py-1 shrink-0">
                  {item.category}
                </span>
              )}
            </div>

            {/* Description — revealed on hover */}
            {!item.links && (
            <motion.div
              initial={false}
              animate={{ height: hovered || pinned ? "auto" : 0, opacity: hovered || pinned ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <p className="font-body text-sm text-lead leading-relaxed mt-3 max-w-xl">
                {item.description}
              </p>
              {item.secondary_links && (
                <div className="flex flex-col gap-1 mt-3">
                  {item.secondary_links.map((link, li) =>
                    isInternalLink(link.url) ? (
                      <button
                        key={li}
                        onClick={() => navigate(link.url)}
                        className="font-body text-xs text-lead hover:text-[var(--page-accent)] transition-colors duration-300 text-left w-fit"
                      >
                        → {link.title}
                      </button>
                    ) : (
                      <a
                        key={li}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-body text-xs text-lead hover:text-[var(--page-accent)] transition-colors duration-300 w-fit"
                      >
                        → {link.title}
                      </a>
                    )
                  )}
                </div>
              )}
              {item.type && (
                <div className="flex items-center gap-2 mt-3 text-xs font-mono text-lead/60">
                  <FileText size={12} />
                  <span>{item.type}</span>
                </div>
              )}
            </motion.div>
            )}

            {/* Stacked links for multi-link cards */}
            {item.links && (
              <div className="flex flex-col gap-2 mt-4 w-full max-w-xs">
                {item.links.map((link, li) => (
                  <div key={li} className="flex items-center gap-3">
                    <button
                      onClick={() => handleLinkClick(link)}
                      className="flex-1 font-mono text-[10px] tracking-widest uppercase text-lead border border-border px-3 py-2 hover:bg-[var(--page-accent)] hover:text-parchment hover:border-[var(--page-accent)] transition-colors duration-300 text-left"
                    >
                      {link.title}
                    </button>
                    {isInternalLink(link.url) ? (
                      <button
                        onClick={() => navigate(link.url)}
                        className="text-lead/30 group-hover:text-[var(--page-accent)] transition-colors duration-300 shrink-0"
                      >
                        <ExternalLink size={16} />
                      </button>
                    ) : (
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-lead/30 group-hover:text-[var(--page-accent)] transition-colors duration-300 shrink-0"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ExternalLink size={16} />
                      </a>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Action buttons (single-link cards) */}
          {item.url && !item.links && !item.externalOnly && (
            <div className="shrink-0 mt-1 flex items-center gap-4">
              {isInternalLink(item.url) ? (
                <button
                  onClick={() => navigate(item.url)}
                  className="font-mono text-[10px] tracking-widest uppercase text-lead border border-border px-3 py-1.5 hover:bg-[var(--page-accent)] hover:text-parchment hover:border-[var(--page-accent)] transition-colors duration-300"
                >
                  View
                </button>
              ) : (
                <button
                  onClick={() => setQuickViewOpen(true)}
                  className="font-mono text-[10px] tracking-widest uppercase text-lead border border-border px-3 py-1.5 hover:bg-[var(--page-accent)] hover:text-parchment hover:border-[var(--page-accent)] transition-colors duration-300"
                >
                  View
                </button>
              )}
              {!isInternalLink(item.url) && (
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lead/30 group-hover:text-[var(--page-accent)] transition-colors duration-300"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ExternalLink size={16} />
                </a>
              )}
            </div>
          )}

          {item.url && !item.links && item.externalOnly && (
            <div className="shrink-0 mt-1">
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[10px] tracking-widest uppercase text-lead border border-border px-3 py-1.5 hover:bg-[var(--page-accent)] hover:text-parchment hover:border-[var(--page-accent)] transition-colors duration-300 inline-block"
              >
                {item.externalLabel || "Read on X"}
              </a>
            </div>
          )}
        </div>
      </motion.div>

      {/* Quick View Modal */}
      <AnimatePresence>
        {quickViewOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/60 backdrop-blur-sm p-4 md:p-8"
            onClick={() => setQuickViewOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="bg-parchment w-full max-w-4xl h-[80vh] md:h-[85vh] rounded-sm shadow-2xl overflow-hidden flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-border">
                <div className="flex items-center gap-3">
                  {item.icon && (
                    <img src={item.icon} alt="" className="w-8 h-8 object-contain" />
                  )}
                  <h4 className="font-heading text-lg text-ink">{quickViewTitle}</h4>
                </div>
                <div className="flex items-center gap-3">
                  <a
                    href={quickViewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-[10px] tracking-widest uppercase text-lead hover:text-[var(--page-accent)] transition-colors duration-300"
                  >
                    Open Full
                  </a>
                  <button
                    onClick={() => setQuickViewOpen(false)}
                    className="text-lead hover:text-ink transition-colors duration-300"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>
              <iframe
                src={quickViewUrl}
                title={quickViewTitle}
                className="flex-1 w-full bg-parchment"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}