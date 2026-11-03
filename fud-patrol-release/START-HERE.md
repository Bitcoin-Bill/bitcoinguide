# START HERE — FUD Patrol, second repair pass

**Status: package only. Nothing was committed, pushed, deployed or published, and no Genesis Voyage
shared file was opened or edited.** The console, cave placement, cartridge loader and shared
integration remain the other session's work.

Baseline for every diff in this package: the previous delivery (`fud-patrol-repair.zip`, the one
Astra reviewed). This package replaces it.

---

## 1. What this pass fixes

Pass 1 (collision box, single-dart consume, terminal-result precedence, fixed-step physics) is
unchanged and still green. Astra confirmed it independently; those checks were not touched.

### 1.1 Audio: one timer callback could create 462 oscillators

**Cause.** `schedule()` filled the gap between `musicNext` and `ctx.currentTime + 0.25` note by
note, and every note built a fresh `OscillatorNode` + `GainNode`. After a 60-second clock jump (a
thawed tab, a slept device, a stalled main thread) that loop asked for the whole missed minute in
one callback: 461 steps × 1–2 oscillators.

**Fix.**

- `game/audio.js` now builds a **voice bank** at unlock: 12 oscillators + 12 gains, each started
  once, re-used by re-arming a gain envelope. Cues and music allocate no Web Audio nodes.
- Noise comes from **one pre-rendered buffer** (rendered once, `NOISE_SECONDS`) played by a fixed
  bank of 4 looping buffer sources with their own band-pass filters and gains.
- `schedule()` looks only `LOOKAHEAD` (0.25 s) ahead, schedules at most `MAX_NOTES_PER_CALL` (6)
  notes per callback, and if the clock is more than `MAX_LAG` (0.5 s) behind it **resyncs the beat
  and drops the missed notes**. Missed notes are never queued.
- `stats()` now reports `bank`, `notes`, `skipped` next to `sources` / `musicTimer`.

The old per-note `Set` of live sources is gone, because nothing is created per note.

### 1.2 Calm: `start()` reset the host's reduced-motion preference

**Cause.** `reset()` wrote `state.calm = !!config.calm`, and `config.calm` was captured at
construction. Any `setCalm(true)` was thrown away by the next `start()` / restart.

**Fix.** The preference lives beside the state (`calmPreference`), `setCalm()` writes it, and every
reset applies it. `setCalm()` is ignored once disposed.

### 1.3 Disposal: a disposed instance could be re-armed

**Cause.** Only `step()` and `update()` checked `disposed`. `start()`, `nextStage()`, `setCalm()`,
`setInput()`, `pause()`, `resume()` and `setEventHandler()` still mutated state — `start()` after
dispose reloaded stage 1 (repopulating the enemy pool) and emitted `stageStart` / `music:start`
into a handler that had just been cleared. In React, Strict Mode runs effect cleanup then setup, so
the cabinet was left driving that dead instance.

**Fix.**

- Every mutating entry point returns early when disposed. `start`/`nextStage` return `false`,
  `pause`/`resume` return `false`, the rest are silent no-ops. `dispose()` is idempotent, clears
  input *before* it flips the flag, and drops the boss/power references.
- New `game/session.js` (`createSession`) holds the host's instance: `get()` creates a fresh game
  whenever the retained one is disposed; `dispose()` drops it. `bitcoin-guide-host/OogaArcadeGame.jsx`
  now keeps a session in a ref instead of a game, so setup after cleanup (Strict Mode, remount,
  fast refresh) always drives a live instance with its own audio engine.

### 1.4 Allocation: per-tick callbacks, power/boss objects, per-frame gradients

**Simulation.** Every pool was walked with `forEach`/`compact` and a fresh arrow function per call
per tick — the 660 closures Astra measured over 60 idle ticks. All hot loops in `game.js`
(`stepDarts`, `stepEnemies`, `stepDartHits`, `stepPapers`, `stepParticles`, `stepTexts`, `sweep`)
are now indexed loops over `pool.items` with the `live` flag inline. `Pool.forEach` / `Pool.compact`
still exist for hosts and checks, but the simulation no longer calls them.

