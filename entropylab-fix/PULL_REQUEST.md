# Fix: card shuffle suit sometimes stays selected after a tap

## Summary

In the **Cards** input mode, tapping a rank (e.g. `A`) then a suit (e.g. `♥`) usually commits the card and resets the pad for the next one. Intermittently the suit button keeps its `.active` (orange) state and **no card is committed** — you have to tap the suit again. Reported by a tester on the live site.

## Root cause

A single physical tap dispatches **two** events to the pad handler: the touch/pointer event (`touchend` / `pointerup`) **and** the synthesized `click` the browser fires afterward. The commit handler ran twice on one tap:

1. First run → commits the card, clears both `.active` states, advances.
2. Second run → re-toggles the suit's `.active`, then no-ops the commit because no rank is selected anymore → **pad left half-selected, suit bold.**

## Fix

- Route the pad through `click` only; `preventDefault()` on `touchend` / `pointerup` so the browser does **not** synthesize a second `click`.
- Clear `.active` and advance **synchronously** on commit, so the pad never rests in a half-selected state.
- Add a per-pad commit guard so a double-dispatched `click` is ignored.

## Repro

Cards mode → tap `A` → tap `♥`. Repeat ~20×.

- **Before:** roughly 1 in N taps leaves the suit bold and drops the card.
- **After:** every tap commits exactly one card and the pad resets.

## Notes

- No change to the entropy / hashing path — only the pad's event wiring.
- The built `entropylab.html` is generated; this PR edits the source module that wires `.card-suit-pad` / `.card-rank-pad`. Rebuild to regenerate the standalone file.