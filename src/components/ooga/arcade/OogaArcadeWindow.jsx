import React, { useRef } from "react";
import { Gamepad2 } from "lucide-react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import OogaArcadeGame from "@/components/ooga/arcade/OogaArcadeGame";

export default function OogaArcadeWindow() {
  const gameRef = useRef(null);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button type="button" className="inline-flex items-center gap-2 rounded-sm border border-primary bg-primary px-5 py-3 font-mono text-xs uppercase tracking-[0.15em] text-primary-foreground">
          <Gamepad2 size={18} /> Open game window
        </button>
      </DialogTrigger>
      <DialogContent
        className="w-[calc(100vw-2rem)] max-w-4xl max-h-[calc(100dvh-2rem)] overflow-y-auto overscroll-none bg-parchment p-4 sm:p-6"
        onOpenAutoFocus={(event) => {
          event.preventDefault();
          gameRef.current?.querySelector("canvas")?.focus({ preventScroll: true });
        }}
      >
        <DialogHeader className="pr-6 text-left">
          <DialogTitle className="font-heading text-2xl text-ink">FUD Patrol</DialogTitle>
          <DialogDescription className="font-body text-sm text-lead">
            Isolated play window · Esc to close. The page stays locked while this window is open.
          </DialogDescription>
        </DialogHeader>
        <div ref={gameRef}>
          <OogaArcadeGame />
        </div>
      </DialogContent>
    </Dialog>
  );
}