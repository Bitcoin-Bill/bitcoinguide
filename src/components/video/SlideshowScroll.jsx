import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Image } from "@/components/ui/image";

/**
 * Vertical scroll-deck variant of the slideshow. All slides render as
 * stacked portrait cards inside a snap-scrolling column — no arrows, no
 * dots; users simply scroll through at their own pace. Same props as
 * <Slideshow /> so any slide set can swap between the two.
 */
export default function SlideshowScroll({
  slides,
  title,
  description,
  accent = "#FACC15",
  marginTop = "mt-20 md:mt-28",
  defaultOpen = false,
}) {
  const [open, setOpen] = useState(defaultOpen);
  const total = slides.length;

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
        <div className="max-w-[300px] mx-auto">
          <div className="flex flex-col gap-4 max-h-[78vh] overflow-y-auto snap-y snap-mandatory py-1 -mr-2 pr-2">
            {slides.map((slide, i) => (
              <div key={i} className="snap-start shrink-0">
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
                    {i + 1} / {total}
                  </p>
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ backgroundColor: accent }}
                  />
                </div>
              </div>
            ))}
          </div>
          <p className="text-center mt-3 text-xs text-lead/70 italic">
            Scroll through the slides at your own pace.
          </p>
        </div>
      )}
    </div>
  );
}