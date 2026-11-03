// Canvas renderer for the FUD Patrol core. Pure drawing: no state mutation that
// affects play, and every random-looking flourish (twinkle, shake offset, flame
// flicker) is skipped or frozen when the host asks for calm motion.

import {
  drawCaveman,
  drawCoin,
  drawCrate,
  drawCritic,
  drawDart,
  drawFlag,
  drawPaper,
  drawSchiff,
} from "./sprites.js";
import {
  BOSS_S,
  BOSS_W,
  CRITIC_S,
  GROUND,
  H,
  PLAYER_H,
  PLAYER_S,
  PLAYER_W,
  W,
} from "./game.js";

const STARS = Array.from({ length: 34 }, (_, i) => ({
  x: (i * 97.3) % W,
  y: 10 + ((i * 53.7) % 150),
  s: i % 5 === 0 ? 2 : 1,
}));

const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

// The sky gradient is the only canvas resource a frame needs, and it is fixed
// geometry. Build it once per (context, palette) and reuse it: drawing no longer
// allocates a gradient object every frame.
const gradientCache = new WeakMap();

function skyGradient(ctx, palette) {
  let perContext = gradientCache.get(ctx);
  if (!perContext) {
    perContext = new Map();
    gradientCache.set(ctx, perContext);
  }
  let gradient = perContext.get(palette);
  if (!gradient) {
    gradient = ctx.createLinearGradient(0, 0, 0, GROUND);
    gradient.addColorStop(0, palette.sky[0]);
    gradient.addColorStop(0.62, palette.sky[1]);
    gradient.addColorStop(1, palette.sky[2]);
    perContext.set(palette, gradient);
  }
  return gradient;
}

// HUD strings are cached by value, so a still frame rebuilds nothing.
let hudScoreValue = -1;
let hudScoreText = "";
let hudStageValue = -1;
let hudStageName = "";
let hudStageText = "";

function scoreLabel(score) {
  if (score !== hudScoreValue) {
    hudScoreValue = score;
    hudScoreText = `SCORE ${String(score).padStart(5, "0")}`;
  }
  return hudScoreText;
}

function stageLabel(s) {
  if (s.stage !== hudStageValue || s.stageName !== hudStageName) {
    hudStageValue = s.stage;
    hudStageName = s.stageName;
    hudStageText = `STAGE ${s.stage + 1} · ${s.stageName.toUpperCase()}`;
  }
  return hudStageText;
}

function drawSky(ctx, s) {
  const pal = s.palette;
  ctx.fillStyle = skyGradient(ctx, pal);
  ctx.fillRect(0, 0, W, GROUND);

  ctx.fillStyle = "#dfe6f0";
  for (const st of STARS) {
    ctx.globalAlpha = s.calm ? 0.34 : 0.3 + 0.3 * Math.sin(s.t * 1.2 + st.x);
    ctx.fillRect(st.x, st.y, st.s, st.s);
  }
  ctx.globalAlpha = 1;

  ctx.fillStyle = pal.moon;
  ctx.fillRect(W - 92, 26, 14, 14);
  ctx.fillRect(W - 96, 30, 22, 7);
  ctx.fillRect(W - 89, 22, 8, 22);

  const base = -((s.cam * 0.35) % 190);
  ctx.fillStyle = pal.hills;
  for (let i = 0; i < 4; i += 1) {
    const x = base + i * 190;
    ctx.fillRect(x, GROUND - 34, 120, 34);
    ctx.fillRect(x + 30, GROUND - 48, 60, 16);
    ctx.fillRect(x + 128, GROUND - 22, 54, 22);
  }
}

function drawGround(ctx, s) {
  const pal = s.palette;
  ctx.fillStyle = pal.ground;
  ctx.fillRect(s.cam - 10, GROUND, W + 20, H - GROUND);
  ctx.fillStyle = pal.groundTop;
  ctx.fillRect(s.cam - 10, GROUND, W + 20, 3);
  ctx.fillStyle = pal.detail;
  const start = Math.floor(s.cam / 24) * 24;
  for (let x = start; x < s.cam + W + 24; x += 24) {
    ctx.fillRect(x + ((x / 24) % 2 ? 7 : 2), GROUND + 12, 10, 3);
  }
}

