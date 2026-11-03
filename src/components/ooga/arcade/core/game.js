// FUD Patrol — dependency-free simulation core.
//
// This module knows nothing about React, the DOM, canvas or audio. It advances a
// fixed-step simulation and emits named events; a host adapter draws it, plays
// sounds and feeds it input. See HOST-ADAPTER.md.
//
// Simulation rules:
//  - Fixed step: one `FIXED_STEP` (1/60 s) per tick, driven by an accumulator with
//    a bounded number of catch-up steps. Frame rate cannot change physics.
//  - Seeded randomness: gameplay and cosmetic streams are separate, so a seed plus
//    an input sequence replays identically and particles never influence play.
//  - Terminal results resolve once, at the end of a tick, by precedence:
//    `over` (3) beats `victory` (2) beats `clear` (1).

import { CAV_H, CRIT_H, CRITICS, SCHIFF_H, SCHIFF_W } from "./sprites.js";
import { Pool } from "./pools.js";
import { createStreams } from "./rng.js";
import { planStage, STAGE_DEFS } from "./stages.js";

export const W = 480;
export const H = 270;
export const FIXED_STEP = 1 / 60;
export const STAGE_COUNT = STAGE_DEFS.length;
export const MAX_SUBSTEPS = 5;

// Explicit ceilings for every pool. A full pool drops spawns; it never throws.
export const LIMITS = Object.freeze({
  enemies: 40,
  darts: 24,
  papers: 48,
  particles: 140,
  texts: 8,
});

export const GROUND = 232;

export const PLAYER_S = 1.5;
export const PLAYER_W = 33;
export const PLAYER_H = Math.round(CAV_H * PLAYER_S);
export const CRITIC_S = 1.4;
export const CRITIC_W = 28;
export const CRITIC_H = Math.round(CRIT_H * CRITIC_S);
export const BOSS_S = 1.6;
export const BOSS_W = Math.round(SCHIFF_W * BOSS_S);
export const BOSS_H = Math.round(SCHIFF_H * BOSS_S);

// Body insets — the pixels of each sprite that actually collide. Damage requires
// overlap on both axes; the old horizontal-only check let an airborne player be
// hit by a critic standing on the ground far below.
const PLAYER_INSET = { x: 6, y: 3, w: 12, h: 4 };
const CRITIC_INSET = { x: 4, y: 2, w: 8, h: 3 };
const BOSS_INSET = { x: 8, y: 6, w: 16, h: 10 };

const GRAV = 0.62;
const MOVE = 2.7;
const JUMP = -9.8;

export const ACTIONS = Object.freeze(["left", "right", "jump", "shoot"]);

const POP_LINES = ["REKT", "FUD BLOCKED", "NOPE", "AGE OF DOUBT", "STAY REKT"];

const POWERS = [
  { id: "jetpack", label: "JETPACK", color: "#F7931A", time: 3 },
  { id: "springs", label: "SPRING BOOTS", color: "#5FAE8E", time: 9 },
  { id: "dash", label: "TURBO LEGS", color: "#8B5CF6", time: 7 },
  { id: "life", label: "EXTRA LIFE", color: "#e2554a" },
  { id: "coins", label: "COIN CACHE", color: "#e8b93c" },
];

// Precedence for terminal results inside a single tick.
const OUTCOME_RANK = { clear: 1, victory: 2, over: 3 };

const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

// Two scratch boxes shared by every collision test: no per-frame allocation.
const boxA = { x: 0, y: 0, w: 0, h: 0 };
const boxB = { x: 0, y: 0, w: 0, h: 0 };

// Crates sit flush with their own rect, so the no-inset case is a shared constant
// instead of a fresh object literal per crate per tick.
const NO_INSET = { x: 0, y: 0, w: 0, h: 0 };

function body(box, x, y, w, h, inset) {
  box.x = x + inset.x;
  box.y = y + inset.y;
  box.w = w - inset.w;
  box.h = h - inset.h;
  return box;
}

