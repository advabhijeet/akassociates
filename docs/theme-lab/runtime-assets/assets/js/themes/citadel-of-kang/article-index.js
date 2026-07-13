/* Citadel of Kang Theme Pack: Article Index Module
   Behaviour only: generate index, safe IDs, active state and progress.
   Layout is handled by CSS grid + sticky. */
(function () {
  var body = document.body;
  var bodySetting = body ? body.getAttribute('data-citadel-article-index') : null;
  if (bodySetting === 'false') return;

  if (body && !body.id) {
    body.id = 'top';
  }

  var explicitArticle = document.querySelector('article[data-citadel-article-index], [data-citadel-article-index] article.article-body, [data-citadel-article-index] article.ck-article');
  var fallbackArticle = document.querySelector('article.article-body, article.ck-article');
  var article = explicitArticle || fallbackArticle;

  if (!article || article.dataset.citadelArticleIndexReady === 'true') return;

  var explicitEnabled = bodySetting === 'true' || Boolean(explicitArticle);
  var section = article.closest('section') || article.parentElement;
  if (!section) return;

  var headings = Array.prototype.slice.call(article.querySelectorAll(':scope > h2'))
    .filter(function (heading) { return (heading.textContent || '').trim().length > 0; });

  if (headings.length < 3) return;
  if (!explicitEnabled && !article.matches('article.article-body, article.ck-article')) return;

  var slugify = function (text) {
    var id = (text || '')
      .toLowerCase()
      .replace(/&/g, ' and ')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 80) || 'article-section';

    if (!/^[a-z_]/.test(id)) {
      id = 'section-' + id;
    }

    return id;
  };

  var usedIds = Object.create(null);

  Array.prototype.slice.call(document.querySelectorAll('[id]')).forEach(function (element) {
    if (element.id) usedIds[element.id] = true;
  });

  var getUniqueId = function (base, currentId) {
    if (currentId) delete usedIds[currentId];

    var id = base;
    var counter = 2;

    while (usedIds[id] || document.getElementById(id)) {
      id = base + '-' + counter;
      counter += 1;
    }

    usedIds[id] = true;
    return id;
  };

  headings.forEach(function (heading) {
    var existingId = (heading.id || '').trim();
    var isSelectorSafeId = /^[A-Za-z_][A-Za-z0-9_-]*$/.test(existingId);

    if (!existingId || !isSelectorSafeId) {
      heading.id = getUniqueId(slugify(heading.textContent), existingId);
    } else {
      usedIds[heading.id] = true;
    }
  });

  var toc = document.createElement('aside');
  toc.className = 'article-index-toc';
  toc.setAttribute('aria-labelledby', 'article-index-title');

  var items = headings.map(function (heading) {
    var title = (heading.textContent || '').trim().replace(/^\d+\.\s*/, '');
    return '<li><a href="#' + encodeURIComponent(heading.id) + '">' + title + '</a></li>';
  }).join('');

  toc.innerHTML = [
    '<h2 id="article-index-title" class="article-index-title">Article Index</h2>',
    '<p class="article-index-note">The active tile changes as soon as a heading becomes visible on screen.</p>',
    '<div class="article-index-progress" aria-hidden="true"><span></span></div>',
    '<ol>' + items + '</ol>',
    '<a class="article-index-back-top" href="#top">Back to top ↑</a>'
  ].join('');

  var layout = document.createElement('div');
  layout.className = 'article-index-layout';

  section.insertBefore(layout, article);
  layout.appendChild(toc);
  layout.appendChild(article);

  article.dataset.citadelArticleIndexReady = 'true';

  var links = Array.prototype.slice.call(toc.querySelectorAll('a[href^="#"]'))
    .filter(function (link) { return link.getAttribute('href') !== '#top'; });
  var progress = toc.querySelector('.article-index-progress span');
  var nav = document.querySelector('.nav, [data-citadel-navigation-root], header[role="banner"]');

  var getNavSpace = function () {
    return nav ? nav.getBoundingClientRect().height : 88;
  };

  var getScrollY = function () {
    return window.pageYOffset || document.documentElement.scrollTop || 0;
  };

  var getCurrentSection = function () {
    var navSpace = getNavSpace();
    var viewportBottom = window.innerHeight || document.documentElement.clientHeight;
    var visible = headings.filter(function (heading) {
      var rect = heading.getBoundingClientRect();
      return rect.top < viewportBottom && rect.bottom > navSpace;
    });

    return visible.length ? visible[visible.length - 1] : headings[0];
  };

  var setActiveArticleIndexItem = function () {
    var current = getCurrentSection();

    links.forEach(function (link) {
      var raw = link.getAttribute('href') || '';
      var id = raw.charAt(0) === '#' ? decodeURIComponent(raw.slice(1)) : '';
      link.classList.toggle('is-active', current && id === current.id);
    });

    var documentHeight = document.documentElement.scrollHeight - window.innerHeight;
    var percentage = documentHeight > 0 ? Math.min(100, Math.max(0, (getScrollY() / documentHeight) * 100)) : 0;
    if (progress) progress.style.width = percentage + '%';
  };

  links.forEach(function (link) {
    link.addEventListener('click', function () {
      window.setTimeout(function () {
        link.blur();
        setActiveArticleIndexItem();
      }, 120);
    });
  });

  window.addEventListener('scroll', setActiveArticleIndexItem, { passive: true });
  window.addEventListener('resize', setActiveArticleIndexItem);
  window.addEventListener('load', setActiveArticleIndexItem);
  window.setTimeout(setActiveArticleIndexItem, 0);
})();
