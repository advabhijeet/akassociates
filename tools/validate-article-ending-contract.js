#!/usr/bin/env node
/* Guard one shared article disclaimer and no editorial enquiry solicitation. */
'use strict';
const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..');
const updates = path.join(root, 'updates');
const footer = fs.readFileSync(path.join(root, 'assets/js/themes/citadel-of-kang/article-footer.js'), 'utf8');
const css = fs.readFileSync(path.join(root, 'assets/css/style.css'), 'utf8');
const errors = [];
if (!footer.includes('article-standard-disclaimer')
    || !footer.includes('does not constitute legal advice, advertising or solicitation')
    || !footer.includes('footer.appendChild(buildDisclaimer())')) {
  errors.push('Central Article Footer is missing its standardized disclaimer.');
}
if (!css.includes('ARTICLE_ENDING_CONTRACT_V1')
    || !css.includes('.article-legal-context')
    || !css.includes('.article-standard-disclaimer')) {
  errors.push('The shared legal notice/context presentation is missing.');
}
const pages = fs.readdirSync(updates).filter(name => name.endsWith('.html')).sort();
for (const name of pages) {
  const html = fs.readFileSync(path.join(updates, name), 'utf8');
  const start = html.search(/<main\b/i);
  const end = html.search(/<\/main\s*>/i);
  if (start < 0 || end <= start) {
    errors.push(name + ': missing main content boundaries');
    continue;
  }
  const content = html.slice(start, end);
  if (/<h[2-4]\b[^>]*>\s*Disclaimer\s*<\/h[2-4]>/i.test(content)
      || /\bclass\s*=\s*["'][^"']*\budyam-disclaimer\b/i.test(content)) {
    errors.push(name + ': page-local disclaimer block remains');
  }
  if (/\bclass\s*=\s*["'][^"']*\barticle-cta\b/i.test(content)) {
    errors.push(name + ': article CTA block remains');
  }
  if (/<div\b[^>]*class\s*=\s*["']hero-actions["'][^>]*>/i.test(content)) {
    errors.push(name + ': article-level enquiry actions remain');
  }
  if (/<a\b[^>]*href\s*=\s*["'][^"']*(?:case-enquiry\.html|wa\.me\/)[^"']*["'][^>]*>/i.test(content)) {
    errors.push(name + ': direct enquiry link inside editorial content');
  }
  const noteBlocks = content.match(/<div\b[^>]*class=["'][^"']*\barticle-note\b[^"']*["'][^>]*>[\s\S]*?<\/div>/gi) || [];
  if (noteBlocks.some(note => /\bnot legal advice\b|\bnot constitute legal advice\b/i.test(note))) {
    errors.push(name + ': duplicate disclaimer language remains in article-note');
  }
}
if (errors.length) {
  console.error('Article ending contract failed:\n' + errors.map(x => '- ' + x).join('\n'));
  process.exitCode = 1;
} else {
  console.log('Article ending contract passed: ' + pages.length
    + ' articles, one shared disclaimer, no page-local disclaimer/CTA/enquiry blocks.');
}
