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

const createThemeToggleMarkup = () => {
  if (!window.ChambersTheme?.isCitadelActive) return '';
  return '<button class="theme-mode-toggle" type="button" data-theme-mode-toggle aria-pressed="false" aria-label="Switch to Dark mode"><span class="theme-mode-track" aria-hidden="true"><span class="theme-mode-icon theme-mode-sun">☀</span><span class="theme-mode-thumb"></span><span class="theme-mode-icon theme-mode-moon">☾</span></span><span class="sr-only">Toggle Citadel color mode</span></button>';
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
        ${createThemeToggleMarkup()}
        <time class="live-clock" data-ak-clock></time>
      </div>
    `;
    nav.parentNode.insertBefore(topBar, nav);
    window.ChambersTheme?.refreshToggleLabels();
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
        ${createThemeToggleMarkup()}
        <time class="drawer-time" data-ak-clock></time>
      </div>
    `;
    navLinksList.insertBefore(socialItem, navLinksList.firstElementChild);
    window.ChambersTheme?.refreshToggleLabels();
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

  document.addEventListener('click', (event) => {
    const toggle = event.target instanceof Element ? event.target.closest('[data-theme-mode-toggle]') : null;
    if (!toggle || !window.ChambersTheme?.isCitadelActive) return;
    window.ChambersTheme.toggleColorMode();
  });

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
  const registryUrl = assetPrefix + 'assets/data/insights-registry.json?v=registry-1';

  try {
    const request = new XMLHttpRequest();
    request.open('GET', registryUrl, false);
    request.overrideMimeType('application/json');
    request.send(null);

    if ((request.status >= 200 && request.status < 300) || request.status === 0) {
      applyRegistry(JSON.parse(request.responseText));
      return;
    }
  } catch (error) {
    console.warn('Insights registry synchronous load failed; falling back to async load:', error);
  }

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

    media.style.backgroundImage = `url("${thumb}")`;
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

if (window.ChambersInsightCards) {
  window.ChambersInsightCards.hydrateStaticCards(document);
  window.ChambersInsightCards.applyCurrentArticleThumbnail();
}


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

  const scriptId = 'citadel-blog-page-v1';
  if (document.getElementById(scriptId)) return;

  const assetPrefix = window.location.pathname.split('/').filter(Boolean).length > 1 ? '../' : '';
  const script = document.createElement('script');

  script.id = scriptId;
  script.src = `${assetPrefix}assets/js/themes/citadel-of-kang/modules/blog/blog-page.js?v=blog-page-v1`;
  script.defer = true;
  document.body.appendChild(script);
})();

