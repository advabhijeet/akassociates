/*
  Citadel Homepage Template v1.
  Marks reusable homepage/landing-page structure without changing visual layout.
  Content remains page-owned; this module owns reusable homepage semantics.
*/
(function () {
  const MODULE_NAME = 'CitadelHomePage';

  if (window[MODULE_NAME]?.initialized) {
    return;
  }

  const isHomePath = window.location.pathname === '/' || /(^|\/)index\.html$/.test(window.location.pathname);
  const main = document.querySelector('[data-citadel-home-page]') || document.querySelector('main');

  const hasHomeStructure = Boolean(
    document.querySelector('.hero#home') ||
    document.querySelector('.hero-logo') ||
    document.querySelector('.home-practice-slider') ||
    document.querySelector('[data-home-insights-limit]')
  );

  const isExcludedSpecialPage = Boolean(
    document.querySelector('[data-citadel-blog-page]') ||
    document.querySelector('[data-citadel-contact-page]') ||
    document.querySelector('[data-citadel-enquiry-page]') ||
    document.querySelector('[data-citadel-general-page]') ||
    document.querySelector('article.article-body')
  );

  if (!main || isExcludedSpecialPage || (!isHomePath && !hasHomeStructure)) {
    return;
  }

  const slugify = (value) => String(value || '')
    .trim()
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

  const api = {
    initialized: true,
    version: '1.0.0',
    sections: [],
    practiceAreas: []
  };

  window[MODULE_NAME] = api;

  main.setAttribute('data-citadel-home-page', main.getAttribute('data-citadel-home-page') || 'true');

  const hero = main.querySelector(':scope > .hero, :scope > section.hero, #home');
  if (hero) {
    hero.setAttribute('data-home-hero', hero.getAttribute('data-home-hero') || '');
  }

  const sections = Array.from(main.querySelectorAll(':scope > section'));

  sections.forEach((section, index) => {
    section.setAttribute('data-home-section', section.getAttribute('data-home-section') || '');

    const label = section.querySelector('.sec-label, .hero-eyebrow');
    const fallbackName = section.id || `section-${index + 1}`;
    const sectionName = label ? slugify(label.textContent) : slugify(fallbackName);

    section.dataset.homeSectionName = section.dataset.homeSectionName || sectionName || fallbackName;

    if (section.matches('.hero') || section.id === 'home') {
      section.setAttribute('data-home-hero-section', section.getAttribute('data-home-hero-section') || '');
    }

    if (section.id === 'about' || /about|firm/i.test(section.dataset.homeSectionName || '')) {
      section.setAttribute('data-home-about-section', section.getAttribute('data-home-about-section') || '');
    }

    if (section.id === 'practice' || section.querySelector('.home-practice-slider')) {
      section.setAttribute('data-home-practice-section', section.getAttribute('data-home-practice-section') || '');
    }

    if (section.id === 'courts' || section.querySelector('.courts-grid')) {
      section.setAttribute('data-home-forum-section', section.getAttribute('data-home-forum-section') || '');
    }

    if (section.id === 'insights' || section.querySelector('[data-home-insights-limit]')) {
      section.setAttribute('data-home-insights-section', section.getAttribute('data-home-insights-section') || '');
    }

    if (section.id === 'case-enquiry' || section.querySelector('.case-enquiry-box')) {
      section.setAttribute('data-home-cta-section', section.getAttribute('data-home-cta-section') || '');
    }

    api.sections.push({
      name: section.dataset.homeSectionName,
      index
    });
  });

  Array.from(main.querySelectorAll('.home-firm-meta .meta-item')).forEach((item, index) => {
    item.setAttribute('data-home-trust-item', item.getAttribute('data-home-trust-item') || '');

    const heading = item.querySelector('strong');
    const itemName = heading ? slugify(heading.textContent) : `trust-item-${index + 1}`;

    item.dataset.homeTrustItemName = item.dataset.homeTrustItemName || itemName;
  });

  Array.from(main.querySelectorAll('.home-practice-slider .practice-item')).forEach((card, index) => {
    card.setAttribute('data-home-practice-card', card.getAttribute('data-home-practice-card') || '');

    const title = card.querySelector('.practice-title');
    const cardName = title ? slugify(title.textContent) : `practice-${index + 1}`;

    card.dataset.homePracticePriority = card.dataset.homePracticePriority || String(index + 1);
    card.dataset.homePracticeName = card.dataset.homePracticeName || cardName;

    api.practiceAreas.push({
      name: card.dataset.homePracticeName,
      priority: Number(card.dataset.homePracticePriority)
    });
  });

  const insightsGrid = main.querySelector('[data-home-insights-limit]');
  if (insightsGrid) {
    insightsGrid.setAttribute('data-home-insights-grid', insightsGrid.getAttribute('data-home-insights-grid') || '');
  }

  api.refresh = function refreshHomepageTemplate() {
    api.sections = Array.from(main.querySelectorAll('[data-home-section]')).map((section, index) => ({
      name: section.dataset.homeSectionName || `section-${index + 1}`,
      index
    }));

    api.practiceAreas = Array.from(main.querySelectorAll('[data-home-practice-card]')).map((card, index) => ({
      name: card.dataset.homePracticeName || `practice-${index + 1}`,
      priority: Number(card.dataset.homePracticePriority || index + 1)
    }));

    return {
      sections: api.sections,
      practiceAreas: api.practiceAreas
    };
  };
})();
