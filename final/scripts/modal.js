// modal.js
export function openModal(title, html) {
  const dialog = document.getElementById('app-modal');
  const titleEl = document.getElementById('modal-title');
  const content = document.getElementById('modal-content');
  if (!dialog || !titleEl || !content) return;

  titleEl.textContent = title;
  content.innerHTML = html;

  if (typeof dialog.showModal === 'function') dialog.showModal();
  else dialog.setAttribute('open', ''); // fallback

  const closeBtn = dialog.querySelector('.modal-close');
  closeBtn?.focus();
}

export function initModal() {
  const dialog = document.getElementById('app-modal');
  if (!dialog) return;

  dialog.addEventListener('click', (e) => {
    const rect = dialog.querySelector('.modal-inner')?.getBoundingClientRect();
    if (!rect) return;
    const inside = e.clientX >= rect.left && e.clientX <= rect.right &&
                   e.clientY >= rect.top && e.clientY <= rect.bottom;
    if (!inside) dialog.close();
  });

  dialog.querySelector('.modal-close')?.addEventListener('click', () => dialog.close());
}
