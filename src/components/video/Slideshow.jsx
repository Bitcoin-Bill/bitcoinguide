import React, { useState } from "react";
import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import { Image } from "@/components/ui/image";

/**
 * Reusable single-image carousel. `slides` is an array of
 * { image, title, subtitle }. `accent` controls the divider + active dot
 * color (a runtime value, so it is applied via inline style, not Tailwind).
 *
 * The section is collapsible: click the title to expand/contract the viewer.
 * The viewer uses a 9:16 portrait frame so the tall slide images fill the
 * frame naturally (no side letterboxing) while `fit` keeps every slide's
 * full height visible.
 */
export default function Slideshow({
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
  const go = (dir) => setIndex((i) => (i + dir + total) % total);
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
        <p className="font-heading text-lg text-lead italic mb-6">
          {description}
        </p>
      )}

      {open && (
        <div className="relative max-w-[300px] md:max-w-none mx-auto">
          <div className="md:w-fit md:mx-auto rounded-2xl overflow-hidden border border-border bg-[#121212]">
            <Image
              src={slide.image}
              alt={`${slide.title} — ${slide.subtitle}`}
              className="w-full md:w-auto md:h-[70vh] aspect-[9/16]"
              fittingType="fit"
            />
          </div>

          <div className="flex items-center justify-center gap-3 mt-3">
            <button
              onClick={() => go(-1)}
              aria-label="Previous slide"
              className="flex items-center justify-center h-9 w-9 rounded-full bg-black/55 backdrop-blur-sm text-white hover:bg-black/75 transition-colors duration-200"
            >
              <ChevronLeft size={20} />
            </button>
            <div className="flex items-center justify-center gap-2">
              {slides.map((s, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-200 ${
                    i === index ? "w-5" : "w-1.5 bg-lead/30 hover:bg-lead/50"
                  }`}
                  style={i === index ? { backgroundColor: accent } : undefined}
                />
              ))}
            </div>
            <button
              onClick={() => go(1)}
              aria-label="Next slide"
              className="flex items-center justify-center h-9 w-9 rounded-full bg-black/55 backdrop-blur-sm text-white hover:bg-black/75 transition-colors duration-200"
            >
              <ChevronRight size={20} />
            </button>
          </div>
          <p className="text-center mt-2 font-mono text-[10px] tracking-[0.15em] uppercase text-lead/60">
            {index + 1} / {total}
          </p>
        </div>
      )}
    </div>
  );
}