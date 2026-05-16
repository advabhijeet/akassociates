/*
  Citadel Insights Directory Section module v2.
  Renders Insights directory/listing sections from the central Citadel article registry.
  Supports full-directory grids and grouped category/tag sections so listing pages remain
  registry-first and do not drift from assets/data/insights-registry.json.
*/
(function () {
  const MODULE_NAME = 'CitadelInsightsDirectorySection';
  if (window[MODULE_NAME]?.initialized) return;

  const GRID_SELECTOR = [
    '[data-citadel-insights-directory]',
    '[data-citadel-insights-category]',
    '[data-citadel-insights-categories]',
    '[data-citadel-insights-tags]',
    '.latest-insights-section .updates-grid',
  ].join(', ');
  const CARD_HELPERS = 'ChambersInsightCards';

  const normalizeText = (value) => String(value || '').replace(/\s+/g, ' ').trim();
  const normalizeKey = (value) => normalizeText(value).toLowerCase();

  const splitList = (value) => normalizeText(value)
    .split(/[|,]/)
    .map((item) => normalizeText(item))
    .filter(Boolean);

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

  const listMatchesAny = (candidateValues, acceptedValues) => {
    if (!acceptedValues.length) return true;
    const candidateSet = new Set(candidateValues.map(normalizeKey));
    return acceptedValues.some((value) => candidateSet.has(normalizeKey(value)));
  };

  const listExcludesAny = (candidateValues, excludedValues) => {
    if (!excludedValues.length) return false;
    const candidateSet = new Set(candidateValues.map(normalizeKey));
    return excludedValues.some((value) => candidateSet.has(normalizeKey(value)));
  };

  const filterForGrid = (grid, items) => {
    const category = splitList(grid.dataset.citadelInsightsCategory || '');
    const categories = splitList(grid.dataset.citadelInsightsCategories || '');
    const tags = splitList(grid.dataset.citadelInsightsTags || '');
    const excludeCategories = splitList(grid.dataset.citadelInsightsExcludeCategories || '');
    const excludeTags = splitList(grid.dataset.citadelInsightsExcludeTags || '');
    const acceptedCategories = [...category, ...categories];

    return uniqueByHref(items).filter((item) => {
      const itemCategory = normalizeText(item.category || '');
      const itemTags = Array.isArray(item.tags) ? item.tags.map(normalizeText) : [];

      if (!listMatchesAny([itemCategory], acceptedCategories)) return false;
      if (!listMatchesAny(itemTags, tags)) return false;
      if (listExcludesAny([itemCategory], excludeCategories)) return false;
      if (listExcludesAny(itemTags, excludeTags)) return false;

      return true;
    });
  };

  const renderGrid = (grid, items) => {
    if (!grid || !items.length || !window[CARD_HELPERS]?.buildCard) return false;

    const limit = Number(grid.dataset.citadelInsightsDirectoryLimit || grid.dataset.citadelInsightsLimit || 0);
    const filteredItems = filterForGrid(grid, items);
    const visibleItems = limit > 0 ? filteredItems.slice(0, limit) : filteredItems;
    if (!visibleItems.length) return false;

    grid.innerHTML = '';
    grid.dataset.citadelInsightsDirectorySource = 'registry';
    grid.setAttribute('aria-live', grid.getAttribute('aria-live') || 'polite');

    visibleItems.forEach((item) => {
      grid.appendChild(window[CARD_HELPERS].buildCard(item, { tagLinks: false }));
    });

    return true;
  };

  const init = () => {
    const grids = Array.from(document.querySelectorAll(GRID_SELECTOR));
    if (!grids.length) return false;

    const items = registryItems();
    if (!items.length || !window[CARD_HELPERS]?.buildCard) return false;

    let rendered = false;
    grids.forEach((grid) => {
      rendered = renderGrid(grid, items) || rendered;
    });
    return rendered;
  };

  window[MODULE_NAME] = {
    initialized: true,
    init,
    normalizeHref,
    uniqueByHref,
    filterForGrid,
  };

  const ready = window.ChambersInsightsRegistryReady;
  if (ready && typeof ready.then === 'function') {
    ready.then(init).catch(init);
  } else {
    init();
  }
})();
