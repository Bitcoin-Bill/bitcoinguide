import React from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ArchiveSection from "@/components/ArchiveSection";
import ThankYouSection from "@/components/ThankYouSection";
import FooterSection from "@/components/FooterSection";

export default function Home() {
  return (
    <div className="bg-white min-h-screen">
      <Navbar />
      <HeroSection />
      <ArchiveSection />
      <ThankYouSection />
      <FooterSection />
    </div>
  );
}