Also removed from the simulation path: the per-crate `{x:0,y:0,w:0,h:0}` inset literal
(`NO_INSET`), the power object created on every pickup (five `powerSlots`, one per power id, re-armed),
and the boss object created on every arena entry (`bossSlot`, re-armed by `armBoss`).

**Drawing.** `draw()` also walked pools with callbacks (960 over 60 frames, measured) — now indexed.
The sky `LinearGradient` was rebuilt every frame — now cached per (canvas context, palette). HUD
score/stage strings are cached by value.

**Audio.** Cue descriptors, arpeggio note lists and the noise table are built at module load or at
unlock; a cue arms banked voices.

**What is still allocated** (stated plainly, not hidden behind "bounded pools"):

| When | What | Why it stays |
|---|---|---|
| `createGame` | state object, 5 pools, power/boss records, RNG streams | once per instance |
| `start()` / `nextStage()` | RNG streams, stage spawn list, crate array + crate records | once per stage load, not per tick |
| Flash frames only | one `rgba(...)` template string per frame while `s.flash > 0` | cosmetic; ~0.28 s after a hit, suppressed in calm |
| Audio cue | one `{ osc, gain }`? **No** — banked. Only a `stats()` object if a host asks | — |

Per idle tick and per ordinary frame the simulation creates no objects, arrays or functions, which
the regression checks measure by counting pool callbacks (0) rather than by trusting the pools.

---

## 2. Regressions added

`checks/fud-patrol/suites/regressions.mjs` — eight focused checks, each written to fail on the
previous package. Verified both ways: run against the previous `game/` directory they all fail, run
against this one they all pass (output in `CHECK-OUTPUT.txt`).

| Check | Fails on the previous package with |
|---|---|
| 60-second clock jump schedules bounded work | `expected 3 oscillators, got 464` |
| Voice bank built once, never per cue | no `notes` in stats; every cue built nodes |
| Calm survives start / restart / stage change | `expected true, got false` |
| Disposed instance stays inert | `expected 0 events, got 4` |
| Session rebuilds a fresh instance after cleanup | no session helper in the core |
| Simulation ticks use no pool callbacks | `expected 0, got 660` |
| Drawing uses no pool callbacks, caches gradient | `expected 0, got 960`; 60 gradient builds |
| Power and boss records re-armed, not re-created | no `powerSlots`; a new object per pickup/arena |

The 49 existing checks are unchanged and still pass.

---

## 3. Verification

```
node checks/fud-patrol/run.mjs
```

Last run in this package: **57 checks · 57 passed · 0 failed.** Full console output is
`CHECK-OUTPUT.txt`; the same output is also `checks/fud-patrol/OUTPUT.txt`.

Covered: the four pass-1 regressions and their controls, stage progression, boss victory, defeat,
restart, pause/resume, input clearing, pool ceilings, burst caps, 60 × create/start/step/dispose, a
90-second bounded run, jump apex and full-run equality at 20/30/60/120 FPS, seeded replay,
calm-vs-normal simulation equality, bounded catch-up, render smoke, audio gesture gating / mute /
disposal / no live timers / owned-vs-injected context, the full key map, repeat suppression,
multi-touch, release on cancel, hostile `localStorage`, and the eight checks above.

The site build was also run (`vite build` succeeds) with the new shell.

### Not verified — same honesty as before

- **No browser run.** No canvas and no real `AudioContext` were executed. Rendering is checked
  against a stub 2D context, audio against a Web Audio double. Both catch logic errors; neither
  proves pixels or sound. `docs/BROWSER-PROBES.md` lists the probes and is still UNRUN, plus two new
  ones for this pass (clock jump on tab return, Strict Mode remount).
