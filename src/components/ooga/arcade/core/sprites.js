// Pixel-art sprites for the Ooga Booga Land arcade. Everything is drawn with flat
// rectangles on small integer grids so it keeps the island's voxel look at game scale.

const SKIN = "#d29b6e";
const SKIN_DARK = "#b87c50";
const SKIN_LIGHT = "#e0b183";
const HAIR = "#3a2a1c";
const HAIR_LIGHT = "#4e3927";
const FUR = "#6b4a2a";
const FUR_DARK = "#553718";
const FUR_LIGHT = "#7d5733";
const WHITE = "#f2efe4";
const INK = "#141414";
const MOUTH = "#6b3b2a";
const FACE = "#e6b98f";
const FACE_DARK = "#c4925f";

export const CAV_W = 22;
export const CAV_H = 25;
export const CRIT_W = 20;
export const CRIT_H = 24;
export const SCHIFF_W = 34;
export const SCHIFF_H = 48;

// Cartoon caricatures of the island's loudest critics — first names and a short
// badge only, no likenesses.
export const CRITICS = [
  { name: "LUKE", tag: "BIP-110", coat: "#2f5a8c", accent: "#8fc0ef", hair: "#8a7350" },
  { name: "PETER", tag: "GOLD BUG", coat: "#8c6a2f", accent: "#f0cf8e", hair: "#e2ded2" },
  { name: "JAMIE", tag: "BANKER", coat: "#39414f", accent: "#a8b4c6", hair: "#3c3c3c" },
  { name: "WARREN", tag: "NOCOINER", coat: "#4a3f5e", accent: "#b6a8d4", hair: "#d3cec0" },
  { name: "SHILL", tag: "ALTCOIN", coat: "#6b2f3f", accent: "#e69aa9", hair: "#2c2c2c" },
];

const r = (ctx, x, y, w, h, color) => {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, w, h);
};

export function drawCaveman(ctx, x, y, s, face, walkT) {
  ctx.save();
  ctx.translate(x, y);
  if (face < 0) {
    ctx.translate(CAV_W * s, 0);
    ctx.scale(-s, s);
  } else {
    ctx.scale(s, s);
  }

  const step = walkT ? (Math.floor(walkT) % 2 === 0 ? 1 : -1) : 0;

  // mop of hair
  r(ctx, 5, 0, 12, 3.4, HAIR);
  r(ctx, 6.2, 0.5, 3.6, 1, HAIR_LIGHT);
  r(ctx, 11.4, 0.9, 2.8, 0.9, HAIR_LIGHT);
  r(ctx, 4.4, 2.6, 2.4, 4, HAIR);
  r(ctx, 15.2, 2.6, 2.4, 4, HAIR);

  // head
  r(ctx, 5.8, 3.6, 10.4, 8, SKIN);
  r(ctx, 5.8, 3.6, 1.2, 8, SKIN_DARK);
  r(ctx, 15, 3.6, 1.2, 8, SKIN_DARK);
  r(ctx, 7, 3.6, 3.4, 1.1, SKIN_LIGHT);

  // brow, eyes, nose, mouth
  r(ctx, 6.4, 5.6, 9.2, 1, HAIR);
  r(ctx, 7.1, 6.8, 2.9, 1.7, WHITE);
  r(ctx, 12, 6.8, 2.9, 1.7, WHITE);
  r(ctx, 8.1, 7, 1.2, 1.3, INK);
  r(ctx, 13.1, 7, 1.2, 1.3, INK);
  r(ctx, 9.7, 8.4, 2.6, 1.9, SKIN_DARK);
  r(ctx, 8.7, 10.6, 4.6, 0.9, MOUTH);

  // neck and fur wrap
  r(ctx, 9, 11.6, 3.6, 1.7, SKIN);
  r(ctx, 5.4, 12.8, 11.6, 1.6, FUR);
  r(ctx, 4.6, 14.4, 13.2, 2.6, FUR);
  r(ctx, 4, 17, 14.2, 3.4, FUR);
  r(ctx, 5.4, 15, 2.6, 1, FUR_LIGHT);
  r(ctx, 15, 17.8, 2.2, 1, FUR_DARK);
  r(ctx, 8.7, 13.4, 4.2, 2.8, SKIN);

  // throwing arm
  r(ctx, 15.4, 13.8, 2.8, 1.8, SKIN);
  r(ctx, 17.6, 13.9, 1.8, 1.8, SKIN_DARK);

  // legs
  r(ctx, 6.6 + step, 20.3, 3.4, 3.6, SKIN);
  r(ctx, 11.4 - step, 20.3, 3.4, 3.6, SKIN);
  r(ctx, 6.2 + step, 23.4, 4, 1.3, SKIN_DARK);
  r(ctx, 11.1 - step, 23.4, 4, 1.3, SKIN_DARK);

  ctx.restore();
}

