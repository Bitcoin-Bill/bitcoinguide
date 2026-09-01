import React from "react";
import Slideshow from "@/components/video/Slideshow";

const BASE = "https://media.base44.com/images/public/6a4d10bcc776843a6d26b955";

// Slides 1–7 in their numbered order.
export const SLIDES = [
  {
    image: `${BASE}/a3bc28962_1.jpeg`,
    title: "1. Innovations: Zero to One",
    subtitle: "When Money Is Sound, Ideas Explode",
  },
  {
    image: `${BASE}/ac4bbfb2a_2.jpeg`,
    title: "2. Zero to One",
    subtitle: "The Leap of Creation",
  },
  {
    image: `${BASE}/6a4a9edc9_3.jpeg`,
    title: "3. The Gold Standard Era",
    subtitle: "Built for Permanence",
  },
  {
    image: `${BASE}/f21b334cd_4.jpeg`,
    title: "4. The Fiat Plateau",
    subtitle: "When Governments Seized Money",
  },
  {
    image: `${BASE}/2d9fdb60d_5.jpeg`,
    title: "5. Art Reflects the Age",
    subtitle: "Cathedrals vs. Cubicles",
  },
  {
    image: `${BASE}/243b05f5c_6.jpeg`,
    title: "6. Bitcoin — The New Frontier",
    subtitle: "Innovation Without Permission",
  },
  {
    image: `${BASE}/c8eeb5b8e_7.jpeg`,
    title: "7. Innovation Needs Sound Money",
    subtitle: "From Zero to One Again",
  },
];

export default function InnovationsSlides() {
  return (
    <Slideshow
      slides={SLIDES}
      title="Innovations: Zero to One"
      description="How sound money sparks creation and fiat flattens it."
      accent="#FF8C00"
    />
  );
}