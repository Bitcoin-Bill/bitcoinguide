import React from "react";
import Slideshow from "@/components/video/Slideshow";

const BASE = "https://media.base44.com/images/public/6a4d10bcc776843a6d26b955";

// Slides 1–6 in their numbered order.
export const SLIDES = [
  {
    image: `${BASE}/0f1cc3a67_1.jpeg`,
    title: "1. Low-Time Preference",
    subtitle: "The Foundation of Civilization",
  },
  {
    image: `${BASE}/44db3e321_2.jpeg`,
    title: "2. What Is Low-Time Preference?",
    subtitle: "Delaying Gratification for the Future",
  },
  {
    image: `${BASE}/7df754aae_3.jpeg`,
    title: "3. Why It Matters",
    subtitle: "Long-Term Thinking Builds Civilizations",
  },
  {
    image: `${BASE}/d8ab06714_4.jpeg`,
    title: "4. Bitcoin and Low-Time Preference",
    subtitle: "Patience",
  },
  {
    image: `${BASE}/19369d180_5.jpeg`,
    title: "5. Fiat and High-Time Preference",
    subtitle: "A Culture Obsessed with the Now",
  },
  {
    image: `${BASE}/d274febb0_6.jpeg`,
    title: "6. Choose the Future",
    subtitle: "What Will You Build with Your Time?",
  },
];

export default function LowTimePreferenceSlides() {
  return (
    <Slideshow
      slides={SLIDES}
      title="Low-Time Preference"
      description="How Bitcoin rewards patience and long-term thinking."
      accent="#A855F7"
    />
  );
}