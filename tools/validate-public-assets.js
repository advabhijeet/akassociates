"use strict";

const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const CACHE_KEY = "site-20260714-pa1";
const MAX_THUMBNAIL_BYTES = 450 * 1024;
const errors = [];
const warnings = [];

function fullPath(relPath) {
  return path.join(ROOT, ...relPath.split("/"));
}

function read(relPath) {
  return fs.readFileSync(fullPath(relPath), "utf8");
}

function collectPublicHtml() {
  const output = [];

  for (const entry of fs.readdirSync(ROOT, { withFileTypes: true })) {
    if (
      entry.isFile() &&
      entry.name.endsWith(".html") &&
      entry.name !== "google3164979181871a1d.html" &&
      entry.name !== "theme-preview-citadel-of-ak.html"
    ) {
      output.push(entry.name);
    }
  }

  for (const dir of ["practice", "services", "updates"]) {
    const target = fullPath(dir);
    if (!fs.existsSync(target)) continue;
    for (const entry of fs.readdirSync(target, { withFileTypes: true })) {
      if (entry.isFile() && entry.name.endsWith(".html")) {
        output.push(`${dir}/${entry.name}`);
      }
    }
  }

  return output.sort();
}

function jpegDimensions(buffer) {
  if (buffer.length < 4 || buffer[0] !== 0xff || buffer[1] !== 0xd8) {
    return null;
  }

  let offset = 2;
  const sofMarkers = new Set([
    0xc0, 0xc1, 0xc2, 0xc3,
    0xc5, 0xc6, 0xc7,
    0xc9, 0xca, 0xcb,
    0xcd, 0xce, 0xcf
  ]);

  while (offset + 4 < buffer.length) {
    if (buffer[offset] !== 0xff) {
      offset += 1;
      continue;
    }

    while (offset < buffer.length && buffer[offset] === 0xff) offset += 1;
    if (offset >= buffer.length) return null;

    const marker = buffer[offset];
    offset += 1;

    if (marker === 0xd8 || marker === 0xd9) continue;
    if (offset + 2 > buffer.length) return null;

    const length = buffer.readUInt16BE(offset);
    if (length < 2 || offset + length > buffer.length) return null;

    if (sofMarkers.has(marker)) {
      if (length < 7) return null;
      const height = buffer.readUInt16BE(offset + 3);
      const width = buffer.readUInt16BE(offset + 5);
      return { width, height };
    }

    offset += length;
  }

  return null;
}

const registry = JSON.parse(read("assets/data/insights-registry.json"));
if (!Array.isArray(registry)) {
  errors.push("Insights registry is not an array.");
}

const thumbnails = new Set();
let totalBytes = 0;

for (const item of Array.isArray(registry) ? registry : []) {
  const thumbnail = String(item.thumbnail || "").replace(/\\/g, "/");
  if (!thumbnail) {
    errors.push(`Registry item missing thumbnail: ${item.href || item.title}`);
    continue;
  }

  if (/\.png$/i.test(thumbnail)) {
    errors.push(`Active registry thumbnail must use optimized JPEG/WebP, not PNG: ${thumbnail}`);
  }

  if (!/\.(?:jpe?g|webp)$/i.test(thumbnail)) {
    errors.push(`Unsupported active thumbnail format: ${thumbnail}`);
  }

  const target = fullPath(thumbnail);
  if (!fs.existsSync(target)) {
    errors.push(`Active registry thumbnail is missing: ${thumbnail}`);
    continue;
  }

  thumbnails.add(thumbnail);
}

for (const thumbnail of thumbnails) {
  const target = fullPath(thumbnail);
  const stat = fs.statSync(target);
  totalBytes += stat.size;

  if (stat.size > MAX_THUMBNAIL_BYTES) {
    errors.push(
      `Active thumbnail exceeds 450 KiB: ${thumbnail} (${stat.size} bytes)`
    );
  }

  if (/\.jpe?g$/i.test(thumbnail)) {
    const dimensions = jpegDimensions(fs.readFileSync(target));
    if (!dimensions) {
      errors.push(`Could not read JPEG dimensions: ${thumbnail}`);
    } else if (dimensions.width !== 1200 || dimensions.height !== 675) {
      errors.push(
        `Active thumbnail must be 1200 x 675: ${thumbnail} is ${dimensions.width} x ${dimensions.height}`
      );
    }
  }
}

const htmlFiles = collectPublicHtml();

