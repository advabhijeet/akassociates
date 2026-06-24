const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();
const SITE = 'https://chambersofak.in';

const PUBLIC_DIRS = ['', 'practice', 'services', 'updates'];

const EXCLUDED_HTML_FILES = new Set([
  'google3164979181871a1d.html',
  'theme-preview-citadel-of-ak.html'
]);

const APPROVED_NON_INDEXABLE = new Map([
  [
    'services/msme-recovery-lawyer-delhi.html',
    {
      reason: 'Intentional noindex redirect stub to Delhi NCR MSME service page.',
      canonical: 'https://chambersofak.in/services/msme-recovery-lawyer-delhi-ncr.html'
    }
  ],]);

const errors = [];
const warnings = [];

const RERA_LEGALSERVICE_REQUIRED = new Set([
  'practice/rera-property.html',
  'services/rera-lawyer-patna.html',
  'services/rera-lawyer-noida.html',
  'services/rera-lawyer-gurugram.html',
  'services/rera-lawyer-bihar-up-delhi-ncr.html',
  'services/rera-refund-interest-lawyer.html',
  'services/rera-delayed-possession-lawyer.html'
]);


function rel(file) {
  return file.replace(ROOT + path.sep, '').replace(/\\/g, '/');
}

function read(file) {
  return fs.readFileSync(file, 'utf8');
}

function exists(relPath) {
  return fs.existsSync(path.join(ROOT, relPath));
}

function expectedUrl(relPath) {
  if (relPath === 'index.html') return `${SITE}/`;
  return `${SITE}/${relPath}`;
}

function urlToRel(url) {
  if (url === `${SITE}/`) return 'index.html';
  if (!url.startsWith(`${SITE}/`)) return null;
  return url.slice(`${SITE}/`.length);
}

function getAttrTags(html, tagName, attrName, attrValue) {
  const re = new RegExp(`<${tagName}\\b[^>]*${attrName}=["']${attrValue.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}["'][^>]*>`, 'gi');
  return html.match(re) || [];
}

function getFirstAttr(tag, attr) {
  const re = new RegExp(`${attr}=["']([^"']+)["']`, 'i');
  const m = tag.match(re);
  return m ? m[1] : null;
}

function findTagByName(html, name) {
  const tags = html.match(/<meta\b[^>]*>/gi) || [];
  return tags.filter((tag) => new RegExp(`\\bname=["']${name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}["']`, 'i').test(tag));
}

function findTagByProperty(html, property) {
  const tags = html.match(/<meta\b[^>]*>/gi) || [];
  return tags.filter((tag) => new RegExp(`\\bproperty=["']${property.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}["']`, 'i').test(tag));
}

function getMetaContentByName(html, name) {
  const tags = findTagByName(html, name);
  return tags.map((tag) => getFirstAttr(tag, 'content')).filter(Boolean);
}

function getMetaContentByProperty(html, property) {
  const tags = findTagByProperty(html, property);
  return tags.map((tag) => getFirstAttr(tag, 'content')).filter(Boolean);
}

