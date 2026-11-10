#!/usr/bin/env node
/*
  Enforce the centralized Legal Insights editorial theme.
  New articles inherit assets/css/style.css via article.article-body.
  Legacy embedded styles are grandfathered temporarily; do not copy them.
*/
'use strict';
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');
const UPDATES = path.join(ROOT, 'updates');
const MAIN_CSS = path.join(ROOT, 'assets', 'css', 'style.css');
const UDYAM = 'updates/msme-registration-benefits-eligibility.html';

// Pre-existing inline CSS debt. Do not add files to this list for new content.
const LEGACY_INLINE_STYLES = new Set([
  'updates/cheque-bounce-30-days.html',
  'updates/arbitration-clause-checklist.html',
  'updates/msme-45-days-payment-rule.html',
  'updates/commercial-recovery-before-suit.html',
  'updates/cheque-bounce-notice-limitation.html',
  'updates/msme-samadhaan-filing-checklist.html',
  'updates/cheque-bounce-defence-after-summons.html',
  'updates/sabarimala-case-9-judge-bench-2026.html',
  'updates/prepare-msme-delayed-payment-claim.html',
  'updates/rera-execution-enforcement-after-order.html',
  'updates/rera-homebuyer-documents-before-complaint.html',
  'updates/uapa-bail-section-43d5-supreme-court-2026.html',
  'updates/pmla-complaint-pre-cognizance-hearing-bnss.html',
  'updates/rera-refund-vs-possession-document-review.html',
  'updates/property-title-search-before-purchase-india.html',
  'updates/section-19-msmed-act-75-percent-pre-deposit.html',
  'updates/rera-delayed-possession-complaint-checklist.html',
  'updates/msefc-notice-buyer-reply-defences-documents.html',
  'updates/msme-delayed-payment-vs-civil-suit-vs-arbitration.html',
  'updates/bihar-msefc-filing-procedure-msme-delayed-payment.html',
  'updates/delhi-msefc-filing-procedure-msme-delayed-payment.html',
  'updates/section-34-arbitration-limitation-3-months-30-days.html',
  'updates/msefc-jurisdiction-supplier-buyer-different-states.html',
  'updates/msme-interest-calculation-documents-caution-points.html',
  'updates/after-msefc-award-challenge-deposit-stay-enforcement.html',
  'updates/builder-buyer-agreement-clauses-before-rera-complaint.html',
  'updates/msme-limitation-period-section-18-conciliation-arbitration.html',
]);

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

let legacyCount = 0;
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
    if (!LEGACY_INLINE_STYLES.has(file) || embeddedStyleCount !== 1) {
      errors.push(file + ': do not add inline <style> blocks; move presentation to the shared theme.');
    } else {
      legacyCount += 1;
    }
  }
}
if (errors.length) {
  console.error('Shared article theme contract failed:\n' + errors.map((e) => '- ' + e).join('\n'));
  process.exitCode = 1;
} else {
  console.log('Shared article theme contract passed: ' + articleFiles.length
    + ' articles inherit the shared stylesheet; ' + legacyCount
    + ' grandfathered inline style blocks; one approved Udyam specialist stylesheet.');
}
