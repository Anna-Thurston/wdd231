const toggleButton = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");
const directory = document.getElementById("directory");
const membersURL = "data/members.json";
const membersContainer = document.getElementById("members");

toggleButton.addEventListener("click", () => {
    navMenu.classList.toggle("show");
});

async function getMemberData() {
    try {
        const response = await fetch(membersURL);
        if (!response.ok) throw new Error("Failed to load data");
        const data = await response.json();
        displayMembers(data.members);
    } catch (error) {
        console.error("Error fetching member data:", error);
    }
}

function displayMembers(members) {
    membersContainer.innerHTML = ""; // Clear before displaying

    members.forEach((member) => {
        const card = document.createElement("section");
        card.classList.add("member-card");

        card.innerHTML = `
        <img src="${member.image}" alt="${member.name} logo" loading="lazy">
         <h3>${member.name}</h3>
        <p>${member.address}</p>
         <p>${member.phone}</p>
        <a href="${member.website}" target="_blank">Visit Website</a>
        <p class="level">Membership Level: ${membershipLevelName(member.membership)}</p>
        `;

        membersContainer.appendChild(card);
    });
}

function membershipLevelName(level) {
    return level === 3 ? "Gold" : level === 2 ? "Silver" : "Member";
}

// Toggle view styles
const gridButton = document.getElementById("grid");
const listButton = document.getElementById("list");

gridButton.addEventListener("click", () => {
    membersContainer.classList.add("grid");
    membersContainer.classList.remove("list");
});

listButton.addEventListener("click", () => {
    membersContainer.classList.add("list");
    membersContainer.classList.remove("grid");
});

getMemberData();

// Footer date handling
const yearSpan = document.getElementById("year");
const lastModifiedSpan = document.getElementById("lastModified");

if (yearSpan && lastModifiedSpan) {
    yearSpan.textContent = new Date().getFullYear();
    const lastModified = new Date(document.lastModified);
    lastModifiedSpan.textContent = lastModified.toLocaleString("en-US", {
        dateStyle: "long",
        timeStyle: "short"
    });
}

