/*
  Citadel Blog Page module v1.

  A reusable Citadel-level blog/directory controller. It can power pages labelled
  Blog, News, Insights, Legal Insights, Resources, Updates or Knowledge Centre.
  Page labels are content-level concerns; filtering, section rendering, View All,
  pagination and default section limits belong to this module.
*/
(function () {
  const MODULE_NAME = 'CitadelBlogPage';
  if (window[MODULE_NAME]?.initialized) return;

  const CARD_HELPERS = 'ChambersInsightCards';
  const ROOT_SELECTOR = '[data-citadel-blog-page]';
  const SECTION_SELECTOR = '[data-citadel-blog-section]';
  const DEFAULT_SECTION_LIMIT = 3;
  const DEFAULT_PAGE_SIZE = 25;

  let currentPage = 1;
  let resultsMode = null;

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

  const root = () => document.querySelector(ROOT_SELECTOR);
  const sections = () => {
    const page = root();
    return page ? Array.from(page.querySelectorAll(SECTION_SELECTOR)) : [];
  };

  const controls = () => ({
    panel: document.querySelector('.insights-filter-panel'),
    categoryInput: document.querySelector('#insight-category-filter'),
    tagInput: document.querySelector('#insight-tag-filter'),
    searchInput: document.querySelector('#insight-search-filter'),
    categoryList: document.querySelector('#insight-category-options'),
    tagList: document.querySelector('#insight-tag-options'),
    clearButton: document.querySelector('.insights-clear-filter'),
    status: document.querySelector('.insights-filter-status'),
    resultsSection: document.querySelector('[data-citadel-blog-results], .insights-results-section'),
    resultsList: document.querySelector('#insights-results-list, [data-citadel-blog-results-list]'),
  });

  const ensurePagination = (resultsSection) => {
    if (!resultsSection) return null;
    let pagination = resultsSection.querySelector('.insights-pagination');
    if (!pagination) {
      pagination = document.createElement('div');
      pagination.className = 'insights-pagination';
      pagination.setAttribute('aria-label', 'Insights pagination');
      resultsSection.appendChild(pagination);
    }
    return pagination;
  };

  const getSectionGrid = (section) => {
    if (!section) return null;
    let grid = section.querySelector('[data-citadel-blog-grid], .updates-grid');
    if (!grid) {
      grid = document.createElement('div');
      grid.className = 'updates-grid';
      grid.setAttribute('data-citadel-blog-grid', '');
      section.appendChild(grid);
    }
    return grid;
  };

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

  const sectionItems = (section, items = registryItems()) => {
    if (!section) return [];

    const mode = normalizeKey(section.dataset.citadelBlogSection || section.dataset.blogSection || 'latest');
    const category = splitList(section.dataset.category || section.dataset.citadelBlogCategory || '');
    const categories = splitList(section.dataset.categories || section.dataset.citadelBlogCategories || '');
    const tags = splitList(section.dataset.tags || section.dataset.citadelBlogTags || '');
    const excludeCategories = splitList(section.dataset.excludeCategories || section.dataset.citadelBlogExcludeCategories || '');
    const excludeTags = splitList(section.dataset.excludeTags || section.dataset.citadelBlogExcludeTags || '');

    const acceptedCategories = [...category, ...categories];

    return uniqueByHref(items).filter((item) => {
      const itemCategory = normalizeText(item.category || '');
      const itemTags = Array.isArray(item.tags) ? item.tags.map(normalizeText) : [];

      if (mode === 'category' && !listMatchesAny([itemCategory], acceptedCategories)) return false;
      if (mode === 'categories' && !listMatchesAny([itemCategory], acceptedCategories)) return false;
      if (mode === 'tag' || mode === 'tags') {
        if (!listMatchesAny(itemTags, tags)) return false;
      }

      if (mode !== 'category' && mode !== 'categories' && acceptedCategories.length && !listMatchesAny([itemCategory], acceptedCategories)) return false;
      if (mode !== 'tag' && mode !== 'tags' && tags.length && !listMatchesAny(itemTags, tags)) return false;

      if (listExcludesAny([itemCategory], excludeCategories)) return false;
      if (listExcludesAny(itemTags, excludeTags)) return false;

      return true;
    });
  };

  const sectionLimit = (section) => {
    const raw = section?.dataset.limit || section?.dataset.citadelBlogLimit || section?.dataset.citadelInsightsDirectoryLimit || '';
    const parsed = Number(raw);
    return Number.isFinite(parsed) && parsed > 0 ? parsed : DEFAULT_SECTION_LIMIT;
  };

  const sectionTitle = (section) => {
    const heading = section?.querySelector('.insights-section-head h2, h2, .sec-label');
    return normalizeText(heading?.textContent) || 'Articles';
  };

  const buildFallbackCard = (item, result) => {
    const card = document.createElement('a');
    card.className = result
      ? 'update-item update-item-link insights-result-item insights-list-card'
      : 'update-item update-item-link';
    card.href = item.href || '#';
    card.dataset.category = item.category || '';
    card.dataset.tags = (item.tags || []).join(', ');
    card.dataset.thumb = item.thumb || item.thumbnail || '';

    const badge = document.createElement('span');
    badge.className = 'update-tag';
    badge.textContent = item.category || 'Article';

    const title = document.createElement('div');
    title.className = 'update-title';
    title.textContent = item.title || '';

    const excerpt = document.createElement('div');
    excerpt.className = 'update-excerpt';
    excerpt.textContent = item.excerpt || '';

    const date = document.createElement('div');
    date.className = 'update-date';
    date.textContent = item.date || '';

    const tags = document.createElement('div');
    tags.className = 'insight-card-tags';
    tags.setAttribute('aria-label', 'Article tags');
    (item.tags || []).slice(0, 4).forEach((tag) => {
      const tagEl = document.createElement('span');
      tagEl.textContent = tag;
      tags.appendChild(tagEl);
    });

    card.appendChild(badge);
    card.appendChild(title);
    card.appendChild(excerpt);
    card.appendChild(date);
    card.appendChild(tags);
    return card;
  };

  const buildCard = (item, options = {}) => {
    let card;
    if (window[CARD_HELPERS] && typeof window[CARD_HELPERS].buildCard === 'function') {
      card = window[CARD_HELPERS].buildCard(item, {
        result: Boolean(options.result),
        tagLinks: Boolean(options.tagLinks),
      });
    } else {
      card = buildFallbackCard(item, Boolean(options.result));
    }

    if (options.result) card.classList.add('insights-list-card', 'insights-result-item');
    return card;
  };

  const renderSection = (section, items) => {
    const grid = getSectionGrid(section);
    const allSectionItems = sectionItems(section, items);
    const limit = sectionLimit(section);
    const visible = allSectionItems.slice(0, limit);

    if (!grid) return;

    grid.innerHTML = '';
    grid.dataset.citadelBlogSource = 'registry';
    grid.setAttribute('aria-live', grid.getAttribute('aria-live') || 'polite');

    visible.forEach((item) => {
      grid.appendChild(buildCard(item, { tagLinks: false }));
    });

    section.dataset.citadelBlogTotal = String(allSectionItems.length);
    section.dataset.citadelBlogVisible = String(visible.length);
    ensureSectionButton(section, allSectionItems, limit);
  };

  const renderEditorialSections = () => {
    const items = registryItems();
    sections().forEach((section) => {
      section.hidden = false;
      renderSection(section, items);
    });
  };

  const uniqueSorted = (values) => Array.from(new Set(values.filter(Boolean)))
    .sort((first, second) => first.localeCompare(second, 'en-IN', { sensitivity: 'base' }));

  const setDatalist = (list, values) => {
    if (!list) return;
    list.innerHTML = '';
    values.forEach((value) => {
      const option = document.createElement('option');
      option.value = value;
      list.appendChild(option);
    });
  };

  const getFilters = () => {
    const ui = controls();
    return {
      category: normalizeKey(ui.categoryInput?.value),
      tag: normalizeKey(ui.tagInput?.value),
      search: normalizeKey(ui.searchInput?.value),
    };
  };

  const hasActiveFilters = () => {
    const filters = getFilters();
    return Boolean(filters.category || filters.tag || filters.search);
  };

  const itemMatchesFilters = (item, filters) => {
    const category = normalizeKey(item.category);
    const tags = (item.tags || []).map(normalizeKey);
    const text = normalizeKey([
      item.title,
      item.excerpt,
      item.category,
      item.date,
      ...(item.tags || []),
    ].join(' '));

    const categoryMatch = !filters.category || category.includes(filters.category);
    const tagMatch = !filters.tag || tags.some((tag) => tag.includes(filters.tag));
    const searchMatch = !filters.search || text.includes(filters.search);

    return categoryMatch && tagMatch && searchMatch;
  };

  const refreshFilterOptions = () => {
    const ui = controls();
    const items = registryItems();

    setDatalist(ui.categoryList, uniqueSorted(items.map((item) => item.category)));
    setDatalist(ui.tagList, uniqueSorted(items.flatMap((item) => item.tags || [])));
  };

  const syncFilterParams = () => {
    const ui = controls();
    if (!window.history || !window.history.replaceState || !ui.categoryInput || !ui.tagInput || !ui.searchInput) return;

    const url = new URL(window.location.href);
    const values = {
      category: ui.categoryInput.value.trim(),
      tag: ui.tagInput.value.trim(),
      q: ui.searchInput.value.trim(),
    };

    Object.entries(values).forEach(([key, value]) => {
      if (value) url.searchParams.set(key, value);
      else url.searchParams.delete(key);
    });

    window.history.replaceState({}, '', url);
  };

  const setEditorialVisibility = (isResultsMode) => {
    document.body.classList.toggle('is-insights-filter-active', isResultsMode);
    sections().forEach((section) => {
      section.hidden = isResultsMode;
    });
  };

  const annotateCardControls = (scope = document) => {
    scope.querySelectorAll('.insights-page .update-item-link .update-tag').forEach((badge) => {
      const label = normalizeText(badge.textContent);
      if (label) badge.title = `Filter articles by ${label}`;
    });

    scope.querySelectorAll('.insights-page .update-item-link .insight-card-tags span, .insights-page .update-item-link .insight-card-tags a').forEach((tag) => {
      const label = normalizeText(tag.textContent);
      if (label) tag.title = `Filter articles tagged ${label}`;
    });
  };

  const renderPagination = (items, modeLabel) => {
    const ui = controls();
    const pagination = ensurePagination(ui.resultsSection);
    if (!pagination) return;

    pagination.innerHTML = '';
    const totalItems = items.length;
    const totalPages = Math.max(1, Math.ceil(totalItems / DEFAULT_PAGE_SIZE));
    currentPage = Math.min(Math.max(1, currentPage), totalPages);

    if (totalItems <= DEFAULT_PAGE_SIZE) return;

    const previous = document.createElement('button');
    previous.type = 'button';
    previous.className = 'insights-page-button';
    previous.textContent = 'Previous';
    previous.disabled = currentPage <= 1;
    previous.addEventListener('click', () => {
      if (currentPage <= 1) return;
      currentPage -= 1;
      renderResults(items, modeLabel);
    });

    const pageStatus = document.createElement('span');
    pageStatus.className = 'insights-page-status';
    pageStatus.textContent = `${modeLabel} page ${currentPage} of ${totalPages}`;

    const next = document.createElement('button');
    next.type = 'button';
    next.className = 'insights-page-button';
    next.textContent = 'Next';
    next.disabled = currentPage >= totalPages;
    next.addEventListener('click', () => {
      if (currentPage >= totalPages) return;
      currentPage += 1;
      renderResults(items, modeLabel);
    });

    pagination.appendChild(previous);
    pagination.appendChild(pageStatus);
    pagination.appendChild(next);
  };

  const renderResults = (items, modeLabel) => {
    const ui = controls();
    if (!ui.resultsSection || !ui.resultsList) return;

    const uniqueItems = uniqueByHref(items);
    const totalItems = uniqueItems.length;
    const totalPages = Math.max(1, Math.ceil(totalItems / DEFAULT_PAGE_SIZE));
    currentPage = Math.min(Math.max(1, currentPage), totalPages);

    setEditorialVisibility(true);
    ui.resultsSection.hidden = false;
    ui.resultsList.innerHTML = '';

    if (!totalItems) {
      const empty = document.createElement('p');
      empty.className = 'insights-empty-state';
      empty.textContent = 'No matching articles found. Clear the filters or try a broader search term.';
      ui.resultsList.appendChild(empty);
      ensurePagination(ui.resultsSection).innerHTML = '';
      if (ui.status) ui.status.textContent = 'No matching articles found.';
      return;
    }

    const start = (currentPage - 1) * DEFAULT_PAGE_SIZE;
    uniqueItems.slice(start, start + DEFAULT_PAGE_SIZE).forEach((item) => {
      ui.resultsList.appendChild(buildCard(item, { result: true, tagLinks: true }));
    });

    annotateCardControls(ui.resultsList);
    renderPagination(uniqueItems, modeLabel);

    if (ui.status) {
      ui.status.textContent = `${modeLabel}: showing ${Math.min(start + 1, totalItems)}-${Math.min(start + DEFAULT_PAGE_SIZE, totalItems)} of ${totalItems} articles.`;
    }
  };

  const setDefaultView = () => {
    const ui = controls();

    resultsMode = null;
    currentPage = 1;
    setEditorialVisibility(false);

    if (ui.resultsSection) ui.resultsSection.hidden = true;
    if (ui.resultsList) ui.resultsList.innerHTML = '';
    ensurePagination(ui.resultsSection)?.replaceChildren();

    renderEditorialSections();
    refreshFilterOptions();
    annotateCardControls(document);
    syncFilterParams();

    if (ui.status) {
      const label = root()?.dataset.blogLabel || root()?.dataset.citadelBlogLabel || 'Articles';
      ui.status.textContent = `Showing default ${label} view. The full directory is shown first; section blocks below remain grouped by topic.`;
    }
  };

  const renderCurrentView = () => {
    const filters = getFilters();
    syncFilterParams();

    if (resultsMode?.type === 'section' && !hasActiveFilters()) {
      renderResults(resultsMode.items, resultsMode.label);
      return;
    }

    if (!hasActiveFilters()) {
      setDefaultView();
      return;
    }

    resultsMode = null;
    currentPage = 1;
    const filtered = registryItems().filter((item) => itemMatchesFilters(item, filters));
    renderResults(filtered, 'Filtered results');
  };

  function ensureSectionButton(section, allSectionItems, limit) {
    let button = section.querySelector('[data-citadel-blog-view-all], [data-latest-all-trigger], [data-section-all-trigger]');

    if (!button) {
      button = document.createElement('button');
      button.className = 'insights-view-all-latest insights-view-section-all';
      button.type = 'button';
      button.textContent = 'View All';
      button.setAttribute('data-citadel-blog-view-all', '');

      const head = section.querySelector('.insights-section-head') || section.querySelector('.sec-label');
      if (head?.parentNode) {
        head.parentNode.insertBefore(button, head.nextSibling);
      } else {
        section.insertBefore(button, section.firstChild);
      }
    }

    button.hidden = allSectionItems.length <= limit;
    button.setAttribute('aria-controls', 'insights-results-list');

    if (button.dataset.citadelBlogViewAllBound === 'true') return;
    button.dataset.citadelBlogViewAllBound = 'true';

    button.addEventListener('click', () => {
      const ui = controls();
      if (ui.categoryInput) ui.categoryInput.value = '';
      if (ui.tagInput) ui.tagInput.value = '';
      if (ui.searchInput) ui.searchInput.value = '';

      resultsMode = {
        type: 'section',
        label: sectionTitle(section),
        items: sectionItems(section, registryItems()),
      };

      currentPage = 1;
      refreshFilterOptions();
      renderCurrentView();
      controls().resultsSection?.scrollIntoView({
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
        block: 'start',
      });
    });
  }

  const activateFilters = () => {
    resultsMode = null;
    currentPage = 1;
    refreshFilterOptions();
    renderCurrentView();
  };

  const bindControls = () => {
    const ui = controls();

    [ui.categoryInput, ui.tagInput, ui.searchInput].filter(Boolean).forEach((input) => {
      if (input.dataset.citadelBlogBound === 'true') return;
      input.dataset.citadelBlogBound = 'true';
      input.addEventListener('input', activateFilters);
      input.addEventListener('change', activateFilters);
    });

    if (ui.clearButton && ui.clearButton.dataset.citadelBlogBound !== 'true') {
      ui.clearButton.dataset.citadelBlogBound = 'true';
      ui.clearButton.addEventListener('click', () => {
        if (ui.categoryInput) ui.categoryInput.value = '';
        if (ui.tagInput) ui.tagInput.value = '';
        if (ui.searchInput) ui.searchInput.value = '';
        setDefaultView();
        ui.categoryInput?.focus();
      });
    }

    if (document.body.dataset.citadelBlogClickBound === 'true') return;
    document.body.dataset.citadelBlogClickBound = 'true';

    document.addEventListener('click', (event) => {
      if (!(event.target instanceof Element)) return;

      const target = event.target.closest('.insights-page .update-item-link .update-tag, .insights-page .update-item-link .insight-card-tags span, .insights-page .update-item-link .insight-card-tags a');
      if (!target) return;

      event.preventDefault();
      event.stopPropagation();

      const ui = controls();
      const value = normalizeText(target.textContent);
      if (!value) return;

      if (target.classList.contains('update-tag')) {
        if (ui.categoryInput) ui.categoryInput.value = value;
        if (ui.tagInput) ui.tagInput.value = '';
      } else {
        if (ui.tagInput) ui.tagInput.value = value;
        if (ui.categoryInput) ui.categoryInput.value = '';
      }

      resultsMode = null;
      currentPage = 1;
      refreshFilterOptions();
      renderCurrentView();
      ui.resultsSection?.scrollIntoView({
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
        block: 'start',
      });
    });
  };

  const applyInitialParams = () => {
    const ui = controls();
    const params = new URLSearchParams(window.location.search);

    if (ui.categoryInput && params.get('category')) ui.categoryInput.value = params.get('category');
    if (ui.tagInput && params.get('tag')) ui.tagInput.value = params.get('tag');
    if (ui.searchInput && params.get('q')) ui.searchInput.value = params.get('q');
  };

  const init = () => {
    if (!root()) return false;
    if (!registryItems().length) return false;

    bindControls();
    applyInitialParams();
    refreshFilterOptions();

    if (hasActiveFilters()) renderCurrentView();
    else setDefaultView();

    return true;
  };

  window[MODULE_NAME] = {
    initialized: true,
    init,
    registryItems,
    sectionItems,
    uniqueByHref,
    normalizeHref,
  };

  const ready = window.ChambersInsightsRegistryReady;
  if (ready && typeof ready.then === 'function') {
    ready.then(init).catch(init);
  } else if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
