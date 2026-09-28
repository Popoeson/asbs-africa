/**
 * ASBS Africa — main.js
 * Shared across every page: loads header/footer partials, wires up the
 * mobile nav toggle, and handles the newsletter form.
 *
 * Requires being served over http(s) — fetch() of local partials will not
 * work from a file:// URL. Use `npx serve`, VS Code Live Server, or deploy
 * to Vercel.
 */

async function loadPartial(url, targetId) {
  const target = document.getElementById(targetId);
  if (!target) return;
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to load ${url}`);
    target.innerHTML = await res.text();
  } catch (err) {
    console.error(err);
  }
}

function initNavToggle() {
  const toggle = document.getElementById('navToggle');
  const nav = document.getElementById('mainNav');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    toggle.classList.toggle('is-open', isOpen);
    toggle.setAttribute('aria-expanded', String(isOpen));
  });
}

function setActiveNavLink() {
  const current = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.main-nav__links a').forEach(link => {
    if (link.dataset.page === current) link.classList.add('is-active');
  });
}

/* ---- Nav sub-options ---- */
function closeMobileMenu() {
  const nav = document.getElementById('mainNav');
  const toggle = document.getElementById('navToggle');
  if (nav) nav.classList.remove('is-open');
  if (toggle) {
    toggle.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
  }
}

function collapseNavItems(except) {
  document.querySelectorAll('.nav-item.is-open').forEach(item => {
    if (item === except) return;
    item.classList.remove('is-open');
    item.querySelector('.nav-item__toggle')?.setAttribute('aria-expanded', 'false');
  });
}

document.addEventListener('click', (e) => {
  const toggle = e.target.closest('.nav-item__toggle');
  if (toggle) {
    const item = toggle.closest('.nav-item');
    const open = item.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(open));
    collapseNavItems(item); // one open at a time
    return;
  }

  const subLink = e.target.closest('.nav-sub a');
  if (subLink) {
    collapseNavItems();
    closeMobileMenu();
    subLink.blur(); // stops desktop :focus-within keeping the dropdown open
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') collapseNavItems();
});

function initNewsletterForm() {
  const form = document.getElementById('newsletterForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    // Placeholder behavior until Phase 2 backend (Express + MongoDB) is wired up.
    const email = form.querySelector('input[type="email"]').value;
    console.log('Newsletter signup:', email);
    form.reset();
    alert('Thanks for signing up! (Placeholder — connect this to your mailing list service.)');
  });
}

async function initLayout() {
  await Promise.all([
    loadPartial('partials/header.html', 'site-header'),
    loadPartial('partials/footer.html', 'site-footer'),
  ]);
  initNavToggle();
  initNewsletterForm();
  setActiveNavLink();
}

document.addEventListener('DOMContentLoaded', initLayout);