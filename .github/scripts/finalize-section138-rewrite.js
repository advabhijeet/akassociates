#!/usr/bin/env node
"use strict";

const fs = require("fs");

const articlePath = "updates/section-138-cheque-bounce-limitation.html";
const registryPath = "assets/data/insights-registry.json";
const sitemapPath = "sitemap.xml";
const changelogPath = "CHANGELOG.md";
const href = "updates/section-138-cheque-bounce-limitation.html";
const canonical = `https://chambersofak.in/${href}`;

let article = fs.readFileSync(articlePath, "utf8");
article = article
  .replace("https://indiankanoon.org/doc/122083900/", "https://indiankanoon.org/doc/193064100/")
  .replace("https://indiankanoon.org/doc/174092972/", "https://indiankanoon.org/doc/78751072/");
fs.writeFileSync(articlePath, article, "utf8");

const registry = JSON.parse(fs.readFileSync(registryPath, "utf8"));
const item = registry.find((entry) => entry.href === href);
if (!item) throw new Error(`Missing Insights Registry entry: ${href}`);

Object.assign(item, {
  category: "Procedure Note",
  title: "Section 138 NI Act: cheque bounce ingredients and procedure",
  excerpt: "When cheque dishonour becomes an offence, the statutory timeline, Section 139 presumption, jurisdiction, company liability and settlement.",
  date: "May 2026",
  tags: [
    "NI Act",
    "Section 138",
    "Cheque Bounce",
    "Legally Enforceable Debt",
    "Section 139",
    "Demand Notice",
    "Limitation"
  ],
  thumbnail: "assets/img/citadel/citadel-thumb-cheque-bounce-notice-limitation-batch6-v2.jpg",
  cardThumbnail: "assets/img/citadel/cards/citadel-thumb-cheque-bounce-notice-limitation-batch6-v2-640.jpg"
});
fs.writeFileSync(registryPath, `${JSON.stringify(registry, null, 2)}\n`, "utf8");

let sitemap = fs.readFileSync(sitemapPath, "utf8");
const escapedCanonical = canonical.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const sitemapPattern = new RegExp(
  `<url>\\s*<loc>${escapedCanonical}</loc>\\s*<lastmod>[^<]+</lastmod>\\s*</url>`
);
if (!sitemapPattern.test(sitemap)) {
  throw new Error(`Could not locate sitemap entry: ${canonical}`);
}
sitemap = sitemap.replace(
  sitemapPattern,
  `<url><loc>${canonical}</loc><lastmod>2026-07-29</lastmod></url>`
);
fs.writeFileSync(sitemapPath, sitemap, "utf8");

const heading = "## 2026-07-29 IST - Rewrite Section 138 NI Act authority guide";
let changelog = fs.readFileSync(changelogPath, "utf8");
if (!changelog.includes(heading)) {
  const entry = [
    heading,
    "- Rewrote the established `updates/section-138-cheque-bounce-limitation.html` page as the principal Section 138 authority guide without creating a competing overview URL.",
    "- Separated the complete statutory ingredients and procedure from the narrower first-30-days, notice/service and post-summons articles.",
    "- Added legally enforceable debt, Sections 118 and 139 presumptions, security-cheque treatment, jurisdiction, company liability, interim compensation, compounding and appeal guidance.",
    "- Preserved the canonical URL, original publication date and approved article/card images while updating modification metadata and sitemap freshness.",
    "- Refreshed Insights Registry metadata and regenerated static Insights and RSS outputs.",
    "",
    ""
  ].join("\n");
  changelog = `${entry}${changelog}`;
  fs.writeFileSync(changelogPath, changelog, "utf8");
}

console.log("Section 138 production metadata applied.");