const overlaps = (a, b) =>
  a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;

const playerBody = (s) => body(boxA, s.player.x, s.player.y, PLAYER_W, PLAYER_H, PLAYER_INSET);
const criticBody = (e) => body(boxB, e.x, e.y, e.w, e.h, CRITIC_INSET);
const bossBody = (s) => body(boxB, s.boss.x, s.boss.y, BOSS_W, BOSS_H, BOSS_INSET);

function emit(s, name) {
  if (s.onEvent) s.onEvent(name);
}

function resetPlayer(p) {
  p.x = 48;
  p.y = GROUND - PLAYER_H;
  p.vy = 0;
  p.onGround = true;
  p.face = 1;
  p.cd = 0;
  p.invuln = 0;
  p.walk = 0;
  p.jumps = 0;
  p.jumpHeld = false;
}

function planCrates(s, stage) {
  const crates = [];
  const last = stage.length - (stage.boss ? 470 : 300);
  for (let x = 320; x < last; x += 340 + s.rng.gameplay.next() * 240) {
    crates.push({
      x,
      y: GROUND - 58 - s.rng.gameplay.next() * 20,
      w: 16,
      h: 16,
      taken: false,
    });
  }
  return crates;
}

function loadStage(s, index) {
  const stage = planStage(index, s.rng.gameplay);
  s.stage = index;
  s.stageName = stage.name;
  s.length = stage.length;
  s.palette = stage.palette;
  s.bossDef = stage.boss;
  s.boss = null;
  s.arena = false;
  s.outcome = null;
  s.cam = 0;
  s.goalX = stage.length - 120;
  s.flash = 0;
  s.shake = 0;

  s.enemies.clear();
  for (const spawn of stage.spawns) {
    const e = s.enemies.acquire();
    if (!e) break;
    e.type = spawn.type % CRITICS.length;
    e.x = spawn.x;
    e.y = GROUND - CRITIC_H;
    e.w = CRITIC_W;
    e.h = CRITIC_H;
    e.dir = -1;
    e.speed = 0.55 + index * 0.12;
    e.cd = 1 + s.rng.gameplay.next();
    e.walk = 0;
  }

  s.darts.clear();
  s.papers.clear();
  s.particles.clear();
  s.texts.clear();
  s.crates = planCrates(s, stage);
  s.power = null;
  resetPlayer(s.player);
}

// The boss record exists once per game and is re-armed for each encounter, so
// walking into the arena allocates no object at all.
function armBoss(s) {
  const b = s.bossSlot;
  b.x = s.length - BOSS_W - 46;
  b.y = GROUND - BOSS_H;
  b.vy = 0;
  b.onGround = true;
  b.face = -1;
  b.hp = s.bossDef.hp;
  b.maxHp = s.bossDef.hp;
  b.cd = 1.5;
  b.hopCd = 3;
  b.flash = 0;
  b.walk = 0;
  b.dead = false;
  s.boss = b;
}

function spawnParticle(s, x, y, vx, vy, life, color) {
  const pt = s.particles.acquire();
  if (!pt) return;
  pt.x = x;
  pt.y = y;
  pt.vx = vx;
  pt.vy = vy;
  pt.life = life;
  pt.color = color;
}

function spawnText(s, x, y, text, life, color) {
  const tx = s.texts.acquire();
  if (!tx) return;
  tx.x = x;
  tx.y = y;
  tx.text = text;
  tx.life = life;
  tx.color = color;
}

function burst(s, x, y, count) {
  const rng = s.rng.cosmetic;
  for (let i = 0; i < count; i += 1) {
    const a = rng.next() * Math.PI * 2;
    const sp = 0.8 + rng.next() * 2.2;
    spawnParticle(
      s,
      x,
      y,
      Math.cos(a) * sp,
      Math.sin(a) * sp - 1,
      0.6 + rng.next() * 0.4,
      i % 3 === 0 ? "#F7931A" : "#e6e1d3",
    );
  }
}

