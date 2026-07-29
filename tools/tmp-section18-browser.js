#!/usr/bin/env node
"use strict";

const { chromium } = require("playwright");

const url = "http://127.0.0.1:4173/updates/rera-refund-interest-delayed-possession.html";
const expectedTitle = "Section 18 RERA Act: Refund, Interest and Delayed Possession | Chambers of AK";
const expectedH1 = "Section 18 of the RERA Act Explained: Refund, Interest and Compensation for Delayed Possession";
const expectedCanonical = "https://chambersofak.in/updates/rera-refund-interest-delayed-possession.html";

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

async function verifyViewport(browser, viewport) {
  const page = await browser.newPage({ viewport });
  await page.goto(url, { waitUntil: "networkidle" });
  await page.waitForSelector(".article-index-toc", { timeout: 15000 });

  const initial = await page.evaluate(() => {
    const canonical = document.querySelector('link[rel="canonical"]');
    const modified = document.querySelector('meta[property="article:modified_time"]');
    const h1 = document.querySelector("h1");
    const article = document.querySelector("article.article-body");
    const toc = document.querySelector(".article-index-toc");
    const h2s = article ? Array.from(article.querySelectorAll(":scope > h2")) : [];
    const links = toc ? Array.from(toc.querySelectorAll('ol a[href^="#"]')) : [];
    return {
      title: document.title,
      h1: h1 ? h1.textContent.trim() : "",
      canonical: canonical ? canonical.href : "",
      modified: modified ? modified.content : "",
      h2Texts: h2s.map((node) => node.textContent.trim()),
      h2Count: h2s.length,
      tocLinkCount: links.length,
      tocScrollTop: toc ? toc.scrollTop : -1,
      bodyReady: article ? article.dataset.citadelArticleIndexReady : "",
      documentOverflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      bodyOverflow: document.body.scrollWidth - document.body.clientWidth,
      tocTransform: toc ? getComputedStyle(toc).transform : ""
    };
  });

  assert(initial.title === expectedTitle, `${viewport.width}px: unexpected title: ${initial.title}`);
  assert(initial.h1 === expectedH1, `${viewport.width}px: unexpected H1: ${initial.h1}`);
  assert(initial.canonical === expectedCanonical, `${viewport.width}px: canonical mismatch: ${initial.canonical}`);
  assert(initial.modified.startsWith("2026-07-29"), `${viewport.width}px: modified date mismatch: ${initial.modified}`);
  assert(initial.bodyReady === "true", `${viewport.width}px: Article Index did not initialise`);
  assert(initial.h2Count >= 15, `${viewport.width}px: expected at least 15 direct H2 headings, found ${initial.h2Count}`);
  assert(initial.tocLinkCount === initial.h2Count, `${viewport.width}px: TOC count ${initial.tocLinkCount} does not match H2 count ${initial.h2Count}`);
  assert(initial.tocScrollTop === 0, `${viewport.width}px: TOC has internal scroll offset ${initial.tocScrollTop}`);
  assert(initial.documentOverflow <= 1 && initial.bodyOverflow <= 1, `${viewport.width}px: horizontal overflow detected`);

  [
    "What Section 18 requires",
    "How is refund interest calculated?",
    "When can compensation be claimed?",
    "Which forum can grant relief?",
    "References / Sources"
  ].forEach((heading) => {
    assert(initial.h2Texts.includes(heading), `${viewport.width}px: missing heading: ${heading}`);
  });

  const targetId = await page.evaluate(() => {
    const target = Array.from(document.querySelectorAll("article.article-body > h2"))
      .find((heading) => heading.textContent.trim() === "When can compensation be claimed?");
    if (!target) return "";
    target.scrollIntoView({ block: "start" });
    return target.id;
  });

  assert(targetId, `${viewport.width}px: compensation heading has no ID`);
  await page.waitForTimeout(500);

  const afterScroll = await page.evaluate((id) => {
    const toc = document.querySelector(".article-index-toc");
    const active = toc ? toc.querySelector('a.is-active[aria-current="location"]') : null;
    const decoded = active ? decodeURIComponent((active.getAttribute("href") || "").replace(/^#/, "")) : "";
    return {
      activeId: decoded,
      expectedId: id,
      tocScrollTop: toc ? toc.scrollTop : -1,
      documentOverflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      bodyOverflow: document.body.scrollWidth - document.body.clientWidth,
      tocTransform: toc ? getComputedStyle(toc).transform : ""
    };
  }, targetId);

  assert(afterScroll.activeId === afterScroll.expectedId, `${viewport.width}px: active Article Index link did not follow the compensation heading`);
  assert(afterScroll.tocScrollTop === 0, `${viewport.width}px: TOC internally scrolled after page movement`);
  assert(afterScroll.documentOverflow <= 1 && afterScroll.bodyOverflow <= 1, `${viewport.width}px: horizontal overflow after scroll`);

  if (viewport.width <= 920) {
    const identityTransforms = ["none", "matrix(1, 0, 0, 1, 0, 0)", "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)"];
    assert(identityTransforms.includes(afterScroll.tocTransform), `${viewport.width}px: mobile TOC transform is not identity: ${afterScroll.tocTransform}`);
  }

  console.log(`PASS ${viewport.width}x${viewport.height}: ${initial.h2Count} headings, active=${afterScroll.activeId}`);
  await page.close();
}

(async () => {
  const browser = await chromium.launch({ headless: true });
  try {
    for (const viewport of [
      { width: 1440, height: 900 },
      { width: 1280, height: 720 },
      { width: 390, height: 844 }
    ]) {
      await verifyViewport(browser, viewport);
    }
  } finally {
    await browser.close();
  }
})().catch((error) => {
  console.error(error.stack || error.message || error);
  process.exit(1);
});
