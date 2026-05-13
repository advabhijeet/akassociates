/* Citadel of Kang Theme Pack: Core Bootstrap
   Non-live development file. Not loaded by production pipeline yet. */
(function () {
  var root = window.CitadelKang = window.CitadelKang || {};

  var defaults = {
    schemaVersion: '0.1.0',
    modules: {}
  };

  root.version = root.version || '0.1.0-dev';
  root.config = root.config || defaults;

  root.ready = function (callback) {
    if (typeof callback !== 'function') return;

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', callback, { once: true });
      return;
    }

    callback();
  };

  root.getConfig = function (path, fallback) {
    var parts = String(path || '').split('.').filter(Boolean);
    var current = root.config;

    for (var i = 0; i < parts.length; i += 1) {
      if (!current || !Object.prototype.hasOwnProperty.call(current, parts[i])) {
        return fallback;
      }
      current = current[parts[i]];
    }

    return current;
  };

  root.isModuleEnabled = function (moduleKey, fallback) {
    var value = root.getConfig('modules.' + moduleKey, fallback !== false);
    return value !== false;
  };

  root.readJsonConfig = function (url) {
    if (!url || typeof fetch !== 'function') {
      return Promise.resolve(root.config);
    }

    return fetch(url, { credentials: 'same-origin' })
      .then(function (response) {
        if (!response.ok) throw new Error('Citadel config unavailable');
        return response.json();
      })
      .then(function (config) {
        root.config = Object.assign({}, defaults, config || {});
        document.dispatchEvent(new CustomEvent('citadel:config-ready', { detail: root.config }));
        return root.config;
      })
      .catch(function () {
        document.dispatchEvent(new CustomEvent('citadel:config-ready', { detail: root.config }));
        return root.config;
      });
  };
})();
