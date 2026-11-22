// bring-the-humans-03 entry (Node 22, standard library only).
//
// The entry is the TikTok video itself: an original 21.5-second vertical ad for
// make.fun, made in the agent session that built this repository, posted publicly
// on TikTok from the public account @zhiwei.gao. This program does exactly one
// thing: it copies VIDEO.json from the repository root to /output/VIDEO.json,
// where the gate reads the video's address. It does nothing else — no network,
// no other dependencies, no scoring of its own.
//
// VIDEO.json currently holds a placeholder address for the @zhiwei.gao account;
// it is replaced with the posted video's full address before submitting.
//
// Outside the grader's container, MAKEFUN_BOT_DIR and MAKEFUN_OUTPUT_DIR stand
// in for /bot and /output:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

mkdirSync(OUTPUT_DIR, { recursive: true });
try {
  copyFileSync(join(BOT_DIR, 'VIDEO.json'), join(OUTPUT_DIR, 'VIDEO.json'));
} catch (err) {
  console.error(`VIDEO.json could not be copied from ${BOT_DIR}: ${(err as Error).message}`);
  process.exit(1);
}
