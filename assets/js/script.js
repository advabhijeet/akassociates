/* Canonical host redirect: GitHub Pages duplicate and /index.html to custom domain */
(function () {
  var duplicateHost = 'advabhijeet.github.io';
  var canonicalHost = 'chambersofak.in';
  var projectPath = '/akassociates';
  var canonicalOrigin = 'https://chambersofak.in';

  var host = window.location.hostname;
  var path = window.location.pathname || '/';
  var shouldRedirect = host === duplicateHost || (host === canonicalHost && path === '/index.html');

  if (!shouldRedirect) {
    return;
  }

  if (host === duplicateHost && path.indexOf(projectPath) === 0) {
    path = path.slice(projectPath.length) || '/';
  }

  if (path === '/index.html') {
    path = '/';
  }

  var target = canonicalOrigin + path + window.location.search + window.location.hash;
  if (window.location.href !== target) {
    window.location.replace(target);
  }
})();
/* Active Citadel theme controller. Keeps the previous theme file available for rollback. */
(function () {
  const allowedPreviewThemes = new Set(['citadel-of-ak', 'citadel', 'citadel-of-ak-dark']);
  const params = new URLSearchParams(window.location.search);
  const requestedTheme = params.get('theme');
  const storageKey = 'akThemePreview';
  const modeKey = 'akCitadelColorMode';
  const isPreviewPage = /theme-preview-citadel-of-ak\.html$/i.test(window.location.pathname || '');

  if (requestedTheme && allowedPreviewThemes.has(requestedTheme)) {
    window.sessionStorage.setItem(storageKey, 'citadel-of-ak');
    if (requestedTheme === 'citadel-of-ak-dark') {
      window.localStorage.setItem(modeKey, 'dark');
    }
  }

  const setCitadelMode = (mode) => {
    const normalizedMode = mode === 'dark' ? 'dark' : 'light';
    const themeName = normalizedMode === 'dark' ? 'citadel-of-ak-dark' : 'citadel-of-ak';
    const assetPrefix = window.location.pathname.split('/').filter(Boolean).length > 1 ? '../' : '';
    const logoSources = {
      nav: `${assetPrefix}assets/img/logo-navbar-dark.png?v=dark-2`,
      hero: `${assetPrefix}assets/img/primary-logo-dark.png?v=dark-1`,
    };

    window.localStorage.setItem(modeKey, normalizedMode);
    document.documentElement.setAttribute('data-theme', themeName);
    document.documentElement.dataset.themeMode = normalizedMode;
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', normalizedMode === 'dark' ? '#000000' : '#111111');
    document.querySelectorAll('img.nav-logo, img.hero-logo').forEach((logo) => {
      if (!logo.dataset.lightSrc) {
        logo.dataset.lightSrc = logo.getAttribute('src') || '';
      }

      const darkSrc = logo.classList.contains('hero-logo') ? logoSources.hero : logoSources.nav;
      logo.setAttribute('src', normalizedMode === 'dark' ? darkSrc : logo.dataset.lightSrc);
    });
    document.querySelectorAll('[data-theme-mode-toggle]').forEach((button) => {
      const nextLabel = normalizedMode === 'dark' ? 'Light mode' : 'Dark mode';
      button.setAttribute('aria-label', `Switch to ${nextLabel}`);
      button.setAttribute('aria-pressed', normalizedMode === 'dark' ? 'true' : 'false');
      button.dataset.mode = normalizedMode;
    });
  };

  const initialMode = window.localStorage.getItem(modeKey) === 'dark' ? 'dark' : 'light';
  setCitadelMode(initialMode);
  document.documentElement.classList.add('theme-citadel-active');
  window.ChambersTheme = {
    isCitadelActive: true,
    isPreviewPage,
    getMode: () => document.documentElement.dataset.themeMode || 'light',
    toggleColorMode: () => setCitadelMode(document.documentElement.dataset.themeMode === 'dark' ? 'light' : 'dark'),
    refreshToggleLabels: () => setCitadelMode(document.documentElement.dataset.themeMode || initialMode),
  };
  window.ChambersThemePreview = window.ChambersTheme;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', window.ChambersTheme.refreshToggleLabels, { once: true });
  } else {
    window.setTimeout(window.ChambersTheme.refreshToggleLabels, 0);
  }

  const addHeadTag = (tagName, attributes) => {
    const existing = attributes.id ? document.getElementById(attributes.id) : null;
    if (existing) return existing;

    const tag = document.createElement(tagName);
    Object.entries(attributes).forEach(([key, value]) => {
      tag.setAttribute(key, value);
    });
    document.head.appendChild(tag);
    return tag;
  };

  addHeadTag('link', {
    id: 'citadel-font-preconnect',
    rel: 'preconnect',
    href: 'https://fonts.googleapis.com',
  });
  addHeadTag('link', {
    id: 'citadel-fonts',
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=EB+Garamond:wght@400;500;600&family=Lato:wght@400;700;900&display=swap',
  });

  window.sessionStorage.removeItem(storageKey);
})();

