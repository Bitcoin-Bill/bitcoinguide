// Frame-rate independence and randomness separation.

export default function frames({ test, assert, assertEqual, core }) {
  const RATES = [20, 30, 60, 120];

  function jumpProfile(fps) {
    const dt = 1 / fps;
    const game = core.createGame({ seed: 11 });
    game.start({ seed: 11 });
    game.setInput("jump", true, "keyboard");
    const s = game.state;

    let apex = s.player.y;
    const calls = Math.round(2 / dt);
    for (let i = 0; i < calls; i += 1) {
      game.update(dt);
      if (s.player.y < apex) apex = s.player.y;
    }
    return { apex, y: s.player.y, vy: s.player.vy };
  }

  test("Jump apex is identical at 20, 30, 60 and 120 FPS", () => {
    const profiles = RATES.map((fps) => ({ fps, ...jumpProfile(fps) }));
    const first = profiles[0];
    for (const profile of profiles) {
      assertEqual(
        Number(profile.apex.toFixed(6)),
        Number(first.apex.toFixed(6)),
        `${profile.fps} FPS apex matches 20 FPS`,
      );
      assertEqual(
        Number(profile.y.toFixed(6)),
        Number(first.y.toFixed(6)),
        `${profile.fps} FPS landing position matches`,
      );
      assertEqual(profile.vy, first.vy, `${profile.fps} FPS vertical velocity matches`);
    }
  });

  function snapshot(s) {
    const enemies = [];
    s.enemies.forEach((e) => enemies.push(`${e.x.toFixed(3)}:${e.type}`));
    return {
      status: s.status,
      score: s.score,
      lives: s.lives,
      x: s.player.x.toFixed(4),
      y: s.player.y.toFixed(4),
      cam: s.cam.toFixed(4),
      stage: s.stage,
      enemies: enemies.join("|"),
    };
  }

  function run(fps, seconds, options = {}) {
    const dt = 1 / fps;
    const game = core.createGame({ seed: 1234, calm: options.calm });
    game.start({ seed: 1234 });
    game.setInput("right", true, "keyboard");
    game.setInput("shoot", true, "keyboard");
    const calls = Math.round(seconds / dt);
    for (let i = 0; i < calls; i += 1) game.update(dt);
    return snapshot(game.state);
  }

  test("A four-second run is identical at every render rate", () => {
    const base = run(60, 4);
    for (const fps of RATES) {
      const other = run(fps, 4);
      assertEqual(JSON.stringify(other), JSON.stringify(base), `${fps} FPS matches 60 FPS`);
    }
  });

  test("Same seed and inputs replay identically", () => {
    assertEqual(JSON.stringify(run(60, 3)), JSON.stringify(run(60, 3)), "repeatable");
  });

  test("Cosmetic randomness cannot change gameplay outcomes", () => {
    // Calm mode suppresses shake/flash and decorative motion; the simulation must
    // not notice, because particles and effects draw from a separate RNG stream.
    assertEqual(
      JSON.stringify(run(60, 4, { calm: true })),
      JSON.stringify(run(60, 4, { calm: false })),
      "calm and normal runs produce the same simulation",
    );
  });

  test("The fixed step is bounded — a stalled frame cannot fast-forward the game", () => {
    const game = core.createGame({ seed: 5 });
    game.start({ seed: 5 });
    const steps = game.update(2.5);
    assert(steps <= core.MAX_SUBSTEPS, `at most ${core.MAX_SUBSTEPS} catch-up steps, got ${steps}`);
  });

  test("Step size is exactly one sixtieth of a second", () => {
    assertEqual(core.FIXED_STEP, 1 / 60, "FIXED_STEP");
    const game = core.createGame({ seed: 6 });
    game.start({ seed: 6 });
    const before = game.state.player.y;
    game.step();
    const after = game.state.player.y;
    assert(Math.abs(after - before) < 1, "the player moves by one step of gravity, not a frame's worth");
  });
}