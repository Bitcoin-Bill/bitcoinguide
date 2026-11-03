// Seeded, deterministic pseudo-random streams.
//
// Two independent streams are used by the game so that cosmetic randomness
// (particle scatter, screen-shake offsets, star twinkle) can never change the
// gameplay outcome, and gameplay randomness (enemy timers, crate layout, power-up
// rolls) can be replayed exactly from a seed.

export function createRng(seed = 1) {
  let a = (seed >>> 0) || 1;

  const next = () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };

  return {
    next,
    range: (min, max) => min + next() * (max - min),
    int: (n) => Math.floor(next() * n),
  };
}

export const COSMETIC_SALT = 0x85ebca6b;

export function createStreams(seed) {
  const base = (seed >>> 0) || 1;
  return {
    gameplay: createRng(base),
    cosmetic: createRng((base ^ COSMETIC_SALT) >>> 0),
  };
}