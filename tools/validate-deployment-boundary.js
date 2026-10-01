"use strict";

const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const errors = [];

const requiredPublicFiles = [
  "index.html",
  "about.html",
  "practice.html",
  "case-enquiry.html",
  "contact.html",
  "legal-updates.html",
  "document-checklists.html",
  "faq.html",
  "process.html",
  "courts.html",
  "disclaimer.html",
  "privacy-policy.html",
  "terms.html",
  "404.html",
  "sitemap.xml",
  "feed.xml",
  "robots.txt",
  "CNAME",
  "site.webmanifest",
];

const requiredExclusions = [
  "docs",
  "preview",
  "tools",
  "README.md",
  "CHANGELOG.md",
  "SECURITY.md",
  "DEPLOYMENT.txt",
  "article-index-rollout-report.txt",
  "theme-preview-citadel-of-ak.html",
  "assets/config",
  "assets/css/themes/citadel-of-kang/README.md",
  "assets/js/themes/citadel-of-kang/README.md",
];


const forbiddenPublicCopyPhrases = [
  "For Search Visibility",
  "Static Legal Updates Index",
  "Google can understand the content cluster",
  "crawlers that do not rely on JavaScript-rendered cards",
  "website-positioning",
  "Broad UP positioning is intentionally avoided",
  "Focused Search Pages",
  "Priority page for",
  "The search intent here is practical",
  "This page supports searches for",
  "This page is written for people searching for",
  "This page is written for businesses searching for",
  "priority pillars on this website",
  "generic city-page template",
  "repository research materials",
  "publication-preparation support",
  "source pack includes",
  "Google AdSense readiness files or scripts",
  "enabled after approval",
];

const excludedPublicCopyRoots = new Set([
  ".git",
  ".github",
  "docs",
  "preview",
  "tools",
  "node_modules",
]);

function collectPublicHtmlFiles(currentDir = ROOT, relativeDir = "") {
  const output = [];

  for (const entry of fs.readdirSync(currentDir, { withFileTypes: true })) {
    const relPath = relativeDir
      ? path.posix.join(relativeDir, entry.name)
      : entry.name;
    const absolutePath = path.join(currentDir, entry.name);

    if (entry.isDirectory()) {
      const rootSegment = relPath.split("/")[0];

      if (excludedPublicCopyRoots.has(rootSegment)) {
        continue;
      }

      output.push(
        ...collectPublicHtmlFiles(absolutePath, relPath)
      );
      continue;
    }

    if (!entry.isFile() || !relPath.endsWith(".html")) {
      continue;
    }

    if (relPath === "theme-preview-citadel-of-ak.html") {
      continue;
    }

    output.push(relPath);
  }

  return output;
}

const configPath = path.join(ROOT, "_config.yml");

if (!fs.existsSync(configPath)) {
  errors.push("_config.yml is missing.");
} else {
  const config = fs.readFileSync(configPath, "utf8");

  if (!/^url:\s*["']https:\/\/chambersofak\.in["']\s*$/m.test(config)) {
    errors.push("_config.yml must set the canonical HTTPS url.");
  }

  if (!/^baseurl:\s*["']{2}\s*$/m.test(config)) {
    errors.push("_config.yml must set an empty baseurl.");
  }

  const excludeBlock = config.match(/^exclude:\s*\n((?:\s+-\s+.*(?:\n|$))*)/m);
  const excluded = new Set();

  if (!excludeBlock) {
    errors.push("_config.yml is missing the exclude list.");
  } else {
    for (const line of excludeBlock[1].split(/\r?\n/)) {
      const match = line.match(/^\s+-\s+(.+?)\s*$/);
      if (!match) continue;
      excluded.add(match[1].replace(/^["']|["']$/g, ""));
    }
  }

  for (const required of requiredExclusions) {
    if (!excluded.has(required)) {
      errors.push(`_config.yml missing deployment exclusion: ${required}`);
    }
  }

  for (const forbidden of ["assets", "practice", "services", "updates"]) {
    if (excluded.has(forbidden)) {
      errors.push(`_config.yml must not exclude public path: ${forbidden}`);
    }
  }
}

for (const relPath of requiredPublicFiles) {
  if (!fs.existsSync(path.join(ROOT, relPath))) {
    errors.push(`Required public file is missing: ${relPath}`);
  }
}


const publicHtmlFiles = collectPublicHtmlFiles();

for (const relPath of publicHtmlFiles) {
  const html = fs.readFileSync(path.join(ROOT, relPath), "utf8");

  for (const phrase of forbiddenPublicCopyPhrases) {
    if (html.includes(phrase)) {
      errors.push(
        `${relPath}: internal/editorial public-copy phrase must not be published: "${phrase}".`
      );
    }
  }
}

const insightsPath = path.join(ROOT, "legal-updates.html");

if (fs.existsSync(insightsPath)) {
  const insightsHtml = fs.readFileSync(insightsPath, "utf8");

  if (insightsHtml.includes("data-static-insights-index")) {
    errors.push("legal-updates.html must not publish a separate static Insights index section.");
  }

  if (!insightsHtml.includes("STATIC_INSIGHTS:LEGAL_DIRECTORY:START") ||
      !insightsHtml.includes("data-citadel-blog-results-list")) {
    errors.push("legal-updates.html must keep the full crawlable article directory in the normal Insights results list.");
  }
}

const notFoundPath = path.join(ROOT, "404.html");

if (fs.existsSync(notFoundPath)) {
  const html = fs.readFileSync(notFoundPath, "utf8");

  if (!/<meta\b[^>]*name=["']robots["'][^>]*content=["'][^"']*noindex/i.test(html)) {
    errors.push("404.html must remain noindex.");
  }

  if (!/<link\b[^>]*rel=["']canonical["'][^>]*href=["']https:\/\/chambersofak\.in\/404\.html["']/i.test(html)) {
    errors.push("404.html canonical is missing or incorrect.");
  }

  if (!/<h1>Page Not Found<\/h1>/i.test(html)) {
    errors.push("404.html is missing the expected visible heading.");
  }
}

const sitemapPath = path.join(ROOT, "sitemap.xml");

if (fs.existsSync(sitemapPath)) {
  const sitemap = fs.readFileSync(sitemapPath, "utf8");

  if (sitemap.includes("https://chambersofak.in/404.html")) {
    errors.push("404.html must not appear in sitemap.xml.");
  }
}

console.log("Deployment boundary validation summary:");
console.log(`- Required public files: ${requiredPublicFiles.length}`);
console.log(`- Required exclusions: ${requiredExclusions.length}`);
console.log(`- Public HTML files checked for internal copy: ${publicHtmlFiles.length}`);
console.log(`- Errors: ${errors.length}`);

if (errors.length) {
  console.log("\nErrors:");
  for (const error of errors) console.log(`- ${error}`);
  process.exit(1);
}

console.log("\nDeployment boundary validation passed.");
