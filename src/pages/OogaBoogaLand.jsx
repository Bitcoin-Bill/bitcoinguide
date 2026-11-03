import React from "react";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import OogaHero from "@/components/ooga/OogaHero";
import OogaMakeCharacter from "@/components/ooga/OogaMakeCharacter";
import OogaFileAnatomy from "@/components/ooga/OogaFileAnatomy";
import OogaContributing from "@/components/ooga/OogaContributing";
import OogaRules from "@/components/ooga/OogaRules";

export default function OogaBoogaLand() {
  return (
    <div className="min-h-screen bg-parchment">
      <Navbar />

      <section className="relative pt-36 pb-20 md:pt-36">
        <div className="absolute left-6 lg:left-12 top-0 bottom-0 w-px bg-border hidden md:block" />

        <div className="max-w-3xl mx-auto px-6 lg:px-12">
          <OogaHero />
          <OogaMakeCharacter />
          <OogaFileAnatomy />
          <OogaContributing />
          <OogaRules />
        </div>
      </section>

      <FooterSection />
    </div>
  );
}