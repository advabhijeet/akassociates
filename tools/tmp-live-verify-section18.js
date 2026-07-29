#!/usr/bin/env node
"use strict";

const { chromium } = require("playwright");

const origin = "https://chambersofak.in";
const path = "/updates/rera-refund-interest-delayed-possession.html";
const canonical = `${origin}${path}`;
const expectedTitle = "Section 18 RERA Act: Refund, Interest and Delayed Possession | Chambers of AK";
const expectedH1 = "Section 18 of the RERA Act Explained: Refund, Interest and Compensation for Delayed Possession";
const registryTitle = "Section 18 RERA Act: refund, interest and delayed possession";

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

async function fetchFresh(url) {
  const separator = url.includes("?") ? "&" : "?";
  const response = await fetch(`${url}${separator}verify=${Date.now()}-${Math.random()}`, {
    headers: {
      "cache-control": "no-cache, no-store, must-revalidate",
      pragma: "no-cache"
    },
    redirect: "follow"
  });
  if (!response.ok) throw new Error(`${url} returned HTTP ${response.status}`);
  return response.text();
}

async function waitForDeployment() {
  const attempts = 24;
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      const [article, insights, sitemap, feed] = await Promise.all([
        fetchFresh(canonical),
        fetchFresh(`${origin}/legal-updates.html`),
        fetchFresh(`${origin}/sitemap.xml`),
        fetchFresh(`${origin}/feed.xml`)
      ]);

      const deployed =
        article.includes(`<title>${expectedTitle}</title>`) &&
        article.includes(expectedH1) &&
        article.includes('article:modified_time" content="2026-07-29') &&
        article.includes("Newtech Promoters and Developers") &&
        article.includes("When can compensation be claimed?") &&
        article.includes("Parsvnath Developers Ltd. v. Mohit Khirbat") &&
        insights.includes(path.replace(/^\//, "")) &&
        insights.includes(registryTitle) &&
        sitemap.includes(`<loc>${canonical}</loc><lastmod>2026-07-29</lastmod>`) &&
        feed.includes(`<title>${registryTitle}</title>`) &&
        feed.includes(`<link>${canonical}</link>`) &&
        feed.includes("<category>Section 18</category>") &&
        feed.includes("<category>Compensation</category>");

      if (deployed) {
        console.log(`Deployment detected on attempt ${attempt}.`);
        return;
      }
    } catch (error) {
      console.log(`Attempt ${attempt}: ${error.message}`);
    }

    if (attempt < attempts) {
      await new Promise((resolve) => setTimeout(resolve, 15000));
    }
  }
  throw new Error("Section 18 production deployment did not propagate within the verification window.");
}

async function verifyViewport(browser, viewport) {
  const page = await browser.newPage({ viewport });
  await page.goto(`${canonical}?verify-browser=${Date.now()}-${viewport.width}`, {
    waitUntil: "domcontentloaded",
    timeout: 45000
  });
  await page.waitForSelector(".article-index-toc", { timeout: 20000 });

  const state = await page.evaluate(() => {
    const article = document.querySelector("article.article-body");
    const toc = document.querySelector(".article-index-toc");
    const canonicalNode = document.querySelector('link[rel="canonical"]');
    const modifiedNode = document.querySelector('meta[property="article:modified_time"]');
    const headings = article ? Array.from(article.querySelectorAll(":scope > h2")) : [];
    return {
      title: document.title,
      h1: document.querySelector("h1")?.textContent.trim() || "",
      canonical: canonicalNode?.href || "",
      modified: modifiedNode?.content || "",
      ready: article?.dataset.citadelArticleIndexReady || "",
      headings: headings.map((node) => node.textContent.trim()),
      headingCount: headings.length,
      tocCount: toc ? toc.querySelectorAll('ol a[href^="#"]').length : 0,
      tocScrollTop: toc ? toc.scrollTop : -1,
      docOverflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      bodyOverflow: document.body.scrollWidth - document.body.clientWidth,
      transform: toc ? getComputedStyle(toc).transform : ""
    };
  });

  assert(state.title === expectedTitle, `${viewport.width}px: title mismatch`);
  assert(state.h1 === expectedH1, `${viewport.width}px: H1 mismatch`);
  assert(state.canonical === canonical, `${viewport.width}px: canonical mismatch`);
  assert(state.modified.startsWith("2026-07-29"), `${viewport.width}px: modified date mismatch`);
  assert(state.ready === "true", `${viewport.width}px: Article Index not initialised`);
  assert(state.headingCount >= 15, `${viewport.width}px: insufficient direct H2 headings`);
  assert(state.tocCount === state.headingCount, `${viewport.width}px: TOC/heading mismatch`);
  assert(state.tocScrollTop === 0, `${viewport.width}px: TOC internal scrolling detected`);
  assert(state.docOverflow <= 1 && state.bodyOverflow <= 1, `${viewport.width}px: horizontal overflow detected`);
  [
    "What Section 18 requires",
    "How is refund interest calculated?",
    "When can compensation be claimed?",
    "Which forum can grant relief?"
  ].forEach((heading) => assert(state.headings.includes(heading), `${viewport.width}px: missing ${heading}`));

  const targetId = await page.evaluate(() => {
    const target = Array.from(document.querySelectorAll("article.article-body > h2"))
      .find((heading) => heading.textContent.trim() === "Which forum can grant relief?");
    if (!target) return "";
    target.scrollIntoView({ block: "start" });
    return target.id;
  });

  assert(targetId, `${viewport.width}px: forum heading has no ID`);
  await page.waitForTimeout(600);

  const scrolled = await page.evaluate((expectedId) => {
    const toc = document.querySelector(".article-index-toc");
    const active = toc?.querySelector('a.is-active[aria-current="location"]');
    const activeId = active ? decodeURIComponent((active.getAttribute("href") || "").replace(/^#/, "")) : "";
    return {
      activeId,
      expectedId,
      tocScrollTop: toc ? toc.scrollTop : -1,
      docOverflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      bodyOverflow: document.body.scrollWidth - document.body.clientWidth,
      transform: toc ? getComputedStyle(toc).transform : ""
    };
  }, targetId);

  assert(scrolled.activeId === scrolled.expectedId, `${viewport.width}px: active heading mismatch`);
  assert(scrolled.tocScrollTop === 0, `${viewport.width}px: TOC scrolled internally after navigation`);
  assert(scrolled.docOverflow <= 1 && scrolled.bodyOverflow <= 1, `${viewport.width}px: overflow after scroll`);

  if (viewport.width <= 920) {
    const identities = [
      "none",
      "matrix(1, 0, 0, 1, 0, 0)",
      "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)"
    ];
    assert(identities.includes(scrolled.transform), `${viewport.width}px: mobile TOC transform is not identity`);
  }

  console.log(`PASS ${viewport.width}x${viewport.height}: headings=${state.headingCount}, active=${scrolled.activeId}`);
  await page.close();
}

(async () => {
  await waitForDeployment();
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
  console.log("Live Section 18 production verification passed.");
})().catch((error) => {
  console.error(error.stack || error.message || error);
  process.exit(1);
});