function requestOutcome(s, kind) {
  if (s.status !== "playing") return;
  if (!s.outcome || OUTCOME_RANK[kind] > OUTCOME_RANK[s.outcome]) s.outcome = kind;
}

// Applied once per tick. Anything that happened earlier in the same tick cannot
// overwrite a higher-precedence result, and the status only changes here.
function commitOutcome(s) {
  if (!s.outcome || s.status !== "playing") return;
  const kind = s.outcome;
  s.outcome = null;
  s.status = kind;
  s.input.left = false;
  s.input.right = false;
  emit(s, "music:stop");
  if (kind === "clear") {
    s.score += 500;
    emit(s, "stageClear");
  } else if (kind === "over") {
    emit(s, "gameOver");
  } else {
    emit(s, "victory");
  }
}

function damage(s) {
  const p = s.player;
  if (p.invuln > 0 || s.status !== "playing") return;
  s.lives -= 1;
  p.invuln = 1.7;
  if (!s.calm) {
    s.flash = 0.28;
    s.shake = 6;
  }
  spawnText(s, p.x + 4, p.y - 4, "OUCH", 0.9, "#ff8a5c");
  emit(s, "hurt");
  if (s.lives <= 0) {
    s.lives = 0;
    requestOutcome(s, "over");
  }
}

function killEnemy(s, e) {
  const cx = e.x + e.w / 2;
  const cy = e.y + e.h / 2;
  e.live = false;
  s.score += 100 + s.stage * 50;
  burst(s, cx, cy, 12);
  spawnText(
    s,
    cx - 18,
    cy - 14,
    POP_LINES[s.rng.cosmetic.int(POP_LINES.length)],
    0.9,
    "#F7931A",
  );
  emit(s, "hit");
  emit(s, "down");
}

function grantPower(s, crate) {
  const index = s.rng.gameplay.int(POWERS.length);
  const pick = POWERS[index];
  const cx = crate.x + crate.w / 2;
  const cy = crate.y + crate.h / 2;
  crate.taken = true;
  s.score += 25;
  burst(s, cx, cy, 10);

  if (pick.id === "life") {
    s.lives += 1;
    emit(s, "coin");
  } else if (pick.id === "coins") {
    s.score += 500;
    emit(s, "coin");
  } else {
    // Pre-allocated slot per power id; only its clock is re-armed.
    const slot = s.powerSlots[index];
    slot.t = pick.time;
    slot.max = pick.time;
    s.power = slot;
  }

  spawnText(s, cx - 22, cy - 16, pick.label, 1.3, pick.color);
  emit(s, "crate");
  emit(s, "powerup");
}

function hitBoss(s) {
  const b = s.boss;
  if (!b) return;
  b.hp -= 1;
  b.flash = 0.18;
  s.score += 50;
  burst(s, b.x + BOSS_W / 2, b.y + 24, 5);
  if (b.hp <= 0) {
    b.dead = true;
    burst(s, b.x + BOSS_W / 2, b.y + BOSS_H / 2, 40);
    s.score += 2000;
    s.boss = null;
    if (!s.calm) s.shake = 8;
    emit(s, "bossDown");
    requestOutcome(s, "victory");
  } else {
    emit(s, "bossHit");
  }
}

function throwCoin(s, b, lift) {
  const p = s.player;
  const q = s.papers.acquire();
  if (!q) return;
  const sx = b.x + (b.face > 0 ? BOSS_W - 8 : 8);
  const sy = b.y + 22;
  const dir = Math.sign(p.x + PLAYER_W / 2 - sx) || -1;
  q.kind = "coin";
  q.x = sx;
  q.y = sy;
  q.w = 7;
  q.h = 7;
  q.vx = dir * (2.3 + lift * 0.5);
  q.vy = -4.4 - lift * 0.4;
  q.spin = 0;
  q.life = 6;
  q.delay = 0;
}

