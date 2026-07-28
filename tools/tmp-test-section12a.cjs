'use strict';

const { chromium } = require('playwright');

const ARTICLE_PATH = '/updates/section-12a-commercial-courts-pre-institution-mediation.html';
const EXPECTED_H1 = 'Section 12A of the Commercial Courts Act Explained: Pre-Institution Mediation Before Suit';
const EXPECTED_CANONICAL = 'https://chambersofak.in/updates/section-12a-commercial-courts-pre-institution-mediation.html';

function assert(condition, message, details) {
  if (!condition) {
    throw new Error(`${message}\n${JSON.stringify(details, null, 2)}`);
  }
}

async function snapshot(page) {
  return page.evaluate(() => {
    const article = document.querySelector('article[data-citadel-article-index]');
    const toc = document.querySelector('.article-index-toc');
    const active = toc?.querySelector('a.is-active');
    return {
      title: document.title,
      h1: document.querySelector('h1')?.textContent.trim(),
      canonical: document.querySelector('link[rel="canonical"]')?.href,
      datePublished: document.querySelector('meta[property="article:published_time"]')?.content,
      dateModified: document.querySelector('meta[property="article:modified_time"]')?.content,
      directH2Count: article ? Array.from(article.children).filter((node) => node.tagName === 'H2').length : 0,
      tocScrollTop: toc?.scrollTop,
      activeText: active?.textContent.trim(),
      transform: toc ? getComputedStyle(toc).transform : null,
      documentWidth: document.documentElement.scrollWidth,
      viewportWidth: innerWidth,
    };
  });
}

async function scrollToHeading(page, headingText) {
  await page.evaluate((text) => {
    const heading = Array.from(document.querySelectorAll('article[data-citadel-article-index] > h2'))
      .find((node) => node.textContent.trim() === text);
    if (!heading) throw new Error(`Heading not found: ${text}`);

    const nav = document.querySelector('.nav');
    const topbar = document.querySelector('.site-topbar');
    const navSpace = Math.ceil((topbar?.getBoundingClientRect().height || 0) + (nav?.getBoundingClientRect().height || 0));
    window.scrollTo(0, window.scrollY + heading.getBoundingClientRect().top - (navSpace + 100));
  }, headingText);
  await page.waitForTimeout(800);
  return snapshot(page);
}

async function testDesktop(browser, viewport) {
  const page = await browser.newPage({ viewport, colorScheme: 'dark' });
  await page.goto(`http://127.0.0.1:4173${ARTICLE_PATH}`, {
    waitUntil: 'domcontentloaded',
    timeout: 30000,
  });
  await page.waitForSelector('.article-index-toc a.is-active', { timeout: 15000 });
  await page.waitForTimeout(750);

  const initial = await snapshot(page);
  assert(initial.title === 'Section 12A Commercial Courts Act: Pre-Institution Mediation | Chambers of AK', 'Unexpected document title', initial);
  assert(initial.h1 === EXPECTED_H1, 'Unexpected article H1', initial);
  assert(initial.canonical === EXPECTED_CANONICAL, 'Canonical URL mismatch', initial);
  assert(initial.datePublished.startsWith('2026-07-28'), 'Publication date mismatch', initial);
  assert(initial.dateModified.startsWith('2026-07-28'), 'Modification date mismatch', initial);
  assert(initial.directH2Count >= 18, 'Article does not expose enough direct H2 sections for the Article Index', initial);
  assert(initial.tocScrollTop === 0, 'Article Index has internal scrolling at page load', initial);
  assert(initial.documentWidth <= initial.viewportWidth, 'Horizontal overflow at page load', initial);

  const urgency = await scrollToHeading(page, 'What qualifies as urgent interim relief?');
  assert(urgency.activeText === 'What qualifies as urgent interim relief?', 'Urgency heading did not become active', urgency);
  assert(urgency.tocScrollTop === 0, 'Article Index developed internal scrolling at urgency heading', urgency);
  assert(urgency.documentWidth <= urgency.viewportWidth, 'Horizontal overflow at urgency heading', urgency);

  const limitation = await scrollToHeading(page, 'How limitation is protected during mediation');
  assert(limitation.activeText === 'How limitation is protected during mediation', 'Limitation heading did not become active', limitation);
  assert(limitation.tocScrollTop === 0, 'Article Index developed internal scrolling at limitation heading', limitation);

  const mistakes = await scrollToHeading(page, 'Common mistakes');
  assert(mistakes.activeText === 'Common mistakes', 'Common mistakes heading did not become active', mistakes);
  assert(mistakes.tocScrollTop === 0, 'Article Index developed internal scrolling at later heading', mistakes);
  assert(mistakes.documentWidth <= mistakes.viewportWidth, 'Horizontal overflow at later heading', mistakes);

  await page.close();
  return { viewport, initial, urgency, limitation, mistakes };
}

async function testMobile(browser) {
  const page = await browser.newPage({ viewport: { width: 390, height: 844 }, colorScheme: 'dark' });
  await page.goto(`http://127.0.0.1:4173${ARTICLE_PATH}`, {
    waitUntil: 'domcontentloaded',
    timeout: 30000,
  });
  await page.waitForSelector('.article-index-toc', { timeout: 15000 });
  await page.waitForTimeout(600);
  const state = await snapshot(page);
  assert(state.h1 === EXPECTED_H1, 'Mobile H1 mismatch', state);
  assert(state.transform === 'none' || state.transform === 'matrix(1, 0, 0, 1, 0, 0)', 'Mobile Article Index transform is not identity', state);
  assert(state.tocScrollTop === 0, 'Mobile Article Index has internal scrolling', state);
  assert(state.documentWidth <= state.viewportWidth, 'Mobile horizontal overflow detected', state);
  await page.close();
  return state;
}

(async () => {
  const browser = await chromium.launch({ headless: true });
  try {
    const desktop1440 = await testDesktop(browser, { width: 1440, height: 900 });
    const desktop1280 = await testDesktop(browser, { width: 1280, height: 720 });
    const mobile = await testMobile(browser);
    console.log(JSON.stringify({ status: 'PASS', desktop1440, desktop1280, mobile }, null, 2));
  } finally {
    await browser.close();
  }
})().catch((error) => {
  console.error(error.stack || error);
  process.exit(1);
});
