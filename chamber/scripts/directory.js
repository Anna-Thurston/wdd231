const toggleButton = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");
const gridBtn = document.getElementById("gridBtn");
const listBtn = document.getElementById("listBtn");
const directory = document.getElementById("directory");

gridBtn.addEventListener("click", () => {
    directory.classList.add("grid-view");
    directory.classList.remove("list-view");
});

listBtn.addEventListener("click", () => {
    directory.classList.add("list-view");
    directory.classList.remove("grid-view");
});
  
toggleButton.addEventListener("click", () => {
    navMenu.classList.toggle("show");
});
