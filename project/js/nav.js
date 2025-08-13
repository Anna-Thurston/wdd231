// nav.js
export function initNav() {
  const toggle = document.getElementById('menu-toggle');
  const nav = document.getElementById('site-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!expanded));
      nav.classList.toggle('hidden');
    });
  }

  const current = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('#site-nav a').forEach(a => {
    if (a.getAttribute('href') === current) {
      a.classList.add('active');
      try { localStorage.setItem('mwa:lastPage', current); } catch {}
    }
  });
}
