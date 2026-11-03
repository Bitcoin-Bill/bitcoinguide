import React from "react";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import InstagramTopLink from "@/components/video/InstagramTopLink";
import SlideshowGallery from "@/components/video/SlideshowGallery";
import { Clapperboard } from "lucide-react";

const REELS = [
  {
    image: "https://media.base44.com/images/public/6a4d10bcc776843a6d26b955/60f1062c4_IMG_0279.png",
    video: "https://media.base44.com/videos/public/6a4d10bcc776843a6d26b955/538b6e549_f68173f07003401297e7571f019c1f17.mp4",
    title: "Evolution of Money",
  },
  {
    image: "https://media.base44.com/images/public/6a4d10bcc776843a6d26b955/033d83c2d_IMG_0287.png",
    video: "https://media.base44.com/videos/public/6a4d10bcc776843a6d26b955/18048a440_6e9586401aae41e58c8af572bf1e71ac.mp4",
    title: "Game Theory",
  },
  {
    image: "https://media.base44.com/images/public/6a4d10bcc776843a6d26b955/67a4dce1e_IMG_0290.png",
    video: "https://media.base44.com/videos/public/6a4d10bcc776843a6d26b955/d28738835_b204988d32d24f82b0b91999c556b7f7.mp4",
    title: "Gresham's Law",
  },
  {
    image: "https://media.base44.com/images/public/6a4d10bcc776843a6d26b955/40dc1d2c0_IMG_0284.png",
    video: "https://media.base44.com/videos/public/6a4d10bcc776843a6d26b955/d67a70cd0_fd9f59b130dc412cbeb3c775b86e31f0.mp4",
    title: "Low Time Preference",
  },
  {
    image: "https://media.base44.com/images/public/6a4d10bcc776843a6d26b955/11289adef_IMG_0289.png",
    video: "https://media.base44.com/videos/public/6a4d10bcc776843a6d26b955/06255dfc2_f8e26339cb904eafa8c9069cda752135.mp4",
    title: "Innovations: Zero to One",
  },
  {
    image: "https://media.base44.com/images/public/6a4d10bcc776843a6d26b955/f322604a6_IMG_0285.png",
    video: "https://media.base44.com/videos/public/6a4d10bcc776843a6d26b955/a8ff818ee_bc716b3adff04663987747b2659afdf7.mp4",
    title: "Value",
  },
  {
    image: "https://media.base44.com/images/public/6a4d10bcc776843a6d26b955/2b4223e46_IMG_0286.png",
    video: "https://media.base44.com/videos/public/6a4d10bcc776843a6d26b955/28381225b_4500a36b342b47ccb2d05ca6019b4e26.mp4",
    title: "Liminal State of Fiat",
  },
  {
    image: "https://media.base44.com/images/public/6a4d10bcc776843a6d26b955/ed50f6843_IMG_0283.png",
    video: "https://media.base44.com/videos/public/6a4d10bcc776843a6d26b955/fc6fd500d_989ef9b5531749a59afedcc47a4c0d10.mp4",
    title: "Cognitive Dissonance",
  },
  {
    image: "https://media.base44.com/images/public/6a4d10bcc776843a6d26b955/7950e2137_IMG_0280.png",
    video: "https://media.base44.com/videos/public/6a4d10bcc776843a6d26b955/dbf181017_efee656543334fc4864fe3b6022bd6d7.mp4",
    title: "Monetary Abuse",
  },
  {
    image: "https://media.base44.com/images/public/6a4d10bcc776843a6d26b955/9a0cd7386_IMG_0282.png",
    video: "https://media.base44.com/videos/public/6a4d10bcc776843a6d26b955/3ee86e33b_e0b1d134b7554e77a1c9df5aec19dbff.mp4",
    title: "Human Nature",
  },
  {
    image: "https://media.base44.com/images/public/6a4d10bcc776843a6d26b955/fcbef2e7b_IMG_0281.png",
    video: "https://media.base44.com/videos/public/6a4d10bcc776843a6d26b955/c1e8cb7fb_db67be2a8e4d44f6815f3b2342a99c95.mp4",
    title: "Intuition",
  },
  {
    image: "https://media.base44.com/images/public/6a4d10bcc776843a6d26b955/74fdbfe4d_IMG_0288.png",
    video: "https://media.base44.com/videos/public/6a4d10bcc776843a6d26b955/8ce6075c5_41978548001948548ea321d8988d7af7.mp4",
    title: "Conclusion",
  },
];

export default function VideoEssays() {
  return (
    <div className="min-h-screen bg-parchment">
      <Navbar />

      <section className="relative pt-36 pb-2 md:pt-36 md:pb-4">
        <div className="absolute left-6 lg:left-12 top-0 bottom-0 w-px bg-border hidden md:block" />
        <div className="max-w-5xl mx-auto px-6 lg:px-12">
          <div className="flex items-center gap-3 mb-2">
            <Clapperboard strokeWidth={1.5} className="h-12 w-12 md:h-14 md:w-14 text-[#FACC15]" />
            <h1 className="font-heading text-4xl md:text-5xl font-light text-ink leading-tight">
              Video Essays
            </h1>
          </div>
          <p className="font-heading text-lg text-lead italic mb-3">
            Short reels and self-paced slideshows based on the essays from the Literature section.
          </p>
          <InstagramTopLink />
          <div className="w-12 h-px bg-[var(--page-accent)] mt-3" />
          <p className="text-sm text-lead mt-4 max-w-xl leading-relaxed">
            Pick a cube below to open an essay, then toggle between watching the reel or browsing the slideshow at your own pace.
          </p>
        </div>
      </section>

      <section className="relative pb-20">
        <div className="absolute left-6 lg:left-12 top-0 bottom-0 w-px bg-border hidden md:block" />
        <div className="max-w-5xl mx-auto px-6 lg:px-12">
          <SlideshowGallery reels={REELS} />
        </div>
      </section>

      <FooterSection />
    </div>
  );
}