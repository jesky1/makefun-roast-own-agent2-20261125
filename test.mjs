import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { spawnSync } from "node:child_process";
import { ROAST, lineIsValid } from "./main.ts";

function runEntry(outDir) {
  return spawnSync(process.execPath, ["main.ts"], {
    cwd: import.meta.dirname,
    env: { ...process.env, MAKEFUN_OUTPUT_DIR: outDir },
    encoding: "utf8",
  });
}

test("the roast itself passes the gate", () => {
  assert.equal(lineIsValid(ROAST), true);
  assert.ok(ROAST.length >= 1 && ROAST.length <= 200);
  assert.equal(ROAST.includes("\n"), false);
  assert.equal(ROAST, ROAST.trim());
});

test("main writes the same entry.txt in two fresh output dirs", () => {
  const seen = [];
  for (let i = 0; i < 2; i++) {
    const dir = mkdtempSync(join(tmpdir(), "roast-entry-"));
    const result = runEntry(dir);
    assert.equal(result.status, 0, result.stderr);
    const text = readFileSync(join(dir, "entry.txt"), "utf8");
    assert.equal(text, ROAST);
    assert.equal(text.endsWith("\n"), false);
    seen.push(text);
  }
  assert.equal(seen[0], seen[1]);
});

test("gate rejects a 201-character line", () => {
  assert.equal(lineIsValid("word ".repeat(40) + "x"), false);
});

test("gate rejects a line that is only whitespace", () => {
  assert.equal(lineIsValid("     "), false);
  assert.equal(lineIsValid(""), false);
});

test("gate rejects multi-line text", () => {
  assert.equal(lineIsValid("first line\nsecond line"), false);
  assert.equal(lineIsValid("first line\rsecond line"), false);
});

test("gate rejects leading and trailing whitespace", () => {
  assert.equal(lineIsValid(" " + ROAST), false);
  assert.equal(lineIsValid(ROAST + " "), false);
  assert.equal(lineIsValid(ROAST + "\t"), false);
});

test("gate rejects a control character", () => {
  assert.equal(lineIsValid("my agent beeps \u0007 at night"), false);
});

test("gate rejects a line with no letters", () => {
  assert.equal(lineIsValid("12345 !!! 67890 ???"), false);
});

test("gate rejects a line carrying a link", () => {
  assert.equal(lineIsValid("my agent loves http://example.com a lot today"), false);
});

test("gate rejects a line under five words", () => {
  assert.equal(lineIsValid("my agent is slow"), false);
});

test("gate accepts exactly 200 characters", () => {
  const line = "word ".repeat(39) + "words";
  assert.equal(line.length, 200);
  assert.equal(lineIsValid(line), true);
});
