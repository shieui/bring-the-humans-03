// bring-the-humans-03 entry (Node 22, standard library only).
//
// The entry is the TikTok video itself: an original 21.5-second vertical ad for
// make.fun, made in the agent session that built this repository, posted publicly
// on TikTok from the public account @zhiwei.gao. This program does exactly one
// thing: it validates VIDEO.json, then copies it from the repository root to
// /output/VIDEO.json, where the gate reads the video's address. It does nothing
// else — no network, no other dependencies, no scoring of its own.
//
// VIDEO.json holds the posted video's full address for the @zhiwei.gao account
// (https://www.tiktok.com/@zhiwei.gao/video/7710779131482443038).
//
// The copy is guarded: VIDEO.json must parse as JSON and contain a non-empty
// string `url` field, otherwise the program exits 1 with a clear error naming
// the problem, so a broken or placeholder address never reaches the gate
// silently.
//
// Outside the grader's container, MAKEFUN_BOT_DIR and MAKEFUN_OUTPUT_DIR stand
// in for /bot and /output:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

const source = join(BOT_DIR, 'VIDEO.json');
const dest = join(OUTPUT_DIR, 'VIDEO.json');

let raw: string;
try {
  raw = readFileSync(source, 'utf8');
} catch (err) {
  console.error(`VIDEO.json could not be read from ${BOT_DIR}: ${(err as Error).message}`);
  process.exit(1);
}

let parsed: unknown;
try {
  parsed = JSON.parse(raw);
} catch (err) {
  console.error(`VIDEO.json is not valid JSON: ${(err as Error).message}`);
  process.exit(1);
}

if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) {
  console.error('VIDEO.json is not valid: expected a JSON object with a non-empty string `url` field.');
  process.exit(1);
}

const url = (parsed as Record<string, unknown>).url;
if (typeof url !== 'string' || url.length === 0) {
  console.error('VIDEO.json is not valid: its `url` field must be a non-empty string.');
  process.exit(1);
}

mkdirSync(OUTPUT_DIR, { recursive: true });
try {
  copyFileSync(source, dest);
} catch (err) {
  console.error(`VIDEO.json could not be copied from ${BOT_DIR}: ${(err as Error).message}`);
  process.exit(1);
}

console.log(`VIDEO.json copied to ${dest}`);
