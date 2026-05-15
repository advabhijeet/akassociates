/*
  Citadel Article Footer v2.
  Auto-applies to article.article-body pages and renders tags, previous/next links,
  and recommended reads using a registry-first, metadata-fallback approach.
*/
(function () {
  const MODULE_NAME = 'CitadelArticleFooter';
  const FOOTER_SELECTOR = '.article-standard-footer';
  const ARTICLE_SELECTOR = 'article.article-body';

  const normalizeText = (value) => String(value || '').replace(/\s+/g, ' ').trim();

  const normalizeKey = (value) => normalizeText(value).toLowerCase();

  const normalizePath = (value) => {
    let path = String(value || '').trim();

    if (!path) return '';

    try {
      path = new URL(path, window.location.href).pathname;
    } catch (error) {
      // Keep relative paths as-is.
    }

    return path
      .replace(/^https?:\/\/[^/]+/i, '')
      .replace(/^\/+/, '')
      .replace(/^akassociates\//i, '')
      .replace(/^\.\//, '')
      .replace(/^\.\.\//, '')
      .replace(/\/index\.html$/i, '/')
      .replace(/\\/g, '/');
  };

  const unique = (values) => {
    const seen = new Set();
    const output = [];

    values.forEach((value) => {
      const label = normalizeText(value);
      const key = normalizeKey(label);
      if (!label || seen.has(key)) return;
      seen.add(key);
      output.push(label);
    });

    return output;
  };

  const splitList = (value) => String(value || '')
    .split(',')
    .map((item) => normalizeText(item))
    .filter(Boolean);

  const getRootPrefix = () => {
    const parts = window.location.pathname.split('/').filter(Boolean);
    return parts.length > 1 ? '../' : '';
  };

  const toRelativeHref = (href) => {
    if (!href) return '#';
    if (/^(https?:|mailto:|tel:|#|javascript:|data:)/i.test(href)) return href;

    const cleanHref = String(href).replace(/^\/+/, '').replace(/^akassociates\//i, '');
    return getRootPrefix() + cleanHref;
  };

  const toInsightsTagHref = (tag) => `${getRootPrefix()}legal-updates.html?tag=${encodeURIComponent(tag)}`;

  const getRegistry = () => {
    if (Array.isArray(window.CitadelArticleRegistry)) return window.CitadelArticleRegistry;
    if (Array.isArray(window.chambersInsightsRegistry)) return window.chambersInsightsRegistry;
    return [];
  };

  const getMetaDescription = () => normalizeText(document.querySelector('meta[name="description"]')?.getAttribute('content'));

  const deriveCategory = (article, title, description, rawLabels) => {
    const explicit = normalizeText(article.dataset.articleCategory);
    if (explicit) return explicit;

    const labels = rawLabels.map(normalizeKey);
    const text = normalizeKey([title, description, ...rawLabels].join(' '));

    if (labels.includes('case brief') || text.includes('case brief') || text.includes('judgment')) return 'Case Brief';
    if (labels.includes('checklist') || text.includes('checklist') || text.includes('documents to keep ready')) return 'Checklist';
    if (text.includes('procedure') || text.includes('process') || text.includes('timeline') || text.includes('limitation')) return 'Procedure Note';
    if (text.includes('guide') || text.includes('how to') || text.includes('before purchase')) return 'Practical Guide';
    if (text.includes('legal update') || text.includes('notification') || text.includes('rule')) return 'Legal Update';

    const sectionLabel = normalizeText(document.querySelector('.sec-label')?.textContent);
    if (sectionLabel && !/^legal insight$/i.test(sectionLabel)) return sectionLabel;

    return 'Legal Insight';
  };

  const deriveTags = (article, title, description, rawLabels, category) => {
    const explicitTags = splitList(article.dataset.articleTags);
    const text = normalizeKey([title, description, ...rawLabels].join(' '));
    const tags = [...explicitTags];

    rawLabels.forEach((label) => {
      if (!label) return;
      if (/^published\b/i.test(label)) return;
      if (/^\d{4}$/i.test(label)) return;
      if (/^legal insight$/i.test(label)) return;
      tags.push(label);
    });

    if (category && !/^legal insight$/i.test(category)) tags.push(category);
    if (text.includes('property')) tags.push('Property');
    if (text.includes('due diligence')) tags.push('Due Diligence');
    if (text.includes('title search') || text.includes('title-chain') || text.includes('title chain')) tags.push('Title Search');
    if (text.includes('transfer of property')) tags.push('Transfer of Property Act');
    if (text.includes('registration act')) tags.push('Registration Act');
    if (text.includes('rera') || text.includes('builder')) tags.push('RERA');
    if (text.includes('arbitration') || text.includes('section 34')) tags.push('Arbitration');
    if (text.includes('msme') || text.includes('msefc') || text.includes('udyam')) tags.push('MSME');
    if (text.includes('cheque') || text.includes('section 138') || text.includes('ni act')) tags.push('NI Act');
    if (text.includes('commercial') || text.includes('invoice') || text.includes('contract')) tags.push('Commercial Recovery');
    if (text.includes('sarfaesi') || text.includes('drt') || text.includes('auction sale')) tags.push('SARFAESI');
    if (text.includes('high court')) tags.push('High Court');
    if (text.includes('supreme court')) tags.push('Supreme Court');

    return unique(tags).slice(0, 8);
  };

  const getFallbackCurrentItem = (article, currentPath) => {
    const title = normalizeText(document.querySelector('.page-hero h1, h1')?.textContent || document.title);
    const description = getMetaDescription();
    const rawLabels = unique([
      document.querySelector('.page-hero .hero-eyebrow')?.textContent,
      document.querySelector('.sec-label')?.textContent,
      ...Array.from(article.querySelectorAll('.article-meta span')).map((span) => span.textContent),
    ]);
    const category = deriveCategory(article, title, description, rawLabels);
    const tags = deriveTags(article, title, description, rawLabels, category);

    return {
      href: currentPath,
      category,
      title,
      excerpt: description,
      date: normalizeText(Array.from(article.querySelectorAll('.article-meta span'))
        .map((span) => span.textContent)
        .find((text) => /^published\b/i.test(normalizeText(text)))) || 'May 2026',
      tags: tags.length ? tags : ['Legal Insight'],
      isFallback: true,
    };
  };

  const scoreRelatedItem = (item, current) => {
    const currentTags = new Set((current.tags || []).map(normalizeKey));
    const itemTags = (item.tags || []).map(normalizeKey);
    const sharedTags = itemTags.filter((tag) => currentTags.has(tag)).length;
    const sameCategory = normalizeKey(item.category) === normalizeKey(current.category);

    return (sameCategory ? 4 : 0) + sharedTags;
  };

  const getRelatedItems = (items, current, currentPath) => items
    .map((item, index) => ({ item, index, score: scoreRelatedItem(item, current) }))
    .filter((entry) => normalizePath(entry.item.href) !== currentPath)
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score || a.index - b.index)
    .slice(0, 3)
    .map((entry) => entry.item);

  const buildHeading = (text) => {
    const heading = document.createElement('h2');
    heading.textContent = text;
    return heading;
  };

  const buildTags = (tags) => {
    const wrap = document.createElement('div');
    wrap.className = 'article-tag-list';
    wrap.setAttribute('aria-label', 'Article tags');

    unique(tags).forEach((tag) => {
      const link = document.createElement('a');
      link.href = toInsightsTagHref(tag);
      link.textContent = tag;
      link.setAttribute('aria-label', `Filter insights tagged ${tag}`);
      wrap.appendChild(link);
    });

    return wrap;
  };

  const buildArticleNavButton = (label, item) => {
    const link = document.createElement('a');
    const labelSpan = document.createElement('span');

    link.className = 'article-nav-button';
    link.href = toRelativeHref(item.href);
    labelSpan.textContent = label;
    link.appendChild(labelSpan);
    link.append(document.createTextNode(normalizeText(item.title) || label));

    return link;
  };

  const buildRecommendedCard = (item) => {
    const card = document.createElement('a');
    const title = document.createElement('strong');
    const category = document.createElement('small');

    card.className = 'article-recommended-card';
    card.href = toRelativeHref(item.href);
    title.textContent = normalizeText(item.title) || 'Related insight';
    category.textContent = normalizeText(item.category) || 'Insight';

    card.appendChild(title);
    card.appendChild(category);

    return card;
  };

  const renderFooter = (article, current, previous, next, related) => {
    if (article.querySelector(FOOTER_SELECTOR)) return;

    const footer = document.createElement('section');
    footer.className = 'article-standard-footer';
    footer.dataset.citadelArticleFooter = 'v2';

    footer.appendChild(buildHeading('Tags'));
    footer.appendChild(buildTags(current.tags || ['Legal Insight']));

    if (previous || next) {
      const nav = document.createElement('div');
      nav.className = 'article-nav-row';

      if (previous) nav.appendChild(buildArticleNavButton('Previous Article', previous));
      if (next) nav.appendChild(buildArticleNavButton('Next Article', next));

      footer.appendChild(nav);
    }

    if (related.length) {
      const grid = document.createElement('div');
      grid.className = 'article-recommended-grid';

      related.forEach((item) => {
        grid.appendChild(buildRecommendedCard(item));
      });

      footer.appendChild(buildHeading('Recommended Reads'));
      footer.appendChild(grid);
    }

    article.appendChild(footer);
  };

  const init = () => {
    const article = document.querySelector(ARTICLE_SELECTOR);
    if (!article || article.querySelector(FOOTER_SELECTOR)) return;

    const items = getRegistry();
    const currentPath = normalizePath(window.location.pathname);
    const currentIndex = items.findIndex((item) => normalizePath(item.href) === currentPath);
    const current = currentIndex >= 0 ? items[currentIndex] : getFallbackCurrentItem(article, currentPath);
    const previous = currentIndex >= 0 ? items[currentIndex + 1] : null;
    const next = currentIndex >= 0 ? items[currentIndex - 1] : null;
    const related = getRelatedItems(items, current, currentPath);

    renderFooter(article, current, previous, next, related);
  };

  window[MODULE_NAME] = {
    init,
    normalizePath,
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
