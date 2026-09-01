import React from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ArchiveSection from "@/components/ArchiveSection";
import FooterSection from "@/components/FooterSection";

export default function Home() {
  return (
    <div className="bg-parchment min-h-screen">
      <Navbar />
      <HeroSection />
      <ArchiveSection />
      <FooterSection />
    </div>
  );
}