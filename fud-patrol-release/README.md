# FUD Patrol — review package (repaired, second pass)

FUD Patrol is the arcade game built for Ooga Booga Land: an NES-style side-scroller (Beach → Jungle →
Summit) starring a voxel caveman who darts critics, cracks `?` power-up crates and fights a
gold-coin boss. **It is an original game made in the spirit of 1980s consoles — not a historical
game and not a re-release.** Every critic line in it is fictional dialogue, not a quotation.

This package is the repaired source after Astra's review: the four gameplay bugs fixed, and the four
follow-up findings (audio scheduling, calm preference, disposal, allocation) repaired and covered by
new regressions.

## Layout

| Path | What it is |
|---|---|
| `game/` | The cartridge: plain ES modules, zero dependencies, no React/JSX/lucide/Tailwind. |
| `game/HOST-ADAPTER.md` | How to embed it in a console panel (the contract). |
| `game/session.js` | Host-side instance lifecycle: a clean remount gets a fresh game. |
| `bitcoin-guide-host/` | The React shell that keeps the Bitcoin Guide page working. |
| `checks/` | Zero-dependency Node checks (+ `OUTPUT.txt` from the last run). |
| `docs/` | Limitations, browser probes, cast notes. |
| `DIFF.txt` | Focused diff from the previous package to this one. |
| `CHECK-OUTPUT.txt` | Verbatim output of the check run that shipped with this package. |
| `CHECKSUMS.txt` | SHA-256 of every file here. |

## Play

`← →` / `A D` run · `Space` / `↑` / `W` jump · `J` / `Z` / `X` fire · `P` pause · `M` mute ·
`Enter` start / resume. Three stages; each flag stage ends at a goal, and the Summit ends in the
boss arena. Gold `?` crates grant a random tool (jetpack, spring boots, turbo legs, a life, a coin
cache) for a limited time.

On a phone, the buttons under the cabinet take two fingers at once. Sound is synthesized live with
Web Audio — there are no audio files — and stays silent until you interact with the page.

## Run the checks

```
node checks/fud-patrol/run.mjs
```

Uses only Node built-ins. Nothing to install. It copies `game/` into a temporary ESM package and
runs **57 checks** (gameplay regressions, frame-rate equivalence, pools, stage flow, audio bank and
scheduler, disposal, session lifecycle, allocation, input, storage, render smoke). Exit code is
non-zero on failure.

## What the repair changed

**First pass (unchanged, still green):**

- Airborne contact damage, multi-kill darts, death-overwritten-by-victory and frame-rate-dependent
  physics are fixed, each with a regression check.
- Fixed 1/60 s step with seeded gameplay randomness: a run is reproducible and a 20 FPS client
  behaves like a 120 FPS one.
- Transients live in fixed pools; the core is dependency-free so it drops into the Ooga console.

**Second pass:**

- **Audio** uses a fixed voice bank and one pre-rendered noise table. The scheduler looks a quarter
  of a second ahead, schedules at most six notes per callback, and resyncs instead of replaying a
  clock jump — a 60-second gap used to build 462 oscillators in one callback.
- **Calm** is a host preference that survives `start()`, restart and stage change.
- **Disposal** makes an instance fully inert; `session.js` gives the React shell a fresh instance
  after Strict Mode cleanup or a remount.
- **Allocation**: simulation and drawing loops are indexed (no per-tick or per-frame closures), power
  and boss records are pre-allocated and re-armed, and the sky gradient plus HUD strings are cached.

See `START-HERE.md` for the full map and the pass-2 detail, `docs/LIMITATIONS.md` for what is still
unproven (notably: no browser run, no phone test, no human playtest, and what still allocates), and
`docs/CAST.md` for the open BIP-110 roster question.