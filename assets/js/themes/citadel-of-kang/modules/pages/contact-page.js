/*
  Citadel Contact Page Template v1.
  Marks and normalizes reusable contact-page structure without changing visual layout.
  Chambers-specific content stays in the page; Citadel owns the reusable page semantics.
*/
(function () {
  const MODULE_NAME = 'CitadelContactPage';

  if (window[MODULE_NAME]?.initialized) {
    return;
  }

  const main = document.querySelector('[data-citadel-contact-page]') || document.querySelector('main');
  const isContactPath = /(^|\/)contact\.html$/.test(window.location.pathname) || window.location.pathname === '/contact';
  const hasContactContent = Boolean(
    document.querySelector('.contact-row') ||
    document.querySelector('[data-contact-dynamic-form]') ||
    document.querySelector('#dynamic-enquiry-form')
  );

  if (!main || (!isContactPath && !hasContactContent)) {
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
    sections: []
  };

  window[MODULE_NAME] = api;

  main.setAttribute('data-citadel-contact-page', main.getAttribute('data-citadel-contact-page') || 'true');

  const sections = Array.from(main.querySelectorAll(':scope > section'));
  sections.forEach((section, index) => {
    section.setAttribute('data-contact-section', section.getAttribute('data-contact-section') || '');

    const label = section.querySelector('.sec-label, .hero-eyebrow');
    const sectionName = label ? slugify(label.textContent) : `section-${index + 1}`;

    if (sectionName) {
      section.dataset.contactSectionName = section.dataset.contactSectionName || sectionName;
    }

    api.sections.push({
      name: section.dataset.contactSectionName || sectionName,
      index
    });
  });

  const contactRows = Array.from(main.querySelectorAll('.contact-row'));
  contactRows.forEach((row) => {
    row.setAttribute('data-contact-methods', row.getAttribute('data-contact-methods') || '');

    Array.from(row.querySelectorAll('.contact-item')).forEach((item, index) => {
      item.setAttribute('data-contact-method', item.getAttribute('data-contact-method') || '');

      const label = item.querySelector('.contact-item-label');
      const methodName = label ? slugify(label.textContent) : `method-${index + 1}`;

      if (methodName) {
        item.dataset.contactMethodType = item.dataset.contactMethodType || methodName;
      }
    });
  });

  const formSection = main.querySelector('#dynamic-enquiry-form');
  if (formSection) {
    formSection.setAttribute('data-citadel-contact-form', formSection.getAttribute('data-citadel-contact-form') || '');
  }

  const dynamicForm = main.querySelector('[data-contact-dynamic-form]');
  if (dynamicForm) {
    dynamicForm.setAttribute('data-citadel-contact-form-instance', dynamicForm.getAttribute('data-citadel-contact-form-instance') || '');
  }

  const profileSections = sections.filter((section) => {
    const label = section.querySelector('.sec-label');
    return label && /profile|public/i.test(label.textContent || '');
  });

  profileSections.forEach((section) => {
    section.setAttribute('data-contact-profile-section', section.getAttribute('data-contact-profile-section') || '');
  });

  api.refresh = function refreshContactPageTemplate() {
    api.sections = Array.from(main.querySelectorAll('[data-contact-section]')).map((section, index) => ({
      name: section.dataset.contactSectionName || `section-${index + 1}`,
      index
    }));
    return api.sections;
  };
})();
