#!/usr/bin/env node
"use strict";

const assert = require("assert");
const fs = require("fs");
const http = require("http");
const path = require("path");
const { chromium } = require("playwright");

const root = process.cwd();
const articlePath = "/updates/section-138-cheque-bounce-limitation.html";
const expectedTitle = "Section 138 NI Act: Cheque Bounce Ingredients and Procedure | Chambers of AK";
const expectedH1 = "Section 138 of the NI Act Explained: When Does Cheque Dishonour Become an Offence?";
const expectedCanonical = `https://chambersofak.in${articlePath}`;

function contentType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  return {
    ".html": "text/html; charset=utf-8",
    ".css": "text/css; charset=utf-8",
    ".js": "application/javascript; charset=utf-8",
    ".json": "application/json; charset=utf-8",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".png": "image/png",
    ".svg": "image/svg+xml",
    ".ico": "image/x-icon",
    ".webp": "image/webp",
    ".xml": "application/xml; charset=utf-8"
  }[ext] || "application/octet-stream";
}

const server = http.createServer((req, res) => {
  try {
    const urlPath = decodeURIComponent((req.url || "/").split("?")[0]);
    const relative = urlPath === "/" ? "index.html" : urlPath.replace(/^\/+/, "");
    const filePath = path.resolve(root, relative);
    if (!filePath.startsWith(path.resolve(root))) {
      res.writeHead(403).end("Forbidden");
      return;
    }
    if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
      res.writeHead(404).end("Not found");
      return;
    }
    res.writeHead(200, { "Content-Type": contentType(filePath), "Cache-Control": "no-store" });
    fs.createReadStream(filePath).pipe(res);
  } catch (error) {
    res.writeHead(500).end(String(error));
  }
});

async function verifyMetadata(page) {
  assert.strictEqual(await page.title(), expectedTitle, "Unexpected page title");
  assert.strictEqual((await page.locator("h1").first().innerText()).trim(), expectedH1, "Unexpected H1");
  assert.strictEqual(await page.locator('link[rel="canonical"]').getAttribute("href"), expectedCanonical, "Canonical mismatch");
  assert.strictEqual(await page.locator('meta[property="article:modified_time"]').getAttribute("content"), "2026-07-29T00:00:00+05:30", "Modified date mismatch");
  assert.strictEqual(await page.locator('script[type="application/ld+json"]').first().evaluate((node) => JSON.parse(node.textContent).dateModified), "2026-07-29", "BlogPosting dateModified mismatch");
  assert.ok(await page.locator('a[href="cheque-bounce-30-days.html"]').count(), "Missing first-30-days internal link");
  assert.ok(await page.locator('a[href="cheque-bounce-notice-limitation.html"]').count(), "Missing notice-timeline internal link");
  assert.ok(await page.locator('a[href="cheque-bounce-defence-after-summons.html"]').count(), "Missing post-summons internal link");
  assert.strictEqual(await page.locator(".article-featured-figure img").getAttribute("width"), "1200", "Featured image width missing");
  assert.strictEqual(await page.locator(".article-featured-figure img").getAttribute("height"), "675", "Featured image height missing");
}

