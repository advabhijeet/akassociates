/*
  Chambers Citadel Insights runtime v1.
  Owns legacy filter compatibility, registry loading and shared card rendering.
*/
(function () {
  "use strict";

  const publicConfig = window.ChambersPublicConfig || {};
  const insightsConfig = publicConfig.insights || {};

// Insights tag filter system
(function () {
  const filterPanel = document.querySelector('.insights-filter-panel');
  const filterButtons = Array.from(document.querySelectorAll('.insights-filter'));
  const insightCards = Array.from(document.querySelectorAll('.updates-grid .update-item'));
  const status = document.querySelector('.insights-filter-status');

  if (!filterPanel || !filterButtons.length || !insightCards.length) {
    return;
  }

  const normalize = (value) => (value || '').toLowerCase().replace(/\s+/g, ' ').trim();

  const getCardTag = (card) => {
    const tag = card.querySelector('.update-tag');
    return normalize(tag ? tag.textContent : '');
  };

  const setActive = (filter) => {
    filterButtons.forEach((button) => {
      const isActive = normalize(button.dataset.insightFilter) === filter;
      button.classList.toggle('is-active', isActive);
      button.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });
  };

  const applyFilter = (filter, shouldScroll) => {
    const normalizedFilter = normalize(filter || 'all');
    let visibleCount = 0;

    insightCards.forEach((card) => {
      const tag = getCardTag(card);
      const shouldShow = normalizedFilter === 'all' || tag === normalizedFilter;
      card.classList.toggle('is-filter-hidden', !shouldShow);
      if (shouldShow) visibleCount += 1;
    });

    setActive(normalizedFilter);

    if (status) {
      status.textContent = normalizedFilter === 'all'
        ? `Showing all insights.`
        : `Showing ${visibleCount} insight${visibleCount === 1 ? '' : 's'} tagged ${normalizedFilter}.`;
    }

    if (shouldScroll) {
      filterPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    if (window.history && window.history.replaceState) {
      const url = new URL(window.location.href);
      if (normalizedFilter === 'all') {
        url.searchParams.delete('tag');
      } else {
        url.searchParams.set('tag', normalizedFilter);
      }
      window.history.replaceState({}, '', url);
    }
  };

  filterButtons.forEach((button) => {
    button.setAttribute('aria-pressed', button.classList.contains('is-active') ? 'true' : 'false');
    button.addEventListener('click', () => {
      applyFilter(button.dataset.insightFilter || 'all', false);
    });
  });

  insightCards.forEach((card) => {
    const tag = card.querySelector('.update-tag');
    if (!tag) return;

    tag.setAttribute('role', 'button');
    tag.setAttribute('tabindex', '0');
    tag.setAttribute('title', `Show all ${tag.textContent.trim()} articles`);

    const trigger = (event) => {
      event.preventDefault();
      event.stopPropagation();
      applyFilter(tag.textContent, true);
    };

    tag.addEventListener('click', trigger);
    tag.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        trigger(event);
      }
    });
  });

  const initialTag = new URLSearchParams(window.location.search).get('tag');
  if (initialTag) {
    applyFilter(initialTag, false);
  }
})();

// Chambers/Citadel Insights article metadata registry loader
window.chambersInsightsRegistry = window.chambersInsightsRegistry || [];
window.CitadelArticleRegistry = window.chambersInsightsRegistry;
window.ChambersInsightsRegistryReady = Promise.resolve(window.chambersInsightsRegistry);