function stepStepPlayer(s) {
  const p = s.player;
  const k = s.input;
  const power = s.power;
  const jet = !!power && power.id === "jetpack" && power.t > 0;
  const springs = !!power && power.id === "springs";
  const dash = !!power && power.id === "dash";
  const jumpPressed = k.jump && !p.jumpHeld;
  p.jumpHeld = k.jump;

  const dir = (k.right ? 1 : 0) - (k.left ? 1 : 0);
  if (dir !== 0) {
    p.face = dir;
    p.x += dir * MOVE * (dash ? 1.65 : 1);
    p.walk += FIXED_STEP * 10;
  } else {
    p.walk = 0;
  }
  p.x = clamp(p.x, 20, s.length - 40);

  if (k.jump && p.onGround) {
    p.vy = springs ? JUMP * 1.15 : JUMP;
    p.onGround = false;
    p.jumps = 1;
    emit(s, "jump");
  } else if (jumpPressed && springs && p.jumps === 1) {
    p.vy = JUMP * 0.9;
    p.jumps = 2;
    emit(s, "jump");
  }

  // The jetpack only burns fuel while the jump button is held.
  if (jet && k.jump) {
    p.vy = Math.min(p.vy, -3.2);
    power.t -= FIXED_STEP;
    if (s.rng.cosmetic.next() < 0.7) {
      const r = s.rng.cosmetic;
      spawnParticle(
        s,
        p.x + PLAYER_W / 2 + (r.next() - 0.5) * 6,
        p.y + PLAYER_H - 3,
        (r.next() - 0.5) * 0.7,
        1.4 + r.next(),
        0.28,
        r.next() < 0.5 ? "#ffd08a" : "#F7931A",
      );
    }
    if (power.t <= 0) {
      s.power = null;
      spawnText(s, p.x, p.y - 12, "TANK EMPTY", 1, "#b7b2a4");
      emit(s, "powerDown");
    }
  }

  p.vy += GRAV;
  p.y += p.vy;
  if (p.y >= GROUND - PLAYER_H) {
    p.y = GROUND - PLAYER_H;
    p.vy = 0;
    p.onGround = true;
    p.jumps = 0;
  } else {
    p.onGround = false;
    if (p.y < 4) {
      p.y = 4;
      p.vy = Math.max(p.vy, 0);
    }
  }

  if (power && s.power === power && power.id !== "jetpack") {
    power.t -= FIXED_STEP;
    if (power.t <= 0) {
      s.power = null;
      spawnText(s, p.x, p.y - 12, "POWER DOWN", 0.9, "#b7b2a4");
      emit(s, "powerDown");
    }
  }

  p.cd = Math.max(0, p.cd - FIXED_STEP);
  p.invuln = Math.max(0, p.invuln - FIXED_STEP);

  if (k.shoot && p.cd <= 0) {
    const d = s.darts.acquire();
    if (d) {
      d.x = p.face > 0 ? p.x + PLAYER_W - 8 : p.x + 2;
      d.y = p.y + 16;
      d.w = 8;
      d.h = 3;
      d.vx = 6.6 * p.face;
      d.life = 1.2;
      p.cd = 0.19;
      emit(s, "shoot");
    }
  }
}

// Hot loops are indexed rather than callback-driven: a `forEach` closure per pool
// per tick was itself an allocation (660 of them over 60 idle ticks).
function stepDarts(s) {
  const darts = s.darts.items;
  const count = s.darts.capacity;
  for (let i = 0; i < count; i += 1) {
    const d = darts[i];
    if (!d.live) continue;
    d.x += d.vx;
    d.life -= FIXED_STEP;
  }
}