// Citadel Global Shell v3 loader
(function () {
  if (window.CitadelGlobalShell) return;

  const scriptId = 'citadel-global-shell-v3';
  if (document.getElementById(scriptId)) return;

  const assetPrefix = window.location.pathname.split('/').filter(Boolean).length > 1 ? '../' : '';
  const script = document.createElement('script');

  script.id = scriptId;
  script.src = `${assetPrefix}assets/js/themes/citadel-of-kang/modules/shell/global-shell.js?v=global-shell-v3`;
  script.defer = true;
  document.body.appendChild(script);
})();

const conversionEventNames = {
  whatsapp: 'whatsapp_click',
  phone: 'phone_click',
  email: 'email_click',
  case_enquiry: 'case_enquiry_click',
  contact: 'contact_click',
};

const getConversionPayload = (link) => {
  const rawHref = link.getAttribute('href') || '';
  const label = link.textContent.trim().replace(/\s+/g, ' ').slice(0, 80) || link.getAttribute('aria-label') || 'Link click';

  if (rawHref.startsWith('https://wa.me/') || rawHref.startsWith('https://api.whatsapp.com/')) {
    return { type: 'whatsapp', label, target: 'whatsapp' };
  }

  if (rawHref.startsWith('tel:')) return { type: 'phone', label, target: 'phone' };
  if (rawHref.startsWith('mailto:')) return { type: 'email', label, target: 'email' };

  try {
    const url = new URL(rawHref, window.location.href);
    const page = url.pathname.split('/').pop();

    if (page === 'case-enquiry.html') return { type: 'case_enquiry', label, target: url.pathname };
    if (page === 'contact.html') return { type: 'contact', label, target: url.pathname };
  } catch (error) {
    return null;
  }

  return null;
};

document.addEventListener('click', (event) => {
  if (!(event.target instanceof Element)) return;

  const link = event.target.closest('a[href]');
  if (!link) return;

  const conversion = getConversionPayload(link);
  if (!conversion || !window.dataLayer) return;

  window.dataLayer.push({
    event: conversionEventNames[conversion.type],
    link_text: conversion.label,
    link_target: conversion.target,
    page_path: window.location.pathname,
  });
});

const revealItems = document.querySelectorAll('.home-reveal');

