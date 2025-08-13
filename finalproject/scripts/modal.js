// modal.js

const modal = document.querySelector('#modal');
const modalContent = document.querySelector('#modal-content');
const modalCloseBtn = document.querySelector('#modal-close');

export function openModal(contentHTML) {
  modalContent.innerHTML = contentHTML;
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  modalCloseBtn.focus();
}

export function closeModal() {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
}

export function setupModalEvents() {
  modalCloseBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeModal();
    }
  });
}
