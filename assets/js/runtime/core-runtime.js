/*
  Chambers Citadel core runtime v1.
  Owns canonical-host handling, theme state, conversion events and reveal behavior.
*/
(function () {
  "use strict";

  const publicConfig = window.ChambersPublicConfig || {};
  const assetRoot = window.ChambersAssetRoot || new URL('/', window.location.href).href;
  const resolveAsset = (assetPath) => new URL(assetPath, assetRoot).href;

/* Canonical host redirect: GitHub Pages duplicate and /index.html to custom domain */
(function () {
  const canonicalConfig = publicConfig.canonical || {};
  const duplicateHost = canonicalConfig.duplicateHost || "";
  const canonicalHost = canonicalConfig.host || window.location.hostname;
  const projectPath = canonicalConfig.projectPath || "";
  const canonicalOrigin = canonicalConfig.origin || window.location.origin;

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
  const allowedPreviewThemes = new Set(publicConfig.theme?.allowedPreviewThemes || ['citadel-of-ak', 'citadel', 'citadel-of-ak-dark']);
  const params = new URLSearchParams(window.location.search);
  const requestedTheme = params.get('theme');
  const storageKey = publicConfig.theme?.previewStorageKey || 'akThemePreview';
  const modeKey = publicConfig.theme?.modeStorageKey || 'akCitadelColorMode';
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
    const logoConfig = publicConfig.theme?.logos || {};
    const logoSources = {
      nav: resolveAsset(logoConfig.navDark || 'assets/img/logo-navbar-dark.png?v=dark-2'),
      hero: resolveAsset(logoConfig.heroDark || 'assets/img/primary-logo-dark.png?v=dark-1'),
    };

    window.localStorage.setItem(modeKey, normalizedMode);
    document.documentElement.setAttribute('data-theme', themeName);
    document.documentElement.dataset.themeMode = normalizedMode;
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', normalizedMode === 'dark' ? (publicConfig.theme?.darkThemeColor || '#000000') : (publicConfig.theme?.lightThemeColor || '#111111'));
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
    href: publicConfig.theme?.fontsUrl || 'https://fonts.googleapis.com/css2?family=EB+Garamond:wght@400;500;600&family=Lato:wght@400;700;900&display=swap',
  });

  window.sessionStorage.removeItem(storageKey);
})();

const conversionEventNames = publicConfig.analytics?.conversionEvents || {
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

  window.CitadelCoreRuntime = Object.freeze({
    initialized: true,
    release: publicConfig.release || "unknown"
  });
})();
