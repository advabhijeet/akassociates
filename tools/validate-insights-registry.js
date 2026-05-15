#!/usr/bin/env node
/*
  Validate Chambers/Citadel article registry coverage and reusable article module assumptions.
  Source of truth: assets/data/insights-registry.json
*/
const fs = require('fs');
const path = require('path');

const root = process.cwd();
const strict = process.argv.includes('--strict');
const scriptPath = path.join(root, 'assets', 'js', 'script.js');
const registryPath = path.join(root, 'assets', 'data', 'insights-registry.json');
const updatesDir = path.join(root, 'updates');

const normalizePath = (value) => String(value || '')
  .trim()
  .replace(/^https?:\/\/[^/]+/i, '')
  .replace(/^\/+/, '')
  .replace(/^akassociates\//i, '')
  .replace(/^\.\//, '')
  .replace(/^\.\.\//, '')
  .replace(/\\/g, '/');

const read = (file) => fs.readFileSync(file, 'utf8');

const walk = (dir) => {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) return walk(fullPath);
    return fullPath;
  });
};

const errors = [];
const warnings = [];

if (!fs.existsSync(scriptPath)) {
  errors.push(`Missing script.js at ${path.relative(root, scriptPath)}`);
}

if (!fs.existsSync(registryPath)) {
  errors.push(`Missing insights registry JSON at ${path.relative(root, registryPath)}`);
}

let registry = [];
if (fs.existsSync(registryPath)) {
  try {
    registry = JSON.parse(read(registryPath));
  } catch (error) {
    errors.push(`Could not parse assets/data/insights-registry.json: ${error.message}`);
  }

  if (!Array.isArray(registry)) {
    errors.push('assets/data/insights-registry.json must contain a JSON array');
    registry = [];
  }
}

if (fs.existsSync(scriptPath)) {
  const script = read(scriptPath);

  if (/window\.chambersInsightsRegistry\s*=\s*\[\s*\{/m.test(script)) {
    errors.push('assets/js/script.js still appears to contain an inline registry object array');
  }

  if (!/ChambersInsightsRegistryReady/.test(script) || !/assets\/data\/insights-registry\.json/.test(script)) {
    errors.push('assets/js/script.js is missing the JSON registry loader');
  }
}

const registryHrefs = new Set(registry.map((item) => normalizePath(item && item.href)));
const updateArticleFiles = walk(updatesDir)
  .filter((file) => file.endsWith('.html'))
  .filter((file) => {
    const html = read(file);
    return /class\s*=\s*["'][^"']*\barticle-body\b/i.test(html);
  });

updateArticleFiles.forEach((file) => {
  const relative = normalizePath(path.relative(root, file));
  const html = read(file);

  if (!registryHrefs.has(relative)) {
    const message = `${relative} has article-body but is missing from assets/data/insights-registry.json`;
    if (strict) errors.push(message);
    else warnings.push(message);
  }

  if (!/<h1[\s>]/i.test(html)) {
    errors.push(`${relative} is missing an h1`);
  }

  const h2Count = (html.match(/<h2[\s>]/gi) || []).length;
  const articleIndexScriptCount = (html.match(/article-index-direct-rail\.js/g) || []).length;
  if (h2Count >= 3 && articleIndexScriptCount > 1) {
    errors.push(`${relative} contains duplicate Article Index script references`);
  }

  if ((html.match(/article-standard-footer/g) || []).length > 0) {
    errors.push(`${relative} contains manually hardcoded article-standard-footer markup`);
  }
});

registry.forEach((item, index) => {
  const href = normalizePath(item && item.href);
  if (!href) {
    errors.push(`Registry item ${index + 1} has no href`);
    return;
  }

  if (!fs.existsSync(path.join(root, href))) {
    errors.push(`Registry href points to a missing file: ${href}`);
  }

  if (!item.title) warnings.push(`Registry item ${href} has no title`);
  if (!item.category) warnings.push(`Registry item ${href} has no category`);
  if (!Array.isArray(item.tags) || !item.tags.length) warnings.push(`Registry item ${href} has no tags`);
});

if (warnings.length) {
  console.log('Registry validation warnings:');
  warnings.forEach((warning) => console.log(`- ${warning}`));
}

if (errors.length) {
  console.error('Registry validation failed:');
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log(`Registry validation passed: ${updateArticleFiles.length} article-body page(s), ${registry.length} registry item(s).`);
if (warnings.length && !strict) {
  console.log('Run with --strict to fail on article-body pages missing from the registry.');
}
