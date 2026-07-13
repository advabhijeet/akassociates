"use strict";

const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const errors = [];
const warnings = [];

const CORE_DOCS = [
  "README.md",
  "docs/README.md",
  "docs/PROJECT_ROADMAP.md",
  "docs/REPOSITORY_ORGANIZATION.md",
  "docs/maintenance/README.md",
  "docs/maintenance/ACTIVE_DOCUMENTATION_INDEX.md",
  "docs/maintenance/theme/THEME_SYSTEM.md",
  "docs/maintenance/theme/CITADEL_OF_KANG_THEME.md",
  "docs/maintenance/theme/CITADEL_PRODUCTION_MODULE_INVENTORY.md",
  "docs/maintenance/publishing/CHAMBERS_ARTICLE_AND_SOCIAL_GUIDELINES.md",
  "assets/css/themes/citadel-of-kang/README.md",
  "assets/js/themes/citadel-of-kang/README.md",
];

const STALE_PATHS = [
  "docs/maintenance/ARTICLE_PUBLISHING_WORKFLOW.md",
  "docs/maintenance/ARTICLE_HTML_TEMPLATE.md",
  "docs/maintenance/ARTICLE_REUSABLE_MODULES.md",
  "docs/maintenance/CHAMBERS_ARTICLE_AND_SOCIAL_GUIDELINES.md",
  "docs/maintenance/LEGAL_DOCUMENTATION_MAINTENANCE.md",
  "docs/maintenance/SOCIAL_MEDIA_DISTRIBUTION_WORKFLOW.md",
  "docs/maintenance/THEME_SYSTEM.md",
  "docs/maintenance/CITADEL_OF_KANG_THEME.md",
  "docs/maintenance/CITADEL_PRODUCTION_MODULE_INVENTORY.md",
  "docs/maintenance/CITADEL_GLOBAL_SHELL.md",
  "docs/maintenance/CITADEL_MODULE_CONTRACTS.md",
  "docs/maintenance/CITADEL_PUBLIC_CONFIG_SCHEMA.md",
  "docs/maintenance/CITADEL_LOCAL_VALIDATION.md",
  "docs/maintenance/CITADEL_PRODUCTION_FINALIZATION_CHECKLIST.md",
  "docs/maintenance/CITADEL_TEMPLATE_SYSTEM_ROADMAP.md",
  "docs/CHAMBERS_OF_AK_WEBSITE_MASTER_PLAN.md",
];

const MOJIBAKE_MARKERS = [
  "\uFFFD",
  "\u009D",
  "Ã",
  "Â",
  "â€",
  "â€™",
  "â€œ",
  "â€\u009d",
  "â€“",
  "â€”",
];

function rel(filePath) {
  return path.relative(ROOT, filePath).replace(/\\/g, "/");
}

function read(relPath) {
  return fs.readFileSync(path.join(ROOT, relPath), "utf8");
}

function exists(relPath) {
  return fs.existsSync(path.join(ROOT, relPath));
}

function walk(dirPath, out = []) {
  if (!fs.existsSync(dirPath)) return out;

  for (const entry of fs.readdirSync(dirPath, { withFileTypes: true })) {
    const full = path.join(dirPath, entry.name);

    if (entry.isDirectory()) {
      walk(full, out);
    } else {
      out.push(full);
    }
  }

  return out;
}

for (const relPath of CORE_DOCS) {
  if (!exists(relPath)) {
    errors.push(`Missing core documentation file: ${relPath}`);
  }
}

const nonArchiveMarkdown = [
  path.join(ROOT, "README.md"),
  path.join(ROOT, "SECURITY.md"),
  ...walk(path.join(ROOT, "docs"))
    .filter((file) => file.endsWith(".md"))
    .filter((file) => !rel(file).startsWith("docs/archive/")),
].filter((file, index, array) => fs.existsSync(file) && array.indexOf(file) === index);

for (const file of nonArchiveMarkdown) {
  const relPath = rel(file);
  const content = fs.readFileSync(file, "utf8");

  for (let i = 0; i < content.length; i += 1) {
    const code = content.charCodeAt(i);

    if (
      (code >= 0x00 && code <= 0x08) ||
      code === 0x0b ||
      code === 0x0c ||
      (code >= 0x0e && code <= 0x1f) ||
      (code >= 0x7f && code <= 0x9f)
    ) {
      errors.push(`${relPath}: control character U+${code.toString(16).toUpperCase().padStart(4, "0")} at character ${i + 1}.`);
      break;
    }
  }

  for (const marker of MOJIBAKE_MARKERS) {
    if (content.includes(marker)) {
      errors.push(`${relPath}: mojibake/replacement marker detected: ${JSON.stringify(marker)}.`);
    }
  }

  for (const stalePath of STALE_PATHS) {
    if (content.includes(stalePath)) {
      errors.push(`${relPath}: stale documentation path remains: ${stalePath}`);
    }
  }
}

const activeIndexPath = "docs/maintenance/ACTIVE_DOCUMENTATION_INDEX.md";

if (exists(activeIndexPath)) {
  const activeIndex = read(activeIndexPath);
  const references = [
    ...activeIndex.matchAll(/`([^`\r\n]+\.(?:md|txt))`/g),
  ].map((match) => match[1]);

  const uniqueReferences = [...new Set(references)];

  for (const reference of uniqueReferences) {
    if (!/^(?:docs\/|README\.md$|CHANGELOG\.md$)/.test(reference)) {
      continue;
    }

    if (!exists(reference)) {
      errors.push(`${activeIndexPath}: listed document does not exist: ${reference}`);
    }
  }

  if (/docs\/planning\/STATUS_[^`\s]+\.md/.test(activeIndex)) {
    errors.push(`${activeIndexPath}: historical STATUS file is listed as active.`);
  }
}

