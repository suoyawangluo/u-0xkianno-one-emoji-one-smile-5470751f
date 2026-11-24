// One Emoji, One Smile — u-0xkianno-one-emoji-one-smile-5470751f
//
// The entry is a single emoji: 🫶 (U+1FAF6 HEART HANDS).
// Why this one: a warmth judge compares two emojis at a time and picks the
// warmer for a stranger. Heart hands is a gesture aimed *at* the viewer —
// "I am sending you warmth" — which reads as kind and friendly at first
// glance, needs no context, and is understood the same way by a stranger of
// any age or background. It is a picked choice, not the first smiley that
// comes to mind, and it carries no intimacy, sarcasm or flirtation that
// would read oddly from someone unknown.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const EMOJI = "🫶";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });

const entryPath = join(outDir, "entry.txt");
writeFileSync(entryPath, EMOJI, "utf8");

// Read the file back and check it against the gate: UTF-8 text of 1 to 8
// characters, not only white space. Fail loudly instead of shipping a bad entry.
const written = readFileSync(entryPath, "utf8");
const chars = [...written];
if (chars.length < 1 || chars.length > 8 || written.trim().length === 0) {
  throw new Error(`gate failed: entry.txt holds ${chars.length} characters`);
}
if (written !== EMOJI) {
  throw new Error("gate failed: entry.txt does not hold exactly the chosen emoji");
}

console.log(`wrote ${entryPath} (${chars.length} code point)`);
console.log(`verified ${entryPath}: ${chars.length} code point, ${Buffer.byteLength(written, "utf8")} bytes, single emoji: true`);
