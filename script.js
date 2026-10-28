const revealItems = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
revealItems.forEach((item) => observer.observe(item));

const menuButton = document.querySelector('.menu-button');
const mobileMenu = document.querySelector('.mobile-menu');
const toggleMenu = (open) => {
  menuButton.classList.toggle('open', open);
  mobileMenu.classList.toggle('open', open);
  menuButton.setAttribute('aria-expanded', String(open));
  mobileMenu.setAttribute('aria-hidden', String(!open));
  document.body.style.overflow = open ? 'hidden' : '';
};
menuButton.addEventListener('click', () => toggleMenu(!mobileMenu.classList.contains('open')));
mobileMenu.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => toggleMenu(false)));

const dialog = document.querySelector('.film-dialog');
document.querySelector('[data-video-trigger]').addEventListener('click', () => dialog.showModal());
document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', (event) => { if (event.target === dialog) dialog.close(); });

const parallaxItems = document.querySelectorAll('[data-parallax]');
let ticking = false;
const updateParallax = () => {
  parallaxItems.forEach((item) => {
    const rect = item.getBoundingClientRect();
    if (rect.bottom > 0 && rect.top < innerHeight) {
      const offset = (rect.top + rect.height / 2 - innerHeight / 2) * -0.045;
      item.style.setProperty('--parallax', `${offset}px`);
    }
  });
  ticking = false;
};
addEventListener('scroll', () => {
  if (!ticking) { requestAnimationFrame(updateParallax); ticking = true; }
}, { passive: true });
updateParallax();
