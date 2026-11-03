# FUD Patrol — dependency-free core

A 1980s-console-style side-scroller: run left to right, dart the critics, break `?` crates, reach
the flag, and on the third stage face the gold boss. **An original game built in the spirit of
1980s consoles — it is not a historical game and not a re-release.** Every critic line in it is
fictional game dialogue, not a quotation.

No dependencies. No React, JSX, lucide, Tailwind, npm. Works in any modern browser that has a 2D
canvas.

## Modules

| file | role |
|---|---|
| `game.js` | Simulation: fixed-step loop, player/enemy/boss, collisions, scoring, stage flow, terminal results. |
| `render.js` | Canvas drawing. Reads state, never writes it. |
| `sprites.js` | Every sprite, drawn from flat rectangles. |
| `stages.js` | Stage palettes, lengths, deterministic encounter planning. |
| `audio.js` | Per-instance Web Audio chiptune engine; disposable. |
| `input.js` | Keyboard map, capture rules, pause-on-hide. |
| `pools.js` | Fixed-capacity pool with in-place compaction. |
| `rng.js` | Seeded PRNG, split into gameplay and cosmetic streams. |
| `storage.js` | `localStorage` reads/writes that cannot throw. |
| `index.js` | Public surface — import from here. |
| `HOST-ADAPTER.md` | The contract for embedding this in a shell. |

## Guarantees

- **Fixed step.** One 1/60 s tick per simulation step; a 20 FPS and a 120 FPS client produce
  identical trajectories.
- **Seeded.** Same seed + same inputs = same run. Particle scatter and shake use a separate stream.
- **Bounded.** Pools have explicit capacities; a full pool drops a spawn and play continues.
- **Single terminal result per run.** Death outranks victory when both land in one tick.
- **Quiet when disposed.** `dispose()` stops sources, clears timers and closes an owned context.

## Controls

`← →` / `A D` run · `Space` / `↑` / `W` jump · `J` / `Z` / `X` fire · `P` pause · `M` mute ·
`Enter` start / resume.