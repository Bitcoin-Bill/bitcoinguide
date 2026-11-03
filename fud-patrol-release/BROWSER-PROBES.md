# Browser probes — written, not run

None of these were executed in this session (no browser available). Run them against the built site
and, separately, against the console panel before the cartridge ships. Record pass/fail per browser;
do not mark a probe as passing because the code "looks right".

Probes 10–11 were added for the second repair pass (audio clock jump, Strict Mode remount). They are
the ones that correspond directly to the reported defects, so run them first.

Suggested matrix: Chrome desktop, Safari desktop, Firefox desktop, Safari iOS (real device),
Chrome Android (real device).

## 1. Audio unlock on gesture

1. Load the page with sound on, before touching anything.
2. Confirm **silence** while the start overlay is up.
3. Press **Start stage 1**.
4. Expect the stage-start jingle, then the looping chiptune.
5. Reload, press `M` before starting, then start → expect silence; press `M` again → music returns.

## 2. Blur pause

1. Start a stage, hold `→`.
2. Switch windows (or click another app) mid-run.
3. Return. Screen shows **Paused**, and the player is not still running.

## 3. Hidden-tab pause

1. Start a stage, hold `→`.
2. Switch to another tab for ~10 seconds.
3. Return. Screen shows **Paused**; resume restarts at the same spot, with no teleport from the
   missing time.

## 4. Repeated-key toggles

1. Start a stage; hold `P` down for two seconds.
2. Expect a single pause (not a pause/resume flicker).
3. Same with `M` held: one toggle only.

## 5. Touch multi-press and cancel

1. On a phone, hold **▶** and **Fire** with two thumbs.
2. Expect to run and shoot simultaneously.
3. Slide one thumb off its button onto the background and lift.
4. Expect that action to stop — and the other to keep going until lifted.
5. Press and hold **Jump**, then drag off and release → the jump stops, nothing sticks.

## 6. Keyboard isolation

1. Open the console panel, start the game, then close the panel.
2. Press `←` / `→` / `Space` / `J`.
3. Expect the console (or page) to scroll or navigate as usual — the game must not eat those keys.
4. Type in any text field (search box): typing must never move the player.

## 7. Calm / reduced motion

1. Enable the OS reduced-motion setting (or the host's Calm switch).
2. Take damage and kill a critic.
3. Expect no screen shake, no red flash, no invulnerability blink-out, no twinkling stars — the HUD
   still shows lives and power bars.

## 8. Cartridge close/dispose

1. Open the panel, play, close it, reopen, play again.
2. Expect fresh stage 1, no overlapping music (two loops at once), no rising CPU use.
3. Repeat open/close 10× and confirm memory/CPU returns to baseline in the browser task manager.
4. Close mid-jump and reopen: no stuck movement on the first frame.

## 10. Audio clock jump (second pass)

1. Start a stage with sound on and let the music loop.
2. Put the machine to sleep (or close the laptop lid) for at least 60 seconds, then wake it and
   return to the tab without reloading.
3. Watch the DevTools Performance panel while the tab regains focus, with a Web Audio node count in
   the console: `ctx.state`, and every `setInterval` callback's duration.
4. Expect: no storm of oscillators, no burst of sound catching up a minute of music, one audible
   beat continuing from "now". Old build: hundreds of oscillators and a wall of notes in one callback.
5. Repeat with the tab backgrounded for 60 s (Chrome throttles it to 1 Hz) and with the OS audio
   device switched away and back.

## 11. Remount / Strict Mode (second pass)

Best run in development, where React Strict Mode double-invokes effects.

1. Open the arcade page (or the console cartridge panel) and confirm the Start overlay responds.
2. Press **Start**: the stage must run, the player must move, music must play.
3. Navigate away and back (or force a remount) 5×: each time the cabinet must be playable again —
   no frozen canvas, no dead Start button, no second music loop layered over the first.
4. In development, check the console for "cannot read properties of undefined" or a game that
   renders but never advances: that is the disposed-instance symptom this pass fixes.

## 9. Storage failure

1. Open the app in a private window with site data blocked, play, die.
2. Expect the game to continue normally; best score may stay at 0.
3. Clear site data mid-run and finish a stage: no freeze, no console error loop.