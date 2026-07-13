"use strict";

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = process.cwd();
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

const required = [
  "assets/js/script.js",
  "assets/js/config/chambers-public-config.js",
  "assets/js/runtime/core-runtime.js",
  "assets/js/runtime/insights-runtime.js",
  "assets/js/runtime/module-loader.js",
  "assets/data/citadel-module-manifest.json",
  "assets/js/themes/citadel-of-kang/modules/shell/global-shell.js",
  "assets/js/themes/citadel-of-kang/modules/forms/enquiry-form.js",
  "docs/maintenance/theme/CITADEL_V1_ROLLBACK.md",
  "assets/css/themes/chambers-ak.css",
  "_config.yml"
];

for (const relPath of required) {
  if (!exists(relPath)) errors.push(`Required Citadel file is missing: ${relPath}`);
}

let manifest = null;
try {
  manifest = JSON.parse(read("assets/data/citadel-module-manifest.json"));
} catch (error) {
  errors.push(`Module manifest parse error: ${error.message}`);
}

let publicConfig = null;
try {
  const sandbox = { window: {} };
  vm.runInNewContext(read("assets/js/config/chambers-public-config.js"), sandbox, {
    filename: "assets/js/config/chambers-public-config.js"
  });
  publicConfig = sandbox.window.ChambersPublicConfig;
} catch (error) {
  errors.push(`Public config execution error: ${error.message}`);
}

if (manifest) {
  if (manifest.release !== "chambers-citadel-1.1.0") {
    errors.push(`Manifest release mismatch: ${manifest.release}`);
  }

  if (manifest.baselineTag !== "chambers-citadel-v1") {
    errors.push(`Manifest baseline tag mismatch: ${manifest.baselineTag}`);
  }

  if (manifest.baselineCommit !== "47e8c6ed07ed2a053a46a39f3779d60fa6059edf") {
    errors.push(`Manifest baseline commit mismatch: ${manifest.baselineCommit}`);
  }

  for (const group of ["runtimeModules", "featureModules", "styles"]) {
    if (!Array.isArray(manifest[group]) || manifest[group].length === 0) {
      errors.push(`Manifest group missing or empty: ${group}`);
      continue;
    }

    for (const entry of manifest[group]) {
      for (const field of ["key", "status", "owner", "path", "version", "loadedBy"]) {
        if (!entry[field]) {
          errors.push(`Manifest ${group} entry missing ${field}: ${entry.key || "[unknown]"}`);
        }
      }

      if (entry.path && !exists(entry.path)) {
        errors.push(`Manifest production path is missing: ${entry.path}`);
      }

      if (entry.status !== "production") {
        errors.push(`Manifest production entry has unexpected status: ${entry.key}`);
      }
    }
  }

  const moved = manifest.themeLab?.files;
  if (!Array.isArray(moved) || moved.length !== 18) {
    errors.push(`Manifest theme-lab file count should be 18.`);
  } else {
    for (const entry of moved) {
      if (exists(entry.source)) {
        errors.push(`Dormant file still exists in public runtime tree: ${entry.source}`);
      }
      if (!exists(entry.archivedPath)) {
        errors.push(`Theme-lab archive file is missing: ${entry.archivedPath}`);
      }
      if (!["dormant-experiment", "legacy-duplicate"].includes(entry.classification)) {
        errors.push(`Theme-lab classification missing or invalid: ${entry.source}`);
      }
    }
  }
}

if (publicConfig) {
  if (publicConfig.release !== "chambers-citadel-1.1.0") {
    errors.push(`Public config release mismatch: ${publicConfig.release}`);
  }

  if (publicConfig.baselineTag !== "chambers-citadel-v1") {
    errors.push(`Public config baseline tag mismatch: ${publicConfig.baselineTag}`);
  }

  const featureEntries = new Map(
    (manifest?.featureModules || []).map((entry) => [entry.key, entry])
  );

  for (const [key, moduleEntry] of Object.entries(publicConfig.modules || {})) {
    const manifestEntry = featureEntries.get(key);

    if (!manifestEntry) {
      errors.push(`Configured module is absent from manifest: ${key}`);
      continue;
    }

    for (const field of ["id", "path", "version"]) {
      if (moduleEntry[field] !== manifestEntry[field]) {
        errors.push(`Config/manifest mismatch for ${key}.${field}`);
      }
    }
  }

  const serialized = JSON.stringify(publicConfig);
  for (const forbidden of [
    /"password"\s*:/i,
    /"secret"\s*:/i,
    /"privateKey"\s*:/i,
    /"accessToken"\s*:/i,
    /"githubToken"\s*:/i,
    /"writeToken"\s*:/i,
    /"clientData"\s*:/i
  ]) {
    if (forbidden.test(serialized)) {
      errors.push(`Forbidden public-config field detected: ${forbidden}`);
    }
  }
}

