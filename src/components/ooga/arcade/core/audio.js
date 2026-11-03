// Per-instance 8-bit audio for FUD Patrol.
//
// Every game gets its own engine: its own gain node, its own voice bank and its
// own music timer. Nothing is shared module state, so closing one game cannot
// silence another. The host may pass its own AudioContext and output node (shared
// mute/volume lives there); otherwise the engine owns a context and closes it on
// dispose. Nothing plays until `unlock()` is called from a user gesture.
//
// Voice bank, not one node per note
// ---------------------------------
// A Web Audio oscillator can only be started once, so the old code created an
// oscillator + gain pair for every single note. That is fine at 60 fps but it made
// the scheduler burst: when the audio clock jumped (tab thaw, device sleep, a
// stalled main thread) the "schedule everything up to now" loop asked for every
// missed note at once — 462 oscillators in one callback after a 60-second gap.
//
// This engine instead builds a fixed bank of oscillators at unlock, starts each
// one once, and re-uses them by re-arming a gain envelope. Noise comes from one
// pre-rendered buffer played by a fixed bank of looping buffer sources. After
// unlock, scheduling a note allocates no Web Audio nodes at all.
//
// Bounded catch-up
// ----------------
// The music scheduler only ever looks LOOKAHEAD seconds ahead, schedules at most
// MAX_NOTES_PER_CALL notes per callback, and if the clock has jumped more than
// MAX_LAG it resyncs the beat instead of replaying the gap. Missed notes are
// skipped, never queued.

const STEP = 0.13;
const LOOKAHEAD = 0.25;
const MAX_LAG = 0.5;
const MAX_NOTES_PER_CALL = 6;
const VOICE_COUNT = 12;
const NOISE_COUNT = 4;
const NOISE_SECONDS = 0.5;

const MELODY = [659, 0, 0, 784, 880, 0, 784, 0, 659, 0, 587, 0, 523, 0, 587, 0];
const BASS = [110, 0, 110, 0, 98, 0, 98, 0, 87.31, 0, 87.31, 0, 82.41, 0, 82.41, 0];

const SILENT = 0.0001;

// Static cue descriptors. Hoisted so a cue never builds an options object.
const CUE = {
  jump: { to: 700, dur: 0.13, vol: 0.2 },
  shoot: { to: 360, dur: 0.07, vol: 0.16 },
  hitA: { to: 140, dur: 0.07, vol: 0.2 },
  hitNoise: { dur: 0.05, vol: 0.09, freq: 900 },
  downA: { to: 300, dur: 0.09, vol: 0.18, type: "triangle" },
  downB: { to: 120, dur: 0.16, vol: 0.18, type: "triangle", delay: 0.08 },
  hurt: { to: 70, dur: 0.32, vol: 0.26, type: "sawtooth" },
  coinA: { dur: 0.06, vol: 0.14 },
  coinB: { dur: 0.1, vol: 0.12, delay: 0.06 },
  bossA: { to: 92, dur: 0.5, vol: 0.22, type: "triangle" },
  bossB: { to: 138, dur: 0.5, vol: 0.1, delay: 0.05 },
  bossThrow: { to: 300, dur: 0.1, vol: 0.13, type: "triangle" },
  bossHitA: { to: 90, dur: 0.12, vol: 0.26 },
  bossHitNoise: { dur: 0.06, vol: 0.1, freq: 520 },
  crateA: { dur: 0.05, vol: 0.16 },
  crateB: { dur: 0.09, vol: 0.14, delay: 0.05 },
};

