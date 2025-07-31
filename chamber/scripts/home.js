// home.js

// ========== WEATHER API ==========
const apiKey = 'dd56287d0890b5e4831aaa9f497a641c';
const lat = 35.8456; // Murfreesboro latitude
const lon = -86.3903; // Murfreesboro longitude
const units = 'imperial'; // Fahrenheit

const weatherURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&units=${units}&appid=${apiKey}`;

async function displayWeather() {
  try {
    const response = await fetch(weatherURL);
    if (!response.ok) throw new Error('Weather fetch failed');
    const data = await response.json();

    const current = document.querySelector('#current-weather');
    const forecast = document.querySelector('#forecast');

    // Current weather
    current.innerHTML = `
      <p><strong>Temperature:</strong> ${data.current.temp.toFixed(1)}°F</p>
      <p><strong>Conditions:</strong> ${data.current.weather[0].description}</p>
    `;

    // 3-day forecast
    forecast.innerHTML = '';
    for (let i = 1; i <= 3; i++) {
      const day = data.daily[i];
      const date = new Date(day.dt * 1000);
      forecast.innerHTML += `
        <div class="forecast-day">
          <p><strong>${date.toLocaleDateString(undefined, { weekday: 'short' })}</strong></p>
          <p>${day.temp.day.toFixed(0)}°F</p>
        </div>
      `;
    }
  } catch (err) {
    console.error(err);
    document.querySelector('#current-weather').textContent = 'Unable to load weather data.';
  }
}

displayWeather();


// ========== SPOTLIGHT MEMBERS ==========
async function loadSpotlights() {
  try {
    const response = await fetch('data/members.json');
    const data = await response.json();

    // Filter gold or silver members
    const qualified = data.members.filter(member =>
      member.membership === 1 || member.membership === 2
    );

    // Randomly choose 2 or 3 members
    const count = Math.floor(Math.random() * 2) + 2; // random 2 or 3
    const spotlights = qualified.sort(() => 0.5 - Math.random()).slice(0, count);

    const spotlightContainer = document.querySelector('#spotlights');
    spotlightContainer.innerHTML = '';

    spotlights.forEach(member => {
      const card = document.createElement('div');
      card.classList.add('spotlight-card');
      card.innerHTML = `
        <img src="${member.image}" alt="Logo of ${member.name}" loading="lazy">
        <h3>${member.name}</h3>
        <p>${member.address}</p>
        <p>${member.phone}</p>
        <a href="${member.website}" target="_blank">Visit Website</a>
        <p class="membership-level">${getMembershipName(member.membership)}</p>
      `;
      spotlightContainer.appendChild(card);
    });
  } catch (err) {
    console.error('Error loading spotlight members:', err);
    document.querySelector('#spotlights').textContent = 'Unable to load spotlight members.';
  }
}

function getMembershipName(level) {
  switch (level) {
    case 1: return 'Gold Member';
    case 2: return 'Silver Member';
    case 3: return 'Bronze Member';
    default: return 'Member';
  }
}

loadSpotlights();
