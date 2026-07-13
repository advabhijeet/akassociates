#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");

const root = process.cwd();
const checkOnly = process.argv.includes("--check");

const files = {
  registry: "assets/data/insights-registry.json",
  homepage: "index.html",
  insights: "legal-updates.html"
};

function absolute(relPath) {
  return path.join(root, ...relPath.split("/"));
}

function read(relPath) {
  return fs.readFileSync(absolute(relPath), "utf8");
}

function write(relPath, value) {
  fs.writeFileSync(absolute(relPath), value, "utf8");
}

function detectEol(value) {
  return value.includes("\r\n") ? "\r\n" : "\n";
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function escapeAttribute(value) {
  return escapeHtml(value)
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function normalize(value) {
  return String(value ?? "").replace(/\s+/g, " ").trim();
}

function normalizeKey(value) {
  return normalize(value).toLowerCase();
}

function splitList(value) {
  return normalize(value)
    .split(/[|,]/)
    .map(normalize)
    .filter(Boolean);
}

function categoryClass(category) {
  const value = normalizeKey(category);

  if (value.includes("case")) return "tag-case-brief";
  if (value.includes("checklist")) return "tag-checklist";
  if (value.includes("procedure")) return "tag-procedure";
  if (value.includes("guide")) return "tag-guide";

  return "tag-legal-update";
}

function dateScore(item) {
  const raw = normalize(
    item.dateModified ||
    item.modified ||
    item.datePublished ||
    item.published ||
    item.date
  );

  if (!raw) return 0;

  const parsed = Date.parse(raw);

  if (!Number.isNaN(parsed)) {
    return parsed;
  }

  const monthMap = {
    january: 0,
    february: 1,
    march: 2,
    april: 3,
    may: 4,
    june: 5,
    july: 6,
    august: 7,
    september: 8,
    october: 9,
    november: 10,
    december: 11
  };

  const match = raw
    .toLowerCase()
    .match(/\b(january|february|march|april|may|june|july|august|september|october|november|december)\s+(20\d{2})\b/);

  if (!match) return 0;

  return Date.UTC(Number(match[2]), monthMap[match[1]], 1);
}

function latestForHomepage(items) {
  return items
    .map((item, index) => ({
      item,
      index,
      score: dateScore(item)
    }))
    .sort((first, second) => {
      if (second.score !== first.score) {
        return second.score - first.score;
      }

      return first.index - second.index;
    })
    .map((entry) => entry.item);
}

function findElementRange(
  html,
  tagName,
  openingTagPredicate,
  startAt = 0,
  stopAt = html.length
) {
  const openingExpression = new RegExp(`<${tagName}\\b[^>]*>`, "gi");
  openingExpression.lastIndex = startAt;

  let openingMatch;

  while (
    (openingMatch = openingExpression.exec(html)) &&
    openingMatch.index < stopAt
  ) {
    if (
      openingTagPredicate &&
      !openingTagPredicate(openingMatch[0])
    ) {
      continue;
    }

    const openingStart = openingMatch.index;
    const openingEnd = openingExpression.lastIndex;
    const elementExpression = new RegExp(
      `<\\/?${tagName}\\b[^>]*>`,
      "gi"
    );

    elementExpression.lastIndex = openingStart;

    let depth = 0;
    let elementMatch;

    while (
      (elementMatch = elementExpression.exec(html)) &&
      elementMatch.index < stopAt
    ) {
      const isClosing = /^<\//.test(elementMatch[0]);

      depth += isClosing ? -1 : 1;

      if (depth === 0) {
        return {
          openingStart,
          openingEnd,
          closingStart: elementMatch.index,
          closingEnd: elementExpression.lastIndex,
          openingTag: openingMatch[0]
        };
      }
    }

    throw new Error(
      `Could not find closing </${tagName}> for element beginning at ${openingStart}.`
    );
  }

  return null;
}

function replaceElementContent(
  html,
  range,
  markerName,
  bodyFactory
) {
  if (!range) {
    throw new Error(`Missing HTML target for ${markerName}.`);
  }

  const eol = detectEol(html);
  const lineStart = html.lastIndexOf("\n", range.openingStart - 1) + 1;
  const openingIndent = html
    .slice(lineStart, range.openingStart)
    .replace(/\r/g, "");

  const childIndent = `${openingIndent}  `;
  const body = bodyFactory(childIndent, eol);

  const replacement = [
    "",
    `${childIndent}<!-- STATIC_INSIGHTS:${markerName}:START -->`,
    body,
    `${childIndent}<!-- STATIC_INSIGHTS:${markerName}:END -->`,
    openingIndent
  ].join(eol);

  return (
    html.slice(0, range.openingEnd) +
    replacement +
    html.slice(range.closingStart)
  );
}

function renderCard(item, indent, eol, options = {}) {
  const classes = [
    "update-item",
    "update-item-link",
    "static-insight-card"
  ];

  if (options.home) {
    classes.push("home-latest-card");
  }

  const tags = Array.isArray(item.tags)
    ? item.tags.map(normalize).filter(Boolean)
    : [];

  const thumbnail = normalize(item.thumbnail || item.thumb);
  const lines = [];

  lines.push(
    `${indent}<a class="${classes.join(" ")}" href="${escapeAttribute(item.href)}" data-static-insight-card="true" data-category="${escapeAttribute(item.category)}" data-tags="${escapeAttribute(tags.join(", "))}"${thumbnail ? ` data-thumb="${escapeAttribute(thumbnail)}"` : ""}>`
  );

  if (thumbnail) {
    lines.push(
      `${indent}  <span class="insight-card-media" aria-hidden="true"><img class="insight-card-image" src="${escapeAttribute(thumbnail)}" alt="" loading="lazy" decoding="async"></span>`
    );
  }

  lines.push(
    `${indent}  <span class="update-tag ${categoryClass(item.category)}">${escapeHtml(item.category || "Insight")}</span>`
  );
  lines.push(
    `${indent}  <div class="update-title">${escapeHtml(item.title)}</div>`
  );
  lines.push(
    `${indent}  <div class="update-excerpt">${escapeHtml(item.excerpt)}</div>`
  );
  lines.push(
    `${indent}  <div class="update-date">${escapeHtml(item.date)}</div>`
  );
  lines.push(
    `${indent}  <div class="insight-card-tags" aria-label="Article tags">`
  );

  tags.slice(0, options.home ? 4 : 5).forEach((tag) => {
    lines.push(`${indent}    <span>${escapeHtml(tag)}</span>`);
  });

  lines.push(`${indent}  </div>`);
  lines.push(`${indent}</a>`);

  return lines.join(eol);
}

function renderCards(items, indent, eol, options = {}) {
  return items
    .map((item) => renderCard(item, indent, eol, options))
    .join(eol);
}

function listContainsAny(candidateValues, acceptedValues) {
  const candidateSet = new Set(
    candidateValues.map(normalizeKey)
  );

  return acceptedValues.some((value) =>
    candidateSet.has(normalizeKey(value))
  );
}

function filterSectionItems(items, config) {
  const acceptedCategories = splitList(config.categories || "");
  const acceptedTags = splitList(config.tags || "");
  const excludedCategories = splitList(
    config.excludeCategories || ""
  );
  const excludedTags = splitList(config.excludeTags || "");

  return items.filter((item) => {
    const category = normalize(item.category);
    const tags = Array.isArray(item.tags)
      ? item.tags.map(normalize)
      : [];

    if (
      acceptedCategories.length &&
      !listContainsAny([category], acceptedCategories)
    ) {
      return false;
    }

    if (
      acceptedTags.length &&
      !listContainsAny(tags, acceptedTags)
    ) {
      return false;
    }

    if (
      excludedCategories.length &&
      listContainsAny([category], excludedCategories)
    ) {
      return false;
    }

    if (
      excludedTags.length &&
      listContainsAny(tags, excludedTags)
    ) {
      return false;
    }

    return true;
  });
}

function syncHomepage(html, items) {
  const grid = findElementRange(
    html,
    "div",
    (openingTag) =>
      openingTag.includes("data-home-insights-auto") &&
      openingTag.includes("data-home-insights-limit")
  );

  const selected = latestForHomepage(items).slice(0, 3);

  return {
    html: replaceElementContent(
      html,
      grid,
      "HOME_LATEST",
      (indent, eol) =>
        renderCards(selected, indent, eol, { home: true })
    ),
    count: selected.length
  };
}

function findBlogSection(html, matcher) {
  return findElementRange(
    html,
    "section",
    (openingTag) =>
      openingTag.includes("data-citadel-blog-section") &&
      matcher(openingTag)
  );
}

function syncBlogGrid(
  html,
  markerName,
  sectionMatcher,
  selected
) {
  const section = findBlogSection(html, sectionMatcher);

  if (!section) {
    throw new Error(
      `Could not locate Legal Insights section ${markerName}.`
    );
  }

  const grid = findElementRange(
    html,
    "div",
    (openingTag) =>
      openingTag.includes("data-citadel-blog-grid"),
    section.openingEnd,
    section.closingStart
  );

  return replaceElementContent(
    html,
    grid,
    markerName,
    (indent, eol) =>
      renderCards(selected, indent, eol)
  );
}

function renderStaticIndexItem(item, indent) {
  const tags = Array.isArray(item.tags)
    ? item.tags.map(normalize).filter(Boolean).slice(0, 4)
    : [];

  const metadata = [
    normalize(item.category),
    tags.join(", ")
  ].filter(Boolean).join(" &middot; ");

  return `${indent}<li data-static-insights-entry="true"><a href="${escapeAttribute(item.href)}">${escapeHtml(item.title)}</a>${metadata ? `<span> &mdash; ${metadata}</span>` : ""}</li>`;
}

function syncStaticIndex(html, items) {
  const section = findElementRange(
    html,
    "section",
    (openingTag) =>
      openingTag.includes("data-static-insights-index")
  );

  if (!section) {
    throw new Error(
      "Could not locate the Static Legal Updates Index section."
    );
  }

  const list = findElementRange(
    html,
    "ul",
    (openingTag) =>
      openingTag.includes("static-insights-index-list"),
    section.openingEnd,
    section.closingStart
  );

  return replaceElementContent(
    html,
    list,
    "COMPLETE_INDEX",
    (indent, eol) =>
      items
        .map((item) => renderStaticIndexItem(item, indent))
        .join(eol)
  );
}

function syncInsightsPage(html, items) {
  const latestItems = items.slice(0, 3);

  const caseBriefs = filterSectionItems(items, {
    categories: "Case Brief"
  }).slice(0, 3);

  const guides = filterSectionItems(items, {
    categories: "Practical Guide, Checklist"
  }).slice(0, 3);

  const focusedUpdates = filterSectionItems(items, {
    tags: "NI Act, MSME, RERA, Arbitration, Commercial Recovery",
    excludeCategories: "Case Brief"
  }).slice(0, 3);

  let output = html;

  output = syncBlogGrid(
    output,
    "LEGAL_LATEST",
    (openingTag) =>
      openingTag.includes(
        'data-citadel-blog-section="latest"'
      ),
    latestItems
  );

  output = syncBlogGrid(
    output,
    "LEGAL_CASE_BRIEFS",
    (openingTag) =>
      openingTag.includes(
        'data-citadel-blog-section="category"'
      ) &&
      openingTag.includes('data-category="Case Brief"'),
    caseBriefs
  );

  output = syncBlogGrid(
    output,
    "LEGAL_GUIDES",
    (openingTag) =>
      openingTag.includes(
        'data-citadel-blog-section="categories"'
      ) &&
      openingTag.includes(
        'data-categories="Practical Guide, Checklist"'
      ),
    guides
  );

  output = syncBlogGrid(
    output,
    "LEGAL_FOCUSED_UPDATES",
    (openingTag) =>
      openingTag.includes(
        'data-citadel-blog-section="tags"'
      ),
    focusedUpdates
  );

  output = syncStaticIndex(output, items);

  return {
    html: output,
    counts: {
      latest: latestItems.length,
      caseBriefs: caseBriefs.length,
      guides: guides.length,
      focusedUpdates: focusedUpdates.length,
      completeIndex: items.length
    }
  };
}

const registry = JSON.parse(read(files.registry));

if (!Array.isArray(registry)) {
  throw new Error(
    "Insights registry root must be an array."
  );
}

const items = registry.filter(
  (item) =>
    item &&
    normalize(item.href) &&
    normalize(item.title)
);

if (!items.length) {
  throw new Error("Insights registry contains no usable articles.");
}

const currentHomepage = read(files.homepage);
const currentInsights = read(files.insights);

const homepageResult = syncHomepage(currentHomepage, items);
const insightsResult = syncInsightsPage(currentInsights, items);

const changedFiles = [];

if (homepageResult.html !== currentHomepage) {
  changedFiles.push(files.homepage);
}

if (insightsResult.html !== currentInsights) {
  changedFiles.push(files.insights);
}

if (checkOnly) {
  if (changedFiles.length) {
    console.error(
      "Static Insights synchronization check failed."
    );
    console.error(
      "Run: node tools/sync-static-insight-cards.js"
    );
    console.error(
      `Out-of-date files: ${changedFiles.join(", ")}`
    );
    process.exit(1);
  }

  console.log(
    `Static Insights synchronization passed: ${homepageResult.count} homepage card(s), ${insightsResult.counts.latest} latest card(s), ${insightsResult.counts.caseBriefs} case brief card(s), ${insightsResult.counts.guides} guide card(s), ${insightsResult.counts.focusedUpdates} focused update card(s), ${insightsResult.counts.completeIndex} complete-index link(s).`
  );

  process.exit(0);
}

if (homepageResult.html !== currentHomepage) {
  write(files.homepage, homepageResult.html);
}

if (insightsResult.html !== currentInsights) {
  write(files.insights, insightsResult.html);
}

console.log("Static Insights synchronization complete:");
console.log(`- Homepage latest cards: ${homepageResult.count}`);
console.log(
  `- Legal Insights latest cards: ${insightsResult.counts.latest}`
);
console.log(
  `- Legal Insights case briefs: ${insightsResult.counts.caseBriefs}`
);
console.log(
  `- Legal Insights guides/checklists: ${insightsResult.counts.guides}`
);
console.log(
  `- Legal Insights focused updates: ${insightsResult.counts.focusedUpdates}`
);
console.log(
  `- Complete static article index: ${insightsResult.counts.completeIndex}`
);
