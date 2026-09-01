import React from "react";
import Slideshow from "@/components/video/Slideshow";

const BASE = "https://media.base44.com/images/public/6a4d10bcc776843a6d26b955";

// Slides 1–6 in their numbered order.
export const SLIDES = [
  {
    image: `${BASE}/f5d02032b_1.jpeg`,
    title: "1. Energy Is the Foundation of Sound Money",
    subtitle: "Bitcoin Turns Energy Into Truth",
  },
  {
    image: `${BASE}/c23f53c33_2.jpeg`,
    title: "2. Why It Matters",
    subtitle: "Effort Equals Value",
  },
  {
    image: `${BASE}/9d1b18409_3.jpeg`,
    title: "3. Energy as Proof of Value",
    subtitle: "Belief vs. Verification",
  },
  {
    image: `${BASE}/980fd3632_4.jpeg`,
    title: "4. Mining Sparks Innovation",
    subtitle: "Greed Turned Into Efficiency",
  },
  {
    image: `${BASE}/a9ac33cb0_5.jpeg`,
    title: "5. Nothing Wasted",
    subtitle: "From Security to Utility",
  },
  {
    image: `${BASE}/fc9888eb0_6.jpeg`,
    title: "6. Converting, Not Consuming",
    subtitle: "Big Digital Energy",
  },
];

export default function ValueSlides() {
  return (
    <Slideshow
      slides={SLIDES}
      title="Value"
      description="How Bitcoin turns energy into incorruptible proof."
      accent="#FF8C00"
    />
  );
}