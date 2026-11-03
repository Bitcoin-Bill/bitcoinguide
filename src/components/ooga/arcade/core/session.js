// Host-side game instance lifecycle.
//
// A React effect can set up more than once for a single mount (Strict Mode), and a
// cleanup always runs before the next setup. The old shell created the game during
// render and kept it in a ref, so the cleanup disposed it and the second setup was
// left driving a dead instance — the cabinet came up frozen.
//
// A session hands out a live instance and builds a fresh one whenever the retained
// instance has been disposed. It holds no timers and no DOM references of its own.

export function createSession(factory) {
  let current = null;

  const isDead = (instance) =>
    !!instance && typeof instance.isDisposed === "function" && instance.isDisposed();

  return {
    get() {
      if (!current || isDead(current)) current = factory();
      return current;
    },
    peek() {
      return current;
    },
    dispose() {
      if (!current) return;
      const instance = current;
      current = null;
      if (!isDead(instance)) instance.dispose();
    },
  };
}