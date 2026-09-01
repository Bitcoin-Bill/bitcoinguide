import React from "react";
import Slideshow from "@/components/video/Slideshow";

const BASE = "https://media.base44.com/images/public/6a4d10bcc776843a6d26b955";

// Slides in narrative order.
export const SLIDES = [
  {
    image: `${BASE}/5fefc489b_1.jpeg`,
    title: "1. The Liminal State",
    subtitle: "Fiat's Psychological Prison",
  },
  {
    image: `${BASE}/edbf69fe0_2.jpeg`,
    title: "2. The Liminal State of Fiat",
    subtitle: "Between the Real and the Artificial",
  },
  {
    image: `${BASE}/9d25d60f5_3.jpeg`,
    title: "3. The Threshold",
    subtitle: "A Waiting Room Between Truth and Illusion",
  },
  {
    image: `${BASE}/7ecb09c0a_4.jpeg`,
    title: "4. Artificial Value Systems",
    subtitle: "When Nature Becomes Numbers",
  },
  {
    image: `${BASE}/fb922ad57_6.jpeg`,
    title: "5. Cognitive Dissonance",
    subtitle: "Perception vs. Reality",
  },
  {
    image: `${BASE}/90c5a3eb6_7.jpeg`,
    title: "6. The Descent into Madness",
    subtitle: "A Dream That's Collapsing",
  },
  {
    image: `${BASE}/3416f46cc_8.jpeg`,
    title: "7. Bitcoin Ends the Liminal State",
    subtitle: "Proof Replaces Promises",
  },
];

export default function LiminalStateSlides() {
  return (
    <Slideshow
      slides={SLIDES}
      title="Liminal State of Fiat"
      description="How fiat traps the mind between reality and illusion — and how Bitcoin ends the wait."
      accent="#2DD4BF"
    />
  );
}