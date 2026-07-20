/* Citadel Article Index Direct Rail Module
   Production direct-rail behaviour.
   Native page scroll only. No scroll capture. No internal tray scrolling. */
(function () {
  'use strict';

  var body = document.body;
  if (!body || body.getAttribute('data-citadel-article-index') === 'false') return;

  if (!body.id) body.id = 'top';

  var article = document.querySelector('article[data-citadel-article-index], article.article-body, article.ck-article');
  if (!article || article.dataset.citadelArticleIndexReady === 'true') return;

  var section = article.closest('section') || article.parentElement;
  if (!section) return;

  var headings = Array.prototype.slice.call(article.querySelectorAll(':scope > h2'))
    .filter(function (heading) { return (heading.textContent || '').trim().length > 0; });
  if (headings.length < 3) return;

  var usedIds = Object.create(null);
  Array.prototype.slice.call(document.querySelectorAll('[id]')).forEach(function (node) {
    if (node.id) usedIds[node.id] = true;
  });

  var slugify = function (text) {
    var id = (text || '')
      .toLowerCase()
      .replace(/&/g, ' and ')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 80) || 'article-section';
    return /^[a-z_]/.test(id) ? id : 'section-' + id;
  };

  var uniqueId = function (base, currentId) {
    if (currentId) delete usedIds[currentId];
    var id = base;
    var count = 2;
    while (usedIds[id] || document.getElementById(id)) {
      id = base + '-' + count;
      count += 1;
    }
    usedIds[id] = true;
    return id;
  };

  headings.forEach(function (heading) {
    var existingId = (heading.id || '').trim();
    if (!existingId || !/^[A-Za-z_][A-Za-z0-9_-]*$/.test(existingId)) {
      heading.id = uniqueId(slugify(heading.textContent), existingId);
    } else {
      usedIds[heading.id] = true;
    }
  });

  var layout = document.createElement('div');
  layout.className = 'article-index-layout';

  var rail = document.createElement('div');
  rail.className = 'article-index-rail';

  var toc = document.createElement('aside');
  toc.className = 'article-index-toc';
  toc.setAttribute('aria-labelledby', 'article-index-title');

  var title = document.createElement('h2');
  title.id = 'article-index-title';
  title.className = 'article-index-title';
  title.textContent = 'Article Index';

  var progressWrap = document.createElement('div');
  progressWrap.className = 'article-index-progress';
  progressWrap.setAttribute('aria-hidden', 'true');
  var progress = document.createElement('span');
  progressWrap.appendChild(progress);

  var list = document.createElement('ol');

  headings.forEach(function (heading) {
    var li = document.createElement('li');
    var link = document.createElement('a');
    link.href = '#' + encodeURIComponent(heading.id);
    link.textContent = (heading.textContent || '').trim().replace(/^\d+\.\s*/, '');
    li.appendChild(link);
    list.appendChild(li);
  });

  var backTop = document.createElement('a');
  backTop.className = 'article-index-back-top';
  backTop.href = '#top';
  backTop.textContent = 'Back to top ↑';

  toc.appendChild(title);
  toc.appendChild(progressWrap);
  toc.appendChild(list);
  toc.appendChild(backTop);

  section.insertBefore(layout, article);
  layout.appendChild(rail);
  rail.appendChild(toc);
  layout.appendChild(article);
  article.dataset.citadelArticleIndexReady = 'true';

  var mobileProgress = document.querySelector('.mobile-reading-progress');
  if (!mobileProgress) {
    mobileProgress = document.createElement('div');
    mobileProgress.className = 'mobile-reading-progress';
    mobileProgress.setAttribute('aria-hidden', 'true');
    mobileProgress.appendChild(document.createElement('span'));
    var shell = document.querySelector('.s') || body;
    shell.insertBefore(mobileProgress, shell.firstChild);
  }
  var mobileBar = mobileProgress.querySelector('span');

  var links = Array.prototype.slice.call(toc.querySelectorAll('a[href^="#"]'))
    .filter(function (link) { return link.getAttribute('href') !== '#top'; });
  var nav = document.querySelector('.nav, [data-citadel-navigation-root], header[role="banner"]');
  var topbar = document.querySelector('.site-topbar');
  var reducedMotionQuery = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;
  var clickIntent = null;
  var clickTimer = null;
  var lastActiveId = headings[0].id;
  var activeLink = links[0] || null;

  var getScrollY = function () {
    return window.pageYOffset || document.documentElement.scrollTop || 0;
  };

  var navSpace = function () {
    var topbarHeight = topbar ? topbar.getBoundingClientRect().height : 0;
    var navHeight = nav ? nav.getBoundingClientRect().height : 88;
    return Math.ceil(topbarHeight + navHeight);
  };

  var anchorOffset = function () {
    return navSpace() + 72;
  };

  var preferredScrollBehavior = function () {
    return reducedMotionQuery && reducedMotionQuery.matches ? 'auto' : 'smooth';
  };

  var setProgress = function (pct) {
    var safe = Math.min(100, Math.max(0, pct));
    progress.style.width = safe + '%';
    if (mobileBar) mobileBar.style.width = Math.max(8, safe) + '%';
  };

  var activateById = function (id) {
    activeLink = null;
    links.forEach(function (link) {
      var linkId = decodeURIComponent((link.getAttribute('href') || '').replace(/^#/, ''));
      var isActive = linkId === id;
      link.classList.toggle('is-active', isActive);
      if (isActive) {
        activeLink = link;
        link.setAttribute('aria-current', 'location');
      } else {
        link.removeAttribute('aria-current');
      }
    });

    if (id) lastActiveId = id;
  };

  var holdClickIntent = function () {
    if (!clickIntent) return false;
    var target = document.getElementById(clickIntent.id);
    if (!target) {
      clickIntent = null;
      return false;
    }

    var elapsed = Date.now() - clickIntent.startedAt;
    var distance = Math.abs(target.getBoundingClientRect().top - anchorOffset());
    if (elapsed < 720) return true;
    if (distance > 90 && elapsed < 1450) return true;
    clickIntent = null;
    return false;
  };

  var updateActive = function () {
    if (holdClickIntent()) {
      activateById(clickIntent.id);
      return;
    }

    var line = navSpace() + Math.min(220, Math.max(92, window.innerHeight * 0.22));
    var current = null;

    headings.forEach(function (heading) {
      if (heading.getBoundingClientRect().top <= line) current = heading;
    });

    if (!current) {
      current = headings.find(function (heading) {
        var rect = heading.getBoundingClientRect();
        return rect.top >= navSpace() && rect.top <= window.innerHeight * 0.72;
      }) || document.getElementById(lastActiveId) || headings[0];
    }

    if (current) activateById(current.id);
  };

  var updateMobileProgressTop = function () {
    if (!nav) return;
    var height = mobileProgress ? (mobileProgress.offsetHeight || 4) : 4;
    var bottom = nav.getBoundingClientRect().bottom;
    document.documentElement.style.setProperty('--ck-mobile-reading-progress-height', height + 'px');
    document.documentElement.style.setProperty('--ck-mobile-reading-progress-top', Math.max(0, bottom - height) + 'px');
  };

  var activeOffsetInsideToc = function () {
    if (!activeLink) return null;
    var linkRect = activeLink.getBoundingClientRect();
    var tocRect = toc.getBoundingClientRect();
    return {
      top: linkRect.top - tocRect.top,
      bottom: linkRect.bottom - tocRect.top
    };
  };

  var syncRail = function () {
    if (toc.scrollTop !== 0) toc.scrollTop = 0;

    if (window.innerWidth <= 920) {
      toc.style.setProperty('transform', 'translate3d(0,0,0)', 'important');
      return;
    }

    var articleTop = getScrollY() + article.getBoundingClientRect().top;
    var maxTravel = Math.max(0, article.offsetHeight - toc.offsetHeight);
    var desired = getScrollY() + navSpace() + 18 - articleTop;
    var activeOffset = activeOffsetInsideToc();

    if (activeOffset) {
      var projectedTop = navSpace() + 18 + activeOffset.top;
      var projectedBottom = navSpace() + 18 + activeOffset.bottom;
      var safeTop = navSpace() + 58;
      var safeBottom = window.innerHeight - 36;

      if (projectedBottom > safeBottom) desired -= projectedBottom - safeBottom;
      if (projectedTop < safeTop) desired += safeTop - projectedTop;
    }

    desired = Math.min(maxTravel, Math.max(0, desired));
    toc.style.setProperty('transform', 'translate3d(0,' + Math.round(desired) + 'px,0)', 'important');
  };

  var updateProgress = function () {
    var articleTop = getScrollY() + article.getBoundingClientRect().top;
    var articleBottom = articleTop + article.offsetHeight;
    var start = articleTop - navSpace() - 22;
    var end = articleBottom - window.innerHeight;
    var pct = end > start ? ((getScrollY() - start) / (end - start)) * 100 : 0;
    setProgress(pct);
  };

  var ticking = false;
  var update = function () {
    updateMobileProgressTop();
    updateActive();
    updateProgress();
    syncRail();
    ticking = false;
  };

  var requestUpdate = function () {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(update);
  };

  links.forEach(function (link) {
    link.addEventListener('click', function (event) {
      var id = decodeURIComponent((link.getAttribute('href') || '').replace(/^#/, ''));
      var target = document.getElementById(id);
      if (!target) return;

      event.preventDefault();
      clickIntent = { id: id, startedAt: Date.now() };
      activateById(id);

      if (clickTimer) window.clearTimeout(clickTimer);
      clickTimer = window.setTimeout(function () {
        clickIntent = null;
        requestUpdate();
      }, 1550);

      window.scrollTo({
        top: getScrollY() + target.getBoundingClientRect().top - anchorOffset(),
        behavior: preferredScrollBehavior()
      });
      window.setTimeout(requestUpdate, 80);
      window.setTimeout(requestUpdate, 260);
    });
  });

  var observer = new MutationObserver(requestUpdate);
  observer.observe(body, { attributes: true, attributeFilter: ['class'] });

  if (window.ResizeObserver) {
    var resizeObserver = new ResizeObserver(requestUpdate);
    resizeObserver.observe(article);
    resizeObserver.observe(toc);
  }

  if (reducedMotionQuery) {
    if (typeof reducedMotionQuery.addEventListener === 'function') {
      reducedMotionQuery.addEventListener('change', requestUpdate);
    } else if (typeof reducedMotionQuery.addListener === 'function') {
      reducedMotionQuery.addListener(requestUpdate);
    }
  }

  window.addEventListener('scroll', requestUpdate, { passive: true });
  window.addEventListener('resize', requestUpdate);
  window.addEventListener('orientationchange', function () { window.setTimeout(requestUpdate, 160); });
  window.addEventListener('load', requestUpdate);
  activateById(headings[0].id);
  window.setTimeout(requestUpdate, 0);
})();
