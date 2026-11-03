# FUD Patrol — host adapter contract

The game is a **dependency-free core** plus whatever shell you wrap around it. For Ooga Booga Land
the shell is your console panel; the Bitcoin Guide site uses a React shell that reads this same
contract. Nothing here imports React, JSX, lucide, Tailwind or any npm package.

## Who owns what

| Concern | Owner |
|---|---|
| Opening / closing the cabinet panel | **Host** |
| Placing the cabinet, caves, lighting | **Host** |
| Focus, keyboard traps outside the game, returning focus on close | **Host** |
| Shared mute, volume, output bus, "Calm / reduce motion" preference | **Host** |
| Persistence (high score etc.) | **Host** |
| Simulation, collisions, scoring, stage flow | Game |
| Input aggregation while active | Game (fed by host) |
| Sound synthesis and its disposal | Game |
| Canvas pixels | Game renderer, drawn into the host's canvas |

The game never touches `localStorage`, `window.AudioContext` (when you pass one), or any DOM node you
did not hand it.

## Wiring it up

```js
import {
  createGame, draw, createAudio, attachKeyboard, attachPauseOnHide,
} from "./game/index.js";

const game = createGame({ seed: 20261101, calm: hostPrefersReducedMotion });

// One audio engine per game instance. Pass the host's context and bus so shared
// mute/volume keep working; the game will not close a context it did not create.
const audio = createAudio({ context: host.audioContext, output: host.gameBus });

game.setEventHandler((name) => {
  if (name === "music:start") audio.startMusic();
  else if (name === "music:stop") audio.stopMusic();
  else audio.play(name);
});

// Keyboard: only while the panel is open, only its own keys, repeats ignored.
const detachKeys = attachKeyboard({
  target: window,
  isActive: () => panel.isOpen,
  onInput: (action, down) => game.setInput(action, down, "keyboard"),
  onAction: (action) => {
    if (action === "pause") game.state.status === "paused" ? game.resume() : game.pause();
    if (action === "mute") host.toggleMute();
    if (action === "confirm") startOrAdvance();
  },
});

const detachHide = attachPauseOnHide({
  onHide: () => {
    game.clearInput();
    game.pause();
  },
});

// Touch buttons: one source id per pointer, so two thumbs never fight.
button.addEventListener("pointerdown", (e) => game.setInput("jump", true, `touch:${e.pointerId}`));
button.addEventListener("pointerup", (e) => game.setInput("jump", false, `touch:${e.pointerId}`));
button.addEventListener("pointercancel", (e) => game.setInput("jump", false, `touch:${e.pointerId}`));

// The first user gesture unlocks audio (browsers require it).
openButton.addEventListener("click", () => {
  audio.unlock();
  game.start();
});

// Frame loop: real time in, fixed steps out.
let raf = 0;
let last = performance.now();
const frame = (now) => {
  game.update((now - last) / 1000); // one 1/60 s step per 16.7 ms, at most 5 catch-up steps
  last = now;
  draw(ctx, game.state);
  raf = requestAnimationFrame(frame);
};
raf = requestAnimationFrame(frame);

// Closing the panel: stop everything the game owns.
function closePanel() {
  cancelAnimationFrame(raf);
  detachKeys();
  detachHide();
  game.dispose();
  audio.dispose();
}
```

## Public API

### `createGame(options) → game`

| option | meaning |
|---|---|
| `seed` | Playback seed. Same seed + same input = same run. Default `1`. |
| `calm` | Suppress shake and flashes and freeze decorative motion. Default `false`. |
| `onEvent` | Optional; `game.setEventHandler` does the same later. |

### Game object

| call | behaviour |
|---|---|
| `game.state` | Live state to read/render. **Never write to it from the host.** |
| `game.start({ seed })` | Resets to stage 1 and plays. Call from a user gesture. |
| `game.nextStage()` | Advances from a stage-clear screen; resolves victory past the last stage. |
| `game.pause()` / `game.resume()` | Both clear held input. Return `true` only when they changed status. |
| `game.step()` | Exactly one fixed step (tests, replays). Returns `false` unless playing. |
| `game.update(seconds)` | Real-time entry: fixed steps + bounded catch-up. Returns steps taken. |
| `game.setInput(action, down, sourceId)` | `action` is `left`/`right`/`jump`/`shoot`. Sources are independent and additive. |
| `game.releaseSource(id)` | Drop everything one pointer/host source was holding. |
| `game.clearInput()` | Drop all sources and the jump edge. |
| `game.setCalm(bool)` | Live-updates reduced motion. The preference survives `start()` and stage changes. |
| `game.setEventHandler(fn)` | Route `fn(name)` to your audio/host UI. |
| `game.dispose()` | Empties pools; the instance is inert afterwards. |
| `game.isDisposed()` | `true` after disposal — safe for a host to ask before reusing a reference. |

