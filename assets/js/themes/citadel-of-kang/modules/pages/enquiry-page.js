/*
  Citadel Enquiry Page Template v1.
  Marks reusable enquiry-page structure without changing visual layout.
  Copy-template behaviour remains in the Citadel Enquiry/Form module.
*/
(function () {
  const MODULE_NAME = 'CitadelEnquiryPage';

  if (window[MODULE_NAME]?.initialized) {
    return;
  }

  const isEnquiryPath = /(^|\/)case-enquiry\.html$/.test(window.location.pathname) || window.location.pathname === '/case-enquiry';
  const main = document.querySelector('[data-citadel-enquiry-page]') || document.querySelector('main');
  const hasEnquiryContent = Boolean(
    document.querySelector('.enquiry-template-section') ||
    document.querySelector('[data-copy-target]') ||
    document.querySelector('[id^="copy-template-"]')
  );

  if (!main || (!isEnquiryPath && !hasEnquiryContent)) {
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
    templates: []
  };

  window[MODULE_NAME] = api;

  main.setAttribute('data-citadel-enquiry-page', main.getAttribute('data-citadel-enquiry-page') || 'true');

  const sections = Array.from(main.querySelectorAll(':scope > section'));

  sections.forEach((section, index) => {
    section.setAttribute('data-enquiry-section', section.getAttribute('data-enquiry-section') || '');

    const label = section.querySelector('.sec-label, .hero-eyebrow');
    const sectionName = label ? slugify(label.textContent) : `section-${index + 1}`;

    section.dataset.enquirySectionName = section.dataset.enquirySectionName || sectionName;

    if (section.querySelector('[data-copy-target], [id^="copy-template-"]')) {
      section.setAttribute('data-enquiry-template-section', section.getAttribute('data-enquiry-template-section') || '');
    }

    if (section.querySelector('.contact-row')) {
      section.setAttribute('data-enquiry-contact-section', section.getAttribute('data-enquiry-contact-section') || '');
    }

    if (/document|checklist/i.test(sectionName)) {
      section.setAttribute('data-enquiry-document-section', section.getAttribute('data-enquiry-document-section') || '');
    }

    if (/urgency/i.test(sectionName)) {
      section.setAttribute('data-enquiry-urgency-section', section.getAttribute('data-enquiry-urgency-section') || '');
    }

    api.sections.push({
      name: section.dataset.enquirySectionName,
      index
    });
  });

  const templateCards = Array.from(main.querySelectorAll('.copy-template-card'));

  templateCards.forEach((card, index) => {
    card.setAttribute('data-enquiry-template-card', card.getAttribute('data-enquiry-template-card') || '');

    const heading = card.querySelector('h2');
    const templateName = heading ? slugify(heading.textContent) : `template-${index + 1}`;

    card.dataset.enquiryTemplateType = card.dataset.enquiryTemplateType || templateName;

    api.templates.push({
      type: card.dataset.enquiryTemplateType,
      index
    });
  });

  const copyButtons = Array.from(main.querySelectorAll('[data-copy-target]'));

  copyButtons.forEach((button) => {
    button.setAttribute('data-enquiry-copy-action', button.getAttribute('data-enquiry-copy-action') || '');
  });

  api.refresh = function refreshEnquiryPageTemplate() {
    api.sections = Array.from(main.querySelectorAll('[data-enquiry-section]')).map((section, index) => ({
      name: section.dataset.enquirySectionName || `section-${index + 1}`,
      index
    }));

    api.templates = Array.from(main.querySelectorAll('[data-enquiry-template-card]')).map((card, index) => ({
      type: card.dataset.enquiryTemplateType || `template-${index + 1}`,
      index
    }));

    return {
      sections: api.sections,
      templates: api.templates
    };
  };
})();
