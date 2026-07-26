'use strict';

const { chromium } = require('playwright');

const ORIGIN = 'https://chambersofak.in';
const ARTICLE_PATH = '/updates/commercial-contract-review-checklist.html';

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
  for (let attempt = 1; attempt <= 24; attempt += 1) {
    const stamp = `${Date.now()}-${attempt}`;
    try {
      const [html, bootstrap, config, articleJs] = await Promise.all([
        fetchText(`${ORIGIN}${ARTICLE_PATH}?verify=${stamp}`),
        fetchText(`${ORIGIN}/assets/js/script.js?v=site-20260726-article-index-v25-1&verify=${stamp}`),
        fetchText(`${ORIGIN}/assets/js/config/chambers-public-config.js?v=config-v6&verify=${stamp}`),
        fetchText(`${ORIGIN}/assets/js/themes/citadel-of-kang/article-index-direct-rail.js?v=article-index-v25&verify=${stamp}`),
      ]);

      const state = {
        attempt,
        htmlCache: html.includes('site-20260726-article-index-v25-1'),
        bootstrapConfig: bootstrap.includes("version: 'config-v6'"),
        configV25: config.includes('citadel-article-index-v25') && config.includes('article-index-v25'),
        directGeometry: articleJs.includes("var currentActive = toc.querySelector('a.is-active');")
          && articleJs.includes('var projectedShift = desired - currentTransform;'),
      };
      last = state;
      if (Object.values(state).slice(1).every(Boolean)) return state;
    } catch (error) {
      last = { attempt, error: error.message };
    }
    await delay(15000);
  }
  throw new Error(`Article Index v25 did not deploy in time\n${JSON.stringify(last, null, 2)}`);
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
      articleBottom: articleRect?.bottom,
      viewportHeight: innerHeight,
      viewportWidth: innerWidth,
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
    window.scrollTo(0, window.scrollY + heading.getBoundingClientRect().top - (navSpace + 100));
  }, headingText);
  await page.waitForTimeout(900);
  return snapshot(page);
}

async function testDesktop(browser, viewport) {
  const context = await browser.newContext({
    viewport,
    colorScheme: 'dark',
    extraHTTPHeaders: {
      'Cache-Control': 'no-cache, no-store, max-age=0',
      Pragma: 'no-cache',
    },
  });
  const page = await context.newPage();
  await page.goto(`${ORIGIN}${ARTICLE_PATH}?verify=${Date.now()}`, {
    waitUntil: 'domcontentloaded',
    timeout: 45000,
  });
  await page.waitForSelector('.article-index-toc a.is-active', { timeout: 20000 });
  await page.waitForSelector('.site-topbar', { timeout: 15000 });
  await page.waitForTimeout(1000);

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
    assert(state.activeText === expected, `${name}: active entry mismatch`, state);
    assert(state.tocScrollTop === 0, `${name}: internal Article Index scrolling detected`, state);
    assert(state.activeTop >= state.safeTop - 3, `${name}: active entry above safe viewport band`, state);
    assert(state.activeBottom <= state.safeBottom + 3, `${name}: active entry below safe viewport band`, state);
    assert(state.documentWidth <= state.viewportWidth, `${name}: horizontal overflow detected`, state);
  }

  assert(confidentiality.tocTop < first.tocTop - 20,
    'Complete tray did not move upward for Confidentiality', { first, confidentiality });
  assert(governing.tocTop < confidentiality.tocTop - 20,
    'Complete tray did not continue upward for Governing law', { confidentiality, governing });
  assert(upward.tocTop > governing.tocTop + 20,
    'Complete tray did not return downward on upward scroll', { governing, upward });

  for (let attempt = 0; attempt < 3; attempt += 1) {
    await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
    await page.waitForTimeout(600);
  }
  const end = await snapshot(page);
  assert(end.tocBottom <= end.articleBottom + 1.5, 'Article-bottom clamp failed', end);
  assert(end.tocScrollTop === 0, 'Internal scrolling detected at article end', end);

  await context.close();
  return { viewport, first, confidentiality, governing, upward, end };
}

async function testMobile(browser) {
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    colorScheme: 'dark',
    extraHTTPHeaders: { 'Cache-Control': 'no-cache, no-store, max-age=0', Pragma: 'no-cache' },
  });
  const page = await context.newPage();
  await page.goto(`${ORIGIN}${ARTICLE_PATH}?verify=${Date.now()}`, {
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
  assert(state.transform === 'none' || state.transform === 'matrix(1, 0, 0, 1, 0, 0)',
    'Mobile transform is not identity', state);
  assert(state.scrollTop === 0, 'Mobile internal Article Index scrolling detected', state);
  assert(state.documentWidth <= state.viewportWidth, 'Mobile horizontal overflow detected', state);
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
