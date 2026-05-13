/* Chambers of AK article index system.
   Builds a section index for long-form article pages under /updates/. */
(function () {
  var path = window.location.pathname || '';
  var isArticlePage = /\/updates\/[^/]+\.html$/i.test(path);
  if (!isArticlePage) return;

  var section = document.querySelector('main > section.sec');
  var article = section ? section.querySelector('article.article-body') : document.querySelector('article.article-body');
  if (!section || !article || article.dataset.articleIndexReady === 'true') return;

  var headings = Array.prototype.slice.call(article.querySelectorAll(':scope > h2'))
    .filter(function (heading) { return (heading.textContent || '').trim().length > 0; });

  if (headings.length < 3) return;

  var slugify = function (text) {
    return (text || '')
      .toLowerCase()
      .replace(/&/g, ' and ')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 80) || 'article-section';
  };

  var usedIds = Object.create(null);
  var getUniqueId = function (base) {
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
    if (!heading.id) {
      heading.id = getUniqueId(slugify(heading.textContent));
    } else {
      usedIds[heading.id] = true;
    }
  });

  var toc = document.createElement('aside');
  toc.className = 'article-index-toc';
  toc.setAttribute('aria-labelledby', 'article-index-title');

  var items = headings.map(function (heading) {
    var title = (heading.textContent || '').trim().replace(/^\d+\.\s*/, '');
    return '<li><a href="#' + heading.id + '">' + title + '</a></li>';
  }).join('');

  toc.innerHTML = [
    '<h2 id="article-index-title" class="article-index-title">Article Index</h2>',
    '<p class="article-index-note">Jump directly to a section. On desktop, this index stays visible while reading.</p>',
    '<div class="article-index-progress" aria-hidden="true"><span></span></div>',
    '<ol>' + items + '</ol>',
    '<a class="article-index-back-top" href="#top">Back to top ↑</a>'
  ].join('');

  var layout = document.createElement('div');
  layout.className = 'article-index-layout';
  section.insertBefore(layout, article);
  layout.appendChild(toc);
  layout.appendChild(article);
  article.dataset.articleIndexReady = 'true';

  var links = Array.prototype.slice.call(toc.querySelectorAll('a[href^="#"]'))
    .filter(function (link) { return link.getAttribute('href') !== '#top'; });
  var progress = toc.querySelector('.article-index-progress span');

  links.forEach(function (link) {
    link.addEventListener('click', function () {
      window.setTimeout(function () {
        link.blur();
        setActiveArticleIndexItem();
      }, 120);
    });
  });

  var getScrollY = function () {
    return window.pageYOffset || document.documentElement.scrollTop || 0;
  };

  var getTopOffset = function () {
    var raw = window.getComputedStyle(document.documentElement).getPropertyValue('--nav-space') || '108px';
    var navSpace = parseFloat(raw) || 108;
    return navSpace + 14;
  };

  var updateArticleIndexRail = function () {
    layout.classList.remove('is-index-fixed', 'is-index-after');

    if (window.innerWidth <= 920) {
      toc.style.removeProperty('--article-index-left');
      toc.style.removeProperty('--article-index-width');
      toc.style.removeProperty('--article-index-local-left');
      toc.style.removeProperty('--article-index-top');
      return;
    }

    var topOffset = getTopOffset();
    var scrollY = getScrollY();
    var layoutRect = layout.getBoundingClientRect();
    var tocRect = toc.getBoundingClientRect();
    var layoutTop = layoutRect.top + scrollY;
    var layoutBottom = layoutTop + layout.offsetHeight;
    var tocHeight = Math.min(toc.scrollHeight, window.innerHeight - topOffset - 24);
    var fixedStart = layoutTop - topOffset;
    var fixedEnd = layoutBottom - tocHeight - topOffset;

    toc.style.setProperty('--article-index-left', tocRect.left + 'px');
    toc.style.setProperty('--article-index-width', tocRect.width + 'px');
    toc.style.setProperty('--article-index-local-left', (tocRect.left - layoutRect.left) + 'px');
    toc.style.setProperty('--article-index-top', topOffset + 'px');

    if (scrollY >= fixedStart && scrollY <= fixedEnd) {
      layout.classList.add('is-index-fixed');
    } else if (scrollY > fixedEnd) {
      layout.classList.add('is-index-after');
    }
  };

  var getCurrentSectionByLatestVisibleHeading = function () {
    var viewportBottomLine = window.innerHeight - 80;
    var current = headings[0];

    headings.forEach(function (heading) {
      if (heading.getBoundingClientRect().top <= viewportBottomLine) {
        current = heading;
      }
    });

    return current;
  };

  var setActiveArticleIndexItem = function () {
    updateArticleIndexRail();

    var current = getCurrentSectionByLatestVisibleHeading();
    if (current) {
      links.forEach(function (link) {
        link.classList.toggle('is-active', link.getAttribute('href') === '#' + current.id);
      });
    }

    var documentHeight = document.documentElement.scrollHeight - window.innerHeight;
    var percentage = documentHeight > 0 ? Math.min(100, Math.max(0, (getScrollY() / documentHeight) * 100)) : 0;
    if (progress) progress.style.width = percentage + '%';
  };

  window.addEventListener('scroll', setActiveArticleIndexItem, { passive: true });
  window.addEventListener('resize', setActiveArticleIndexItem);
  window.addEventListener('load', setActiveArticleIndexItem);
  window.setTimeout(setActiveArticleIndexItem, 0);
})();
