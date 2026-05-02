document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (event) => {
    const targetId = anchor.getAttribute('href');
    const target = targetId.length > 1 ? document.querySelector(targetId) : null;

    if (!target) {
      return;
    }

    event.preventDefault();
    target.scrollIntoView({ behavior: 'smooth' });
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
}

window.addEventListener('scroll', () => {
  if (sections.length === 0) {
    return;
  }

  let current = '';

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 120;

    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach((link) => {
    const linkUrl = new URL(link.href);
    const isSamePage = linkUrl.pathname === window.location.pathname;
    const isCurrentSection = linkUrl.hash === `#${current}`;
    const isHomeAtTop = !linkUrl.hash && current === 'home';

    link.classList.toggle('active', isSamePage && (isCurrentSection || isHomeAtTop));
  });
});
