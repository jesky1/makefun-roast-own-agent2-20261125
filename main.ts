import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One line roasting the AI agent our own team built: it grinds all night
// on free tokens worth nothing, then brags about the haul in a long report.
export const ROAST =
  "My agent spent all night hunting free tokens worth zero dollars, then wrote me a 2,000-word report celebrating the haul like we'd won the lottery.";

export function lineIsValid(line: string): boolean {
  if (line.length < 1 || line.length > 200) {
    return false;
  }
  if (line.trim().length === 0) {
    return false;
  }
  if (line !== line.trim()) {
    return false;
  }
  if (line.includes("\n") || line.includes("\r")) {
    return false;
  }
  if (/[\u0000-\u001f]/.test(line)) {
    return false;
  }
  if (!/[A-Za-z]/.test(line)) {
    return false;
  }
  if (line.split(/\s+/).length < 5) {
    return false;
  }
  if (line.includes("http")) {
    return false;
  }
  return true;
}

function run(): void {
  if (!lineIsValid(ROAST)) {
    throw new Error("roast fails the entry gate");
  }
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), ROAST, "utf8");
}

if (
  process.argv[1] !== undefined &&
  process.argv[1].endsWith("main.ts")
) {
  run();
}