// Article index: Citadel Article Index v20 auto-loader
(function () {
  const init = () => {
    const article = document.querySelector('article[data-citadel-article-index], article.article-body, article.ck-article');
    if (!article || article.dataset.citadelArticleIndexReady === 'true') return;
    if (document.querySelector('.article-index-layout')) return;
    if (document.getElementById('citadel-article-index-v20')) return;

    const headings = Array.from(article.querySelectorAll(':scope > h2'))
      .filter((heading) => (heading.textContent || '').trim().length > 0);

    if (headings.length < 3) return;

    // Existing article pages may still include a manual Article Index script tag.
    // The auto-loader waits until the document is parsed and avoids injecting a duplicate.
    if (document.querySelector('script[src*="article-index-direct-rail.js"]')) return;

    const assetPrefix = window.location.pathname.split('/').filter(Boolean).length > 1 ? '../' : '';
    const script = document.createElement('script');

    script.id = 'citadel-article-index-v20';
    script.src = `${assetPrefix}assets/js/themes/citadel-of-kang/article-index-direct-rail.js?v=article-index-v20`;
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
// Case enquiry copy-to-clipboard templates
(function () {
  const copyButtons = document.querySelectorAll('[data-copy-target]');

  if (!copyButtons.length) {
    return;
  }

  const fallbackCopy = (text) => {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'fixed';
    textarea.style.top = '-999px';
    textarea.style.left = '-999px';
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
  };

  const copyText = async (text) => {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return;
    }

    fallbackCopy(text);
  };

  copyButtons.forEach((button) => {
    button.addEventListener('click', async () => {
      const target = document.getElementById(button.dataset.copyTarget || '');
      if (!target) return;

      const originalText = button.textContent;
      const text = target.textContent.trim();

      try {
        await copyText(text);
        button.textContent = 'Copied';
        button.classList.add('is-copied');
      } catch (error) {
        button.textContent = 'Copy failed';
      }

      window.setTimeout(() => {
        button.textContent = originalText;
        button.classList.remove('is-copied');
      }, 1600);
    });
  });
})();

// Dynamic contact enquiry form
(function () {
  const form = document.querySelector('[data-contact-dynamic-form]');
  if (!form) return;

  const emailJsConfig = {
    publicKey: 'rivGZ1UliuSkSgFdm',
    serviceId: 'chambersofak',
    templateId: 'contactformtempid'
  };

  const matterSelect = form.querySelector('[data-matter-type]');
  const matterGroups = Array.from(form.querySelectorAll('[data-matter-fields]'));
  const generateButton = form.querySelector('[data-generate-enquiry]');
  const copyButton = form.querySelector('[data-copy-enquiry]');
  const sendButton = form.querySelector('[data-emailjs-send]');
  const outputWrapper = form.querySelector('[data-form-result]');
  const output = form.querySelector('[data-enquiry-output]');
  const whatsappCompose = form.querySelector('[data-whatsapp-compose]');
  const gmailCompose = form.querySelector('[data-gmail-compose]');
  const consent = form.querySelector('[data-form-consent]');
  const statusMessages = Array.from(form.querySelectorAll('[data-emailjs-status]'));

  const matterLabels = {
    cheque: 'Cheque Bounce / Section 138',
    msme: 'MSME Recovery',
    rera: 'RERA / Builder Dispute',
    arbitration: 'Arbitration / Contract Dispute',
    commercial: 'Commercial Recovery',
    property: 'Property / Civil Suit',
    other: 'Other Legal Enquiry'
  };

  const readable = {
    name: 'Name',
    phone: 'Phone / WhatsApp',
    email: 'Email',
    location: 'City / State',
    preferredContact: 'Preferred Contact Mode',
    matterType: 'Matter Type',
    cheque_amount: 'Cheque Amount',
    cheque_date: 'Cheque Date',
    return_memo_date: 'Return Memo Date',
    notice_status: 'Demand Notice Status',
    cheque_stage: 'Current Stage',
    udyam_status: 'Udyam Registration Status',
    invoice_amount: 'Invoice Amount',
    invoice_dates: 'Invoice Dates',
    buyer_location: 'Buyer Location',
    payment_due_date: 'Payment Due Date',
    project_location: 'Project Location',
    builder_project: 'Builder / Project Name',
    allotment_date: 'Agreement / Allotment Date',
    possession_due_date: 'Possession Due Date',
    amount_paid: 'Amount Paid',
    rera_relief: 'Relief Sought',
    contract_date: 'Contract Date',
    arbitration_clause: 'Arbitration Clause',
    seat_venue: 'Seat / Venue',
    arbitration_amount: 'Amount / Relief Involved',
    invocation_status: 'Notice / Invocation Status',
    commercial_parties: 'Parties Involved',
    commercial_amount: 'Outstanding Amount',
    commercial_docs: 'Contract / PO / Invoice Details',
    last_payment_date: 'Last Payment Date',
    commercial_notice: 'Notice Status',
    property_location: 'Property Location',
    possession_status: 'Possession Status',
    title_docs: 'Title Documents Available?',
    property_stage: 'Current Dispute Stage',
    property_relief: 'Relief Sought',
    other_area: 'Legal Area',
    other_forum: 'Forum / Court',
    summary: 'Brief Summary',
    urgency: 'Urgency'
  };

  const setStatus = (message, tone) => {
    if (!statusMessages.length) return;
    statusMessages.forEach((statusMessage) => {
      statusMessage.textContent = '';
      statusMessage.dataset.status = '';
      statusMessage.hidden = true;
    });
    const statusMessage = outputWrapper && !outputWrapper.hidden
      ? statusMessages[statusMessages.length - 1]
      : statusMessages[0];
    statusMessage.textContent = message || '';
    statusMessage.dataset.status = tone || '';
    statusMessage.hidden = !message;
  };

  const buildWhatsAppComposeUrl = (message) => {
    const params = new URLSearchParams({ text: message });
    return `https://wa.me/919471214118?${params.toString()}`;
  };

  const buildGmailComposeUrl = (message) => {
    const composeParams = new URLSearchParams({
      view: 'cm',
      fs: '1',
      to: 'chambersofakadmin@gmail.com',
      su: 'Chambers of AK - Structured Enquiry',
      body: message
    });

    const gmailComposeUrl = `https://mail.google.com/mail/?${composeParams.toString()}`;
    const chooserParams = new URLSearchParams({ continue: gmailComposeUrl });
    return `https://accounts.google.com/AccountChooser?${chooserParams.toString()}`;
  };

  const updateMatterFields = () => {
    const selected = matterSelect.value;
    matterGroups.forEach((group) => {
      group.hidden = group.dataset.matterFields !== selected;
    });
  };

  const getValue = (field) => {
    if (!field || !field.name || field.type === 'checkbox') return '';
    return (field.value || '').trim();
  };

  const getFieldValue = (name) => {
    const field = form.querySelector(`[name="${name}"]`);
    return getValue(field);
  };

  const getMatterLabel = () => {
    const selected = matterSelect.value;
    return matterLabels[selected] || selected || 'Not selected';
  };

  const generateMessage = () => {
    const selected = matterSelect.value;
    const fields = Array.from(form.querySelectorAll('input, select, textarea'))
      .filter((field) => !field.closest('[hidden]'))
      .filter((field) => field.name && field.type !== 'checkbox');

    const lines = [
      'Chambers of AK - Structured Enquiry',
      '------------------------------------'
    ];

    fields.forEach((field) => {
      const value = getValue(field);
      if (!value) return;
      const label = field.name === 'matterType' ? 'Matter Type' : (readable[field.name] || field.name);
      const finalValue = field.name === 'matterType' ? (matterLabels[value] || value) : value;
      lines.push(`${label}: ${finalValue}`);
    });

    lines.push('');
    lines.push('Note: This is an initial enquiry summary only. I understand that no advocate-client relationship is created until formal consultation or engagement is confirmed.');

    if (!selected) {
      lines.push('');
      lines.push('Please select a matter type before sending this message.');
    }

    output.value = lines.join('\n');

    if (whatsappCompose) {
      whatsappCompose.href = buildWhatsAppComposeUrl(output.value);
    }

    if (gmailCompose) {
      gmailCompose.href = buildGmailComposeUrl(output.value);
    }

    outputWrapper.hidden = false;
    copyButton.disabled = false;
    if (sendButton) {
      sendButton.disabled = !consent || !consent.checked;
    }
    setStatus('', '');
    output.focus();
  };

  const getTemplateParams = () => {
    if (!output.value.trim()) {
      generateMessage();
    }

    return {
      from_name: getFieldValue('name') || 'Website Enquiry',
      phone: getFieldValue('phone'),
      reply_to: getFieldValue('email'),
      location: getFieldValue('location'),
      preferred_contact: getFieldValue('preferredContact'),
      matter_type: getMatterLabel(),
      urgency: getFieldValue('urgency'),
      message: output.value,
      page_url: window.location.href
    };
  };

  const sendEmailEnquiry = async () => {
    if (!consent || !consent.checked) {
      setStatus('Please accept the enquiry acknowledgement before sending.', 'error');
      return;
    }

    if (!window.emailjs || typeof window.emailjs.send !== 'function') {
      setStatus('Email service is still loading. Please try again in a few seconds, or use WhatsApp/Gmail fallback.', 'error');
      return;
    }

    const params = getTemplateParams();

    if (!params.reply_to) {
      setStatus('Please enter your email address before sending directly.', 'error');
      return;
    }

    try {
      sendButton.disabled = true;
      setStatus('Sending enquiry...', 'pending');

      await window.emailjs.send(
        emailJsConfig.serviceId,
        emailJsConfig.templateId,
        params,
        { publicKey: emailJsConfig.publicKey }
      );

      setStatus('Enquiry sent successfully. Chambers of AK will review the message and respond as appropriate.', 'success');
    } catch (error) {
      sendButton.disabled = false;
      setStatus('Could not send directly right now. Please use WhatsApp, Gmail, or copy the prepared message.', 'error');
      console.error('EmailJS send failed:', error);
    }
  };

  const copyPreparedMessage = async () => {
    if (!output.value.trim()) return;

    try {
      await navigator.clipboard.writeText(output.value);
      copyButton.textContent = 'Copied';
    } catch (error) {
      output.select();
      document.execCommand('copy');
      copyButton.textContent = 'Copied';
    }

    window.setTimeout(() => {
      copyButton.textContent = 'Copy Prepared Message';
    }, 1600);
  };

  matterSelect.addEventListener('change', updateMatterFields);

  if (consent) {
    consent.addEventListener('change', () => {
      generateButton.disabled = !consent.checked;
      if (sendButton) {
        sendButton.disabled = !consent.checked || !output.value.trim();
      }
    });
    generateButton.disabled = !consent.checked;
  }

  if (window.emailjs && typeof window.emailjs.init === 'function') {
    window.emailjs.init({ publicKey: emailJsConfig.publicKey });
  }

  generateButton.addEventListener('click', generateMessage);
  copyButton.addEventListener('click', copyPreparedMessage);
  if (sendButton) {
    sendButton.addEventListener('click', sendEmailEnquiry);
  }

  updateMatterFields();
})();
