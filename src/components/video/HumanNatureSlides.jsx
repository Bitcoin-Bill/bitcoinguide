import React from "react";
import Slideshow from "@/components/video/Slideshow";

const BASE = "https://media.base44.com/images/public/6a4d10bcc776843a6d26b955";

// Slides 1–6 in order.
export const SLIDES = [
  {
    image: `${BASE}/05984958e_1.jpeg`,
    title: "1. Bitcoin & Human Nature",
    subtitle: "Designing Fairness in a Flawed World",
  },
  {
    image: `${BASE}/79e3c090b_2.jpeg`,
    title: "2. The Premise",
    subtitle: "Working With Human Nature, Not Against It",
  },
  {
    image: `${BASE}/15715e6fa_3.jpeg`,
    title: "3. The Flawed System",
    subtitle: "Fiat Rewards Proximity to Power",
  },
  {
    image: `${BASE}/f4efb7539_4.jpeg`,
    title: "4. The Reality of Selfishness",
    subtitle: "Same Trait, Two Outcomes — Design Matters",
  },
  {
    image: `${BASE}/8635ab4bc_5.jpeg`,
    title: "5. The Design Shift",
    subtitle: "Don't Fix People — Fix Incentives",
  },
  {
    image: `${BASE}/8b8637d38_6.jpeg`,
    title: "6. Beyond Debate",
    subtitle: "Architecture, Not Ideology",
  },
];

export default function HumanNatureSlides() {
  return (
    <Slideshow
      slides={SLIDES}
      title="Human Nature"
      description="How Bitcoin turns human selfishness into security instead of corruption."
      accent="#22C55E"
    />
  );
}