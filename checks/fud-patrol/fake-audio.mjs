// Minimal Web Audio double: enough surface for the game's oscillator/buffer
// graph, plus counters that prove what was started, stopped and closed.

export function createFakeContext() {
  const counters = {
    oscillators: 0,
    buffers: 0,
    started: 0,
    stopped: 0,
    connects: 0,
    disconnects: 0,
    closed: false,
  };

  const ctx = {
    currentTime: 0,
    sampleRate: 8000,
    state: "running",
    destination: { id: "destination" },
    createGain() {
      return {
        gain: {
          value: 1,
          setValueAtTime() {},
          exponentialRampToValueAtTime() {},
          cancelScheduledValues() {},
        },
        connect() {
          counters.connects += 1;
          return this;
        },
        disconnect() {
          counters.disconnects += 1;
        },
      };
    },
    createOscillator() {
      counters.oscillators += 1;
      return {
        type: "sine",
        frequency: { setValueAtTime() {}, exponentialRampToValueAtTime() {} },
        onended: null,
        connect() {
          counters.connects += 1;
        },
        disconnect() {
          counters.disconnects += 1;
        },
        start() {
          counters.started += 1;
        },
        stop() {
          counters.stopped += 1;
        },
      };
    },
    createBuffer(channels, length) {
      counters.buffers += 1;
      return { getChannelData: () => new Float32Array(length) };
    },
    createBufferSource() {
      return {
        buffer: null,
        onended: null,
        connect() {
          counters.connects += 1;
        },
        disconnect() {
          counters.disconnects += 1;
        },
        start() {
          counters.started += 1;
        },
        stop() {
          counters.stopped += 1;
        },
      };
    },
    createBiquadFilter() {
      return {
        type: "lowpass",
        frequency: { value: 0 },
        connect() {
          counters.connects += 1;
        },
        disconnect() {
          counters.disconnects += 1;
        },
      };
    },
    resume() {
      return Promise.resolve();
    },
    close() {
      counters.closed = true;
      return Promise.resolve();
    },
  };

  return { ctx, counters };
}