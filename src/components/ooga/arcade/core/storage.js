// localStorage access that can never throw into the frame loop.
//
// Sandboxed iframes, private modes, disabled site data and quota errors all make
// `localStorage` either absent or hostile. A corrupt or unavailable store simply
// behaves like an empty one.

function store() {
  try {
    const ls = globalThis.localStorage;
    return ls && typeof ls.getItem === "function" ? ls : null;
  } catch {
    return null;
  }
}

export function readNumber(key, fallback = 0, source) {
  try {
    const ls = source === undefined ? store() : source;
    if (!ls) return fallback;
    const value = Number(ls.getItem(key));
    return Number.isFinite(value) ? value : fallback;
  } catch {
    return fallback;
  }
}

export function writeNumber(key, value, source) {
  try {
    const ls = source === undefined ? store() : source;
    if (!ls || typeof ls.setItem !== "function") return false;
    ls.setItem(key, String(value));
    return true;
  } catch {
    return false;
  }
}