function getCanonical(html) {
  const tags = html.match(/<link\b[^>]*rel=["']canonical["'][^>]*>/gi) || [];
  return tags.map((tag) => getFirstAttr(tag, 'href')).filter(Boolean);
}

function getTitles(html) {
  return html.match(/<title\b[^>]*>[\s\S]*?<\/title>/gi) || [];
}

function isNoindex(html) {
  return getMetaContentByName(html, 'robots').some((content) => /\bnoindex\b/i.test(content));
}

function isIndexable(html, relPath) {
  return !isNoindex(html) && !APPROVED_NON_INDEXABLE.has(relPath);
}

function getJsonLdBlocks(html) {
  const blocks = [];
  const re = /<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  let m;
  while ((m = re.exec(html))) {
    const raw = m[1].trim();
    try {
      blocks.push(JSON.parse(raw));
    } catch (err) {
      warnings.push(`${currentFileForWarning || 'unknown'}: JSON-LD parse warning: ${err.message}`);
    }
  }
  return blocks;
}

let currentFileForWarning = '';

function flattenJsonLd(node, out = []) {
  if (!node) return out;
  if (Array.isArray(node)) {
    node.forEach((item) => flattenJsonLd(item, out));
    return out;
  }
  if (typeof node === 'object') {
    out.push(node);
    if (node['@graph']) flattenJsonLd(node['@graph'], out);
  }
  return out;
}

function collectHtmlFiles() {
  const files = [];
  for (const dir of PUBLIC_DIRS) {
    const fullDir = path.join(ROOT, dir);
    if (!fs.existsSync(fullDir)) continue;
    for (const name of fs.readdirSync(fullDir)) {
      const full = path.join(fullDir, name);
      if (fs.statSync(full).isFile() && name.endsWith('.html')) {
        const relPath = path.join(dir, name).replace(/\\/g, '/');
        if (!EXCLUDED_HTML_FILES.has(relPath)) {
          files.push(full);
        }
      }
    }
  }
  return files.sort();
}

function parseSitemap() {
  const sitemapPath = path.join(ROOT, 'sitemap.xml');
  if (!fs.existsSync(sitemapPath)) {
    errors.push('sitemap.xml missing.');
    return new Set();
  }
  const xml = read(sitemapPath);
  const urls = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1].trim());
  const set = new Set(urls);

  for (const url of urls) {
    const relPath = urlToRel(url);
    if (!relPath) {
      errors.push(`sitemap.xml contains non-site URL: ${url}`);
      continue;
    }
    if (!exists(relPath)) {
      errors.push(`sitemap.xml URL has no matching file: ${url} -> ${relPath}`);
    }
  }

  return set;
}

function parseRegistry() {
  const registryPath = path.join(ROOT, 'assets/data/insights-registry.json');
  if (!fs.existsSync(registryPath)) {
    errors.push('assets/data/insights-registry.json missing.');
    return [];
  }

  let raw;
  try {
    raw = JSON.parse(read(registryPath));
  } catch (err) {
    errors.push(`Registry JSON parse error: ${err.message}`);
    return [];
  }

  const items = Array.isArray(raw) ? raw : (raw.items || raw.articles || raw.updates || raw.insights);
  if (!Array.isArray(items)) {
    errors.push('Could not find registry article array.');
    return [];
  }

  return items;
}

function parseFeedItems() {
  const feedPath = path.join(ROOT, 'feed.xml');
  if (!fs.existsSync(feedPath)) {
    errors.push('feed.xml missing.');
    return [];
  }
  const xml = read(feedPath);
  return [...xml.matchAll(/<link>(https:\/\/chambersofak\.in\/updates\/[^<]+)<\/link>/g)].map((m) => m[1]);
}

const sitemapUrls = parseSitemap();
const htmlFiles = collectHtmlFiles();
const canonicalUrls = new Map();

