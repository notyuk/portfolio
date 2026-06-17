/* ─── GAMA STUDIO — main.js (shared across all pages) ─── */

// ── Nav background/text-colour switch on scroll ──
// On the home page the hero is full-bleed, so nav starts "dark-bg" (white text over image)
// and switches to "light-bg" (black text, white background) once you scroll past it.
// On every other page there's no full-bleed hero behind the nav, so it starts light.
(function initNav() {
  const nav = document.querySelector('.nav');
  if (!nav) return;
  const hasHero = document.querySelector('.hero');

  function update() {
    if (hasHero) {
      if (window.scrollY > window.innerHeight * 0.82) {
        nav.classList.add('is-light-bg');
        nav.classList.remove('is-dark-bg');
      } else {
        nav.classList.add('is-dark-bg');
        nav.classList.remove('is-light-bg');
      }
    } else {
      nav.classList.add('is-light-bg');
    }
  }
  update();
  window.addEventListener('scroll', update, { passive: true });
})();

// ── Mobile menu ──
function toggleMenu() {
  const menu = document.getElementById('mobileMenu');
  menu.classList.toggle('open');
  document.body.style.overflow = menu.classList.contains('open') ? 'hidden' : '';
}

// ── Hero image rotation (home page only) ──
(function initHeroRotation() {
  const slides = document.querySelectorAll('.hero__slide');
  if (!slides.length) return;
  let i = 0;
  setInterval(() => {
    slides[i].classList.remove('active');
    i = (i + 1) % slides.length;
    slides[i].classList.add('active');
  }, 4500);
})();

// ── Scroll reveal ──
(function initReveal() {
  const els = document.querySelectorAll('.reveal-target');
  els.forEach(el => el.classList.add('reveal'));
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  els.forEach(el => observer.observe(el));
})();

// ── Contact form ──
function handleSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const btn = form.querySelector('button[type="submit"]');
  const original = btn.textContent;
  btn.textContent = 'Sending…';
  btn.disabled = true;

  setTimeout(() => {
    form.reset();
    btn.textContent = original;
    btn.disabled = false;
    const overlay = document.getElementById('successOverlay');
    if (overlay) overlay.classList.add('active');
  }, 1100);
}

function closeSuccess() {
  const overlay = document.getElementById('successOverlay');
  if (overlay) overlay.classList.remove('active');
}

document.addEventListener('DOMContentLoaded', () => {
  const overlay = document.getElementById('successOverlay');
  if (overlay) {
    overlay.addEventListener('click', (e) => {
      if (e.target === e.currentTarget) closeSuccess();
    });
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const menu = document.getElementById('mobileMenu');
    if (menu && menu.classList.contains('open')) toggleMenu();
    closeSuccess();
  }
});