function drawHud(ctx, s) {
  ctx.textAlign = "left";
  ctx.textBaseline = "top";

  ctx.font = "bold 10px ui-monospace, Menlo, monospace";
  ctx.fillStyle = "#f2efe4";
  ctx.fillText(scoreLabel(s.score), 10, 9);

  ctx.font = "bold 8px ui-monospace, Menlo, monospace";
  ctx.fillStyle = "#b7b2a4";
  ctx.fillText(stageLabel(s), 10, 22);

  const prog = clamp(s.player.x / (s.goalX || s.length), 0, 1);
  ctx.fillStyle = "rgba(255,255,255,0.16)";
  ctx.fillRect(10, 34, 96, 3);
  ctx.fillStyle = "#F7931A";
  ctx.fillRect(10, 34, 96 * prog, 3);

  ctx.font = "bold 10px ui-monospace, Menlo, monospace";
  ctx.fillStyle = "#b7b2a4";
  ctx.fillText("LIVES", W - 92, 9);
  for (let i = 0; i < Math.max(0, s.lives); i += 1) {
    ctx.fillStyle = "#F7931A";
    ctx.fillRect(W - 46 + i * 12, 9, 8, 8);
    ctx.fillStyle = "#ffd08a";
    ctx.fillRect(W - 46 + i * 12, 9, 8, 2);
  }

  if (s.power) {
    ctx.font = "bold 8px ui-monospace, Menlo, monospace";
    ctx.fillStyle = s.power.color;
    ctx.fillText(s.power.label, 10, H - 26);
    ctx.fillStyle = "rgba(255,255,255,0.18)";
    ctx.fillRect(10, H - 14, 84, 3);
    ctx.fillStyle = s.power.color;
    ctx.fillRect(10, H - 14, 84 * clamp(s.power.t / s.power.max, 0, 1), 3);
  }

  if (s.boss) {
    const barW = 150;
    const x = W / 2 - barW / 2;
    const y = H - 17;
    ctx.textAlign = "center";
    ctx.font = "bold 8px ui-monospace, Menlo, monospace";
    ctx.fillStyle = "#e8b06a";
    ctx.fillText("PETER SCHIFF · GOLD BOSS", W / 2, y - 10);
    ctx.fillStyle = "rgba(0,0,0,0.55)";
    ctx.fillRect(x - 2, y - 2, barW + 4, 9);
    ctx.fillStyle = "#F7931A";
    ctx.fillRect(x, y, (barW * Math.max(0, s.boss.hp)) / s.boss.maxHp, 5);
    ctx.textAlign = "left";
  }
}

export function draw(ctx, s) {
  ctx.imageSmoothingEnabled = false;
  drawSky(ctx, s);

  const shake = s.calm ? 0 : s.shake;
  ctx.save();
  ctx.translate(-Math.round(s.cam), 0);
  if (shake > 0) {
    const r = s.rng.cosmetic;
    ctx.translate((r.next() - 0.5) * shake, (r.next() - 0.5) * shake);
  }

  drawGround(ctx, s);
  if (!s.bossDef) drawFlag(ctx, s.goalX, GROUND, s.t);

  for (const c of s.crates) {
    if (c.x < s.cam - 40 || c.x > s.cam + W + 40) continue;
    drawCrate(ctx, c.x, c.y, s.t);
  }

  const enemies = s.enemies.items;
  for (let i = 0; i < s.enemies.capacity; i += 1) {
    const e = enemies[i];
    if (!e.live) continue;
    if (e.x < s.cam - 80 || e.x > s.cam + W + 80) continue;
    drawCritic(ctx, e.x, e.y, CRITIC_S, e.dir, e.type, e.walk);
  }

  if (s.boss && !(s.boss.flash > 0 && !s.calm && Math.floor(s.t * 30) % 2 === 0)) {
    drawSchiff(ctx, s.boss.x, s.boss.y, BOSS_S, s.boss.face, s.boss.walk);
  }

  const papers = s.papers.items;
  for (let i = 0; i < s.papers.capacity; i += 1) {
    const q = papers[i];
    if (!q.live) continue;
    if (q.kind === "coin") drawCoin(ctx, q.x, q.y, q.spin);
    else drawPaper(ctx, q.x, q.y, q.spin);
  }

  const darts = s.darts.items;
  for (let i = 0; i < s.darts.capacity; i += 1) {
    const d = darts[i];
    if (!d.live) continue;
    drawDart(ctx, d.x, d.y, d.vx > 0 ? 1 : -1);
  }

  const p = s.player;
  if (s.power && s.power.id === "jetpack") {
    const bx = p.face > 0 ? p.x - 5 : p.x + PLAYER_W - 1;
    ctx.fillStyle = "#39414f";
    ctx.fillRect(bx, p.y + 9, 6, 16);
    ctx.fillStyle = "#F7931A";
    ctx.fillRect(bx, p.y + 13, 6, 3);
    if (s.input.jump && s.power.t > 0) {
      const flicker = s.calm ? 3 : Math.floor(s.t * 20) % 2 ? 3 : 6;
      ctx.fillStyle = s.calm ? "#ffd08a" : Math.floor(s.t * 20) % 2 ? "#ffd08a" : "#F7931A";
      ctx.fillRect(bx + 1, p.y + 25, 4, flicker);
    }
  }

  const blinking = p.invuln > 0 && !s.calm && Math.floor(s.t * 14) % 2 === 0;
  if (!blinking) drawCaveman(ctx, p.x, p.y, PLAYER_S, p.face, p.walk);

  const particles = s.particles.items;
  for (let i = 0; i < s.particles.capacity; i += 1) {
    const pt = particles[i];
    if (!pt.live) continue;
    ctx.globalAlpha = Math.min(1, pt.life * 2);
    ctx.fillStyle = pt.color;
    ctx.fillRect(pt.x, pt.y, 2.5, 2.5);
  }
  ctx.globalAlpha = 1;

  ctx.textBaseline = "top";
  ctx.font = "bold 9px ui-monospace, Menlo, monospace";
  const texts = s.texts.items;
  for (let i = 0; i < s.texts.capacity; i += 1) {
    const tx = texts[i];
    if (!tx.live) continue;
    ctx.globalAlpha = Math.min(1, tx.life * 1.6);
    ctx.fillStyle = tx.color;
    ctx.fillText(tx.text, tx.x, tx.y);
  }
  ctx.globalAlpha = 1;
  ctx.restore();

  if (s.flash > 0 && !s.calm) {
    ctx.fillStyle = `rgba(220,70,50,${Math.min(0.4, s.flash)})`;
    ctx.fillRect(0, 0, W, H);
  }

  drawHud(ctx, s);
}

export { PLAYER_H };