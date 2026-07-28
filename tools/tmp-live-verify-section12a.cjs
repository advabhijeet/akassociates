'use strict';

const { chromium } = require('playwright');

const ORIGIN = 'https://chambersofak.in';
const ARTICLE_PATH = '/updates/section-12a-commercial-courts-pre-institution-mediation.html';
const EXPECTED_H1 = 'Section 12A of the Commercial Courts Act Explained: Pre-Institution Mediation Before Suit';
const EXPECTED_CANONICAL = `${ORIGIN}${ARTICLE_PATH}`;

function assert(condition, message, details) {
  if (!condition) throw new Error(`${message}\n${JSON.stringify(details, null, 2)}`);
}

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

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
  let last;
  for (let attempt = 1; attempt <= 24; attempt += 1) {
    const stamp = `${Date.now()}-${attempt}`;
    try {
      const [article, homepage, insights, feed, sitemap] = await Promise.all([
        fetchText(`${ORIGIN}${ARTICLE_PATH}?verify=${stamp}`),
        fetchText(`${ORIGIN}/?verify=${stamp}`),
        fetchText(`${ORIGIN}/legal-updates.html?verify=${stamp}`),
        fetchText(`${ORIGIN}/feed.xml?verify=${stamp}`),
        fetchText(`${ORIGIN}/sitemap.xml?verify=${stamp}`),
      ]);
      last = {
        attempt,
        article: article.includes(EXPECTED_H1) && article.includes('2026-07-28'),
        homepage: homepage.includes(ARTICLE_PATH.slice(1)),
        insights: insights.includes(ARTICLE_PATH.slice(1)),
        feed: feed.includes(EXPECTED_CANONICAL) && feed.includes('Section 12A Commercial Courts Act: pre-institution mediation'),
        sitemap: sitemap.includes(EXPECTED_CANONICAL),
      };
      if (Object.values(last).slice(1).every(Boolean)) return last;
    } catch (error) {
      last = { attempt, error: error.message };
    }
    await wait(15000);
  }
  throw new Error(`Section 12A deployment did not propagate in time\n${JSON.stringify(last, null, 2)}`);
}

async function snapshot(page) {
  return page.evaluate(() => {
    const toc = document.querySelector('.article-index-toc');
    const active = toc?.querySelector('a.is-active');
    return {
      title: document.title,
      h1: document.querySelector('h1')?.textContent.trim(),
      canonical: document.querySelector('link[rel="canonical"]')?.href,
      dateModified: document.querySelector('meta[property="article:modified_time"]')?.content,
      activeText: active?.textContent.trim(),
      tocScrollTop: toc?.scrollTop,
      transform: toc ? getComputedStyle(toc).transform : null,
      documentWidth: document.documentElement.scrollWidth,
      viewportWidth: innerWidth,
    };
  });
}

async function scrollToHeading(page, text) {
  await page.evaluate((headingText) => {
    const heading = Array.from(document.querySelectorAll('article[data-citadel-article-index] > h2'))
      .find((node) => node.textContent.trim() === headingText);
    if (!heading) throw new Error(`Heading not found: ${headingText}`);
    const nav = document.querySelector('.nav');
    const topbar = document.querySelector('.site-topbar');
    const offset = Math.ceil((nav?.getBoundingClientRect().height || 0) + (topbar?.getBoundingClientRect().height || 0) + 100);
    window.scrollTo(0, window.scrollY + heading.getBoundingClientRect().top - offset);
  }, text);
  await page.waitForTimeout(900);
  return snapshot(page);
}

async function testDesktop(browser, viewport) {
  const context = await browser.newContext({
    viewport,
    colorScheme: 'dark',
    extraHTTPHeaders: { 'Cache-Control': 'no-cache, no-store, max-age=0', Pragma: 'no-cache' },
  });
  const page = await context.newPage();
  await page.goto(`${ORIGIN}${ARTICLE_PATH}?verify=${Date.now()}`, { waitUntil: 'domcontentloaded', timeout: 45000 });
  await page.waitForSelector('.article-index-toc a.is-active', { timeout: 20000 });
  await page.waitForTimeout(900);

  const initial = await snapshot(page);
  assert(initial.title === 'Section 12A Commercial Courts Act: Pre-Institution Mediation | Chambers of AK', 'Live title mismatch', initial);
  assert(initial.h1 === EXPECTED_H1, 'Live H1 mismatch', initial);
  assert(initial.canonical === EXPECTED_CANONICAL, 'Live canonical mismatch', initial);
  assert(initial.dateModified.startsWith('2026-07-28'), 'Live modification date mismatch', initial);
  assert(initial.tocScrollTop === 0, 'Internal Article Index scrolling at load', initial);
  assert(initial.documentWidth <= initial.viewportWidth, 'Horizontal overflow at load', initial);

  const urgency = await scrollToHeading(page, 'What qualifies as urgent interim relief?');
  assert(urgency.activeText === 'What qualifies as urgent interim relief?', 'Live urgency heading not active', urgency);
  assert(urgency.tocScrollTop === 0, 'Internal Article Index scrolling at urgency heading', urgency);

  const limitation = await scrollToHeading(page, 'How limitation is protected during mediation');
  assert(limitation.activeText === 'How limitation is protected during mediation', 'Live limitation heading not active', limitation);
  assert(limitation.tocScrollTop === 0, 'Internal Article Index scrolling at limitation heading', limitation);
  assert(limitation.documentWidth <= limitation.viewportWidth, 'Horizontal overflow at later heading', limitation);

  await context.close();
  return { viewport, initial, urgency, limitation };
}

async function testMobile(browser) {
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    colorScheme: 'dark',
    extraHTTPHeaders: { 'Cache-Control': 'no-cache, no-store, max-age=0', Pragma: 'no-cache' },
  });
  const page = await context.newPage();
  await page.goto(`${ORIGIN}${ARTICLE_PATH}?verify=${Date.now()}`, { waitUntil: 'domcontentloaded', timeout: 45000 });
  await page.waitForSelector('.article-index-toc', { timeout: 20000 });
  await page.waitForTimeout(700);
  const state = await snapshot(page);
  assert(state.h1 === EXPECTED_H1, 'Mobile H1 mismatch', state);
  assert(state.transform === 'none' || state.transform === 'matrix(1, 0, 0, 1, 0, 0)', 'Mobile transform is not identity', state);
  assert(state.tocScrollTop === 0, 'Mobile internal Article Index scrolling', state);
  assert(state.documentWidth <= state.viewportWidth, 'Mobile horizontal overflow', state);
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
    console.log(JSON.stringify({ status: 'PASS', deployment, desktop1440, desktop1280, mobile }, null, 2));
  } finally {
    await browser.close();
  }
})().catch((error) => {
  console.error(error.stack || error);
  process.exit(1);
});
