/*
  Citadel General Content Page Template v1.
  Marks reusable static/content-page structure without changing visual layout.
  Intended for FAQ, process, courts, document checklists, policy and other general pages.
*/
(function () {
  const MODULE_NAME = 'CitadelGeneralContentPage';

  if (window[MODULE_NAME]?.initialized) {
    return;
  }

  const generalPaths = new Set([
    '/faq',
    '/faq.html',
    '/process',
    '/process.html',
    '/courts',
    '/courts.html',
    '/document-checklists',
    '/document-checklists.html',
    '/disclaimer',
    '/disclaimer.html',
    '/privacy-policy',
    '/privacy-policy.html',
    '/terms',
    '/terms.html'
  ]);

  const pathname = window.location.pathname;
  const main = document.querySelector('[data-citadel-general-page]') || document.querySelector('main');

  const hasGeneralContent = Boolean(
    document.querySelector('.page-hero') &&
    (
      document.querySelector('.content-panel') ||
      document.querySelector('.info-grid') ||
      document.querySelector('.sec')
    )
  );

  const isExcludedSpecialPage = Boolean(
    document.querySelector('[data-citadel-blog-page]') ||
    document.querySelector('[data-citadel-contact-page]') ||
    document.querySelector('[data-citadel-enquiry-page]') ||
    document.querySelector('article.article-body')
  );

  if (!main || isExcludedSpecialPage || (!generalPaths.has(pathname) && !main.hasAttribute('data-citadel-general-page') && !hasGeneralContent)) {
    return;
  }

  const slugify = (value) => String(value || '')
    .trim()
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

  const inferPageType = () => {
    const explicit = main.getAttribute('data-citadel-general-page');
    if (explicit && explicit !== 'true') return explicit;

    const cleanPath = pathname
      .replace(/^\//, '')
      .replace(/\.html$/, '')
      .replace(/\/$/, '');

    return cleanPath || 'general';
  };

  const api = {
    initialized: true,
    version: '1.0.0',
    pageType: inferPageType(),
    sections: []
  };

  window[MODULE_NAME] = api;

  main.setAttribute('data-citadel-general-page', api.pageType);

  const hero = main.querySelector(':scope > .page-hero, :scope > section.page-hero');
  if (hero) {
    hero.setAttribute('data-general-hero', hero.getAttribute('data-general-hero') || '');
  }

  const sections = Array.from(main.querySelectorAll(':scope > section'));

  sections.forEach((section, index) => {
    section.setAttribute('data-general-section', section.getAttribute('data-general-section') || '');

    const label = section.querySelector('.sec-label, .hero-eyebrow');
    const sectionName = label ? slugify(label.textContent) : `section-${index + 1}`;

    section.dataset.generalSectionName = section.dataset.generalSectionName || sectionName;

    if (section.querySelector('.content-panel')) {
      section.setAttribute('data-general-content-section', section.getAttribute('data-general-content-section') || '');
    }

    if (section.querySelector('.info-grid')) {
      section.setAttribute('data-general-grid-section', section.getAttribute('data-general-grid-section') || '');
    }

    if (/faq|question|asked/i.test(sectionName)) {
      section.setAttribute('data-general-faq-section', section.getAttribute('data-general-faq-section') || '');
    }

    if (/policy|terms|disclaimer|privacy|legal/i.test(sectionName) || /privacy|terms|disclaimer/.test(api.pageType)) {
      section.setAttribute('data-general-policy-section', section.getAttribute('data-general-policy-section') || '');
    }

    if (/process|timeline|step|how-we-work/i.test(sectionName) || api.pageType === 'process') {
      section.setAttribute('data-general-process-section', section.getAttribute('data-general-process-section') || '');
    }

    if (/checklist|document|papers/i.test(sectionName) || api.pageType === 'document-checklists') {
      section.setAttribute('data-general-checklist-section', section.getAttribute('data-general-checklist-section') || '');
    }

    if (/court|forum|jurisdiction/i.test(sectionName) || api.pageType === 'courts') {
      section.setAttribute('data-general-forum-section', section.getAttribute('data-general-forum-section') || '');
    }

    api.sections.push({
      name: section.dataset.generalSectionName,
      index
    });
  });

  Array.from(main.querySelectorAll('.info-grid')).forEach((grid, index) => {
    grid.setAttribute('data-general-card-grid', grid.getAttribute('data-general-card-grid') || '');
    grid.dataset.generalGridIndex = grid.dataset.generalGridIndex || String(index + 1);
  });

  Array.from(main.querySelectorAll('.info-item')).forEach((card, index) => {
    card.setAttribute('data-general-card', card.getAttribute('data-general-card') || '');

    const heading = card.querySelector('h2, h3');
    const cardName = heading ? slugify(heading.textContent) : `card-${index + 1}`;

    card.dataset.generalCardName = card.dataset.generalCardName || cardName;
  });

  Array.from(main.querySelectorAll('.content-panel')).forEach((panel, index) => {
    panel.setAttribute('data-general-content-panel', panel.getAttribute('data-general-content-panel') || '');
    panel.dataset.generalPanelIndex = panel.dataset.generalPanelIndex || String(index + 1);
  });

  api.refresh = function refreshGeneralContentPageTemplate() {
    api.sections = Array.from(main.querySelectorAll('[data-general-section]')).map((section, index) => ({
      name: section.dataset.generalSectionName || `section-${index + 1}`,
      index
    }));

    return {
      pageType: api.pageType,
      sections: api.sections
    };
  };
})();
