const socialLinks = [
  {
    label: 'Firm LinkedIn',
    href: 'https://www.linkedin.com/company/chambersofak',
    icon: 'linkedin',
  },
  {
    label: 'WhatsApp Channel',
    href: 'https://whatsapp.com/channel/0029VbCmf6M9sBIHqiTPIz33',
    icon: 'whatsapp',
    modifier: 'is-channel',
  },
];

const socialIconSvg = {
  linkedin: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M6.6 8.7V19H3.2V8.7h3.4zm.2-3.2c0 1-.7 1.7-1.9 1.7-1.1 0-1.8-.7-1.8-1.7 0-1 .7-1.8 1.9-1.8 1.1 0 1.8.7 1.8 1.8zM20.8 12.7V19h-3.4v-5.9c0-1.5-.5-2.5-1.8-2.5-1 0-1.5.6-1.8 1.3-.1.2-.1.6-.1.9V19h-3.4V8.7h3.4v1.5c.4-.7 1.3-1.8 3.2-1.8 2.4 0 4 1.5 4 4.3z"/></svg>',
  whatsapp: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M17.5 14.3c-.2-.1-1.2-.6-1.3-.7-.2-.1-.3-.1-.4.1-.1.2-.5.7-.6.8-.1.1-.2.2-.4.1-.2-.1-.8-.3-1.5-1-.6-.5-1-1.2-1.1-1.4-.1-.2 0-.3.1-.4l.3-.3.2-.3c.1-.1.1-.2 0-.4-.1-.1-.4-1-.6-1.4-.1-.3-.3-.3-.4-.3h-.4c-.1 0-.3 0-.5.2-.2.2-.7.6-.7 1.6s.7 1.9.8 2.1c.1.1 1.4 2.2 3.5 3 .5.2.9.3 1.2.4.5.1.9.1 1.2.1.4-.1 1.2-.5 1.3-.9.2-.5.2-.9.1-.9 0-.1-.2-.1-.4-.2z"/><path d="M12 2.2a9.7 9.7 0 0 0-8.2 14.8L2.3 21.8l4.9-1.3a9.8 9.8 0 1 0 4.8-18.3zm0 17.5c-1.5 0-2.9-.4-4.2-1.2l-.3-.2-2.9.8.8-2.8-.2-.3A7.7 7.7 0 1 1 12 19.7z"/></svg>',
};

const createSocialLinksMarkup = () => socialLinks.map((link) => {
  const modifier = link.modifier ? ` ${link.modifier}` : '';

  return `<a class="ak-social-icon${modifier}" href="${link.href}" target="_blank" rel="noopener" aria-label="${link.label}" title="${link.label}">${socialIconSvg[link.icon]}<span class="sr-only">${link.label}</span></a>`;
}).join('');

const clockFormatter = new Intl.DateTimeFormat('en-IN', {
  timeZone: 'Asia/Kolkata',
  weekday: 'short',
  day: '2-digit',
  month: 'short',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: true,
});

const updateLiveClocks = () => {
  const now = new Date();
  const formatted = clockFormatter.format(now).replace(/\s+/g, ' ');

  document.querySelectorAll('[data-ak-clock]').forEach((clock) => {
    clock.textContent = `Patna, India ${formatted}`;
    clock.setAttribute('dateTime', now.toISOString());
  });
};

const nav = document.querySelector('.nav');

