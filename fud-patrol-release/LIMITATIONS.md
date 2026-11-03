# Remaining limitations

Honest list for this package. Nothing here is hidden in the code or in START-HERE.

## Not verified

- **No browser run.** No page, canvas or real `AudioContext` was executed. Rendering is covered by a
  stub 2D context; audio by a Web Audio double. Both catch logic errors, neither proves pixels or
  sound.
- **No phone testing.** Touch is covered by event-level checks (multi-pointer aggregation, release on
  cancel). Landscape layout, safe areas and pointer capture on iOS Safari are unproven.
- **No human playtest.** Difficulty, boss pacing, readability at panel size and the feel of the jump
  are unverified.
- **No accessibility audit.** Keyboard-only play works and the canvas has a label, but there is no
  colour-blind mode, no screen-reader description of play, and contrast was not measured.
- **The clock-jump behaviour is reasoned, not observed.** The scheduler skips and bounds work after a
  clock jump (check: 0 new oscillators, ≤6 notes per callback, missed notes counted). Whether a given
  browser's `currentTime` jumps that far when a tab thaws, and what it sounds like when it does, was
  not measured here.

## Audio

- **Audio needs a gesture.** Until `unlock()` runs from a click/tap/keypress there is silence; on iOS
  a second gesture can still be required if the context is suspended again.
- **The voice bank is fixed** (12 tone voices, 4 noise voices). A dense moment can steal the oldest
  voice, so a long note can be cut short by a burst of hits. That trade is deliberate: a fixed bank is
  what removes the per-note allocation, and the cues are all ≤0.5 s.
- **Banked voices are started at unlock and stay running** (at gain ≈0) until disposal. That is a
  small constant CPU cost in exchange for zero node creation during play. It is not measured on
  low-end phones.
- **Music is a 16-step loop.** It restarts on every stage and does not respond to boss state.
- **Muted music advances silently** rather than pausing, so unmuting resumes in the beat instead of
  at the start of a bar.

## Simulation

- **What still allocates.** Per idle tick and per ordinary frame: nothing (no objects, arrays or
  closures — the checks count pool callbacks at 0). Outside that: `createGame` builds one state
  object, five pools, five power records and a boss record; `start()`/`nextStage()` build RNG streams
  and the stage's spawn list plus its crate records; a flash frame builds one `rgba(...)` string per
  frame while the hit flash is active. Nothing in the hot path is claimed allocation-free beyond what
  the checks measure.
- **Pool exhaustion is silent.** A full pool drops the spawn (a dart, a puff, a line of floating
  text). Deliberate — play must not stutter — but it is data loss the host cannot see.
- **Canvas is fixed at 480×270.** Scaling is the host's job (`pixelated`); there is no high-resolution
  render path.
- **No gamepad support.** Keyboard and pointer only.
- **No save data.** High score is host-owned; the core persists nothing.
- **One difficulty.** No settings, no stage select.
- **Crates are planned per stage load** into a plain array that is compacted in place; the array is
  re-created on every stage load, not per frame.

## Host contract

- **One session per mounted cabinet.** `createSession` returns a live instance or builds a new one;
  a host that keeps its own reference to a game across disposal will still be holding a dead object
  (it is inert and safe, just useless).
- **Disposed means disposed.** `start`, `nextStage`, `setInput`, `setCalm`, `pause`, `resume` and
  `setEventHandler` are no-ops after `dispose()`. A host that wants to restart must go through the
  session, not through the old reference.
- **Strict Mode / remount is handled in the shell, not the core.** The core only guarantees that a
  fresh `createGame` works; the shell now drops the instance in cleanup so the next setup rebuilds.

## Content issues still open

- **`LUKE / BIP-110` in the enemy roster contradicts `CAST.md`.** The roster was deliberately left
  untouched; flagged for Billy in `docs/CAST.md` and in START-HERE.
- **Attributed quotes are unverified.** `CAST.md` marks its argument column as paraphrase from
  secondary reporting. No quote may be presented as something a named person said without a primary
  link.
- **Critic names are real people.** The sprites are original archetypes with no likenesses and all
  in-game lines are fictional, but the names are real. A creative/legal judgement for the owner.

## Scope not touched

- Genesis Voyage console, cave placement, cartridge loader, shared integration: not opened.
- The Bitcoin Guide site's routing, nav, theme and every other page: unchanged (only the arcade
  shell's instance handling changed).
- No upstream PR, no force-push, no deployment, no publish.