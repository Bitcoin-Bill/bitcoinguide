// Focused regressions for the second repair pass.
//
// Each check targets one reported defect and fails on the previous package:
//   1. audio catch-up after a 60-second clock jump (462 oscillators in one callback)
//   2. the host's calm preference surviving start / restart / stage change
//   3. a disposed instance staying inert, and a host session rebuilding a live one
//   4. no per-tick callback allocation, pooled power/boss records, cached gradients

import { createFakeContext } from "../fake-audio.mjs";

const MAX_NOTES_PER_CALL = 6; // mirrors audio.js

function stubContext() {
  const calls = { fills: 0, gradients: 0 };
  const gradient = { addColorStop() {} };
  const ctx = {
    calls,
    fillStyle: "",
    font: "",
    textAlign: "",
    textBaseline: "",
    globalAlpha: 1,
    imageSmoothingEnabled: true,
    createLinearGradient() {
      calls.gradients += 1;
      return gradient;
    },
    fillRect() {
      calls.fills += 1;
    },
    fillText() {},
    save() {},
    restore() {},
    translate() {},
    scale() {},
    rotate() {},
    beginPath() {},
    arc() {},
    fill() {},
    stroke() {},
    moveTo() {},
    lineTo() {},
    closePath() {},
    measureText: (text) => ({ width: String(text).length * 6 }),
  };
  return ctx;
}

