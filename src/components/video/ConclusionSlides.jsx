import React from "react";
import SlideshowChapters from "@/components/video/SlideshowChapters";

const BASE = "https://media.base44.com/images/public/6a4d10bcc776843a6d26b955";

// Slides 1–8 in order.
export const SLIDES = [
  {
    image: `${BASE}/3a8cddde5_1.jpeg`,
    title: "1. The Conclusion",
    subtitle: "A New Monetary Paradigm",
  },
  {
    image: `${BASE}/281787471_2.jpeg`,
    title: "2. The Shift",
    subtitle: "A New Kind of Mirror",
  },
  {
    image: `${BASE}/e00b0ef45_3.jpeg`,
    title: "3. The Core Principles",
    subtitle: "Sound Money, Low-Time Preference, Deflation by Design",
  },
  {
    image: `${BASE}/990e494be_4.jpeg`,
    title: "4. Fiat's Liminal State",
    subtitle: "Breaking the Spell of Cognitive Dissonance",
  },
  {
    image: `${BASE}/cece13ffb_5.jpeg`,
    title: "5. Innovation & Energy",
    subtitle: "Proof of Work Is Creation Through Order",
  },
  {
    image: `${BASE}/d08536741_6.jpeg`,
    title: "6. Self-Sovereignty",
    subtitle: "The Quiet Revolution",
  },
  {
    image: `${BASE}/644f2fc67_7.jpeg`,
    title: "7. Redefining Value",
    subtitle: "Money Tied to Energy Is Money Tied to Reality",
  },
  {
    image: `${BASE}/996af8399_8.jpeg`,
    title: "8. The Human Element",
    subtitle: "Changing Incentives, Not People",
  },
];

export default function ConclusionSlides() {
  return (
    <SlideshowChapters
      slides={SLIDES}
      title="Conclusion"
      description="The principles that anchor civilization back to something incorruptible."
      accent="#FF8C00"
      defaultOpen
    />
  );
}