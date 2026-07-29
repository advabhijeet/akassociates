#!/usr/bin/env node
"use strict";

const assert = require("assert");
const { chromium } = require("playwright");

const origin = "https://chambersofak.in";
const articlePath = "/updates/section-138-cheque-bounce-limitation.html";
const canonical = `${origin}${articlePath}`;
const expectedTitle = "Section 138 NI Act: Cheque Bounce Ingredients and Procedure | Chambers of AK";
const expectedH1 = "Section 138 of the NI Act Explained: When Does Cheque Dishonour Become an Offence?";
const expectedRegistryTitle = "Section 138 NI Act: cheque bounce ingredients and procedure";

function cacheBusted(path) {
  const separator = path.includes("?") ? "&" : "?";
  return `${origin}${path}${separator}live_verify=${Date.now()}_${Math.random().toString(16).slice(2)}`;
}

async function fetchText(path) {
  const response = await fetch(cacheBusted(path), {
    headers: {
      "cache-control": "no-cache, no-store, max-age=0",
      pragma: "no-cache"
    },
    redirect: "follow"
  });
  if (!response.ok) throw new Error(`${path} returned HTTP ${response.status}`);
  return response.text();
}

async function waitForDeployment() {
  const deadline = Date.now() + 12 * 60 * 1000;
  let last = "";

  while (Date.now() < deadline) {
    try {
      const [article, insights, sitemap, feed] = await Promise.all([
        fetchText(articlePath),
        fetchText("/legal-updates.html"),
        fetchText("/sitemap.xml"),
        fetchText("/feed.xml")
      ]);

      const checks = {
        articleTitle: article.includes(`<title>${expectedTitle}</title>`),
        articleH1: article.includes(`<h1>${expectedH1}</h1>`),
        articleModified: article.includes('content="2026-07-29T00:00:00+05:30"'),
        articlePresumption: article.includes("Section 118 and Section 139 presumptions"),
        articleCompany: article.includes("Company and partnership cheques"),
        insights: insights.includes(articlePath.replace(/^\//, "")) && insights.includes(expectedRegistryTitle),
        sitemap: sitemap.includes(`<loc>${canonical}</loc><lastmod>2026-07-29</lastmod>`),
        feed: feed.includes(`<title>${expectedRegistryTitle}</title>`) && feed.includes(`<link>${canonical}</link>`)
      };

      if (Object.values(checks).every(Boolean)) {
        console.log(JSON.stringify({ deployment: "PASS", checks }, null, 2));
        return;
      }

      last = JSON.stringify(checks);
    } catch (error) {
      last = error.stack || String(error);
    }

    console.log(`Deployment not ready: ${last}`);
    await new Promise((resolve) => setTimeout(resolve, 15000));
  }

  throw new Error(`Timed out waiting for live Section 138 deployment. Last state: ${last}`);
}

async function verifyMetadata(page) {
  assert.strictEqual(await page.title(), expectedTitle, "Unexpected live title");
  assert.strictEqual((await page.locator("h1").first().innerText()).trim(), expectedH1, "Unexpected live H1");
  assert.strictEqual(await page.locator('link[rel="canonical"]').getAttribute("href"), canonical, "Live canonical mismatch");
  assert.strictEqual(await page.locator('meta[property="article:modified_time"]').getAttribute("content"), "2026-07-29T00:00:00+05:30", "Live modification date mismatch");
  assert.ok(await page.locator("h2", { hasText: "Section 118 and Section 139 presumptions" }).count(), "Missing presumptions section");
  assert.ok(await page.locator("h2", { hasText: "Company and partnership cheques" }).count(), "Missing company-liability section");
  assert.ok(await page.locator('a[href="cheque-bounce-30-days.html"]').count(), "Missing first-30-days link");
  assert.ok(await page.locator('a[href="cheque-bounce-notice-limitation.html"]').count(), "Missing notice-timeline link");
  assert.ok(await page.locator('a[href="cheque-bounce-defence-after-summons.html"]').count(), "Missing post-summons link");
}

async function scrollAndCheck(page, headingText) {
  const heading = page.locator("article.article-body > h2", { hasText: headingText }).first();
  assert.strictEqual(await heading.count(), 1, `Missing live heading: ${headingText}`);
  await heading.evaluate((node) => node.scrollIntoView({ block: "start", behavior: "auto" }));
  await page.waitForTimeout(300);

  const state = await page.evaluate((expected) => {
    const toc = document.querySelector(".article-index-toc");
    const active = toc && toc.querySelector("a.is-active");
    const rect = active && active.getBoundingClientRect();
    const nav = document.querySelector(".nav");
    return {
      expected,
      activeText: active ? active.textContent.trim() : "",
      tocScrollTop: toc ? toc.scrollTop : null,
      activeTop: rect ? rect.top : null,
      activeBottom: rect ? rect.bottom : null,
      navBottom: nav ? nav.getBoundingClientRect().bottom : 0,
      viewportHeight: window.innerHeight,
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth
    };
  }, headingText);

  assert.ok(state.activeText.includes(headingText), `Live active index mismatch for ${headingText}: ${state.activeText}`);
  assert.strictEqual(state.tocScrollTop, 0, "Live Article Index developed internal scrolling");
  assert.ok(state.overflow <= 1, `Live horizontal overflow detected: ${state.overflow}px`);
  assert.ok(state.activeTop >= state.navBottom - 2, `Live active entry above navigation: ${state.activeTop} < ${state.navBottom}`);
  assert.ok(state.activeBottom <= state.viewportHeight + 2, `Live active entry below viewport: ${state.activeBottom}`);
}

async function verifyViewport(browser, viewport) {
  const context = await browser.newContext({
    viewport,
    colorScheme: "dark",
    reducedMotion: "reduce",
    extraHTTPHeaders: { "cache-control": "no-cache", pragma: "no-cache" }
  });
  const page = await context.newPage();
  await page.goto(cacheBusted(articlePath), { waitUntil: "networkidle" });
  await page.waitForSelector(".article-index-toc");
  await verifyMetadata(page);

  const initial = await page.evaluate(() => ({
    headings: document.querySelectorAll("article.article-body > h2").length,
    links: document.querySelectorAll('.article-index-toc a[href^="#"]:not([href="#top"])').length,
    tocScrollTop: document.querySelector(".article-index-toc")?.scrollTop ?? null,
    transform: getComputedStyle(document.querySelector(".article-index-toc")).transform,
    overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth
  }));

  assert.ok(initial.headings >= 20, `Expected long live article; found ${initial.headings} headings`);
  assert.strictEqual(initial.links, initial.headings, "Live Article Index link count mismatch");
  assert.strictEqual(initial.tocScrollTop, 0, "Initial live Article Index internal scroll detected");
  assert.ok(initial.overflow <= 1, `Initial live horizontal overflow detected: ${initial.overflow}px`);

  if (viewport.width > 920) {
    await scrollAndCheck(page, "Section 118 and Section 139 presumptions");
    await scrollAndCheck(page, "Company and partnership cheques");
    await scrollAndCheck(page, "Complainant-side document checklist");
  } else {
    assert.ok(initial.transform === "none" || initial.transform === "matrix(1, 0, 0, 1, 0, 0)", `Live mobile transform is not identity: ${initial.transform}`);
    await page.locator("article.article-body > h2", { hasText: "Common mistakes" }).first().evaluate((node) => node.scrollIntoView({ block: "start", behavior: "auto" }));
    await page.waitForTimeout(200);
    const mobile = await page.evaluate(() => ({
      transform: getComputedStyle(document.querySelector(".article-index-toc")).transform,
      tocScrollTop: document.querySelector(".article-index-toc")?.scrollTop ?? null,
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth
    }));
    assert.ok(mobile.transform === "none" || mobile.transform === "matrix(1, 0, 0, 1, 0, 0)", `Live mobile transform changed: ${mobile.transform}`);
    assert.strictEqual(mobile.tocScrollTop, 0, "Live mobile Article Index internal scroll detected");
    assert.ok(mobile.overflow <= 1, `Live mobile horizontal overflow detected: ${mobile.overflow}px`);
  }

  await context.close();
}

(async () => {
  await waitForDeployment();
  const browser = await chromium.launch({ headless: true });
  try {
    await verifyViewport(browser, { width: 1440, height: 900 });
    await verifyViewport(browser, { width: 1280, height: 720 });
    await verifyViewport(browser, { width: 390, height: 844 });
    console.log(JSON.stringify({ liveVerification: "PASS", article: canonical }, null, 2));
  } finally {
    await browser.close();
  }
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