if (nav) {
  const navLinksList = nav.querySelector('.nav-links');
  const navCta = nav.querySelector('.nav-cta');
  const menuButton = nav.querySelector('.menu-toggle') || document.createElement('button');
  const backdrop = document.querySelector('.menu-backdrop') || document.createElement('button');
  let topBar = document.querySelector('.site-topbar');

  if (!topBar) {
    topBar = document.createElement('div');
    topBar.className = 'site-topbar';
    topBar.innerHTML = `
      <div class="topbar-label">Chambers of AK</div>
      <div class="topbar-actions">
        <div class="ak-social topbar-social" aria-label="Social links">${createSocialLinksMarkup()}</div>
        <time class="live-clock" data-ak-clock></time>
      </div>
    `;
    nav.parentNode.insertBefore(topBar, nav);
  }

  menuButton.className = 'menu-toggle';
  menuButton.type = 'button';
  menuButton.setAttribute('aria-label', 'Open menu');
  menuButton.setAttribute('aria-expanded', 'false');

  if (!menuButton.querySelector('span')) {
    menuButton.innerHTML = '<span></span><span></span><span></span>';
  }

  backdrop.className = 'menu-backdrop';
  backdrop.type = 'button';
  backdrop.setAttribute('aria-label', 'Close menu');

  if (navCta && navLinksList && !navLinksList.querySelector('.drawer-contact')) {
    const contactItem = document.createElement('li');
    const contactLink = navCta.cloneNode(true);

    contactItem.className = 'drawer-contact';
    contactLink.classList.remove('nav-cta');
    contactLink.classList.add('drawer-cta');
    contactItem.appendChild(contactLink);
    navLinksList.appendChild(contactItem);
  }

  if (navLinksList && !navLinksList.querySelector('.drawer-social')) {
    const socialItem = document.createElement('li');

    socialItem.className = 'drawer-social';
    socialItem.innerHTML = `
      <div class="drawer-social-panel">
        <div class="drawer-time-label">Social Links</div>
        <div class="ak-social" aria-label="Social links">${createSocialLinksMarkup()}</div>
        <time class="drawer-time" data-ak-clock></time>
      </div>
    `;
    navLinksList.insertBefore(socialItem, navLinksList.firstElementChild);
  }

  if (!menuButton.parentNode) {
    nav.appendChild(menuButton);
  }

  if (!backdrop.parentNode) {
    document.body.appendChild(backdrop);
  }

  const updateNavScrollState = () => {
    nav.classList.toggle('is-scrolled', window.scrollY > 18);
  };

  const updateNavSpace = () => {
    const wasScrolled = nav.classList.contains('is-scrolled');

    nav.classList.add('is-measuring');
    nav.classList.remove('is-scrolled');

    const topBarHeight = topBar ? Math.ceil(topBar.getBoundingClientRect().height) : 0;
    const navHeight = Math.ceil(nav.getBoundingClientRect().height);

    document.documentElement.style.setProperty('--topbar-space', `${topBarHeight}px`);
    document.documentElement.style.setProperty('--nav-space', `${topBarHeight + navHeight}px`);

    nav.classList.toggle('is-scrolled', wasScrolled);
    nav.classList.remove('is-measuring');
  };

  let navScrollTicking = false;
  let navResizeTicking = false;

  updateNavScrollState();
  updateNavSpace();

  window.addEventListener('scroll', () => {
    if (navScrollTicking) {
      return;
    }

    navScrollTicking = true;
    window.requestAnimationFrame(() => {
      updateNavScrollState();
      navScrollTicking = false;
    });
  }, { passive: true });

  window.addEventListener('resize', () => {
    if (navResizeTicking) {
      return;
    }

    navResizeTicking = true;
    window.requestAnimationFrame(() => {
      updateNavSpace();
      updateNavScrollState();
      navResizeTicking = false;
    });
  }, { passive: true });

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(updateNavSpace).catch(() => {});
  }

  const closeMenu = () => {
    document.body.classList.remove('menu-open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open menu');
  };

  menuButton.addEventListener('click', () => {
    const isOpen = document.body.classList.toggle('menu-open');

    menuButton.setAttribute('aria-expanded', String(isOpen));
    menuButton.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
  });

  backdrop.addEventListener('click', closeMenu);

  if (navLinksList) {
    navLinksList.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', closeMenu);
    });
  }

  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeMenu();
    }
  });
}

document.querySelectorAll('.foot').forEach((footer) => {
  if (footer.querySelector('.foot-social')) {
    return;
  }

  const socialRow = document.createElement('div');
  const disclaimer = footer.querySelector('.foot-disc');

  socialRow.className = 'foot-social ak-social';
  socialRow.setAttribute('aria-label', 'Social links');
  socialRow.innerHTML = createSocialLinksMarkup();

  if (disclaimer) {
    footer.insertBefore(socialRow, disclaimer);
  } else {
    footer.appendChild(socialRow);
  }
});

if (document.querySelector('[data-ak-clock]')) {
  updateLiveClocks();
  window.setInterval(updateLiveClocks, 1000);
}

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (event) => {
    const targetId = anchor.getAttribute('href');
    const target = targetId.length > 1 ? document.querySelector(targetId) : null;

    if (!target) {
      return;
    }

    event.preventDefault();
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
  });
});

const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

if (sections.length === 0) {
  const pageLinks = document.querySelectorAll('.nav-links a[href]');
  const hasExactPageLink = Array.from(pageLinks).some((link) => {
    return new URL(link.href).pathname === window.location.pathname;
  });

  if (hasExactPageLink) {
    pageLinks.forEach((link) => {
      const linkPath = new URL(link.href).pathname;
      const currentPath = window.location.pathname;

      link.classList.toggle('active', linkPath === currentPath);
    });
  }
} else {
  const setActiveNav = (current) => {
    navLinks.forEach((link) => {
      const linkUrl = new URL(link.href);
      const isSamePage = linkUrl.pathname === window.location.pathname;
      const isCurrentSection = linkUrl.hash === `#${current}`;
      const isHomeAtTop = !linkUrl.hash && current === 'home';

      link.classList.toggle('active', isSamePage && (isCurrentSection || isHomeAtTop));
    });
  };

  let activeSection = window.location.hash ? window.location.hash.slice(1) : sections[0].id;

  setActiveNav(activeSection);

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      const visibleEntries = entries
        .filter((entry) => entry.isIntersecting)
        .sort((first, second) => {
          return second.intersectionRatio - first.intersectionRatio
            || first.boundingClientRect.top - second.boundingClientRect.top;
        });

      if (visibleEntries.length === 0) {
        return;
      }

      const nextSection = visibleEntries[0].target.getAttribute('id');

      if (nextSection && nextSection !== activeSection) {
        activeSection = nextSection;
        setActiveNav(activeSection);
      }
    }, {
      rootMargin: '-22% 0px -62% 0px',
      threshold: [0, 0.2, 0.45, 0.7],
    });

    sections.forEach((section) => observer.observe(section));
  } else {
    let ticking = false;

    const updateActiveNav = () => {
      let current = '';

      sections.forEach((section) => {
        const sectionTop = section.offsetTop - 120;

        if (window.scrollY >= sectionTop) {
          current = section.getAttribute('id');
        }
      });

      setActiveNav(current);
    };

    window.addEventListener('scroll', () => {
      if (ticking) {
        return;
      }

      ticking = true;
      window.requestAnimationFrame(() => {
        updateActiveNav();
        ticking = false;
      });
    }, { passive: true });
  }
}

