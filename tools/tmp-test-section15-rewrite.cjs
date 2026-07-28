'use strict';

const { chromium } = require('playwright');

function assert(condition, message, details) {
  if (!condition) {
    throw new Error(`${message}\n${JSON.stringify(details, null, 2)}`);
  }
}

async function snapshot(page) {
  return page.evaluate(() => {
    const toc = document.querySelector('.article-index-toc');
    const active = toc?.querySelector('a.is-active');
    const article = document.querySelector('article.article-body');
    const image = article?.querySelector('.article-featured-figure img');
    return {
      title: document.title,
      h1: document.querySelector('h1')?.textContent.trim(),
      canonical: document.querySelector('link[rel="canonical"]')?.href,
      ogImage: document.querySelector('meta[property="og:image"]')?.content,
      h2Count: article ? Array.from(article.children).filter((node) => node.tagName === 'H2').length : 0,
      tocExists: Boolean(toc),
      tocScrollTop: toc?.scrollTop,
      activeText: active?.textContent.trim(),
      documentWidth: document.documentElement.scrollWidth,
      viewportWidth: window.innerWidth,
      imageWidth: image?.getAttribute('width'),
      imageHeight: image?.getAttribute('height'),
      oldIncomeTaxTag: document.body.textContent.includes('Income Tax'),
      lastUpdated: article?.querySelector('.article-last-updated')?.textContent.trim(),
    };
  });
}

async function scrollToHeading(page, headingText) {
  await page.evaluate((text) => {
    const heading = Array.from(document.querySelectorAll('article.article-body > h2'))
      .find((node) => node.textContent.trim() === text);
    if (!heading) throw new Error(`Heading not found: ${text}`);
    heading.scrollIntoView({ block: 'start' });
  }, headingText);
  await page.waitForTimeout(900);
  return snapshot(page);
}

(async () => {
  const browser = await chromium.launch({ headless: true });
  try {
    for (const viewport of [{ width: 1440, height: 900 }, { width: 1280, height: 720 }]) {
      const page = await browser.newPage({ viewport });
      await page.goto('http://127.0.0.1:4173/updates/msme-45-days-payment-rule.html', {
        waitUntil: 'domcontentloaded',
        timeout: 30000,
      });
      await page.waitForSelector('.article-index-toc a.is-active', { timeout: 15000 });
      await page.waitForTimeout(900);

      const initial = await snapshot(page);
      assert(initial.title === 'Section 15 MSMED Act: 15-Day and 45-Day Payment Rules | Chambers of AK', 'SEO title mismatch', initial);
      assert(initial.h1 === 'Section 15 of the MSMED Act Explained: When Must a Buyer Pay an MSE Supplier?', 'H1 mismatch', initial);
      assert(initial.canonical === 'https://chambersofak.in/updates/msme-45-days-payment-rule.html', 'Canonical mismatch', initial);
      assert(initial.ogImage.endsWith('/assets/img/citadel/citadel-thumb-msme-45-days-payment-rule-batch6-v2.jpg'), 'OG image mismatch', initial);
      assert(initial.h2Count >= 14, 'Expected a long direct-heading Article Index', initial);
      assert(initial.tocExists, 'Article Index was not created', initial);
      assert(initial.tocScrollTop === 0, 'Article Index developed internal scrolling', initial);
      assert(initial.documentWidth <= initial.viewportWidth, 'Horizontal overflow detected', initial);
      assert(initial.imageWidth === '1200' && initial.imageHeight === '675', 'Featured image dimensions missing', initial);
      assert(!initial.oldIncomeTaxTag, 'Unrelated Income Tax tag remains visible', initial);
      assert(initial.lastUpdated === 'Last updated on: 28/07/2026 at 09:24', 'Visible update timestamp mismatch', initial);

      const later = await scrollToHeading(page, 'Records the buyer should preserve');
      assert(later.activeText === 'Records the buyer should preserve', 'Active Article Index heading did not update', later);
      assert(later.tocScrollTop === 0, 'Article Index developed internal scrolling after navigation', later);
      assert(later.documentWidth <= later.viewportWidth, 'Horizontal overflow after navigation', later);

      console.log(JSON.stringify({ viewport, initial, later }));
      await page.close();
    }

    const mobile = await browser.newPage({ viewport: { width: 390, height: 844 } });
    await mobile.goto('http://127.0.0.1:4173/updates/msme-45-days-payment-rule.html', {
      waitUntil: 'domcontentloaded',
      timeout: 30000,
    });
    await mobile.waitForSelector('.article-index-toc', { timeout: 15000 });
    await mobile.waitForTimeout(600);
    const mobileState = await mobile.evaluate(() => {
      const toc = document.querySelector('.article-index-toc');
      return {
        transform: getComputedStyle(toc).transform,
        scrollTop: toc.scrollTop,
        documentWidth: document.documentElement.scrollWidth,
        viewportWidth: window.innerWidth,
        h1Width: document.querySelector('h1').getBoundingClientRect().width,
      };
    });
    assert(mobileState.transform === 'none' || mobileState.transform === 'matrix(1, 0, 0, 1, 0, 0)', 'Mobile Article Index transform is not identity', mobileState);
    assert(mobileState.scrollTop === 0, 'Mobile Article Index developed internal scrolling', mobileState);
    assert(mobileState.documentWidth <= mobileState.viewportWidth, 'Mobile horizontal overflow detected', mobileState);
    console.log(JSON.stringify({ mobile: mobileState }));
    await mobile.close();
  } finally {
    await browser.close();
  }
})().catch((error) => {
  console.error(error.stack || error);
  process.exit(1);
});