function stepCamera(s) {
  const p = s.player;
  if (!s.arena) {
    const target = clamp(p.x - W * 0.32, 0, s.length - W);
    s.cam += (target - s.cam) * Math.min(1, 7 * FIXED_STEP);
  } else {
    s.cam += (s.length - W - s.cam) * Math.min(1, 6 * FIXED_STEP);
    p.x = clamp(p.x, s.cam + 16, s.length - 40);
  }
}

function stepCrates(s) {
  const grab = playerBody(s);
  let write = 0;
  const crates = s.crates;
  for (let i = 0; i < crates.length; i += 1) {
    const c = crates[i];
    if (!c.taken) {
      body(boxB, c.x, c.y, c.w, c.h, NO_INSET);
      if (overlaps(grab, boxB)) grantPower(s, c);
    }
    if (!c.taken && c.x > s.cam - 200) {
      crates[write] = c;
      write += 1;
    }
  }
  crates.length = write;
}

function stepEnemies(s) {
  const p = s.player;
  const rng = s.rng.gameplay;
  const pCenter = p.x + PLAYER_W / 2;
  playerBody(s);

  const enemies = s.enemies.items;
  const enemyCount = s.enemies.capacity;

  for (let i = 0; i < enemyCount; i += 1) {
    const e = enemies[i];
    if (!e.live) continue;
    if (e.x < s.cam - 220 || e.x > s.cam + W + 200) continue;
    const dx = pCenter - (e.x + e.w / 2);
    e.dir = dx >= 0 ? 1 : -1;

    if (Math.abs(dx) < 230) {
      if (Math.abs(dx) > 34) e.x += Math.sign(dx) * e.speed;
      e.walk += FIXED_STEP * 7;
      e.cd -= FIXED_STEP;
      if (e.cd <= 0 && Math.abs(dx) < 250) {
        e.cd = 1.6 + rng.next() * 1.2;
        const q = s.papers.acquire();
        if (q) {
          const ang = Math.atan2(
            p.y + PLAYER_H / 2 - (e.y + 10),
            p.x + PLAYER_W / 2 - (e.x + e.w / 2),
          );
          q.kind = "paper";
          q.x = e.x + e.w / 2;
          q.y = e.y + 8;
          q.w = 6;
          q.h = 5;
          q.vx = Math.cos(ang) * 2.6;
          q.vy = Math.sin(ang) * 2.6 - 0.5;
          q.spin = 0;
          q.life = 5;
          q.delay = 0;
        }
      }
    } else {
      e.x -= 0.3;
      e.walk += FIXED_STEP * 4;
    }

    // Contact damage needs overlap on both axes: same body boxes the renderer shows.
    criticBody(e);
    if (overlaps(boxA, boxB)) damage(s);
  }
}

function stepBoss(s) {
  const b = s.boss;
  const p = s.player;
  b.flash = Math.max(0, b.flash - FIXED_STEP);

  const dx = p.x + PLAYER_W / 2 - (b.x + BOSS_W / 2);
  b.face = dx >= 0 ? 1 : -1;

  if (Math.abs(dx) > 115) {
    b.x += Math.sign(dx) * 0.8;
    b.walk += FIXED_STEP * 6;
  } else {
    b.walk = 0;
  }
  b.x = clamp(b.x, s.length - W + 10, s.length - BOSS_W - 12);

  b.vy += GRAV;
  b.y += b.vy;
  if (b.y >= GROUND - BOSS_H) {
    b.y = GROUND - BOSS_H;
    b.vy = 0;
    b.onGround = true;
  }

  b.cd -= FIXED_STEP;
  if (b.cd <= 0) {
    b.cd = 1.7;
    throwCoin(s, b, 0);
    throwCoin(s, b, 1);
    throwCoin(s, b, 2);
    emit(s, "bossThrow");
  }

  b.hopCd -= FIXED_STEP;
  if (b.hopCd <= 0 && b.onGround) {
    b.hopCd = 3.4;
    b.vy = -7.4;
    b.onGround = false;
  }

  playerBody(s);
  bossBody(s);
  if (overlaps(boxA, boxB)) damage(s);
}