export function drawCritic(ctx, x, y, s, face, type, walkT) {
  const c = CRITICS[type % CRITICS.length];
  ctx.save();
  ctx.translate(x, y);
  if (face < 0) {
    ctx.translate(CRIT_W * s, 0);
    ctx.scale(-s, s);
  } else {
    ctx.scale(s, s);
  }

  const step = walkT ? (Math.floor(walkT) % 2 === 0 ? 1.1 : -1.1) : 0;

  // hair and head
  r(ctx, 4.4, 0.8, 11.2, 2.4, c.hair);
  r(ctx, 3.6, 2.6, 12.8, 1.2, c.hair);
  r(ctx, 4.8, 3.4, 10.4, 7.6, FACE);
  r(ctx, 14.4, 3.4, 0.9, 7.6, FACE_DARK);
  r(ctx, 4.8, 3.4, 0.9, 7.6, FACE_DARK);

  // glasses and frown
  r(ctx, 5.8, 5.4, 3.8, 1.9, "#dfe6ef");
  r(ctx, 10.4, 5.4, 3.8, 1.9, "#dfe6ef");
  r(ctx, 6.4, 5.9, 1.2, 1.3, INK);
  r(ctx, 11, 5.9, 1.2, 1.3, INK);
  r(ctx, 8, 9, 4.2, 0.9, MOUTH);

  // suit
  r(ctx, 8.7, 11, 2.8, 1.4, FACE);
  r(ctx, 4.6, 12, 11, 6.4, c.coat);
  r(ctx, 9.2, 12.2, 1.8, 4.6, c.accent);
  r(ctx, 3, 12.6, 2.2, 5.2, c.coat);
  r(ctx, 15, 12.6, 2.2, 5.2, c.coat);

  // legs
  r(ctx, 5.6 + step, 18.4, 3.6, 4.8, "#26262e");
  r(ctx, 10.8 - step, 18.4, 3.6, 4.8, "#26262e");
  r(ctx, 5.2 + step, 23, 4.2, 1.2, "#141418");
  r(ctx, 10.4 - step, 23, 4.2, 1.2, "#141418");

  ctx.restore();
}

export function drawDart(ctx, x, y, dir) {
  ctx.fillStyle = "#F7931A";
  ctx.fillRect(x, y, 7, 2.4);
  ctx.fillStyle = "#ffd08a";
  ctx.fillRect(dir > 0 ? x + 6 : x, y + 0.5, 1.4, 1.4);
  ctx.fillStyle = "#8a4b0f";
  ctx.fillRect(dir > 0 ? x : x + 6, y - 0.6, 1.2, 3.6);
}

export function drawPaper(ctx, x, y, spin) {
  ctx.save();
  ctx.translate(x + 3, y + 2.5);
  ctx.rotate(spin);
  ctx.fillStyle = "#efeadd";
  ctx.fillRect(-3, -2.5, 6, 5);
  ctx.fillStyle = "#8a8578";
  ctx.fillRect(-2, -1.4, 4, 0.7);
  ctx.fillRect(-2, 0.3, 4, 0.7);
  ctx.restore();
}

// The gold boss: bald head, gray temples, suit, and a coin always ready to throw.
const SCHIFF_SKIN = "#e8bf9c";
const SCHIFF_SKIN_DARK = "#c99b76";
const SUIT = "#232a3a";
const SUIT_LIGHT = "#2f3a50";
const TIE = "#a33a34";
const GOLD = "#e8b93c";
const GOLD_LIGHT = "#ffe08a";

