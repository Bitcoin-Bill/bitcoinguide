import React from "react";

const SKIN = "#C98A5B";
const SKIN_DARK = "#A9713F";
const FUR = "#6B4A2F";
const FUR_LIGHT = "#7C5A39";
const FUR_DARK = "#4E3520";
const BONE = "#EFE6D2";
const INK = "#241C15";
const WOOD = "#8B5A2B";
const WOOD_DARK = "#6B451F";

export default function OogaCaveman({ className }) {
  return (
    <svg
      viewBox="0 0 20 24"
      className={className}
      role="img"
      aria-label="Ooga Booga caveman"
    >
      <g className="ooga-bob">
        {/* bone through the hair */}
        <rect x="4" y="1" width="12" height="2.4" fill={FUR_DARK} />
        <rect x="2" y="1.6" width="16" height="1" fill={BONE} />
        <rect x="0.8" y="0.9" width="1.4" height="2.4" fill={BONE} />
        <rect x="17.8" y="0.9" width="1.4" height="2.4" fill={BONE} />

        {/* head */}
        <rect x="4" y="3" width="12" height="8" fill={SKIN} />
        <rect x="3.4" y="4.4" width="13.2" height="1.6" fill={SKIN_DARK} />
        <rect x="6" y="6.3" width="2" height="2" fill={INK} />
        <rect x="12" y="6.3" width="2" height="2" fill={INK} />
        <rect x="8.8" y="6.6" width="2.4" height="2.6" fill={SKIN_DARK} />
        <rect x="7.6" y="9.7" width="4.8" height="0.9" fill={FUR_DARK} />
        <rect x="4" y="10.4" width="12" height="1.8" fill={FUR} />

        {/* torso */}
        <rect x="4.5" y="12" width="11" height="6" fill={FUR} />
        <rect x="5.6" y="12.7" width="8.8" height="1.2" fill={FUR_LIGHT} />
        <rect x="4.5" y="17.4" width="11" height="2" fill={FUR_DARK} />

        {/* legs and feet */}
        <rect x="5.6" y="19.4" width="3.4" height="3" fill={SKIN} />
        <rect x="11" y="19.4" width="3.4" height="3" fill={SKIN} />
        <rect x="5.1" y="22.3" width="4.4" height="1.3" fill={SKIN_DARK} />
        <rect x="10.5" y="22.3" width="4.4" height="1.3" fill={SKIN_DARK} />

        {/* resting arm */}
        <rect x="2.5" y="12.2" width="2.2" height="4.8" fill={SKIN} />
        <rect x="2.5" y="16.8" width="2.2" height="1.7" fill={SKIN_DARK} />

        {/* swinging arm and bone club */}
        <g className="ooga-swing">
          <rect x="14.6" y="12.2" width="2.2" height="4.8" fill={SKIN} />
          <rect x="14.6" y="16.8" width="2.2" height="1.7" fill={SKIN_DARK} />
          <rect x="15.3" y="8.4" width="1.6" height="9.2" fill={WOOD} />
          <rect x="14.2" y="6.2" width="3.8" height="3.2" fill={WOOD_DARK} />
        </g>
      </g>
    </svg>
  );
}