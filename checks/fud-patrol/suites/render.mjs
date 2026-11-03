// Render smoke test: the drawing code runs against a stub 2D context in every
// status and stage, never throws, and never changes the simulation.

function stubContext() {
  const calls = { fillRect: 0, fillText: 0, gradients: 0, translations: 0, saves: 0 };
  const gradient = { addColorStop() {} };
  return {
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
      calls.fillRect += 1;
    },
    fillText() {
      calls.fillText += 1;
    },
    save() {
      calls.saves += 1;
    },
    restore() {},
    translate() {
      calls.translations += 1;
    },
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
}

export default function render({ test, assert, assertEqual, core }) {
  test("Every stage draws without throwing", () => {
    const game = core.createGame({ seed: 12 });
    game.start({ seed: 12 });
    const s = game.state;
    const ctx = stubContext();

    for (let stage = 0; stage < core.STAGE_COUNT; stage += 1) {
      if (stage > 0) game.nextStage();
      // Step far enough that the camera, enemies and crates are all in play.
      for (let i = 0; i < 200; i += 1) {
        s.player.x = Math.min(s.length - 60, 48 + i * 6);
        game.step();
        core.draw(ctx, s);
      }
    }

    assert(ctx.calls.fillRect > 0, "the frame actually drew");
    assert(ctx.calls.fillText > 0, "the HUD drew");
  });

  test("The boss, the flag, particles and floating text all render", () => {
    const game = core.createGame({ seed: 13 });
    game.start({ seed: 13 });
    game.nextStage();
    game.nextStage();
    const s = game.state;
    const ctx = stubContext();

    s.cam = s.length - core.W;
    s.player.x = s.length - 372;
    game.step();
    assert(s.boss, "boss exists");

    for (let i = 0; i < 120; i += 1) {
      game.step();
      core.draw(ctx, s);
    }
    assert(ctx.calls.fillRect > 0, "boss frame drew");
  });

  test("Calm mode draws the same frame with no shake or flash", () => {
    const game = core.createGame({ seed: 14, calm: true });
    game.start({ seed: 14 });
    const s = game.state;
    const ctx = stubContext();

    s.flash = 0.28;
    s.shake = 6;
    game.setCalm(true);
    assertEqual(s.shake, 0, "calm clears shake");
    assertEqual(s.flash, 0, "calm clears flash");

    core.draw(ctx, s);
    assert(ctx.calls.fillRect > 0, "calm frame still draws");
  });

  test("draw() never changes the simulation", () => {
    const game = core.createGame({ seed: 15 });
    game.start({ seed: 15 });
    game.setInput("right", true, "keyboard");
    for (let i = 0; i < 60; i += 1) game.step();
    const s = game.state;
    const before = [s.player.x, s.player.y, s.score, s.lives, s.cam, s.enemies.count()].join("|");
    const ctx = stubContext();
    core.draw(ctx, s);
    core.draw(ctx, s);
    const after = [s.player.x, s.player.y, s.score, s.lives, s.cam, s.enemies.count()].join("|");
    assertEqual(after, before, "drawing is observation only");
  });
}