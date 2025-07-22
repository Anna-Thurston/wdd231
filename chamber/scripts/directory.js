const toggleButton = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");

document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;
  
toggleButton.addEventListener("click", () => {
  navMenu.classList.toggle("show");
});