// A dart resolves against exactly one target and is then spent. Overlapping
// critics are not all hit by a single shot.
function stepDartHits(s) {
  const darts = s.darts.items;
  const dartCount = s.darts.capacity;
  const enemies = s.enemies.items;
  const enemyCount = s.enemies.capacity;

  for (let i = 0; i < dartCount; i += 1) {
    const d = darts[i];
    if (!d.live || d.life <= 0) continue;

    let hit = false;
    for (let j = 0; j < enemyCount; j += 1) {
      const e = enemies[j];
      if (!e.live) continue;
      criticBody(e);
      if (overlaps(d, boxB)) {
        hit = true;
        d.live = false;
        killEnemy(s, e);
        break;
      }
    }
    if (hit) continue;

    if (s.boss) {
      bossBody(s);
      if (overlaps(d, boxB)) {
        d.live = false;
        hitBoss(s);
      }
    }
  }
}

function stepPapers(s) {
  const hurt = playerBody(s);
  const papers = s.papers.items;
  const count = s.papers.capacity;

  for (let i = 0; i < count; i += 1) {
    const q = papers[i];
    if (!q.live) continue;
    if (q.delay > 0) {
      q.delay -= FIXED_STEP;
      continue;
    }
    q.x += q.vx;
    q.y += q.vy;
    q.vy += 0.11;
    q.spin += 0.12;
    q.life -= FIXED_STEP;
    if (q.life > 0 && overlaps(q, hurt)) {
      q.live = false;
      damage(s);
    }
  }
}

function stepParticles(s) {
  const particles = s.particles.items;
  const count = s.particles.capacity;
  for (let i = 0; i < count; i += 1) {
    const pt = particles[i];
    if (!pt.live) continue;
    pt.x += pt.vx;
    pt.y += pt.vy;
    pt.vy += 0.06;
    pt.life -= FIXED_STEP;
  }
}

function stepTexts(s) {
  const texts = s.texts.items;
  const count = s.texts.capacity;
  for (let i = 0; i < count; i += 1) {
    const tx = texts[i];
    if (!tx.live) continue;
    tx.y -= 24 * FIXED_STEP;
    tx.life -= FIXED_STEP;
  }
}

// In-place retention, one indexed pass per pool — no predicate closures.
function sweep(s) {
  const cam = s.cam;

  const darts = s.darts.items;
  let n = s.darts.capacity;
  for (let i = 0; i < n; i += 1) {
    const d = darts[i];
    if (d.live && !(d.life > 0 && d.x > cam - 40 && d.x < cam + W + 40)) d.live = false;
  }

  const papers = s.papers.items;
  n = s.papers.capacity;
  for (let i = 0; i < n; i += 1) {
    const q = papers[i];
    if (q.live && !(q.life > 0 && q.y < GROUND - 2)) q.live = false;
  }

  const enemies = s.enemies.items;
  n = s.enemies.capacity;
  for (let i = 0; i < n; i += 1) {
    const e = enemies[i];
    if (e.live && !(e.x > cam - 260)) e.live = false;
  }

  const particles = s.particles.items;
  n = s.particles.capacity;
  for (let i = 0; i < n; i += 1) {
    const pt = particles[i];
    if (pt.live && !(pt.life > 0)) pt.live = false;
  }

  const texts = s.texts.items;
  n = s.texts.capacity;
  for (let i = 0; i < n; i += 1) {
    const tx = texts[i];
    if (tx.live && !(tx.life > 0)) tx.live = false;
  }
}

function checkStageEnd(s) {
  const p = s.player;
  if (s.bossDef) {
    if (!s.boss && !s.arena && p.x > s.length - 380) {
      s.arena = true;
      armBoss(s);
      spawnText(s, p.x, p.y - 40, "THE GOLD BOSS", 1.6, "#F7931A");
      emit(s, "bossAppear");
    }
  } else if (p.x + PLAYER_W > s.goalX) {
    requestOutcome(s, "clear");
  }
}

