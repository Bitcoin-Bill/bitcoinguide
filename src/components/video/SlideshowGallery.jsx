import React, { useState, useRef } from "react";
import { Image } from "@/components/ui/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { SLIDES as moneySlides } from "@/components/video/MoneySlides";
import { SLIDES as gameTheorySlides } from "@/components/video/GameTheorySlides";
import { SLIDES as greshamsLawSlides } from "@/components/video/GreshamsLawSlides";
import { SLIDES as lowTimePreferenceSlides } from "@/components/video/LowTimePreferenceSlides";
import { SLIDES as innovationsSlides } from "@/components/video/InnovationsSlides";
import { SLIDES as valueSlides } from "@/components/video/ValueSlides";
import { SLIDES as liminalStateSlides } from "@/components/video/LiminalStateSlides";
import { SLIDES as cognitiveDissonanceSlides } from "@/components/video/CognitiveDissonanceSlides";
import { SLIDES as monetaryAbuseSlides } from "@/components/video/MonetaryAbuseSlides";
import { SLIDES as humanNatureSlides } from "@/components/video/HumanNatureSlides";
import { SLIDES as intuitionSlides } from "@/components/video/IntuitionSlides";
import { SLIDES as conclusionSlides } from "@/components/video/ConclusionSlides";

const ICON_BASE = "https://media.base44.com/images/public/6a4d10bcc776843a6d26b955";

const SECTIONS = [
  { name: "Evolution of Money", accent: "#F97316", icon: `${ICON_BASE}/efe742dd7_Moneys.png`, description: "A simple guide — from stones to Satoshi.", slides: moneySlides },
  { name: "Game Theory", accent: "#FF2D95", icon: `${ICON_BASE}/f66b036e3_Gametheory.png`, description: "How rational incentives keep Bitcoin honest.", slides: gameTheorySlides },
  { name: "Gresham's Law", accent: "#9CA3AF", icon: `${ICON_BASE}/16766f4bd_Greshamslaw.png`, description: "Why bad money drives out good — and how Bitcoin flips the script.", slides: greshamsLawSlides },
  { name: "Low-Time Preference", accent: "#FACC15", icon: `${ICON_BASE}/79ac2fd82_Lowtimepreferene.png`, description: "How Bitcoin rewards patience and long-term thinking.", slides: lowTimePreferenceSlides },
  { name: "Innovations", accent: "#14B8A6", icon: `${ICON_BASE}/a9b5387db_Innovations.png`, description: "How sound money sparks creation and fiat flattens it.", slides: innovationsSlides },
  { name: "Value", accent: "#FF6FB5", icon: `${ICON_BASE}/89b0043aa_value.png`, description: "How Bitcoin turns energy into incorruptible proof.", slides: valueSlides },
  { name: "Liminal State", accent: "#10B981", icon: `${ICON_BASE}/1c090c010_Liminalstate.png`, description: "How fiat traps the mind between reality and illusion.", slides: liminalStateSlides },
  { name: "Cognitive Dissonance", accent: "#9F1239", icon: `${ICON_BASE}/90ad8dd2b_cognitivedissonance.png`, description: "The mental discomfort that keeps the fiat illusion alive.", slides: cognitiveDissonanceSlides },
  { name: "Monetary Abuse", accent: "#CC5500", icon: `${ICON_BASE}/36dbbfe62_monetaryabuse.png`, description: "How fiat mirrors the tactics of an abuser.", slides: monetaryAbuseSlides },
  { name: "Human Nature", accent: "#34D399", icon: `${ICON_BASE}/b1e0599c1_humannature.png`, description: "How Bitcoin turns selfishness into security.", slides: humanNatureSlides },
  { name: "Intuition", accent: "#0891B2", icon: `${ICON_BASE}/da2e0827a_intuition.png`, description: "Recognizing the fiat illusion for what it is.", slides: intuitionSlides },
  { name: "Conclusion", accent: "#000000", icon: `${ICON_BASE}/dda3bc4e7_conclusion.png`, description: "The principles that anchor civilization back to something incorruptible.", slides: conclusionSlides },
];