const conversionEventNames = {
  whatsapp: 'whatsapp_click',
  phone: 'phone_click',
  email: 'email_click',
  case_enquiry: 'case_enquiry_click',
  contact: 'contact_click',
};

const getConversionPayload = (link) => {
  const rawHref = link.getAttribute('href') || '';
  const label = link.textContent.trim().replace(/\s+/g, ' ').slice(0, 80) || 'Link click';

  if (rawHref.startsWith('https://wa.me/') || rawHref.startsWith('https://api.whatsapp.com/')) {
    return { type: 'whatsapp', label, target: 'whatsapp' };
  }

  if (rawHref.startsWith('tel:')) {
    return { type: 'phone', label, target: 'phone' };
  }

  if (rawHref.startsWith('mailto:')) {
    return { type: 'email', label, target: 'email' };
  }

  try {
    const url = new URL(rawHref, window.location.href);
    const page = url.pathname.split('/').pop();

    if (page === 'case-enquiry.html') {
      return { type: 'case_enquiry', label, target: url.pathname };
    }

    if (page === 'contact.html') {
      return { type: 'contact', label, target: url.pathname };
    }
  } catch (error) {
    return null;
  }

  return null;
};

document.addEventListener('click', (event) => {
  if (!(event.target instanceof Element)) {
    return;
  }

  const link = event.target.closest('a[href]');

  if (!link) {
    return;
  }

  const conversion = getConversionPayload(link);

  if (!conversion) {
    return;
  }

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: 'ak_conversion_click',
    ga_event_name: conversionEventNames[conversion.type],
    conversion_type: conversion.type,
    conversion_label: conversion.label,
    conversion_target: conversion.target,
    conversion_page_path: window.location.pathname,
    conversion_page_title: document.title,
  });
});

const setupHomeReveals = () => {
  const path = window.location.pathname;
  const isHomePage = path.endsWith('/') || path.endsWith('/index.html') || path.endsWith('index.html');

  if (!isHomePage) {
    return;
  }

  const revealSelectors = [
    '.hero-eyebrow',
    '.hero-logo',
    '.hero-rule',
    '.hero-tagline',
    '.hero-meta > *',
    '.hero-actions > *',
    '.hero-portrait',
    '#practice .sec-label',
    '#practice .practice-item',
    '#updates .sec-label',
    '#updates .update-item',
    '#contact .sec-label',
    '#contact .contact-item',
  ];
  const revealTargets = Array.from(document.querySelectorAll(revealSelectors.join(',')));

  if (revealTargets.length === 0) {
    return;
  }

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  revealTargets.forEach((target, index) => {
    target.classList.add('home-reveal');
    target.classList.toggle('home-reveal-soft', !target.classList.contains('hero-logo'));
    target.style.setProperty('--reveal-delay', `${Math.min((index % 5) * 70, 280)}ms`);
  });

  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealTargets.forEach((target) => target.classList.add('is-visible'));
    return;
  }

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, {
    rootMargin: '0px 0px -12% 0px',
    threshold: 0.12,
  });

  revealTargets.forEach((target) => revealObserver.observe(target));
};

setupHomeReveals();

const loadAdsense = () => {
  if (window.akAdsenseLoaded) {
    return;
  }

  window.akAdsenseLoaded = true;

  const adsenseScript = document.createElement('script');
  adsenseScript.async = true;
  adsenseScript.crossOrigin = 'anonymous';
  adsenseScript.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6935574990807827';

  document.head.appendChild(adsenseScript);
};

const scheduleAdsense = () => {
  if (!document.body) {
    return;
  }

  const interactionEvents = ['pointerdown', 'keydown', 'scroll', 'touchstart'];

  const removeInteractionListeners = () => {
    interactionEvents.forEach((eventName) => {
      window.removeEventListener(eventName, loadAfterInteraction);
    });
  };

  const loadAfterInteraction = () => {
    removeInteractionListeners();
    loadAdsense();
  };

  interactionEvents.forEach((eventName) => {
    window.addEventListener(eventName, loadAfterInteraction, { once: true, passive: true });
  });

  window.addEventListener('load', () => {
    window.setTimeout(loadAdsense, 12000);
  }, { once: true });
};

scheduleAdsense();
