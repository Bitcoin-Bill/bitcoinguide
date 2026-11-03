// Stage definitions and deterministic encounter planning.
//
// Encounter x-positions and critic types are drawn from the caller's gameplay
// RNG, so a stage is reproducible from a seed instead of being fixed at module
// load time.

export const STAGE_DEFS = [
  {
    name: "The Beach",
    length: 1500,
    boss: null,
    spawn: { from: 430, to: 1220, gapMin: 300, gapMax: 420, types: 5 },
    palette: {
      sky: ["#0a2436", "#12495a", "#1f7a76"],
      hills: "#0d2f3a",
      moon: "#f0d9a8",
      ground: "#3a3021",
      groundTop: "#6b5735",
      detail: "#7f6a44",
    },
  },
  {
    name: "The Jungle",
    length: 1900,
    boss: null,
    spawn: { from: 440, to: 1580, gapMin: 280, gapMax: 390, types: 5 },
    palette: {
      sky: ["#08170f", "#123024", "#1f5136"],
      hills: "#0b241a",
      moon: "#e9efc9",
      ground: "#22301c",
      groundTop: "#3f6b33",
      detail: "#4f8241",
    },
  },
  {
    name: "The Summit",
    length: 2200,
    boss: { hp: 16 },
    spawn: { from: 440, to: 1660, gapMin: 300, gapMax: 430, types: 5 },
    palette: {
      sky: ["#180f2a", "#3a1f45", "#7a3a4f"],
      hills: "#241232",
      moon: "#ffd08a",
      ground: "#241a24",
      groundTop: "#5b3f2a",
      detail: "#6f4d31",
    },
  },
];

export function planStage(index, rng) {
  const def = STAGE_DEFS[index];
  const { from, to, gapMin, gapMax, types } = def.spawn;
  const spawns = [];
  let x = from;
  while (x < to) {
    spawns.push({ x, type: rng.int(types) });
    if (rng.next() < 0.35) {
      spawns.push({ x: x + rng.range(80, 120), type: rng.int(types) });
    }
    x += rng.range(gapMin, gapMax);
  }
  return {
    index,
    name: def.name,
    length: def.length,
    boss: def.boss,
    palette: def.palette,
    spawns,
  };
}