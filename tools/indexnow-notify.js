#!/usr/bin/env node
"use strict";

/**
 * Notify IndexNow of genuinely changed, public, canonical HTML pages.
 * For GitHub Pages, verify the deployed IndexNow key file before submission.
 * No third-party npm dependencies, authentication secrets or paid API.
 *
 * Usage:
 *   node tools/indexnow-notify.js --check
 *   node tools/indexnow-notify.js (GitHub Actions push or workflow_dispatch)
 */

const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const ROOT = path.resolve(__dirname, "..");
const ORIGIN = "https://chambersofak.in";
const KEY_FILENAME = "5c688070aeba92b5256f3a4590fd4c6e.txt";
const KEY = fs.readFileSync(path.join(ROOT, KEY_FILENAME), "utf8").trim();
const KEY_URL = `${ORIGIN}/${KEY_FILENAME}`;
const ENDPOINT = "https://api.indexnow.org/indexnow";
const PUBLIC_ROOT_HTML = new Set([
  "index.html", "about.html", "practice.html", "case-enquiry.html",
  "contact.html", "courts.html", "legal-updates.html",
  "document-checklists.html", "faq.html", "process.html",
  "disclaimer.html", "privacy-policy.html", "terms.html"
]);

if (!/^[a-f0-9]{32}$/.test(KEY) || KEY_FILENAME !== `${KEY}.txt`) {
  throw new Error("Invalid IndexNow key verification file.");
}

function getAttribute(tag, name) {
  const safe = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const re = new RegExp(`\\b${safe}\\s*=\\s*(["'])(.*?)\\1`, "i");
  return tag.match(re)?.[2] ?? null;
}

function isPublicHtmlFile(file) {
  if (!file || file.startsWith("/") || file.includes("..") || file.includes("\\")) {
    return false;
  }
  if (PUBLIC_ROOT_HTML.has(file)) return true;
  return /^(?:updates|services|practice)\/[a-zA-Z0-9][a-zA-Z0-9._-]*\.html$/.test(file);
}

function indexableCanonicalUrl(file) {
  if (!isPublicHtmlFile(file)) return null;
  const full = path.join(ROOT, file);
  if (!fs.existsSync(full)) return null; // deleted files are not submitted by this workflow
  const html = fs.readFileSync(full, "utf8");
  const metaTags = html.match(/<meta\b[^>]*>/gi) || [];
  if (metaTags.some((tag) =>
    (getAttribute(tag, "name") || "").toLowerCase() === "robots" &&
    /\bnoindex\b/i.test(getAttribute(tag, "content") || "")
  )) return null;
  if (metaTags.some((tag) =>
    (getAttribute(tag, "http-equiv") || "").toLowerCase() === "refresh"
  )) return null;

  const canonical = (html.match(/<link\b[^>]*>/gi) || [])
    .find((tag) => (getAttribute(tag, "rel") || "").toLowerCase() === "canonical");
  const expected = file === "index.html" ? `${ORIGIN}/` : `${ORIGIN}/${file}`;
  if (getAttribute(canonical || "", "href") !== expected) return null;
  return expected;
}

function changedFiles() {
  const event = process.env.GITHUB_EVENT_NAME;
  if (event === "workflow_dispatch") {
    const entries = (process.env.INDEXNOW_MANUAL_URLS || "")
      .split(/[\n,]+/)
      .map((value) => value.trim())
      .filter(Boolean);
    return entries.map((value) => {
      try {
        const parsed = new URL(value);
        if (parsed.origin !== ORIGIN || parsed.search || parsed.hash) return null;
        return parsed.pathname === "/" ? "index.html" : decodeURIComponent(parsed.pathname.slice(1));
      } catch {
        return null;
      }
    }).filter(Boolean);
  }
  if (event !== "push") {
    console.log("IndexNow: not a deployment push or manual dispatch; no submission.");
    return [];
  }
  const before = process.env.GITHUB_EVENT_BEFORE || "";
  const after = process.env.GITHUB_SHA || "";
  if (!/^[a-f0-9]{40}$/.test(before) || /^0{40}$/.test(before) ||
      !/^[a-f0-9]{40}$/.test(after)) {
    console.log("IndexNow: cannot identify a safe changed-file range; skipping.");
    return [];
  }
  return execFileSync("git", ["diff", "--name-only", "--diff-filter=ACMRT", before, after], {
    cwd: ROOT, encoding: "utf8"
  }).split(/\r?\n/).map((value) => value.trim()).filter(Boolean);
}

const pause = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function getText(url) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 14000);
  try {
    const response = await fetch(url, {
      signal: controller.signal, redirect: "follow",
      headers: { "Cache-Control": "no-cache", "User-Agent": "Chambers-of-AK-IndexNow-Deployment-Check/1.0" }
    });
    return response.ok ? await response.text() : null;
  } finally {
    clearTimeout(timeout);
  }
}

async function waitForPublicKey() {
  for (let attempt = 1; attempt <= 10; attempt++) {
    try {
      if ((await getText(KEY_URL))?.trim() === KEY) return true;
    } catch (error) {
      console.log(`Key verification attempt ${attempt}: ${error.message}`);
    }
    if (attempt !== 10) await pause(20000);
  }
  return false;
}

async function main() {
  if (process.argv.includes("--check")) {
    const examples = [
      "updates/msefc-defective-goods-set-off-counterclaim.html",
      "updates/section-34-partially-reasoned-award-challenge.html"
    ];
    const results = examples.map(indexableCanonicalUrl);
    if (results.some((value) => !value)) throw new Error("Known article is not publicly canonical.");
    console.log(`IndexNow configuration valid. Two example canonical URLs; root key file ${KEY_FILENAME}.`);
    return;
  }

  const selected = [...new Set(changedFiles().map(indexableCanonicalUrl).filter(Boolean))];
  if (!selected.length) {
    console.log("IndexNow: no changed, self-canonical, indexable public HTML pages. Nothing to submit.");
    return;
  }

  // GitHub Pages deployment may lag the push event; never notify IndexNow before
  // the ownership file is publicly retrievable with the correct key.
  if (!await waitForPublicKey()) {
    throw new Error("IndexNow ownership key not yet reachable at the public URL; no URLs submitted.");
  }

  const ready = [];
  for (const url of selected) {
    try {
      const live = await getText(url);
      if (live && live.includes(`href="${url}"`)) {
        ready.push(url);
      } else {
        console.log(`IndexNow: public page not confirmed as reachable/canonical; skipped ${url}`);
      }
    } catch (error) {
      console.log(`IndexNow: skipped ${url} (${error.message})`);
    }
  }
  if (!ready.length) {
    console.log("IndexNow: no public canonical page was confirmed; nothing submitted.");
    return;
  }

  const payload = {
    host: "chambersofak.in",
    key: KEY,
    keyLocation: KEY_URL,
    urlList: ready
  };
  const response = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(payload),
    signal: AbortSignal.timeout(20000)
  });
  const responseText = (await response.text()).slice(0, 400);
  if (![200, 202].includes(response.status)) {
    throw new Error(`IndexNow status ${response.status}: ${responseText}`);
  }
  console.log(`IndexNow acknowledged ${ready.length} updated URL(s), HTTP ${response.status}.`);
  if (response.status === 202) console.log("Key ownership validation is pending at IndexNow.");
  for (const url of ready) console.log(`Submitted: ${url}`);
  console.log("Acknowledgement does not prove crawling or indexing.");
}

main().catch((error) => {
  console.error(error.stack || error.message);
  process.exitCode = 1;
});
