import React from "react";

// Touch pad. Each pointer is its own input source, so two thumbs can hold two
// buttons at once and lifting one never releases the other. Pointer capture means
// a finger that slides off a button still releases cleanly.
export default function OogaTouchControls({ onPress }) {
  const button = (label, action, extra = "") => (
    <button
      key={action}
      type="button"
      aria-label={label}
      onPointerDown={(e) => {
        e.preventDefault();
        if (e.currentTarget.setPointerCapture) {
          try {
            e.currentTarget.setPointerCapture(e.pointerId);
          } catch {
            /* capture is a nicety, not a requirement */
          }
        }
        onPress(action, true, e.pointerId);
      }}
      onPointerUp={(e) => onPress(action, false, e.pointerId)}
      onPointerCancel={(e) => onPress(action, false, e.pointerId)}
      onLostPointerCapture={(e) => onPress(action, false, e.pointerId)}
      onContextMenu={(e) => e.preventDefault()}
      className={`select-none touch-none rounded-md border border-border bg-card py-3 font-mono text-[11px] uppercase tracking-[0.15em] text-ink transition active:scale-95 active:bg-secondary ${extra}`}
      style={{ touchAction: "none" }}
    >
      {label}
    </button>
  );

  return (
    <div className="mx-auto mt-3 grid max-w-md select-none grid-cols-4 gap-2">
      {button("◀", "left")}
      {button("▶", "right")}
      {button("Jump", "jump")}
      {button("Fire", "shoot", "border-[#B45309]/60 text-[#B45309]")}
    </div>
  );
}