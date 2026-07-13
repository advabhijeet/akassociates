/* Citadel of Kang Theme Pack: Reading Time Module
   Non-live development file. Not loaded by production pipeline yet. */
(function () {
  var body = document.body;
  if (!body || body.getAttribute('data-citadel-reading-time') === 'false') return;

  var output = document.querySelector('[data-citadel-reading-time-output]');
  if (!output || output.dataset.citadelReadingTimeReady === 'true') return;

  var explicitArticle = document.querySelector('[data-citadel-reading-time]');
  var fallbackArticle = document.querySelector('article.article-body, article.ck-article, .article-body, .ck-article');
  var article = explicitArticle || fallbackArticle;
  if (!article) return;

  var clone = article.cloneNode(true);
  Array.prototype.slice.call(clone.querySelectorAll('script, style, noscript, svg, [aria-hidden="true"]')).forEach(function (node) {
    node.remove();
  });

  var text = (clone.textContent || '').trim();
  if (!text) return;

  var words = text.split(/\s+/).filter(Boolean).length;
  var wordsPerMinute = 220;
  var minutes = Math.max(1, Math.ceil(words / wordsPerMinute));

  output.textContent = minutes + ' min read';
  output.dataset.citadelReadingTimeReady = 'true';
})();