(function () {
  const applyRegistry = (items) => {
    const safeItems = Array.isArray(items) ? items : [];
    window.chambersInsightsRegistry = safeItems;
    window.CitadelArticleRegistry = safeItems;
    window.ChambersInsightsRegistryReady = Promise.resolve(safeItems);
    document.dispatchEvent(new CustomEvent('chambers:insights-registry-ready', { detail: { items: safeItems } }));
    return safeItems;
  };

  const loadRegistryAsync = (url) => fetch(url, { cache: 'no-store' })
    .then((response) => {
      if (!response.ok) throw new Error('Insights registry request failed');
      return response.json();
    })
    .then(applyRegistry)
    .catch((error) => {
      console.warn('Insights registry could not be loaded:', error);
      return window.chambersInsightsRegistry;
    });

  const assetPrefix = window.location.pathname.split('/').filter(Boolean).length > 1 ? '../' : '';
  const registryPath = insightsConfig.registryPath || 'assets/data/insights-registry.json';
  const registryVersion = insightsConfig.registryVersion || 'registry-11';
  const registryUrlObject = new URL(registryPath, window.ChambersAssetRoot || new URL('/', window.location.href));
  registryUrlObject.searchParams.set('v', registryVersion);
  const registryUrl = registryUrlObject.href;

  window.ChambersInsightsRegistryReady = loadRegistryAsync(registryUrl);
})();
// Shared Insights card rendering helpers
window.ChambersInsightCards = (function () {
  const normalize = (value) => (value || '').toLowerCase().replace(/\s+/g, ' ').trim();
  const thumbnailBase = insightsConfig.thumbnailBase || 'assets/img/citadel/';
  const defaultThumbnail = insightsConfig.defaultThumbnail || `${thumbnailBase}citadel-legal-documents-card.webp`;
  const fallbackThumbnails = insightsConfig.fallbackThumbnails || {};

  const categoryClass = (category) => {
    const normalized = normalize(category);
    if (normalized.includes('case')) return 'tag-case-brief';
    if (normalized.includes('checklist')) return 'tag-checklist';
    if (normalized.includes('procedure')) return 'tag-procedure';
    if (normalized.includes('guide')) return 'tag-guide';
    return 'tag-legal-update';
  };

  const thumbnailFor = (item) => {
    const text = normalize([
      item?.title,
      item?.category,
      item?.excerpt,
      ...(item?.tags || []),
    ].join(' '));

    if (text.includes('cheque') || text.includes('ni act') || text.includes('section 138')) return fallbackThumbnails.cheque || `${thumbnailBase}citadel-thumb-cheque-ni-act.webp`;
    if (text.includes('msme') || text.includes('msefc') || text.includes('udyam')) return fallbackThumbnails.msme || `${thumbnailBase}citadel-thumb-msme-invoices.webp`;
    if (text.includes('rera') || text.includes('property') || text.includes('possession') || text.includes('builder')) return fallbackThumbnails.rera || `${thumbnailBase}citadel-thumb-rera-property.webp`;
    if (text.includes('arbitration') || text.includes('section 34') || text.includes('award')) return fallbackThumbnails.arbitration || `${thumbnailBase}citadel-thumb-arbitration.webp`;
    if (text.includes('commercial') || text.includes('contract') || text.includes('invoice') || text.includes('sarfaesi') || text.includes('drt') || text.includes('banking')) return fallbackThumbnails.commercial || `${thumbnailBase}citadel-thumb-commercial-recovery.webp`;
    if (text.includes('court') || text.includes('judgment')) return fallbackThumbnails.court || `${thumbnailBase}citadel-tribunal-room-card.webp`;

    return item?.thumbnail || item?.thumb || defaultThumbnail;
  };

  const normalizeThumbUrl = (thumb) => {
    if (!thumb) return defaultThumbnail;
    if (/^(https?:|data:|\/)/i.test(thumb)) return thumb;

    const isNestedPage = window.location.pathname.split('/').filter(Boolean).length > 1;
    return (isNestedPage ? '../' : '') + thumb.replace(/^\.\//, '');
  };

  const ensureCardMedia = (card, item) => {
    if (!card) return null;

    const thumb = normalizeThumbUrl(card.dataset.thumb || item?.thumbnail || item?.thumb || thumbnailFor(item));
    card.dataset.thumb = thumb;

    let media = card.querySelector(':scope > .insight-card-media');
    if (!media) {
      media = document.createElement('span');
      media.className = 'insight-card-media';
      media.setAttribute('aria-hidden', 'true');
      card.insertBefore(media, card.firstChild);
    }

    let image = media.querySelector(':scope > img.insight-card-image');
    if (!image) {
      image = document.createElement('img');
      image.className = 'insight-card-image';
      image.alt = '';
      image.loading = 'lazy';
      image.decoding = 'async';
      image.draggable = false;
      media.replaceChildren(image);
    }

    if (image.getAttribute('src') !== thumb) {
      image.setAttribute('src', thumb);
    }

    media.style.backgroundImage = '';
    return media;
  };

  const buildTagList = (tags, linked) => {
    const wrap = document.createElement('div');
    wrap.className = 'insight-card-tags';
    wrap.setAttribute('aria-label', 'Article tags');

    (tags || []).slice(0, 5).forEach((tag) => {
      const el = linked ? document.createElement('a') : document.createElement('span');
      el.textContent = tag;
      el.title = `Filter insights tagged ${tag}`;
      if (linked) {
        const prefix = window.location.pathname.split('/').filter(Boolean).length > 1 ? '../' : '';
        el.href = `${prefix}legal-updates.html?tag=${encodeURIComponent(tag)}`;
        el.setAttribute('aria-label', `Filter insights tagged ${tag}`);
      }
      wrap.appendChild(el);
    });

    return wrap;
  };

  const buildCard = (item, options = {}) => {
    const card = document.createElement('a');
    card.className = options.result ? 'update-item update-item-link insights-result-item' : 'update-item update-item-link';
    card.href = item.href;
    card.dataset.category = item.category || '';
    card.dataset.tags = (item.tags || []).join(', ');
    card.dataset.thumb = normalizeThumbUrl(item.thumbnail || item.thumb || thumbnailFor(item));
    ensureCardMedia(card, item);

    const badge = document.createElement('span');
    badge.className = `update-tag ${categoryClass(item.category)}`;
    badge.textContent = item.category || 'Insight';
    badge.title = `Filter insights by ${badge.textContent}`;

    const title = document.createElement('div');
    title.className = 'update-title';
    title.textContent = item.title || '';

    const excerpt = document.createElement('div');
    excerpt.className = 'update-excerpt';
    excerpt.textContent = item.excerpt || '';

    const date = document.createElement('div');
    date.className = 'update-date';
    date.textContent = item.date || insightsConfig.defaultDate || 'May 2026';

    card.appendChild(badge);
    card.appendChild(title);
    card.appendChild(excerpt);
    card.appendChild(date);
    card.appendChild(buildTagList(item.tags || [], Boolean(options.tagLinks)));

    return card;
  };

  const hydrateStaticCards = (scope = document) => {
    const registry = Array.isArray(window.chambersInsightsRegistry) ? window.chambersInsightsRegistry : [];
    const byHref = new Map(registry.map((item) => [item.href, item]));

    scope.querySelectorAll('.update-item-link[href]').forEach((card) => {
      const href = card.getAttribute('href') || '';
      const item = byHref.get(href) || {
        href,
        category: card.dataset.category || card.querySelector('.update-tag')?.textContent?.trim() || '',
        title: card.querySelector('.update-title')?.textContent?.trim() || '',
        excerpt: card.querySelector('.update-excerpt')?.textContent?.trim() || '',
        date: card.querySelector('.update-date')?.textContent?.trim() || '',
        tags: (card.dataset.tags || '').split(',').map((tag) => tag.trim()).filter(Boolean),
      };
      ensureCardMedia(card, item);
    });
  };

  const applyCurrentArticleThumbnail = () => {
    const registry = Array.isArray(window.chambersInsightsRegistry) ? window.chambersInsightsRegistry : [];
    const currentPath = window.location.pathname.replace(/^\/+/, '').replace(/^akassociates\//, '');
    const match = registry.find((item) => item.href === currentPath);
    if (!match) return;

    const thumb = normalizeThumbUrl(match.thumbnail || match.thumb || thumbnailFor(match));
    const absoluteThumb = new URL(thumb, window.location.href).href;
    document.documentElement.style.setProperty('--citadel-page-hero-image', `url("${absoluteThumb}")`);
    document.body?.classList.add('has-citadel-article-thumb');
  };

  return { buildCard, normalize, categoryClass, buildTagList, thumbnailFor, hydrateStaticCards, applyCurrentArticleThumbnail };
})();

const hydrateInsightCardsWhenReady = () => {
  if (!window.ChambersInsightCards) return;
  window.ChambersInsightCards.hydrateStaticCards(document);
  window.ChambersInsightCards.applyCurrentArticleThumbnail();
};

if (window.ChambersInsightsRegistryReady && typeof window.ChambersInsightsRegistryReady.then === 'function') {
  window.ChambersInsightsRegistryReady.then(hydrateInsightCardsWhenReady).catch(hydrateInsightCardsWhenReady);
} else {
  hydrateInsightCardsWhenReady();
}

document.addEventListener('chambers:insights-registry-ready', hydrateInsightCardsWhenReady);

  window.CitadelInsightsRuntime = Object.freeze({
    initialized: true,
    release: publicConfig.release || "unknown"
  });
})();
