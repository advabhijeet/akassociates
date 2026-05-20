/*
  Citadel Practice / Services Template v1.
  Marks reusable practice hub, practice detail and service landing-page structure.
  Content remains page-owned; this module owns reusable practice/service semantics.
*/
(function () {
  const MODULE_NAME = 'CitadelPracticePage';

  if (window[MODULE_NAME]?.initialized) {
    return;
  }

  const pathname = window.location.pathname;
  const main = document.querySelector('[data-citadel-practice-page], [data-citadel-service-page], [data-citadel-practice-detail-page]') || document.querySelector('main');

  const isPracticeHub = Boolean(
    document.querySelector('[data-citadel-practice-page]') ||
    /(^|\/)practice\.html$/.test(pathname) ||
    pathname === '/practice'
  );

  const isServiceOrDetail = Boolean(
    document.querySelector('[data-citadel-service-page], [data-citadel-practice-detail-page]') ||
    /(^|\/)(services|practice)\/.+\.html$/.test(pathname)
  );

  const hasPracticeStructure = Boolean(
    document.querySelector('.practice-grid') ||
    document.querySelector('.practice-item') ||
    document.querySelector('.hero-actions a[href*="case-enquiry"]') ||
    document.querySelector('.article-links a[href*="updates/"]')
  );

  const isExcludedSpecialPage = Boolean(
    document.querySelector('[data-citadel-blog-page]') ||
    document.querySelector('[data-citadel-contact-page]') ||
    document.querySelector('[data-citadel-enquiry-page]') ||
    document.querySelector('[data-citadel-home-page]') ||
    document.querySelector('article.article-body')
  );

  if (!main || isExcludedSpecialPage || (!isPracticeHub && !isServiceOrDetail && !hasPracticeStructure)) {
    return;
  }

  const slugify = (value) => String(value || '')
    .trim()
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

  const pageType = isPracticeHub ? 'practice-hub' : (pathname.includes('/practice/') ? 'practice-detail' : 'service-landing');

  const api = {
    initialized: true,
    version: '1.0.0',
    pageType,
    sections: [],
    cards: []
  };

  window[MODULE_NAME] = api;

  if (pageType === 'practice-hub') {
    main.setAttribute('data-citadel-practice-page', main.getAttribute('data-citadel-practice-page') || 'true');
  } else if (pageType === 'practice-detail') {
    main.setAttribute('data-citadel-practice-detail-page', main.getAttribute('data-citadel-practice-detail-page') || 'true');
  } else {
    main.setAttribute('data-citadel-service-page', main.getAttribute('data-citadel-service-page') || 'true');
  }

  const hero = main.querySelector(':scope > .page-hero, :scope > section.page-hero');
  if (hero) {
    hero.setAttribute('data-practice-hero', hero.getAttribute('data-practice-hero') || '');
  }

  const sections = Array.from(main.querySelectorAll(':scope > section'));

  sections.forEach((section, index) => {
    section.setAttribute('data-practice-section', section.getAttribute('data-practice-section') || '');

    const label = section.querySelector('.sec-label, .hero-eyebrow');
    const fallbackName = section.id || `section-${index + 1}`;
    const sectionName = label ? slugify(label.textContent) : slugify(fallbackName);

    section.dataset.practiceSectionName = section.dataset.practiceSectionName || sectionName || fallbackName;

    if (/core-practice|practice-area|expertise/i.test(section.dataset.practiceSectionName || '') || section.querySelector('.practice-grid')) {
      section.setAttribute('data-practice-card-section', section.getAttribute('data-practice-card-section') || '');
    }

    if (/location|forum|court|jurisdiction/i.test(section.dataset.practiceSectionName || '')) {
      section.setAttribute('data-practice-location-section', section.getAttribute('data-practice-location-section') || '');
    }

    if (/document|checklist|papers|records/i.test(section.dataset.practiceSectionName || '')) {
      section.setAttribute('data-practice-document-section', section.getAttribute('data-practice-document-section') || '');
    }

    if (/faq|question/i.test(section.dataset.practiceSectionName || '')) {
      section.setAttribute('data-practice-faq-section', section.getAttribute('data-practice-faq-section') || '');
    }

    if (/related|insight|resource|search/i.test(section.dataset.practiceSectionName || '')) {
      section.setAttribute('data-practice-related-section', section.getAttribute('data-practice-related-section') || '');
    }

    if (/enquiry|contact|send|consult/i.test(section.dataset.practiceSectionName || '') || section.querySelector('.hero-actions')) {
      section.setAttribute('data-practice-cta-section', section.getAttribute('data-practice-cta-section') || '');
    }

    api.sections.push({
      name: section.dataset.practiceSectionName,
      index
    });
  });

  Array.from(main.querySelectorAll('.practice-grid')).forEach((grid, index) => {
    grid.setAttribute('data-practice-card-grid', grid.getAttribute('data-practice-card-grid') || '');
    grid.dataset.practiceGridIndex = grid.dataset.practiceGridIndex || String(index + 1);
  });

  Array.from(main.querySelectorAll('.practice-item')).forEach((card, index) => {
    card.setAttribute('data-practice-card', card.getAttribute('data-practice-card') || '');

    const title = card.querySelector('.practice-title');
    const cardName = title ? slugify(title.textContent) : `practice-${index + 1}`;

    card.dataset.practiceCardName = card.dataset.practiceCardName || cardName;
    card.dataset.practicePriority = card.dataset.practicePriority || String(index + 1);

    api.cards.push({
      name: card.dataset.practiceCardName,
      priority: Number(card.dataset.practicePriority)
    });
  });

  Array.from(main.querySelectorAll('.info-grid')).forEach((grid, index) => {
    grid.setAttribute('data-practice-info-grid', grid.getAttribute('data-practice-info-grid') || '');
    grid.dataset.practiceInfoGridIndex = grid.dataset.practiceInfoGridIndex || String(index + 1);
  });

  Array.from(main.querySelectorAll('.info-item')).forEach((card, index) => {
    card.setAttribute('data-practice-info-card', card.getAttribute('data-practice-info-card') || '');

    const heading = card.querySelector('h2, h3');
    const cardName = heading ? slugify(heading.textContent) : `info-card-${index + 1}`;

    card.dataset.practiceInfoCardName = card.dataset.practiceInfoCardName || cardName;
  });

  Array.from(main.querySelectorAll('.content-panel')).forEach((panel, index) => {
    panel.setAttribute('data-practice-content-panel', panel.getAttribute('data-practice-content-panel') || '');
    panel.dataset.practicePanelIndex = panel.dataset.practicePanelIndex || String(index + 1);
  });

  api.refresh = function refreshPracticeTemplate() {
    api.sections = Array.from(main.querySelectorAll('[data-practice-section]')).map((section, index) => ({
      name: section.dataset.practiceSectionName || `section-${index + 1}`,
      index
    }));

    api.cards = Array.from(main.querySelectorAll('[data-practice-card]')).map((card, index) => ({
      name: card.dataset.practiceCardName || `practice-${index + 1}`,
      priority: Number(card.dataset.practicePriority || index + 1)
    }));

    return {
      pageType: api.pageType,
      sections: api.sections,
      cards: api.cards
    };
  };
})();
