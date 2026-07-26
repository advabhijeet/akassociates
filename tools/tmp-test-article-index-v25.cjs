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
    const article = document.querySelector('article[data-citadel-article-index], article.article-body, article.ck-article');
    const nav = document.querySelector('.nav');
    const topbar = document.querySelector('.site-topbar');
    const tocRect = toc?.getBoundingClientRect();
    const activeRect = active?.getBoundingClientRect();
    const articleRect = article?.getBoundingClientRect();
    const navSpace = Math.ceil((topbar?.getBoundingClientRect().height || 0) + (nav?.getBoundingClientRect().height || 0));

    return {
      scrollY: window.scrollY,
      transform: toc ? getComputedStyle(toc).transform : null,
      tocTop: tocRect?.top,
      tocBottom: tocRect?.bottom,
      tocScrollTop: toc?.scrollTop,
      activeText: active?.textContent.trim(),
      activeTop: activeRect?.top,
      activeBottom: activeRect?.bottom,
      safeTop: navSpace + 56,
      safeBottom: Math.max(navSpace + 128, window.innerHeight - 44),
      articleTop: articleRect?.top,
      articleBottom: articleRect?.bottom,
      viewportHeight: window.innerHeight,
      viewportWidth: window.innerWidth,
      documentWidth: document.documentElement.scrollWidth,
    };
  });
}

async function scrollToHeading(page, headingText) {
  await page.evaluate((text) => {
    const heading = Array.from(document.querySelectorAll('article.article-body > h2, article.ck-article > h2'))
      .find((node) => node.textContent.trim() === text);
    if (!heading) throw new Error(`Heading not found: ${text}`);

    const nav = document.querySelector('.nav');
    const topbar = document.querySelector('.site-topbar');
    const navSpace = Math.ceil((topbar?.getBoundingClientRect().height || 0) + (nav?.getBoundingClientRect().height || 0));
    const target = window.scrollY + heading.getBoundingClientRect().top - (navSpace + 100);
    window.scrollTo(0, target);
  }, headingText);

  await page.waitForTimeout(850);
  return snapshot(page);
}

async function testDesktop(browser, viewport) {
  const page = await browser.newPage({ viewport });
  await page.goto('http://127.0.0.1:4173/updates/commercial-contract-review-checklist.html', {
    waitUntil: 'domcontentloaded',
    timeout: 30000,
  });
  await page.waitForSelector('.article-index-toc a.is-active', { timeout: 15000 });
  await page.waitForSelector('.site-topbar', { timeout: 10000 });
  await page.waitForTimeout(850);

  const first = await scrollToHeading(page, 'Why review the contract before signature?');
  const confidentiality = await scrollToHeading(page, 'Confidentiality, data and record management');
  const governing = await scrollToHeading(page, 'Governing law, jurisdiction and arbitration');
  const upward = await scrollToHeading(page, 'Confidentiality, data and record management');

  for (const [name, state, expected] of [
    ['first', first, 'Why review the contract before signature?'],
    ['confidentiality', confidentiality, 'Confidentiality, data and record management'],
    ['governing', governing, 'Governing law, jurisdiction and arbitration'],
    ['upward', upward, 'Confidentiality, data and record management'],
  ]) {
    assert(state.activeText === expected, `${name}: active index entry does not match the article heading`, state);
    assert(state.tocScrollTop === 0, `${name}: Article Index developed internal scrolling`, state);
    assert(state.activeTop >= state.safeTop - 3, `${name}: active index entry is above the safe viewport band`, state);
    assert(state.activeBottom <= state.safeBottom + 3, `${name}: active index entry is below the safe viewport band`, state);
    assert(state.documentWidth <= state.viewportWidth, `${name}: horizontal overflow detected`, state);
  }

  assert(confidentiality.tocTop < first.tocTop - 20,
    'The complete Article Index tray did not move upward for the Confidentiality heading', { first, confidentiality });
  assert(governing.tocTop < confidentiality.tocTop - 20,
    'The complete Article Index tray did not continue upward for the Governing law heading', { confidentiality, governing });
  assert(upward.tocTop > governing.tocTop + 20,
    'The complete Article Index tray did not return downward while scrolling upward', { governing, upward });

  for (let attempt = 0; attempt < 3; attempt += 1) {
    await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
    await page.waitForTimeout(500);
  }
  const end = await snapshot(page);
  assert(end.tocBottom <= end.articleBottom + 1.5,
    'Article Index tray exceeds the article bottom boundary', end);
  assert(end.tocScrollTop === 0, 'Article Index developed internal scrolling at article end', end);

  console.log(JSON.stringify({ viewport, first, confidentiality, governing, upward, end }));
  await page.close();
}

(async () => {
  const browser = await chromium.launch({ headless: true });
  try {
    await testDesktop(browser, { width: 1440, height: 900 });
    await testDesktop(browser, { width: 1280, height: 720 });

    const mobile = await browser.newPage({ viewport: { width: 390, height: 844 } });
    await mobile.goto('http://127.0.0.1:4173/updates/commercial-contract-review-checklist.html', {
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
      };
    });
    assert(
      mobileState.transform === 'none' || mobileState.transform === 'matrix(1, 0, 0, 1, 0, 0)',
      'Mobile Article Index transform is not identity',
      mobileState,
    );
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