const ARP = {
  bossDown: { list: [440, 330, 220, 110], dur: 0.2, gap: 0.13, vol: 0.22 },
  stageClear: { list: [523, 659, 784, 1046], dur: 0.16, gap: 0.12, vol: 0.2 },
  stageStart: { list: [392, 523], dur: 0.1, gap: 0.1, vol: 0.16 },
  gameOver: { list: [392, 330, 262, 196], dur: 0.26, gap: 0.18, type: "triangle", vol: 0.2 },
  victory: { list: [523, 659, 784, 1046, 784, 1046], dur: 0.2, gap: 0.13, vol: 0.2 },
  powerup: { list: [523, 784, 1046], dur: 0.1, gap: 0.07, vol: 0.17 },
  powerDown: { list: [392, 262], dur: 0.12, gap: 0.09, type: "triangle", vol: 0.14 },
};

export function createAudio(options = {}) {
  const ownsContext = !options.context;
  const output = options.output || null;

  let ctx = options.context || null;
  let master = null;
  let voices = null;
  let noises = null;
  let noiseBuffer = null;
  let muted = options.muted === true;
  let disposed = false;
  let musicOn = false;
  let musicStep = 0;
  let musicNext = 0;
  let musicTimer = null;
  let notes = 0;
  let skipped = 0;

  // Round-robin cursors, one per bank, so voices are handed out evenly.
  const cursors = { voice: 0, noise: 0 };

  function getContext() {
    if (disposed) return null;
    if (!ctx) {
      const AC = globalThis.AudioContext || globalThis.webkitAudioContext;
      if (!AC) return null;
      try {
        ctx = new AC();
      } catch {
        return null;
      }
    }
    return ctx;
  }

  function resetParam(param, at, value) {
    if (typeof param.cancelScheduledValues === "function") param.cancelScheduledValues(at);
    param.setValueAtTime(value, at);
  }

  // One decaying noise table, rendered once and looped by every noise voice.
  function buildNoiseBuffer(c) {
    const len = Math.max(1, Math.floor(c.sampleRate * NOISE_SECONDS));
    const buffer = c.createBuffer(1, len, c.sampleRate);
    const data = buffer.getChannelData(0);
    // Cosmetic noise: its own Math.random use never touches gameplay state.
    for (let i = 0; i < len; i += 1) data[i] = (Math.random() * 2 - 1) * (1 - i / len);
    return buffer;
  }

  function buildBanks() {
    if (voices || !ctx || !master) return;
    const c = ctx;
    const built = [];
    for (let i = 0; i < VOICE_COUNT; i += 1) {
      const osc = c.createOscillator();
      const gain = c.createGain();
      osc.type = "square";
      osc.connect(gain);
      gain.connect(master);
      resetParam(gain.gain, 0, SILENT);
      osc.start(0);
      built.push({ osc, gain, freeAt: 0 });
    }
    voices = built;

    noiseBuffer = buildNoiseBuffer(c);
    const hisses = [];
    for (let i = 0; i < NOISE_COUNT; i += 1) {
      const src = c.createBufferSource();
      src.buffer = noiseBuffer;
      src.loop = true;
      const filter = c.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.value = 900;
      const gain = c.createGain();
      resetParam(gain.gain, 0, SILENT);
      src.connect(filter);
      filter.connect(gain);
      gain.connect(master);
      src.start(0);
      hisses.push({ src, filter, gain, freeAt: 0 });
    }
    noises = hisses;
  }

  function ensureMaster() {
    const c = getContext();
    if (!c) return null;
    if (!master) {
      try {
        master = c.createGain();
        master.gain.value = muted ? 0 : 0.22;
        master.connect(output || c.destination);
      } catch {
        master = null;
        return null;
      }
    }
    buildBanks();
    return master;
  }

  // Hand out a voice. Prefer one that has finished ringing; if the whole bank is
  // still busy, steal the voice that frees soonest. Bounded scan, no allocation.
  function claim(pool, key, at) {
    const n = pool.length;
    const start = cursors[key];
    for (let i = 0; i < n; i += 1) {
      const index = (start + i) % n;
      const voice = pool[index];
      if (voice.freeAt <= at) {
        cursors[key] = (index + 1) % n;
        return voice;
      }
    }
    let best = pool[0];
    for (let i = 1; i < n; i += 1) if (pool[i].freeAt < best.freeAt) best = pool[i];
    cursors[key] = (start + 1) % n;
    return best;
  }

  function tone(freq, at, dur, type, vol, to) {
    if (!ctx || !master || !voices) return;
    const voice = claim(voices, "voice", at);
    voice.osc.type = type;
    resetParam(voice.osc.frequency, at, freq);
    if (to) voice.osc.frequency.exponentialRampToValueAtTime(Math.max(24, to), at + dur);
    const gain = voice.gain.gain;
    if (typeof gain.cancelScheduledValues === "function") gain.cancelScheduledValues(at);
    gain.setValueAtTime(SILENT, at);
    gain.exponentialRampToValueAtTime(vol, at + 0.01);
    gain.exponentialRampToValueAtTime(SILENT, at + dur);
    voice.freeAt = at + dur;
    notes += 1;
  }

  function blip(freq, cue) {
    if (disposed || muted || !ctx || !master) return;
    tone(freq, ctx.currentTime + (cue.delay || 0), cue.dur, cue.type || "square", cue.vol, cue.to);
  }

  function hiss(cue) {
    if (disposed || muted || !ctx || !master || !noises) return;
    const at = ctx.currentTime + (cue.delay || 0);
    const dur = cue.dur || 0.06;
    const voice = claim(noises, "noise", at);
    voice.filter.frequency.value = cue.freq || 900;
    const gain = voice.gain.gain;
    if (typeof gain.cancelScheduledValues === "function") gain.cancelScheduledValues(at);
    gain.setValueAtTime(SILENT, at);
    gain.exponentialRampToValueAtTime(cue.vol || 0.12, at + 0.005);
    gain.exponentialRampToValueAtTime(SILENT, at + dur);
    voice.freeAt = at + dur;
    notes += 1;
  }

  // Arpeggios schedule straight into the bank: no per-note options object.
  function arpeggio(spec) {
    if (disposed || muted || !ctx || !master) return;
    const list = spec.list;
    const base = ctx.currentTime;
    for (let i = 0; i < list.length; i += 1) {
      tone(list[i], base + i * spec.gap, spec.dur, spec.type || "square", spec.vol, spec.to);
    }
  }

  const SOUNDS = {
    jump: () => blip(320, CUE.jump),
    shoot: () => blip(1000, CUE.shoot),
    hit: () => {
      blip(240, CUE.hitA);
      hiss(CUE.hitNoise);
    },
    down: () => {
      blip(560, CUE.downA);
      blip(300, CUE.downB);
    },
    hurt: () => blip(300, CUE.hurt),
    coin: () => {
      blip(988, CUE.coinA);
      blip(1319, CUE.coinB);
    },
    bossAppear: () => {
      blip(116, CUE.bossA);
      blip(174, CUE.bossB);
    },
    bossThrow: () => blip(760, CUE.bossThrow),
    bossHit: () => {
      blip(180, CUE.bossHitA);
      hiss(CUE.bossHitNoise);
    },
    bossDown: () => arpeggio(ARP.bossDown),
    stageClear: () => arpeggio(ARP.stageClear),
    stageStart: () => arpeggio(ARP.stageStart),
    gameOver: () => arpeggio(ARP.gameOver),
    victory: () => arpeggio(ARP.victory),
    crate: () => {
      blip(740, CUE.crateA);
      blip(988, CUE.crateB);
    },
    powerup: () => arpeggio(ARP.powerup),
    powerDown: () => arpeggio(ARP.powerDown),
  };

  function schedule() {
    if (!ctx || !musicOn) return;
    const now = ctx.currentTime;
    const horizon = now + LOOKAHEAD;

    // The clock jumped (thawed tab, slept device, stalled thread). Replay nothing:
    // advance the beat to "now" and drop the missed notes.
    if (musicNext < now - MAX_LAG) {
      const missed = Math.ceil((now - musicNext) / STEP);
      musicNext += missed * STEP;
      musicStep += missed;
      skipped += missed;
    }

    let budget = MAX_NOTES_PER_CALL;
    while (musicNext < horizon && budget > 0) {
      const i = musicStep % 16;
      if (!muted) {
        if (MELODY[i]) tone(MELODY[i], musicNext, 0.12, "square", 0.05);
        if (BASS[i]) tone(BASS[i], musicNext, 0.11, "triangle", 0.11);
      }
      musicNext += STEP;
      musicStep += 1;
      budget -= 1;
    }

    // Never leave a note queued in the past for the next callback to re-schedule.
    if (musicNext < now) musicNext = now;
  }

  function stopMusic() {
    musicOn = false;
    if (musicTimer !== null) {
      clearInterval(musicTimer);
      musicTimer = null;
    }
  }

  function unlock() {
    if (disposed) return false;
    const c = getContext();
    if (!c) return false;
    ensureMaster();
    if (c.state === "suspended" && typeof c.resume === "function") {
      try {
        const resumed = c.resume();
        if (resumed && typeof resumed.catch === "function") resumed.catch(() => {});
      } catch {
        /* autoplay policy: stays silent until the next gesture */
      }
    }
    return true;
  }

  function play(name) {
    if (disposed || !ctx || !master) return;
    const sound = SOUNDS[name];
    if (sound) sound();
  }

  function startMusic() {
    if (disposed || !ctx || !master || musicOn) return;
    musicOn = true;
    musicStep = 0;
    musicNext = ctx.currentTime + 0.08;
    musicTimer = setInterval(schedule, 40);
  }

  function setMuted(value) {
    muted = !!value;
    if (master) master.gain.value = muted ? 0 : 0.22;
  }

  // How many banked voices are still ringing right now.
  function activeSources() {
    if (!ctx) return 0;
    const now = ctx.currentTime;
    let n = 0;
    if (voices) for (let i = 0; i < voices.length; i += 1) if (voices[i].freeAt > now) n += 1;
    if (noises) for (let i = 0; i < noises.length; i += 1) if (noises[i].freeAt > now) n += 1;
    return n;
  }

  function silenceBank(pool) {
    if (!pool) return;
    for (let i = 0; i < pool.length; i += 1) {
      const voice = pool[i];
      voice.freeAt = 0;
      try {
        voice.osc ? voice.osc.stop() : voice.src.stop();
      } catch {
        /* already stopped */
      }
      try {
        (voice.osc || voice.src).disconnect();
      } catch {
        /* already gone */
      }
      try {
        if (voice.filter) voice.filter.disconnect();
        voice.gain.disconnect();
      } catch {
        /* already gone */
      }
    }
  }

  function dispose() {
    if (disposed) return;
    stopMusic();
    silenceBank(voices);
    silenceBank(noises);
    voices = null;
    noises = null;
    noiseBuffer = null;
    if (master) {
      try {
        master.disconnect();
      } catch {
        /* already gone */
      }
      master = null;
    }
    if (ownsContext && ctx && typeof ctx.close === "function") {
      try {
        const closing = ctx.close();
        if (closing && typeof closing.catch === "function") closing.catch(() => {});
      } catch {
        /* already closed */
      }
    }
    ctx = null;
    disposed = true;
  }

  return {
    unlock,
    play,
    startMusic,
    stopMusic,
    setMuted,
    dispose,
    // Diagnostics for tests and hosts: ringing voices, notes armed since unlock,
    // notes dropped by a clock jump, and whether a music timer is armed.
    stats: () => ({
      sources: activeSources(),
      notes,
      skipped,
      bank: voices ? voices.length + (noises ? noises.length : 0) : 0,
      musicTimer: musicTimer !== null,
      context: ctx ? "open" : "none",
      muted,
      disposed,
    }),
  };
}