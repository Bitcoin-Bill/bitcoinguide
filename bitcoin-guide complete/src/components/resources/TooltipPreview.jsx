import React from "react";
import { motion } from "framer-motion";
import { FileText } from "lucide-react";

export default function TooltipPreview({ data, loading, link }) {
  const isPdf = data && data.type === 'pdf';

  return (
    <motion.div
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.15 }}
      className="absolute top-full left-0 mt-2 z-50 w-72 bg-parchment border border-verdigris/30 shadow-lg rounded-md overflow-hidden"
    >
      {loading ? (
        <div className="p-4 flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-lead/20 border-t-verdigris rounded-full animate-spin" />
          <span className="font-mono text-xs text-lead">Loading preview…</span>
        </div>
      ) : isPdf ? (
        <div className="p-3 flex items-start gap-3">
          <div className="shrink-0 w-10 h-12 bg-verdigris/10 border border-verdigris/30 rounded flex items-center justify-center">
            <FileText size={20} className="text-verdigris" />
          </div>
          <div className="min-w-0">
            <span className="font-mono text-[9px] tracking-widest uppercase text-verdigris/60">
              PDF Document
            </span>
            <p className="font-heading text-sm text-ink line-clamp-2 mt-0.5">
              {link?.title}
            </p>
            {link?.description && (
              <p className="font-body text-xs text-lead mt-1 line-clamp-2">{link.description}</p>
            )}
          </div>
        </div>
      ) : data && !data.error ? (
        <div>
          {data.image && (
            <img src={data.image} alt="" className="w-full h-28 object-cover" />
          )}
          <div className="p-3 flex items-start gap-2">
            {data.favicon && (
              <img src={data.favicon} alt="" className="w-4 h-4 mt-0.5 shrink-0" />
            )}
            <div className="min-w-0">
              <p className="font-heading text-sm text-ink line-clamp-2">{data.title}</p>
              {data.description && (
                <p className="font-body text-xs text-lead mt-1 line-clamp-2">{data.description}</p>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="p-3">
          <span className="font-mono text-xs text-lead">Preview unavailable</span>
        </div>
      )}
    </motion.div>
  );
}