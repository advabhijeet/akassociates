'use strict';

const { chromium } = require('playwright');

function assert(condition, message, details) {
  if (!condition) throw new Error(`${message}\n${JSON.stringify(details, null, 2)}`);
}

async function snapshot(page) {
  return page.evaluate(() => {
    const toc = document.querySelector('.article-index-toc');
    const active = toc?.querySelector('a.is-active');
    return {
      title: document.title,
      h1: document.querySelector('h1')?.textContent.trim(),
      canonical: document.querySelector('link[rel="canonical"]')?.href,
      headings: Array.from(document.querySelectorAll('article.article-body > h2')).map((node) => node.textContent.trim()),
      activeText: active?.textContent.trim(),
      tocScrollTop: toc?.scrollTop,
      documentWidth: document.documentElement.scrollWidth,
      viewportWidth: window.innerWidth,
      transform: toc ? getComputedStyle(toc).transform : null,
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
  await page.waitForTimeout(800);
  return snapshot(page);
}

async function testDesktop(browser, viewport) {
  const page = await browser.newPage({ viewport });
  await page.goto('http://127.0.0.1:4173/updates/arbitration-notice-before-claim.html', {
    waitUntil: 'domcontentloaded',
    timeout: 30000,
  });
  await page.waitForSelector('.article-index-toc a.is-active', { timeout: 15000 });
  await page.waitForTimeout(700);

  const initial = await snapshot(page);
  assert(initial.title === 'Section 21 Arbitration Act: Notice, Receipt and Limitation | Chambers of AK', 'Unexpected SEO title', initial);
  assert(initial.h1 === 'Section 21 of the Arbitration Act Explained: When Do Arbitral Proceedings Commence?', 'Unexpected H1', initial);
  assert(initial.canonical === 'https://chambersofak.in/updates/arbitration-notice-before-claim.html', 'Canonical mismatch', initial);
  assert(initial.headings.length >= 14, 'Section 21 article has too few direct H2 headings', initial);
  assert(initial.headings.includes('Current Supreme Court position on absence or non-service of notice'), 'Current Supreme Court section missing', initial);
  assert(initial.headings.includes('How Section 21 interacts with limitation'), 'Limitation section missing', initial);
  assert(initial.documentWidth <= initial.viewportWidth, 'Horizontal overflow at initial load', initial);

  const receipt = await scrollToHeading(page, 'Why receipt matters more than dispatch');
  assert(receipt.activeText === 'Why receipt matters more than dispatch', 'Article Index did not track receipt heading', receipt);
  assert(receipt.tocScrollTop === 0, 'Article Index developed internal scrolling', receipt);

  const currentLaw = await scrollToHeading(page, 'Current Supreme Court position on absence or non-service of notice');
  assert(currentLaw.activeText === 'Current Supreme Court position on absence or non-service of notice', 'Article Index did not track current-law heading', currentLaw);
  assert(currentLaw.tocScrollTop === 0, 'Article Index developed internal scrolling on long article', currentLaw);
  assert(currentLaw.documentWidth <= currentLaw.viewportWidth, 'Horizontal overflow after scrolling', currentLaw);

  await page.close();
  return { viewport, initial, receipt, currentLaw };
}

(async () => {
  const browser = await chromium.launch({ headless: true });
  try {
    const desktop1440 = await testDesktop(browser, { width: 1440, height: 900 });
    const desktop1280 = await testDesktop(browser, { width: 1280, height: 720 });

    const mobile = await browser.newPage({ viewport: { width: 390, height: 844 } });
    await mobile.goto('http://127.0.0.1:4173/updates/arbitration-notice-before-claim.html', {
      waitUntil: 'domcontentloaded',
      timeout: 30000,
    });
    await mobile.waitForSelector('.article-index-toc', { timeout: 15000 });
    await mobile.waitForTimeout(600);
    const mobileState = await snapshot(mobile);
    assert(mobileState.transform === 'none' || mobileState.transform === 'matrix(1, 0, 0, 1, 0, 0)', 'Mobile Article Index transform is not identity', mobileState);
    assert(mobileState.tocScrollTop === 0, 'Mobile Article Index developed internal scrolling', mobileState);
    assert(mobileState.documentWidth <= mobileState.viewportWidth, 'Mobile horizontal overflow detected', mobileState);
    console.log(JSON.stringify({ desktop1440, desktop1280, mobile: mobileState }, null, 2));
    await mobile.close();
  } finally {
    await browser.close();
  }
})().catch((error) => {
  console.error(error.stack || error);
  process.exit(1);
});
