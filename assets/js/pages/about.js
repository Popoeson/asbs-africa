/**
 * About page — renders the leadership team grid from data/team.json.
 * Same pattern as programmes.js: one data file feeds the markup, so
 * adding or editing a team member never touches about.html.
 */

function renderTeamCard(member) {
  return `
    <article class="team-card">
      <img class="team-card__photo" src="${member.image}" alt="${member.name}">
      <h3 class="team-card__name">${member.name}</h3>
      <span class="team-card__title">${member.title}</span>
      <p>${member.bio}</p>
    </article>
  `;
}

async function initTeamGrid() {
  const grid = document.getElementById('teamGrid');
  if (!grid) return;

  try {
    const res = await fetch('data/team.json');
    const team = await res.json();
    grid.innerHTML = team.map(renderTeamCard).join('');
  } catch (err) {
    console.error('Could not load team:', err);
  }
}

document.addEventListener('DOMContentLoaded', initTeamGrid);