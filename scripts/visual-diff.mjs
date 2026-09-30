#!/usr/bin/env node
/**
 * Visual diff: compares a region of the running site against a Figma export.
 *
 * Usage:
 *   node scripts/visual-diff.mjs --ref figma.png [--url http://localhost:3000] \
 *        [--clip x,y,width,height] [--out ./.visual-diff] [--name hero]
 *
 * - The page is rendered at a 1440px-wide viewport (the Figma frame width).
 * - `--clip` is in page CSS pixels (same coordinates as the Figma frame). Defaults to the
 *   full reference size.
 * - The device scale factor is derived from the reference image, so a 2x Figma export is
 *   compared at 2x.
 * - Animations are frozen (reduced motion + CSS override) so screenshots are deterministic.
 *
 * Outputs <name>.site.png, <name>.diff.png and <name>.overlay.png, and prints the mismatch %.
 */
import fs from "node:fs";
import path from "node:path";
import { parseArgs } from "node:util";
import { chromium } from "playwright";
import pixelmatch from "pixelmatch";
import { PNG } from "pngjs";

const { values } = parseArgs({
  options: {
    url: { type: "string", default: "http://localhost:3000" },
    ref: { type: "string" },
    clip: { type: "string" },
    out: { type: "string", default: ".visual-diff" },
    name: { type: "string", default: "diff" },
    width: { type: "string", default: "1440" },
    threshold: { type: "string", default: "0.1" },
    wait: { type: "string", default: "3000" },
  },
});

if (!values.ref) {
  console.error("Missing --ref <figma-export.png>");
  process.exit(1);
}

const ref = PNG.sync.read(fs.readFileSync(values.ref));
const viewportWidth = Number(values.width);
const [x, y, w, h] = values.clip ? values.clip.split(",").map(Number) : [0, 0, viewportWidth, null];
const scale = ref.width / w;
const clip = { x, y, width: w, height: h ?? ref.height / scale };

fs.mkdirSync(values.out, { recursive: true });
const file = (suffix) => path.join(values.out, `${values.name}.${suffix}.png`);

const browser = await chromium.launch();
const context = await browser.newContext({
  viewport: { width: viewportWidth, height: 1024 },
  deviceScaleFactor: scale,
  reducedMotion: "reduce",
});
const page = await context.newPage();
await page.goto(values.url, { waitUntil: "load" });
await page.addStyleTag({
  content: "*,*::before,*::after{animation:none!important;transition:none!important}",
});
await page.evaluate(() => document.fonts.ready);
// Scroll through the page so every scroll-triggered reveal runs, then let them settle.
await page.evaluate(async () => {
  for (let y = 0; y < document.body.scrollHeight; y += 300) {
    window.scrollTo(0, y);
    await new Promise((r) => setTimeout(r, 150));
  }
  window.scrollTo(0, 0);
});
await page.waitForTimeout(Number(values.wait));
await page.screenshot({ path: file("site"), clip, fullPage: true });
await browser.close();

const site = PNG.sync.read(fs.readFileSync(file("site")));
const width = Math.min(site.width, ref.width);
const height = Math.min(site.height, ref.height);
const crop = (img) => {
  const out = new PNG({ width, height });
  PNG.bitblt(img, out, 0, 0, width, height, 0, 0);
  return out;
};
const a = crop(site);
const b = crop(ref);

const diff = new PNG({ width, height });
const mismatched = pixelmatch(a.data, b.data, diff.data, width, height, {
  threshold: Number(values.threshold),
});
fs.writeFileSync(file("diff"), PNG.sync.write(diff));

// 50/50 overlay — misalignments show up as "ghosted" edges
const overlay = new PNG({ width, height });
for (let i = 0; i < a.data.length; i++) overlay.data[i] = (a.data[i] + b.data[i]) >> 1;
fs.writeFileSync(file("overlay"), PNG.sync.write(overlay));

const pct = ((mismatched / (width * height)) * 100).toFixed(2);
if (site.width !== ref.width || site.height !== ref.height) {
  console.warn(
    `Size mismatch: site ${site.width}x${site.height} vs ref ${ref.width}x${ref.height}`,
  );
}
console.log(`${values.name}: ${mismatched} px differ (${pct}%) → ${values.out}/`);
