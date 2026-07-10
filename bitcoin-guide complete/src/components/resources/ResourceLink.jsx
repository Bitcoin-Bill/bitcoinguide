import React, { useState, useRef } from "react";
import { ExternalLink } from "lucide-react";
import { base44 } from "@/api/base44Client";
import TooltipPreview from "@/components/resources/TooltipPreview";

function slugify(s) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function getLinkType(url) {
  const u = url.toLowerCase();
  if (u.includes("youtube.com") || u.includes("youtu.be")) return "YouTube Video";
  if (u.includes("x.com") || u.includes("twitter.com")) return "X / Twitter";
  if (u.endsWith(".pdf") || u.includes("bitcoin-whitepaper")) return "PDF";
  if (u.includes("apps.apple.com") || u.includes("play.google.com")) return "App Store";
  if (u.includes("podcast")) return "Podcast";
  return "Website";
}

export default function ResourceLink({ link }) {
  const linkType = getLinkType(link.url);
  const [previewData, setPreviewData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const fetchedRef = useRef(false);
  const hoverTimerRef = useRef(null);

  const fetchPreview = async () => {
    if (fetchedRef.current || loading) return;
    setLoading(true);
    try {
      const res = await base44.functions.invoke("fetchLinkPreview", { url: link.url });
      setPreviewData(res.data);
      fetchedRef.current = true;
    } catch {
      fetchedRef.current = true;
    }
    setLoading(false);
  };

  const handleMouseEnter = () => {
    hoverTimerRef.current = setTimeout(() => {
      if (!fetchedRef.current) fetchPreview();
      setShowPreview(true);
    }, 400);
  };

  const handleMouseLeave = () => {
    clearTimeout(hoverTimerRef.current);
    setShowPreview(false);
  };

  const linkClasses =
    "group flex items-start gap-4 border border-border bg-parchment hover:border-verdigris hover:shadow-sm transition-all duration-300 p-5";

  const content = (
    <>
      <div className="flex-1 min-w-0">
        <h3 className="font-heading text-lg text-ink group-hover:text-verdigris transition-colors duration-300 flex items-center gap-2 flex-wrap">
          {link.title}
          <span className="font-mono text-[9px] tracking-widest uppercase text-lead/50 border border-border px-1.5 py-0.5 rounded">
            {linkType}
          </span>
        </h3>
        <p className="font-body text-sm text-lead leading-relaxed mt-1">
          {link.description}
        </p>
      </div>
      <ExternalLink
        size={18}
        className="text-lead/40 group-hover:text-verdigris transition-colors duration-300 shrink-0 mt-1"
      />
    </>
  );

  return (
    <div
      id={slugify(link.title)}
      className={`relative ${showPreview ? "z-50" : ""} scroll-mt-20`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <a href={link.url} target="_blank" rel="noopener noreferrer" className={linkClasses}>
        {content}
      </a>
      {showPreview && (
        <TooltipPreview data={previewData} loading={loading} link={link} />
      )}
    </div>
  );
}