- **No phone testing.** Touch behaviour is event-level only.
- **No human playtest.** Feel, difficulty and boss pacing are unverified.
- **The clock-jump fix is reasoned from the Web Audio spec, not observed.** The check proves the
  scheduler skips and bounds; whether a given browser's `currentTime` actually jumps that far on
  resume is unmeasured here.

---

## 4. Layout

```
START-HERE.md            this file
README.md                the game, controls, file map
DIFF.txt                 focused diff: previous package → this package
CHECK-OUTPUT.txt         verbatim output of `node checks/fud-patrol/run.mjs`
CHECKSUMS.txt            SHA-256 of every file here
game/                    the cartridge (dependency-free ESM)
  game.js render.js sprites.js stages.js audio.js input.js pools.js rng.js storage.js
  session.js             host-side instance lifecycle (new in this pass)
  index.js HOST-ADAPTER.md README.md
bitcoin-guide-host/      React shell (session-based instance, new in this pass)
checks/fud-patrol/       57 runnable checks, zero dependencies
docs/                    LIMITATIONS.md, BROWSER-PROBES.md, CAST.md
```

---

## 5. Still open (unchanged)

1. `LUKE / BIP-110` in the roster still contradicts `CAST.md` — Billy's call, untouched.
2. Attributed quotes remain paraphrases; no primary transcript was checked.
3. Browser probes and one real phone still need a human.

---

## 6. Third pass — keyboard isolation on a long page

The cabinet now ships embedded at the bottom of the Ooga Booga Land page as an example of work
being built for the island, so it shares the page with a lot of text to scroll.

- **Keys belong to the reader until they click in.** The keyboard listener only acts while focus is
  inside the cabinet; `document.body` no longer counts as active, so arrows and space scroll the
  page as usual and only steer the game once the player has clicked or tapped the screen.
- **Clicking in takes focus without moving the page.** `focus({ preventScroll: true })` is used on
  the game screen, so taking the controls cannot jump the scroll position.
- **Leaving the cabinet hands the keys back.** A `focusout` listener outside the cabinet releases
  every held action and pauses a running stage, so the game never keeps playing — or eating
  keystrokes — while the reader scrolls on.
- Host-only change: the simulation is unchanged, so the 57 simulation checks were untouched.

## 7. Fourth pass — the held-Space scroll, and leaving the site

**The bug the focus gating missed.** `attachKeyboard` returned early on `event.repeat` *before*
`preventDefault()`. A held Space sends one `keydown` and then repeated `keydown`s, each carrying its
own scroll default. Only the first was cancelled; every repeat scrolled the page. That is why the
two previous focus-only repairs could not fix it: the game was active and the keys were captured,
the repeat events simply fell through the early return.

- `input.js` now resolves the key, checks `isActive()`, and calls `preventDefault()` **first**.
  Repeats are then dropped as game actions (one jump edge per press, as before), and `keyup`
  cancels the default too. Listeners are attached in the capture phase on `window`, so the cancel
  lands before any page-level scroll handling.
- Two new checks cover it: 60 repeated Space presses all cancel their default and produce exactly
  one jump edge; and the same repeated keys stay uncancelled while the host reports the game
  inactive, so a page without the cabinet keeps normal scrolling. 59 checks total.

**Isolated play window.** The cabinet is now mounted inside a modal (`bitcoin-guide-host/OogaArcadeWindow.jsx`):
the page behind it cannot scroll, the game gets focus on open, and Esc closes it and disposes the
instance. The game keeps its own 59-check contract and knows nothing about the modal.

**Removed from the app.** FUD Patrol is no longer shown on the Ooga Booga Land page and the
`/ooga-arcade` route was deleted, so nothing on the site loads it. The cartridge and its React host
are kept in the repo, unmodified apart from the input fix, for a future build. To bring it back:
re-add `<OogaArcadeEntry />` (in `bitcoin-guide-host/`) to the page, or mount `<OogaArcadeWindow />`
directly.