async function scrollToHeadingAndVerify(page, headingText) {
  const heading = page.locator("article.article-body > h2", { hasText: headingText }).first();
  assert.strictEqual(await heading.count(), 1, `Missing heading: ${headingText}`);
  await heading.evaluate((node) => node.scrollIntoView({ block: "start", behavior: "auto" }));
  await page.waitForTimeout(250);

  const state = await page.evaluate((expected) => {
    const toc = document.querySelector(".article-index-toc");
    const active = toc && toc.querySelector("a.is-active");
    const activeRect = active && active.getBoundingClientRect();
    const nav = document.querySelector(".nav");
    const navBottom = nav ? nav.getBoundingClientRect().bottom : 0;
    return {
      activeText: active ? active.textContent.trim() : "",
      tocScrollTop: toc ? toc.scrollTop : null,
      activeTop: activeRect ? activeRect.top : null,
      activeBottom: activeRect ? activeRect.bottom : null,
      navBottom,
      viewportHeight: window.innerHeight,
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      expected
    };
  }, headingText);

  assert.ok(state.activeText.includes(headingText), `Active index mismatch for ${headingText}: ${state.activeText}`);
  assert.strictEqual(state.tocScrollTop, 0, "Article Index developed internal scroll");
  assert.ok(state.overflow <= 1, `Horizontal overflow detected: ${state.overflow}px`);
  assert.ok(state.activeTop >= state.navBottom - 2, `Active index entry above nav: ${state.activeTop} < ${state.navBottom}`);
  assert.ok(state.activeBottom <= state.viewportHeight + 2, `Active index entry below viewport: ${state.activeBottom}`);
}

async function verifyViewport(browser, viewport) {
  const context = await browser.newContext({ viewport, colorScheme: "dark", reducedMotion: "reduce" });
  const page = await context.newPage();
  await page.goto(`http://127.0.0.1:4173${articlePath}`, { waitUntil: "networkidle" });
  await page.waitForSelector(".article-index-toc");
  await verifyMetadata(page);

  const layout = await page.evaluate(() => ({
    headings: document.querySelectorAll("article.article-body > h2").length,
    tocLinks: document.querySelectorAll('.article-index-toc a[href^="#"]:not([href="#top"])').length,
    overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    tocScrollTop: document.querySelector(".article-index-toc")?.scrollTop ?? null,
    tocTransform: getComputedStyle(document.querySelector(".article-index-toc")).transform
  }));

  assert.ok(layout.headings >= 20, `Expected long authority article, found ${layout.headings} headings`);
  assert.strictEqual(layout.tocLinks, layout.headings, "Article Index link count mismatch");
  assert.ok(layout.overflow <= 1, `Initial horizontal overflow detected: ${layout.overflow}px`);
  assert.strictEqual(layout.tocScrollTop, 0, "Initial Article Index internal scroll detected");

  if (viewport.width > 920) {
    await scrollToHeadingAndVerify(page, "Section 118 and Section 139 presumptions");
    await scrollToHeadingAndVerify(page, "Company and partnership cheques");
    await scrollToHeadingAndVerify(page, "Complainant-side document checklist");
  } else {
    assert.ok(layout.tocTransform === "none" || layout.tocTransform === "matrix(1, 0, 0, 1, 0, 0)", `Mobile Article Index transform is not identity: ${layout.tocTransform}`);
    await page.locator("article.article-body > h2", { hasText: "Common mistakes" }).first().evaluate((node) => node.scrollIntoView({ block: "start", behavior: "auto" }));
    await page.waitForTimeout(150);
    const mobile = await page.evaluate(() => ({
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      tocScrollTop: document.querySelector(".article-index-toc")?.scrollTop ?? null,
      transform: getComputedStyle(document.querySelector(".article-index-toc")).transform
    }));
    assert.ok(mobile.overflow <= 1, `Mobile horizontal overflow detected: ${mobile.overflow}px`);
    assert.strictEqual(mobile.tocScrollTop, 0, "Mobile Article Index internal scroll detected");
    assert.ok(mobile.transform === "none" || mobile.transform === "matrix(1, 0, 0, 1, 0, 0)", `Mobile Article Index transform changed: ${mobile.transform}`);
  }

  await context.close();
}

(async () => {
  await new Promise((resolve) => server.listen(4173, "127.0.0.1", resolve));
  const browser = await chromium.launch({ headless: true });
  try {
    await verifyViewport(browser, { width: 1440, height: 900 });
    await verifyViewport(browser, { width: 1280, height: 720 });
    await verifyViewport(browser, { width: 390, height: 844 });
    console.log("Section 138 browser regression passed.");
  } finally {
    await browser.close();
    await new Promise((resolve) => server.close(resolve));
  }
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
