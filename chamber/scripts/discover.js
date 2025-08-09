document.addEventListener('DOMContentLoaded', () => {
  // Load and fill attraction cards
  fetch('data/discover.json')
    .then(res => res.json())
    .then(attractions => {
      const cards = document.querySelectorAll('.discover-grid .card');
      attractions.forEach((item, i) => {
        if (!cards[i]) return;
        cards[i].innerHTML = `
          <h2>${item.name}</h2>
          <figure>
            <img src="${item.image}" alt="${item.name}" loading="lazy" />
          </figure>
          <address>${item.address}</address>
          <p>${item.description}</p>
          <button type="button">Learn More</button>
        `;
      });
    })
    .catch(err => console.error('Failed to load attractions:', err));

  // Visitor last visit message
  const visitMsg = document.getElementById('visit-message');
  if (visitMsg) {
    const lastVisit = localStorage.getItem('lastVisit');
    const now = Date.now();

    if (!lastVisit) {
      visitMsg.textContent = "Welcome! Let us know if you have any questions.";
    } else {
      const diffDays = Math.floor((now - parseInt(lastVisit, 10)) / (1000 * 60 * 60 * 24));
      if (diffDays < 1) {
        visitMsg.textContent = "Back so soon! Awesome!";
      } else if (diffDays === 1) {
        visitMsg.textContent = "You last visited 1 day ago.";
      } else {
        visitMsg.textContent = `You last visited ${diffDays} days ago.`;
      }
    }
    localStorage.setItem('lastVisit', now.toString());
  }
});
