// Stage progression, boss victory, defeat, restart, pause/resume, input clearing,
// pool exhaustion and repeated create/dispose.

export default function lifecycle({ test, assert, assertEqual, core }) {
  const fresh = (seed = 4) => {
    const game = core.createGame({ seed });
    game.start({ seed });
    return game;
  };

  test("Stage 1 ends at the flag with a stage-clear result", () => {
    const game = fresh(21);
    const s = game.state;
    const before = s.score;

    s.cam = s.length - core.W;
    s.player.x = s.goalX + 30;
    game.step();

    assertEqual(s.status, "clear", "reaching the flag clears the stage");
    assert(s.score >= before + 500, "stage-clear bonus is added");
  });

  test("nextStage advances 1 → 2 and keeps the score", () => {
    const game = fresh(21);
    const s = game.state;
    s.cam = s.length - core.W;
    s.player.x = s.goalX + 30;
    game.step();
    const score = s.score;

    game.nextStage();

    assertEqual(s.stage, 1, "advanced to stage 2");
    assertEqual(s.status, "playing", "stage 2 is playing");
    assertEqual(s.score, score, "score carries over");
    assertEqual(s.player.x, 48, "player restarts at the stage entrance");
  });

  test("Stage 3 is the boss stage and has no flag", () => {
    assert(core.STAGE_DEFS[2].boss, "stage 3 defines a boss");
    assert(!core.STAGE_DEFS[0].boss && !core.STAGE_DEFS[1].boss, "stages 1-2 are flag stages");
  });

  test("nextStage past the last stage resolves victory", () => {
    const game = fresh(21);
    const s = game.state;
    s.stage = core.STAGE_COUNT - 1;
    game.nextStage();
    assertEqual(s.status, "victory", "no stage 4 — the run ends in victory");
  });

  test("Defeat then restart resets lives, score and stage", () => {
    const game = fresh(31);
    const s = game.state;
    s.cam = s.length - core.W;
    s.player.x = s.goalX + 30;
    game.step();

    s.lives = 1;
    s.player.invuln = 0;
    s.stage = 0;
    s.status = "playing";
    s.enemies.clear();
    const e = s.enemies.acquire();
    e.x = s.player.x;
    e.y = core.GROUND - core.CRITIC_H;
    e.w = core.CRITIC_W;
    e.h = core.CRITIC_H;
    e.speed = 0;
    e.cd = 999;
    s.player.y = core.GROUND - core.PLAYER_H;
    game.step();
    assertEqual(s.status, "over", "last life lost");
    assertEqual(s.lives, 0, "lives never go negative");

    game.start({ seed: 32 });

    assertEqual(s.status, "playing", "restart is playing");
    assertEqual(s.lives, 3, "lives restored");
    assertEqual(s.score, 0, "score reset");
    assertEqual(s.stage, 0, "back to stage 1");
    assertEqual(s.player.x, 48, "player reset");
  });

  test("Pause clears held input and resume does not replay it", () => {
    const game = fresh(41);
    const s = game.state;
    game.setInput("left", true, "keyboard");
    game.setInput("jump", true, "touch:1");
    assert(s.input.left && s.input.jump, "input registered");

    game.pause();

    assertEqual(s.status, "paused", "paused");
    assert(!s.input.left && !s.input.right && !s.input.jump && !s.input.shoot, "input cleared");

    const x = s.player.x;
    game.resume();
    game.update(0.5);
    assertEqual(s.status, "playing", "resumed");
    assertEqual(s.player.x, x, "the player does not drift after resume");
  });

  test("Pause/resume is idempotent and does not stack", () => {
    const game = fresh(42);
    const s = game.state;
    assertEqual(game.pause(), true, "first pause applies");
    assertEqual(game.pause(), false, "second pause is a no-op");
    assertEqual(game.resume(), true, "first resume applies");
    assertEqual(game.resume(), false, "second resume is a no-op");
    assertEqual(s.status, "playing", "still playing");
  });

  test("Pool exhaustion drops spawns instead of throwing", () => {
    const game = fresh(51);
    const s = game.state;

    let filled = 0;
    for (;;) {
      const dart = s.darts.acquire();
      if (!dart) break;
      dart.x = 200;
      dart.y = 120;
      dart.vx = 0;
      dart.life = 1;
      filled += 1;
    }
    assertEqual(filled, core.LIMITS.darts, "filled every dart slot");
    assertEqual(s.darts.count(), core.LIMITS.darts, "dart pool is full");

    game.setInput("shoot", true, "keyboard");
    game.step();

    assertEqual(s.darts.count(), core.LIMITS.darts, "no over-capacity spawn");
    assertEqual(s.papers.count() <= core.LIMITS.papers, true, "paper pool stays bounded");
    assertEqual(s.particles.count() <= core.LIMITS.particles, true, "particle pool bounded");
    assertEqual(s.texts.count() <= core.LIMITS.texts, true, "text pool bounded");
  });

  test("Particles and texts are capped under heavy bursts", () => {
    const game = fresh(52);
    const s = game.state;
    s.enemies.clear();
    for (let i = 0; i < 40; i += 1) {
      const e = s.enemies.acquire();
      e.x = 200 + i * 2;
      e.y = 198;
      e.w = core.CRITIC_W;
      e.h = core.CRITIC_H;
      e.speed = 0;
      e.cd = 999;
    }
    for (let shot = 0; shot < 40; shot += 1) {
      const d = s.darts.acquire();
      if (!d) break;
      d.x = 301;
      d.y = 200;
      d.w = 8;
      d.h = 3;
      d.vx = 0;
      d.life = 1;
      s.player.invuln = 5;
      game.step();
    }
    assert(s.particles.count() <= core.LIMITS.particles, "particles never exceed the pool");
    assert(s.texts.count() <= core.LIMITS.texts, "texts never exceed the pool");
  });

  test("Repeated create/start/step/dispose leaves nothing live", () => {
    for (let i = 0; i < 60; i += 1) {
      const game = core.createGame({ seed: i + 1 });
      game.start({ seed: i + 1 });
      game.setInput("right", true, "keyboard");
      game.setInput("shoot", true, "keyboard");
      for (let step = 0; step < 5; step += 1) game.step();
      game.dispose();

      const s = game.state;
      assertEqual(game.isDisposed(), true, "disposed flag set");
      assertEqual(s.darts.count(), 0, "darts cleared");
      assertEqual(s.papers.count(), 0, "papers cleared");
      assertEqual(s.particles.count(), 0, "particles cleared");
      assertEqual(s.texts.count(), 0, "texts cleared");
      assertEqual(s.enemies.count(), 0, "enemies cleared");
      assertEqual(game.update(1), 0, "a disposed game does not advance");
    }
  });

  test("A long run stays inside its bounds", () => {
    const game = core.createGame({ seed: 77 });
    game.start({ seed: 77 });
    game.setInput("right", true, "keyboard");
    game.setInput("shoot", true, "keyboard");
    for (let i = 0; i < 60 * 90; i += 1) {
      if (game.state.status !== "playing") break;
      game.step();
    }
    const s = game.state;
    assert(s.darts.count() <= core.LIMITS.darts, "darts bounded over 90 s");
    assert(s.papers.count() <= core.LIMITS.papers, "papers bounded over 90 s");
    assert(s.particles.count() <= core.LIMITS.particles, "particles bounded over 90 s");
    assert(s.enemies.count() <= core.LIMITS.enemies, "enemies bounded over 90 s");
  });
}