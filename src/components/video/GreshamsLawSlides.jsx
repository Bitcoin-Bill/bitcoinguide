import React from "react";
import Slideshow from "@/components/video/Slideshow";

const BASE = "https://media.base44.com/images/public/6a4d10bcc776843a6d26b955";

// Slides 1–9 in their original numbered order.
export const SLIDES = [
  {
    image: `${BASE}/c530d254c_1.jpeg`,
    title: "1. Gresham's Law",
    subtitle: "Why Bad Money Drives Out Good",
  },
  {
    image: `${BASE}/08731a83e_2.jpeg`,
    title: "2. What Is Gresham's Law?",
    subtitle: "The Core Principle",
  },
  {
    image: `${BASE}/0f0549823_3.jpeg`,
    title: "3. Bad Money vs. Good Money",
    subtitle: "The Two Kinds of Money",
  },
  {
    image: `${BASE}/7c92e9d72_4.jpeg`,
    title: "4. How It Plays Out",
    subtitle: "People Act Rationally",
  },
  {
    image: `${BASE}/5eeb3df74_5.jpeg`,
    title: "5. Fiat vs. Bitcoin",
    subtitle: "Sound Money Doesn't Need Permission",
  },
  {
    image: `${BASE}/e9695a39a_6.jpeg`,
    title: "6. Gresham's Law in Action",
    subtitle: "Good Money Leaves the System",
  },
  {
    image: `${BASE}/e5232fd7f_7.jpeg`,
    title: "7. Implications for the Economy",
    subtitle: "Store of Value & Hedge",
  },
  {
    image: `${BASE}/9cf3f86d0_8.jpeg`,
    title: "8. Rethinking Gresham's Law",
    subtitle: "Good Money Escapes",
  },
  {
    image: `${BASE}/a22d06de7_9.jpeg`,
    title: "9. Good Money Always Wins",
    subtitle: "The Foundation of Freedom",
  },
];

export default function GreshamsLawSlides() {
  return (
    <Slideshow
      slides={SLIDES}
      title="Gresham's Law"
      description="Why bad money drives out good — and how Bitcoin flips the script."
      accent="#FF8C00"
    />
  );
}