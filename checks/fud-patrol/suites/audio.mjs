// Audio is per-instance, silent until a gesture, and leaves nothing running
// after disposal.

import { createFakeContext } from "../fake-audio.mjs";

export default function audio({ test, assert, assertEqual, core }) {
  // Count interval handles so "no timers left" is provable, not assumed.
  const realSetInterval = globalThis.setInterval;
  const realClearInterval = globalThis.clearInterval;
  const liveTimers = new Set();
  let timerId = 1;

  const installTimerSpy = () => {
    liveTimers.clear();
    globalThis.setInterval = () => {
      const id = timerId;
      timerId += 1;
      liveTimers.add(id);
      return id;
    };
    globalThis.clearInterval = (id) => {
      liveTimers.delete(id);
    };
  };

  const restoreTimers = () => {
    globalThis.setInterval = realSetInterval;
    globalThis.clearInterval = realClearInterval;
  };

  test("Nothing is scheduled before a user gesture", () => {
    installTimerSpy();
    const { ctx, counters } = createFakeContext();
    const sound = core.createAudio({ context: ctx });

    sound.play("jump");
    sound.startMusic();

    assertEqual(counters.started, 0, "no source started before unlock");
    assertEqual(liveTimers.size, 0, "no music timer before unlock");
    assertEqual(sound.stats().context, "open", "context is injected, not owned");

    sound.dispose();
    restoreTimers();
  });

  test("After unlock, cues schedule sources and music arms one timer", () => {
    installTimerSpy();
    const { ctx, counters } = createFakeContext();
    const sound = core.createAudio({ context: ctx });

    assertEqual(sound.unlock(), true, "unlock succeeds with a context");
    sound.play("shoot");
    assert(counters.started > 0, "a cue started a source");
    assert(sound.stats().sources > 0, "the source is tracked");

    sound.startMusic();
    assertEqual(liveTimers.size, 1, "one music timer");
    assertEqual(sound.stats().musicTimer, true, "stats reports the timer");

    sound.dispose();
    restoreTimers();
  });

  test("Mute gates new cues without tearing down the engine", () => {
    installTimerSpy();
    const { ctx, counters } = createFakeContext();
    const sound = core.createAudio({ context: ctx });
    sound.unlock();

    sound.setMuted(true);
    // Voices are banked at unlock, so a cue is measured by armed notes, not by
    // newly created sources.
    const before = sound.stats().notes;
    sound.play("coin");
    assertEqual(sound.stats().notes, before, "muted engine schedules nothing");
    assertEqual(sound.stats().muted, true, "muted flag reported");

    sound.setMuted(false);
    sound.play("coin");
    assert(sound.stats().notes > before, "unmuting restores cues");

    sound.dispose();
    restoreTimers();
  });

  test("Disposal stops every source, clears the timer, and closes an owned context", () => {
    installTimerSpy();

    const contexts = [];
    const original = globalThis.AudioContext;
    globalThis.AudioContext = function FakeAudioContext() {
      const fake = createFakeContext();
      contexts.push(fake);
      return fake.ctx;
    };

    const sound = core.createAudio();
    sound.unlock();
    sound.play("hit");
    sound.startMusic();
    const counters = contexts[0].counters;

    assert(counters.started > 0, "sources were scheduled");
    assertEqual(liveTimers.size, 1, "timer armed");

    sound.dispose();

    assertEqual(sound.stats().sources, 0, "no tracked sources remain");
    assertEqual(sound.stats().musicTimer, false, "music timer cleared");
    assertEqual(liveTimers.size, 0, "no timers left running");
    assert(counters.stopped >= counters.started, "every started source was stopped");
    assertEqual(counters.closed, true, "an owned context is closed");

    globalThis.AudioContext = original;
    restoreTimers();
  });

  test("An injected host context is never closed by the game", () => {
    installTimerSpy();
    const { ctx, counters } = createFakeContext();
    const sound = core.createAudio({ context: ctx });
    sound.unlock();
    sound.play("jump");
    sound.dispose();
    assertEqual(counters.closed, false, "host-owned context survives game disposal");
    restoreTimers();
  });

  test("Two games keep separate engines: disposing one leaves the other running", () => {
    installTimerSpy();
    const first = createFakeContext();
    const second = createFakeContext();
    const a = core.createAudio({ context: first.ctx });
    const b = core.createAudio({ context: second.ctx });
    a.unlock();
    b.unlock();
    a.startMusic();
    b.startMusic();
    assertEqual(liveTimers.size, 2, "two timers");

    a.dispose();

    assertEqual(liveTimers.size, 1, "only one timer remains");
    assertEqual(b.stats().musicTimer, true, "the other game still has music");
    assertEqual(a.stats().sources, 0, "first engine emptied");
    assert(first.counters.stopped >= first.counters.started, "first engine's sources stopped");

    b.dispose();
    assertEqual(liveTimers.size, 0, "no timers after both dispose");
    restoreTimers();
  });

  test("Dispose is idempotent", () => {
    installTimerSpy();
    const { ctx } = createFakeContext();
    const sound = core.createAudio({ context: ctx });
    sound.unlock();
    sound.dispose();
    sound.dispose();
    assertEqual(sound.stats().disposed, true, "still disposed");
    restoreTimers();
  });
}