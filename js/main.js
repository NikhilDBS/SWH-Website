// main.js — Standard Wear House

// ---- NAV SCROLL STATE ----
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

// ---- MOBILE MENU ----
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const mobileClose = document.getElementById('mobileClose');
const mobileLinks = document.querySelectorAll('.mobile-link');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.add('open');
  document.body.style.overflow = 'hidden';
});
function closeMenu() {
  mobileMenu.classList.remove('open');
  document.body.style.overflow = '';
}
mobileClose.addEventListener('click', closeMenu);
mobileLinks.forEach(l => l.addEventListener('click', closeMenu));

// ---- SCROLL REVEAL ----
const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => observer.observe(el));

// ---- STAGGERED REVEAL for indexed items ----
document.querySelectorAll('[style*="--i:"]').forEach(el => {
  const i = parseInt(el.style.getPropertyValue('--i') || el.getAttribute('style').match(/--i:(\d)/)?.[1] || 0);
  el.style.transitionDelay = `${i * 0.12}s`;
});

// ---- NAV ACTIVE LINK on scroll ----
const sections = document.querySelectorAll('section[id]');
const navLinksAll = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 120) current = s.id;
  });
  navLinksAll.forEach(a => {
    a.style.color = a.getAttribute('href') === `#${current}`
      ? 'var(--cream)'
      : '';
  });
}, { passive: true });
