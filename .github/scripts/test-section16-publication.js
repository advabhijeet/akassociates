const { chromium } = require('playwright');

const expectedTitle = 'Section 16 MSMED Act: Compound Interest on Delayed Payments | Chambers of AK';
const expectedH1 = 'Section 16 of the MSMED Act Explained: Compound Interest on Delayed MSME Payments';
const expectedCanonical = 'https://chambersofak.in/updates/section-16-msmed-act-compound-interest.html';

async function inspectViewport(browser, viewport) {
  const page = await browser.newPage({ viewport });
  await page.goto('http://127.0.0.1:4173/updates/section-16-msmed-act-compound-interest.html', { waitUntil: 'networkidle' });

  const title = await page.title();
  if (title !== expectedTitle) throw new Error(`Unexpected title at ${viewport.width}: ${title}`);

  const h1 = (await page.locator('h1').first().textContent() || '').trim();
  if (h1 !== expectedH1) throw new Error(`Unexpected H1 at ${viewport.width}: ${h1}`);

  const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
  if (canonical !== expectedCanonical) throw new Error(`Unexpected canonical: ${canonical}`);

  const bodyText = await page.locator('article.article-body').innerText();
  for (const phrase of [
    'three times the RBI Bank Rate',
    'compound interest with monthly rests',
    'Section 23',
    'M/s Tirupati Steel',
    '1 August 2026'
  ]) {
    if (!bodyText.includes(phrase)) throw new Error(`Missing required article phrase: ${phrase}`);
  }

  const jsonLd = await page.locator('script[type="application/ld+json"]').allTextContents();
  if (!jsonLd.some((text) => text.includes('"datePublished": "2026-08-01"') && text.includes(expectedCanonical))) {
    throw new Error('BlogPosting JSON-LD publication metadata is missing.');
  }

  await page.waitForSelector('.article-index-toc');
  const indexLinkCount = await page.locator('.article-index-toc ol a').count();
  if (indexLinkCount < 12) throw new Error(`Article Index too short: ${indexLinkCount}`);

  const horizontalOverflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1);
  if (horizontalOverflow) throw new Error(`Horizontal overflow at ${viewport.width}x${viewport.height}`);

  if (viewport.width > 920) {
    const headings = page.locator('article.article-body > h2');
    const target = headings.nth(Math.max(1, Math.floor((await headings.count()) * 0.65)));
    await target.scrollIntoViewIfNeeded();
    await page.waitForTimeout(250);

    const activeCount = await page.locator('.article-index-toc a.is-active').count();
    if (activeCount !== 1) throw new Error(`Expected one active Article Index link, found ${activeCount}`);

    const tocScrollTop = await page.locator('.article-index-toc').evaluate((node) => node.scrollTop);
    if (tocScrollTop !== 0) throw new Error(`Article Index has internal scrolling: ${tocScrollTop}`);
  } else {
    const transform = await page.locator('.article-index-toc').evaluate((node) => getComputedStyle(node).transform);
    if (!['none', 'matrix(1, 0, 0, 1, 0, 0)', 'matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)'].includes(transform)) {
      throw new Error(`Mobile Article Index transform is not identity: ${transform}`);
    }

    const tocScrollTop = await page.locator('.article-index-toc').evaluate((node) => node.scrollTop);
    if (tocScrollTop !== 0) throw new Error(`Mobile Article Index has internal scrolling: ${tocScrollTop}`);
  }

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
      await inspectViewport(browser, viewport);
      console.log(`Section 16 browser regression passed at ${viewport.width}x${viewport.height}.`);
    }
  } finally {
    await browser.close();
  }
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
