'use strict';

const { chromium } = require('playwright');

const BASE = 'https://chambersofak.in';
const ARTICLE_PATH = '/updates/msme-facilitation-council-process.html';
const VERIFY_TOKEN = `e5c823c-${Date.now()}`;

function assert(condition, message, details) {
  if (!condition) {
    const suffix = details === undefined ? '' : `\n${JSON.stringify(details, null, 2)}`;
    throw new Error(`${message}${suffix}`);
  }
}

async function fetchText(path) {
  const separator = path.includes('?') ? '&' : '?';
  const url = `${BASE}${path}${separator}live_verify=${encodeURIComponent(VERIFY_TOKEN)}`;
  const response = await fetch(url, {
    redirect: 'follow',
    headers: {
      'cache-control': 'no-cache',
      pragma: 'no-cache',
      'user-agent': 'Chambers-of-AK-live-verification/1.0'
    }
  });
  assert(response.ok, `Live request failed: ${response.status} ${url}`);
  return { url, text: await response.text(), headers: Object.fromEntries(response.headers.entries()) };
}

function requireAll(text, markers, label) {
  for (const marker of markers) {
    assert(text.includes(marker), `${label} is missing marker: ${marker}`);
  }
}

function forbidAll(text, markers, label) {
  for (const marker of markers) {
    assert(!text.includes(marker), `${label} still contains forbidden marker: ${marker}`);
  }
}

