import React from "react";
import { Image } from "@/components/ui/image";

const LOGO_SRC =
  "https://media.base44.com/images/public/6a4d10bcc776843a6d26b955/09f1d867a_Untitleddesign3.png";

// Radial mask feathers the outer edge of the circular image to transparent,
// hiding the dark anti-aliased fringe so the logo reads clean on both light
// and dark backgrounds (no hard/messy black ring).
const MASK_STYLE = {
  maskImage: "radial-gradient(circle at center, black 92%, transparent 99%)",
  WebkitMaskImage: "radial-gradient(circle at center, black 92%, transparent 99%)",
};

export default function OrangeCubeLogo({ className = "h-11 w-11 md:h-14 md:w-14" }) {
  return (
    <span className={`${className} inline-block rounded-full bg-white overflow-hidden`}>
      <Image
        src={LOGO_SRC}
        alt="Bitcoin Guide logo"
        fittingType="fit"
        className="w-full h-full rounded-full overflow-hidden"
        style={MASK_STYLE}
      />
    </span>
  );
}