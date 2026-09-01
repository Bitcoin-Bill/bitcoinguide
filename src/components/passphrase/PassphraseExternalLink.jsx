import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ExternalLink } from "lucide-react";

export default function PassphraseExternalLink({
  icon: Icon,
  title,
  subtitle,
  description,
  url,
  openLabel,
  color = "#16A34A",
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className="rounded-sm"
      style={{ borderWidth: 1, borderColor: `${color}80`, background: `${color}0D` }}
    >
      <button
        onClick={() => setExpanded((v) => !v)}
        className="group w-full flex items-center gap-2.5 px-4 py-2.5 text-left"
      >
        <Icon size={16} className="shrink-0" style={{ color }} />
        <span
          className="font-mono text-[10px] tracking-[0.2em] uppercase"
          style={{ color }}
        >
          {title}
        </span>
        {subtitle && (
          <span className="font-body text-sm text-ink/80 hidden sm:inline">
            {subtitle}
          </span>
        )}
        <ChevronDown
          size={14}
          className={`text-lead/50 group-hover:text-ink transition-all duration-300 ml-auto ${
            expanded ? "rotate-180" : ""
          }`}
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
            <div
              className="px-4 pb-4 pt-1 border-t"
              style={{ borderColor: `${color}4D` }}
            >
              <p className="font-body text-sm text-lead leading-relaxed mt-3 mb-3">
                {description}
              </p>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border px-4 py-2 font-mono text-xs tracking-[0.15em] uppercase transition-colors duration-300"
                style={{
                  borderColor: color,
                  color,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = color;
                  e.currentTarget.style.color = "hsl(var(--parchment))";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = color;
                }}
              >
                <Icon size={14} />
                {openLabel}
                <ExternalLink size={12} className="opacity-60" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}