// Keyboard map, shared actions between keyboard and touch, simultaneous touch
// sources, repeat suppression and release-on-cancel.

function makeTarget() {
  const listeners = new Map();
  return {
    addEventListener(type, fn) {
      if (!listeners.has(type)) listeners.set(type, []);
      listeners.get(type).push(fn);
    },
    removeEventListener(type, fn) {
      const list = listeners.get(type) || [];
      listeners.set(
        type,
        list.filter((item) => item !== fn),
      );
    },
    dispatch(type, event) {
      for (const fn of listeners.get(type) || []) fn(event);
    },
    count(type) {
      return (listeners.get(type) || []).length;
    },
  };
}

function keyEvent(key, extra = {}) {
  return {
    key,
    repeat: false,
    target: { tagName: "BODY" },
    prevented: false,
    preventDefault() {
      this.prevented = true;
    },
    ...extra,
  };
}

export default function input({ test, assert, assertEqual, core }) {
  test("The documented keys are implemented — J fires, M mutes, P pauses", () => {
    assertEqual(core.actionForKey("j"), "shoot", "J fires");
    assertEqual(core.actionForKey("J"), "shoot", "shift-J fires");
    assertEqual(core.actionForKey("z"), "shoot", "Z fires");
    assertEqual(core.actionForKey("x"), "shoot", "X fires");
    assertEqual(core.toggleForKey("m"), "mute", "M mutes");
    assertEqual(core.toggleForKey("M"), "mute", "shift-M mutes");
    assertEqual(core.toggleForKey("p"), "pause", "P pauses");
    assertEqual(core.toggleForKey("Enter"), "confirm", "Enter confirms");
    assertEqual(core.actionForKey("ArrowLeft"), "left", "arrow left moves");
    assertEqual(core.actionForKey(" "), "jump", "space jumps");
    assertEqual(core.actionForKey("q"), null, "unmapped keys are ignored");
  });

  test("Keyboard and touch share one action set", () => {
    const game = core.createGame({ seed: 1 });
    game.setInput("jump", true, "keyboard");
    assertEqual(game.state.input.jump, true, "keyboard jump reaches the game");
    game.setInput("jump", false, "keyboard");
    game.setInput("jump", true, "touch:7");
    assertEqual(game.state.input.jump, true, "touch jump reaches the same action");
  });

  test("Two thumbs on two buttons both hold", () => {
    const game = core.createGame({ seed: 1 });
    const s = game.state;
    game.setInput("right", true, "touch:1");
    game.setInput("jump", true, "touch:2");
    assert(s.input.right && s.input.jump, "both held at once");

    game.setInput("right", false, "touch:1");
    assertEqual(s.input.right, false, "one finger released");
    assertEqual(s.input.jump, true, "the other finger is unaffected");

    game.setInput("jump", false, "touch:2");
    assertEqual(s.input.jump, false, "all released");
  });

  test("Losing a pointer releases everything it held", () => {
    const game = core.createGame({ seed: 1 });
    game.setInput("left", true, "touch:4");
    game.setInput("shoot", true, "touch:4");
    game.releaseSource("touch:4");
    const s = game.state;
    assert(!s.input.left && !s.input.shoot, "cancelled pointer leaves no stuck input");
  });

  test("clearInput drops every source and the jump edge", () => {
    const game = core.createGame({ seed: 1 });
    game.setInput("left", true, "keyboard");
    game.setInput("jump", true, "touch:1");
    game.clearInput();
    const s = game.state;
    assert(!s.input.left && !s.input.jump, "nothing held");
    assertEqual(s.player.jumpHeld, false, "jump edge reset");
  });

  test("Keyboard events map through to the host, and auto-repeat is ignored", () => {
    const target = makeTarget();
    const inputs = [];
    const actions = [];

    const detach = core.attachKeyboard({
      target,
      isActive: () => true,
      onInput: (action, down) => inputs.push([action, down]),
      onAction: (action) => actions.push(action),
    });

    const down = keyEvent("j");
    target.dispatch("keydown", down);
    assertEqual(inputs.length, 1, "J produced an input event");
    assertEqual(inputs[0][0], "shoot", "as a shot");
    assertEqual(down.prevented, true, "the browser default was suppressed");

    target.dispatch("keydown", keyEvent("j", { repeat: true }));
    assertEqual(inputs.length, 1, "a repeated keydown adds nothing");

    target.dispatch("keydown", keyEvent("m"));
    assertEqual(actions.length, 1, "M produced one toggle");
    assertEqual(actions[0], "mute", "mute toggle");

    target.dispatch("keydown", keyEvent("m", { repeat: true }));
    assertEqual(actions.length, 1, "a repeated toggle is ignored");

    target.dispatch("keyup", keyEvent("j"));
    assertEqual(inputs.length, 2, "keyup released the action");
    assertEqual(inputs[1][1], false, "released");

    detach();
    assertEqual(target.count("keydown"), 0, "listener removed");
    assertEqual(target.count("keyup"), 0, "listener removed");
  });

  test("Holding Space cancels every scroll default without repeating jump edges", () => {
    const target = makeTarget();
    const inputs = [];
    const detach = core.attachKeyboard({
      target,
      onInput: (action, down) => inputs.push([action, down]),
    });
    const down = keyEvent(" ");
    target.dispatch("keydown", down);
    assertEqual(down.prevented, true, "initial Space default cancelled");
    for (let i = 0; i < 60; i += 1) {
      const repeat = keyEvent(" ", { repeat: true });
      target.dispatch("keydown", repeat);
      assertEqual(repeat.prevented, true, "every held-Space scroll default cancelled");
    }
    assertEqual(inputs.length, 1, "holding Space produces just one jump edge");
    const up = keyEvent(" ");
    target.dispatch("keyup", up);
    assertEqual(up.prevented, true, "Space release default cancelled");
    assertEqual(inputs.length, 2, "Space release reaches the game");
    assertEqual(inputs[1][1], false, "jump released");
    detach();
  });

  test("Repeated scrolling keys remain available outside the active game", () => {
    const target = makeTarget();
    const detach = core.attachKeyboard({ target, isActive: () => false });
    for (const key of [" ", "ArrowUp", "ArrowLeft", "ArrowRight"]) {
      const event = keyEvent(key, { repeat: true });
      target.dispatch("keydown", event);
      assertEqual(event.prevented, false, "inactive game leaves the page controls alone");
    }
    detach();
  });

  test("Keys are not captured while the host says the game is inactive", () => {
    const target = makeTarget();
    const inputs = [];
    const actions = [];
    core.attachKeyboard({
      target,
      isActive: () => false,
      onInput: (action, down) => inputs.push([action, down]),
      onAction: (action) => actions.push(action),
    });

    target.dispatch("keydown", keyEvent("ArrowRight"));
    target.dispatch("keydown", keyEvent("p"));
    assertEqual(inputs.length, 0, "movement ignored while inactive");
    assertEqual(actions.length, 0, "toggles ignored while inactive");
  });

  test("Typing in a text field never moves the player", () => {
    const target = makeTarget();
    const inputs = [];
    core.attachKeyboard({
      target,
      onInput: (action, down) => inputs.push([action, down]),
    });
    target.dispatch("keydown", keyEvent("a", { target: { tagName: "INPUT" } }));
    target.dispatch("keydown", keyEvent(" ", { target: { tagName: "TEXTAREA" } }));
    assertEqual(inputs.length, 0, "no input while typing");
  });

  test("Blur or a hidden page asks the host to pause", () => {
    const win = makeTarget();
    const doc = makeTarget();
    doc.visibilityState = "visible";
    let hides = 0;

    const detach = core.attachPauseOnHide({
      win,
      doc,
      onHide: () => {
        hides += 1;
      },
    });

    win.dispatch("blur", {});
    assertEqual(hides, 1, "window blur pauses");

    doc.visibilityState = "hidden";
    doc.dispatch("visibilitychange", {});
    assertEqual(hides, 2, "hidden page pauses");

    doc.visibilityState = "visible";
    doc.dispatch("visibilitychange", {});
    assertEqual(hides, 2, "becoming visible does not pause");

    detach();
    win.dispatch("blur", {});
    assertEqual(hides, 2, "detached listener is gone");
  });
}