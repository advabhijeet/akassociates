#!/usr/bin/env node
/*
  Chambers of AK - full article encoding validator.
*/
const fs = require('fs');
const path = require('path');

const root = process.cwd();
const strict = process.argv.includes('--strict');
const updatesDir = path.join(root, 'updates');
const registryPath = path.join(root, 'assets', 'data', 'insights-registry.json');

const read = (file) => fs.readFileSync(file, 'utf8');
const walk = (dir) => !fs.existsSync(dir) ? [] : fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
  const full = path.join(dir, entry.name);
  return entry.isDirectory() ? walk(full) : full;
});
const rel = (file) => path.relative(root, file).replace(/\\/g, '/');

const errors = [];
const warnings = [];

const mojibakePatterns = [
  { re: /\u00C3/g, label: 'U+00C3 / likely mojibake marker' },
  { re: /\u00C2/g, label: 'U+00C2 / likely mojibake marker' },
  { re: /\u00E2/g, label: 'U+00E2 / likely mojibake marker' },
  { re: /\uFFFD/g, label: 'U+FFFD replacement character' }
];

const smartPunctuationPatterns = [
  { re: /[\u2013\u2014]/g, label: 'smart dash; use ASCII hyphen or words such as "and"' },
  { re: /[\u2018\u2019]/g, label: 'smart apostrophe; use ASCII apostrophe' },
  { re: /[\u201C\u201D]/g, label: 'smart quote; use ASCII quote' },
  { re: /\u2026/g, label: 'ellipsis; use three periods or rewrite' }
];

function decodeHtml(value) {
  return String(value || '')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
}

function firstSnippet(text, re) {
  re.lastIndex = 0;
  const match = re.exec(text);
  re.lastIndex = 0;
  if (!match) return '';
  const index = match.index;
  return text.slice(Math.max(0, index - 70), Math.min(text.length, index + 140)).replace(/\s+/g, ' ');
}

function checkMojibake(fileLabel, field, text) {
  for (const { re, label } of mojibakePatterns) {
    if (re.test(text)) {
      errors.push(fileLabel + ' ' + field + ' contains ' + label + ': ' + firstSnippet(text, re));
      re.lastIndex = 0;
    }
  }
}

function checkSmartMetadata(fileLabel, field, text) {
  for (const { re, label } of smartPunctuationPatterns) {
    const matches = text.match(re);
    if (matches) {
      const message = fileLabel + ' ' + field + ' contains ' + label + ': ' + [...new Set(matches)].join(' ');
      if (strict) errors.push(message);
      else warnings.push(message);
    }
  }
}

function collectMetadataFields(html) {
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
      values.push({ field: 'meta:' + key, value: content[1] });
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
        if (parsed[key]) values.push({
          field: 'jsonld[' + index + '].' + key,
          value: Array.isArray(parsed[key]) ? parsed[key].join(', ') : parsed[key]
        });
      });
    } catch (error) {
      warnings.push('JSON-LD parse warning: ' + error.message);
    }
  });

  return values.map((item) => ({ field: item.field, value: decodeHtml(item.value) }));
}

const articleFiles = walk(updatesDir).filter((file) => file.endsWith('.html'));
for (const file of articleFiles) {
  const html = read(file);
  const label = rel(file);

  checkMojibake(label, 'full-html', html);

  for (const { field, value } of collectMetadataFields(html)) {
    checkMojibake(label, field, value);
    checkSmartMetadata(label, field, value);
  }
}

if (fs.existsSync(registryPath)) {
  try {
    const registry = JSON.parse(read(registryPath));
    if (!Array.isArray(registry)) {
      errors.push('assets/data/insights-registry.json must contain a JSON array');
    } else {
      registry.forEach((item, index) => {
        const label = 'assets/data/insights-registry.json item ' + (index + 1) + (item && item.href ? ' (' + item.href + ')' : '');
        ['title', 'excerpt', 'category', 'date'].forEach((field) => {
          if (!item || !item[field]) return;
          const value = String(item[field]);
          checkMojibake(label, field, value);
          checkSmartMetadata(label, field, value);
        });
        if (item && Array.isArray(item.tags)) {
          item.tags.forEach((tag, tagIndex) => {
            checkMojibake(label, 'tags[' + tagIndex + ']', String(tag));
            checkSmartMetadata(label, 'tags[' + tagIndex + ']', String(tag));
          });
        }
      });
    }
  } catch (error) {
    errors.push('Could not parse assets/data/insights-registry.json: ' + error.message);
  }
}

if (warnings.length) {
  console.log('Article encoding validation warnings:');
  warnings.forEach((warning) => console.log('- ' + warning));
}

if (errors.length) {
  console.error('Article encoding validation failed:');
  errors.forEach((error) => console.error('- ' + error));
  process.exit(1);
}

console.log('Full article encoding validation passed.');
console.log('Article files checked: ' + articleFiles.length);
if (warnings.length && !strict) console.log('Run with --strict to fail on smart punctuation in metadata/card fields.');
