#!/usr/bin/env node
/*
  Enforce the centralized Legal Insights editorial theme.
  New articles inherit assets/css/style.css via article.article-body.
  All embedded article CSS has been migrated into the shared theme.
*/
'use strict';
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');
const UPDATES = path.join(ROOT, 'updates');
const MAIN_CSS = path.join(ROOT, 'assets', 'css', 'style.css');
const UDYAM = 'updates/msme-registration-benefits-eligibility.html';

const errors = [];
const attr = (tag, name) => {
  const match = tag.match(new RegExp('\\b' + name + '\\s*=\\s*(["\\x27])([^"\\x27]*)\\1', 'i'));
  return match ? match[2] : '';
};
const cssAssetPath = (href) => href
  .replace(/[?#].*$/, '')
  .replace(/^https?:\/\/chambersofak\.in\//i, '')
  .replace(/^\/+/, '')
  .replace(/^(?:\.\.\/)+/, '')
  .replace(/^\.\//, '');
const articleFiles = fs.readdirSync(UPDATES)
  .filter((name) => name.endsWith('.html'))
  .sort();
const sharedCss = fs.readFileSync(MAIN_CSS, 'utf8');
if (!sharedCss.includes('SITEWIDE_INSIGHTS_EDITORIAL_V1')
  || !/main article\.article-body:not\(\.udyam-article\)\s*\{/.test(sharedCss)
  || !/main article\.article-body:not\(\.udyam-article\)\s+p\s*\{[^}]*text-align:\s*justify/s.test(sharedCss)) {
  errors.push('Shared editorial CSS contract is missing or article paragraphs are not justified.');
}

for (const name of articleFiles) {
  const file = 'updates/' + name;
  const html = fs.readFileSync(path.join(UPDATES, name), 'utf8');
  if (!/<article\b[^>]*class=["'][^"']*\barticle-body\b[^"']*["']/i.test(html)) {
    errors.push(file + ': missing article.article-body, so shared styling will not apply.');
  }
  const stylesheets = (html.match(/<link\b[^>]*>/gi) || [])
    .filter((tag) => attr(tag, 'rel').toLowerCase().split(/\s+/).includes('stylesheet'))
    .map((tag) => cssAssetPath(attr(tag, 'href')))
    .filter(Boolean);
  const sharedLinks = stylesheets.filter((asset) => asset === 'assets/css/style.css');
  if (sharedLinks.length !== 1) {
    errors.push(file + ': expected exactly one shared assets/css/style.css link.');
  }
  for (const asset of stylesheets) {
    if (asset === 'assets/css/style.css') continue;
    if (file === UDYAM && asset === 'assets/css/pages/udyam-registration-guide.css') continue;
    if (asset.startsWith('assets/css/')) {
      errors.push(file + ': unexpected page-specific stylesheet ' + asset);
    }
  }
  const embeddedStyleCount = (html.match(/<style\b[^>]*>/gi) || []).length;
  if (embeddedStyleCount) {
    errors.push(file + ': inline <style> blocks are forbidden; use the shared article theme.');
  }
}
if (errors.length) {
  console.error('Shared article theme contract failed:\n' + errors.map((e) => '- ' + e).join('\n'));
  process.exitCode = 1;
} else {
  console.log('Shared article theme contract passed: ' + articleFiles.length
    + ' articles inherit the shared stylesheet, with zero embedded article style blocks; one approved Udyam specialist stylesheet.');
}
