const fs = require('fs');

const registryPath = 'assets/data/insights-registry.json';
const sitemapPath = 'sitemap.xml';
const changelogPath = 'CHANGELOG.md';

const href = 'updates/section-16-msmed-act-compound-interest.html';
const item = {
  href,
  category: 'Legal Update',
  title: 'Section 16 MSMED Act: compound interest on delayed payments',
  excerpt: 'Three times RBI Bank Rate, monthly rests, interest start dates, rate changes, part payments and invoice-wise statutory interest calculation.',
  date: 'August 2026',
  tags: [
    'MSME',
    'MSMED Act',
    'Section 16',
    'Compound Interest',
    'Monthly Rests',
    'Bank Rate',
    'Delayed Payment'
  ],
  thumbnail: 'assets/img/citadel/citadel-thumb-msme-45-days-payment-rule-batch6-v2.jpg',
  cardThumbnail: 'assets/img/citadel/cards/citadel-thumb-msme-45-days-payment-rule-batch6-v2-640.jpg'
};

const registry = JSON.parse(fs.readFileSync(registryPath, 'utf8'));
const existingIndex = registry.findIndex((entry) => entry.href === href);
if (existingIndex >= 0) registry.splice(existingIndex, 1);
registry.unshift(item);
fs.writeFileSync(registryPath, `${JSON.stringify(registry, null, 2)}\n`, 'utf8');

let sitemap = fs.readFileSync(sitemapPath, 'utf8');
const loc = `https://chambersofak.in/${href}`;
if (!sitemap.includes(`<loc>${loc}</loc>`)) {
  sitemap = sitemap.replace(
    '</urlset>',
    `<url><loc>${loc}</loc><lastmod>2026-08-01</lastmod></url></urlset>`
  );
} else {
  const escaped = loc.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  sitemap = sitemap.replace(
    new RegExp(`(<url><loc>${escaped}</loc><lastmod>)[^<]+(</lastmod></url>)`),
    '$12026-08-01$2'
  );
}
fs.writeFileSync(sitemapPath, sitemap, 'utf8');

const heading = '## 2026-08-01 IST - Publish Section 16 MSMED compound interest guide';
let changelog = fs.readFileSync(changelogPath, 'utf8');
if (!changelog.includes(heading)) {
  const entry = `${heading}\n` +
    `- Published \`${href}\` as a standalone Section 16 authority page without replacing the Section 15 payment-deadline or MSEFC procedure pages.\n` +
    `- Explained three times RBI Bank Rate, monthly rests, rate-period segmentation, invoice-wise start dates, part payments and transparent calculation assumptions.\n` +
    `- Added Section 22 disclosure, Section 23 tax treatment, Section 19 pre-deposit and practical supplier/buyer evidence checklists.\n` +
    `- Reused the approved Section 15 article/card images and added the page to the Insights Registry and sitemap.\n` +
    `- Regenerated homepage/Insights static cards and the registry-driven RSS feed.\n\n`;
  changelog = entry + changelog;
}
fs.writeFileSync(changelogPath, changelog, 'utf8');

console.log('Section 16 publication metadata applied.');
