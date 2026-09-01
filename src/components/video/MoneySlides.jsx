import React from "react";
import Slideshow from "@/components/video/Slideshow";

const BASE = "https://media.base44.com/images/public/6a4d10bcc776843a6d26b955";

export const SLIDES = [
  {
    image: `${BASE}/9aa3b66eb_IMG_0313.jpeg`,
    title: "Evolution of Money",
    subtitle: "From Stones to Satoshi",
  },
  {
    image: `${BASE}/457e70508_IMG_0314.jpeg`,
    title: "1. Rai Stones",
    subtitle: "The Stone Money of Yap",
  },
  {
    image: `${BASE}/8af70a424_IMG_0315.jpeg`,
    title: "2. Seashell Money",
    subtitle: "The Cowries",
  },
  {
    image: `${BASE}/5534344f7_IMG_0316.jpeg`,
    title: "3. Coinage",
    subtitle: "The Evolution of Money",
  },
  {
    image: `${BASE}/4b4a6b270_IMG_0317.jpeg`,
    title: "4. Silver and Gold",
    subtitle: "Money Systems",
  },
  {
    image: `${BASE}/f1d444b08_IMG_0318.jpeg`,
    title: "5. Fiat Money",
    subtitle: "Trust-Based Currency",
  },
  {
    image: `${BASE}/21f7b2ab1_IMG_0319.jpeg`,
    title: "6. Bitcoin",
    subtitle: "Digital Decentralized Money",
  },
  {
    image: `${BASE}/73e7f7035_IMG_0320.jpeg`,
    title: "Reality",
    subtitle: "Money grows in value, not volume",
  },
];

export default function MoneySlides() {
  return (
    <Slideshow
      slides={SLIDES}
      title="Evolution of Money"
      description="A simple guide — from stones to Satoshi."
      accent="#FACC15"
    />
  );
}