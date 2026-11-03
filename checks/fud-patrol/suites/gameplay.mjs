// Regressions for the gameplay bugs Astra reproduced, plus the terminal-result
// rule that a death is never overwritten by a victory in the same tick.

export default function gameplay({ test, assert, assertEqual, core }) {
  const fresh = (seed = 7) => {
    const game = core.createGame({ seed });
    game.start({ seed });
    return game;
  };

  const placeCritic = (s, x, y) => {
    const e = s.enemies.acquire();
    e.x = x;
    e.y = y;
    e.w = core.CRITIC_W;
    e.h = core.CRITIC_H;
    e.dir = -1;
    e.speed = 0;
    e.cd = 999;
    e.walk = 0;
    return e;
  };

  test("BUG 1 — an airborne player at y=20 is not hit by a critic standing at y=198", () => {
    const game = fresh(3);
    const s = game.state;
    s.enemies.clear();
    placeCritic(s, 200, 198);

    s.cam = 0;
    s.player.x = 200;
    s.player.y = 20;
    s.player.vy = 0;
    s.player.invuln = 0;
    const lives = s.lives;

    game.step();

    assertEqual(s.lives, lives, "horizontal overlap alone must not deal damage");
    assert(s.player.y < 60, "player is still airborne after the step");
  });

  test("BUG 1 control — the same critic still hurts a grounded player", () => {
    const game = fresh(3);
    const s = game.state;
    s.enemies.clear();
    placeCritic(s, 200, 198);

    s.cam = 0;
    s.player.x = 200;
    s.player.y = core.GROUND - core.PLAYER_H;
    s.player.vy = 0;
    s.player.invuln = 0;
    const lives = s.lives;

    game.step();

    assertEqual(s.lives, lives - 1, "body overlap must still deal damage");
  });

  test("BUG 2 — one dart kills exactly one of two overlapping critics", () => {
    const game = fresh(5);
    const s = game.state;
    s.enemies.clear();
    placeCritic(s, 300, 198);
    placeCritic(s, 302, 198);
    s.cam = 0;
    s.player.x = 60;
    s.player.invuln = 5;

    const dart = s.darts.acquire();
    dart.x = 305;
    dart.y = 200;
    dart.w = 8;
    dart.h = 3;
    dart.vx = 0;
    dart.life = 1;

    game.step();

    assertEqual(s.enemies.count(), 1, "only the first overlapping critic is hit");
    assertEqual(s.darts.count(), 0, "the dart is spent after its first hit");
  });

  test("BUG 2 control — a second dart kills the second critic", () => {
    const game = fresh(5);
    const s = game.state;
    s.enemies.clear();
    placeCritic(s, 300, 198);
    placeCritic(s, 302, 198);
    s.cam = 0;
    s.player.x = 60;
    s.player.invuln = 5;

    for (let shot = 0; shot < 2; shot += 1) {
      const dart = s.darts.acquire();
      dart.x = 305;
      dart.y = 200;
      dart.w = 8;
      dart.h = 3;
      dart.vx = 0;
      dart.life = 1;
      game.step();
    }

    assertEqual(s.enemies.count(), 0, "two darts clear two critics");
  });

  test("BUG 3 — a fatal hit outranks the boss kill in the same tick", () => {
    const game = fresh(9);
    game.nextStage();
    game.nextStage();
    const s = game.state;

    // Walk into the arena so the boss exists.
    s.cam = s.length - core.W;
    s.player.x = s.length - 370;
    s.arena = false;
    s.boss = null;
    game.step();
    assert(s.boss, "boss spawned when the arena was entered");

    s.enemies.clear();
    s.lives = 1;
    s.player.invuln = 0;
    s.player.x = s.boss.x + 12;
    s.player.y = s.boss.y + 20;
    s.player.vy = 0;
    s.boss.hp = 1;

    const dart = s.darts.acquire();
    dart.x = s.boss.x + 20;
    dart.y = s.boss.y + 20;
    dart.w = 8;
    dart.h = 3;
    dart.vx = 0;
    dart.life = 1;

    game.step();

    assertEqual(s.lives, 0, "the fatal contact was applied");
    assertEqual(s.status, "over", "death wins over victory in the same tick");
  });

  test("BUG 3 control — a boss kill with lives left still ends in victory", () => {
    const game = fresh(9);
    game.nextStage();
    game.nextStage();
    const s = game.state;

    s.cam = s.length - core.W;
    s.player.x = s.length - 370;
    s.arena = false;
    s.boss = null;
    game.step();

    s.enemies.clear();
    s.player.invuln = 5;
    s.player.x = s.boss.x - 120;
    s.boss.hp = 1;

    const dart = s.darts.acquire();
    dart.x = s.boss.x + 20;
    dart.y = s.boss.y + 20;
    dart.w = 8;
    dart.h = 3;
    dart.vx = 0;
    dart.life = 1;

    game.step();

    assertEqual(s.status, "victory", "boss kill alone produces victory");
  });

  test("Terminal results are committed once and never re-applied", () => {
    const game = fresh(9);
    game.nextStage();
    game.nextStage();
    const s = game.state;

    s.cam = s.length - core.W;
    s.player.x = s.length - 370;
    s.arena = false;
    s.boss = null;
    game.step();

    s.enemies.clear();
    s.lives = 1;
    s.player.invuln = 0;
    s.player.x = s.boss.x + 12;
    s.player.y = s.boss.y + 20;
    s.boss.hp = 1;

    const dart = s.darts.acquire();
    dart.x = s.boss.x + 20;
    dart.y = s.boss.y + 20;
    dart.w = 8;
    dart.h = 3;
    dart.vx = 0;
    dart.life = 1;

    game.step();
    const scoreAtDeath = s.score;
    const statusAtDeath = s.status;

    game.step();
    game.step();

    assertEqual(s.status, statusAtDeath, "status stays where it resolved");
    assertEqual(s.score, scoreAtDeath, "no further scoring after the result");
    assertEqual(s.outcome, null, "no pending outcome is left behind");
  });
}