for (const file of htmlFiles) {
  const relPath = rel(file);
  const html = read(file);
  currentFileForWarning = relPath;

  const titleTags = getTitles(html);
  if (titleTags.length !== 1) {
    errors.push(`${relPath}: expected exactly one <title>, found ${titleTags.length}.`);
  }

  const canonicals = getCanonical(html);
  if (canonicals.length !== 1) {
    errors.push(`${relPath}: expected exactly one canonical, found ${canonicals.length}.`);
    continue;
  }

  const canonical = canonicals[0];
  canonicalUrls.set(relPath, canonical);

  const approved = APPROVED_NON_INDEXABLE.get(relPath);

  if (approved) {
    if (!isNoindex(html)) {
      errors.push(`${relPath}: approved exception should remain noindex.`);
    }
    if (canonical !== approved.canonical) {
      errors.push(`${relPath}: approved exception canonical mismatch. Expected ${approved.canonical}, found ${canonical}.`);
    }
    if (sitemapUrls.has(expectedUrl(relPath))) {
      errors.push(`${relPath}: approved noindex/cross-canonical exception must not be listed in sitemap.xml.`);
    }
    continue;
  }

  if (isNoindex(html)) {
    errors.push(`${relPath}: unexpected noindex robots tag.`);
  }

  const expected = expectedUrl(relPath);
  if (canonical !== expected) {
    errors.push(`${relPath}: canonical mismatch. Expected ${expected}, found ${canonical}.`);
  }

  const ogUrls = getMetaContentByProperty(html, 'og:url');
  if (ogUrls.length !== 1) {
    errors.push(`${relPath}: expected exactly one og:url, found ${ogUrls.length}.`);
  } else if (ogUrls[0] !== canonical) {
    errors.push(`${relPath}: og:url mismatch. Expected ${canonical}, found ${ogUrls[0]}.`);
  }

  if (!sitemapUrls.has(canonical)) {
    errors.push(`${relPath}: indexable canonical missing from sitemap.xml: ${canonical}`);
  }

  if (/href=["'][^"']*\/index\.html(?:[#?][^"']*)?["']/i.test(html)) {


  if (relPath.startsWith('services/') && isIndexable(html, relPath)) {
    const serviceJsonLd = flattenJsonLd(getJsonLdBlocks(html));
    const hasServiceLegalService = serviceJsonLd.some((item) => {
      const type = item['@type'];
      return type === 'LegalService' || (Array.isArray(type) && type.includes('LegalService'));
    });

    if (!hasServiceLegalService) {
      errors.push(`${relPath}: indexable service page missing LegalService JSON-LD.`);
    }

    const hasServiceFaqPage = serviceJsonLd.some((item) => {
      const type = item['@type'];
      return type === 'FAQPage' || (Array.isArray(type) && type.includes('FAQPage'));
    });

    if (!hasServiceFaqPage) {
      errors.push(`${relPath}: indexable service page missing FAQPage JSON-LD.`);
    }

    const hasServiceBreadcrumbList = serviceJsonLd.some((item) => {
      const type = item['@type'];
      return type === 'BreadcrumbList' || (Array.isArray(type) && type.includes('BreadcrumbList'));
    });

    if (!hasServiceBreadcrumbList) {
      errors.push(`${relPath}: indexable service page missing BreadcrumbList JSON-LD.`);
    }
  }

  if (RERA_LEGALSERVICE_REQUIRED.has(relPath) && isIndexable(html, relPath)) {
    const reraJsonLd = flattenJsonLd(getJsonLdBlocks(html));
    const hasLegalService = reraJsonLd.some((item) => {
      const type = item['@type'];
      return type === 'LegalService' || (Array.isArray(type) && type.includes('LegalService'));
    });

    if (!hasLegalService) {
      errors.push(`${relPath}: RERA page missing LegalService JSON-LD.`);
    }
  }

    errors.push(`${relPath}: internal link points to /index.html.`);
  }

  if (relPath.startsWith('updates/')) {
    const ogImage = getMetaContentByProperty(html, 'og:image');
    const ogWidth = getMetaContentByProperty(html, 'og:image:width');
    const ogHeight = getMetaContentByProperty(html, 'og:image:height');
    const twitterImage = getMetaContentByName(html, 'twitter:image');
    const articleModified = getMetaContentByProperty(html, 'article:modified_time');

    if (ogImage.length !== 1) errors.push(`${relPath}: expected exactly one og:image, found ${ogImage.length}.`);
    if (twitterImage.length !== 1) errors.push(`${relPath}: expected exactly one twitter:image, found ${twitterImage.length}.`);
    if (ogWidth[0] !== '1200') errors.push(`${relPath}: og:image:width should be 1200.`);
    if (ogHeight[0] !== '675') errors.push(`${relPath}: og:image:height should be 675.`);
    if (articleModified.length !== 1) warnings.push(`${relPath}: article:modified_time missing or duplicated.`);

    if (ogImage[0] && !/^https:\/\/chambersofak\.in\/assets\/img\/citadel\//.test(ogImage[0])) {
      errors.push(`${relPath}: article og:image should use assets/img/citadel, found ${ogImage[0]}.`);
    }

    if (ogImage[0] && twitterImage[0] && ogImage[0] !== twitterImage[0]) {
      errors.push(`${relPath}: twitter:image does not match og:image.`);
    }

    const jsonLd = flattenJsonLd(getJsonLdBlocks(html));
    const blogPosts = jsonLd.filter((item) => {
      const t = item['@type'];
      return t === 'BlogPosting' || (Array.isArray(t) && t.includes('BlogPosting'));
    });

    if (blogPosts.length < 1) {
      errors.push(`${relPath}: BlogPosting JSON-LD missing.`);
    } else {
      const hasImage = blogPosts.some((item) => Boolean(item.image));
      const hasDateModified = blogPosts.some((item) => Boolean(item.dateModified));
      if (!hasImage) errors.push(`${relPath}: BlogPosting JSON-LD image missing.`);
      if (!hasDateModified) errors.push(`${relPath}: BlogPosting JSON-LD dateModified missing.`);
    }
  }
}

