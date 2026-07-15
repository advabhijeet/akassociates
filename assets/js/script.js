/*
  Chambers Citadel public bootstrap v1.2.
  This entry point only loads explicit runtime modules in dependency order.
*/
(function () {
  "use strict";

  if (window.ChambersBootstrap?.initialized) return;

  const currentScript = document.currentScript;
  const assetRoot = currentScript?.src
    ? new URL('../../', currentScript.src)
    : new URL('/', window.location.href);

  window.ChambersAssetRoot = assetRoot.href;

  const bootstrapModules = [
    {
      id: 'chambers-public-config-v1',
      path: 'assets/js/config/chambers-public-config.js',
      version: 'config-v4'
    },
    {
      id: 'citadel-core-runtime-v1',
      path: 'assets/js/runtime/core-runtime.js',
      version: 'core-runtime-v1'
    },
    {
      id: 'citadel-insights-runtime-v2',
      path: 'assets/js/runtime/insights-runtime.js',
      version: 'insights-runtime-v2'
    },
    {
      id: 'citadel-module-loader-v1',
      path: 'assets/js/runtime/module-loader.js',
      version: 'module-loader-v1'
    }
  ];

  const loadScript = (entry) => new Promise((resolve, reject) => {
    const existing = document.getElementById(entry.id);
    if (existing) {
      resolve(existing);
      return;
    }

    const script = document.createElement('script');
    script.id = entry.id;
    const moduleUrl = new URL(entry.path, assetRoot);
    moduleUrl.searchParams.set('v', entry.version);
    script.src = moduleUrl.href;
    script.async = false;
    script.dataset.chambersBootstrapModule = entry.id;
    script.addEventListener('load', () => resolve(script), { once: true });
    script.addEventListener('error', () => reject(new Error(`Bootstrap module failed: ${entry.path}`)), { once: true });
    document.body.appendChild(script);
  });

  window.ChambersBootstrap = Object.freeze({
    initialized: true,
    modules: bootstrapModules.map((entry) => entry.path)
  });

  window.ChambersBootstrapReady = bootstrapModules
    .reduce((chain, entry) => chain.then(() => loadScript(entry)), Promise.resolve())
    .then(() => {
      document.documentElement.dataset.citadelBootstrap = 'ready';
      return window.ChambersBootstrap;
    })
    .catch((error) => {
      document.documentElement.dataset.citadelBootstrap = 'failed';
      console.error('Chambers Citadel bootstrap failed:', error);
      throw error;
    });
})();
