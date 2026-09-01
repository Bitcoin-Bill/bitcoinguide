import React from "react";
import { Play } from "lucide-react";

const ZOOM = 1.65;

export default function VideoCard({ reel, onOpen }) {
  return (
    <button
      onClick={onOpen}
      className="group relative block w-full text-left"
    >
      <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-black border border-border transition-shadow duration-300 group-hover:shadow-md">
        {reel.image ? (
          <img
            src={reel.image}
            alt={reel.title || "Video thumbnail"}
            className="w-full h-full object-cover"
            style={{ transform: `scale(${ZOOM})` }}
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Play size={24} className="text-white/30" />
          </div>
        )}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-300" />
        <div className="absolute top-2 right-2 flex items-center justify-center h-7 w-9 rounded-md bg-white/90 backdrop-blur-sm shadow-sm transition-transform duration-300 group-hover:scale-110">
          <Play size={13} className="text-black ml-0.5" fill="black" />
        </div>
      </div>
      {reel.title && (
        <p className="mt-2 h-12 flex items-center justify-center text-center font-mono text-[10px] leading-tight tracking-[0.15em] uppercase text-lead overflow-hidden">
          {reel.title}
        </p>
      )}
    </button>
  );
}