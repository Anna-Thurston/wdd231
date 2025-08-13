// main.js
import { fetchData } from './dataLoader.js';
import { openModal, setupModalEvents } from './modal.js';
import { saveToLocalStorage, loadFromLocalStorage } from './localStorage.js';

const lessonsContainer = document.querySelector('#lessons-container');

async function loadLessons() {
  const lessons = await fetchData('./data/lessons.json');
  if (!lessons) {
    lessonsContainer.textContent = "Failed to load lessons data.";
    return;
  }

  // Example array method: filter out inactive lessons
  const activeLessons = lessons.filter(lesson => lesson.active);

  // Template literals + DOM manipulation to generate cards
  lessonsContainer.innerHTML = activeLessons
    .map(({ id, title, instrument, duration, price }) => `
      <article class="lesson-card" tabindex="0" data-id="${id}">
        <h3>${title}</h3>
        <p>Instrument: ${instrument}</p>
        <p>Duration: ${duration}</p>
        <p>Price: $${price}</p>
      </article>
    `)
    .join('');

  // Event delegation for modal open
  lessonsContainer.querySelectorAll('.lesson-card').forEach(card => {
    card.addEventListener('click', () => openLessonModal(card.dataset.id, activeLessons));
    card.addEventListener('keypress', e => {
      if (e.key === 'Enter') openLessonModal(card.dataset.id, activeLessons);
    });
  });
}

function openLessonModal(id, lessons) {
  const lesson = lessons.find(l => l.id === id);
  if (!lesson) return;

  const modalHTML = `
    <h2>${lesson.title}</h2>
    <p><strong>Instrument:</strong> ${lesson.instrument}</p>
    <p><strong>Duration:</strong> ${lesson.duration}</p>
    <p><strong>Price:</strong> $${lesson.price}</p>
    <p>${lesson.description}</p>
  `;
  openModal(modalHTML);

  // Save last opened lesson to localStorage
  saveToLocalStorage('lastLesson', lesson);
}

function restoreLastLesson() {
  const lastLesson = loadFromLocalStorage('lastLesson');
  if (lastLesson) {
    // optionally open modal or highlight lesson card
    console.log('Restored last lesson:', lastLesson.title);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  setupModalEvents();
  loadLessons();
  restoreLastLesson();
});
