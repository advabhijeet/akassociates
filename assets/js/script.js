/* Canonical host redirect: GitHub Pages duplicate to custom domain */
(function () {
  var duplicateHost = 'advabhijeet.github.io';
  var projectPath = '/akassociates';
  var canonicalOrigin = 'https://chambersofak.in';

  if (window.location.hostname !== duplicateHost) {
    return;
  }

  var path = window.location.pathname || '/';
  if (path.indexOf(projectPath) === 0) {
    path = path.slice(projectPath.length) || '/';
  }

  var target = canonicalOrigin + path + window.location.search + window.location.hash;
  window.location.replace(target);
})();

const socialLinks = [
  {
    label: 'Firm LinkedIn',
    href: 'https://www.linkedin.com/company/chambersofak',
    icon: 'linkedin',
  },
  {
    label: 'WhatsApp Channel',
    href: 'https://whatsapp.com/channel/0029VbCmf6M9sBIHqiTPIz33',
    icon: 'whatsapp',
    modifier: 'is-channel',
  },
];

const socialIconSvg = {
  linkedin: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M6.6 8.7V19H3.2V8.7h3.4zm.2-3.2c0 1-.7 1.7-1.9 1.7-1.1 0-1.8-.7-1.8-1.7 0-1 .7-1.8 1.9-1.8 1.1 0 1.8.7 1.8 1.8zM20.8 12.7V19h-3.4v-5.9c0-1.5-.5-2.5-1.8-2.5-1 0-1.5.6-1.8 1.3-.1.2-.1.6-.1.9V19h-3.4V8.7h3.4v1.5c.4-.7 1.3-1.8 3.2-1.8 2.4 0 4 1.5 4 4.3z"/></svg>',
  whatsapp: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M17.5 14.3c-.2-.1-1.2-.6-1.3-.7-.2-.1-.3-.1-.4.1-.1.2-.5.7-.6.8-.1.1-.2.2-.4.1-.2-.1-.8-.3-1.5-1-.6-.5-1-1.2-1.1-1.4-.1-.2 0-.3.1-.4l.3-.3.2-.3c.1-.1.1-.2 0-.4-.1-.1-.4-1-.6-1.4-.1-.3-.3-.3-.4-.3h-.4c-.1 0-.3 0-.5.2-.2.2-.7.6-.7 1.6s.7 1.9.8 2.1c.1.1 1.4 2.2 3.5 3 .5.2.9.3 1.2.4.5.1.9.1 1.2.1.4-.1 1.2-.5 1.3-.9.2-.5.2-.9.1-.9 0-.1-.2-.1-.4-.2z"/><path d="M12 2.2a9.7 9.7 0 0 0-8.2 14.8L2.3 21.8l4.9-1.3a9.8 9.8 0 1 0 4.8-18.3zm0 17.5c-1.5 0-2.9-.4-4.2-1.2l-.3-.2-2.9.8.8-2.8-.2-.3A7.7 7.7 0 1 1 12 19.7z"/></svg>',
};

const createSocialLinksMarkup = () => socialLinks.map((link) => {
  const modifier = link.modifier ? ` ${link.modifier}` : '';
  const icon = socialIconSvg[link.icon] || '';

  return `<a class="ak-social-icon${modifier}" href="${link.href}" target="_blank" rel="noopener" aria-label="${link.label}" title="${link.label}">${icon}<span class="sr-only">${link.label}</span></a>`;
}).join('');

const clockFormatter = new Intl.DateTimeFormat('en-IN', {
  timeZone: 'Asia/Kolkata',
  weekday: 'short',
  day: '2-digit',
  month: 'short',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: true,
});

const updateLiveClocks = () => {
  const now = new Date();
  const formatted = clockFormatter.format(now).replace(/\s+/g, ' ');

  document.querySelectorAll('[data-ak-clock]').forEach((clock) => {
    clock.textContent = `Patna, India ${formatted}`;
    clock.setAttribute('dateTime', now.toISOString());
  });
};

const nav = document.querySelector('.nav');

