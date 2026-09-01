import React from "react";
import Slideshow from "@/components/video/Slideshow";

const BASE = "https://media.base44.com/images/public/6a4d10bcc776843a6d26b955";

// Slides 1–5 in order.
export const SLIDES = [
  {
    image: `${BASE}/85da189b2_1.jpeg`,
    title: "1. Intuition",
    subtitle: "Seeing What's Always Been There",
  },
  {
    image: `${BASE}/9d8f999f5_2.jpeg`,
    title: "2. The Illusion of Normal",
    subtitle: "Inflation Isn't Natural — It's Normalized",
  },
  {
    image: `${BASE}/8c5d2358d_3.jpeg`,
    title: "3. The Intuitive Realization",
    subtitle: "Step Into the Lifeboat",
  },
  {
    image: `${BASE}/15f3b3370_4.jpeg`,
    title: "4. Why People 'Don't Get It'",
    subtitle: "It's Not Intelligence — It's Inertia",
  },
  {
    image: `${BASE}/017dded57_5.jpeg`,
    title: "5. The Fiat Trap",
    subtitle: "Survival Can Be Sovereignty",
  },
];

export default function IntuitionSlides() {
  return (
    <Slideshow
      slides={SLIDES}
      title="Intuition"
      description="Recognizing the fiat illusion for what it is — and why clarity, not complexity, is the way out."
      accent="#06B6D4"
    />
  );
}