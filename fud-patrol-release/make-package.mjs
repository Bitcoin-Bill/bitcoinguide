// Build the delivery ZIP for the FUD Patrol second repair pass.
//
//   node fud-patrol-release/make-package.mjs
//
// Stages a clean tree in /tmp, runs the checks from inside that tree, records their
// verbatim output, diffs every file against the previous package, writes CHECKSUMS,
// then zips with Node's zlib (no `zip` binary, no dependencies).
//
// Baseline for the diff: the previous package unpacked at /tmp/fp/baseline
// (override with FUD_BASELINE=/path). If it is absent the diff says so instead of
// inventing one.

import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import zlib from "node:zlib";
import crypto from "node:crypto";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const repo = path.resolve(here, "..");
const arcade = path.join(repo, "src/components/ooga/arcade");
const baseline = process.env.FUD_BASELINE || "/tmp/fp/baseline";

const stage = fs.mkdtempSync(path.join(os.tmpdir(), "fud-package-"));
const out = path.join(stage, "fud-patrol-repair");
fs.mkdirSync(out, { recursive: true });

const copyFile = (from, to) => {
  fs.mkdirSync(path.dirname(to), { recursive: true });
  fs.copyFileSync(from, to);
};

// 1. the cartridge
fs.cpSync(path.join(arcade, "core"), path.join(out, "game"), { recursive: true });

// 2. the React host (reference only)
const hostFiles = ["OogaArcadeGame.jsx", "OogaArcadeWindow.jsx", "GameOverlay.jsx", "OogaTouchControls.jsx"];
for (const name of hostFiles) {
  copyFile(path.join(arcade, name), path.join(out, "bitcoin-guide-host", name));
}
copyFile(
  path.join(repo, "src/components/ooga/OogaArcadeEntry.jsx"),
  path.join(out, "bitcoin-guide-host", "OogaArcadeEntry.jsx"),
);

// 3. checks
fs.cpSync(path.join(repo, "checks/fud-patrol"), path.join(out, "checks/fud-patrol"), {
  recursive: true,
});

// 4. docs
fs.mkdirSync(path.join(out, "docs"), { recursive: true });
copyFile(path.join(arcade, "CAST.md"), path.join(out, "docs", "CAST.md"));
copyFile(path.join(here, "LIMITATIONS.md"), path.join(out, "docs", "LIMITATIONS.md"));
copyFile(path.join(here, "BROWSER-PROBES.md"), path.join(out, "docs", "BROWSER-PROBES.md"));
copyFile(path.join(here, "START-HERE.md"), path.join(out, "START-HERE.md"));
copyFile(path.join(here, "README.md"), path.join(out, "README.md"));

// 5. run the checks from inside the staged tree, so the recorded output is the
//    package proving itself — not a run from the app repo.
let checkOutput = "";
let checkStatus = 0;
try {
  checkOutput = execFileSync("node", ["checks/fud-patrol/run.mjs"], {
    cwd: out,
    encoding: "utf8",
    maxBuffer: 32 * 1024 * 1024,
  });
} catch (error) {
  checkStatus = error.status || 1;
  checkOutput = `${error.stdout || ""}${error.stderr || ""}`;
}
fs.writeFileSync(path.join(out, "CHECK-OUTPUT.txt"), checkOutput);
fs.writeFileSync(path.join(out, "checks", "fud-patrol", "OUTPUT.txt"), checkOutput);
if (checkStatus !== 0) {
  console.error("checks FAILED inside the staged tree — package not built");
  console.error(checkOutput.split("\n").slice(-12).join("\n"));
  process.exit(1);
}

// 6. focused diff: previous package → this package, one section per file
function walk(dir, base = dir, acc = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, base, acc);
    else acc.push(path.relative(base, full).split(path.sep).join("/"));
  }
  return acc;
}

const files = walk(out).sort();
const diffParts = [
  "FUD PATROL — focused diff: previous package → this package",
  `Baseline: ${baseline}`,
  "Generated with `git diff --no-index`; paths rewritten to a/ (previous) and b/ (this package).",
  "Only files that differ are shown. New files appear as a full addition.",
  "",
];

const changed = [];
for (const rel of files) {
  if (rel === "CHECK-OUTPUT.txt") continue;
  const oldPath = path.join(baseline, rel);
  const newPath = path.join(out, rel);
  if (!fs.existsSync(oldPath)) {
    changed.push(rel);
    diffParts.push(
      "================================================================",
      `=== NEW  ${rel}`,
      "================================================================",
      `(not present in the previous package — ${fs.statSync(newPath).size} bytes)`,
      "",
    );
    continue;
  }
  if (fs.readFileSync(oldPath).equals(fs.readFileSync(newPath))) continue;
  changed.push(rel);
  let text = "";
  try {
    text = execFileSync(
      "git",
      ["diff", "--no-index", "--no-color", "--unified=3", oldPath, newPath],
      { encoding: "utf8", maxBuffer: 64 * 1024 * 1024 },
    );
  } catch (error) {
    text = error.stdout || "";
  }
  text = text.split(oldPath).join(`a/${rel}`).split(newPath).join(`b/${rel}`);
  diffParts.push(
    "================================================================",
    `=== ${rel}`,
    "================================================================",
    text.trimEnd(),
    "",
  );
}

