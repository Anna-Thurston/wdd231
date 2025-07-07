document.addEventListener("DOMContentLoaded", () => {
    const yearSpan = document.getElementById("currentyear");
    const currentYear = new Date().getFullYear();
    yearSpan.textContent = currentYear;

    const lastModified = document.getElementById("lastModified");
    lastModified.textContent = `Last Modified: ${document.lastModified}`;
});