const registryItems = parseRegistry();
for (const item of registryItems) {
  const href = item.href || item.url || item.path;
  const title = item.title || item.headline || item.name;
  const excerpt = item.excerpt || item.description || item.summary;
  const category = item.category || item.articleSection;
  const tags = item.tags;
  const thumbnail = item.thumbnail;

  if (!href) errors.push('Registry item missing href/url/path.');
  if (!title) errors.push(`Registry item missing title: ${href || '[unknown]'}`);
  if (!excerpt) errors.push(`Registry item missing excerpt/description: ${href || title || '[unknown]'}`);
  if (!category) errors.push(`Registry item missing category/articleSection: ${href || title || '[unknown]'}`);
  if (!Array.isArray(tags) || tags.length === 0) errors.push(`Registry item missing tags array: ${href || title || '[unknown]'}`);
  if (!thumbnail) errors.push(`Registry item missing thumbnail: ${href || title || '[unknown]'}`);

  if (href && !exists(href)) {
    errors.push(`Registry href has no matching file: ${href}`);
  }

  if (thumbnail && !exists(thumbnail)) {
    errors.push(`Registry thumbnail missing file: ${thumbnail}`);
  }
}

const feedLinks = new Set(parseFeedItems());
const registryUpdateLinks = registryItems
  .map((item) => item.href || item.url || item.path)
  .filter((href) => href && href.startsWith('updates/'))
  .map((href) => `${SITE}/${href}`);

for (const url of registryUpdateLinks) {
  if (!feedLinks.has(url)) {
    errors.push(`feed.xml missing registry article URL: ${url}`);
  }
}

console.log('Sitewide SEO validation summary:');
console.log(`- HTML files checked: ${htmlFiles.length}`);
console.log(`- Sitemap URLs checked: ${sitemapUrls.size}`);
console.log(`- Registry items checked: ${registryItems.length}`);
console.log(`- RSS update links checked: ${feedLinks.size}`);
console.log(`- Approved noindex exceptions: ${APPROVED_NON_INDEXABLE.size}`);
console.log(`- Warnings: ${warnings.length}`);
console.log(`- Errors: ${errors.length}`);

if (warnings.length) {
  console.log('\nWarnings:');
  for (const warning of warnings) console.log(`- ${warning}`);
}

if (errors.length) {
  console.log('\nErrors:');
  for (const error of errors) console.log(`- ${error}`);
  process.exit(1);
}

console.log('\nSitewide SEO validation passed.');