function parseTranslateY(transform) {
  if (!transform || transform === 'none') return 0;
  const matrix3d = transform.match(/^matrix3d\((.+)\)$/);
  if (matrix3d) {
    const values = matrix3d[1].split(',').map(Number);
    return Number.isFinite(values[13]) ? values[13] : 0;
  }
  const matrix = transform.match(/^matrix\((.+)\)$/);
  if (matrix) {
    const values = matrix[1].split(',').map(Number);
    return Number.isFinite(values[5]) ? values[5] : 0;
  }
  const translate = transform.match(/translate3d\([^,]+,\s*(-?\d+(?:\.\d+)?)px/i);
  return translate ? Number(translate[1]) : 0;
}

async function verifyAssets() {
  const [html, js, css, config, style, pills, thumbnails] = await Promise.all([
    fetchText(ARTICLE_PATH),
    fetchText('/assets/js/themes/citadel-of-kang/article-index-direct-rail.js?v=article-index-v24'),
    fetchText('/assets/css/themes/citadel-of-kang/modules/article-index.css?v=article-index-v24'),
    fetchText('/assets/js/config/chambers-public-config.js?v=config-v5'),
    fetchText('/assets/css/style.css?v=site-20260726-article-index-v24-1'),
    fetchText('/assets/css/themes/citadel-of-kang/modules/pills.css?v=pills-v3'),
    fetchText('/assets/css/themes/citadel-of-kang/modules/thumbnail-frames.css?v=thumbnail-frames-v9')
  ]);

  requireAll(html.text, [
    'article-index.css?v=article-index-v24',
    'pills.css?v=pills-v3',
    'style.css?v=site-20260726-article-index-v24-1',
    'script.js?v=site-20260726-article-index-v24-1',
    'article-index-direct-rail.js?v=article-index-v24'
  ], 'Live article HTML');

  requireAll(js.text, [
    "document.querySelector('.site-topbar')",
    'toc.scrollTop !== 0',
    "toc.style.setProperty('transform'",
    'ResizeObserver',
    'preferredScrollBehavior'
  ], 'Live Article Index JavaScript');
  forbidAll(js.text, ['toc.scrollTo(', 'ensureActiveVisible', 'activeOffsetInsideToc'], 'Live Article Index JavaScript');

  requireAll(css.text, [
    '@media (min-width: 921px)',
    'overflow: visible',
    'max-height: none',
    '@media (prefers-reduced-motion: reduce)',
    'transition: none !important'
  ], 'Live Article Index CSS');
  forbidAll(css.text, ['transform: none !important;\n  }\n}\n\n@media (max-width: 920px)'], 'Desktop reduced-motion Article Index CSS');

  requireAll(config.text, [
    "id: 'citadel-article-index-v24'",
    "version: 'article-index-v24'",
    "id: 'citadel-thumbnail-frames-v9'",
    "version: 'thumbnail-frames-v9'"
  ], 'Live public config');

  requireAll(style.text, [
    'article-index.css?v=article-index-v24',
    'pills.css?v=pills-v3'
  ], 'Live root stylesheet');
  assert((style.text.match(/thumbnail-frames\.css/g) || []).length === 0, 'Root stylesheet still contains a thumbnail-frame import');
  assert((pills.text.match(/thumbnail-frames\.css/g) || []).length === 0, 'Pills stylesheet still contains a duplicate thumbnail-frame import');
  forbidAll(thumbnails.text, ['.article-index-toc', '.article-index-layout', '.article-index-rail'], 'Live thumbnail stylesheet');

  return {
    htmlBytes: html.text.length,
    jsBytes: js.text.length,
    cssBytes: css.text.length,
    configBytes: config.text.length,
    cacheHeaders: {
      html: html.headers['cache-control'] || null,
      js: js.headers['cache-control'] || null,
      css: css.headers['cache-control'] || null
    }
  };
}

async function waitForModule(page) {
  await page.waitForSelector('.article-index-toc', { state: 'attached', timeout: 20000 });
  await page.waitForSelector('.article-index-toc a.is-active', { state: 'attached', timeout: 10000 });
  await page.waitForTimeout(250);
}

async function getGeometry(page) {
  return page.evaluate(() => {
    const article = document.querySelector('article[data-citadel-article-index], article.article-body, article.ck-article');
    if (!article) throw new Error('Article not found');
    const rect = article.getBoundingClientRect();
    return {
      top: window.scrollY + rect.top,
      height: article.offsetHeight,
      viewportHeight: window.innerHeight,
      documentHeight: document.documentElement.scrollHeight
    };
  });
}

async function snapshot(page) {
  return page.evaluate(() => {
    const toc = document.querySelector('.article-index-toc');
    const article = document.querySelector('article[data-citadel-article-index], article.article-body, article.ck-article');
    const nav = document.querySelector('.nav, [data-citadel-navigation-root], header[role="banner"]');
    const progress = document.querySelector('.mobile-reading-progress');
    const active = toc && toc.querySelector('a.is-active');
    if (!toc || !article || !nav) throw new Error('Required live elements are missing');
    const tocRect = toc.getBoundingClientRect();
    const articleRect = article.getBoundingClientRect();
    const navRect = nav.getBoundingClientRect();
    const tocStyle = getComputedStyle(toc);
    const activeStyle = active ? getComputedStyle(active) : null;
    const progressRect = progress ? progress.getBoundingClientRect() : null;
    const progressStyle = progress ? getComputedStyle(progress) : null;
    return {
      scrollY: window.scrollY,
      transform: tocStyle.transform,
      tocScrollTop: toc.scrollTop,
      tocTop: tocRect.top,
      tocBottom: tocRect.bottom,
      tocDocumentBottom: window.scrollY + tocRect.bottom,
      articleTop: articleRect.top,
      articleBottom: articleRect.bottom,
      articleDocumentBottom: window.scrollY + articleRect.bottom,
      navBottom: navRect.bottom,
      overflowX: tocStyle.overflowX,
      overflowY: tocStyle.overflowY,
      activeHref: active ? active.getAttribute('href') : null,
      activeText: active ? active.textContent.trim() : null,
      activeTransitionDuration: activeStyle ? activeStyle.transitionDuration : null,
      innerWidth: window.innerWidth,
      scrollWidth: document.documentElement.scrollWidth,
      progressBottom: progressRect ? progressRect.bottom : null,
      progressDisplay: progressStyle ? progressStyle.display : null,
      progressVisibility: progressStyle ? progressStyle.visibility : null,
      progressOpacity: progressStyle ? progressStyle.opacity : null
    };
  });
}

async function scrollToAndSnapshot(page, y) {
  await page.evaluate((targetY) => window.scrollTo(0, targetY), y);
  await page.waitForTimeout(300);
  return snapshot(page);
}

async function openArticle(context) {
  const page = await context.newPage();
  await page.goto(`${BASE}${ARTICLE_PATH}?live_verify=${encodeURIComponent(VERIFY_TOKEN)}`, {
    waitUntil: 'domcontentloaded',
    timeout: 30000
  });
  await waitForModule(page);
  return page;
}

async function verifyDesktop(browser, viewport) {
  const context = await browser.newContext({ viewport });
  const page = await openArticle(context);
  const geometry = await getGeometry(page);
  const maximumScroll = Math.max(0, geometry.documentHeight - geometry.viewportHeight);
  const midY = Math.min(maximumScroll, Math.round(geometry.top + Math.min(geometry.height * 0.42, 1800)));
  const deeperY = Math.min(maximumScroll, Math.round(geometry.top + Math.min(geometry.height * 0.68, 2800)));

  const down = await scrollToAndSnapshot(page, midY);
  const deeper = await scrollToAndSnapshot(page, Math.max(deeperY, midY + 500));
  const up = await scrollToAndSnapshot(page, midY);
  const end = await scrollToAndSnapshot(page, maximumScroll);

  const downY = parseTranslateY(down.transform);
  const upY = parseTranslateY(up.transform);
  const deeperTransformY = parseTranslateY(deeper.transform);

  assert(downY > 0, `${viewport.width}x${viewport.height}: tray did not move through the desktop rail`, down);
  assert(Math.abs(downY - upY) <= 1, `${viewport.width}x${viewport.height}: down/up transform mismatch`, { downY, upY, down, up });
  assert(down.activeHref === up.activeHref, `${viewport.width}x${viewport.height}: active heading became stale on upward scroll`, { down, up });
  assert(deeperTransformY >= downY, `${viewport.width}x${viewport.height}: tray did not advance while scrolling downward`, { downY, deeperTransformY });
  assert([down, deeper, up, end].every((state) => state.tocScrollTop === 0), `${viewport.width}x${viewport.height}: internal tray scrolling detected`, { down, deeper, up, end });
  assert(down.tocTop >= down.navBottom + 14, `${viewport.width}x${viewport.height}: tray overlaps live navigation offset`, down);
  assert(Math.abs(end.tocDocumentBottom - end.articleDocumentBottom) <= 2, `${viewport.width}x${viewport.height}: tray did not clamp to article bottom`, end);
  assert(down.scrollWidth <= down.innerWidth, `${viewport.width}x${viewport.height}: horizontal overflow detected`, down);
  assert(down.activeHref, `${viewport.width}x${viewport.height}: no active Article Index title`, down);
  assert(down.overflowY !== 'auto' && down.overflowY !== 'scroll', `${viewport.width}x${viewport.height}: internal vertical overflow remains`, down);

  await context.close();
  return {
    viewport,
    downTransformY: downY,
    upTransformY: upY,
    activeHref: down.activeHref,
    trayTop: down.tocTop,
    navBottom: down.navBottom,
    bottomDelta: Number((end.tocDocumentBottom - end.articleDocumentBottom).toFixed(3)),
    scrollWidth: down.scrollWidth,
    innerWidth: down.innerWidth
  };
}

async function verifyMobile(browser) {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const page = await openArticle(context);
  const geometry = await getGeometry(page);
  const state = await scrollToAndSnapshot(page, Math.round(geometry.top + geometry.height * 0.35));
  const transformY = parseTranslateY(state.transform);

  assert(Math.abs(transformY) <= 0.1, 'Mobile tray transform is not identity', state);
  assert(state.tocScrollTop === 0, 'Mobile tray has internal scrolling', state);
  assert(state.scrollWidth <= state.innerWidth, 'Mobile horizontal overflow detected', state);
  assert(state.progressBottom !== null && Math.abs(state.progressBottom - state.navBottom) <= 2, 'Mobile progress bar is not aligned with live nav bottom', state);

  await page.evaluate(() => document.body.classList.add('menu-open'));
  await page.waitForTimeout(50);
  const drawerState = await snapshot(page);
  assert(
    drawerState.progressDisplay === 'none' || drawerState.progressVisibility === 'hidden' || drawerState.progressOpacity === '0',
    'Mobile drawer does not hide reading progress',
    drawerState
  );

  await context.close();
  return {
    transformY,
    scrollWidth: state.scrollWidth,
    innerWidth: state.innerWidth,
    progressBottom: state.progressBottom,
    navBottom: state.navBottom,
    drawerProgress: {
      display: drawerState.progressDisplay,
      visibility: drawerState.progressVisibility,
      opacity: drawerState.progressOpacity
    }
  };
}

async function verifyReducedMotion(browser) {
  const context = await browser.newContext({
    viewport: { width: 1280, height: 720 },
    reducedMotion: 'reduce'
  });
  const page = await openArticle(context);
  const geometry = await getGeometry(page);
  const state = await scrollToAndSnapshot(page, Math.round(geometry.top + geometry.height * 0.45));
  const transformY = parseTranslateY(state.transform);

  assert(transformY > 0, 'Reduced motion disabled functional rail positioning', state);
  const durations = (state.activeTransitionDuration || '').split(',').map((value) => value.trim());
  assert(durations.length > 0 && durations.every((value) => value === '0s'), 'Reduced motion did not remove Article Index transitions', state);
  assert(state.tocScrollTop === 0, 'Reduced-motion tray has internal scrolling', state);

  const anchorResult = await page.evaluate(async () => {
    const links = Array.from(document.querySelectorAll('.article-index-toc a[href^="#"]')).filter((link) => link.getAttribute('href') !== '#top');
    const link = links[Math.min(links.length - 1, 4)];
    if (!link) throw new Error('No Article Index anchor available');
    const id = decodeURIComponent(link.getAttribute('href').slice(1));
    const target = document.getElementById(id);
    link.click();
    await new Promise((resolve) => setTimeout(resolve, 80));
    const nav = document.querySelector('.nav, [data-citadel-navigation-root], header[role="banner"]');
    const topbar = document.querySelector('.site-topbar');
    const expected = (topbar ? topbar.getBoundingClientRect().height : 0) + (nav ? nav.getBoundingClientRect().height : 88) + 72;
    return {
      targetTop: target ? target.getBoundingClientRect().top : null,
      expected,
      href: link.getAttribute('href')
    };
  });
  assert(anchorResult.targetTop !== null && Math.abs(anchorResult.targetTop - anchorResult.expected) <= 8, 'Reduced-motion anchor did not move immediately to the live offset', anchorResult);

  await context.close();
  return {
    transformY,
    transitionDuration: state.activeTransitionDuration,
    anchorResult
  };
}

async function main() {
  const assetResult = await verifyAssets();
  const browser = await chromium.launch({ headless: true });
  try {
    const desktop1440 = await verifyDesktop(browser, { width: 1440, height: 900 });
    const desktop1280 = await verifyDesktop(browser, { width: 1280, height: 720 });
    const mobile = await verifyMobile(browser);
    const reducedMotion = await verifyReducedMotion(browser);
    console.log(JSON.stringify({
      status: 'PASS',
      commit: 'e5c823c6af1018041a7816bbf50b629f57d8a60f',
      assetResult,
      desktop1440,
      desktop1280,
      mobile,
      reducedMotion
    }, null, 2));
  } finally {
    await browser.close();
  }
}

main().catch((error) => {
  console.error(error && error.stack ? error.stack : error);
  process.exit(1);
});