if (revealItems.length) {
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.16 });

    revealItems.forEach((item) => revealObserver.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  }
}

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
  const registryUrl = assetPrefix + 'assets/data/insights-registry.json?v=registry-10';

  window.ChambersInsightsRegistryReady = loadRegistryAsync(registryUrl);
})();
// Shared Insights card rendering helpers
window.ChambersInsightCards = (function () {
  const normalize = (value) => (value || '').toLowerCase().replace(/\s+/g, ' ').trim();
  const thumbnailBase = 'assets/img/citadel/';
  const defaultThumbnail = `${thumbnailBase}citadel-legal-documents-card.webp`;

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

    if (text.includes('cheque') || text.includes('ni act') || text.includes('section 138')) return `${thumbnailBase}citadel-thumb-cheque-ni-act.webp`;
    if (text.includes('msme') || text.includes('msefc') || text.includes('udyam')) return `${thumbnailBase}citadel-thumb-msme-invoices.webp`;
    if (text.includes('rera') || text.includes('property') || text.includes('possession') || text.includes('builder')) return `${thumbnailBase}citadel-thumb-rera-property.webp`;
    if (text.includes('arbitration') || text.includes('section 34') || text.includes('award')) return `${thumbnailBase}citadel-thumb-arbitration.webp`;
    if (text.includes('commercial') || text.includes('contract') || text.includes('invoice') || text.includes('sarfaesi') || text.includes('drt') || text.includes('banking')) return `${thumbnailBase}citadel-thumb-commercial-recovery.webp`;
    if (text.includes('court') || text.includes('judgment')) return `${thumbnailBase}citadel-tribunal-room-card.webp`;

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
        el.href = `legal-updates.html?tag=${encodeURIComponent(tag)}`;
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
    date.textContent = item.date || 'May 2026';

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

// Citadel latest insights module auto-loader
(function () {
  const grid = document.querySelector('[data-citadel-latest-insights], [data-home-insights-limit]');
  if (!grid || window.CitadelLatestInsights) return;

  const scriptId = 'citadel-latest-insights-section-v1';
  if (document.getElementById(scriptId)) return;

  const assetPrefix = window.location.pathname.split('/').filter(Boolean).length > 1 ? '../' : '';
  const script = document.createElement('script');

  script.id = scriptId;
  script.src = `${assetPrefix}assets/js/themes/citadel-of-kang/modules/sections/latest-insights-section.js?v=latest-insights-section-v1`;
  script.defer = true;
  document.body.appendChild(script);
})();


// Citadel insights directory section module auto-loader
(function () {
  const grid = document.querySelector('[data-citadel-insights-directory]');
  if (!grid || window.CitadelInsightsDirectorySection) return;

  const scriptId = 'citadel-insights-directory-section-v2';
  if (document.getElementById(scriptId)) return;

  const assetPrefix = window.location.pathname.split('/').filter(Boolean).length > 1 ? '../' : '';
  const script = document.createElement('script');

  script.id = scriptId;
  script.src = `${assetPrefix}assets/js/themes/citadel-of-kang/modules/sections/insights-directory-section.js?v=insights-directory-section-v2`;
  script.defer = true;
  document.body.appendChild(script);
})();

// Citadel Blog Page module auto-loader
(function () {
  const page = document.querySelector('[data-citadel-blog-page]');
  if (!page || window.CitadelBlogPage) return;

  const scriptId = 'citadel-blog-page-v2';
  if (document.getElementById(scriptId)) return;

  const assetPrefix = window.location.pathname.split('/').filter(Boolean).length > 1 ? '../' : '';
  const script = document.createElement('script');

  script.id = scriptId;
  script.src = `${assetPrefix}assets/js/themes/citadel-of-kang/modules/blog/blog-page.js?v=blog-page-v4`;
  script.defer = true;
  document.body.appendChild(script);
})();

// Article index: Citadel Article Index v22 auto-loader
(function () {
  const init = () => {
    const article = document.querySelector('article[data-citadel-article-index], article.article-body, article.ck-article');
    if (!article || article.dataset.citadelArticleIndexReady === 'true') return;
    if (document.querySelector('.article-index-layout')) return;
    if (document.getElementById('citadel-article-index-v22')) return;

    const headings = Array.from(article.querySelectorAll(':scope > h2'))
      .filter((heading) => (heading.textContent || '').trim().length > 0);

    if (headings.length < 3) return;

    // Existing article pages may still include a manual Article Index script tag.
    // The auto-loader waits until the document is parsed and avoids injecting a duplicate.
    if (document.querySelector('script[src*="article-index-direct-rail.js"]')) return;

    const assetPrefix = window.location.pathname.split('/').filter(Boolean).length > 1 ? '../' : '';
    const script = document.createElement('script');

    script.id = 'citadel-article-index-v22';
    script.src = `${assetPrefix}assets/js/themes/citadel-of-kang/article-index-direct-rail.js?v=article-index-v22`;
    script.defer = true;
    document.body.appendChild(script);
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    window.setTimeout(init, 0);
  }
})();
// Article footer: Citadel Article Footer v2 loader
(function () {
  const article = document.querySelector('article.article-body');
  if (!article || window.CitadelArticleFooter) return;

  const scriptId = 'citadel-article-footer-v2';
  if (document.getElementById(scriptId)) return;

  const assetPrefix = window.location.pathname.split('/').filter(Boolean).length > 1 ? '../' : '';
  const script = document.createElement('script');

  script.id = scriptId;
  script.src = `${assetPrefix}assets/js/themes/citadel-of-kang/article-footer.js?v=article-footer-v2-1`;
  script.defer = true;
  document.body.appendChild(script);
})();

// Citadel Enquiry/Form module loader
(function () {
  const hasCopyTargets = document.querySelector('[data-copy-target]');
  const hasDynamicForm = document.querySelector('[data-contact-dynamic-form]');
  if ((!hasCopyTargets && !hasDynamicForm) || window.CitadelEnquiryForm) return;

  const scriptId = 'citadel-enquiry-form-v1';
  if (document.getElementById(scriptId)) return;

  const assetPrefix = window.location.pathname.split('/').filter(Boolean).length > 1 ? '../' : '';
  const script = document.createElement('script');

  script.id = scriptId;
  script.src = `${assetPrefix}assets/js/themes/citadel-of-kang/modules/forms/enquiry-form.js?v=enquiry-form-v1`;
  script.defer = true;
  document.body.appendChild(script);
})();

// Citadel Contact Page template loader
(function () {
  const hasContactPage = document.querySelector('[data-citadel-contact-page], .contact-row, #dynamic-enquiry-form');
  const isContactPath = /(^|\/)contact\.html$/.test(window.location.pathname) || window.location.pathname === '/contact';

  if ((!hasContactPage && !isContactPath) || window.CitadelContactPage) return;

  const scriptId = 'citadel-contact-page-v1';
  if (document.getElementById(scriptId)) return;

  const assetPrefix = window.location.pathname.split('/').filter(Boolean).length > 1 ? '../' : '';
  const script = document.createElement('script');

  script.id = scriptId;
  script.src = `${assetPrefix}assets/js/themes/citadel-of-kang/modules/pages/contact-page.js?v=contact-page-v1`;
  script.defer = true;
  document.body.appendChild(script);
})();

// Citadel Enquiry Page template loader
(function () {
  const hasEnquiryPage = document.querySelector('[data-citadel-enquiry-page], .enquiry-template-section, [data-copy-target]');
  const isEnquiryPath = /(^|\/)case-enquiry\.html$/.test(window.location.pathname) || window.location.pathname === '/case-enquiry';

  if ((!hasEnquiryPage && !isEnquiryPath) || window.CitadelEnquiryPage) return;

  const scriptId = 'citadel-enquiry-page-v1';
  if (document.getElementById(scriptId)) return;

  const assetPrefix = window.location.pathname.split('/').filter(Boolean).length > 1 ? '../' : '';
  const script = document.createElement('script');

  script.id = scriptId;
  script.src = `${assetPrefix}assets/js/themes/citadel-of-kang/modules/pages/enquiry-page.js?v=enquiry-page-v1`;
  script.defer = true;
  document.body.appendChild(script);
})();

// Citadel General Content Page template loader
(function () {
  const specialPage = document.querySelector('[data-citadel-blog-page], [data-citadel-contact-page], [data-citadel-enquiry-page], [data-citadel-practice-page], [data-citadel-service-page], [data-citadel-practice-detail-page], article.article-body');
  const hasGeneralPage = document.querySelector('[data-citadel-general-page]');
  const hasGeneralStructure = document.querySelector('.page-hero') && (document.querySelector('.content-panel') || document.querySelector('.info-grid') || document.querySelector('.sec'));
  const generalPath = /(^|\/)(faq|process|courts|document-checklists|disclaimer|privacy-policy|terms)(\.html)?$/.test(window.location.pathname);

  if (specialPage || ((!hasGeneralPage && !hasGeneralStructure && !generalPath) || window.CitadelGeneralContentPage)) return;

  const scriptId = 'citadel-general-content-page-v1';
  if (document.getElementById(scriptId)) return;

  const assetPrefix = window.location.pathname.split('/').filter(Boolean).length > 1 ? '../' : '';
  const script = document.createElement('script');

  script.id = scriptId;
  script.src = `${assetPrefix}assets/js/themes/citadel-of-kang/modules/pages/general-content-page.js?v=general-content-page-v1`;
  script.defer = true;
  document.body.appendChild(script);
})();


// Citadel Homepage template loader
(function () {
  const hasHomePage = document.querySelector('[data-citadel-home-page]');
  const isHomePath = window.location.pathname === '/' || /(^|\/)index\.html$/.test(window.location.pathname);

  if ((!hasHomePage && !isHomePath) || window.CitadelHomePage) return;

  const scriptId = 'citadel-home-page-v1';
  if (document.getElementById(scriptId)) return;

  const assetPrefix = window.location.pathname.split('/').filter(Boolean).length > 1 ? '../' : '';
  const script = document.createElement('script');

  script.id = scriptId;
  script.src = `${assetPrefix}assets/js/themes/citadel-of-kang/modules/pages/home-page.js?v=home-page-v1`;
  script.defer = true;
  document.body.appendChild(script);
})();


// Citadel Practice / Services Page template loader
(function () {
  const hasPracticePage = document.querySelector('[data-citadel-practice-page], [data-citadel-service-page], [data-citadel-practice-detail-page]');
  const isPracticePath = /(^|\/)practice\.html$/.test(window.location.pathname) || /(^|\/)(services|practice)\/.+\.html$/.test(window.location.pathname) || window.location.pathname === '/practice';

  if ((!hasPracticePage && !isPracticePath) || window.CitadelPracticePage) return;

  const scriptId = 'citadel-practice-page-v1';
  if (document.getElementById(scriptId)) return;

  const assetPrefix = window.location.pathname.split('/').filter(Boolean).length > 1 ? '../' : '';
  const script = document.createElement('script');

  script.id = scriptId;
  script.src = `${assetPrefix}assets/js/themes/citadel-of-kang/modules/pages/practice-page.js?v=practice-page-v1`;
  script.defer = true;
  document.body.appendChild(script);
})();