export default function regressions({ test, assert, assertEqual, core }) {
  // ---------------------------------------------------------------- 1. audio
  test("A 60-second audio clock jump schedules bounded work, not 462 notes", () => {
    const realSetInterval = globalThis.setInterval;
    const realClearInterval = globalThis.clearInterval;
    let tick = null;

    globalThis.setInterval = (fn) => {
      tick = fn;
      return 1;
    };
    globalThis.clearInterval = () => {
      tick = null;
    };

    try {
      const { ctx, counters } = createFakeContext();
      const sound = core.createAudio({ context: ctx });
      sound.unlock();
      sound.startMusic();
      assert(typeof tick === "function", "the music timer armed a callback");

      ctx.currentTime = 0.1;
      tick();

      const oscillatorsBefore = counters.oscillators;
      const notesBefore = sound.stats().notes;

      // The clock leaps a full minute: a thawed tab, or a slept device.
      ctx.currentTime = 60.1;
      tick();

      assertEqual(
        counters.oscillators,
        oscillatorsBefore,
        "a clock jump creates no oscillators (the voice bank is reused)",
      );

      const added = sound.stats().notes - notesBefore;
      assert(
        added > 0 && added <= MAX_NOTES_PER_CALL,
        `scheduling is bounded per callback — ${added} notes, limit ${MAX_NOTES_PER_CALL}`,
      );
      assert(sound.stats().skipped >= 400, "the missed minute was skipped, not queued");

      // The beat keeps running afterwards instead of replaying the gap.
      const afterJump = sound.stats().notes;
      ctx.currentTime = 60.2;
      tick();
      const settled = sound.stats().notes - afterJump;
      assert(settled <= MAX_NOTES_PER_CALL, `steady state stays bounded — ${settled} notes`);

      sound.dispose();
    } finally {
      globalThis.setInterval = realSetInterval;
      globalThis.clearInterval = realClearInterval;
    }
  });

  test("The voice bank is built once, at unlock, and never grows per cue", () => {
    const { ctx, counters } = createFakeContext();
    const sound = core.createAudio({ context: ctx });
    sound.unlock();
    const banked = counters.oscillators;
    assert(banked > 0, "unlock builds the bank");

    for (let i = 0; i < 40; i += 1) {
      sound.play("shoot");
      sound.play("hit");
      sound.play("coin");
    }
    assertEqual(counters.oscillators, banked, "120 cues create no oscillators");
    assert(sound.stats().notes >= 120, "the cues did arm voices");
    sound.dispose();
  });

  // ---------------------------------------------------------------- 2. calm
  test("Calm survives start, restart and stage change", () => {
    const game = core.createGame({ calm: false });
    game.setCalm(true);
    game.start({ seed: 3 });
    assertEqual(game.state.calm, true, "calm survives start()");
    game.nextStage();
    assertEqual(game.state.calm, true, "calm survives nextStage()");
    game.start({ seed: 4 });
    assertEqual(game.state.calm, true, "calm survives a restart");

    game.setCalm(false);
    game.start({ seed: 5 });
    assertEqual(game.state.calm, false, "turning calm off sticks too");
  });

  // ------------------------------------------------------------ 3. disposal
  test("A disposed instance stays inert: no events, no repopulation, no input", () => {
    const game = core.createGame({ seed: 9 });
    game.start({ seed: 9 });
    game.dispose();

    const events = [];
    game.setEventHandler((name) => events.push(name));
    game.start({ seed: 9 });
    game.nextStage();
    game.setInput("right", true, "keyboard");
    game.setCalm(true);
    game.clearInput();

    assertEqual(events.length, 0, "no stageStart / music:start after dispose");
    assertEqual(game.state.enemies.count(), 0, "start() after dispose repopulates nothing");
    assertEqual(game.pause(), false, "pause is refused");
    assertEqual(game.resume(), false, "resume is refused");
    assertEqual(game.update(1), 0, "update still advances nothing");
    assertEqual(game.step(), false, "step still does nothing");
    assertEqual(game.state.calm, false, "setCalm is ignored once disposed");
    assertEqual(game.state.input.right, false, "setInput is ignored once disposed");
  });

  test("A session rebuilds a fresh, usable instance after cleanup (Strict Mode)", () => {
    assert(typeof core.createSession === "function", "the core ships a session helper");
    let built = 0;
    const session = core.createSession(() => {
      built += 1;
      const game = core.createGame({ seed: 7 });
      game.start({ seed: 7 });
      return game;
    });

    const first = session.get();
    assertEqual(session.get(), first, "a live instance is reused, not rebuilt");

    // React runs the cleanup, then the setup again.
    session.dispose();
    assertEqual(first.isDisposed(), true, "cleanup disposes the instance");

    const second = session.get();
    assert(second !== first, "setup after cleanup builds a fresh instance");
    assertEqual(second.isDisposed(), false, "the fresh instance is live");
    assertEqual(built, 2, "exactly one rebuild");

    second.setInput("right", true, "keyboard");
    const before = second.state.player.x;
    second.update(1 / 60);
    assert(second.state.player.x > before, "the fresh instance actually runs");
  });

  // ---------------------------------------------------------- 4. allocation
  test("Simulation ticks use no pool callbacks (no per-tick closures)", () => {
    const proto = core.Pool.prototype;
    const originalForEach = proto.forEach;
    const originalCompact = proto.compact;
    let calls = 0;

    proto.forEach = function countingForEach(...args) {
      calls += 1;
      return originalForEach.apply(this, args);
    };
    proto.compact = function countingCompact(...args) {
      calls += 1;
      return originalCompact.apply(this, args);
    };

    try {
      const game = core.createGame({ seed: 8 });
      game.start({ seed: 8 });
      for (let i = 0; i < 60; i += 1) game.step();
      assertEqual(calls, 0, "60 idle ticks use no pool callbacks");

      game.setInput("right", true, "keyboard");
      game.setInput("shoot", true, "keyboard");
      for (let i = 0; i < 120; i += 1) game.step();
      assertEqual(calls, 0, "120 busy ticks use no pool callbacks either");
    } finally {
      proto.forEach = originalForEach;
      proto.compact = originalCompact;
    }
  });

  test("Drawing uses no pool callbacks and caches its gradient", () => {
    const proto = core.Pool.prototype;
    const originalForEach = proto.forEach;
    const originalCompact = proto.compact;
    let calls = 0;

    proto.forEach = function countingForEach(...args) {
      calls += 1;
      return originalForEach.apply(this, args);
    };
    proto.compact = function countingCompact(...args) {
      calls += 1;
      return originalCompact.apply(this, args);
    };

    try {
      const game = core.createGame({ seed: 10 });
      game.start({ seed: 10 });
      const s = game.state;
      const ctx = stubContext();
      for (let i = 0; i < 60; i += 1) {
        s.player.x = Math.min(s.length - 60, 60 + i * 4);
        game.step();
        core.draw(ctx, s);
      }
      assertEqual(calls, 0, "60 drawn frames use no pool callbacks");
      assertEqual(ctx.calls.gradients, 1, "the sky gradient is built once per palette");
    } finally {
      proto.forEach = originalForEach;
      proto.compact = originalCompact;
    }
  });

  test("Power and boss records are re-armed, not re-created", () => {
    const game = core.createGame({ seed: 21 });
    game.start({ seed: 21 });
    const s = game.state;

    assert(Array.isArray(s.powerSlots) && s.powerSlots.length === 5, "five power records exist up front");
    assert(s.bossSlot && typeof s.bossSlot === "object", "a boss record exists up front");

    // Collect every crate in the first two stages and watch the power records.
    const identities = new Map();
    for (let stage = 0; stage < 2; stage += 1) {
      if (stage > 0) game.nextStage();
      s.enemies.clear();
      s.player.invuln = 999;
      const crates = s.crates.slice();
      for (const crate of crates) {
        s.player.x = crate.x + crate.w / 2 - core.PLAYER_W / 2;
        s.player.y = crate.y + crate.h / 2 - core.PLAYER_H / 2;
        game.step();
        if (s.power) {
          const known = identities.get(s.power.id);
          if (known) {
            assertEqual(s.power, known, `power record for ${s.power.id} is reused`);
          } else {
            identities.set(s.power.id, s.power);
          }
          assert(
            identities.size <= 5,
            `at most five distinct power records (saw ${identities.size})`,
          );
        }
      }
    }

    // Two separate boss encounters must share one record.
    const armArena = (seed) => {
      game.start({ seed });
      game.nextStage();
      game.nextStage();
      s.cam = s.length - core.W;
      s.player.x = s.length - 372;
      game.step();
      return s.boss;
    };

    const firstBoss = armArena(21);
    assert(firstBoss, "the boss appears in the arena");
    s.darts.clear();
    const dart = s.darts.acquire();
    dart.x = firstBoss.x + 20;
    dart.y = firstBoss.y + 8;
    dart.w = 8;
    dart.h = 3;
    dart.vx = 0;
    dart.life = 1;
    firstBoss.hp = 1;
    game.step();
    assert(!s.boss, "the boss went down");

    const secondBoss = armArena(22);
    assert(secondBoss, "the boss appears again on the next run");
    assertEqual(secondBoss, firstBoss, "the boss record is reused across encounters");
  });
}