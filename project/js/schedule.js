// schedule.js
import { openModal, initModal } from './modal.js';
import { initNav } from './nav.js';

const DATA_URL = 'data/classes.json';

function cardTemplate(item, index) {
  const imgSrc =
    item.category === 'piano' ? 'images/piano.webp' :
    item.category === 'violin' ? 'images/violin.webp' :
    'images/early-childhood.webp';

  return `
    <article class="card" style="--i:${index}">
      <img src="${imgSrc}" alt="${item.title}" loading="lazy">
      <h3>${item.title}</h3>
      <p>${item.level} • ${item.duration} • ${item.price}</p>
      <button class="btn outline" data-modal="lessons" data-id="${item.id}">Details</button>
    </article>
  `;
}

function sessionTemplate(s, index) {
  return `
    <article class="card" style="--i:${index}">
      <h3>${s.title}</h3>
      <p>${s.day} @ ${s.time} • ${s.location}</p>
      <p>${s.level} • ${s.duration} • ${s.price}</p>
      <button class="btn" data-modal="lessons" data-id="${s.id}">More Info</button>
    </article>
  `;
}

async function fetchData() {
  try {
    const res = await fetch(DATA_URL);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch {
    return { offerings: [], sessions: [] };
  }
}

function wireModalClicks(map) {
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-modal="lessons"]');
    if (!btn) return;
    const id = btn.getAttribute('data-id');
    const item = map.get(id);
    if (!item) return;

    const html = `
      <p><strong>Level:</strong> ${item.level}</p>
      <p><strong>Duration:</strong> ${item.duration}</p>
      <p><strong>Price:</strong> ${item.price}</p>
      ${item.description ? `<p>${item.description}</p>` : ''}
      ${item.day ? `<p><strong>When:</strong> ${item.day} @ ${item.time}</p>` : ''}
      ${item.location ? `<p><strong>Location:</strong> ${item.location}</p>` : ''}
    `;
    openModal(item.title, html);
  });
}

document.addEventListener('DOMContentLoaded', async () => {
  initNav();
  initModal();

  const data = await fetchData();
  const page = window.location.pathname.split('/').pop();
  const isHome = page === '' || page === 'index.html';
  const offeringsLimit = isHome ? 3 : data.offerings.length;
  const sessionsLimit = isHome ? 3 : data.sessions.length;

  const offeringsContainer = document.querySelector('#lesson-cards');
  const sessionsContainer = document.querySelector('#schedule-grid');
  const itemMap = new Map();

  if (offeringsContainer) {
    data.offerings.slice(0, offeringsLimit).forEach((item, i) => {
      offeringsContainer.innerHTML += cardTemplate(item, i);
      itemMap.set(item.id, item);
    });

    if (isHome) {
      offeringsContainer.insertAdjacentHTML(
        'afterend',
        `<div class="center">
          <a href="lessons.html" class="btn cta">View All Lessons</a>
        </div>`
      );
    }
  }

  if (sessionsContainer) {
    data.sessions.slice(0, sessionsLimit).forEach((s, i) => {
      sessionsContainer.innerHTML += sessionTemplate(s, i);
      itemMap.set(s.id, s);
    });
  }

  wireModalClicks(itemMap);
});
