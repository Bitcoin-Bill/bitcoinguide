// Public surface of the dependency-free FUD Patrol core.
//
// Hosts import from here. Nothing in this folder imports React, JSX, lucide,
// Tailwind or any npm package.

export {
  H,
  W,
  FIXED_STEP,
  MAX_SUBSTEPS,
  LIMITS,
  STAGE_COUNT,
  GROUND,
  ACTIONS,
  PLAYER_W,
  PLAYER_H,
  BOSS_W,
  BOSS_H,
  CRITIC_W,
  CRITIC_H,
  createGame,
} from "./game.js";

export { draw } from "./render.js";
export { createAudio } from "./audio.js";
export { createSession } from "./session.js";
export { createRng, createStreams } from "./rng.js";
export { Pool } from "./pools.js";
export { STAGE_DEFS, planStage } from "./stages.js";
export { readNumber, writeNumber } from "./storage.js";
export {
  attachKeyboard,
  attachPauseOnHide,
  actionForKey,
  toggleForKey,
  isTypingTarget,
  KEY_ACTIONS,
  KEY_TOGGLES,
} from "./input.js";