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
console.log(`- Errors: ${errors.length}`);

if (errors.length) {
  console.log("\nErrors:");
  for (const error of errors) console.log(`- ${error}`);
  process.exit(1);
}

console.log("\nDeployment boundary validation passed.");
