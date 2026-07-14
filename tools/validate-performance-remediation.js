"use strict";

const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const CACHE_KEY = "site-20260714-pa1";
const errors = [];
const warnings = [];

function fullPath(relPath) {
  return path.join(ROOT, ...relPath.split("/"));
}

function exists(relPath) {
  return fs.existsSync(fullPath(relPath));
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
  if (buffer.length < 4 || buffer[0] !== 0xff || buffer[1] !== 0xd8) return null;

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
      return {
        height: buffer.readUInt16BE(offset + 3),
        width: buffer.readUInt16BE(offset + 5)
      };
    }

    offset += length;
  }

  return null;
}

function validateJpeg(relPath, width, height, maxBytes) {
  if (!exists(relPath)) {
    errors.push(`Optimized JPEG is missing: ${relPath}`);
    return;
  }

  const target = fullPath(relPath);
  const stat = fs.statSync(target);
  const dimensions = jpegDimensions(fs.readFileSync(target));

  if (!dimensions) {
    errors.push(`Could not read optimized JPEG dimensions: ${relPath}`);
    return;
  }

  if (dimensions.width !== width || dimensions.height !== height) {
    errors.push(
      `${relPath}: expected ${width} x ${height}, found ${dimensions.width} x ${dimensions.height}`
    );
  }

  if (stat.size > maxBytes) {
    errors.push(`${relPath}: ${stat.size} bytes exceeds ${maxBytes} bytes.`);
  }

  if (stat.size < 1024) {
    errors.push(`${relPath}: generated file is unexpectedly small (${stat.size} bytes).`);
  }
}

for (const [relPath, width, height, maxBytes] of [
  ["assets/img/performance/primary-logo-720.jpg", 720, 380, 150 * 1024],
  ["assets/img/performance/primary-logo-dark-720.jpg", 720, 380, 150 * 1024],
  ["assets/img/performance/logo-navbar-480.jpg", 480, 89, 70 * 1024],
  ["assets/img/performance/logo-navbar-dark-480.jpg", 480, 89, 70 * 1024]
]) {
  validateJpeg(relPath, width, height, maxBytes);
}

const registryPath = "assets/data/insights-registry.json";
const imageManifestPath = "assets/data/performance-image-manifest.json";
const registry = JSON.parse(read(registryPath));
const imageManifest = JSON.parse(read(imageManifestPath));
const manifestOutputs = new Set(
  (imageManifest.entries || []).map((entry) => String(entry.output || "").replace(/\\/g, "/"))
);

let cardDerivativeCount = 0;
let cardDerivativeBytes = 0;

for (const item of registry) {
  const thumbnail = String(item.thumbnail || "").replace(/\\/g, "/");
  const cardThumbnail = String(item.cardThumbnail || "").replace(/\\/g, "/");

  if (/\.jpe?g$/i.test(thumbnail)) {
    if (!cardThumbnail) {
      errors.push(`JPEG registry item lacks cardThumbnail: ${item.href}`);
      continue;
    }

    if (!/^assets\/img\/citadel\/cards\/.+-640\.jpg$/i.test(cardThumbnail)) {
      errors.push(`Unexpected card-thumbnail path: ${cardThumbnail}`);
    }

    if (!manifestOutputs.has(cardThumbnail)) {
      errors.push(`Card thumbnail is absent from the performance manifest: ${cardThumbnail}`);
    }

    validateJpeg(cardThumbnail, 640, 360, 110 * 1024);

    if (exists(cardThumbnail)) {
      cardDerivativeCount += 1;
      cardDerivativeBytes += fs.statSync(fullPath(cardThumbnail)).size;
    }
  } else if (cardThumbnail) {
    warnings.push(`Non-JPEG registry item unexpectedly has cardThumbnail: ${item.href}`);
  }
}

const homepage = read("index.html");
const style = read("assets/css/style.css");
const publicConfig = read("assets/js/config/chambers-public-config.js");
const bootstrap = read("assets/js/script.js");
const insightsRuntime = read("assets/js/runtime/insights-runtime.js");
const staticSync = read("tools/sync-static-insight-cards.js");
const workflow = read(".github/workflows/validation.yml");
const moduleManifest = JSON.parse(read("assets/data/citadel-module-manifest.json"));

for (const marker of [
  'src="assets/img/performance/primary-logo-720.jpg?v=pa1"',
  'width="720"',
  'height="380"',
  'fetchpriority="high"',
  'rel="preload" href="assets/img/performance/primary-logo-720.jpg?v=pa1"'
]) {
  if (!homepage.includes(marker)) {
    errors.push(`Homepage performance marker is missing: ${marker}`);
  }
}

const homepageCardImages = [
  ...homepage.matchAll(/<img\b[^>]*class="insight-card-image"[^>]*>/g)
].map((match) => match[0]);

if (homepageCardImages.length < 3) {
  errors.push(`Homepage should contain three static Insight card images, found ${homepageCardImages.length}.`);
}

for (const tag of homepageCardImages.slice(0, 3)) {
  if (!/assets\/img\/citadel\/cards\/.+-640\.jpg/.test(tag)) {
    errors.push(`Homepage card does not use a 640-pixel derivative: ${tag}`);
  }
  if (!/\bwidth="640"/.test(tag) || !/\bheight="360"/.test(tag)) {
    errors.push(`Homepage card lacks explicit 640 x 360 dimensions: ${tag}`);
  }
}

if (!style.includes("PERFORMANCE_ACCESSIBILITY_REMEDIATION_V1")) {
  errors.push("Performance/accessibility CSS marker is missing.");
}

