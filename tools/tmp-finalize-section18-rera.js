#!/usr/bin/env node
"use strict";

const fs = require("fs");

const targetHref = "updates/rera-refund-interest-delayed-possession.html";
const targetUrl = `https://chambersofak.in/${targetHref}`;

const registryPath = "assets/data/insights-registry.json";
const sitemapPath = "sitemap.xml";
const changelogPath = "CHANGELOG.md";

const registry = JSON.parse(fs.readFileSync(registryPath, "utf8"));
const entry = registry.find((item) => item.href === targetHref);

if (!entry) {
  throw new Error(`Registry entry not found: ${targetHref}`);
}

Object.assign(entry, {
  category: "Practical Guide",
  title: "Section 18 RERA Act: refund, interest and delayed possession",
  excerpt: "When delayed possession supports refund, monthly interest or compensation, how prescribed rates apply, and which documents establish the claim.",
  date: "May 2026",
  tags: [
    "RERA",
    "Section 18",
    "Delayed Possession",
    "Refund",
    "Interest",
    "Compensation",
    "Occupancy Certificate"
  ],
  thumbnail: "assets/img/citadel/citadel-thumb-rera-refund-interest-delayed-possession-batch6-v2.jpg",
  cardThumbnail: "assets/img/citadel/cards/citadel-thumb-rera-refund-interest-delayed-possession-batch6-v2-640.jpg"
});

fs.writeFileSync(registryPath, `${JSON.stringify(registry, null, 2)}\n`, "utf8");

let sitemap = fs.readFileSync(sitemapPath, "utf8");
const escapedUrl = targetUrl.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const sitemapPattern = new RegExp(`(<url><loc>${escapedUrl}<\\/loc><lastmod>)([^<]+)(<\\/lastmod><\\/url>)`);

if (!sitemapPattern.test(sitemap)) {
  throw new Error(`Sitemap entry not found: ${targetUrl}`);
}

sitemap = sitemap.replace(sitemapPattern, `$12026-07-29$3`);
fs.writeFileSync(sitemapPath, sitemap, "utf8");

const heading = "## 2026-07-29 IST - Rewrite Section 18 RERA relief guide";
let changelog = fs.readFileSync(changelogPath, "utf8");

if (!changelog.includes(heading)) {
  const block = [
    heading,
    "- Rewrote the established `updates/rera-refund-interest-delayed-possession.html` page as the principal Section 18 authority guide without creating a competing overview URL.",
    "- Distinguished refund with prescribed interest, monthly delay interest for an allottee who remains in the project, and separately adjudicated compensation.",
    "- Added payment-wise interest guidance, possession and occupancy-certificate review, promoter/allottee default analysis, forum choice and current Supreme Court authorities.",
    "- Preserved the canonical URL, original publication date and approved article/card images while updating modification metadata and sitemap freshness.",
    "- Refreshed Insights Registry metadata and regenerated static Insights and RSS outputs.",
    ""
  ].join("\n");
  changelog = `${block}\n${changelog}`;
  fs.writeFileSync(changelogPath, changelog, "utf8");
}

console.log("Section 18 registry, sitemap and changelog metadata updated.");
