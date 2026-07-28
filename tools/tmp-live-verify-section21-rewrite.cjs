'use strict';

const { chromium } = require('playwright');

const ORIGIN = 'https://chambersofak.in';
const ARTICLE = '/updates/arbitration-notice-before-claim.html';
const EXPECTED_TITLE = 'Section 21 Arbitration Act: Notice, Receipt and Limitation | Chambers of AK';
const EXPECTED_H1 = 'Section 21 of the Arbitration Act Explained: When Do Arbitral Proceedings Commence?';

function assert(condition, message, details) {
  if (!condition) throw new Error(`${message}\n${JSON.stringify(details, null, 2)}`);
}

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function fetchText(url) {
  const response = await fetch(url, {
    headers: { 'Cache-Control': 'no-cache, no-store, max-age=0', Pragma: 'no-cache' },
  });
  if (!response.ok) throw new Error(`HTTP ${response.status} for ${url}`);
  return response.text();
}

async function waitForDeployment() {
  let last;
  for (let attempt = 1; attempt <= 24; attempt += 1) {
    const stamp = `${Date.now()}-${attempt}`;
    try {
      const [html, feed] = await Promise.all([
        fetchText(`${ORIGIN}${ARTICLE}?verify=${stamp}`),
        fetchText(`${ORIGIN}/feed.xml?verify=${stamp}`),
      ]);
      last = {
        attempt,
        title: html.includes(EXPECTED_TITLE),
        h1: html.includes(EXPECTED_H1),
        canonical: html.includes('https://chambersofak.in/updates/arbitration-notice-before-claim.html'),
        modified: html.includes('2026-07-28'),
        currentLaw: html.includes('Current Supreme Court position on absence or non-service of notice'),
        feed: feed.includes('Section 21 Arbitration Act: notice, receipt and commencement'),
      };
      if (Object.values(last).slice(1).every(Boolean)) return last;
    } catch (error) {
      last = { attempt, error: error.message };
    }
    await wait(15000);
  }
  throw new Error(`Deployment did not propagate\n${JSON.stringify(last, null, 2)}`);
}

async function snapshot(page) {
  return page.evaluate(() => {
    const toc = document.querySelector('.article-index-toc');
    return {
      title: document.title,
      h1: document.querySelector('h1')?.textContent.trim(),
      canonical: document.querySelector('link[rel="canonical"]')?.href,
      active: toc?.querySelector('a.is-active')?.textContent.trim(),
      tocScrollTop: toc?.scrollTop,
      transform: toc ? getComputedStyle(toc).transform : null,
      documentWidth: document.documentElement.scrollWidth,
      viewportWidth: innerWidth,
    };
  });
}

async function scrollToHeading(page, text) {
  await page.evaluate((headingText) => {
    const heading = Array.from(document.querySelectorAll('article.article-body > h2'))
      .find((node) => node.textContent.trim() === headingText);
    if (!heading) throw new Error(`Heading not found: ${headingText}`);
    const nav = document.querySelector('.nav');
    const topbar = document.querySelector('.site-topbar');
    const offset = Math.ceil((nav?.getBoundingClientRect().height || 0) + (topbar?.getBoundingClientRect().height || 0) + 90);
    window.scrollTo(0, window.scrollY + heading.getBoundingClientRect().top - offset);
  }, text);
  await page.waitForTimeout(900);
  return snapshot(page);
}

async function testDesktop(browser, viewport) {
  const context = await browser.newContext({
    viewport,
    extraHTTPHeaders: { 'Cache-Control': 'no-cache, no-store, max-age=0', Pragma: 'no-cache' },
  });
  const page = await context.newPage();
  await page.goto(`${ORIGIN}${ARTICLE}?verify=${Date.now()}`, { waitUntil: 'domcontentloaded', timeout: 45000 });
  await page.waitForSelector('.article-index-toc a.is-active', { timeout: 20000 });
  await page.waitForTimeout(900);
  const initial = await snapshot(page);
  assert(initial.title === EXPECTED_TITLE, 'Live title mismatch', initial);
  assert(initial.h1 === EXPECTED_H1, 'Live H1 mismatch', initial);
  assert(initial.canonical === `${ORIGIN}${ARTICLE}`, 'Live canonical mismatch', initial);
  assert(initial.documentWidth <= initial.viewportWidth, 'Initial horizontal overflow', initial);

  const receipt = await scrollToHeading(page, 'Why receipt matters more than dispatch');
  assert(receipt.active === 'Why receipt matters more than dispatch', 'Article Index receipt heading mismatch', receipt);
  assert(receipt.tocScrollTop === 0, 'Internal Article Index scrolling detected', receipt);

  const currentLaw = await scrollToHeading(page, 'Current Supreme Court position on absence or non-service of notice');
  assert(currentLaw.active === 'Current Supreme Court position on absence or non-service of notice', 'Article Index current-law heading mismatch', currentLaw);
  assert(currentLaw.tocScrollTop === 0, 'Internal Article Index scrolling detected on long article', currentLaw);
  assert(currentLaw.documentWidth <= currentLaw.viewportWidth, 'Scrolled horizontal overflow', currentLaw);
  await context.close();
  return { viewport, initial, receipt, currentLaw };
}

(async () => {
  const deployment = await waitForDeployment();
  const browser = await chromium.launch({ headless: true });
  try {
    const desktop1440 = await testDesktop(browser, { width: 1440, height: 900 });
    const desktop1280 = await testDesktop(browser, { width: 1280, height: 720 });

    const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
    const page = await context.newPage();
    await page.goto(`${ORIGIN}${ARTICLE}?verify=${Date.now()}`, { waitUntil: 'domcontentloaded', timeout: 45000 });
    await page.waitForSelector('.article-index-toc', { timeout: 20000 });
    await page.waitForTimeout(700);
    const mobile = await snapshot(page);
    assert(mobile.transform === 'none' || mobile.transform === 'matrix(1, 0, 0, 1, 0, 0)', 'Mobile Article Index transform is not identity', mobile);
    assert(mobile.tocScrollTop === 0, 'Mobile internal Article Index scrolling detected', mobile);
    assert(mobile.documentWidth <= mobile.viewportWidth, 'Mobile horizontal overflow', mobile);
    await context.close();
    console.log(JSON.stringify({ deployment, desktop1440, desktop1280, mobile }, null, 2));
  } finally {
    await browser.close();
  }
})().catch((error) => {
  console.error(error.stack || error);
  process.exit(1);
});
