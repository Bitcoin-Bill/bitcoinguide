import React, { useCallback, useEffect, useRef, useState } from "react";
import { Pause, Volume2, VolumeX } from "lucide-react";
import { createGame, H, STAGE_COUNT, W } from "./core/game";
import { createSession } from "./core/session";
import { draw } from "./core/render";
import { createAudio } from "./core/audio";
import { attachKeyboard, attachPauseOnHide } from "./core/input";
import { readNumber, writeNumber } from "./core/storage";
import { STAGE_DEFS } from "./core/stages";
import GameOverlay from "./GameOverlay";
import OogaTouchControls from "./OogaTouchControls";

const HIGH_KEY = "ooga-fud-patrol-high";
const ICON_BUTTON =
  "inline-flex items-center gap-1.5 rounded-sm border border-border px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.15em] text-lead transition hover:text-ink hover:border-ink/40 disabled:opacity-40";

// Bitcoin Guide host. The game itself lives in ./core and knows nothing about
// React; this file only mounts a canvas, wires input/audio and mirrors status.
export default function OogaArcadeGame({ calm = false }) {
  const rootRef = useRef(null);
  const canvasRef = useRef(null);
  const sessionRef = useRef(null);
  const calmRef = useRef(calm);
  const audioRef = useRef(null);
  const statusRef = useRef("ready");
  const mutedRef = useRef(false);

  const [status, setStatus] = useState("ready");
  const [info, setInfo] = useState({ score: 0, stage: 0, stageName: STAGE_DEFS[0].name });
  const [high, setHigh] = useState(0);
  const [muted, setMuted] = useState(false);

  if (!sessionRef.current) {
    sessionRef.current = createSession(() => createGame({ seed: 1977, calm: calmRef.current }));
  }

  // Always the live instance: after a cleanup (Strict Mode, remount) the session
  // builds a fresh game instead of handing back the disposed one.
  const liveGame = () => sessionRef.current.get();

  const syncStatus = useCallback(() => {
    const s = liveGame().state;
    statusRef.current = s.status;
    setStatus(s.status);
    setInfo({ score: s.score, stage: s.stage, stageName: s.stageName });
  }, []);

  const begin = useCallback(() => {
    const game = liveGame();
    if (audioRef.current) audioRef.current.unlock();
    game.start({ seed: (Date.now() % 2147483647) + 1 });
    syncStatus();
    if (canvasRef.current) canvasRef.current.focus();
  }, [syncStatus]);

  const next = useCallback(() => {
    liveGame().nextStage();
    syncStatus();
  }, [syncStatus]);

  const resume = useCallback(() => {
    liveGame().resume();
    syncStatus();
  }, [syncStatus]);

  const pause = useCallback(() => {
    liveGame().pause();
    syncStatus();
  }, [syncStatus]);

  const confirm = useCallback(() => {
    const s = liveGame().state;
    if (s.status === "paused") resume();
    else if (s.status === "clear") next();
    else if (s.status !== "playing") begin();
  }, [begin, next, resume]);

  const togglePause = useCallback(() => {
    const s = liveGame().state;
    if (s.status === "playing") pause();
    else if (s.status === "paused") resume();
  }, [pause, resume]);

  const toggleMute = useCallback(() => {
    const value = !mutedRef.current;
    mutedRef.current = value;
    setMuted(value);
    const audio = audioRef.current;
    if (audio) {
      audio.unlock();
      audio.setMuted(value);
    }
  }, []);

  useEffect(() => {
    calmRef.current = calm;
    liveGame().setCalm(calm);
  }, [calm]);

  // One audio engine per mounted game. Cleanup drops the instance as well, so a
  // second setup (Strict Mode, remount) gets a fresh, usable game and its own audio
  // engine rather than a disposed one.
  useEffect(() => {
    const game = liveGame();
    const audio = createAudio({ muted: mutedRef.current });
    audioRef.current = audio;
    game.setEventHandler((name) => {
      if (name === "music:start") audio.startMusic();
      else if (name === "music:stop") audio.stopMusic();
      else audio.play(name);
    });
    setHigh(readNumber(HIGH_KEY, 0));

    return () => {
      game.setEventHandler(null);
      sessionRef.current.dispose();
      audio.dispose();
      audioRef.current = null;
    };
  }, []);

  // Frame loop: real time in, fixed steps out. React only mirrors status.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext("2d");
    const game = liveGame();
    let raf = 0;
    let last = performance.now();

    const frame = (now) => {
      game.update((now - last) / 1000);
      last = now;
      const s = game.state;
      if (s.status !== statusRef.current) {
        statusRef.current = s.status;
        setStatus(s.status);
        setInfo({ score: s.score, stage: s.stage, stageName: s.stageName });
        if (s.status === "over" || s.status === "victory") {
          const best = Math.max(readNumber(HIGH_KEY, 0), s.score);
          writeNumber(HIGH_KEY, best);
          setHigh(best);
        }
      }
      draw(ctx, s);
      raf = requestAnimationFrame(frame);
    };

    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Keyboard is captured only while the cabinet (or nothing) has focus, so the
  // surrounding Ooga controls keep their own keys.
  useEffect(() => {
    const game = liveGame();
    const isActive = () => {
      const root = rootRef.current;
      if (!root) return false;
      // While a round runs the keys belong to the game wherever focus drifted to. The
      // overlay button that starts it is removed in the same tick, which used to drop
      // focus to the page body and let space scroll the page out from under the player.
      if (statusRef.current === "playing") return true;
      const el = typeof document === "undefined" ? null : document.activeElement;
      // Otherwise only while the cabinet itself holds focus: on a long page the arrow
      // keys and space belong to the reader until they click in to play.
      return !!el && (el === root || root.contains(el));
    };

    const detach = attachKeyboard({
      isActive,
      onInput: (action, down) => {
        if (down && action === "jump" && game.state.status !== "playing") {
          confirm();
          return;
        }
        game.setInput(action, down, "keyboard");
      },
      onAction: (action) => {
        if (action === "pause") togglePause();
        else if (action === "mute") toggleMute();
        else if (action === "confirm") confirm();
      },
    });

    return () => {
      detach();
      game.clearInput();
    };
  }, [confirm, toggleMute, togglePause]);

  // Focus leaving the cabinet hands the keys back to the page and stops the round,
  // so the game never keeps playing (or eating keystrokes) while the reader scrolls.
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;
    const onFocusOut = (event) => {
      const next = event.relatedTarget;
      if (next && root.contains(next)) return;
      const game = liveGame();
      game.clearInput();
      if (game.state.status === "playing") {
        game.pause();
        syncStatus();
      }
    };
    root.addEventListener("focusout", onFocusOut);
    return () => root.removeEventListener("focusout", onFocusOut);
  }, [syncStatus]);

  // Take the keys back when a round starts, without moving the page.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (status !== "playing" || !canvas) return;
    if (document.activeElement !== canvas) canvas.focus({ preventScroll: true });
  }, [status]);

  // Blur / hidden tab: drop held input, then pause if a stage was running.
  useEffect(() => {
    const game = liveGame();
    const detach = attachPauseOnHide({
      onHide: () => {
        game.clearInput();
        if (game.state.status === "playing") {
          game.pause();
          const s = game.state;
          statusRef.current = s.status;
          setStatus(s.status);
          setInfo({ score: s.score, stage: s.stage, stageName: s.stageName });
        }
      },
    });
    return detach;
  }, []);

  // Clicking the screen takes the controls without scrolling the page.
  const focusScreen = useCallback(() => {
    if (canvasRef.current) canvasRef.current.focus({ preventScroll: true });
  }, []);

  const press = useCallback((action, down, pointerId) => {
    const source = pointerId === undefined ? "touch" : `touch:${pointerId}`;
    liveGame().setInput(action, down, source);
  }, []);

  return (
    <div ref={rootRef}>
      <div className="mb-2 flex items-center justify-between gap-3">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-lead">
          Stage {info.stage + 1}/{STAGE_COUNT} · {info.stageName}
        </p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={togglePause}
            disabled={status !== "playing" && status !== "paused"}
            className={ICON_BUTTON}
            aria-label={status === "paused" ? "Resume the game" : "Pause the game"}
          >
            <Pause size={12} /> {status === "paused" ? "Resume" : "Pause"}
          </button>
          <button
            type="button"
            onClick={toggleMute}
            className={ICON_BUTTON}
            aria-label={muted ? "Turn sound on" : "Turn sound off"}
          >
            {muted ? <VolumeX size={13} /> : <Volume2 size={13} />} {muted ? "Muted" : "Sound"}
          </button>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-lg border border-border bg-[#0b1120] shadow-sm">
        <canvas
          ref={canvasRef}
          width={W}
          height={H}
          tabIndex={0}
          role="img"
          aria-label="FUD Patrol game screen"
          className="block h-auto w-full outline-none"
          style={{ imageRendering: "pixelated" }}
          onPointerDown={focusScreen}
        />
        <GameOverlay
          status={status}
          stageIndex={info.stage}
          stageName={info.stageName}
          totalStages={STAGE_COUNT}
          bossStage={Boolean(STAGE_DEFS[info.stage + 1] && STAGE_DEFS[info.stage + 1].boss)}
          score={info.score}
          high={high}
          onStart={begin}
          onNext={next}
          onResume={resume}
        />
      </div>

      <OogaTouchControls onPress={press} />
    </div>
  );
}