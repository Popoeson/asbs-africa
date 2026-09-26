/**
 * Programmes page — renders full programme list from data/programmes.json,
 * split into two tabs (Executive Courses / Professional Certificate Courses)
 * with a live search over title, description, and targets, and a
 * six-line clamp + expand/collapse toggle on each card's description.
 */

let allProgrammes = [];
let activeTab = 'executive';
let searchQuery = '';

function renderTargets(targets) {
  return `
    <ul class="programme-card__targets">
      ${targets.map(t => `<li>${t}</li>`).join('')}
    </ul>
  `;
}

function renderCard(p) {
  return `
    <article class="card programme-card" id="${p.id}">
      <img class="programme-card__image" src="${p.image}" alt="${p.title}" loading="lazy" decoding="async">
      <div class="programme-card__body">
        <h2 class="programme-card__title">${p.title}</h2>

        <p class="programme-card__description is-clamped">${p.description}</p>
        <button type="button" class="programme-card__toggle" aria-expanded="false">
          Read more
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
        </button>

        <div class="programme-card__targets-wrap">
          <span class="programme-card__targets-label">Who it's for</span>
          ${renderTargets(p.targets)}
        </div>

        <a href="mailto:admission@asbsafrica.com?subject=Enquiry: ${encodeURIComponent(p.title)}" class="btn btn-primary enquire-btn">
          Enquire About This Programme
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
        </a>
      </div>
    </article>
  `;
}

function matchesSearch(p, query) {
  if (!query) return true;
  const haystack = [p.title, p.description, ...p.targets].join(' ').toLowerCase();
  return haystack.includes(query.toLowerCase());
}

function renderList() {
  const list = document.getElementById('programmeList');
  const count = document.getElementById('resultsCount');

  const tabFiltered = allProgrammes.filter(p => p.tab === activeTab);
  const filtered = tabFiltered.filter(p => matchesSearch(p, searchQuery));

  list.innerHTML = filtered.length
    ? filtered.map(renderCard).join('')
    : `<p class="no-results">No courses match your search.</p>`;

  count.textContent = `Showing ${filtered.length} of ${tabFiltered.length} programmes`;
}

function initTabs() {
  const tabs = document.querySelectorAll('.programme-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('is-active'));
      tab.classList.add('is-active');
      activeTab = tab.dataset.tab;
      renderList();
    });
  });
}

function initSearch() {
  const input = document.getElementById('programmeSearch');
  input.addEventListener('input', (e) => {
    searchQuery = e.target.value.trim();
    renderList();
  });
}

function initDescriptionToggles() {
  // Event delegation — the card list is re-rendered on every tab switch
  // and search keystroke, so a single listener on the container survives
  // those re-renders instead of needing to be re-bound each time.
  const list = document.getElementById('programmeList');
  list.addEventListener('click', (e) => {
    const btn = e.target.closest('.programme-card__toggle');
    if (!btn) return;

    const desc = btn.previousElementSibling; // the <p class="programme-card__description">
    const expanded = desc.classList.toggle('is-expanded');
    desc.classList.toggle('is-clamped', !expanded);

    btn.setAttribute('aria-expanded', String(expanded));
    btn.innerHTML = expanded
      ? `Show less <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="18 15 12 9 6 15"/></svg>`
      : `Read more <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>`;
  });
}

function scrollToHash() {
  if (!location.hash) return;
  const target = document.querySelector(location.hash);
  if (target) target.scrollIntoView({ behavior: 'smooth' });
}

async function initProgrammesPage() {
  try {
    const res = await fetch('data/programmes.json');
    allProgrammes = await res.json();
    renderList();
    initTabs();
    initSearch();
    initDescriptionToggles();
    scrollToHash();
  } catch (err) {
    console.error('Could not load programmes:', err);
  }
}

document.addEventListener('DOMContentLoaded', initProgrammesPage);