const bootstrap = exists("assets/js/script.js") ? read("assets/js/script.js") : "";
if (bootstrap.split(/\r?\n/).length > 110) {
  errors.push("Public bootstrap should remain a thin orchestrator.");
}

for (const legacyMarker of [
  "Insights tag filter system",
  "conversionEventNames",
  "Citadel latest insights module auto-loader",
  "Homepage registry-driven latest insights renderer"
]) {
  if (bootstrap.includes(legacyMarker)) {
    errors.push(`Monolithic bootstrap responsibility remains: ${legacyMarker}`);
  }
}

for (const runtimePath of [
  "assets/js/config/chambers-public-config.js",
  "assets/js/runtime/core-runtime.js",
  "assets/js/runtime/insights-runtime.js",
  "assets/js/runtime/module-loader.js"
]) {
  if (!bootstrap.includes(runtimePath)) {
    errors.push(`Bootstrap dependency missing: ${runtimePath}`);
  }
}

const globalShell = exists("assets/js/themes/citadel-of-kang/modules/shell/global-shell.js") ? read("assets/js/themes/citadel-of-kang/modules/shell/global-shell.js") : "";
for (const migratedValue of [
  "https://www.linkedin.com/company/chambersofak",
  "https://whatsapp.com/channel/0029VbCmf6M9sBIHqiTPIz33",
  "Patna, India"
]) {
  if (globalShell.includes(migratedValue)) {
    errors.push(`Global Shell still hardcodes public config value: ${migratedValue}`);
  }
}

for (const resolverMarker of [
  "const assetRoot = () =>",
  "const assetUrl = (assetPath) =>"
]) {
  if (!globalShell.includes(resolverMarker)) {
    errors.push(`Global Shell asset resolver marker is missing: ${resolverMarker}`);
  }
}

if (!globalShell.includes("new URL(assetUrl(entry.path))")) {
  errors.push("Global Shell does not use the configured asset resolver.");
}

const enquiryForm = exists("assets/js/themes/citadel-of-kang/modules/forms/enquiry-form.js") ? read("assets/js/themes/citadel-of-kang/modules/forms/enquiry-form.js") : "";
for (const migratedValue of [
  "rivGZ1UliuSkSgFdm",
  "919471214118",
  "chambersofakadmin@gmail.com"
]) {
  if (enquiryForm.includes(migratedValue)) {
    errors.push(`Enquiry module still hardcodes public config value: ${migratedValue}`);
  }
}

const configYml = exists("_config.yml") ? read("_config.yml") : "";
if (!/(?:^|\n)\s*-\s+docs\s*(?:\n|$)/.test(configYml)) {
  errors.push("_config.yml must exclude docs and theme-lab files from deployment.");
}

for (const relPath of [
  "assets/js/themes/citadel-of-kang/README.md",
  "assets/css/themes/citadel-of-kang/README.md"
]) {
  const content = exists(relPath) ? read(relPath) : "";
  if (!content.includes("production-active") && !content.includes("production-active".replace("-", " "))) {
    warnings.push(`${relPath}: production-only status language should be reviewed.`);
  }
  if (content.includes("Dormant/theme-lab files") || content.includes("Dormant/theme-lab CSS")) {
    errors.push(`${relPath}: obsolete mixed-namespace section remains.`);
  }
}

const rollback = exists("docs/maintenance/theme/CITADEL_V1_ROLLBACK.md") ? read("docs/maintenance/theme/CITADEL_V1_ROLLBACK.md") : "";
for (const marker of ["chambers-citadel-v1", "47e8c6ed07ed2a053a46a39f3779d60fa6059edf", "rollback/chambers-citadel-v1"]) {
  if (!rollback.includes(marker)) {
    errors.push(`Rollback documentation marker missing: ${marker}`);
  }
}

console.log("Citadel runtime validation summary:");
console.log(`- Runtime modules: ${manifest?.runtimeModules?.length || 0}`);
console.log(`- Feature modules: ${manifest?.featureModules?.length || 0}`);
console.log(`- Production styles: ${manifest?.styles?.length || 0}`);
console.log(`- Theme-lab files: ${manifest?.themeLab?.files?.length || 0}`);
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

console.log("\nCitadel runtime validation passed.");
