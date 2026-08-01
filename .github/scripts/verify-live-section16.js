const { chromium } = require('playwright');

const origin = 'https://chambersofak.in';
const articlePath = '/updates/section-16-msmed-act-compound-interest.html';
const canonical = `${origin}${articlePath}`;
const expectedTitle = 'Section 16 MSMED Act: Compound Interest on Delayed Payments | Chambers of AK';
const expectedH1 = 'Section 16 of the MSMED Act Explained: Compound Interest on Delayed MSME Payments';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function getText(path) {
  const url = `${origin}${path}${path.includes('?') ? '&' : '?'}verify=${Date.now()}-${Math.random()}`;
  const response = await fetch(url, {
    headers: {
      'cache-control': 'no-cache, no-store, must-revalidate',
      pragma: 'no-cache'
    }
  });
  if (!response.ok) throw new Error(`${path} returned ${response.status}`);
  return response.text();
}

async function waitForDeployment() {
  let lastError = null;
  for (let attempt = 1; attempt <= 60; attempt += 1) {
    try {
      const [article, home, updates, sitemap, feed] = await Promise.all([
        getText(articlePath),
        getText('/'),
        getText('/legal-updates.html'),
        getText('/sitemap.xml'),
        getText('/feed.xml')
      ]);

      const checks = [
        [article.includes(`<title>${expectedTitle}</title>`), 'article title'],
        [article.includes(expectedH1), 'article H1'],
        [article.includes(`href="${canonical}"`), 'article canonical'],
        [article.includes('"datePublished": "2026-08-01"'), 'publication date'],
        [article.includes('Illustration dated 1 August 2026'), 'dated RBI illustration'],
        [article.includes('compound interest with monthly rests'), 'monthly rests'],
        [article.includes('Section 23'), 'Section 23 treatment'],
        [article.includes('M/s Tirupati Steel'), 'pre-deposit authority'],
        [home.includes(articlePath.slice(1)), 'homepage card'],
        [updates.includes(articlePath.slice(1)), 'Legal Updates entry'],
        [sitemap.includes(canonical) && sitemap.includes('<lastmod>2026-08-01</lastmod>'), 'sitemap entry'],
        [feed.includes(canonical) && feed.includes('Section 16 MSMED Act: compound interest on delayed payments'), 'RSS entry']
      ];
      const failed = checks.filter(([ok]) => !ok).map(([, label]) => label);
      if (failed.length) throw new Error(`Pending deployment checks: ${failed.join(', ')}`);

      console.log(`Live Section 16 deployment detected on attempt ${attempt}.`);
      return;
    } catch (error) {
      lastError = error;
      console.log(`Deployment attempt ${attempt}/60 not ready: ${error.message}`);
      await sleep(15000);
    }
  }
  throw lastError || new Error('Deployment did not become ready.');
}

async function inspectViewport(browser, viewport) {
  const page = await browser.newPage({ viewport });
  await page.goto(`${canonical}?verify-browser=${Date.now()}-${viewport.width}`, {
    waitUntil: 'networkidle'
  });

  if (await page.title() !== expectedTitle) throw new Error(`Live title mismatch at ${viewport.width}`);
  const h1 = (await page.locator('h1').first().textContent() || '').trim();
  if (h1 !== expectedH1) throw new Error(`Live H1 mismatch at ${viewport.width}: ${h1}`);
  if (await page.locator('link[rel="canonical"]').getAttribute('href') !== canonical) {
    throw new Error(`Live canonical mismatch at ${viewport.width}`);
  }

  await page.waitForSelector('.article-index-toc');
  const linkCount = await page.locator('.article-index-toc ol a').count();
  if (linkCount < 12) throw new Error(`Live Article Index is incomplete: ${linkCount}`);

  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1);
  if (overflow) throw new Error(`Live horizontal overflow at ${viewport.width}x${viewport.height}`);

  if (viewport.width > 920) {
    const headings = page.locator('article.article-body > h2');
    const count = await headings.count();
    await headings.nth(Math.max(1, Math.floor(count * 0.7))).scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    if (await page.locator('.article-index-toc a.is-active').count() !== 1) {
      throw new Error(`Live active heading tracking failed at ${viewport.width}`);
    }
    const scrollTop = await page.locator('.article-index-toc').evaluate((node) => node.scrollTop);
    if (scrollTop !== 0) throw new Error(`Live Article Index internally scrolled: ${scrollTop}`);
  } else {
    const transform = await page.locator('.article-index-toc').evaluate((node) => getComputedStyle(node).transform);
    const identities = [
      'none',
      'matrix(1, 0, 0, 1, 0, 0)',
      'matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)'
    ];
    if (!identities.includes(transform)) throw new Error(`Live mobile transform is not identity: ${transform}`);
    const scrollTop = await page.locator('.article-index-toc').evaluate((node) => node.scrollTop);
    if (scrollTop !== 0) throw new Error(`Live mobile Article Index internally scrolled: ${scrollTop}`);
  }

  await page.close();
  console.log(`Live Section 16 browser verification passed at ${viewport.width}x${viewport.height}.`);
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
      await inspectViewport(browser, viewport);
    }
  } finally {
    await browser.close();
  }
  console.log('Live Section 16 publication verification passed.');
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
