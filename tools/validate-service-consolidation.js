"use strict";

const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const SITE = "https://chambersofak.in";
const errors = [];

const redirects = new Map([
  [
    "services/cheque-bounce-lawyer-bihar.html",
    "services/cheque-bounce-lawyer-patna.html"
  ],
  [
    "services/property-dispute-lawyer-bihar.html",
    "services/property-dispute-lawyer-patna.html"
  ],
  [
    "services/civil-litigation-lawyer-bihar.html",
    "services/civil-litigation-lawyer-patna.html"
  ]
]);

const retained = new Map([
  [
    "services/cheque-bounce-lawyer-patna.html",
    ["Cheque Bounce Lawyer in Patna, Bihar", "Patna Base And Bihar Coverage", "Section 138"]
  ],
  [
    "services/cheque-bounce-lawyer-delhi-ncr.html",
    ["Cheque Bounce Lawyer in Delhi NCR", "Delhi NCR Location And Forum Record", "Ghaziabad"]
  ],
  [
    "services/property-dispute-lawyer-patna.html",
    ["Property Dispute Lawyer in Patna, Bihar", "Patna Records And Bihar Property Matters", "khesra"]
  ],
  [
    "services/civil-litigation-lawyer-patna.html",
    ["Civil Litigation Lawyer in Patna, Bihar", "Patna Base And Bihar Civil Matters", "valuation basis"]
  ],
  [
    "services/rera-lawyer-noida.html",
    ["UP RERA Portal Record", "https://www.up-rera.in/", "Greater Noida"]
  ],
  [
    "services/rera-lawyer-gurugram.html",
    ["HRERA Gurugram Authority Record", "https://haryanarera.gov.in/", "HRERA Panchkula"]
  ]
]);

function fullPath(relPath) {
  return path.join(ROOT, ...relPath.split("/"));
}

function read(relPath) {
  return fs.readFileSync(fullPath(relPath), "utf8");
}

function exists(relPath) {
  return fs.existsSync(fullPath(relPath));
}

function canonical(html) {
  return html.match(/<link\b[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["']/i)?.[1] || "";
}

function isNoindex(html) {
  return /<meta\b[^>]*name=["']robots["'][^>]*content=["'][^"']*noindex/i.test(html);
}

function sitemapUrls() {
  const xml = read("sitemap.xml");
  return new Set([...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1].trim()));
}

function publicHtmlFiles() {
  const output = [];

  for (const entry of fs.readdirSync(ROOT, { withFileTypes: true })) {
    if (
      entry.isFile() &&
      entry.name.endsWith(".html") &&
      entry.name !== "google3164979181871a1d.html" &&
      entry.name !== "theme-preview-citadel-of-ak.html"
    ) {
      output.push(entry.name);
    }
  }

  for (const dir of ["practice", "services", "updates"]) {
    const target = fullPath(dir);
    if (!fs.existsSync(target)) continue;

    for (const entry of fs.readdirSync(target, { withFileTypes: true })) {
      if (entry.isFile() && entry.name.endsWith(".html")) {
        output.push(`${dir}/${entry.name}`);
      }
    }
  }

  return output.sort();
}

function linksTo(html, pagePath, destination) {
  const pageUrl = new URL(pagePath, `${SITE}/`);
  const matches = [...html.matchAll(/\bhref=["']([^"']+)["']/gi)];

  return matches.some((match) => {
    const href = match[1];
    if (/^(?:mailto:|tel:|javascript:|#)/i.test(href)) return false;

    try {
      const resolved = new URL(href, pageUrl);
      return (
        resolved.origin === SITE &&
        resolved.pathname.replace(/^\/+/, "") === destination
      );
    } catch {
      return false;
    }
  });
}

const sitemap = sitemapUrls();

for (const [source, target] of redirects.entries()) {
  if (!exists(source)) {
    errors.push(`Redirect source is missing: ${source}`);
    continue;
  }

  if (!exists(target)) {
    errors.push(`Redirect target is missing: ${target}`);
    continue;
  }

  const html = read(source);
  const targetUrl = `${SITE}/${target}`;

  if (!isNoindex(html)) {
    errors.push(`${source}: redirect stub must remain noindex.`);
  }

  if (canonical(html) !== targetUrl) {
    errors.push(`${source}: redirect canonical must be ${targetUrl}.`);
  }

  if (!html.includes(`content="0; url=${targetUrl}"`)) {
    errors.push(`${source}: meta refresh target is missing or incorrect.`);
  }

  if (!html.includes(`window.location.replace('${targetUrl}')`)) {
    errors.push(`${source}: JavaScript redirect target is missing or incorrect.`);
  }

  if (sitemap.has(`${SITE}/${source}`)) {
    errors.push(`${source}: redirect source must not be in sitemap.xml.`);
  }

  if (!sitemap.has(targetUrl)) {
    errors.push(`${target}: retained canonical is missing from sitemap.xml.`);
  }
}

for (const [relPath, markers] of retained.entries()) {
  if (!exists(relPath)) {
    errors.push(`Retained service page is missing: ${relPath}`);
    continue;
  }

  const html = read(relPath);
  const expectedCanonical = `${SITE}/${relPath}`;

  if (isNoindex(html)) {
    errors.push(`${relPath}: retained service page must remain indexable.`);
  }

  if (canonical(html) !== expectedCanonical) {
    errors.push(`${relPath}: expected self-canonical ${expectedCanonical}.`);
  }

  if (!sitemap.has(expectedCanonical)) {
    errors.push(`${relPath}: retained service page is missing from sitemap.xml.`);
  }

  for (const marker of markers) {
    if (!html.includes(marker)) {
      errors.push(`${relPath}: required differentiating marker missing: ${marker}`);
    }
  }
}

for (const relPath of publicHtmlFiles()) {
  const html = read(relPath);

  if (!isNoindex(html) && html.includes("High Intent Search Page")) {
    errors.push(`${relPath}: internal SEO label remains visible: High Intent Search Page.`);
  }

  if (redirects.has(relPath)) continue;

  for (const source of redirects.keys()) {
    if (linksTo(html, relPath, source)) {
      errors.push(`${relPath}: internal link still points to consolidated redirect source ${source}.`);
    }
  }
}

console.log("Service-page consolidation validation summary:");
console.log(`- Redirect stubs checked: ${redirects.size}`);
console.log(`- Retained differentiated pages checked: ${retained.size}`);
console.log(`- Public HTML files checked: ${publicHtmlFiles().length}`);
console.log(`- Errors: ${errors.length}`);

if (errors.length) {
  console.log("\nErrors:");
  for (const error of errors) console.log(`- ${error}`);
  process.exit(1);
}

console.log("\nService-page consolidation validation passed.");
