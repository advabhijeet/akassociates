#!/usr/bin/env node
/*
  Chambers of AK - Phase 3 article structure and thumbnail audit.

  Audit-only tool. It does not modify article files.

  Usage:
    node tools/audit-articles-structure.js
    node tools/audit-articles-structure.js --markdown
    node tools/audit-articles-structure.js --json
    node tools/audit-articles-structure.js --write
    node tools/audit-articles-structure.js --strict
*/
const fs = require('fs');
const path = require('path');

const root = process.cwd();
const updatesDir = path.join(root, 'updates');
const registryPath = path.join(root, 'assets', 'data', 'insights-registry.json');
const reportPath = path.join(root, 'docs', 'maintenance', 'audits', 'ARTICLE_STRUCTURE_THUMBNAIL_AUDIT_REPORT.generated.md');

const args = new Set(process.argv.slice(2));
const outputJson = args.has('--json');
const outputMarkdown = args.has('--markdown') || args.has('--write');
const writeReport = args.has('--write');
const strict = args.has('--strict');

const read = (file) => fs.readFileSync(file, 'utf8');
const rel = (file) => path.relative(root, file).replace(/\\/g, '/');

const walk = (dir) => {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : full;
  });
};

const normalizePath = (value) => String(value || '')
  .trim()
  .replace(/^https?:\/\/[^/]+/i, '')
  .replace(/^\/+/, '')
  .replace(/^akassociates\//i, '')
  .replace(/^\.\//, '')
  .replace(/^\.\.\//, '')
  .replace(/[?#].*$/, '')
  .replace(/\\/g, '/');

const normalizeAsset = (value) => normalizePath(value)
  .replace(/^assets\//, 'assets/')
  .replace(/^updates\/\.\.\//, '');

const decodeHtml = (value) => String(value || '')
  .replace(/&amp;/g, '&')
  .replace(/&quot;/g, '"')
  .replace(/&#39;/g, "'")
  .replace(/&lt;/g, '<')
  .replace(/&gt;/g, '>');

const stripTags = (value) => decodeHtml(String(value || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim());

const countMatches = (text, re) => (text.match(re) || []).length;

const getFirst = (html, re) => {
  const match = html.match(re);
  return match ? decodeHtml(match[1] || '') : '';
};

const metaContent = (html, key) => {
  const escaped = key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const propertyRe = new RegExp(`<meta\\s+[^>]*\\bproperty=["']${escaped}["'][^>]*\\bcontent=["']([^"']*)["'][^>]*>`, 'i');
  const propertyReverseRe = new RegExp(`<meta\\s+[^>]*\\bcontent=["']([^"']*)["'][^>]*\\bproperty=["']${escaped}["'][^>]*>`, 'i');
  const nameRe = new RegExp(`<meta\\s+[^>]*\\bname=["']${escaped}["'][^>]*\\bcontent=["']([^"']*)["'][^>]*>`, 'i');
  const nameReverseRe = new RegExp(`<meta\\s+[^>]*\\bcontent=["']([^"']*)["'][^>]*\\bname=["']${escaped}["'][^>]*>`, 'i');
  return getFirst(html, propertyRe) || getFirst(html, propertyReverseRe) || getFirst(html, nameRe) || getFirst(html, nameReverseRe);
};

const canonicalHref = (html) => getFirst(html, /<link\s+[^>]*\brel=["']canonical["'][^>]*\bhref=["']([^"']+)["'][^>]*>/i)
  || getFirst(html, /<link\s+[^>]*\bhref=["']([^"']+)["'][^>]*\brel=["']canonical["'][^>]*>/i);

const scriptJsonLdBlocks = (html) => html.match(/<script\s+type=["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>/gi) || [];

const parseJsonLd = (html, fileLabel, warnings) => scriptJsonLdBlocks(html).map((script, index) => {
  const text = script.replace(/^<script[^>]*>/i, '').replace(/<\/script>$/i, '').trim();
  try {
    return JSON.parse(text);
  } catch (error) {
    warnings.push(`${fileLabel}: JSON-LD block ${index + 1} could not be parsed: ${error.message}`);
    return null;
  }
}).filter(Boolean);

const jsonLdTypes = (node) => {
  if (!node) return [];
  if (Array.isArray(node)) return node.flatMap(jsonLdTypes);
  if (typeof node !== 'object') return [];

  const ownType = node['@type'];
  const types = Array.isArray(ownType) ? ownType : (ownType ? [ownType] : []);

  if (Array.isArray(node['@graph'])) {
    return types.concat(node['@graph'].flatMap(jsonLdTypes));
  }

  return types;
};

const jsonLdImages = (node) => {
  if (!node) return [];
  if (Array.isArray(node)) return node.flatMap(jsonLdImages);
  if (typeof node !== 'object') return [];

  const images = [];
  if (typeof node.image === 'string') images.push(node.image);
  if (Array.isArray(node.image)) images.push(...node.image.filter((item) => typeof item === 'string'));
  if (node.image && typeof node.image === 'object' && typeof node.image.url === 'string') images.push(node.image.url);
  if (Array.isArray(node['@graph'])) images.push(...node['@graph'].flatMap(jsonLdImages));
  return images;
};

const imageLooksGeneric = (value) => {
  const image = normalizeAsset(value).toLowerCase();
  if (!image) return true;
  return /(?:placeholder|default|generic|logo|og-default|social-preview|citadel-tribunal-room|favicon)/i.test(image);
};

const assetExists = (value) => {
  const normalized = normalizeAsset(value);
  if (!normalized || /^https?:/i.test(value) || /^data:/i.test(value)) return true;
  return fs.existsSync(path.join(root, normalized));
};

const mojibakePatterns = [
  /\u00C3/g,
  /\u00C2/g,
  /\u00E2/g,
  /\uFFFD/g,
];

const hasMojibake = (html) => mojibakePatterns.some((re) => {
  re.lastIndex = 0;
  return re.test(html);
});

const internalNoteRe = /(?:TODO|FIXME|INTERNAL|DRAFT|research-status|article-status|publication-status|do not publish|private note)/i;
const lastUpdatedRe = /(?:Last\s+updated\s+on|article-last-updated|Updated\s+\d{1,2}\s+[A-Z][a-z]+\s+\d{4}|Updated\s+\d{1,2}\/\d{1,2}\/\d{4})/i;
const referencesRe = /(?:<h2[^>]*>\s*(?:References|Sources|Legal Sources)|class=["'][^"']*references-list\b|References\s*\/\s*Sources)/i;
const disclaimerRe = /(?:disclaimer|not\s+legal\s+advice|general\s+information|for\s+informational\s+purposes)/i;

const batch6Priority = new Set([
  'updates/arbitration-clause-checklist.html',
  'updates/cheque-bounce-30-days.html',
  'updates/cheque-bounce-defence-after-summons.html',
  'updates/cheque-bounce-notice-limitation.html',
  'updates/commercial-recovery-before-suit.html',
  'updates/msme-45-days-payment-rule.html',
  'updates/rera-refund-interest-delayed-possession.html',
]);

const readRegistry = () => {
  if (!fs.existsSync(registryPath)) return { registry: [], errors: [`Missing registry: ${rel(registryPath)}`] };
  try {
    const parsed = JSON.parse(read(registryPath));
    if (!Array.isArray(parsed)) return { registry: [], errors: ['assets/data/insights-registry.json must contain an array'] };
    return { registry: parsed, errors: [] };
  } catch (error) {
    return { registry: [], errors: [`Could not parse assets/data/insights-registry.json: ${error.message}`] };
  }
};

const { registry, errors: registryErrors } = readRegistry();
const warnings = [];
const errors = [...registryErrors];

const registryByHref = new Map(registry.map((item) => [normalizePath(item && item.href), item]));
const articleFiles = walk(updatesDir).filter((file) => file.endsWith('.html')).sort();
const articleHrefs = new Set(articleFiles.map((file) => normalizePath(rel(file))));

const auditArticle = (file) => {
  const href = normalizePath(rel(file));
  const html = read(file);
  const registryItem = registryByHref.get(href) || null;
  const jsonLd = parseJsonLd(html, href, warnings);
  const jsonTypes = jsonLd.flatMap(jsonLdTypes).map((type) => String(type).toLowerCase());
  const jsonImages = jsonLd.flatMap(jsonLdImages);

  const title = stripTags(getFirst(html, /<title[^>]*>([\s\S]*?)<\/title>/i));
  const h1 = stripTags(getFirst(html, /<h1[^>]*>([\s\S]*?)<\/h1>/i));
  const ogImage = metaContent(html, 'og:image');
  const twitterImage = metaContent(html, 'twitter:image');
  const registryThumbnail = registryItem?.thumbnail || registryItem?.thumb || '';
  const canonical = canonicalHref(html);
  const articleBody = /<article\b[^>]*class=["'][^"']*\barticle-body\b[^"']*["'][^>]*>/i.test(html);
  const hasArticleTag = /<article\b/i.test(html);
  const hasDataCategory = /\bdata-article-category=["'][^"']+["']/i.test(html);
  const hasDataTags = /\bdata-article-tags=["'][^"']+["']/i.test(html);
  const featuredFigure = /\barticle-featured-figure\b/i.test(html);
  const blogPostingCount = jsonTypes.filter((type) => type === 'blogposting' || type === 'article').length;
  const breadcrumbCount = jsonTypes.filter((type) => type === 'breadcrumblist').length;
  const lastUpdated = lastUpdatedRe.test(html);
  const references = referencesRe.test(html);
  const disclaimer = disclaimerRe.test(html);
  const internalNote = internalNoteRe.test(html);
  const mojibake = hasMojibake(html);

  const imageFields = [ogImage, twitterImage, registryThumbnail, ...jsonImages].filter(Boolean);
  const svgImage = imageFields.some((image) => /\.svg(?:[?#]|$)/i.test(image));
  const genericImage = !imageFields.length || imageFields.some(imageLooksGeneric);
  const missingImageAsset = imageFields.filter((image) => !assetExists(image));

  const issues = [];
  if (!registryItem) issues.push('missing-registry-entry');
  if (!hasArticleTag) issues.push('missing-article-tag');
  if (!articleBody) issues.push('missing-article-body');
  if (!hasDataCategory) issues.push('missing-data-article-category');
  if (!hasDataTags) issues.push('missing-data-article-tags');
  if (!featuredFigure) issues.push('missing-inline-featured-figure');
  if (!ogImage) issues.push('missing-og-image');
  if (!twitterImage) issues.push('missing-twitter-image');
  if (!registryThumbnail) issues.push('missing-registry-thumbnail');
  if (blogPostingCount !== 1) issues.push(`blogposting-count-${blogPostingCount}`);
  if (breadcrumbCount !== 1) issues.push(`breadcrumb-count-${breadcrumbCount}`);
  if (!lastUpdated) issues.push('missing-visible-last-updated');
  if (!references) issues.push('missing-references-or-sources');
  if (!disclaimer) issues.push('missing-reader-disclaimer');
  if (internalNote) issues.push('possible-public-internal-note');
  if (mojibake) issues.push('possible-encoding-mojibake');
  if (svgImage) issues.push('svg-social-image');
  if (genericImage) issues.push('generic-or-missing-social-image');
  if (missingImageAsset.length) issues.push('missing-local-image-asset');

  const category = (() => {
    if (batch6Priority.has(href)) return 'Batch 4A - Batch 6 metadata/social/thumbnail priority';
    if (!articleBody || !hasDataCategory || !hasDataTags) return 'Batch 4B - old-structure/Citadel hook migration';
    if (blogPostingCount !== 1 || breadcrumbCount !== 1) return 'Batch 4D - JSON-LD/breadcrumb parity';
    if (!lastUpdated || !references || !disclaimer) return 'Batch 4C - last-updated/references/disclaimer normalization';
    if (!featuredFigure || !registryThumbnail || !ogImage || !twitterImage || genericImage || svgImage) return 'Batch 4A/B - thumbnail/featured-image normalization';
    return 'Clean / current structure reference';
  })();

  return {
    file: href,
    title,
    h1,
    registry: Boolean(registryItem),
    registryTitle: registryItem?.title || '',
    registryThumbnail,
    canonical,
    articleBody,
    hasDataCategory,
    hasDataTags,
    featuredFigure,
    ogImage,
    twitterImage,
    jsonLdImages: [...new Set(jsonImages)],
    blogPostingCount,
    breadcrumbCount,
    lastUpdated,
    references,
    disclaimer,
    internalNote,
    mojibake,
    svgImage,
    genericImage,
    missingImageAsset,
    issues,
    category,
  };
};

const results = articleFiles.map(auditArticle);

registry.forEach((item, index) => {
  const href = normalizePath(item && item.href);
  if (!href) {
    errors.push(`Registry item ${index + 1} has no href`);
    return;
  }
  if (!articleHrefs.has(href)) errors.push(`Registry href points to missing article file: ${href}`);
});

const counts = results.reduce((acc, item) => {
  acc[item.category] = (acc[item.category] || 0) + 1;
  return acc;
}, {});

const markdownEscape = (value) => String(value || '').replace(/\|/g, '\\|').replace(/\n/g, ' ');
const icon = (value) => (value ? 'yes' : 'no');

const toMarkdown = () => {
  const lines = [];
  lines.push('# Generated Article Structure Audit Report');
  lines.push('');
  lines.push('Generated by `node tools/audit-articles-structure.js --write`.');
  lines.push('');
  lines.push('## Summary');
  lines.push('');
  lines.push(`- Article files checked: ${results.length}`);
  lines.push(`- Registry entries checked: ${registry.length}`);
  lines.push(`- Registry/file errors: ${errors.length}`);
  lines.push(`- JSON-LD parse warnings: ${warnings.length}`);
  lines.push('');
  lines.push('## Classification Counts');
  lines.push('');
  Object.entries(counts).sort((a, b) => a[0].localeCompare(b[0])).forEach(([category, count]) => {
    lines.push(`- ${category}: ${count}`);
  });
  lines.push('');
  lines.push('## Article Table');
  lines.push('');
  lines.push('| File | Category | Registry | Body | Cat | Tags | Figure | OG | TW | BlogPosting | Breadcrumb | Updated | Sources | Disclaimer | Issues |');
  lines.push('| --- | --- | --- | --- | --- | --- | --- | --- | --- | ---: | ---: | --- | --- | --- | --- |');
  results.forEach((item) => {
    lines.push(`| ${markdownEscape(item.file)} | ${markdownEscape(item.category)} | ${icon(item.registry)} | ${icon(item.articleBody)} | ${icon(item.hasDataCategory)} | ${icon(item.hasDataTags)} | ${icon(item.featuredFigure)} | ${icon(Boolean(item.ogImage))} | ${icon(Boolean(item.twitterImage))} | ${item.blogPostingCount} | ${item.breadcrumbCount} | ${icon(item.lastUpdated)} | ${icon(item.references)} | ${icon(item.disclaimer)} | ${markdownEscape(item.issues.join(', '))} |`);
  });
  lines.push('');
  lines.push('## Registry/File Errors');
  lines.push('');
  if (errors.length) errors.forEach((error) => lines.push(`- ${error}`));
  else lines.push('- None.');
  lines.push('');
  lines.push('## Warnings');
  lines.push('');
  if (warnings.length) warnings.forEach((warning) => lines.push(`- ${warning}`));
  else lines.push('- None.');
  lines.push('');
  return `${lines.join('\n')}\n`;
};

const report = {
  summary: {
    articleFiles: results.length,
    registryEntries: registry.length,
    errors: errors.length,
    warnings: warnings.length,
    counts,
  },
  errors,
  warnings,
  articles: results,
};

if (writeReport) {
  fs.mkdirSync(path.dirname(reportPath), { recursive: true });
  fs.writeFileSync(reportPath, toMarkdown(), 'utf8');
}

if (outputJson) {
  console.log(JSON.stringify(report, null, 2));
} else if (outputMarkdown) {
  process.stdout.write(toMarkdown());
} else {
  console.log('Article structure audit summary:');
  console.log(`- Article files checked: ${results.length}`);
  console.log(`- Registry entries checked: ${registry.length}`);
  Object.entries(counts).sort((a, b) => a[0].localeCompare(b[0])).forEach(([category, count]) => {
    console.log(`- ${category}: ${count}`);
  });
  if (errors.length) {
    console.log('Registry/file errors:');
    errors.forEach((error) => console.log(`- ${error}`));
  }
  if (warnings.length) {
    console.log('Warnings:');
    warnings.forEach((warning) => console.log(`- ${warning}`));
  }
  console.log('Run with --markdown or --json for full output. Run with --write to generate the markdown report file.');
}

if (strict && errors.length) process.exit(1);
