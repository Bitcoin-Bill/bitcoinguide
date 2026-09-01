import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Image } from "@/components/ui/image";

/**
 * Chapter-menu variant of the slideshow. A list of slide titles sits beside
 * the viewer; clicking a title jumps straight to that slide. Same props as
 * <Slideshow /> so any slide set can swap between the two.
 *
 * Desktop: vertical chapter list on the left, slide on the right.
 * Mobile: horizontal scrollable chapter pills above the slide.
 */
export default function SlideshowChapters({
  slides,
  title,
  description,
  accent = "#FACC15",
  marginTop = "mt-20 md:mt-28",
  defaultOpen = false,
}) {
  const [open, setOpen] = useState(defaultOpen);
  const [index, setIndex] = useState(0);
  const total = slides.length;
  const slide = slides[index];

  return (
    <div className={marginTop}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-3 mb-2 text-left w-full group"
        aria-expanded={open}
      >
        <div className="w-12 h-px shrink-0" style={{ backgroundColor: accent }} />
        <h2 className="font-heading text-3xl md:text-4xl font-light text-ink leading-tight">
          {title}
        </h2>
        <ChevronDown
          size={26}
          strokeWidth={1.5}
          className={`text-lead shrink-0 transition-transform duration-300 ${
            open ? "rotate-180" : ""
          } group-hover:text-ink`}
        />
      </button>
      {description && (
        <p className="font-heading text-lg text-lead italic mb-6">{description}</p>
      )}

      {open && (
        <div className="md:grid md:grid-cols-[210px_1fr] md:gap-8">
          {/* Chapter list */}
          <div className="md:pr-2 mb-4 md:mb-0">
            <p className="hidden md:block font-mono text-[10px] tracking-[0.15em] uppercase text-lead/60 mb-3">
              Chapters
            </p>
            <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-visible pb-2 md:pb-0 -mx-1 px-1">
              {slides.map((s, i) => {
                const active = i === index;
                return (
                  <button
                    key={i}
                    onClick={() => setIndex(i)}
                    className={`shrink-0 md:shrink text-left px-3 py-2 rounded-lg border transition-colors duration-200 whitespace-nowrap md:whitespace-normal ${
                      active
                        ? "border-transparent text-white"
                        : "border-border text-lead hover:text-ink hover:bg-secondary/60"
                    }`}
                    style={active ? { backgroundColor: accent } : undefined}
                  >
                    <span className="font-mono text-[10px] tracking-[0.15em] uppercase opacity-70 mr-2">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-heading text-sm md:text-base">
                      {s.title.replace(/^\d+\.\s*/, "")}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Slide viewer */}
          <div className="max-w-[300px] md:max-w-[320px] mx-auto md:mx-0 w-full">
            <div className="rounded-2xl overflow-hidden border border-border bg-[#121212]">
              <Image
                src={slide.image}
                alt={`${slide.title} — ${slide.subtitle}`}
                className="w-full aspect-[9/16]"
                fittingType="fit"
              />
            </div>
            <div className="flex items-center justify-between mt-2 px-1">
              <p className="font-mono text-[10px] tracking-[0.15em] uppercase text-lead/60">
                {index + 1} / {total}
              </p>
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: accent }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}