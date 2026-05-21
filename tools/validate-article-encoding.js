#!/usr/bin/env node
/*
  Validate Chambers of AK article metadata and registry text for encoding safety.

  Purpose:
  - detect mojibake such as Ã, Â, â€“ and related double-encoding artefacts;
  - prevent smart punctuation in metadata/card text where ASCII-safe text is preferred;
  - keep article summaries, OG/Twitter descriptions and registry cards clean across browsers/social platforms.
*/

const fs = require('fs');
const path = require('path');

const root = process.cwd();
const strict = process.argv.includes('--strict');
const updatesDir = path.join(root, 'updates');
const registryPath = path.join(root, 'assets', 'data', 'insights-registry.json');

const read = (file) => fs.readFileSync(file, 'utf8');

const walk = (dir) => {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) return walk(fullPath);
    return fullPath;
  });
};

const rel = (file) => path.relative(root, file).replace(/\\/g, '/');

const errors = [];
const warnings = [];

const mojibakePatterns = [
  /Ã[^\s<]*/g,
  /Â/g,
  /â€[\w\u0080-\uFFFF]*/g,
  /â€“/g,
  /â€”/g,
  /â€˜/g,
  /â€™/g,
  /â€œ/g,
  /â€/g,
  /\uFFFD/g
];

const smartPunctuationPatterns = [
  { re: /[\u2013\u2014]/g, label: 'smart dash; use ASCII hyphen or words such as "and"' },
  { re: /[\u2018\u2019]/g, label: 'smart apostrophe; use ASCII apostrophe' },
  { re: /[\u201C\u201D]/g, label: 'smart quote; use ASCII quote' },
  { re: /\u2026/g, label: 'ellipsis; use three periods or rewrite' }
];

const decodeHtml = (value) => String(value || '')
  .replace(/&amp;/g, '&')
  .replace(/&quot;/g, '"')
  .replace(/&#39;/g, "'")
  .replace(/&lt;/g, '<')
  .replace(/&gt;/g, '>');

const collectArticleMetadata = (html) => {
  const values = [];

  const title = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  if (title) values.push({ field: 'title', value: title[1] });

  const metaRe = /<meta\s+([^>]*?)>/gi;
  let match;
  while ((match = metaRe.exec(html))) {
    const tag = match[0];
    const name = tag.match(/\bname=["']([^"']+)["']/i);
    const property = tag.match(/\bproperty=["']([^"']+)["']/i);
    const content = tag.match(/\bcontent=["']([^"']*)["']/i);
    if (!content) continue;
    const key = (name && name[1]) || (property && property[1]) || '';
    if (/^(description|keywords|twitter:title|twitter:description|og:title|og:description|og:image:alt|article:tag)$/i.test(key)) {
      values.push({ field: `meta:${key}`, value: content[1] });
    }
  }

  const summary = html.match(/<p\s+class=["'][^"']*\barticle-summary\b[^"']*["'][^>]*>([\s\S]*?)<\/p>/i);
  if (summary) values.push({ field: 'article-summary', value: summary[1].replace(/<[^>]+>/g, '') });

  const ldScripts = html.match(/<script\s+type=["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>/gi) || [];
  ldScripts.forEach((script, index) => {
    const jsonText = script.replace(/^<script[^>]*>/i, '').replace(/<\/script>$/i, '').trim();
    try {
      const parsed = JSON.parse(jsonText);
      ['headline', 'description', 'keywords', 'articleSection'].forEach((key) => {
        if (parsed[key]) values.push({ field: `jsonld[${index}].${key}`, value: Array.isArray(parsed[key]) ? parsed[key].join(', ') : parsed[key] });
      });
    } catch (error) {
      warnings.push(`Could not parse JSON-LD block ${index + 1}: ${error.message}`);
    }
  });

  return values.map((item) => ({ field: item.field, value: decodeHtml(item.value) }));
};

const checkText = (fileLabel, field, value) => {
  const text = String(value || '');
  mojibakePatterns.forEach((pattern) => {
    const matches = text.match(pattern);
    if (matches) {
      errors.push(`${fileLabel} ${field} contains likely mojibake: ${[...new Set(matches)].join(', ')}`);
    }
  });

  smartPunctuationPatterns.forEach(({ re, label }) => {
    const matches = text.match(re);
    if (matches) {
      const message = `${fileLabel} ${field} contains ${label}: ${[...new Set(matches)].join(' ')}`;
      if (strict) errors.push(message);
      else warnings.push(message);
    }
  });
};

const articleFiles = walk(updatesDir).filter((file) => file.endsWith('.html'));
articleFiles.forEach((file) => {
  const html = read(file);
  collectArticleMetadata(html).forEach(({ field, value }) => checkText(rel(file), field, value));
});

if (fs.existsSync(registryPath)) {
  try {
    const registry = JSON.parse(read(registryPath));
    if (Array.isArray(registry)) {
      registry.forEach((item, index) => {
        const label = `assets/data/insights-registry.json item ${index + 1}${item && item.href ? ` (${item.href})` : ''}`;
        ['title', 'excerpt', 'category', 'date'].forEach((field) => {
          if (item && item[field]) checkText(label, field, item[field]);
        });
        if (item && Array.isArray(item.tags)) {
          item.tags.forEach((tag, tagIndex) => checkText(label, `tags[${tagIndex}]`, tag));
        }
      });
    } else {
      errors.push('assets/data/insights-registry.json must contain a JSON array');
    }
  } catch (error) {
    errors.push(`Could not parse assets/data/insights-registry.json: ${error.message}`);
  }
}

if (warnings.length) {
  console.log('Article encoding validation warnings:');
  warnings.forEach((warning) => console.log(`- ${warning}`));
}

if (errors.length) {
  console.error('Article encoding validation failed:');
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log(`Article encoding validation passed: ${articleFiles.length} article file(s) checked.`);
if (warnings.length && !strict) {
  console.log('Run with --strict to fail on smart punctuation in metadata/card fields.');
}
