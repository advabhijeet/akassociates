/*
  Citadel Article Featured Image module v2.
  Uses the approved registry thumbnail as the article hero background and article body featured image.
  The old/default hero background remains only as the pre-hydration fallback.
*/
(function () {
  const MODULE_NAME = 'CitadelArticleFeaturedImage';
  if (window[MODULE_NAME]?.initialized) return;

  const ARTICLE_SELECTOR = 'article.article-body, article.ck-article, article[data-citadel-article-index]';
  const FEATURED_SELECTOR = ':scope > .article-featured-figure';

  const normalizePath = (value) => {
    try {
      const path = value && /^(https?:)?\/\//i.test(value)
        ? new URL(value, window.location.origin).pathname
        : value;

      return decodeURIComponent(String(path || ''))
        .replace(/^https?:\/\/[^/]+/i, '')
        .replace(/^\/+/, '')
        .replace(/^akassociates\//, '')
        .replace(/[#?].*$/, '');
    } catch (error) {
      return String(value || '')
        .replace(/^\/+/, '')
        .replace(/^akassociates\//, '')
        .replace(/[#?].*$/, '');
    }
  };

  const assetPrefix = () => (window.location.pathname.split('/').filter(Boolean).length > 1 ? '../' : '');

  const normalizeAssetUrl = (value) => {
    if (!value) return '';
    const raw = String(value).trim();
    if (/^(https?:|data:|\/)/i.test(raw)) return raw;
    if (raw.startsWith('../')) return raw;
    return `${assetPrefix()}${raw}`;
  };

  const absoluteAssetUrl = (value) => {
    const normalized = normalizeAssetUrl(value);
    if (!normalized) return '';
    try {
      return new URL(normalized, window.location.href).href;
    } catch (error) {
      return normalized;
    }
  };

  const registryItems = (items) => (
    Array.isArray(items) ? items : (Array.isArray(window.chambersInsightsRegistry) ? window.chambersInsightsRegistry : [])
  );

  const currentRegistryItem = (items) => {
    const currentPath = normalizePath(window.location.pathname);
    return registryItems(items).find((item) => normalizePath(item?.href) === currentPath);
  };

  const fallbackImage = () => {
    const ogImage = document.querySelector('meta[property="og:image"]')?.getAttribute('content');
    if (ogImage) return ogImage;
    const twitterImage = document.querySelector('meta[name="twitter:image"]')?.getAttribute('content');
    return twitterImage || '';
  };

  const imageAlt = (item) => {
    const explicit = document.querySelector('meta[property="og:image:alt"]')?.getAttribute('content');
    if (explicit) return explicit;
    if (item?.imageAlt) return item.imageAlt;
    if (item?.title) return `${item.title} - featured legal update image`;
    const title = document.querySelector('h1')?.textContent?.trim();
    return title ? `${title} - featured legal update image` : 'Featured legal update image';
  };

  const insertAfter = (anchor, node, fallbackParent) => {
    if (anchor?.parentNode) {
      anchor.parentNode.insertBefore(node, anchor.nextSibling);
      return;
    }
    fallbackParent.insertBefore(node, fallbackParent.firstElementChild || null);
  };

  const ensureHeroBackground = (imageUrl) => {
    const heroImage = absoluteAssetUrl(imageUrl);
    if (!heroImage) return;

    document.documentElement.style.setProperty('--citadel-page-hero-image', `url("${heroImage}")`);
    document.body?.classList.add('has-citadel-article-thumb', 'has-citadel-featured-hero');
  };

  const ensureFigure = (article, item, imageUrl) => {
    const thumbnail = normalizeAssetUrl(imageUrl || item?.thumbnail || item?.thumb || fallbackImage());
    if (!thumbnail) return null;

    let figure = article.querySelector(FEATURED_SELECTOR) || article.querySelector('.article-featured-figure');
    let image = figure?.querySelector('img');

    if (!figure) {
      figure = document.createElement('figure');
      figure.className = 'article-featured-figure';
      figure.dataset.citadelFeaturedImage = 'true';
      image = document.createElement('img');
      figure.appendChild(image);

      const summary = article.querySelector(':scope > .article-summary');
      const meta = article.querySelector(':scope > .article-meta');
      insertAfter(summary || meta, figure, article);
    } else {
      figure.dataset.citadelFeaturedImage = 'true';
    }

    if (!image) {
      image = document.createElement('img');
      figure.appendChild(image);
    }

    image.src = thumbnail;
    image.alt = imageAlt(item);
    image.loading = 'eager';
    image.decoding = 'async';
    image.fetchPriority = 'high';

    return figure;
  };

  const apply = (items) => {
    const article = document.querySelector(ARTICLE_SELECTOR);
    if (!article) return;

    const item = currentRegistryItem(items) || {};
    const imageUrl = item?.thumbnail || item?.thumb || fallbackImage();

    ensureHeroBackground(imageUrl);

    const figure = ensureFigure(article, item, imageUrl);
    if (!figure) return;

    document.body?.classList.add('has-citadel-featured-image');
    article.dataset.citadelFeaturedImageReady = 'true';
  };

  const init = () => {
    apply();

    if (window.ChambersInsightsRegistryReady && typeof window.ChambersInsightsRegistryReady.then === 'function') {
      window.ChambersInsightsRegistryReady.then(apply).catch(() => apply());
    }

    document.addEventListener('chambers:insights-registry-ready', (event) => {
      apply(event.detail?.items);
    });
  };

  window[MODULE_NAME] = {
    initialized: true,
    init,
    apply,
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
