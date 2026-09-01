import React from "react";
import Slideshow from "@/components/video/Slideshow";

const BASE = "https://media.base44.com/images/public/6a4d10bcc776843a6d26b955";

// Slides 1–8 in order.
export const SLIDES = [
  {
    image: `${BASE}/fa1364a22_1.jpeg`,
    title: "1. Monetary Abuse",
    subtitle: "Different System, Same Manipulation",
  },
  {
    image: `${BASE}/3912bc9d7_2.jpeg`,
    title: "2. Perception Over Truth",
    subtitle: "Dependence Sold as Safety",
  },
  {
    image: `${BASE}/5294b2847_3.jpeg`,
    title: "3. Scarcity as Control",
    subtitle: "Artificial Scarcity Maintains Power",
  },
  {
    image: `${BASE}/303b9b060_4.jpeg`,
    title: "4. Exploitation for Gain",
    subtitle: "Your Energy Funds Their Illusion",
  },
  {
    image: `${BASE}/f61350de1_5.jpeg`,
    title: "5. Gaslighting and Misdirection",
    subtitle: "Exploitation Redefined as Care",
  },
  {
    image: `${BASE}/2753070d9_6.jpeg`,
    title: "6. Cycles of Abuse",
    subtitle: "Unstable by Design, Predictable by Intention",
  },
  {
    image: `${BASE}/04b902470_7.jpeg`,
    title: "7. Erosion of Autonomy",
    subtitle: "The Less You Question, the More They Own",
  },
  {
    image: `${BASE}/e79d380f8_8.jpeg`,
    title: "8. Infinite Growth at Your Expense",
    subtitle: "Until There's Nothing Left but Belief",
  },
];

export default function MonetaryAbuseSlides() {
  return (
    <Slideshow
      slides={SLIDES}
      title="Monetary Abuse"
      description="How fiat mirrors the tactics of an abuser — and why recognizing the pattern is the first step out."
      accent="#FF8C00"
    />
  );
}