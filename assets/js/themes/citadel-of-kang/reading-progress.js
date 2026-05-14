/* Citadel of Kang Theme Pack: Reading Progress Module
   Non-live development file. Not loaded by production pipeline yet. */
(function () {
  var body = document.body;
  if (!body || body.getAttribute('data-citadel-reading-progress') === 'false') return;

  var root = document.querySelector('[data-citadel-reading-progress-bar], .citadel-reading-progress, [data-citadel-reading-progress]:not(body):not(html)');
  if (!root || root.dataset.citadelReadingProgressReady === 'true') return;

  var bar = root.querySelector('span') || root;
  var source = document.querySelector('[data-citadel-reading-progress-source], article.article-body, article.ck-article, .article-body, .ck-article');
  var fallbackToDocument = true;

  var getScrollY = function () {
    return window.pageYOffset || document.documentElement.scrollTop || 0;
  };

  var clamp = function (value) {
    return Math.min(100, Math.max(0, value));
  };

  var update = function () {
    var percentage = 0;

    if (source) {
      var scrollY = getScrollY();
      var rect = source.getBoundingClientRect();
      var sourceTop = rect.top + scrollY;
      var sourceHeight = source.offsetHeight || rect.height || 0;
      var viewport = window.innerHeight || document.documentElement.clientHeight || 1;
      var distance = Math.max(1, sourceHeight - viewport * 0.45);
      percentage = ((scrollY - sourceTop) / distance) * 100;
    } else if (fallbackToDocument) {
      var documentHeight = document.documentElement.scrollHeight - window.innerHeight;
      percentage = documentHeight > 0 ? (getScrollY() / documentHeight) * 100 : 0;
    }

    bar.style.width = clamp(percentage) + '%';
  };

  root.dataset.citadelReadingProgressReady = 'true';
  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
  window.addEventListener('load', update);
  update();
})();
