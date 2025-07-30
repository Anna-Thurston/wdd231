const spotlightContainer = document.querySelector(".spotlights .highlight-grid");

async function loadSpotlights() {
    try {
        const response = await fetch("data/members.json");
        const data = await response.json();
        const goldSilver = data.members.filter(m => m.membership >= 2); // Silver or Gold

        const randomSpotlights = getRandomItems(goldSilver, 3);

        spotlightContainer.innerHTML = ""; // clear existing content
        randomSpotlights.forEach(member => {
            const card = document.createElement("div");
            card.classList.add("highlight");
            card.innerHTML = `
                <h3>${member.name}</h3>
                <p>${member.description || "A valued member of the Murfreesboro Chamber."}</p>
            `;
            spotlightContainer.appendChild(card);
        });

    } catch (err) {
        console.error("Error loading spotlights:", err);
    }
}

function getRandomItems(arr, count) {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

loadSpotlights();