function stepFixed(s) {
  s.t += FIXED_STEP;
  s.flash = Math.max(0, s.flash - FIXED_STEP);
  s.shake = Math.max(0, s.shake - 30 * FIXED_STEP);
  if (s.status !== "playing") return;

  stepStepPlayer(s);
  stepDarts(s);
  stepCamera(s);
  stepCrates(s);
  stepEnemies(s);
  if (s.boss) stepBoss(s);
  stepDartHits(s);
  stepPapers(s);
  stepParticles(s);
  stepTexts(s);
  sweep(s);
  checkStageEnd(s);
  commitOutcome(s);
}

function makeState(config) {
  const streams = createStreams(config.seed);
  const s = {
    status: "ready",
    t: 0,
    score: 0,
    lives: 3,
    stage: 0,
    stageName: STAGE_DEFS[0].name,
    length: STAGE_DEFS[0].length,
    palette: STAGE_DEFS[0].palette,
    bossDef: null,
    boss: null,
    arena: false,
    cam: 0,
    goalX: 0,
    outcome: null,
    calm: !!config.calm,
    flash: 0,
    shake: 0,
    power: null,
    // One record per power id and one boss record, built up front. Picking up a
    // crate or entering the arena re-arms these instead of allocating.
    powerSlots: POWERS.map((p) => ({
      id: p.id,
      label: p.label,
      color: p.color,
      t: 0,
      max: p.time || 1,
    })),
    bossSlot: {
      x: 0,
      y: 0,
      vy: 0,
      onGround: true,
      face: -1,
      hp: 0,
      maxHp: 1,
      cd: 0,
      hopCd: 0,
      flash: 0,
      walk: 0,
      dead: false,
    },
    crates: [],
    player: {},
    input: { left: false, right: false, jump: false, shoot: false },
    rng: streams,
    onEvent: null,
    enemies: new Pool(LIMITS.enemies, () => ({
      type: 0,
      x: 0,
      y: 0,
      w: CRITIC_W,
      h: CRITIC_H,
      dir: -1,
      speed: 0,
      cd: 0,
      walk: 0,
    })),
    darts: new Pool(LIMITS.darts, () => ({ x: 0, y: 0, w: 8, h: 3, vx: 0, life: 0 })),
    papers: new Pool(LIMITS.papers, () => ({
      kind: "paper",
      x: 0,
      y: 0,
      w: 6,
      h: 5,
      vx: 0,
      vy: 0,
      spin: 0,
      life: 0,
      delay: 0,
    })),
    particles: new Pool(LIMITS.particles, () => ({
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,
      life: 0,
      color: "#fff",
    })),
    texts: new Pool(LIMITS.texts, () => ({ x: 0, y: 0, text: "", life: 0, color: "#fff" })),
  };
  resetPlayer(s.player);
  loadStage(s, 0);
  return s;
}