for (const relPath of htmlFiles) {
  const html = read(relPath);

  const pngArticleThumbs = html.match(
    /assets\/img\/citadel\/citadel-thumb-[^"'\s)>]+\.png/gi
  ) || [];

  for (const thumbnail of pngArticleThumbs) {
    errors.push(`${relPath}: legacy PNG article thumbnail remains: ${thumbnail}`);
  }

  const cssMatches = [
    ...html.matchAll(/assets\/css\/style\.css\?v=([A-Za-z0-9._-]+)/g)
  ];

  for (const match of cssMatches) {
    if (match[1] !== CACHE_KEY) {
      errors.push(`${relPath}: stale stylesheet cache key: ${match[1]}`);
    }
  }

  const scriptMatches = [
    ...html.matchAll(/assets\/js\/script\.js\?v=([A-Za-z0-9._-]+)/g)
  ];

  for (const match of scriptMatches) {
    if (match[1] !== CACHE_KEY) {
      errors.push(`${relPath}: stale script cache key: ${match[1]}`);
    }
  }
}

for (const required of [
  "assets/js/script.js",
  "assets/js/config/chambers-public-config.js",
  "assets/js/runtime/core-runtime.js",
  "assets/js/runtime/insights-runtime.js",
  "assets/js/runtime/module-loader.js",
  "assets/js/themes/citadel-of-kang/modules/shell/global-shell.js",
  "assets/css/themes/citadel-of-kang/modules/thumbnail-frames.css",
  "tools/sync-static-insight-cards.js"
]) {
  if (!fs.existsSync(fullPath(required))) {
    errors.push(`Required performance file is missing: ${required}`);
  }
}

const productionScript = read("assets/js/script.js");
const insightsRuntime = read("assets/js/runtime/insights-runtime.js");

if (insightsRuntime.includes("Homepage registry-driven latest insights renderer")) {
  errors.push("Duplicate legacy Homepage renderer is still present.");
}

if (!insightsRuntime.includes("img.insight-card-image")) {
  errors.push("Native card-image hydration is missing from the Insights runtime.");
}

for (const bootstrapPath of [
  "assets/js/config/chambers-public-config.js",
  "assets/js/runtime/core-runtime.js",
  "assets/js/runtime/insights-runtime.js",
  "assets/js/runtime/module-loader.js"
]) {
  if (!productionScript.includes(bootstrapPath)) {
    errors.push(`Public bootstrap is missing runtime dependency: ${bootstrapPath}`);
  }
}

const globalShell = read("assets/js/themes/citadel-of-kang/modules/shell/global-shell.js");
if (!globalShell.includes("window.setInterval(updateLiveClocks, 60000);")) {
  errors.push("Global clock must update at minute-level frequency.");
}

if (globalShell.includes("second: '2-digit'")) {
  errors.push("Global clock still formats seconds.");
}

const staticSync = read("tools/sync-static-insight-cards.js");
if (!staticSync.includes('class="insight-card-image"')) {
  errors.push("Static Insights renderer does not emit native card images.");
}

for (const forbidden of [
  "assets/img/favicon.png",
  ...[
  "assets/img/citadel/citadel-thumb-rera-promoter-reply-v1.png",
  "assets/img/citadel/citadel-thumb-rera-promoter-reply-v2.png",
  "assets/img/citadel/citadel-thumb-pmla-bnss-cognizance.png",
  "assets/img/citadel/citadel-thumb-uapa-bail-2026.png",
  "assets/img/citadel/citadel-thumb-uapa-bail-2026-bw.png",
  "assets/img/citadel/citadel-thumb-property-title-search-2026.png",
  "assets/img/citadel/citadel-thumb-property-title-search-editorial-2026.png",
  "assets/img/citadel/citadel-thumb-sabarimala-2026.png",
  "assets/img/citadel/citadel-thumb-sabarimala-2026-editorial.png",
  "assets/img/citadel/citadel-thumb-sabarimala-2026.svg",
  "assets/img/citadel/citadel-thumb-uapa-bail-2026.svg",
  "assets/img/citadel/citadel-thumb-pmla-bnss-cognizance.svg",
  "assets/img/citadel/citadel-thumb-section34-limitation.svg",
  "assets/img/citadel/citadel-thumb-sarfaesi-auction-sale-editorial-v3.png",
  "assets/img/citadel/citadel-thumb-summary-judgment-commercial-suits-editorial-bw-v3.png",
  "assets/img/citadel/citadel-thumb-non-reportable-judgments-editorial-bw-v3.png",
  "assets/img/citadel/citadel-thumb-arbitration-notice-before-claim-editorial-bw.png",
  "assets/img/citadel/citadel-thumb-arbitration-notice-before-claim-bw.png",
  "assets/img/brand-favicon-current.png",
  "assets/img/favicon.svg",
  "assets/img/citadel/citadel-legal-documents.webp"
]
]) {
  if (fs.existsSync(fullPath(forbidden))) {
    warnings.push(`Known bloat candidate remains for manual review: ${forbidden}`);
  }
}

console.log("Public asset validation summary:");
console.log(`- Public HTML files checked: ${htmlFiles.length}`);
console.log(`- Registry items checked: ${Array.isArray(registry) ? registry.length : 0}`);
console.log(`- Unique active thumbnails: ${thumbnails.size}`);
console.log(`- Active thumbnail bytes: ${totalBytes}`);
console.log(`- Warnings: ${warnings.length}`);
console.log(`- Errors: ${errors.length}`);

if (warnings.length) {
  console.log("\nWarnings:");
  for (const warning of warnings) console.log(`- ${warning}`);
}

if (errors.length) {
  console.log("\nErrors:");
  for (const error of errors) console.log(`- ${error}`);
  process.exit(1);
}

console.log("\nPublic asset validation passed.");
