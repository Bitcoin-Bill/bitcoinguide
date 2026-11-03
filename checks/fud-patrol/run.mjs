// Zero-dependency check runner for the FUD Patrol core.
//
//   node checks/fud-patrol/run.mjs [--out checks/fud-patrol/OUTPUT.txt]
//
// The core is plain ESM, but this repo's package.json is CommonJS, so the runner
// copies core/ into a throwaway directory that declares {"type":"module"} and
// imports it from there. Nothing is installed and nothing is written to the repo
// unless --out is passed.

import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));

// Works in the app repo (core lives under src/) and in the delivered package
// (core is next to these checks as game/).
const coreSource = [
  path.resolve(here, "../../src/components/ooga/arcade/core"),
  path.resolve(here, "../../game"),
  path.resolve(here, "../game"),
  path.resolve(here, "game"),
].find((candidate) => fs.existsSync(path.join(candidate, "game.js")));

if (!coreSource) {
  throw new Error(`No FUD Patrol core found near ${here}`);
}

const stage = fs.mkdtempSync(path.join(os.tmpdir(), "fud-core-"));
const coreDir = path.join(stage, "core");
fs.cpSync(coreSource, coreDir, { recursive: true });
fs.writeFileSync(path.join(stage, "package.json"), '{"type":"module"}\n');

const core = await import(pathToFileURL(path.join(coreDir, "index.js")).href);

const lines = [];
const results = [];

const log = (line) => {
  lines.push(line);
  console.log(line);
};

function test(name, fn) {
  try {
    fn();
    results.push({ name, ok: true });
    log(`PASS  ${name}`);
  } catch (error) {
    results.push({ name, ok: false, error });
    log(`FAIL  ${name}\n      ${error && error.message ? error.message : error}`);
  }
}

export function assert(condition, message) {
  if (!condition) throw new Error(message);
}

export function assertEqual(actual, expected, message) {
  if (!Object.is(actual, expected)) {
    throw new Error(`${message} — expected ${expected}, got ${actual}`);
  }
}

export function assertClose(actual, expected, tolerance, message) {
  if (Math.abs(actual - expected) > tolerance) {
    throw new Error(`${message} — expected ${expected} ±${tolerance}, got ${actual}`);
  }
}

const helpers = { test, assert, assertEqual, assertClose, core };

const suites = [
  "gameplay",
  "lifecycle",
  "frames",
  "render",
  "audio",
  "regressions",
  "input",
  "storage",
];

log("FUD Patrol — core checks");
log(`core: ${path.relative(path.resolve(here, "../.."), coreSource)}`);
log("");

for (const name of suites) {
  log(`== ${name} ==`);
  const module = await import(pathToFileURL(path.join(here, "suites", `${name}.mjs`)).href);
  await module.default(helpers);
  log("");
}

const passed = results.filter((r) => r.ok).length;
const failed = results.length - passed;
log(`${results.length} checks · ${passed} passed · ${failed} failed`);

const outIndex = process.argv.indexOf("--out");
if (outIndex !== -1 && process.argv[outIndex + 1]) {
  const target = path.resolve(process.cwd(), process.argv[outIndex + 1]);
  fs.writeFileSync(target, `${lines.join("\n")}\n`);
}

fs.rmSync(stage, { recursive: true, force: true });

if (failed > 0) process.exitCode = 1;