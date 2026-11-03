import React from "react";

// A neutral Ooga Booga caveman, drawn on the same 28x28 pixel grid and palette
// logic as the island's voxel builds (skin / skin-shade / dark hair / fur wrap),
// so it reads as "one of the Oogas" without borrowing any contributor's details.
const SKIN = "#d29b6e";
const SKIN_DARK = "#b87c50";
const SKIN_LIGHT = "#e0b183";
const HAIR = "#3a2a1c";
const HAIR_LIGHT = "#4e3927";
const FUR = "#6b4a2a";
const FUR_DARK = "#553718";
const FUR_LIGHT = "#7d5733";
const WHITE = "#f2efe4";
const INK = "#141414";
const MOUTH = "#6b3b2a";
const NOSTRIL = "#8f5b38";

export default function OogaCavemanIcon({ className }) {
  return (
    <svg
      viewBox="0 0 28 28"
      className={className}
      role="img"
      aria-label="Ooga Booga Land caveman"
    >
      <g className="ooga-bob">
        {/* messy dark mop */}
        <rect x="9.6" y="3.4" width="1.6" height="1.4" fill={HAIR} />
        <rect x="12.2" y="2.9" width="1.8" height="1.8" fill={HAIR} />
        <rect x="15" y="3.5" width="1.6" height="1.3" fill={HAIR} />
        <rect x="9" y="4.5" width="10" height="3.4" fill={HAIR} />
        <rect x="10.4" y="4.9" width="3" height="1" fill={HAIR_LIGHT} />
        <rect x="14.8" y="5.2" width="2.4" height="0.9" fill={HAIR_LIGHT} />

        {/* hair down the sides of the head */}
        <rect x="8.4" y="6.6" width="1.9" height="4.8" fill={HAIR} />
        <rect x="17.7" y="6.6" width="1.9" height="4.8" fill={HAIR} />

        {/* ears */}
        <rect x="8.1" y="11.4" width="1.2" height="2.5" fill={SKIN_DARK} />
        <rect x="18.7" y="11.4" width="1.2" height="2.5" fill={SKIN_DARK} />

        {/* head */}
        <rect x="9.2" y="7.2" width="9.6" height="9.4" fill={SKIN} />
        <rect x="9.2" y="7.2" width="1.1" height="9.4" fill={SKIN_DARK} />
        <rect x="17.7" y="7.2" width="1.1" height="9.4" fill={SKIN_DARK} />
        <rect x="10.3" y="7.2" width="4.2" height="1.4" fill={SKIN_LIGHT} />

        {/* heavy brow */}
        <rect x="9.8" y="9.3" width="8.4" height="1" fill={HAIR} />

        {/* plain eyes */}
        <rect x="10.6" y="10.4" width="2.6" height="1.6" fill={WHITE} />
        <rect x="14.8" y="10.4" width="2.6" height="1.6" fill={WHITE} />
        <rect x="11.5" y="10.6" width="1.1" height="1.2" fill={INK} />
        <rect x="15.7" y="10.6" width="1.1" height="1.2" fill={INK} />

        {/* broad nose */}
        <rect x="13" y="11.8" width="2.2" height="1.8" fill={SKIN_DARK} />
        <rect x="12.6" y="13.2" width="0.9" height="0.8" fill={NOSTRIL} />
        <rect x="14.7" y="13.2" width="0.9" height="0.8" fill={NOSTRIL} />

        {/* jaw line and mouth */}
        <rect x="9.8" y="15.1" width="8.4" height="1.5" fill={SKIN_DARK} />
        <rect x="11.8" y="14.4" width="4.4" height="0.9" fill={MOUTH} />
        <rect x="13" y="14.3" width="0.9" height="0.8" fill={WHITE} />

        {/* neck */}
        <rect x="12.2" y="16.3" width="3.6" height="2.2" fill={SKIN} />
        <rect x="12.2" y="16.3" width="1.1" height="2.2" fill={SKIN_DARK} />

        {/* fur wrap over the shoulders */}
        <rect x="8.6" y="17.7" width="10.8" height="1.5" fill={FUR} />
        <rect x="7.8" y="19.2" width="12.4" height="2.5" fill={FUR} />
        <rect x="7.2" y="21.7" width="13.6" height="3.3" fill={FUR} />
        <rect x="8.2" y="19.6" width="2.6" height="1.2" fill={FUR_LIGHT} />
        <rect x="17.4" y="22.3" width="2.2" height="1.3" fill={FUR_DARK} />

        {/* bare chest at the opening of the wrap */}
        <rect x="11.9" y="18.4" width="4.2" height="3.2" fill={SKIN} />
        <rect x="11.9" y="18.4" width="0.9" height="3.2" fill={SKIN_DARK} />

        {/* shaggy bottom edge */}
        <rect x="7.2" y="24.9" width="1.6" height="1" fill={FUR_DARK} />
        <rect x="10.2" y="24.9" width="1.6" height="1.2" fill={FUR_DARK} />
        <rect x="13.2" y="24.9" width="1.6" height="1" fill={FUR_DARK} />
        <rect x="16.2" y="24.9" width="1.6" height="1.2" fill={FUR_DARK} />
        <rect x="19.2" y="24.9" width="1.6" height="1" fill={FUR_DARK} />
      </g>
    </svg>
  );
}