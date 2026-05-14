/* Citadel of Kang Theme Pack: Navigation Drawer Module
   Non-live development file. Not loaded by production pipeline yet. */
(function () {
  var body = document.body;
  if (!body || body.getAttribute('data-citadel-navigation') === 'false') return;

  var navRoot = document.querySelector('[data-citadel-navigation-root]') ||
    document.querySelector('header[data-citadel-navigation]') ||
    document.querySelector('nav[data-citadel-navigation]') ||
    document.querySelector('.ck-nav[data-citadel-navigation]') ||
    document.querySelector('[data-citadel-navigation]:not(body)');
  var toggle = document.querySelector('[data-citadel-menu-toggle]');
  var drawer = document.querySelector('[data-citadel-mobile-drawer]');
  var backdrop = document.querySelector('[data-citadel-drawer-backdrop]');
  var closeButtons = Array.prototype.slice.call(document.querySelectorAll('[data-citadel-drawer-close]'));

  if (!navRoot || !toggle || !drawer || toggle.dataset.citadelNavigationReady === 'true') return;

  var navHeightVar = '--ck-nav-space';
  var focusableSelector = [
    'a[href]',
    'button:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])'
  ].join(', ');

  var previousFocus = null;

  var setNavSpace = function () {
    var height = navRoot.offsetHeight || 88;
    if (height > 180) height = 88;
    document.documentElement.style.setProperty(navHeightVar, height + 'px');
  };

  var getFocusableDrawerItems = function () {
    return Array.prototype.slice.call(drawer.querySelectorAll(focusableSelector))
      .filter(function (item) { return item.offsetParent !== null || item === document.activeElement; });
  };

  var isOpen = function () {
    return drawer.classList.contains('is-open');
  };

  var openDrawer = function () {
    previousFocus = document.activeElement;
    drawer.hidden = false;
    if (backdrop) backdrop.hidden = false;

    window.requestAnimationFrame(function () {
      drawer.classList.add('is-open');
      if (backdrop) backdrop.classList.add('is-open');
      body.classList.add('citadel-drawer-open');
      toggle.setAttribute('aria-expanded', 'true');

      var focusableItems = getFocusableDrawerItems();
      if (focusableItems.length) focusableItems[0].focus({ preventScroll: true });
    });
  };

  var closeDrawer = function (restoreFocus) {
    drawer.classList.remove('is-open');
    if (backdrop) backdrop.classList.remove('is-open');
    body.classList.remove('citadel-drawer-open');
    toggle.setAttribute('aria-expanded', 'false');

    window.setTimeout(function () {
      drawer.hidden = true;
      if (backdrop) backdrop.hidden = true;
      if (restoreFocus !== false && previousFocus && typeof previousFocus.focus === 'function') {
        previousFocus.focus({ preventScroll: true });
      }
    }, 180);
  };

  var toggleDrawer = function () {
    if (isOpen()) {
      closeDrawer(true);
    } else {
      openDrawer();
    }
  };

  toggle.addEventListener('click', toggleDrawer);

  if (backdrop) {
    backdrop.addEventListener('click', function () {
      closeDrawer(true);
    });
  }

  closeButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      closeDrawer(true);
    });
  });

  drawer.addEventListener('click', function (event) {
    var link = event.target.closest('a[href]');
    if (link) closeDrawer(false);
  });

  document.addEventListener('keydown', function (event) {
    if (!isOpen()) return;

    if (event.key === 'Escape') {
      event.preventDefault();
      closeDrawer(true);
      return;
    }

    if (event.key !== 'Tab') return;

    var focusableItems = getFocusableDrawerItems();
    if (!focusableItems.length) return;

    var first = focusableItems[0];
    var last = focusableItems[focusableItems.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });

  window.addEventListener('resize', setNavSpace);
  window.addEventListener('load', setNavSpace);

  drawer.hidden = true;
  if (backdrop) backdrop.hidden = true;
  toggle.setAttribute('aria-expanded', 'false');
  toggle.dataset.citadelNavigationReady = 'true';
  setNavSpace();
})();