if (nav) {
  const navLinksList = nav.querySelector('.nav-links');
  const navCta = nav.querySelector('.nav-cta');
  const menuButton = nav.querySelector('.menu-toggle') || document.createElement('button');
  const backdrop = document.querySelector('.menu-backdrop') || document.createElement('button');
  let topBar = document.querySelector('.site-topbar');
  const desktopMedia = window.matchMedia('(min-width: 769px)');
  let lockedScrollY = 0;
  let isPageScrollLocked = false;

  const ensureTopBar = () => {
    if (!desktopMedia.matches) {
      if (topBar && topBar.parentNode) {
        topBar.parentNode.removeChild(topBar);
      }

      topBar = null;
      return;
    }

    if (topBar && topBar.parentNode) {
      return;
    }

    topBar = document.createElement('div');
    topBar.className = 'site-topbar';
    topBar.innerHTML = `
      <div class="topbar-label">Chambers of AK</div>
      <div class="topbar-actions">
        <div class="ak-social topbar-social" aria-label="Social links">${createSocialLinksMarkup()}</div>
        <time class="live-clock" data-ak-clock></time>
      </div>
    `;
    nav.parentNode.insertBefore(topBar, nav);
  };

  const lockPageScroll = () => {
    if (isPageScrollLocked) return;

    lockedScrollY = window.scrollY || document.documentElement.scrollTop || 0;
    isPageScrollLocked = true;

    document.documentElement.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${lockedScrollY}px`;
    document.body.style.left = '0';
    document.body.style.right = '0';
    document.body.style.width = '100%';
    document.body.style.overflow = 'hidden';
  };

  const unlockPageScroll = () => {
    if (!isPageScrollLocked) return;

    const scrollTarget = lockedScrollY;
    isPageScrollLocked = false;

    document.documentElement.style.overflow = '';
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.left = '';
    document.body.style.right = '';
    document.body.style.width = '';
    document.body.style.overflow = '';

    window.scrollTo(0, scrollTarget);
  };

  ensureTopBar();

  menuButton.className = 'menu-toggle';
  menuButton.type = 'button';
  menuButton.setAttribute('aria-label', 'Open menu');
  menuButton.setAttribute('aria-expanded', 'false');

  if (!menuButton.querySelector('span')) {
    menuButton.innerHTML = '<span></span><span></span><span></span>';
  }

  backdrop.className = 'menu-backdrop';
  backdrop.type = 'button';
  backdrop.setAttribute('aria-label', 'Close menu');

  if (navCta && navLinksList && !navLinksList.querySelector('.drawer-contact')) {
    const contactItem = document.createElement('li');
    const contactLink = navCta.cloneNode(true);

    contactItem.className = 'drawer-contact';
    contactLink.classList.remove('nav-cta');
    contactLink.classList.add('drawer-cta');
    contactItem.appendChild(contactLink);
    navLinksList.appendChild(contactItem);
  }

  if (navLinksList && !navLinksList.querySelector('.drawer-social')) {
    const socialItem = document.createElement('li');

    socialItem.className = 'drawer-social';
    socialItem.innerHTML = `
      <div class="drawer-social-panel">
        <div class="drawer-time-label">Social Links</div>
        <div class="ak-social" aria-label="Social links">${createSocialLinksMarkup()}</div>
        <time class="drawer-time" data-ak-clock></time>
      </div>
    `;
    navLinksList.insertBefore(socialItem, navLinksList.firstElementChild);
  }

  if (!menuButton.parentNode) {
    nav.appendChild(menuButton);
  }

  if (!backdrop.parentNode) {
    document.body.appendChild(backdrop);
  }

  const updateNavScrollState = () => {
    nav.classList.toggle('is-scrolled', window.scrollY > 18);
  };

  const updateNavSpace = () => {
    const wasScrolled = nav.classList.contains('is-scrolled');

    nav.classList.add('is-measuring');
    nav.classList.remove('is-scrolled');
    ensureTopBar();

    const topBarHeight = topBar ? Math.ceil(topBar.getBoundingClientRect().height) : 0;
    const navHeight = Math.ceil(nav.getBoundingClientRect().height);

    document.documentElement.style.setProperty('--topbar-space', `${topBarHeight}px`);
    document.documentElement.style.setProperty('--nav-space', `${topBarHeight + navHeight}px`);

    nav.classList.toggle('is-scrolled', wasScrolled);
    nav.classList.remove('is-measuring');
  };

  let navScrollTicking = false;
  let navResizeTicking = false;

  updateNavScrollState();
  updateNavSpace();

  window.addEventListener('scroll', () => {
    if (navScrollTicking || isPageScrollLocked) return;

    navScrollTicking = true;
    window.requestAnimationFrame(() => {
      updateNavScrollState();
      navScrollTicking = false;
    });
  }, { passive: true });

  const onViewportChange = () => {
    if (navResizeTicking) return;

    navResizeTicking = true;
    window.requestAnimationFrame(() => {
      updateNavSpace();
      updateNavScrollState();
      navResizeTicking = false;
    });
  };

  window.addEventListener('resize', onViewportChange, { passive: true });

  if (desktopMedia.addEventListener) {
    desktopMedia.addEventListener('change', () => {
      if (desktopMedia.matches) {
        unlockPageScroll();
        document.body.classList.remove('menu-open');
      }

      onViewportChange();
    });
  } else if (desktopMedia.addListener) {
    desktopMedia.addListener(() => {
      if (desktopMedia.matches) {
        unlockPageScroll();
        document.body.classList.remove('menu-open');
      }

      onViewportChange();
    });
  }

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(updateNavSpace).catch(() => {});
  }

  const openMenu = () => {
    document.body.classList.add('menu-open');
    lockPageScroll();
    menuButton.setAttribute('aria-expanded', 'true');
    menuButton.setAttribute('aria-label', 'Close menu');
  };

  const closeMenu = () => {
    document.body.classList.remove('menu-open');
    unlockPageScroll();
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open menu');
  };

  menuButton.addEventListener('click', () => {
    if (document.body.classList.contains('menu-open')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  backdrop.addEventListener('click', closeMenu);

  if (navLinksList) {
    navLinksList.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', closeMenu);
    });
  }

  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeMenu();
    }
  });
}

document.querySelectorAll('.foot').forEach((footer) => {
  if (footer.querySelector('.foot-social')) return;

  const socialRow = document.createElement('div');
  const disclaimer = footer.querySelector('.foot-disc');

  socialRow.className = 'foot-social ak-social';
  socialRow.setAttribute('aria-label', 'Social links');
  socialRow.innerHTML = createSocialLinksMarkup();

  if (disclaimer) {
    footer.insertBefore(socialRow, disclaimer);
  } else {
    footer.appendChild(socialRow);
  }
});

if (document.querySelector('[data-ak-clock]')) {
  updateLiveClocks();
  window.setInterval(updateLiveClocks, 1000);
}

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (event) => {
    const targetId = anchor.getAttribute('href');
    const target = targetId.length > 1 ? document.querySelector(targetId) : null;

    if (!target) return;

    event.preventDefault();
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
  });
});

const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

if (sections.length === 0) {
  const pageLinks = document.querySelectorAll('.nav-links a[href]');
  const hasExactPageLink = Array.from(pageLinks).some((link) => new URL(link.href).pathname === window.location.pathname);

  if (hasExactPageLink) {
    pageLinks.forEach((link) => {
      const linkPath = new URL(link.href).pathname;
      const currentPath = window.location.pathname;
      link.classList.toggle('active', linkPath === currentPath);
    });
  }
} else {
  const setActiveNav = (current) => {
    navLinks.forEach((link) => {
      const linkUrl = new URL(link.href);
      const isSamePage = linkUrl.pathname === window.location.pathname;
      const isCurrentSection = linkUrl.hash === `#${current}`;
      const isHomeAtTop = !linkUrl.hash && current === 'home';
      link.classList.toggle('active', isSamePage && (isCurrentSection || isHomeAtTop));
    });
  };

  let activeSection = window.location.hash ? window.location.hash.slice(1) : sections[0].id;
  setActiveNav(activeSection);

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      const visibleEntries = entries
        .filter((entry) => entry.isIntersecting)
        .sort((first, second) => second.intersectionRatio - first.intersectionRatio || first.boundingClientRect.top - second.boundingClientRect.top);

      if (visibleEntries.length === 0) return;

      const nextSection = visibleEntries[0].target.getAttribute('id');
      if (nextSection && nextSection !== activeSection) {
        activeSection = nextSection;
        setActiveNav(activeSection);
      }
    }, {
      rootMargin: '-22% 0px -62% 0px',
      threshold: [0, 0.2, 0.45, 0.7],
    });

    sections.forEach((section) => observer.observe(section));
  }
}

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