const activeReferenceFiles = new Set(CORE_DOCS);

if (exists(activeIndexPath)) {
  const activeIndex = read(activeIndexPath);

  for (const match of activeIndex.matchAll(/`([^`\r\n]+\.(?:md|txt))`/g)) {
    if (match[1].startsWith("docs/") && exists(match[1])) {
      activeReferenceFiles.add(match[1]);
    }
  }
}

for (const relPath of activeReferenceFiles) {
  if (!exists(relPath) || !relPath.endsWith(".md")) continue;

  const content = read(relPath);

  for (const match of content.matchAll(/(?<![A-Za-z0-9_./-])(docs\/[A-Za-z0-9_.\-/]+\.(?:md|txt))/g)) {
    const reference = match[1];

    if (
      reference.includes("YYYY-MM-DD") ||
      reference.includes("<") ||
      reference.includes(">")
    ) {
      continue;
    }

    if (!exists(reference)) {
      errors.push(`${relPath}: referenced repository document does not exist: ${reference}`);
    }
  }
}

const planningDir = path.join(ROOT, "docs", "planning");

if (fs.existsSync(planningDir)) {
  const statusFiles = fs
    .readdirSync(planningDir, { withFileTypes: true })
    .filter((entry) => entry.isFile() && /^STATUS_.*\.md$/i.test(entry.name));

  if (statusFiles.length) {
    errors.push(`docs/planning contains ${statusFiles.length} completed STATUS file(s); archive them.`);
  }
}

const statusArchive = path.join(ROOT, "docs", "archive", "status-snapshots", "2026-05");
const monitoringArchive = path.join(ROOT, "docs", "archive", "monitoring-snapshots", "2026-05");

const statusArchiveCount = fs.existsSync(statusArchive)
  ? fs.readdirSync(statusArchive).filter((name) => name.endsWith(".md")).length
  : 0;

const monitoringArchiveCount = fs.existsSync(monitoringArchive)
  ? fs.readdirSync(monitoringArchive).filter((name) => name.endsWith(".md")).length
  : 0;

if (statusArchiveCount < 15) {
  errors.push(`Expected at least 15 archived May 2026 status snapshots, found ${statusArchiveCount}.`);
}

if (monitoringArchiveCount < 4) {
  errors.push(`Expected at least 4 archived May 2026 monitoring snapshots, found ${monitoringArchiveCount}.`);
}

const jsThemeReadme = "assets/js/themes/citadel-of-kang/README.md";
if (exists(jsThemeReadme)) {
  const content = read(jsThemeReadme);

  if (!content.includes("Production-active files")) {
    errors.push(`${jsThemeReadme}: production-active file section missing.`);
  }

  if (content.includes("Not currently loaded by assets/js/script.js")) {
    errors.push(`${jsThemeReadme}: obsolete non-live statement remains.`);
  }
}

const cssThemeReadme = "assets/css/themes/citadel-of-kang/README.md";
if (exists(cssThemeReadme)) {
  const content = read(cssThemeReadme);

  if (!content.includes("Production-active CSS")) {
    errors.push(`${cssThemeReadme}: production-active CSS section missing.`);
  }

  if (content.includes("Not currently imported by assets/css/style.css")) {
    errors.push(`${cssThemeReadme}: obsolete non-live statement remains.`);
  }
}

const guidelinesPath = "docs/maintenance/publishing/CHAMBERS_ARTICLE_AND_SOCIAL_GUIDELINES.md";
if (exists(guidelinesPath)) {
  const content = read(guidelinesPath);

  for (const required of [
    "Permanent thumbnail branding rule",
    "Chambers of AK logo",
    "BlogPosting.image",
    "node tools/validate-documentation.js",
  ]) {
    if (!content.includes(required)) {
      errors.push(`${guidelinesPath}: required current rule missing: ${required}`);
    }
  }
}

const roadmapPath = "docs/PROJECT_ROADMAP.md";
if (exists(roadmapPath)) {
  const content = read(roadmapPath);

  for (const required of [
    "Last consolidated: **13 July 2026**",
    "Repository Cleanup Batch 1",
    "Repository Cleanup Batch 2",
    "Repository Cleanup Batch 3",
    "Citadel Theme Restart",
  ]) {
    if (!content.includes(required)) {
      errors.push(`${roadmapPath}: current roadmap marker missing: ${required}`);
    }
  }
}

const configPath = "_config.yml";
if (exists(configPath)) {
  const config = read(configPath);

  if (!/(?:^|\n)\s*-\s+docs\s*(?:\n|$)/.test(config)) {
    errors.push("_config.yml must continue to exclude docs from public deployment.");
  }
}

console.log("Documentation validation summary:");
console.log(`- Core documents checked: ${CORE_DOCS.length}`);
console.log(`- Non-archive Markdown files scanned: ${nonArchiveMarkdown.length}`);
console.log(`- Active references checked: ${activeReferenceFiles.size}`);
console.log(`- Archived status snapshots: ${statusArchiveCount}`);
console.log(`- Archived monitoring snapshots: ${monitoringArchiveCount}`);
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

console.log("\nDocumentation validation passed.");
