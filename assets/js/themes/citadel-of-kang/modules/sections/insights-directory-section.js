/*
  Citadel Insights Directory Section module v1.
  Renders the full Insights directory/listing from the central Citadel article registry.
  This keeps listing pages registry-first and prevents future manual card drift.
*/
(function () {
  const MODULE_NAME = 'CitadelInsightsDirectorySection';
  if (window[MODULE_NAME]?.initialized) return;

  const GRID_SELECTOR = '[data-citadel-insights-directory], .latest-insights-section .updates-grid';
  const CARD_HELPERS = 'ChambersInsightCards';

  const normalizeText = (value) => String(value || '').replace(/\s+/g, ' ').trim();

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

  const renderGrid = (grid, items) => {
    if (!grid || !items.length || !window[CARD_HELPERS]?.buildCard) return;

    const limit = Number(grid.dataset.citadelInsightsDirectoryLimit || 0);
    const visibleItems = limit > 0 ? items.slice(0, limit) : items;

    grid.innerHTML = '';
    grid.dataset.citadelInsightsDirectorySource = 'registry';
    grid.setAttribute('aria-live', grid.getAttribute('aria-live') || 'polite');

    visibleItems.forEach((item) => {
      grid.appendChild(window[CARD_HELPERS].buildCard(item, { tagLinks: false }));
    });
  };

  const init = () => {
    const grids = Array.from(document.querySelectorAll(GRID_SELECTOR));
    if (!grids.length) return false;

    const items = registryItems();
    if (!items.length || !window[CARD_HELPERS]?.buildCard) return false;

    grids.forEach((grid) => renderGrid(grid, items));
    return true;
  };

  window[MODULE_NAME] = {
    initialized: true,
    init,
    normalizeHref,
    uniqueByHref,
  };

  const ready = window.ChambersInsightsRegistryReady;
  if (ready && typeof ready.then === 'function') {
    ready.then(init).catch(init);
  } else {
    init();
  }
})();