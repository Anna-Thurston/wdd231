async function displaySpotlights() {
  const response = await fetch("data/members.json");
  const data = await response.json();
  const members = data.members.filter(m =>
    m.level === "Silver" || m.level === "Gold"
  );

  // Shuffle and pick 2–3
  const selected = members.sort(() => 0.5 - Math.random()).slice(0, 3);

  const container = document.querySelector(".highlight-grid");
  container.innerHTML = "";

  selected.forEach(member => {
    const card = document.createElement("div");
    card.classList.add("highlight");

    card.innerHTML = `
      <h3>${member.name}</h3>
      <img src="${member.image}" alt="${member.name}" loading="lazy" />
      <p>${member.description}</p>
      <a href="${member.url}" target="_blank">Visit Website</a>
    `;
    container.appendChild(card);
  });
}

displaySpotlights();
