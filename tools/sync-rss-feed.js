"use strict";

const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const SITE = "https://chambersofak.in";
const REGISTRY_PATH = "assets/data/insights-registry.json";
const FEED_PATH = "feed.xml";
const CHECK_ONLY = process.argv.includes("--check");

function fullPath(relPath) {
  return path.join(ROOT, ...relPath.split("/"));
}

function read(relPath) {
  return fs.readFileSync(fullPath(relPath), "utf8");
}

function xmlEscape(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function absoluteUrl(value) {
  return new URL(String(value).replace(/^\/+/, ""), `${SITE}/`).href;
}

function imageMime(imagePath) {
  const extension = path.extname(imagePath).toLowerCase();
  if (extension === ".png") return "image/png";
  if (extension === ".webp") return "image/webp";
  if (extension === ".jpeg" || extension === ".jpg") return "image/jpeg";
  throw new Error(`Unsupported RSS image extension: ${imagePath}`);
}

function articleNode(value) {
  if (!value || typeof value !== "object") return null;

  const types = Array.isArray(value["@type"]) ? value["@type"] : [value["@type"]];
  if (types.includes("BlogPosting") || types.includes("Article") || types.includes("NewsArticle")) {
    return value;
  }

  if (Array.isArray(value)) {
    for (const item of value) {
      const match = articleNode(item);
      if (match) return match;
    }
    return null;
  }

  if (Array.isArray(value["@graph"])) {
    const match = articleNode(value["@graph"]);
    if (match) return match;
  }

  return null;
}

function readArticleMetadata(relPath) {
  const html = read(relPath);
  const blocks = [
    ...html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)
  ];

  for (const block of blocks) {
    const source = block[1].trim();
    if (!source) continue;

    let parsed;
    try {
      parsed = JSON.parse(source);
    } catch (error) {
      throw new Error(`${relPath}: invalid JSON-LD: ${error.message}`);
    }

    const match = articleNode(parsed);
    if (match) return match;
  }

  throw new Error(`${relPath}: BlogPosting/Article JSON-LD was not found.`);
}

function parseArticleDate(value, label) {
  if (!value) throw new Error(`${label}: date is missing.`);

  const source = String(value).trim();
  const normalized = /^\d{4}-\d{2}-\d{2}$/.test(source)
    ? `${source}T00:00:00+05:30`
    : source;
  const date = new Date(normalized);

  if (Number.isNaN(date.getTime())) {
    throw new Error(`${label}: invalid date ${source}`);
  }

  return date;
}

function renderItem(entry) {
  const categories = [entry.category, ...entry.tags]
    .filter(Boolean)
    .filter((value, index, values) => values.indexOf(value) === index);
  const imageUrl = absoluteUrl(entry.thumbnail);
  const cardImageUrl = absoluteUrl(entry.cardThumbnail || entry.thumbnail);
  const lines = [
    "  <item>",
    `    <title>${xmlEscape(entry.title)}</title>`,
    `    <link>${xmlEscape(entry.url)}</link>`,
    `    <guid isPermaLink="true">${xmlEscape(entry.url)}</guid>`,
    `    <description>${xmlEscape(entry.excerpt)}</description>`,
    `    <pubDate>${entry.published.toUTCString()}</pubDate>`,
  ];

  for (const category of categories) {
    lines.push(`    <category>${xmlEscape(category)}</category>`);
  }

  lines.push(
    `    <media:content url="${xmlEscape(imageUrl)}" medium="image" type="${imageMime(entry.thumbnail)}" width="1200" height="675" />`,
    `    <media:thumbnail url="${xmlEscape(cardImageUrl)}" width="640" height="360" />`,
    "  </item>"
  );

  return lines.join("\n");
}

function buildFeed() {
  const registry = JSON.parse(read(REGISTRY_PATH));
  if (!Array.isArray(registry) || registry.length === 0) {
    throw new Error("Insights registry must be a non-empty array.");
  }

  const seen = new Set();
  const entries = registry.map((item, registryIndex) => {
    const relPath = String(item.href || "").replace(/^\/+/, "");
    if (!relPath.startsWith("updates/") || !relPath.endsWith(".html")) {
      throw new Error(`Registry item has an invalid article href: ${item.href}`);
    }
    if (seen.has(relPath)) throw new Error(`Duplicate registry article: ${relPath}`);
    seen.add(relPath);

    const metadata = readArticleMetadata(relPath);
    const published = parseArticleDate(metadata.datePublished, `${relPath} datePublished`);
    const modified = parseArticleDate(metadata.dateModified || metadata.datePublished, `${relPath} dateModified`);

    if (!item.title || !item.excerpt || !item.category || !item.thumbnail) {
      throw new Error(`${relPath}: title, excerpt, category and thumbnail are required for RSS.`);
    }

    return {
      registryIndex,
      relPath,
      url: absoluteUrl(relPath),
      title: item.title,
      excerpt: item.excerpt,
      category: item.category,
      tags: Array.isArray(item.tags) ? item.tags : [],
      thumbnail: item.thumbnail,
      cardThumbnail: item.cardThumbnail,
      published,
      modified,
    };
  });

  entries.sort((left, right) => {
    const dateDifference = right.published.getTime() - left.published.getTime();
    return dateDifference || left.registryIndex - right.registryIndex;
  });

  const lastBuild = entries.reduce(
    (latest, entry) => entry.modified > latest ? entry.modified : latest,
    entries[0].modified
  );

  const items = entries.map(renderItem).join("\n");
  const feed = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:media="http://search.yahoo.com/mrss/">',
    "<channel>",
    "  <title>Chambers of AK Legal Updates</title>",
    `  <link>${SITE}/legal-updates.html</link>`,
    "  <description>Legal updates, procedural guides, case notes and document checklists from Chambers of AK.</description>",
    "  <language>en-IN</language>",
    `  <lastBuildDate>${lastBuild.toUTCString()}</lastBuildDate>`,
    `  <atom:link href="${SITE}/feed.xml" rel="self" type="application/rss+xml" />`,
    "  <generator>Chambers of AK Insights Registry</generator>",
    items,
    "</channel>",
    "</rss>",
    "",
  ].join("\n");

  return { feed, entries, lastBuild };
}

const { feed, entries, lastBuild } = buildFeed();

if (CHECK_ONLY) {
  const existing = read(FEED_PATH);
  if (existing !== feed) {
    console.error("feed.xml is out of sync with the Insights Registry or article JSON-LD.");
    console.error("Run: node tools/sync-rss-feed.js");
    process.exit(1);
  }

  console.log(`RSS feed synchronization passed: ${entries.length} articles; last build ${lastBuild.toUTCString()}.`);
} else {
  fs.writeFileSync(fullPath(FEED_PATH), feed, "utf8");
  console.log(`RSS feed regenerated: ${entries.length} articles; last build ${lastBuild.toUTCString()}.`);
}
