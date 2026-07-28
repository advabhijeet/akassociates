'use strict';

const { chromium } = require('playwright');

const ORIGIN = 'https://chambersofak.in';
const ARTICLE = '/updates/msme-45-days-payment-rule.html';
const EXPECTED_TITLE = 'Section 15 MSMED Act: 15-Day and 45-Day Payment Rules | Chambers of AK';
const EXPECTED_H1 = 'Section 15 of the MSMED Act Explained: When Must a Buyer Pay an MSE Supplier?';

function assert(condition, message, details) {
  if (!condition) throw new Error(`${message}\n${JSON.stringify(details, null, 2)}`);
}

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function fetchText(url) {
  const response = await fetch(url, {
    headers: {
      'Cache-Control': 'no-cache, no-store, max-age=0',
      Pragma: 'no-cache',
    },
  });
  if (!response.ok) throw new Error(`HTTP ${response.status} for ${url}`);
  return response.text();
}

async function waitForDeployment() {
  let last = null;
  for (let attempt = 1; attempt <= 32; attempt += 1) {
    const stamp = `${Date.now()}-${attempt}`;
    try {
      const [html, feed] = await Promise.all([
        fetchText(`${ORIGIN}${ARTICLE}?verify=${stamp}`),
        fetchText(`${ORIGIN}/feed.xml?verify=${stamp}`),
      ]);
      const state = {
        attempt,
        articleTitle: html.includes(EXPECTED_TITLE),
        articleH1: html.includes(EXPECTED_H1),
        modifiedDate: html.includes('2026-07-28T09:24:00+05:30'),
        visibleDate: html.includes('Last updated on:</strong> 28/07/2026 at 09:24'),
        noIncomeTaxTag: !html.includes('article:tag" content="Income Tax'),
        feedEntry: feed.includes('Section 15 MSMED Act: 15-day and 45-day payment rules'),
        feedMedia: feed.includes('citadel-thumb-msme-45-days-payment-rule-batch6-v2.jpg'),
      };
      last = state;
      if (Object.values(state).slice(1).every(Boolean)) return state;
    } catch (error) {
      last = { attempt, error: error.message };
    }
    await delay(15000);
  }
  throw new Error(`Section 15 rewrite did not deploy in time\n${JSON.stringify(last, null, 2)}`);
}

async function testDesktop(browser, viewport) {
  const context = await browser.newContext({
    viewport,
    extraHTTPHeaders: {
      'Cache-Control': 'no-cache, no-store, max-age=0',
      Pragma: 'no-cache',
    },
  });
  const page = await context.newPage();
  await page.goto(`${ORIGIN}${ARTICLE}?verify=${Date.now()}`, {
    waitUntil: 'domcontentloaded',
    timeout: 45000,
  });
  await page.waitForSelector('.article-index-toc a.is-active', { timeout: 20000 });
  await page.waitForTimeout(1000);

  const initial = await page.evaluate(() => {
    const toc = document.querySelector('.article-index-toc');
    const article = document.querySelector('article.article-body');
    return {
      title: document.title,
      h1: document.querySelector('h1')?.textContent.trim(),
      canonical: document.querySelector('link[rel="canonical"]')?.href,
      h2Count: Array.from(article?.children || []).filter((node) => node.tagName === 'H2').length,
      tocScrollTop: toc?.scrollTop,
      documentWidth: document.documentElement.scrollWidth,
      viewportWidth: innerWidth,
      lastUpdated: article?.querySelector('.article-last-updated')?.textContent.trim(),
    };
  });

  assert(initial.title === EXPECTED_TITLE, 'Live SEO title mismatch', initial);
  assert(initial.h1 === EXPECTED_H1, 'Live H1 mismatch', initial);
  assert(initial.canonical === `${ORIGIN}${ARTICLE}`, 'Live canonical mismatch', initial);
  assert(initial.h2Count >= 14, 'Live article direct-heading count is too low', initial);
  assert(initial.tocScrollTop === 0, 'Live Article Index has internal scrolling', initial);
  assert(initial.documentWidth <= initial.viewportWidth, 'Live desktop horizontal overflow', initial);
  assert(initial.lastUpdated === 'Last updated on: 28/07/2026 at 09:24', 'Live update line mismatch', initial);

  await page.evaluate(() => {
    const heading = Array.from(document.querySelectorAll('article.article-body > h2'))
      .find((node) => node.textContent.trim() === 'Records the buyer should preserve');
    if (!heading) throw new Error('Target heading not found');
    heading.scrollIntoView({ block: 'start' });
  });
  await page.waitForTimeout(1000);

  const later = await page.evaluate(() => {
    const toc = document.querySelector('.article-index-toc');
    const active = toc?.querySelector('a.is-active');
    return {
      activeText: active?.textContent.trim(),
      tocScrollTop: toc?.scrollTop,
      documentWidth: document.documentElement.scrollWidth,
      viewportWidth: innerWidth,
    };
  });
  assert(later.activeText === 'Records the buyer should preserve', 'Live active Article Index heading mismatch', later);
  assert(later.tocScrollTop === 0, 'Live Article Index scrolled internally after navigation', later);
  assert(later.documentWidth <= later.viewportWidth, 'Live desktop overflow after navigation', later);

  await context.close();
  return { viewport, initial, later };
}

async function testMobile(browser) {
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    extraHTTPHeaders: { 'Cache-Control': 'no-cache, no-store, max-age=0', Pragma: 'no-cache' },
  });
  const page = await context.newPage();
  await page.goto(`${ORIGIN}${ARTICLE}?verify=${Date.now()}`, {
    waitUntil: 'domcontentloaded',
    timeout: 45000,
  });
  await page.waitForSelector('.article-index-toc', { timeout: 20000 });
  await page.waitForTimeout(800);
  const state = await page.evaluate(() => {
    const toc = document.querySelector('.article-index-toc');
    return {
      transform: getComputedStyle(toc).transform,
      scrollTop: toc.scrollTop,
      documentWidth: document.documentElement.scrollWidth,
      viewportWidth: innerWidth,
    };
  });
  assert(state.transform === 'none' || state.transform === 'matrix(1, 0, 0, 1, 0, 0)', 'Live mobile Article Index transform is not identity', state);
  assert(state.scrollTop === 0, 'Live mobile Article Index has internal scrolling', state);
  assert(state.documentWidth <= state.viewportWidth, 'Live mobile horizontal overflow', state);
  await context.close();
  return state;
}

(async () => {
  const deployment = await waitForDeployment();
  const browser = await chromium.launch({ headless: true });
  try {
    const desktop1440 = await testDesktop(browser, { width: 1440, height: 900 });
    const desktop1280 = await testDesktop(browser, { width: 1280, height: 720 });
    const mobile = await testMobile(browser);
    console.log(JSON.stringify({ deployment, desktop1440, desktop1280, mobile }, null, 2));
  } finally {
    await browser.close();
  }
})().catch((error) => {
  console.error(error.stack || error);
  process.exit(1);
});
