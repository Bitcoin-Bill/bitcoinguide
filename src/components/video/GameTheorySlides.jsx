import React from "react";
import Slideshow from "@/components/video/Slideshow";

const BASE = "https://media.base44.com/images/public/6a4d10bcc776843a6d26b955";

// Slides 1–8 in their corrected numbered order.
export const SLIDES = [
  {
    image: `${BASE}/6a10b7fe4_1.jpeg`,
    title: "1. Game Theory and Bitcoin",
    subtitle: "A Strategic Framework for Decentralized Incentives",
  },
  {
    image: `${BASE}/2486330e6_2.jpeg`,
    title: "2. Introduction",
    subtitle: "What is Game Theory?",
  },
  {
    image: `${BASE}/13602d069_3.jpeg`,
    title: "3. Bitcoin as a Game",
    subtitle: "Bitcoin = Incentive Alignment",
  },
  {
    image: `${BASE}/411c2476f_4.jpeg`,
    title: "4. Mining & Nash Equilibrium",
    subtitle: "Why Miners Stay Honest",
  },
  {
    image: `${BASE}/582050d8c_5.jpeg`,
    title: "5. Prisoner's Dilemma",
    subtitle: "Why Cooperation Wins",
  },
  {
    image: `${BASE}/d6c7d9f9c_6.jpeg`,
    title: "6. Forking & Coordination",
    subtitle: "When the Network Splits",
  },
  {
    image: `${BASE}/379fe5649_7.jpeg`,
    title: "7. HODLing as Strategy",
    subtitle: "The Stag Hunt of Bitcoin Holders",
  },
  {
    image: `${BASE}/56fa06389_8.jpeg`,
    title: "8. Game Theory = Bitcoin's Immune System",
    subtitle: "Conclusion",
  },
];

export default function GameTheorySlides() {
  return (
    <Slideshow
      slides={SLIDES}
      title="Game Theory"
      description="How rational incentives keep Bitcoin honest."
      accent="#FF8C00"
    />
  );
}