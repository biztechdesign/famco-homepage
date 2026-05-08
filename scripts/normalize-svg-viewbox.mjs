// Normalize each SVG's viewBox so the icon's painted area fills the
// same fraction of every frame. Strategy:
//   1. Rasterize the SVG via `sharp` at high resolution.
//   2. Find the bbox of non-transparent pixels.
//   3. Map that bbox back to the SVG's coordinate space.
//   4. Make it square (so `mask: center/contain` doesn't squash on
//      one axis), centre the artwork, add uniform padding, write
//      back the new viewBox to the SVG.
//
// Usage: node scripts/normalize-svg-viewbox.mjs <file1> <file2> ...

import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const RASTER_SIZE = 1024;       // px per side for the trial render
const PADDING_PCT = 0.06;        // 6 % padding around the content

function parseViewBox(svgText) {
  const m = svgText.match(/<svg\b[^>]*\bviewBox\s*=\s*"([^"]+)"/i);
  if (!m) return null;
  const parts = m[1].trim().split(/[\s,]+/).map(Number);
  if (parts.length !== 4 || parts.some((n) => !Number.isFinite(n))) return null;
  return parts; // [minX, minY, w, h]
}

async function findContentBboxPixels(svgPath) {
  // Render the SVG to a square RGBA buffer at RASTER_SIZE × RASTER_SIZE.
  const { data, info } = await sharp(svgPath, { density: 600 })
    .resize(RASTER_SIZE, RASTER_SIZE, {
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;
  let minX = Infinity, minY = Infinity, maxX = -1, maxY = -1;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const a = data[(y * width + x) * channels + 3];
      if (a > 8) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }
  if (maxX < 0) return null;
  return { width, height, minX, minY, maxX, maxY };
}

function computeFitContainOffset(vbW, vbH, w, h) {
  // sharp's `fit:contain` letterboxes — figure out the scale + offset
  // so we can map raster pixels back to the SVG viewBox space.
  const scale = Math.min(w / vbW, h / vbH);
  const scaledW = vbW * scale;
  const scaledH = vbH * scale;
  const offsetX = (w - scaledW) / 2;
  const offsetY = (h - scaledH) / 2;
  return { scale, offsetX, offsetY };
}

async function processFile(file) {
  const src = fs.readFileSync(file, "utf8");
  const vb = parseViewBox(src);
  if (!vb) {
    console.warn("skip (no viewBox):", file);
    return;
  }
  const [vbX, vbY, vbW, vbH] = vb;

  const px = await findContentBboxPixels(file);
  if (!px) {
    console.warn("skip (empty render):", file);
    return;
  }

  const { scale, offsetX, offsetY } = computeFitContainOffset(
    vbW, vbH, px.width, px.height
  );
  // Map pixel bbox back to the SVG coordinate system (translated by vbX/vbY).
  const cMinX = vbX + (px.minX - offsetX) / scale;
  const cMaxX = vbX + (px.maxX - offsetX) / scale;
  const cMinY = vbY + (px.minY - offsetY) / scale;
  const cMaxY = vbY + (px.maxY - offsetY) / scale;

  const cw = cMaxX - cMinX;
  const ch = cMaxY - cMinY;

  // Tight bbox + uniform vertical padding only. Width is left tight
  // so when the icon is rendered with `mask-size: auto 100%`, every
  // icon's *content* height equals the container height exactly.
  const padY = ch * PADDING_PCT;
  const padX = ch * PADDING_PCT; // pad both axes by the same amount

  const newVB = [
    cMinX - padX,
    cMinY - padY,
    cw + padX * 2,
    ch + padY * 2,
  ].map((n) => +n.toFixed(3)).join(" ");

  // Rewrite the opening <svg ...> tag
  const open = src.match(/<svg\b[^>]*>/i)[0];
  let newOpen = open.replace(/\bviewBox\s*=\s*"[^"]*"/i, `viewBox="${newVB}"`);
  // Drop intrinsic width/height so the icon scales freely with `contain`.
  newOpen = newOpen.replace(/\s+width\s*=\s*"[^"]*"/i, "");
  newOpen = newOpen.replace(/\s+height\s*=\s*"[^"]*"/i, "");
  // Clear any enable-background attribute that locks the old box.
  newOpen = newOpen.replace(/\s+enable-background\s*=\s*"[^"]*"/i, "");

  const out = src.replace(open, newOpen);
  fs.writeFileSync(file, out);
  console.log(
    `${path.basename(file)}: ${vb.join(" ")} → ${newVB}`
  );
}

const files = process.argv.slice(2);
if (files.length === 0) {
  console.error("Usage: node normalize-svg-viewbox.mjs <file1> ...");
  process.exit(1);
}
for (const f of files) {
  try { await processFile(f); }
  catch (err) { console.error("error:", f, err.message); }
}
