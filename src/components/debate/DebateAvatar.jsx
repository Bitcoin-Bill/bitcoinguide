import React from "react";

// Small avatar: shows the uploaded profile pic, or a monogram fallback when
// none is set. `size` is pixels.
export default function DebateAvatar({ name, avatar, size = 20, className = "" }) {
  const label = (name || "M").charAt(0).toUpperCase();
  if (avatar) {
    return (
      <img
        src={avatar}
        alt={name || "Avatar"}
        className={`rounded-full object-cover shrink-0 border border-border ${className}`}
        style={{ width: size, height: size }}
      />
    );
  }
  return (
    <div
      className={`rounded-full bg-verdigris/10 border border-verdigris/40 flex items-center justify-center shrink-0 ${className}`}
      style={{ width: size, height: size }}
    >
      <span
        className="font-heading text-verdigris leading-none"
        style={{ fontSize: Math.round(size * 0.5) }}
      >
        {label}
      </span>
    </div>
  );
}