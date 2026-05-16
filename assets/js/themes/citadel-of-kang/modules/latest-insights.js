/*
  Citadel Latest Insights module v1.
  Renders latest insight cards from registry/feed data and de-duplicates by normalized href
  before applying the visible card limit. This is Citadel-level behaviour and supports
  both future [data-citadel-latest-insights] markup and the legacy homepage
  [data-home-insights-limit] hook.
*/
(function () {
  const MODULE_NAME = 'CitadelLatestInsights';
  if (window[MODULE_NAME]?.initialized) return;

  const CARD_HELPERS = 'ChambersInsightCards';
  const GRID_SELECTOR = '[data-citadel-latest-insights], [data-home-insights-limit]';

  const normalizeText = (value) => String(value || '').replace(/\s+/g, ' ').trim();

  const getRootPrefix = () => {
    const parts = window.location.pathname.split('/').filter(Boolean);
    return parts.length > 1 ? '../' : '';
  };

  const normalizeHref = (href) => {
    let value = normalizeText(href);
    if (!value) return '';

    try {
      value = new URL(value, window.location.href).pathname;
    } catch (error) {
      // Keep relative paths as-is.
    }

    return String(value)
      .replace(/^https?:\/\/[^/]+/i, '')
      .replace(/[?#].*$/, '')
      .replace(/^\/+/, '')
      .replace(/^akassociates\//i, '')
      .replace(/^\.\//, '')
      .replace(/^\.\.\//, '')
      .replace(/\\/g, '/')
      .replace(/\/index\.html$/i, '/');
  };

  const uniqueByHref = (items) => {
    const seen = new Set();
    const output = [];

    (items || []).forEach((item) => {
      if (!item) return;
      const href = normalizeHref(item.href);
      if (!href || seen.has(href)) return;
      seen.add(href);
      output.push({ ...item, href });
    });

    return output;
  };

  const registryItems = () => uniqueByHref(
    Array.isArray(window.CitadelArticleRegistry)
      ? window.CitadelArticleRegistry
      : window.chambersInsightsRegistry
  );

  const registryMap = () => {
    const map = new Map();
    registryItems().forEach((item) => {
      map.set(normalizeHref(item.href), item);
    });
    return map;
  };

  const cleanFeedTitle = (title) => normalizeText(title)
    .replace(/^Case Brief:\s*/i, '')
    .replace(/\s+\|\s+/g, ' | ');

  const formatFeedDate = (pubDate) => {
    const date = new Date(pubDate);
    if (Number.isNaN(date.getTime())) return 'May 2026';
    return date.toLocaleDateString('en-IN', { month: 'long', year: 'numeric' });
  };

  const fallbackCategory = (title, feedCategory) => {
    const text = `${title || ''} ${feedCategory || ''}`.toLowerCase();
    if (text.includes('case brief')) return 'Case Brief';
    if (text.includes('checklist')) return 'Checklist';
    if (text.includes('procedure') || text.includes('process') || text.includes('timeline')) return 'Procedure Note';
    if (text.includes('guide')) return 'Practical Guide';
    return 'Legal Update';
  };

  const parseFeedItems = (xmlText) => {
    const doc = new DOMParser().parseFromString(xmlText, 'application/xml');
    if (doc.querySelector('parsererror')) return [];

    const byHref = registryMap();

    return uniqueByHref(Array.from(doc.querySelectorAll('channel > item')).map((entry) => {
      const link = entry.querySelector('link')?.textContent?.trim() || '#';
      const href = normalizeHref(link);
      const registryItem = byHref.get(href);
      const feedTitle = entry.querySelector('title')?.textContent?.trim() || '';
      const feedCategory = entry.querySelector('category')?.textContent?.trim() || '';
      const feedDescription = entry.querySelector('description')?.textContent?.trim() || '';
      const pubDate = entry.querySelector('pubDate')?.textContent?.trim() || '';

      return {
        href,
        category: registryItem?.category || fallbackCategory(feedTitle, feedCategory),
        title: registryItem?.title || cleanFeedTitle(feedTitle),
        excerpt: registryItem?.excerpt || feedDescription,
        date: registryItem?.date || formatFeedDate(pubDate),
        tags: registryItem?.tags || (feedCategory ? [feedCategory] : []),
        thumb: registryItem?.thumb || registryItem?.thumbnail,
        thumbnail: registryItem?.thumbnail,
      };
    })).filter((item) => item.href && item.title);
  };

  const getLimit = (grid) => {
    const raw = grid.dataset.citadelLatestLimit
      || grid.dataset.citadelInsightsLimit
      || grid.dataset.homeInsightsLimit
      || grid.dataset.limit
      || 3;
    const parsed = Number(raw);
    return Number.isFinite(parsed) && parsed > 0 ? parsed : 3;
  };

  const renderItems = (grid, items, source) => {
    const helper = window[CARD_HELPERS];
    if (!helper || typeof helper.buildCard !== 'function') return;

    const uniqueItems = uniqueByHref(items);
    if (!uniqueItems.length) return;

    const limit = getLimit(grid);
    grid.innerHTML = '';
    grid.dataset.citadelLatestInsightsSource = source;
    grid.dataset.homeInsightsSource = source;

    uniqueItems
      .slice(0, limit)
      .forEach((item) => grid.appendChild(helper.buildCard(item, { tagLinks: false })));
  };

  const renderRegistryFallback = (grid) => {
    renderItems(grid, registryItems(), 'registry');
  };

  const renderGrid = (grid) => {
    renderRegistryFallback(grid);

    const feedPath = grid.dataset.citadelFeed || grid.dataset.feed || `${getRootPrefix()}feed.xml`;
    const feedUrl = new URL(feedPath, window.location.href);
    feedUrl.searchParams.set('home-cache', Date.now().toString());

    fetch(feedUrl.toString(), { cache: 'no-store' })
      .then((response) => {
        if (!response.ok) throw new Error('Feed request failed');
        return response.text();
      })
      .then((xmlText) => {
        const feedItems = parseFeedItems(xmlText);
        if (feedItems.length) renderItems(grid, feedItems, 'feed');
      })
      .catch(() => renderRegistryFallback(grid));
  };

  const init = () => {
    const grids = Array.from(document.querySelectorAll(GRID_SELECTOR));
    if (!grids.length || !window[CARD_HELPERS]) return;
    grids.forEach(renderGrid);
  };

  window[MODULE_NAME] = {
    initialized: true,
    init,
    normalizeHref,
    uniqueByHref,
  };

  const ready = window.ChambersInsightsRegistryReady || Promise.resolve(window.chambersInsightsRegistry || []);
  Promise.resolve(ready).then(init).catch(init);
})();