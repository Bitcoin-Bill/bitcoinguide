import React from "react";

// Pixel-art palm tree, drawn on the same 28x28 grid as the Ooga caveman icon
// so the two read as part of the same voxel island.
const TRUNK = "#8b6136";
const TRUNK_DARK = "#6b4726";
const TRUNK_LIGHT = "#a3743f";
const FROND = "#3f7d3a";
const FROND_LIGHT = "#57a04c";
const FROND_DARK = "#2f5f2c";
const COCONUT = "#5a3a1f";

export default function OogaPalmTreeIcon({ className }) {
  return (
    <svg
      viewBox="0 0 28 28"
      className={className}
      role="img"
      aria-label="Palm tree"
    >
      <g className="palm-sway">
        {/* trunk, leaning slightly right */}
        <rect x="13" y="24.4" width="2.4" height="2.6" fill={TRUNK} />
        <rect x="13.3" y="21.8" width="2.4" height="2.8" fill={TRUNK} />
        <rect x="13.7" y="19.2" width="2.3" height="2.8" fill={TRUNK} />
        <rect x="14.1" y="16.6" width="2.3" height="2.8" fill={TRUNK} />
        <rect x="14.5" y="14" width="2.2" height="2.8" fill={TRUNK} />

        {/* bark shading on the left edge of the trunk */}
        <rect x="13" y="24.4" width="0.8" height="2.6" fill={TRUNK_DARK} />
        <rect x="13.3" y="21.8" width="0.8" height="2.8" fill={TRUNK_DARK} />
        <rect x="13.7" y="19.2" width="0.8" height="2.8" fill={TRUNK_DARK} />
        <rect x="14.1" y="16.6" width="0.8" height="2.8" fill={TRUNK_DARK} />
        <rect x="14.5" y="14" width="0.8" height="2.8" fill={TRUNK_DARK} />
        <rect x="15" y="22.4" width="0.6" height="1.8" fill={TRUNK_LIGHT} />
        <rect x="15.8" y="17.6" width="0.6" height="1.6" fill={TRUNK_LIGHT} />

        {/* coconuts tucked under the crown */}
        <rect x="13.2" y="12.2" width="1.6" height="1.6" fill={COCONUT} />
        <rect x="15.4" y="12.4" width="1.5" height="1.5" fill={COCONUT} />
        <rect x="14.3" y="13.2" width="1.5" height="1.4" fill={COCONUT} />

        {/* crown */}
        <rect x="13.6" y="7.8" width="3" height="3.4" fill={FROND} />
        <rect x="13.6" y="7.8" width="3" height="1" fill={FROND_LIGHT} />

        {/* drooping fronds left and right */}
        <rect x="11.4" y="11.2" width="3.4" height="1.6" fill={FROND} />
        <rect x="9.2" y="10.8" width="2.4" height="1.6" fill={FROND} />
        <rect x="7.4" y="11.4" width="2" height="1.5" fill={FROND} />
        <rect x="5.9" y="12.4" width="1.7" height="1.4" fill={FROND} />
        <rect x="5.9" y="13.8" width="1.4" height="0.9" fill={FROND_DARK} />

        <rect x="18.2" y="11.2" width="3.4" height="1.6" fill={FROND} />
        <rect x="20.4" y="10.8" width="2.4" height="1.6" fill={FROND} />
        <rect x="22.2" y="11.4" width="2" height="1.5" fill={FROND} />
        <rect x="23.7" y="12.4" width="1.7" height="1.4" fill={FROND} />
        <rect x="24" y="13.8" width="1.4" height="0.9" fill={FROND_DARK} />

        {/* upper fronds */}
        <rect x="12.2" y="9.4" width="2" height="1.6" fill={FROND} />
        <rect x="10.6" y="8.4" width="2" height="1.6" fill={FROND} />
        <rect x="9.4" y="7.4" width="1.8" height="1.5" fill={FROND_LIGHT} />
        <rect x="15.8" y="9.4" width="2" height="1.6" fill={FROND} />
        <rect x="17.4" y="8.4" width="2" height="1.6" fill={FROND} />
        <rect x="18.8" y="7.4" width="1.8" height="1.5" fill={FROND_LIGHT} />
        <rect x="12.8" y="6.6" width="2" height="1.4" fill={FROND_LIGHT} />

        {/* shadow along the underside of the crown */}
        <rect x="12.4" y="12.6" width="8" height="0.9" fill={FROND_DARK} />
      </g>
    </svg>
  );
}