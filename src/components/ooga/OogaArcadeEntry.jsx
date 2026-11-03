import React from "react";
import OogaArcadeWindow from "@/components/ooga/arcade/OogaArcadeWindow";

// An example of something built for Ooga Booga Land: the arcade game, playable here.
export default function OogaArcadeEntry() {
  return (
    <div className="pb-14">
      <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#B45309] mb-2">
        Built for the island · playable here
      </p>
      <h2 className="font-heading text-2xl text-ink leading-tight mb-2">FUD Patrol</h2>
      <div className="w-12 h-px bg-[#B45309] mb-4" />

      <div className="space-y-3 font-body text-base text-lead leading-relaxed mb-6">
        <p>
          An arcade cabinet from the island, running in your browser: three stages of old-school
          side-scrolling, gold &ldquo;?&rdquo; crates that hand out tools, and a coin boss waiting at
          the summit. It is plain JavaScript with no libraries and no image files — every sprite and
          every sound is drawn and generated in code.
        </p>
        <p className="text-sm">
          Play it right here to see the kind of thing being built for the island.
        </p>
      </div>

      <OogaArcadeWindow />

      <p className="font-mono text-[10px] tracking-[0.15em] uppercase text-lead/60 mt-6">Controls</p>
      <p className="font-body text-sm text-lead mt-1">
        Open the game window, then start a stage. Close it or press Esc to return to the page.
        ← → or A / D to run · Space or ↑ to jump · J, Z or X to fire · P to pause · M to mute · Enter
        to start or resume · hold jump with a jetpack to fly. On a phone use the buttons under the
        cabinet. Sound is synthesized live, and the game pauses itself when you switch tabs.
      </p>
      <p className="font-body text-xs text-lead/70 italic mt-4">
        FUD Patrol is an original game made in the spirit of 1980s console cartridges — not a
        historical release. Every character is a cartoon drawn from scratch: names and badges only,
        no real likenesses, and all dialogue is fictional.
      </p>
    </div>
  );
}