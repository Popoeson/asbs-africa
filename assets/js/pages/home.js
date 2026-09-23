/**
 * Homepage — renders programme highlight cards from data/programmes.json.
 * Uses the same data source the full Programmes page will use, so adding or
 * editing a programme only ever happens in one place.
 */

async function renderProgrammeHighlights() {
  const grid = document.getElementById('programmeHighlights');
  if (!grid) return;

  try {
     const res = await fetch('data/programmes.json');
     const programmes = (await res.json()).filter(p => p.featured);

    grid.innerHTML = programmes.map(p => `
      <article class="card">
       <img class="card__image" src="${p.image}" alt="${p.title}" loading="lazy" decoding="async">
        <div class="card__body">
          <span class="card__tag">${p.category}</span>
          <h3 class="card__title">${p.title}</h3>
          <p>${p.tagline}</p>
          <a class="card__link" href="programmes.html#${p.id}">
            Learn more
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </a>
        </div>
      </article>
    `).join('');
  } catch (err) {
    console.error('Could not load programmes:', err);
  }
}

document.addEventListener('DOMContentLoaded', renderProgrammeHighlights);