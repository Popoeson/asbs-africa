/**
 * Programmes page — renders full programme list from data/programmes.json
 * and handles category filtering. Uses the same data source as the
 * homepage highlights, so there is one place to edit programme content.
 */

let allProgrammes = [];

function detailBox(iconSvg, label, value) {
  return `
    <div class="detail-box">
      ${iconSvg}
      <div>
        <span class="detail-box__label">${label}</span>
        <span class="detail-box__value">${value}</span>
      </div>
    </div>
  `;
}

const icons = {
  people: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
  pin: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`,
  clock: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
};

function renderCard(p) {
  return `
    <article class="card programme-card" id="${p.id}">
      <img class="programme-card__image" src="${p.image}" alt="${p.title}">
      <div class="programme-card__body">
        <span class="programme-card__tag">${p.category}</span>
        <h2 class="programme-card__title">${p.title}</h2>
        <p class="programme-card__tagline">${p.tagline}</p>
        <p class="programme-card__description">${p.description}</p>

        <div class="detail-boxes">
          ${detailBox(icons.people, "Who it's for", p.whoFor)}
          ${detailBox(icons.pin, "Format", p.format)}
          ${detailBox(icons.clock, "Duration", p.duration)}
        </div>

        <a href="mailto:admissions@asbsafrica.org?subject=Enquiry: ${encodeURIComponent(p.title)}" class="btn btn-primary enquire-btn">
          Enquire About This Programme
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
        </a>
      </div>
    </article>
  `;
}

function renderList(category) {
  const list = document.getElementById('programmeList');
  const count = document.getElementById('resultsCount');

  const filtered = category === 'All'
    ? allProgrammes
    : allProgrammes.filter(p => p.category === category);

  list.innerHTML = filtered.map(renderCard).join('');
  count.textContent = `Showing ${filtered.length} of ${allProgrammes.length} programmes`;
}

function initFilterTabs() {
  const tabs = document.querySelectorAll('.filter-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('is-active'));
      tab.classList.add('is-active');
      renderList(tab.dataset.category);
    });
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
    renderList('All');
    initFilterTabs();
    scrollToHash(); // supports links like programmes.html#regenerative-agribusiness
  } catch (err) {
    console.error('Could not load programmes:', err);
  }
}

document.addEventListener('DOMContentLoaded', initProgrammesPage);