for (const marker of [
  "--accessible-gold-text",
  "color: #000000;",
  "min-height: 44px;",
  "--citadel-marble-bg: linear-gradient"
]) {
  if (!style.includes(marker)) {
    errors.push(`Performance/accessibility CSS rule is missing: ${marker}`);
  }
}

for (const marker of [
  "item?.cardThumbnail",
  "image.width = 640",
  "image.height = 360",
  "Chambers Citadel Insights runtime v2."
]) {
  if (!insightsRuntime.includes(marker)) {
    errors.push(`Insights runtime performance marker is missing: ${marker}`);
  }
}

for (const marker of [
  "item.cardThumbnail || item.thumbnail",
  'width="640" height="360"'
]) {
  if (!staticSync.includes(marker)) {
    errors.push(`Static Insights performance marker is missing: ${marker}`);
  }
}

for (const marker of [
  "config-v3",
  "insights-runtime-v2"
]) {
  if (!bootstrap.includes(marker)) {
    errors.push(`Bootstrap performance version is missing: ${marker}`);
  }
}

for (const marker of [
  "assets/img/performance/logo-navbar-dark-480.jpg?v=pa1",
  "assets/img/performance/primary-logo-dark-720.jpg?v=pa1",
  'registryVersion: "registry-12"'
]) {
  if (!publicConfig.includes(marker)) {
    errors.push(`Public config performance marker is missing: ${marker}`);
  }
}

if (!workflow.includes("node tools/validate-performance-remediation.js")) {
  errors.push("Chambers Validation does not run the performance remediation validator.");
}

const publicConfigRuntime = moduleManifest.runtimeModules.find((entry) => entry.key === "publicConfig");
const insightsRuntimeEntry = moduleManifest.runtimeModules.find((entry) => entry.key === "insightsRuntime");
const baseStyle = moduleManifest.styles.find((entry) => entry.key === "base");

if (publicConfigRuntime?.version !== "config-v3") {
  errors.push(`Manifest publicConfig version mismatch: ${publicConfigRuntime?.version}`);
}
if (insightsRuntimeEntry?.version !== "insights-runtime-v2") {
  errors.push(`Manifest insightsRuntime version mismatch: ${insightsRuntimeEntry?.version}`);
}
if (baseStyle?.version !== CACHE_KEY) {
  errors.push(`Manifest base-style version mismatch: ${baseStyle?.version}`);
}

const htmlFiles = collectPublicHtml();
let stylePageCount = 0;
let navLogoCount = 0;

for (const relPath of htmlFiles) {
  const html = read(relPath);

  const styleLinks = [
    ...html.matchAll(/assets\/css\/style\.css\?v=([A-Za-z0-9._-]+)/g)
  ];

  for (const match of styleLinks) {
    stylePageCount += 1;

    if (match[1] !== CACHE_KEY) {
      errors.push(`${relPath}: stale CSS cache key ${match[1]}`);
    }

    for (const preload of [
      "assets/css/themes/citadel-of-ak.css?v=theme-1",
      "assets/css/themes/citadel-of-kang/modules/article-index.css?v=article-index-v22",
      "assets/css/themes/citadel-of-kang/modules/pills.css?v=pills-v2"
    ]) {
      if (!html.includes(`rel="preload"`) || !html.includes(preload)) {
        errors.push(`${relPath}: CSS preload is missing: ${preload}`);
      }
    }
  }

  const scriptLinks = [
    ...html.matchAll(/assets\/js\/script\.js\?v=([A-Za-z0-9._-]+)/g)
  ];

  for (const match of scriptLinks) {
    if (match[1] !== CACHE_KEY) {
      errors.push(`${relPath}: stale JS cache key ${match[1]}`);
    }
  }

  const navTags = [
    ...html.matchAll(/<img\b[^>]*class=(["'])[^"']*\bnav-logo\b[^"']*\1[^>]*>/gi)
  ].map((match) => match[0]);

  for (const tag of navTags) {
    navLogoCount += 1;

    if (!/assets\/img\/performance\/logo-navbar-480\.jpg\?v=pa1/.test(tag)) {
      errors.push(`${relPath}: navigation logo does not use the optimized derivative.`);
    }

    if (!/\bwidth="480"/.test(tag) || !/\bheight="89"/.test(tag)) {
      errors.push(`${relPath}: navigation logo lacks explicit dimensions.`);
    }
  }
}

if (stylePageCount < 60) {
  errors.push(`Unexpectedly few public style references were checked: ${stylePageCount}`);
}

if (navLogoCount < 60) {
  errors.push(`Unexpectedly few navigation logo tags were checked: ${navLogoCount}`);
}

console.log("Performance and accessibility remediation validation summary:");
console.log(`- Public HTML files checked: ${htmlFiles.length}`);
console.log(`- Pages with shared stylesheet: ${stylePageCount}`);
console.log(`- Navigation logo tags: ${navLogoCount}`);
console.log(`- Card derivatives: ${cardDerivativeCount}`);
console.log(`- Card derivative bytes: ${cardDerivativeBytes}`);
console.log(`- Warnings: ${warnings.length}`);
console.log(`- Errors: ${errors.length}`);

if (warnings.length) {
  console.log("\nWarnings:");
  warnings.forEach((warning) => console.log(`- ${warning}`));
}

if (errors.length) {
  console.log("\nErrors:");
  errors.forEach((error) => console.log(`- ${error}`));
  process.exit(1);
}

console.log("\nPerformance and accessibility remediation validation passed.");