**Disposal is total.** After `dispose()`, `start`, `nextStage`, `setInput`, `releaseSource`,
`clearInput`, `setCalm`, `pause`, `resume` and `setEventHandler` are no-ops; `step` returns `false`
and `update` returns `0`. A dead instance never repopulates pools, never emits, and never re-arms a
handler. `start()` / `nextStage()` return `false` when refused.

### `game.state` fields you may render

`status` (`ready` `playing` `paused` `clear` `over` `victory`), `stage`, `stageName`, `score`,
`lives`, `power`, `boss` (`hp`, `maxHp` or `null`), `player`, `camera` (`cam`), `calm`.

### Events (`setEventHandler`)

`stageStart` `stageClear` `gameOver` `victory` `jump` `shoot` `hit` `down` `hurt` `coin` `crate`
`powerup` `powerDown` `bossAppear` `bossThrow` `bossHit` `bossDown` `music:start` `music:stop`

Map every event to something or nothing; unknown names are yours to ignore. `music:start` /
`music:stop` must be routed to `audio.startMusic()` / `audio.stopMusic()`, not to `play()`.

### `createAudio({ context, output, muted })`

Pass `context` + `output` to share the host's mute and volume. Omit both and the engine owns a
context, which `dispose()` closes. Nothing is scheduled before `unlock()` (call it from a click,
tap or keypress). `dispose()` stops every banked voice, clears the music timer, disconnects the
master gain, and closes an owned context. `stats()` reports `{ sources, notes, skipped, bank,
musicTimer, context, muted, disposed }` for diagnostics.

`unlock()` builds the **voice bank**: 12 oscillators and 4 noise voices, started once and re-used by
re-arming gain envelopes. Cues and music never create Web Audio nodes after that, which is what keeps
a stalled tab or a resumed device from producing a burst of hundreds of nodes. The music scheduler
looks 0.25 s ahead, arms at most 6 notes per timer callback, and **resyncs instead of replaying** when
the audio clock jumps more than 0.5 s — missed notes are dropped (`stats().skipped` counts them).

### Input helpers

- `attachKeyboard({ target, isActive, onInput, onAction })` — returns a detach function. Only the
  game's keys are captured (`← → A D W space ↑ Z X J` move/fire, `P` pause, `M` mute, `Enter`
  confirm). Auto-repeat is ignored. Events inside inputs/textareas are never captured.
- `attachPauseOnHide({ win, doc, onHide })` — window blur and hidden tab.
- `actionForKey(key)` / `toggleForKey(key)` if you build your own key handling.

### `createSession(build)` — host-side instance lifecycle

A shell that mounts, unmounts and remounts (React Strict Mode, fast refresh, panel open/close)
cannot keep a disposed game in a ref. Hold a session instead:

```js
import { createSession } from "./game/session.js";

const session = createSession(() => createGame({ seed: 20261101, calm: calmRef.current }));

const game = session.get();   // live instance; builds a fresh one if the last was disposed
// ... effects run against `game` ...
// cleanup:
session.dispose();            // disposes the instance and drops the reference
```

`get()` is idempotent while the instance is alive and rebuilds exactly once after a disposal, so a
strict-mode cleanup → setup pair ends with a running game rather than a frozen one.

## Rules that keep the cartridge clean

1. **Do not run the simulation yourself.** One `game.update()` per frame, no `step()` calls in
   production, or the game runs at double speed.
2. **Do not mutate `game.state`.** It is a view. Writing to it desynchronises the pools.
3. **One audio route.** Route all events through one handler; do not call `audio.play()` from the
   host's own code paths.
4. **Respect `calm`.** Set it from the host's reduced-motion setting; the game will not shake or
   flash in calm mode.
5. **Dispose on close**, not on hide: a closed cabinet must leave no timer, source or context behind.
   Reopening means a new `createGame` + `createAudio` — use `createSession` so the rebuild is
   automatic and a stale reference can never drive a disposed game.
6. **Keys stay out of your UI.** Pass `isActive` so the game never swallows a key meant for the
   console's own navigation, and let the host own Escape/back.

## Frame budget

Native resolution is **480 × 270**; scale with `image-rendering: pixelated`. `update()` clamps to
5 catch-up steps, so a long stall (tab throttling, GC) costs at most ~83 ms of simulation rather
than a fast-forward.