// Chambers Insights article metadata registry
window.chambersInsightsRegistry = [
  {
    "href": "updates/non-reportable-judgments-online-publication-case-brief.html",
    "category": "Case Brief",
    "title": "Can non-reportable judgments be published online?",
    "excerpt": "Gujarat High Court case brief on non-reportable judgments, online publication and public court records.",
    "date": "May 2026",
    "tags": [
      "High Court",
      "Gujarat High Court",
      "Online Publication",
      "Judgment Reporting",
      "Court Records",
      "Article 226"
    ]
  },
  {
    "href": "updates/sarfaesi-auction-sale-challenge-documents.html",
    "category": "Case Brief",
    "title": "SARFAESI auction sale challenge: documents and Rule 9(4) timeline",
    "excerpt": "Supreme Court case brief on auction-sale finality, balance consideration, redemption and DRT/DRAT records.",
    "date": "May 2026",
    "tags": [
      "SARFAESI",
      "DRT",
      "Banking Recovery",
      "Auction Sale",
      "Supreme Court",
      "Rule 9(4)"
    ]
  },
  {
    "href": "updates/summary-judgment-commercial-suits-order-xiii-a.html",
    "category": "Case Brief",
    "title": "Summary judgment in commercial suits under Order XIII-A CPC",
    "excerpt": "Supreme Court case brief on pleadings, documents, real prospect test and mini-trial caution.",
    "date": "May 2026",
    "tags": [
      "Commercial Courts",
      "CPC",
      "Order XIII-A",
      "Summary Judgment",
      "Supreme Court",
      "Commercial Recovery"
    ]
  },
  {
    "href": "updates/msme-facilitation-council-process.html",
    "category": "Procedure Note",
    "title": "MSME Facilitation Council process for delayed payments",
    "excerpt": "Udyam records, invoices, 45-day issue, conciliation, arbitration, interest and enforcement preparation.",
    "date": "May 2026",
    "tags": [
      "MSME",
      "MSEFC",
      "Delayed Payment",
      "Conciliation",
      "Arbitration"
    ]
  },
  {
    "href": "updates/cheque-bounce-defence-after-summons.html",
    "category": "Practical Guide",
    "title": "Cheque bounce case after summons: defence preparation",
    "excerpt": "Complaint papers, summons, notice proof, liability review, settlement and court-stage preparation.",
    "date": "May 2026",
    "tags": [
      "NI Act",
      "Cheque Bounce",
      "Summons",
      "Defence Preparation",
      "Section 138"
    ]
  },
  {
    "href": "updates/msme-documents-checklist.html",
    "category": "Checklist",
    "title": "MSME delayed payment documents checklist",
    "excerpt": "Udyam records, invoice-wise summaries, purchase orders, delivery proof, ledgers and communications.",
    "date": "May 2026",
    "tags": [
      "MSME",
      "MSEFC",
      "Documents",
      "Delayed Payment",
      "Udyam"
    ]
  },
  {
    "href": "updates/commercial-recovery-before-suit.html",
    "category": "Practical Guide",
    "title": "Before filing a commercial recovery suit",
    "excerpt": "Contract clauses, invoice ledgers, limitation, pre-filing issues and dispute records.",
    "date": "May 2026",
    "tags": [
      "Commercial Recovery",
      "Contracts",
      "Invoices",
      "Limitation",
      "Commercial Courts"
    ]
  },
  {
    "href": "updates/rera-refund-interest-delayed-possession.html",
    "category": "Practical Guide",
    "title": "Delayed possession: refund or interest?",
    "excerpt": "Relief selection, project documents, possession timelines and forum location in RERA disputes.",
    "date": "May 2026",
    "tags": [
      "RERA",
      "Delayed Possession",
      "Refund",
      "Interest",
      "Builder Dispute"
    ]
  },
  {
    "href": "updates/arbitration-clause-checklist.html",
    "category": "Checklist",
    "title": "Arbitration clause checklist before a dispute",
    "excerpt": "Seat, venue, appointment, notice, interim relief, enforcement and papers to preserve.",
    "date": "May 2026",
    "tags": [
      "Arbitration",
      "Contract",
      "Seat",
      "Venue",
      "Interim Relief"
    ]
  },
  {
    "href": "updates/cheque-bounce-30-days.html",
    "category": "Practical Guide",
    "title": "Cheque bounce: 30-day notice timeline",
    "excerpt": "A practical date-chart approach for cheque dishonour notices, limitation and complaint preparation.",
    "date": "May 2026",
    "tags": [
      "NI Act",
      "Cheque Bounce",
      "Demand Notice",
      "Limitation",
      "Section 138"
    ]
  },
  {
    "href": "updates/msme-delayed-payment.html",
    "category": "Practical Guide",
    "title": "MSME delayed payment claims: first review",
    "excerpt": "How to organize invoices, Udyam records, delivery proof and buyer communications for MSME delayed payment claims.",
    "date": "May 2026",
    "tags": [
      "MSME",
      "Delayed Payment",
      "MSEFC",
      "Udyam"
    ]
  },
  {
    "href": "updates/bihar-rera-complaint.html",
    "category": "Practical Guide",
    "title": "Bihar RERA complaint preparation",
    "excerpt": "A document-first approach to delayed possession, refund, interest and builder dispute complaints.",
    "date": "May 2026",
    "tags": [
      "RERA",
      "Bihar",
      "Builder Dispute",
      "Delayed Possession",
      "Refund"
    ]
  },
  {
    "href": "updates/cheque-bounce-notice-limitation.html",
    "category": "Procedure Note",
    "title": "Cheque bounce notice and limitation",
    "excerpt": "Key dates to track before filing or defending a Section 138 cheque bounce complaint.",
    "date": "May 2026",
    "tags": [
      "NI Act",
      "Cheque Bounce",
      "Notice",
      "Limitation",
      "Section 138"
    ]
  },
  {
    "href": "updates/msme-45-days-payment-rule.html",
    "category": "Legal Update",
    "title": "MSME 45-day payment rule",
    "excerpt": "Document and date preparation for MSME delayed payment claims and buyer responses.",
    "date": "May 2026",
    "tags": [
      "MSME",
      "Delayed Payment",
      "45-Day Rule",
      "Income Tax",
      "Udyam"
    ]
  },
  {
    "href": "updates/section-138-cheque-bounce-limitation.html",
    "category": "Procedure Note",
    "title": "Section 138 cheque bounce limitation",
    "excerpt": "Limitation, demand notice and complaint timelines in cheque dishonour matters.",
    "date": "May 2026",
    "tags": [
      "NI Act",
      "Cheque Bounce",
      "Limitation",
      "Demand Notice",
      "Section 138"
    ]
  },
  {
    "href": "updates/rera-delayed-possession-bihar.html",
    "category": "Practical Guide",
    "title": "RERA delayed possession in Bihar",
    "excerpt": "Refund, interest and possession relief considerations in delayed possession matters.",
    "date": "May 2026",
    "tags": [
      "RERA",
      "Bihar",
      "Delayed Possession",
      "Refund",
      "Interest"
    ]
  },
  {
    "href": "updates/arbitration-notice-before-claim.html",
    "category": "Procedure Note",
    "title": "Arbitration notice before claim",
    "excerpt": "Notice, limitation, contract documents and claim preparation before arbitration begins.",
    "date": "May 2026",
    "tags": [
      "Arbitration",
      "Notice",
      "Limitation",
      "Claim Preparation"
    ]
  },
  {
    "href": "updates/property-injunction-suit-documents.html",
    "category": "Checklist",
    "title": "Property injunction suit documents",
    "excerpt": "Possession, title, site photographs, notices and urgent-court preparation in property injunction suits.",
    "date": "May 2026",
    "tags": [
      "Property",
      "Injunction",
      "Civil Suit",
      "Documents",
      "Possession"
    ]
  },
  {
    "href": "updates/section-34-arbitration-award-challenge.html",
    "category": "Procedure Note",
    "title": "Section 34 arbitration award challenge",
    "excerpt": "Limitation, grounds, record preparation and court-stage considerations for award challenges.",
    "date": "May 2026",
    "tags": [
      "Arbitration",
      "Section 34",
      "Award Challenge",
      "Limitation"
    ]
  }
];