if (!fs.existsSync(baseline)) {
  diffParts.push(
    `!! baseline tree not found at ${baseline}`,
    "!! set FUD_BASELINE to the unpacked previous package to generate a real diff",
    "",
  );
}

fs.writeFileSync(path.join(out, "DIFF.txt"), `${diffParts.join("\n")}\n`);

// 7. checksums
const allFiles = walk(out).sort();
const lines = allFiles.map((rel) => {
  const hash = crypto.createHash("sha256").update(fs.readFileSync(path.join(out, rel))).digest("hex");
  return `${hash}  ${rel}`;
});
fs.writeFileSync(path.join(out, "CHECKSUMS.txt"), `${lines.join("\n")}\n`);

// 8. zip
const zipEntries = [...allFiles, "CHECKSUMS.txt"].sort();
const crcTable = Array.from({ length: 256 }, (_, value) => {
  let c = value;
  for (let i = 0; i < 8; i += 1) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  return c >>> 0;
});
const crc32 = (buffer) => {
  let crc = 0xffffffff;
  for (const byte of buffer) crc = crcTable[(crc ^ byte) & 255] ^ (crc >>> 8);
  return (crc ^ 0xffffffff) >>> 0;
};

const chunks = [];
const central = [];
let offset = 0;
for (const rel of zipEntries) {
  const data = fs.readFileSync(path.join(out, rel));
  const name = Buffer.from(`fud-patrol-repair/${rel}`, "utf8");
  const packed = zlib.deflateRawSync(data, { level: 9 });
  const crc = crc32(data);

  const header = Buffer.alloc(30);
  header.writeUInt32LE(0x04034b50, 0);
  header.writeUInt16LE(20, 4);
  header.writeUInt16LE(8, 8);
  header.writeUInt16LE(0, 10);
  header.writeUInt16LE(33, 12);
  header.writeUInt32LE(crc, 14);
  header.writeUInt32LE(packed.length, 18);
  header.writeUInt32LE(data.length, 22);
  header.writeUInt16LE(name.length, 26);
  header.writeUInt16LE(0, 28);
  chunks.push(header, name, packed);

  const record = Buffer.alloc(46);
  record.writeUInt32LE(0x02014b50, 0);
  record.writeUInt16LE(20, 4);
  record.writeUInt16LE(20, 6);
  record.writeUInt16LE(8, 10);
  record.writeUInt16LE(0, 12);
  record.writeUInt16LE(33, 14);
  record.writeUInt32LE(crc, 16);
  record.writeUInt32LE(packed.length, 20);
  record.writeUInt32LE(data.length, 24);
  record.writeUInt16LE(name.length, 28);
  record.writeUInt16LE(0, 30);
  record.writeUInt16LE(0, 32);
  record.writeUInt16LE(0, 34);
  record.writeUInt16LE(0, 36);
  record.writeUInt32LE(0, 38);
  record.writeUInt32LE(offset, 42);
  central.push(record, name);

  offset += header.length + name.length + packed.length;
}

const centralData = Buffer.concat(central);
const end = Buffer.alloc(22);
end.writeUInt32LE(0x06054b50, 0);
end.writeUInt16LE(zipEntries.length, 8);
end.writeUInt16LE(zipEntries.length, 10);
end.writeUInt32LE(centralData.length, 12);
end.writeUInt32LE(offset, 16);
end.writeUInt16LE(0, 20);

const archive = Buffer.concat([...chunks, centralData, end]);
const zipPath = path.join(stage, "fud-patrol-repair.zip");
fs.writeFileSync(zipPath, archive);
fs.writeFileSync(
  path.join(stage, "fud-patrol-repair.zip.sha256"),
  `${crypto.createHash("sha256").update(archive).digest("hex")}  fud-patrol-repair.zip\n`,
);

console.log(`zip:      ${zipPath}`);
console.log(`files:    ${zipEntries.length}`);
console.log(`bytes:    ${archive.length}`);
console.log(`sha256:   ${crypto.createHash("sha256").update(archive).digest("hex")}`);
console.log(`changed:  ${changed.length} file(s) differ from the previous package`);
console.log(`stage:    ${out}`);