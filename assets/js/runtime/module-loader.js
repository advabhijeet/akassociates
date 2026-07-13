/*
  Chambers Citadel declarative module loader v1.
  Module paths and cache versions are owned by ChambersPublicConfig.
*/
(function () {
  "use strict";

  if (window.CitadelModuleLoader?.initialized) return;

  const publicConfig = window.ChambersPublicConfig || {};
  const modules = publicConfig.modules || {};
  const assetRoot = window.ChambersAssetRoot || new URL('/', window.location.href).href;

  const loadModule = (key) => {
    const entry = modules[key];
    if (!entry || !entry.path || !entry.id) {
      console.warn(`Citadel module configuration missing: ${key}`);
      return null;
    }

    if (entry.guard && window[entry.guard]) return null;
    if (document.getElementById(entry.id)) return null;

    const script = document.createElement('script');
    script.id = entry.id;
    const moduleUrl = new URL(entry.path, assetRoot);
    moduleUrl.searchParams.set('v', entry.version || publicConfig.release || '1');
    script.src = moduleUrl.href;
    script.async = false;
    script.defer = true;
    script.dataset.citadelModule = key;
    script.addEventListener('error', () => {
      console.error(`Citadel module failed to load: ${key}`);
    }, { once: true });
    document.body.appendChild(script);
    return script;
  };

  const onReady = (callback) => {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', callback, { once: true });
    } else {
      window.setTimeout(callback, 0);
    }
  };

  loadModule('globalShell');

  onReady(() => {
    if (document.querySelector('[data-citadel-latest-insights], [data-home-insights-limit]')) {
      loadModule('latestInsights');
    }

    if (document.querySelector('[data-citadel-insights-directory]')) {
      loadModule('insightsDirectory');
    }

    if (document.querySelector('[data-citadel-blog-page]')) {
      loadModule('blogPage');
    }

    const article = document.querySelector('article[data-citadel-article-index], article.article-body, article.ck-article');
    if (
      article &&
      article.dataset.citadelArticleIndexReady !== 'true' &&
      !document.querySelector('.article-index-layout') &&
      !document.querySelector('script[src*="article-index-direct-rail.js"]')
    ) {
      const headings = Array.from(article.querySelectorAll(':scope > h2'))
        .filter((heading) => (heading.textContent || '').trim().length > 0);

      if (headings.length >= 3) {
        loadModule('articleIndex');
      }
    }

    if (document.querySelector('article.article-body')) {
      const loadArticleFooter = () => loadModule('articleFooter');
      const registryReady = window.ChambersInsightsRegistryReady;

      if (registryReady && typeof registryReady.then === 'function') {
        registryReady.then(loadArticleFooter).catch(loadArticleFooter);
      } else {
        loadArticleFooter();
      }
    }

    if (document.querySelector('[data-copy-target], [data-contact-dynamic-form]')) {
      loadModule('enquiryForm');
    }

    const pathName = window.location.pathname;
    const hasContactPage = document.querySelector('[data-citadel-contact-page], .contact-row, #dynamic-enquiry-form');
    const isContactPath = /(^|\/)contact\.html$/.test(pathName) || pathName === '/contact';
    if (hasContactPage || isContactPath) {
      loadModule('contactPage');
    }

    const hasEnquiryPage = document.querySelector('[data-citadel-enquiry-page], .enquiry-template-section, [data-copy-target]');
    const isEnquiryPath = /(^|\/)case-enquiry\.html$/.test(pathName) || pathName === '/case-enquiry';
    if (hasEnquiryPage || isEnquiryPath) {
      loadModule('enquiryPage');
    }

    const specialPage = document.querySelector(
      '[data-citadel-blog-page], [data-citadel-contact-page], [data-citadel-enquiry-page], [data-citadel-practice-page], [data-citadel-service-page], [data-citadel-practice-detail-page], article.article-body'
    );
    const hasGeneralPage = document.querySelector('[data-citadel-general-page]');
    const hasGeneralStructure = document.querySelector('.page-hero') &&
      (document.querySelector('.content-panel') || document.querySelector('.info-grid') || document.querySelector('.sec'));
    const generalPath = /(^|\/)(faq|process|courts|document-checklists|disclaimer|privacy-policy|terms)(\.html)?$/.test(pathName);

    if (!specialPage && (hasGeneralPage || hasGeneralStructure || generalPath)) {
      loadModule('generalContentPage');
    }

    const hasHomePage = document.querySelector('[data-citadel-home-page]');
    const isHomePath = pathName === '/' || /(^|\/)index\.html$/.test(pathName);
    if (hasHomePage || isHomePath) {
      loadModule('homePage');
    }

    const hasPracticePage = document.querySelector(
      '[data-citadel-practice-page], [data-citadel-service-page], [data-citadel-practice-detail-page]'
    );
    const isPracticePath = /(^|\/)practice\.html$/.test(pathName) ||
      /(^|\/)(services|practice)\/.+\.html$/.test(pathName) ||
      pathName === '/practice';

    if (hasPracticePage || isPracticePath) {
      loadModule('practicePage');
    }
  });

  window.CitadelModuleLoader = Object.freeze({
    initialized: true,
    release: publicConfig.release || "unknown",
    loadModule
  });
})();
