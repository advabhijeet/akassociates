#!/usr/bin/env node
/*
  Validate Chambers/Citadel article registry coverage and reusable article module assumptions.
*/
const fs = require('fs');
const path = require('path');

const root = process.cwd();
const strict = process.argv.includes('--strict');
const scriptPath = path.join(root, 'assets', 'js', 'script.js');
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

let registry = [];
if (fs.existsSync(scriptPath)) {
  const script = read(scriptPath);
  const match = script.match(/window\.chambersInsightsRegistry\s*=\s*(\[[\s\S]*?\]);/);

  if (!match) {
    errors.push('Could not find window.chambersInsightsRegistry in assets/js/script.js');
  } else {
    try {
      registry = Function(`"use strict"; return (${match[1]});`)();
    } catch (error) {
      errors.push(`Could not parse window.chambersInsightsRegistry: ${error.message}`);
    }
  }
}

const registryHrefs = new Set(registry.map((item) => normalizePath(item.href)));
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
    const message = `${relative} has article-body but is missing from window.chambersInsightsRegistry`;
    if (strict) errors.push(message);
    else warnings.push(message);
  }

  if (!/<h1[\s>]/i.test(html)) {
    errors.push(`${relative} is missing an h1`);
  }

  const h2Count = (html.match(/<h2[\s>]/gi) || []).length;
  if (/data-citadel-article-index/i.test(html) && h2Count < 3) {
    errors.push(`${relative} has data-citadel-article-index but only ${h2Count} h2 heading(s)`);
  }

  const footerCount = (html.match(/article-standard-footer/g) || []).length;
  if (footerCount > 0) {
    errors.push(`${relative} contains manually hardcoded article-standard-footer markup`);
  }

  const articleIndexScriptCount = (html.match(/article-index-direct-rail\.js/g) || []).length;
  if (articleIndexScriptCount > 1) {
    errors.push(`${relative} contains duplicate Article Index script references`);
  }
});

registry.forEach((item, index) => {
  const href = normalizePath(item.href);
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
