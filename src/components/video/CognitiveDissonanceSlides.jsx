import React from "react";
import Slideshow from "@/components/video/Slideshow";

const BASE = "https://media.base44.com/images/public/6a4d10bcc776843a6d26b955";

// Slides 1–6 in order.
export const SLIDES = [
  {
    image: `${BASE}/3c02d8c6f_1.jpeg`,
    title: "1. Cognitive Dissonance",
    subtitle: "The Enemy Within",
  },
  {
    image: `${BASE}/bcfa8e554_2.jpeg`,
    title: "2. Definition",
    subtitle: "When Reality Collides with Belief",
  },
  {
    image: `${BASE}/a8186d2f4_3.jpeg`,
    title: "3. Everyday Examples",
    subtitle: "We Hate Being Wrong More Than We Love Being Free",
  },
  {
    image: `${BASE}/62c6fe741_4.jpeg`,
    title: "4. Why It Matters",
    subtitle: "How Rationalization Keeps the Lie Breathing",
  },
  {
    image: `${BASE}/1cceec6ec_5.jpeg`,
    title: "5. The Cure",
    subtitle: "Seek Discomfort",
  },
  {
    image: `${BASE}/0389cf0ad_6.jpeg`,
    title: "6. Face the Enemy Within",
    subtitle: "That's Where Freedom Starts",
  },
];

export default function CognitiveDissonanceSlides() {
  return (
    <Slideshow
      slides={SLIDES}
      title="Cognitive Dissonance"
      description="The mental discomfort that keeps the fiat illusion alive — and how to break free."
      accent="#C026D3"
    />
  );
}