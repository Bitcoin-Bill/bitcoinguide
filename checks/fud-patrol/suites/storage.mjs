// localStorage that is missing, throwing or full of junk must never break the
// frame loop.

export default function storage({ test, assert, assertEqual, core }) {
  test("A missing store reads as empty and writes as a no-op", () => {
    assertEqual(core.readNumber("high", 0, null), 0, "missing store returns the fallback");
    assertEqual(core.writeNumber("high", 5, null), false, "missing store reports failure");
  });

  test("A throwing store cannot escape", () => {
    const hostile = {
      getItem() {
        throw new Error("SecurityError");
      },
      setItem() {
        throw new Error("QuotaExceededError");
      },
    };
    assertEqual(core.readNumber("high", 42, hostile), 42, "read falls back");
    assertEqual(core.writeNumber("high", 42, hostile), false, "write reports failure");
  });

  test("Corrupt values fall back instead of producing NaN", () => {
    const junk = {
      value: "not-a-number",
      getItem() {
        return this.value;
      },
      setItem() {},
    };
    assertEqual(core.readNumber("high", 7, junk), 7, "garbage text");

    junk.value = "";
    assertEqual(core.readNumber("high", 7, junk), 0, "empty string is zero, as before");

    junk.value = null;
    assertEqual(core.readNumber("high", 7, junk), 0, "null is zero, as before");

    junk.value = "Infinity";
    assertEqual(core.readNumber("high", 7, junk), 7, "Infinity is rejected");
  });

  test("A working store round-trips numbers", () => {
    const data = new Map();
    const store = {
      getItem: (k) => (data.has(k) ? data.get(k) : null),
      setItem: (k, v) => data.set(k, String(v)),
    };
    assertEqual(core.writeNumber("ooga-fud-patrol-high", 1234, store), true, "write succeeds");
    assertEqual(core.readNumber("ooga-fud-patrol-high", 0, store), 1234, "read succeeds");
  });

  test("A high-score save failure does not interrupt play", () => {
    const game = core.createGame({ seed: 8 });
    game.start({ seed: 8 });
    const s = game.state;

    const hostile = {
      getItem() {
        throw new Error("blocked");
      },
      setItem() {
        throw new Error("blocked");
      },
    };

    const best = Math.max(core.readNumber("high", 0, hostile), s.score);
    const saved = core.writeNumber("high", best, hostile);

    assertEqual(saved, false, "save reported as failed");
    assertEqual(game.step(), true, "the game keeps running");
  });
}