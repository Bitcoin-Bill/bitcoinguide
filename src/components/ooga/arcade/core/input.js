// Keyboard and page-lifecycle helpers shared by every host.
//
// The game only listens to its own keys while the host says it is active.
// Auto-repeat still blocks browser defaults, but never adds another input edge.
// Focus or visibility loss releases held input through the host.

export const KEY_ACTIONS = {
  arrowleft: "left",
  a: "left",
  arrowright: "right",
  d: "right",
  arrowup: "jump",
  w: "jump",
  " ": "jump",
  z: "shoot",
  x: "shoot",
  j: "shoot",
};

export const KEY_TOGGLES = {
  p: "pause",
  m: "mute",
  enter: "confirm",
};

const normalize = (key) => (key === " " ? " " : String(key).toLowerCase());

export const actionForKey = (key) => KEY_ACTIONS[normalize(key)] || null;
export const toggleForKey = (key) => KEY_TOGGLES[normalize(key)] || null;

export function isTypingTarget(el) {
  if (!el) return false;
  const tag = el.tagName;
  return tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || el.isContentEditable === true;
}

export function attachKeyboard({
  target,
  isActive = () => true,
  onInput,
  onAction,
} = {}) {
  const el = target || globalThis.window;
  if (!el || typeof el.addEventListener !== "function") return () => {};

  const handleDown = (event) => {
    if (isTypingTarget(event.target)) return;
    const toggle = toggleForKey(event.key);
    const action = actionForKey(event.key);
    if ((!toggle && !action) || !isActive()) return;

    // A held Space generates repeated keydowns, each with its own scroll default.
    // Cancel every one BEFORE suppressing repeated game actions.
    event.preventDefault();
    if (event.repeat) return;
    if (toggle) {
      if (onAction) onAction(toggle);
    } else if (onInput) onInput(action, true);
  };

  const handleUp = (event) => {
    const action = actionForKey(event.key);
    if (!action) return;
    if (isActive() && !isTypingTarget(event.target)) event.preventDefault();
    if (onInput) onInput(action, false);
  };

  el.addEventListener("keydown", handleDown, { capture: true, passive: false });
  el.addEventListener("keyup", handleUp, { capture: true, passive: false });

  return () => {
    el.removeEventListener("keydown", handleDown, true);
    el.removeEventListener("keyup", handleUp, true);
  };
}

// Pause when the tab or window goes away, and release every held action.
export function attachPauseOnHide({ win, doc, onHide } = {}) {
  const w = win || globalThis.window;
  const d = doc || globalThis.document;
  const hide = () => {
    if (onHide) onHide();
  };
  const onVisibility = () => {
    if (d && d.visibilityState === "hidden") hide();
  };
  if (w && typeof w.addEventListener === "function") w.addEventListener("blur", hide);
  if (d && typeof d.addEventListener === "function") {
    d.addEventListener("visibilitychange", onVisibility);
  }
  return () => {
    if (w && typeof w.removeEventListener === "function") w.removeEventListener("blur", hide);
    if (d && typeof d.removeEventListener === "function") {
      d.removeEventListener("visibilitychange", onVisibility);
    }
  };
}