export default function SlideshowGallery({ reels = [] }) {
  const [active, setActive] = useState(0);
  const [index, setIndex] = useState(0);
  const [mode, setMode] = useState("slideshow");
  const sections = SECTIONS.map((s, i) => ({ ...s, reel: reels[i] }));
  const section = sections[active];
  const slide = section.slides[index];
  const reel = section.reel;

  const selectSection = (i) => {
    setActive(i);
    setIndex(0);
  };
  const goSection = (dir) => {
    setActive((a) => (a + dir + sections.length) % sections.length);
    setIndex(0);
  };
  const total = section.slides.length;
  const [hideArrows, setHideArrows] = useState(false);
  const hideTimer = useRef(null);
  const go = (dir) => {
    setIndex((i) => (i + dir + total) % total);
    setHideArrows(true);
    if (hideTimer.current) clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => setHideArrows(false), 700);
  };

  const touchX = useRef(null);
  const onTouchStart = (e) => {
    touchX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e) => {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
    touchX.current = null;
  };

  return (
    <div className="mt-16">
      {/* Cube selector */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 md:gap-6 mb-10">
        {sections.map((s, i) => {
          const isActive = i === active;
          return (
            <button
              key={s.name}
              onClick={() => selectSection(i)}
              className="flex flex-col items-center gap-2 group"
              aria-pressed={isActive}
            >
              <div
                className="rounded-xl transition-all duration-200"
                style={
                  isActive
                    ? {
                        backgroundColor: `${s.accent}26`,
                        boxShadow: `0 0 12px ${s.accent}99`,
                      }
                    : undefined
                }
              >
                <img
                  src={s.icon}
                  alt={`${s.name} cube`}
                  className="w-12 h-12 md:w-14 md:h-14 object-contain transition-transform duration-200 group-hover:-translate-y-1 p-1"
                  style={{
                    filter: isActive
                      ? `drop-shadow(0 0 4px ${s.accent})`
                      : "drop-shadow(0 2px 3px rgba(0,0,0,0.18))",
                  }}
                />
              </div>
              <span
                className={`text-[11px] md:text-xs text-center leading-tight transition-colors ${
                  isActive ? "text-ink font-medium" : "text-lead group-hover:text-ink"
                }`}
              >
                {s.name}
              </span>
            </button>
          );
        })}
      </div>

      {/* Active section viewer */}
      <div className="border-t border-border pt-8">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-10 h-px" style={{ backgroundColor: section.accent }} />
          <h3 className="font-heading text-xl md:text-2xl font-light text-ink">{section.name}</h3>
        </div>
        <p className="font-heading text-base text-lead italic mb-6">{section.description}</p>

        {/* Mode toggle — Slideshow / Reel */}
        <div className="flex items-center gap-2 mb-6">
          {["slideshow", "reel"].map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`px-4 py-1.5 rounded-full font-mono text-[10px] tracking-[0.2em] uppercase border transition-colors duration-200 ${
                mode === m
                  ? "border-transparent text-white"
                  : "border-border text-lead hover:text-ink"
              }`}
              style={mode === m ? { backgroundColor: section.accent } : undefined}
            >
              {m === "slideshow" ? "Slideshow" : "Reel"}
            </button>
          ))}
        </div>

        {mode === "slideshow" ? (
          <div className="md:grid md:grid-cols-[210px_1fr] md:gap-8">
            {/* Chapters */}
            <div className="md:pr-2 mb-4 md:mb-0">
              <p className="hidden md:block font-mono text-[10px] tracking-[0.15em] uppercase text-lead/60 mb-3">
                Chapters
              </p>
              <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-x-hidden md:overflow-y-auto md:max-h-[70vh] pb-2 md:pb-0 -mx-1 px-1">
                {section.slides.map((s, i) => {
                  const isActive = i === index;
                  return (
                    <button
                      key={i}
                      onClick={() => setIndex(i)}
                      className={`shrink-0 md:shrink text-left px-3 py-2 rounded-lg border transition-colors duration-200 whitespace-nowrap md:whitespace-normal ${
                        isActive
                          ? "border-transparent text-white"
                          : "border-border text-lead hover:text-ink hover:bg-secondary/60"
                      }`}
                      style={isActive ? { backgroundColor: section.accent } : undefined}
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

            {/* Slide */}
            <div className="max-w-[300px] md:max-w-none mx-auto md:mx-0 w-full">
              <div className="flex items-center justify-between mb-2 px-1">
                <p
                  className="font-mono text-[10px] tracking-[0.15em] uppercase"
                  style={{ color: section.accent }}
                >
                  {index + 1} / {section.slides.length}
                </p>
                <p className="font-mono text-[10px] tracking-[0.15em] uppercase text-lead/50">
                  swipe or click for next image
                </p>
              </div>
              <div className="flex items-center gap-2 md:gap-3">
                <button
                  onClick={() => go(-1)}
                  aria-label="Previous slide"
                  className="hidden md:flex shrink-0 items-center justify-center h-9 w-9 rounded-full text-white hover:brightness-110 transition-colors duration-200"
                  style={{ backgroundColor: section.accent }}
                >
                  <ChevronLeft size={20} className="drop-shadow-[0_1px_1px_rgba(0,0,0,0.6)]" />
                </button>
                <div
                  className="group relative flex-1 md:flex-none md:w-fit rounded-2xl overflow-hidden border border-border bg-[#121212] touch-pan-y cursor-pointer select-none"
                  onTouchStart={onTouchStart}
                  onTouchEnd={onTouchEnd}
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    go(e.clientX - rect.left < rect.width / 2 ? -1 : 1);
                  }}
                >
                  <Image
                    src={slide.image}
                    alt={`${slide.title} — ${slide.subtitle}`}
                    className="w-full md:w-auto md:h-[70vh] aspect-[9/16]"
                    fittingType="fit"
                  />
                </div>
                <button
                  onClick={() => go(1)}
                  aria-label="Next slide"
                  className="hidden md:flex shrink-0 items-center justify-center h-9 w-9 rounded-full text-white hover:brightness-110 transition-colors duration-200"
                  style={{ backgroundColor: section.accent }}
                >
                  <ChevronRight size={20} className="drop-shadow-[0_1px_1px_rgba(0,0,0,0.6)]" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-[300px] md:max-w-none mx-auto">
            {reel ? (
              <video
                key={reel.video}
                src={reel.video}
                poster={reel.image}
                controls
                playsInline
                className="w-full md:w-auto md:h-[70vh] aspect-[9/16] rounded-2xl border border-border bg-black object-contain"
              />
            ) : (
              <div className="w-full md:w-auto md:h-[70vh] aspect-[9/16] rounded-2xl border border-border bg-[#121212] flex items-center justify-center">
                <p className="font-mono text-[10px] tracking-[0.15em] uppercase text-lead/50">
                  No reel available
                </p>
              </div>
            )}
          </div>
        )}

        {/* Next Section — shared across both modes */}
        <p className="text-center font-mono text-[10px] tracking-[0.2em] uppercase text-lead/50 mt-6">
          Next Section
        </p>
        <div className="flex items-center justify-center gap-3 mt-2">
          <button
            onClick={() => goSection(-1)}
            aria-label="Previous section"
            className="flex items-center justify-center h-8 w-8 rounded-full border border-border text-lead hover:text-ink hover:border-ink/40 transition-colors duration-200"
          >
            <ChevronLeft size={16} />
          </button>
          <p className="font-mono text-[10px] tracking-[0.15em] uppercase text-lead/70">
            {active + 1} / {sections.length}
          </p>
          <button
            onClick={() => goSection(1)}
            aria-label="Next section"
            className="flex items-center justify-center h-8 w-8 rounded-full border border-border text-lead hover:text-ink hover:border-ink/40 transition-colors duration-200"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}