// Shared Insights card rendering helpers
window.ChambersInsightCards = (function () {
  const normalize = (value) => (value || '').toLowerCase().replace(/s+/g, ' ').trim();

  const categoryClass = (category) => {
    const normalized = normalize(category);
    if (normalized.includes('case')) return 'tag-case-brief';
    if (normalized.includes('checklist')) return 'tag-checklist';
    if (normalized.includes('procedure')) return 'tag-procedure';
    if (normalized.includes('guide')) return 'tag-guide';
    return 'tag-legal-update';
  };

  const buildTagList = (tags, linked) => {
    const wrap = document.createElement('div');
    wrap.className = 'insight-card-tags';
    wrap.setAttribute('aria-label', 'Article tags');

    (tags || []).slice(0, 5).forEach((tag) => {
      const el = linked ? document.createElement('a') : document.createElement('span');
      el.textContent = tag;
      if (linked) el.href = `legal-updates.html?tag=${encodeURIComponent(tag)}`;
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

    const badge = document.createElement('span');
    badge.className = `update-tag ${categoryClass(item.category)}`;
    badge.textContent = item.category || 'Insight';

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

  return { buildCard, normalize, categoryClass, buildTagList };
})();

// Homepage latest insights strip renderer
(function () {
  const grid = document.querySelector('[data-home-insights-limit]');
  if (!grid || !window.ChambersInsightCards || !window.chambersInsightsRegistry) return;

  grid.innerHTML = '';
  window.chambersInsightsRegistry
    .slice(0, 3)
    .forEach((item) => grid.appendChild(window.ChambersInsightCards.buildCard(item, { tagLinks: false })));
})();

// Advanced Insights paginated list/filter module v6
(function () {
  const panel = document.querySelector('.insights-filter-panel');
  const categoryInput = document.querySelector('#insight-category-filter');
  const tagInput = document.querySelector('#insight-tag-filter');
  const searchInput = document.querySelector('#insight-search-filter');
  const categoryList = document.querySelector('#insight-category-options');
  const tagList = document.querySelector('#insight-tag-options');
  const clearButton = document.querySelector('.insights-clear-filter');
  const status = document.querySelector('.insights-filter-status');
  const resultsSection = document.querySelector('.insights-results-section');
  const resultsList = document.querySelector('.insights-results-list');
  const latestAllButton = document.querySelector('[data-latest-all-trigger]');

  if (!panel || !categoryInput || !tagInput || !searchInput || !categoryList || !tagList || !clearButton || !resultsSection || !resultsList) return;

  let activeInput = null;
  let currentPage = 1;
  let latestListMode = false;
  const pageSize = 10;
  const normalize = window.ChambersInsightCards.normalize;
  const allItems = window.chambersInsightsRegistry || [];

  const uniqueSorted = (values) => Array.from(new Set(values.filter(Boolean)))
    .sort((a, b) => a.localeCompare(b, 'en-IN', { sensitivity: 'base' }));

  const setDatalist = (list, values) => {
    list.innerHTML = '';
    values.forEach((value) => {
      const option = document.createElement('option');
      option.value = value;
      list.appendChild(option);
    });
  };

  const itemMatches = (item, category, tag, search) => {
    const categoryText = normalize(item.category);
    const tagsText = normalize((item.tags || []).join(', '));
    const searchable = normalize(`${item.title} ${item.excerpt} ${item.category} ${(item.tags || []).join(' ')}`);
    return (!category || categoryText.includes(category)) &&
      (!tag || tagsText.includes(tag)) &&
      (!search || searchable.includes(search));
  };

  const hasAnyMatch = (category, tag, search) => allItems.some((item) => itemMatches(item, category, tag, search));

  const resolveConflicts = () => {
    const category = normalize(categoryInput.value);
    const tag = normalize(tagInput.value);
    const search = normalize(searchInput.value);
    if (!category || !tag) return;
    if (hasAnyMatch(category, tag, search)) return;
    if (activeInput === 'tag') categoryInput.value = '';
    else if (activeInput === 'category') tagInput.value = '';
    else categoryInput.value = '';
  };

  const updateDependentOptions = () => {
    const category = normalize(categoryInput.value);
    const tag = normalize(tagInput.value);
    const search = normalize(searchInput.value);

    const tagScope = category ? allItems.filter((item) => itemMatches(item, category, '', search)) : allItems;
    const categoryScope = tag ? allItems.filter((item) => itemMatches(item, '', tag, search)) : allItems;

    setDatalist(tagList, uniqueSorted(tagScope.flatMap((item) => item.tags || [])));
    setDatalist(categoryList, uniqueSorted(categoryScope.map((item) => item.category)));
  };

  const pagination = document.createElement('div');
  pagination.className = 'insights-pagination';

  const renderPagination = (totalItems) => {
    pagination.innerHTML = '';
    const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
    if (totalPages <= 1) {
      if (pagination.parentNode) pagination.remove();
      return;
    }

    for (let page = 1; page <= totalPages; page += 1) {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'insights-page-button';
      button.textContent = String(page);
      button.classList.toggle('is-active', page === currentPage);
      button.addEventListener('click', () => {
        currentPage = page;
        applyFilters(false);
        resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
      pagination.appendChild(button);
    }

    resultsList.after(pagination);
  };

  const renderResults = (items) => {
    resultsList.innerHTML = '';

    if (!items.length) {
      const empty = document.createElement('p');
      empty.className = 'insights-filter-status';
      empty.textContent = 'No matching insights found. Clear filters or try a broader search.';
      resultsList.appendChild(empty);
      renderPagination(0);
      return;
    }

    const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
    if (currentPage > totalPages) currentPage = totalPages;

    const start = (currentPage - 1) * pageSize;
    const visible = items.slice(start, start + pageSize);

    visible.forEach((item) => resultsList.appendChild(window.ChambersInsightCards.buildCard(item, { result: true, tagLinks: false })));
    renderPagination(items.length);
  };

  const applyFilters = (resetPage = true) => {
    if (resetPage) currentPage = 1;
    resolveConflicts();
    updateDependentOptions();

    const category = normalize(categoryInput.value);
    const tag = normalize(tagInput.value);
    const search = normalize(searchInput.value);
    const isFilterActive = Boolean(category || tag || search);
    const isActive = latestListMode || isFilterActive;

    const matches = latestListMode && !isFilterActive
      ? allItems
      : allItems.filter((item) => itemMatches(item, category, tag, search));

    document.body.classList.toggle('insights-filter-active', isActive);
    document.body.classList.toggle('insights-list-active', latestListMode);
    resultsSection.hidden = !isActive;

    if (isActive) {
      renderResults(matches);
      if (latestListMode && !isFilterActive) {
        status.textContent = `Showing all latest insights, newest first. Page ${currentPage} of ${Math.max(1, Math.ceil(matches.length / pageSize))}.`;
      } else {
        const parts = [];
        if (category) parts.push(`category: ${categoryInput.value}`);
        if (tag) parts.push(`tag: ${tagInput.value}`);
        if (search) parts.push(`search: ${searchInput.value}`);
        status.textContent = `Showing ${matches.length} matching insight${matches.length === 1 ? '' : 's'} for ${parts.join(', ')}.`;
      }
    } else {
      resultsList.innerHTML = '';
      renderPagination(0);
      status.textContent = 'Showing default editorial view.';
    }
  };

  categoryInput.addEventListener('input', () => { activeInput = 'category'; latestListMode = false; applyFilters(); });
  categoryInput.addEventListener('change', () => { activeInput = 'category'; latestListMode = false; applyFilters(); });
  tagInput.addEventListener('input', () => { activeInput = 'tag'; latestListMode = false; applyFilters(); });
  tagInput.addEventListener('change', () => { activeInput = 'tag'; latestListMode = false; applyFilters(); });
  searchInput.addEventListener('input', () => { activeInput = 'search'; latestListMode = false; applyFilters(); });
  searchInput.addEventListener('change', () => { activeInput = 'search'; latestListMode = false; applyFilters(); });

  if (latestAllButton) {
    latestAllButton.addEventListener('click', () => {
      activeInput = 'latest';
      latestListMode = true;
      categoryInput.value = '';
      tagInput.value = '';
      searchInput.value = '';
      applyFilters();
      resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  clearButton.addEventListener('click', () => {
    activeInput = null;
    latestListMode = false;
    categoryInput.value = '';
    tagInput.value = '';
    searchInput.value = '';
    applyFilters();
    panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  const params = new URLSearchParams(window.location.search);
  if (params.get('category')) categoryInput.value = params.get('category');
  if (params.get('tag')) tagInput.value = params.get('tag');
  if (params.get('q')) searchInput.value = params.get('q');

  setDatalist(categoryList, uniqueSorted(allItems.map((item) => item.category)));
  setDatalist(tagList, uniqueSorted(allItems.flatMap((item) => item.tags || [])));
  applyFilters();
})();

// Article footer: tags, previous/next and recommended reads
(function () {
  const article = document.querySelector('.article-body');
  if (!article || !window.ChambersInsightCards || !window.chambersInsightsRegistry) return;

  const path = window.location.pathname.replace(/^\//, '');
  const items = window.chambersInsightsRegistry;
  const currentIndex = items.findIndex((item) => item.href === path);
  if (currentIndex === -1) return;

  const current = items[currentIndex];
  const previous = items[currentIndex + 1];
  const next = items[currentIndex - 1];

  const related = items
    .filter((item, index) => index !== currentIndex && (item.category === current.category || item.tags.some((tag) => current.tags.includes(tag))))
    .slice(0, 3);

  const footer = document.createElement('section');
  footer.className = 'article-standard-footer';

  const tagsTitle = document.createElement('h2');
  tagsTitle.textContent = 'Tags';

  const tags = document.createElement('div');
  tags.className = 'article-tag-list';
  current.tags.forEach((tag) => {
    const link = document.createElement('a');
    link.href = `../legal-updates.html?tag=${encodeURIComponent(tag)}`;
    link.textContent = tag;
    tags.appendChild(link);
  });

  footer.appendChild(tagsTitle);
  footer.appendChild(tags);

  if (previous || next) {
    const nav = document.createElement('div');
    nav.className = 'article-nav-row';

    if (previous) {
      const prevLink = document.createElement('a');
      prevLink.className = 'article-nav-button';
      prevLink.href = '../' + previous.href;
      prevLink.innerHTML = `<span>Previous Article</span>${previous.title}`;
      nav.appendChild(prevLink);
    }

    if (next) {
      const nextLink = document.createElement('a');
      nextLink.className = 'article-nav-button';
      nextLink.href = '../' + next.href;
      nextLink.innerHTML = `<span>Next Article</span>${next.title}`;
      nav.appendChild(nextLink);
    }

    footer.appendChild(nav);
  }

  if (related.length) {
    const recTitle = document.createElement('h2');
    recTitle.textContent = 'Recommended Reads';
    footer.appendChild(recTitle);

    const grid = document.createElement('div');
    grid.className = 'article-recommended-grid';

    related.forEach((item) => {
      const card = document.createElement('a');
      card.className = 'article-recommended-card';
      card.href = '../' + item.href;
      card.innerHTML = `<strong>${item.title}</strong><small>${item.category}</small>`;
      grid.appendChild(card);
    });

    footer.appendChild(grid);
  }

  article.appendChild(footer);
})();