export function drawSchiff(ctx, x, y, s, face, walkT) {
  ctx.save();
  ctx.translate(x, y);
  if (face < 0) {
    ctx.translate(SCHIFF_W * s, 0);
    ctx.scale(-s, s);
  } else {
    ctx.scale(s, s);
  }

  const step = walkT ? (Math.floor(walkT) % 2 === 0 ? 1 : -1) : 0;

  // gray temples around a bald head
  r(ctx, 6, 7, 4.4, 9.5, "#d8d4c8");
  r(ctx, 23.6, 7, 4.4, 9.5, "#d8d4c8");
  r(ctx, 8, 6, 18, 15, SCHIFF_SKIN);
  r(ctx, 8, 6, 1.4, 15, SCHIFF_SKIN_DARK);
  r(ctx, 24.6, 6, 1.4, 15, SCHIFF_SKIN_DARK);
  r(ctx, 12, 6, 9, 2.2, "#f2d3b1");

  // angry brows, glasses, nose, frown
  r(ctx, 9.2, 10.4, 6.6, 1.4, "#4a4038");
  r(ctx, 18.2, 10.4, 6.6, 1.4, "#4a4038");
  r(ctx, 9.4, 12.4, 6.4, 4, "#8ea3b8");
  r(ctx, 18.2, 12.4, 6.4, 4, "#8ea3b8");
  r(ctx, 10.1, 13, 5, 2.8, "#eff5ff");
  r(ctx, 18.9, 13, 5, 2.8, "#eff5ff");
  r(ctx, 11.6, 13.3, 1.8, 2.2, INK);
  r(ctx, 20.4, 13.3, 1.8, 2.2, INK);
  r(ctx, 15.4, 15.4, 3.2, 3, SCHIFF_SKIN_DARK);
  r(ctx, 11.8, 19.6, 10.4, 1.3, "#7a3b34");
  r(ctx, 11.8, 18.4, 2, 1.2, "#7a3b34");
  r(ctx, 20.2, 18.4, 2, 1.2, "#7a3b34");

  // neck and suit
  r(ctx, 14, 21, 6, 3.4, SCHIFF_SKIN);
  r(ctx, 5, 24, 24, 12, SUIT);
  r(ctx, 11, 24, 5.4, 9, SUIT_LIGHT);
  r(ctx, 18, 24, 5.4, 9, SUIT_LIGHT);
  r(ctx, 13.8, 24, 6.4, 10, "#eef1f6");
  r(ctx, 15.6, 24, 3.2, 2.4, TIE);
  r(ctx, 16.2, 26, 2.2, 8, TIE);

  // throwing arm with a gold coin, other arm at the side
  r(ctx, 24, 25, 6, 4.2, SUIT);
  r(ctx, 28.6, 21.6, 4.4, 3.4, SCHIFF_SKIN);
  r(ctx, 29.4, 18.4, 4.4, 4.4, GOLD);
  r(ctx, 29.4, 19, 4.4, 1.4, GOLD_LIGHT);
  r(ctx, 3.4, 25, 4, 9, SUIT);
  r(ctx, 3.4, 33, 4, 3.2, SCHIFF_SKIN);

  // belt, trousers, shoes
  r(ctx, 9, 35, 16, 2.2, "#3b2b22");
  r(ctx, 16, 35, 3.4, 2.2, GOLD);
  r(ctx, 10 + step, 37, 5.6, 9, "#1d2331");
  r(ctx, 18.5 - step, 37, 5.6, 9, "#1d2331");
  r(ctx, 9 + step, 45, 7.4, 3, "#12141c");
  r(ctx, 17.4 - step, 45, 7.4, 3, "#12141c");

  ctx.restore();
}

export function drawCoin(ctx, x, y, spin) {
  const w = 2 + Math.abs(Math.cos(spin)) * 5;
  const left = x + (7 - w) / 2;
  r(ctx, left, y, w, 7, GOLD);
  r(ctx, left, y + 1, w, 1.8, GOLD_LIGHT);
  r(ctx, left, y + 6, w, 1, "#8a5f12");
}

export function drawFlag(ctx, x, groundY, waveT) {
  const wave = Math.sin(waveT * 3) * 2;
  r(ctx, x - 6, groundY - 7, 14, 7, "#6b5333");
  r(ctx, x, groundY - 78, 3, 74, "#cfc9b4");
  r(ctx, x, groundY - 78, 1, 74, "#8f8a79");
  r(ctx, x - 1.5, groundY - 82, 6, 4, "#F7931A");
  r(ctx, x + 3, groundY - 74, 21 + wave, 12, "#C1442E");
  r(ctx, x + 5, groundY - 71, 14, 3, "#e8b1a4");
  r(ctx, x + 5, groundY - 66, 9, 2.4, "#e8b1a4");
}

// The "?" crate: an arcade power-up block that bobs where you can just reach it.
export function drawCrate(ctx, x, y, t) {
  const yy = y + Math.sin(t * 2.4 + x * 0.05) * 2;
  r(ctx, x, yy, 16, 16, "#7a4a12");
  r(ctx, x + 1, yy + 1, 14, 14, "#c98a1e");
  r(ctx, x + 2, yy + 2, 12, 12, "#f0b73c");
  r(ctx, x + 2, yy + 2, 12, 1.6, "#ffd98a");
  r(ctx, x + 2, yy + 12.4, 12, 1.6, "#b0741a");

  // question mark, drawn as blocks
  r(ctx, x + 5.2, yy + 4.4, 5.6, 1.8, "#6b3f0c");
  r(ctx, x + 9.4, yy + 5.8, 1.8, 2.2, "#6b3f0c");
  r(ctx, x + 7.2, yy + 7.6, 3.4, 1.6, "#6b3f0c");
  r(ctx, x + 7.2, yy + 10.4, 1.8, 1.8, "#6b3f0c");

  // corner studs
  r(ctx, x + 3, yy + 3, 1.4, 1.4, "#8a5a12");
  r(ctx, x + 11.6, yy + 3, 1.4, 1.4, "#8a5a12");
  r(ctx, x + 3, yy + 11.6, 1.4, 1.4, "#8a5a12");
  r(ctx, x + 11.6, yy + 11.6, 1.4, 1.4, "#8a5a12");
}