export function createGame(options = {}) {
  const config = {
    seed: Number.isFinite(options.seed) ? options.seed : 1,
    calm: !!options.calm,
  };

  const state = makeState(config);
  const sources = new Map();
  let accumulator = 0;
  let disposed = false;
  // The host's calm preference outlives a start/restart: losing it on reset made
  // reduced motion flicker back on after the first run.
  let calmPreference = config.calm;

  if (typeof options.onEvent === "function") state.onEvent = options.onEvent;

  function recomputeInput() {
    const input = state.input;
    for (const action of ACTIONS) input[action] = false;
    for (const actions of sources.values()) {
      for (const action of actions) input[action] = true;
    }
  }

  // Input is aggregated across sources ('keyboard', 'touch:12', 'host'), so a
  // keyboard key and a thumb on the same action cannot cancel each other out.
  function setInput(action, down, sourceId = "host") {
    if (disposed || !ACTIONS.includes(action)) return;
    let actions = sources.get(sourceId);
    if (down) {
      if (!actions) {
        actions = new Set();
        sources.set(sourceId, actions);
      }
      actions.add(action);
    } else if (actions) {
      actions.delete(action);
      if (actions.size === 0) sources.delete(sourceId);
    }
    recomputeInput();
  }

  function releaseSource(sourceId) {
    if (disposed) return;
    if (sources.delete(sourceId)) recomputeInput();
  }

  function clearInput() {
    if (disposed) return;
    sources.clear();
    recomputeInput();
    state.player.jumpHeld = false;
  }

  function reset(seed) {
    const next = Number.isFinite(seed) ? seed : config.seed;
    state.rng = createStreams(next);
    state.score = 0;
    state.lives = 3;
    state.t = 0;
    state.outcome = null;
    state.flash = 0;
    state.shake = 0;
    state.calm = calmPreference;
    loadStage(state, 0);
  }

  function start(opts = {}) {
    if (disposed) return false;
    reset(opts.seed);
    state.status = "playing";
    clearInput();
    accumulator = 0;
    emit(state, "stageStart");
    emit(state, "music:start");
    return true;
  }

  function nextStage() {
    if (disposed) return false;
    if (state.stage + 1 < STAGE_COUNT) {
      loadStage(state, state.stage + 1);
      state.status = "playing";
      clearInput();
      accumulator = 0;
      emit(state, "stageStart");
      emit(state, "music:start");
    } else {
      state.status = "playing";
      requestOutcome(state, "victory");
      commitOutcome(state);
    }
  }

  function pause() {
    if (disposed || state.status !== "playing") return false;
    state.status = "paused";
    clearInput();
    emit(state, "music:stop");
    return true;
  }

  function resume() {
    if (disposed || state.status !== "paused") return false;
    state.status = "playing";
    clearInput();
    accumulator = 0;
    emit(state, "music:start");
    return true;
  }

  function step() {
    if (disposed || state.status !== "playing") return false;
    stepFixed(state);
    return true;
  }

  // Real-time entry point: convert elapsed seconds into whole fixed steps, with a
  // hard cap so a stalled tab cannot fast-forward the game.
  function update(dtSeconds) {
    if (disposed) return 0;
    const dt = Number.isFinite(dtSeconds) ? dtSeconds : 0;
    if (dt <= 0) return 0;
    if (state.status !== "playing") {
      state.t += Math.min(dt, 0.1);
      return 0;
    }
    accumulator = Math.min(accumulator + dt / FIXED_STEP, MAX_SUBSTEPS);
    let steps = 0;
    while (accumulator >= 1 - 1e-9 && steps < MAX_SUBSTEPS && state.status === "playing") {
      accumulator -= 1;
      stepFixed(state);
      steps += 1;
    }
    if (accumulator < 0) accumulator = 0;
    return steps;
  }

  function setCalm(value) {
    if (disposed) return;
    calmPreference = !!value;
    state.calm = calmPreference;
    if (state.calm) {
      state.shake = 0;
      state.flash = 0;
    }
  }

  function setEventHandler(fn) {
    if (disposed) return;
    state.onEvent = typeof fn === "function" ? fn : null;
  }

  // After dispose every entry point above is a no-op, so a stale reference in a
  // host can never resurrect the run, re-arm events or repopulate the pools.
  function dispose() {
    if (disposed) return;
    clearInput();
    disposed = true;
    state.onEvent = null;
    state.boss = null;
    state.power = null;
    state.outcome = null;
    state.enemies.clear();
    state.darts.clear();
    state.papers.clear();
    state.particles.clear();
    state.texts.clear();
    state.crates.length = 0;
  }

  return {
    state,
    start,
    nextStage,
    pause,
    resume,
    step,
    update,
    setInput,
    releaseSource,
    clearInput,
    setCalm,
    setEventHandler,
    dispose,
    isDisposed: () => disposed,
  };
}